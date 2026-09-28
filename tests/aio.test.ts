import { describe, it } from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs';
import app from '../src/index.ts';
import { decodeConfig, encodeConfig } from '../src/config.ts';

// Load .dev.vars for tests if available
let devEnv: Record<string, string> = {};
if (fs.existsSync('.dev.vars')) {
  const content = fs.readFileSync('.dev.vars', 'utf-8');
  for (const line of content.split('\n')) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const [key, ...vals] = trimmed.split('=');
      let val = vals.join('=');
      if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1);
      devEnv[key.trim()] = val;
    }
  }
}

const testConfig = {
  metadataUrl: devEnv.DEFAULT_METADATA_URL || '',
  streamUrl: devEnv.DEFAULT_STREAM_URL || '',
  subsUrl: devEnv.DEFAULT_SUBS_URL || '',
};
const encodedConfig = encodeConfig(testConfig);

describe('fanzirfan AIO Addon Test Suite', () => {
  it('should decode and encode base64 config correctly', () => {
    const sample = {
      metadataUrl: 'https://example.com/meta',
      streamUrl: 'https://example.com/stream',
      subsUrl: 'https://example.com/subs',
    };
    const encoded = encodeConfig(sample);
    const decoded = decodeConfig(encoded);

    assert.strictEqual(decoded.metadataUrl, sample.metadataUrl);
    assert.strictEqual(decoded.streamUrl, sample.streamUrl);
    assert.strictEqual(decoded.subsUrl, sample.subsUrl);
  });

  it('should render configuration HTML at root /', async () => {
    const res = await app.request('/');
    assert.strictEqual(res.status, 200);
    const text = await res.text();
    assert.ok(text.includes('fanzirfan AIO'));
    assert.ok(text.includes('Install to Stremio'));
    assert.ok(text.includes('AIOMetadata'));
    assert.ok(text.includes('PenguPlay'));
    assert.ok(text.includes('Nuvio Subs'));
  });

  it('should return unconfigured manifest with configurationRequired: true when empty', async () => {
    const res = await app.request('/manifest.json');
    assert.strictEqual(res.status, 200);
    const data = (await res.json()) as any;

    assert.strictEqual(data.id, 'irfan.nuvio.aio');
    assert.strictEqual(data.name, 'fanzirfan AIO');
    assert.strictEqual(data.behaviorHints?.configurationRequired, true);
  });

  it('should return combined manifest when configured via URL parameter', async () => {
    if (!testConfig.metadataUrl) return;
    const res = await app.request(`/${encodedConfig}/manifest.json`);
    assert.strictEqual(res.status, 200);
    const data = (await res.json()) as any;

    assert.strictEqual(data.id, 'irfan.nuvio.aio');
    assert.ok(Array.isArray(data.catalogs));
    assert.ok(data.catalogs.length > 0);
  });

  it('should ping upstreams via /api/ping', async () => {
    if (!testConfig.streamUrl) return;
    const query = new URLSearchParams(testConfig).toString();
    const res = await app.request(`/api/ping?${query}`);
    assert.strictEqual(res.status, 200);
    const data = (await res.json()) as any;

    assert.ok(data.metadata);
    assert.ok(data.stream);
    assert.ok(data.subs);
    assert.strictEqual(data.stream.ok, true);
    assert.strictEqual(data.subs.ok, true);
    console.log(`Ping results - Stream: ${data.stream.latencyMs}ms, Subs: ${data.subs.latencyMs}ms, Meta: ${data.metadata.latencyMs}ms`);
  });

  it('should relay and merge subtitles correctly', async () => {
    if (!testConfig.subsUrl) return;
    const res = await app.request(`/${encodedConfig}/subtitles/movie/tt0111161.json`);
    assert.strictEqual(res.status, 200);
    const data = (await res.json()) as any;

    assert.ok(Array.isArray(data.subtitles));
    assert.ok(data.subtitles.length > 0);
    console.log(`Successfully merged ${data.subtitles.length} subtitles from Nuvio Subs and Pengu!`);
  });

  it('should relay stream correctly and replace Pengu branding', async () => {
    if (!testConfig.streamUrl) return;
    const res = await app.request(`/${encodedConfig}/stream/movie/tt0111161.json`);
    assert.strictEqual(res.status, 200);
    const data = (await res.json()) as any;

    assert.ok(Array.isArray(data.streams));
    assert.ok(data.streams.length > 0);
    assert.ok(!data.streams[0].name.includes('PenguPlay'));
    assert.ok(data.streams[0].name.includes('fanzirfan AIO'));
    console.log(`Stream title rebranded to: ${data.streams[0].name}`);
  });

  it('should relay catalog from AIOMetadata correctly', async () => {
    if (!testConfig.metadataUrl) return;
    const res = await app.request(`/${encodedConfig}/catalog/movie/mdblist.190728.json`);
    assert.strictEqual(res.status, 200);
    const data = (await res.json()) as any;

    assert.ok(Array.isArray(data.metas));
    assert.ok(data.metas.length > 0);
    console.log(`Successfully received ${data.metas.length} catalog items from AIOMetadata!`);
  });

  it('should serve Nuvio collection layout at /collection.json', async () => {
    const res = await app.request('/collection.json');
    assert.strictEqual(res.status, 200);
    assert.strictEqual(res.headers.get('content-type'), 'application/json; charset=utf-8');
    const data = (await res.json()) as any[];

    assert.ok(Array.isArray(data));
    assert.strictEqual(data.length, 3);
    assert.strictEqual(data[0].id, 'collections-discover');
    assert.strictEqual(data[1].id, 'collections-streaming');
    assert.strictEqual(data[2].id, 'genres');

    // Confirm addonId matches
    const firstSource = data[0].folders[0].sources[0];
    assert.strictEqual(firstSource.addonId, 'irfan.nuvio.aio');
  });

  it('should serve parameterized collection layout at /:config/collection.json', async () => {
    const res = await app.request(`/${encodedConfig}/collection.json`);
    assert.strictEqual(res.status, 200);
    const data = (await res.json()) as any[];
    assert.ok(Array.isArray(data));
    assert.strictEqual(data.length, 3);
  });
});

