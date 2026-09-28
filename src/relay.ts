import type { StremioSubtitle } from './types.ts';

const FETCH_TIMEOUT_MS = 20000;

async function fetchWithTimeout(url: string, headers: Record<string, string> = {}): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  try {
    const res = await fetch(url, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'fanzirfan-aio/1.0 (Stremio)',
        Accept: 'application/json',
        ...headers,
      },
    });
    return res;
  } finally {
    clearTimeout(timeoutId);
  }
}

/**
 * Relay catalog requests to either Pengu (for Live TV) or AIOMetadata
 */
export async function relayCatalog(
  metadataBase: string,
  streamBase: string,
  type: string,
  pathParam: string
): Promise<Response> {
  const targetBase = type === 'tv' ? streamBase : metadataBase;
  if (!targetBase) {
    return new Response(JSON.stringify({ metas: [] }), {
      status: 200,
      headers: { 'Content-Type': 'application/json; charset=utf-8', 'Access-Control-Allow-Origin': '*' },
    });
  }
  const targetUrl = `${targetBase}/catalog/${type}/${pathParam}`;

  try {
    const upstreamRes = await fetchWithTimeout(targetUrl);
    const body = await upstreamRes.text();

    return new Response(body, {
      status: upstreamRes.status,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
        'Cache-Control': 'public, max-age=1800, stale-while-revalidate=86400',
      },
    });
  } catch (err) {
    console.error('Error relaying catalog:', err);
    return new Response(JSON.stringify({ metas: [] }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Access-Control-Allow-Origin': '*',
      },
    });
  }
}

/**
 * Relay meta requests to AIOMetadata or Pengu (for Live TV / pp-live)
 */
export async function relayMeta(
  metadataBase: string,
  streamBase: string,
  type: string,
  pathParam: string
): Promise<Response> {
  const isPenguMeta = type === 'tv' || pathParam.startsWith('pp-live:');
  const targetBase = isPenguMeta ? streamBase : metadataBase;
  if (!targetBase) {
    return new Response(JSON.stringify({ meta: null }), {
      status: 200,
      headers: { 'Content-Type': 'application/json; charset=utf-8', 'Access-Control-Allow-Origin': '*' },
    });
  }
  const targetUrl = `${targetBase}/meta/${type}/${pathParam}`;

  try {
    const upstreamRes = await fetchWithTimeout(targetUrl);
    const body = await upstreamRes.text();

    return new Response(body, {
      status: upstreamRes.status,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
        'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
      },
    });
  } catch (err) {
    console.error('Error relaying meta:', err);
    return new Response(JSON.stringify({ meta: null }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Access-Control-Allow-Origin': '*',
      },
    });
  }
}

/**
 * Relay stream requests directly to Pengu, replacing PenguPlay branding with addonName
 */
export async function relayStream(
  streamBase: string,
  type: string,
  pathParam: string,
  addonName: string = 'fanzirfan AIO'
): Promise<Response> {
  if (!streamBase) {
    return new Response(JSON.stringify({ streams: [] }), {
      status: 200,
      headers: { 'Content-Type': 'application/json; charset=utf-8', 'Access-Control-Allow-Origin': '*' },
    });
  }
  const targetUrl = `${streamBase}/stream/${type}/${pathParam}`;

  try {
    const upstreamRes = await fetchWithTimeout(targetUrl);
    const data = (await upstreamRes.json()) as { streams?: Array<Record<string, any>> };

    if (Array.isArray(data?.streams)) {
      data.streams = data.streams
        .filter(
          (stream) =>
            !stream.externalUrl?.includes('donate') &&
            !stream.name?.toLowerCase().includes('support the project')
        )
        .map((stream) => {
          if (typeof stream.name === 'string') {
            const newName = stream.name
              .replace(/[\u{1F427}\u{1F9A7}\s]*PenguPlay[\u{1F427}\u{1F9A7}\s]*/gui, `${addonName} `)
              .replace(/PenguPlay/gi, addonName)
              .replace(/\s+/g, ' ')
              .trim();
            stream.name = newName;
          }
          if (typeof stream.description === 'string') {
            stream.description = stream.description
              .replace(/PenguPlay/gi, addonName)
              .replace(/pengu\.uk/gi, 'aio')
              .trim();
          }
          return stream;
        });
    }

    return new Response(JSON.stringify(data), {
      status: upstreamRes.status,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
        'Cache-Control': 'public, max-age=600',
      },
    });
  } catch (err) {
    console.error('Error relaying stream:', err);
    return new Response(JSON.stringify({ streams: [] }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Access-Control-Allow-Origin': '*',
      },
    });
  }
}

/**
 * Relay subtitle requests:
 * Fetch both Nuvio Subs (ad-free) and Pengu Subs in parallel, then merge.
 */
export async function relaySubtitles(
  subsBase: string,
  streamBase: string,
  type: string,
  pathParam: string
): Promise<Response> {
  if (!subsBase && !streamBase) {
    return new Response(JSON.stringify({ subtitles: [] }), {
      status: 200,
      headers: { 'Content-Type': 'application/json; charset=utf-8', 'Access-Control-Allow-Origin': '*' },
    });
  }
  const nuvioUrl = subsBase ? `${subsBase}/subtitles/${type}/${pathParam}` : '';
  const penguUrl = streamBase ? `${streamBase}/subtitles/${type}/${pathParam}` : '';

  try {
    const [nuvioRes, penguRes] = await Promise.allSettled([
      fetchWithTimeout(nuvioUrl).then((r) => (r.ok ? (r.json() as Promise<{ subtitles?: StremioSubtitle[] }>) : null)),
      fetchWithTimeout(penguUrl).then((r) => (r.ok ? (r.json() as Promise<{ subtitles?: StremioSubtitle[] }>) : null)),
    ]);

    const nuvioSubs: StremioSubtitle[] =
      nuvioRes.status === 'fulfilled' && (nuvioRes.value as { subtitles?: StremioSubtitle[] } | null)?.subtitles
        ? (nuvioRes.value as { subtitles: StremioSubtitle[] }).subtitles
        : [];

    const penguSubs: StremioSubtitle[] =
      penguRes.status === 'fulfilled' && (penguRes.value as { subtitles?: StremioSubtitle[] } | null)?.subtitles
        ? (penguRes.value as { subtitles: StremioSubtitle[] }).subtitles
        : [];

    // Merge subtitles: Nuvio Subs first, Pengu Subs next, deduplicating identical URLs
    const seenUrls = new Set<string>();
    const mergedSubs: StremioSubtitle[] = [];

    for (const sub of nuvioSubs) {
      if (sub.url && !seenUrls.has(sub.url)) {
        seenUrls.add(sub.url);
        mergedSubs.push(sub);
      }
    }

    for (const sub of penguSubs) {
      if (sub.url && !seenUrls.has(sub.url)) {
        seenUrls.add(sub.url);
        const formattedSub: StremioSubtitle = {
          ...sub,
          label: sub.label || sub.title || `[Backup] ${sub.lang}`,
          title: sub.title || sub.label || `[Backup] ${sub.lang}`,
        };
        mergedSubs.push(formattedSub);
      }
    }

    return new Response(JSON.stringify({ subtitles: mergedSubs }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
        'Cache-Control': 'public, max-age=3600',
      },
    });
  } catch (err) {
    console.error('Error merging subtitles:', err);
    return new Response(JSON.stringify({ subtitles: [] }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Access-Control-Allow-Origin': '*',
      },
    });
  }
}
