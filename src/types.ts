export interface AddonConfig {
  metadataUrl?: string;
  streamUrl?: string;
  subsUrl?: string;
}

export interface Env {
  ADDON_NAME?: string;
  ADDON_ID?: string;
  ADDON_DESC?: string;
  DEFAULT_METADATA_URL?: string;
  DEFAULT_STREAM_URL?: string;
  DEFAULT_SUBS_URL?: string;
}

export interface StremioCatalog {
  id: string;
  type: string;
  name: string;
  pageSize?: number;
  extra?: Array<{
    name: string;
    options?: string[];
    isRequired?: boolean;
    default?: string;
  }>;
  showInHome?: boolean;
  [key: string]: any;
}

export interface StremioManifest {
  id: string;
  version: string;
  name: string;
  description: string;
  logo?: string;
  background?: string;
  resources: Array<string | { name: string; types: string[]; idPrefixes?: string[] }>;
  types: string[];
  idPrefixes?: string[];
  catalogs: StremioCatalog[];
  behaviorHints?: {
    configurable?: boolean;
    configurationRequired?: boolean;
    [key: string]: any;
  };
  [key: string]: any;
}

export interface StremioSubtitle {
  id: string;
  url: string;
  lang: string;
  label?: string;
  title?: string;
  name?: string;
  [key: string]: any;
}
