import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { decodeConfig, getResolvedConfig } from './config.ts';
import { getCombinedManifest } from './manifest.ts';
import { relayCatalog, relayMeta, relayStream, relaySubtitles } from './relay.ts';
import { renderConfigureHtml } from './configure-ui.ts';
import { getCollectionJson } from './collection.ts';
import { getBrandingAsset } from './branding-assets.ts';

const app = new Hono<{ Bindings: Env }>();

// Enable CORS for all routes
app.use(
  '*',
  cors({
    origin: '*',
    allowMethods: ['GET', 'POST', 'OPTIONS'],
    allowHeaders: ['*'],
  })
);

// ---------------------------------------------------------------------------
// Static Branding & Favicon Endpoints
// ---------------------------------------------------------------------------
function serveAsset(c: any, assetPath: string) {
  const asset = getBrandingAsset(assetPath);
  if (!asset) {
    return c.text('Not Found', 404);
  }
  return c.body(asset.data, 200, {
    'Content-Type': asset.mime,
    'Cache-Control': 'public, max-age=604800, immutable',
  });
}

app.get('/favicon.ico', (c) => serveAsset(c, 'favicon.ico'));
app.get('/favicon.svg', (c) => serveAsset(c, 'favicon.svg'));
app.get('/favicon-16.png', (c) => serveAsset(c, 'favicon-16.png'));
app.get('/favicon-32.png', (c) => serveAsset(c, 'favicon-32.png'));
app.get('/favicon-48.png', (c) => serveAsset(c, 'favicon-48.png'));
app.get('/apple-touch-icon.png', (c) => serveAsset(c, 'apple-touch-icon.png'));
app.get('/icon-192.png', (c) => serveAsset(c, 'icon-192.png'));
app.get('/icon-512.png', (c) => serveAsset(c, 'icon-512.png'));
app.get('/maskable-512.png', (c) => serveAsset(c, 'maskable-512.png'));
app.get('/site.webmanifest', (c) => serveAsset(c, 'site.webmanifest'));
app.get('/logo.svg', (c) => serveAsset(c, 'logo.svg'));
app.get('/logo.png', (c) => serveAsset(c, 'logo.png'));
app.get('/branding/:path{.+}', (c) => serveAsset(c, c.req.param('path')));

// ---------------------------------------------------------------------------
// Configuration Web UI
// ---------------------------------------------------------------------------
app.get('/', (c) => {
  // Inputs start empty on purpose: server-configured upstreams can carry auth
  // tokens and must not be published to page visitors. Empty inputs encode no
  // config, so the plain manifest/collection paths resolve server defaults
  // at request time instead.
  const html = renderConfigureHtml({
    metadataUrl: '',
    streamUrl: '',
    subsUrl: '',
    addonName: getResolvedConfig(c.env).addonName,
  });
  return c.html(html);
});

app.get('/configure', (c) => {
  return c.redirect('/');
});

app.get('/:config/configure', (c) => {
  const userConfig = decodeConfig(c.req.param('config'));
  // Prefill from the visitor's own encoded config only — never merged with
  // server defaults, which could otherwise leak operator upstream URLs.
  const html = renderConfigureHtml({
    metadataUrl: userConfig.metadataUrl || '',
    streamUrl: userConfig.streamUrl || '',
    subsUrl: userConfig.subsUrl || '',
    addonName: getResolvedConfig(c.env).addonName,
  });
  return c.html(html);
});

// ---------------------------------------------------------------------------
// Upstream Health Diagnostics Endpoint
// ---------------------------------------------------------------------------
async function pingUrl(url: string) {
  const target = url.endsWith('/manifest.json') ? url : `${url.replace(/\/+$/, '')}/manifest.json`;
  const start = Date.now();
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 20000);
  try {
    const res = await fetch(target, {
      signal: controller.signal,
      headers: { 'User-Agent': 'fanzirfan-aio/1.0' },
    });
    const latencyMs = Date.now() - start;
    return { ok: res.ok, status: res.status, latencyMs };
  } catch (err: any) {
    return {
      ok: false,
      status: 0,
      latencyMs: Date.now() - start,
      error: err.name === 'AbortError' ? 'TIMEOUT' : 'FAILED',
    };
  } finally {
    clearTimeout(timeoutId);
  }
}

app.get('/api/ping', async (c) => {
  const config = getResolvedConfig(c.env);
  const metadataUrl = c.req.query('metadataUrl') || config.metadataBase;
  const streamUrl = c.req.query('streamUrl') || config.streamBase;
  const subsUrl = c.req.query('subsUrl') || config.subsBase;

  const [metadata, stream, subs] = await Promise.all([
    pingUrl(metadataUrl),
    pingUrl(streamUrl),
    pingUrl(subsUrl),
  ]);

  return c.json({ metadata, stream, subs });
});

