import type { StremioManifest } from './types.ts';

// In-memory manifest cache per worker instance
const manifestCache = new Map<string, { manifest: StremioManifest; timestamp: number }>();
const CACHE_TTL_MS = 10 * 60 * 1000; // 10 minutes

/**
 * Fallback manifest when upstreams are unreachable during manifest build
 */
const DEFAULT_FALLBACK_MANIFEST: StremioManifest = {
  id: 'irfan.nuvio.aio',
  version: '1.0.0',
  name: 'fanzirfan AIO',
  description: 'All-in-One Stremio Addon relaying AIOMetadata, Pengu Streams & Live TV, and Nuvio Clean Subtitles.',
  resources: ['catalog', 'meta', 'stream', 'subtitles'],
  types: ['movie', 'series', 'anime', 'anime.movie', 'anime.series', 'tv', 'Trakt', 'collection'],
  idPrefixes: [
    'tmdb:',
    'tt',
    'tvdb:',
    'mal:',
    'tvmaze:',
    'kitsu:',
    'anidb:',
    'anilist:',
    'tvdbc:',
    'upnext_',
    'unwatched_',
    'mdblist_upnext_',
    'pmdb_resume_',
    'simkl_upnext_',
    'aiom.error.',
    'aiom.collection:',
    'pp-live:',
  ],
  catalogs: [],
  behaviorHints: {
    configurable: true,
    configurationRequired: false,
  },
};

/**
 * Fetch and build the combined AIO manifest from upstream services
 */
export async function getCombinedManifest(params: {
  metadataBase: string;
  streamBase: string;
  subsBase: string;
  addonId: string;
  addonName: string;
  addonDesc: string;
  logoUrl?: string;
}): Promise<StremioManifest> {
  if (!params.metadataBase && !params.streamBase && !params.subsBase) {
    return {
      ...DEFAULT_FALLBACK_MANIFEST,
      id: params.addonId,
      name: params.addonName,
      description: params.addonDesc,
      behaviorHints: {
        configurable: true,
        configurationRequired: true,
      },
    };
  }

  const cacheKey = `${params.metadataBase}|${params.streamBase}|${params.subsBase}|${params.addonId}`;
  const cached = manifestCache.get(cacheKey);
  const now = Date.now();

  if (cached && now - cached.timestamp < CACHE_TTL_MS) {
    return cached.manifest;
  }

  try {
    const metaPromise = params.metadataBase
      ? fetch(`${params.metadataBase}/manifest.json`, {
          headers: { 'User-Agent': 'fanzirfan-aio/1.0' },
        }).then((r) => (r.ok ? r.json() : null))
      : Promise.resolve(null);

    const streamPromise = params.streamBase
      ? fetch(`${params.streamBase}/manifest.json`, {
          headers: { 'User-Agent': 'fanzirfan-aio/1.0' },
        }).then((r) => (r.ok ? r.json() : null))
      : Promise.resolve(null);

    const [metaManifestRes, streamManifestRes] = await Promise.allSettled([
      metaPromise,
      streamPromise,
    ]);

    const metaManifest: StremioManifest | null =
      metaManifestRes.status === 'fulfilled' ? (metaManifestRes.value as StremioManifest | null) : null;
    const streamManifest: StremioManifest | null =
      streamManifestRes.status === 'fulfilled' ? (streamManifestRes.value as StremioManifest | null) : null;

    // Combine types
    const typesSet = new Set<string>([
      'movie',
      'series',
      ...(metaManifest?.types || []),
      ...(streamManifest?.types || []),
    ]);

    // Combine idPrefixes
    const prefixesSet = new Set<string>([
      'tt',
      'tmdb:',
      'tvdb:',
      'mal:',
      'kitsu:',
      'tvmaze:',
      'anilist:',
      'anidb:',
      'pp-live:',
      ...(metaManifest?.idPrefixes || []),
      ...(streamManifest?.idPrefixes || []),
    ]);

    // Catalogs: primarily AIOMetadata catalogs + any Live TV / stream catalogs
    const catalogs = [
      ...(metaManifest?.catalogs || []),
      ...(streamManifest?.catalogs || []),
    ];

    const combinedManifest: StremioManifest = {
      id: params.addonId,
      version: '1.0.0',
      name: params.addonName,
      description: params.addonDesc,
      logo: params.logoUrl || metaManifest?.logo || streamManifest?.logo,
      background: metaManifest?.background || streamManifest?.background,
      resources: ['catalog', 'meta', 'stream', 'subtitles'],
      types: Array.from(typesSet),
      idPrefixes: Array.from(prefixesSet),
      catalogs,
      behaviorHints: {
        configurable: true,
        configurationRequired: false,
        newEpisodeNotifications: true,
      },
    };

    manifestCache.set(cacheKey, { manifest: combinedManifest, timestamp: now });
    return combinedManifest;
  } catch (err) {
    console.error('Error constructing combined manifest:', err);

    // Fallback if network issue
    const fallback: StremioManifest = {
      ...DEFAULT_FALLBACK_MANIFEST,
      id: params.addonId,
      name: params.addonName,
      description: params.addonDesc,
      logo: params.logoUrl,
    };
    return fallback;
  }
}
