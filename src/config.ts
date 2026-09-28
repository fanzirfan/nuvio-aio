import type { AddonConfig, Env } from './types.ts';

export const FALLBACK_DEFAULTS = {
  ADDON_NAME: 'fanzirfan AIO',
  ADDON_ID: 'irfan.nuvio.aio',
  ADDON_DESC: 'All-in-One Stremio Addon relaying AIOMetadata, Pengu Streams & Live TV, and Nuvio Clean Subtitles.',
  METADATA_URL: '',
  STREAM_URL: '',
  SUBS_URL: '',
  LOGO_URL: 'https://raw.githubusercontent.com/stremio/stremio-addon-sdk/master/docs/logo.png',
};

/**
 * Clean URL by removing trailing slashes or trailing /manifest.json
 */
export function normalizeBaseUrl(url?: string): string {
  if (!url) return '';
  let cleaned = url.trim();
  if (cleaned.endsWith('/manifest.json')) {
    cleaned = cleaned.slice(0, -'/manifest.json'.length);
  }
  return cleaned.replace(/\/+$/, '');
}

/**
 * Decode base64 config parameter from URL
 */
export function decodeConfig(rawConfig?: string): AddonConfig {
  if (!rawConfig) return {};

  try {
    // Handle URL-safe base64
    let base64 = rawConfig.replace(/-/g, '+').replace(/_/g, '/');
    while (base64.length % 4 !== 0) {
      base64 += '=';
    }
    const decoded = atob(base64);
    return JSON.parse(decoded) as AddonConfig;
  } catch {
    try {
      // Direct JSON if not base64 encoded
      return JSON.parse(decodeURIComponent(rawConfig)) as AddonConfig;
    } catch {
      return {};
    }
  }
}

/**
 * Encode config into base64 string
 */
export function encodeConfig(config: AddonConfig): string {
  const json = JSON.stringify(config);
  return btoa(json).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

/**
 * Get resolved URLs by merging ENV defaults and user config
 */
export function getResolvedConfig(env?: Env, userConfig?: AddonConfig) {
  const safeEnv = env || {};
  const metadataBase = normalizeBaseUrl(
    userConfig?.metadataUrl || safeEnv.DEFAULT_METADATA_URL || FALLBACK_DEFAULTS.METADATA_URL
  );
  const streamBase = normalizeBaseUrl(
    userConfig?.streamUrl || safeEnv.DEFAULT_STREAM_URL || FALLBACK_DEFAULTS.STREAM_URL
  );
  const subsBase = normalizeBaseUrl(
    userConfig?.subsUrl || safeEnv.DEFAULT_SUBS_URL || FALLBACK_DEFAULTS.SUBS_URL
  );

  const isConfigured = Boolean(metadataBase || streamBase || subsBase);

  return {
    metadataBase,
    streamBase,
    subsBase,
    isConfigured,
    addonName: safeEnv.ADDON_NAME || FALLBACK_DEFAULTS.ADDON_NAME,
    addonId: safeEnv.ADDON_ID || FALLBACK_DEFAULTS.ADDON_ID,
    addonDesc: safeEnv.ADDON_DESC || FALLBACK_DEFAULTS.ADDON_DESC,
    logoUrl: FALLBACK_DEFAULTS.LOGO_URL,
  };
}