// ---------------------------------------------------------------------------
// Manifest Endpoints
// ---------------------------------------------------------------------------
app.get('/manifest.json', async (c) => {
  const config = getResolvedConfig(c.env);
  const currentHost = new URL(c.req.url).origin;
  const logoUrl = config.logoUrl.startsWith('http') ? config.logoUrl : `${currentHost}${config.logoUrl}`;
  const manifest = await getCombinedManifest({ ...config, logoUrl });
  return c.json(manifest, 200, {
    'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
  });
});

app.get('/:config/manifest.json', async (c) => {
  const userConfig = decodeConfig(c.req.param('config'));
  const config = getResolvedConfig(c.env, userConfig);
  const currentHost = new URL(c.req.url).origin;
  const logoUrl = config.logoUrl.startsWith('http') ? config.logoUrl : `${currentHost}${config.logoUrl}`;
  const manifest = await getCombinedManifest({ ...config, logoUrl });
  return c.json(manifest, 200, {
    'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
  });
});

// ---------------------------------------------------------------------------
// Nuvio Collection Layout Endpoints
// ---------------------------------------------------------------------------
app.get('/collection.json', (c) => {
  const config = getResolvedConfig(c.env);
  const json = getCollectionJson(config.addonId);
  return c.text(json, 200, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
  });
});

app.get('/:config/collection.json', (c) => {
  const userConfig = decodeConfig(c.req.param('config'));
  const config = getResolvedConfig(c.env, userConfig);
  const json = getCollectionJson(config.addonId);
  return c.text(json, 200, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
  });
});

// ---------------------------------------------------------------------------
// Catalog Relay Endpoints
// ---------------------------------------------------------------------------
app.get('/catalog/:type/:pathParam{.+}', async (c) => {
  const { type, pathParam } = c.req.param();
  const config = getResolvedConfig(c.env);
  return relayCatalog(config.metadataBase, config.streamBase, type, pathParam);
});

app.get('/:config/catalog/:type/:pathParam{.+}', async (c) => {
  const { config: rawConfig, type, pathParam } = c.req.param();
  const userConfig = decodeConfig(rawConfig);
  const config = getResolvedConfig(c.env, userConfig);
  return relayCatalog(config.metadataBase, config.streamBase, type, pathParam);
});

// ---------------------------------------------------------------------------
// Meta Relay Endpoints
// ---------------------------------------------------------------------------
app.get('/meta/:type/:pathParam{.+}', async (c) => {
  const { type, pathParam } = c.req.param();
  const config = getResolvedConfig(c.env);
  return relayMeta(config.metadataBase, config.streamBase, type, pathParam);
});

app.get('/:config/meta/:type/:pathParam{.+}', async (c) => {
  const { config: rawConfig, type, pathParam } = c.req.param();
  const userConfig = decodeConfig(rawConfig);
  const config = getResolvedConfig(c.env, userConfig);
  return relayMeta(config.metadataBase, config.streamBase, type, pathParam);
});

// ---------------------------------------------------------------------------
// Stream Relay Endpoints
// ---------------------------------------------------------------------------
app.get('/stream/:type/:pathParam{.+}', async (c) => {
  const { type, pathParam } = c.req.param();
  const config = getResolvedConfig(c.env);
  return relayStream(config.streamBase, type, pathParam, config.addonName);
});

app.get('/:config/stream/:type/:pathParam{.+}', async (c) => {
  const { config: rawConfig, type, pathParam } = c.req.param();
  const userConfig = decodeConfig(rawConfig);
  const config = getResolvedConfig(c.env, userConfig);
  return relayStream(config.streamBase, type, pathParam, config.addonName);
});

// ---------------------------------------------------------------------------
// Subtitles Relay & Merge Endpoints
// ---------------------------------------------------------------------------
app.get('/subtitles/:type/:pathParam{.+}', async (c) => {
  const { type, pathParam } = c.req.param();
  const config = getResolvedConfig(c.env);
  return relaySubtitles(config.subsBase, config.streamBase, type, pathParam);
});

app.get('/:config/subtitles/:type/:pathParam{.+}', async (c) => {
  const { config: rawConfig, type, pathParam } = c.req.param();
  const userConfig = decodeConfig(rawConfig);
  const config = getResolvedConfig(c.env, userConfig);
  return relaySubtitles(config.subsBase, config.streamBase, type, pathParam);
});

// Global Fallback
app.notFound((c) => {
  return c.json({ error: 'Not Found' }, 404);
});

app.onError((err, c) => {
  console.error('Unhandled error:', err);
  // Full detail stays in the logs; never echo err.message to clients.
  return c.json({ error: 'Internal Server Error' }, 500);
});

export default app;
