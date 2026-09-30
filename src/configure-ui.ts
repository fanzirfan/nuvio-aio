export function renderConfigureHtml(params: {
  currentHost: string;
  defaultMetadataUrl: string;
  defaultStreamUrl: string;
  defaultSubsUrl: string;
  addonName: string;
}): string {
  return `<!DOCTYPE html>
<html lang="en" class="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${params.addonName} &mdash; AIO Relay</title>
  <link rel="icon" type="image/svg+xml" href="/favicon.svg">
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png">
  <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16.png">
  <link rel="shortcut icon" href="/favicon.ico">
  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
  <link rel="manifest" href="/site.webmanifest">
  <meta name="theme-color" content="#0D0E13">
  <meta name="color-scheme" content="dark">
  <meta property="og:title" content="${params.addonName} &mdash; All-in-One Stremio &amp; Nuvio Relay">
  <meta property="og:description" content="Single unified endpoint combining rich metadata catalogs, multi-provider streams with Live TV, and ad-free subtitles.">
  <meta property="og:image" content="/icon-512.png">
  <meta property="og:type" content="website">
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700;800&family=JetBrains+Mono:wght@500;600;700;800&display=swap" rel="stylesheet">
  <script>
    tailwind.config = {
      darkMode: 'class',
      theme: {
        extend: {
          fontFamily: {
            sans: ['"Space Grotesk"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
            mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
          },
          colors: {
            lavender: {
              DEFAULT: '#B8A9FF',
              hover: '#A594FF',
              dark: '#2A244D',
            },
            mint: {
              DEFAULT: '#A7F3D0',
              hover: '#86EFAC',
              dark: '#133929',
            },
            neo: {
              bg: '#0D0E13',
              card: '#161720',
              cardHeader: '#12131A',
              input: '#0A0B0F',
              border: '#2A2C3C',
              borderDark: '#050608',
              muted: '#9496A8',
            }
          },
          boxShadow: {
            'neo-sm': '2px 2px 0px #050608',
            'neo': '4px 4px 0px #050608',
            'neo-lg': '6px 6px 0px #050608',
            'neo-lavender': '3px 3px 0px #B8A9FF',
            'neo-mint': '3px 3px 0px #A7F3D0',
          }
        }
      }
    }
  </script>
  <style>
    body {
      font-family: 'Space Grotesk', -apple-system, BlinkMacSystemFont, sans-serif;
      background-color: #0D0E13;
      background-image: radial-gradient(#26283A 1px, transparent 1px);
      background-size: 20px 20px;
      color: #EDEDF2;
    }
    code, .font-mono { font-family: 'JetBrains Mono', monospace; }
  </style>
</head>
<body class="min-h-screen flex flex-col justify-between antialiased selection:bg-[#B8A9FF] selection:text-black">
  <!-- Top Navigation / Brand Bar -->
  <header class="border-b-2 border-black bg-[#12131A]/90 backdrop-blur-md sticky top-0 z-30">
    <div class="max-w-2xl mx-auto px-4 h-16 flex items-center justify-between">
      <div class="flex items-center space-x-3">
        <!-- Logo Emblem -->
        <a href="/" class="w-9 h-9 rounded-lg bg-[#161720] border-2 border-black shadow-neo-sm flex items-center justify-center p-1.5 transition-transform hover:-rotate-3">
          <svg class="w-full h-full text-zinc-100" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-width="34" stroke-linecap="round" stroke-linejoin="round">
            <g transform="translate(19.2, 19.2) scale(0.85)">
              <path d="M 76 192 L 76 98 C 76 60 104 60 116 84 L 140 172 C 152 196 180 196 180 158 L 180 64" />
            </g>
          </svg>
        </a>
        <div class="flex items-center space-x-2">
          <span class="text-base font-extrabold tracking-tight text-white">${params.addonName}</span>
          <span class="text-[11px] font-mono font-bold bg-[#A7F3D0] text-black border-2 border-black px-2 py-0.5 rounded shadow-[1.5px_1.5px_0px_#000]">v1.0.0</span>
        </div>
      </div>
      <div class="flex items-center space-x-3 text-xs">
        <span class="font-mono font-bold bg-[#161720] text-[#A7F3D0] border-2 border-black px-2.5 py-1 rounded-lg shadow-neo-sm inline-flex items-center gap-1.5">
          <span class="w-2 h-2 rounded-full bg-[#A7F3D0] animate-pulse"></span>
          Edge Active
        </span>
      </div>
    </div>
  </header>

  <!-- Main Container -->
  <main class="max-w-2xl mx-auto w-full px-4 py-8 flex-1">
    <!-- Hero / Headline Box -->
    <div class="mb-8 bg-[#161720] border-2 border-black rounded-2xl p-6 shadow-neo">
      <div class="inline-block bg-[#B8A9FF] text-black border-2 border-black font-mono font-bold text-xs uppercase px-2.5 py-1 rounded shadow-neo-sm mb-3">
        Nuvio Ecosystem &bull; All-in-One Engine
      </div>
      <h1 class="text-2xl sm:text-3xl font-black tracking-tight text-white">Nuvio All-in-One Relay</h1>
      <p class="text-sm font-medium text-zinc-400 mt-2 leading-relaxed">
        Unified streaming middleware built specifically for Nuvio (and compatible with Stremio). Merges rich catalogs, multi-provider streams with Live TV, and clean ad-free subtitles.
      </p>
    </div>

    <!-- Overview Badges -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
      <div class="bg-[#161720] border-2 border-black rounded-xl p-4 shadow-neo">
        <div class="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
          <span class="w-2 h-2 bg-[#B8A9FF] border border-black rounded-sm inline-block"></span>
          Metadata &amp; Catalogs
        </div>
        <div class="text-sm font-extrabold text-white mt-1.5">AIOMetadata</div>
        <div class="text-[11px] font-mono font-medium text-zinc-400 mt-0.5">33+ Curated Catalogs</div>
      </div>
      <div class="bg-[#161720] border-2 border-black rounded-xl p-4 shadow-neo">
        <div class="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
          <span class="w-2 h-2 bg-[#A7F3D0] border border-black rounded-sm inline-block"></span>
          Streams &amp; Channels
        </div>
        <div class="text-sm font-extrabold text-white mt-1.5">PenguPlay</div>
        <div class="text-[11px] font-mono font-medium text-zinc-400 mt-0.5">VOD &amp; Live TV Engine</div>
      </div>
      <div class="bg-[#161720] border-2 border-black rounded-xl p-4 shadow-neo">
        <div class="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
          <span class="w-2 h-2 bg-[#FDE68A] border border-black rounded-sm inline-block"></span>
          Zero-Ad Subtitles
        </div>
        <div class="text-sm font-extrabold text-white mt-1.5">Nuvio Subs + Pengu</div>
        <div class="text-[11px] font-mono font-medium text-zinc-400 mt-0.5">Auto-Merged &amp; Cleaned</div>
      </div>
    </div>

    <form id="configForm" class="space-y-6" onsubmit="event.preventDefault();">
      <!-- Section 1: Metadata Upstream -->
      <div class="bg-[#161720] border-2 border-black rounded-2xl p-5 sm:p-6 shadow-neo space-y-3">
        <div class="flex items-center justify-between">
          <label for="metadataUrl" class="text-xs font-mono font-bold uppercase tracking-wider text-zinc-200 flex items-center gap-1.5">
            <span class="w-2.5 h-2.5 bg-[#B8A9FF] border border-black rounded-sm inline-block"></span>
            Metadata Provider
          </label>
          <span class="text-[11px] text-zinc-400 font-mono font-bold bg-[#0A0B0F] border border-black px-1.5 py-0.5 rounded">
            catalog / meta
          </span>
        </div>
        <p class="text-xs text-zinc-400 font-medium">
          Powers Nuvio home carousels, genre filters, and detailed movie/series metadata.
        </p>
        <div class="relative">
          <input 
            type="text" 
            id="metadataUrl" 
            value="${params.defaultMetadataUrl}" 
            placeholder="https://aiometadata.../manifest.json" 
            class="w-full bg-[#0A0B0F] border-2 border-black rounded-xl px-4 py-2.5 text-xs font-mono font-bold text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-[#B8A9FF] focus:shadow-neo-lavender transition"
          />
        </div>
      </div>

      <!-- Section 2: Stream Upstream -->
      <div class="bg-[#161720] border-2 border-black rounded-2xl p-5 sm:p-6 shadow-neo space-y-3">
        <div class="flex items-center justify-between">
          <label for="streamUrl" class="text-xs font-mono font-bold uppercase tracking-wider text-zinc-200 flex items-center gap-1.5">
            <span class="w-2.5 h-2.5 bg-[#A7F3D0] border border-black rounded-sm inline-block"></span>
            Stream &amp; Live TV Provider
          </label>
          <span class="text-[11px] text-zinc-400 font-mono font-bold bg-[#0A0B0F] border border-black px-1.5 py-0.5 rounded">
            stream / pp-live
          </span>
        </div>
        <p class="text-xs text-zinc-400 font-medium">
          Supplies multi-source video playback, quality selectors, and live broadcast channels to Nuvio.
        </p>
        <div class="relative">
          <input 
            type="text" 
            id="streamUrl" 
            value="${params.defaultStreamUrl}" 
            placeholder="https://pengu.uk/.../manifest.json" 
            class="w-full bg-[#0A0B0F] border-2 border-black rounded-xl px-4 py-2.5 text-xs font-mono font-bold text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-[#B8A9FF] focus:shadow-neo-lavender transition"
          />
        </div>
      </div>

      <!-- Section 3: Subtitles Upstream -->
      <div class="bg-[#161720] border-2 border-black rounded-2xl p-5 sm:p-6 shadow-neo space-y-3">
        <div class="flex items-center justify-between">
          <label for="subsUrl" class="text-xs font-mono font-bold uppercase tracking-wider text-zinc-200 flex items-center gap-1.5">
            <span class="w-2.5 h-2.5 bg-[#FDE68A] border border-black rounded-sm inline-block"></span>
            Subtitle Provider
          </label>
          <span class="text-[11px] text-zinc-400 font-mono font-bold bg-[#0A0B0F] border border-black px-1.5 py-0.5 rounded">
            subtitles (parallel)
          </span>
        </div>
        <p class="text-xs text-zinc-400 font-medium">
          Fetches sanitized, ad-free subtitles first, then appends secondary provider subtitles for Nuvio playback.
        </p>
        <div class="relative">
          <input 
            type="text" 
            id="subsUrl" 
            value="${params.defaultSubsUrl}" 
            placeholder="https://nuvio-subs.../manifest.json" 
            class="w-full bg-[#0A0B0F] border-2 border-black rounded-xl px-4 py-2.5 text-xs font-mono font-bold text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-[#B8A9FF] focus:shadow-neo-lavender transition"
          />
        </div>
      </div>

      <!-- Connection Health Diagnostics Box -->
      <div class="bg-[#161720] border-2 border-black rounded-2xl overflow-hidden shadow-neo">
        <div class="px-5 py-3.5 border-b-2 border-black bg-[#12131A] flex items-center justify-between">
          <div class="flex items-center space-x-2.5">
            <span class="w-3 h-3 rounded-full border border-black bg-zinc-600 inline-block shadow-[1px_1px_0px_#000]" id="diagIndicator"></span>
            <span class="text-xs font-mono font-bold uppercase tracking-wider text-zinc-200">Live Upstream Healthcheck</span>
          </div>
          <button 
            type="button" 
            id="testBtn" 
            onclick="testUpstreams()" 
            class="text-xs bg-[#A7F3D0] hover:bg-[#86EFAC] text-black px-3 py-1.5 rounded-lg font-mono font-bold transition-all border-2 border-black shadow-neo-sm hover:translate-x-[-1px] hover:translate-y-[-1px] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none inline-flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
          >
            <svg class="w-3.5 h-3.5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
            <span>Run Ping Test</span>
          </button>
        </div>
        <div id="debugResults" class="p-5 space-y-2.5 text-xs font-mono">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-xl bg-[#0A0B0F] border-2 border-black gap-1 shadow-[2px_2px_0px_#050608]">
            <span class="text-zinc-300 font-bold">Metadata (AIOMetadata)</span>
            <span id="metaStatus" class="text-zinc-500 font-semibold">STANDBY</span>
          </div>
          <div class="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-xl bg-[#0A0B0F] border-2 border-black gap-1 shadow-[2px_2px_0px_#050608]">
            <span class="text-zinc-300 font-bold">Stream (PenguPlay)</span>
            <span id="streamStatus" class="text-zinc-500 font-semibold">STANDBY</span>
          </div>
          <div class="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-xl bg-[#0A0B0F] border-2 border-black gap-1 shadow-[2px_2px_0px_#050608]">
            <span class="text-zinc-300 font-bold">Subtitles (Nuvio Subs)</span>
            <span id="subsStatus" class="text-zinc-500 font-semibold">STANDBY</span>
          </div>
        </div>
      </div>

      <!-- Manifest Output & Installation Station -->
      <div class="bg-[#161720] border-2 border-black rounded-2xl p-5 sm:p-6 shadow-neo space-y-4">
        <div>
          <div class="flex items-center justify-between mb-2">
            <label class="text-xs font-mono font-bold uppercase tracking-wider text-zinc-300 flex items-center gap-1.5">
              <span class="w-2.5 h-2.5 bg-[#B8A9FF] border border-black rounded-sm inline-block"></span>
              Active Addon Endpoint (Nuvio &amp; Stremio)
            </label>
            <button type="button" onclick="resetDefaults()" class="text-[11px] text-zinc-400 hover:text-white font-mono font-bold underline transition">
              Reset Defaults
            </button>
          </div>
          <div class="bg-[#0A0B0F] border-2 border-black rounded-xl p-3 font-mono font-bold text-xs text-zinc-200 break-all select-all shadow-[2px_2px_0px_#050608]" id="manifestDisplay">
            Calculating...
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          <button 
            type="button" 
            onclick="installAddon()" 
            title="Install to Stremio or Nuvio"
            class="w-full bg-[#B8A9FF] hover:bg-[#A594FF] text-black font-extrabold text-sm py-3 px-4 rounded-xl border-2 border-black shadow-neo transition-all hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-neo-lg active:translate-x-[2px] active:translate-y-[2px] active:shadow-none flex items-center justify-center gap-2 font-mono cursor-pointer"
          >
            <svg class="w-4 h-4 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
            </svg>
            <span>Install to Nuvio / Stremio</span>
          </button>
          
          <button 
            type="button" 
            onclick="openStremioWeb()" 
            class="w-full bg-[#161720] hover:bg-[#1E202B] text-zinc-100 font-bold text-sm py-3 px-4 rounded-xl border-2 border-black shadow-neo transition-all hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-neo-lg active:translate-x-[2px] active:translate-y-[2px] active:shadow-none flex items-center justify-center gap-2 font-mono cursor-pointer"
          >
            <svg class="w-4 h-4 fill-none stroke-current" stroke-width="2" viewBox="0 0 24 24"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
            <span>Open in Stremio Web</span>
          </button>
        </div>

        <button 
          type="button" 
          onclick="copyAddonUrl()" 
          id="copyBtn"
          class="w-full bg-[#0A0B0F] hover:bg-[#161720] text-zinc-200 border-2 border-black rounded-xl py-3 px-4 text-xs font-mono font-bold shadow-neo-sm transition-all hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-neo active:translate-x-[1px] active:translate-y-[1px] active:shadow-none flex items-center justify-center gap-2 cursor-pointer"
        >
          <svg class="w-4 h-4 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
          <span id="copyBtnText">Copy Manifest URL</span>
        </button>
        <p class="text-[11px] text-zinc-500 font-mono">
          For Nuvio: Tap "Install to Nuvio / Stremio" or paste the copied manifest URL into Nuvio Settings &rarr; Addons.
        </p>
      </div>

      <!-- Section: Nuvio Collections Station -->
      <div class="bg-[#161720] border-2 border-black rounded-2xl p-5 sm:p-6 shadow-neo space-y-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <span class="w-2.5 h-2.5 bg-[#A7F3D0] border border-black rounded-sm inline-block"></span>
            <label class="text-xs font-mono font-bold uppercase tracking-wider text-zinc-200">Nuvio Collections Layout</label>
          </div>
          <span class="text-[11px] font-mono font-bold text-black bg-[#A7F3D0] border-2 border-black px-2 py-0.5 rounded shadow-[1.5px_1.5px_0px_#000]">
            88 Rows &bull; 3 Categories
          </span>
        </div>
        <p class="text-xs text-zinc-400 font-medium leading-relaxed">
          Pre-configured collection layout for Nuvio home screen. Contains Discover, Streaming Platforms, and Genres wired to this relay.
        </p>

        <div>
          <label class="text-[11px] font-mono font-bold uppercase text-zinc-400 mb-1.5 block">Collection URL</label>
          <div class="bg-[#0A0B0F] border-2 border-black rounded-xl p-3 font-mono font-bold text-xs text-zinc-200 break-all select-all shadow-[2px_2px_0px_#050608]" id="collectionDisplay">
            Calculating...
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          <button 
            type="button" 
            onclick="copyCollectionUrl()" 
            id="copyCollectionBtn"
            class="w-full bg-[#161720] hover:bg-[#1E202B] text-zinc-100 font-bold text-xs py-3 px-4 rounded-xl border-2 border-black shadow-neo transition-all hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-neo-lg active:translate-x-[2px] active:translate-y-[2px] active:shadow-none flex items-center justify-center gap-2 font-mono cursor-pointer"
          >
            <svg class="w-4 h-4 fill-none stroke-current" stroke-width="2" viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
            <span id="copyCollectionBtnText">Copy Collection URL</span>
          </button>
          
          <button 
            type="button" 
            onclick="downloadCollectionJson()" 
            class="w-full bg-[#161720] hover:bg-[#1E202B] text-zinc-100 font-bold text-xs py-3 px-4 rounded-xl border-2 border-black shadow-neo transition-all hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-neo-lg active:translate-x-[2px] active:translate-y-[2px] active:shadow-none flex items-center justify-center gap-2 font-mono cursor-pointer"
          >
            <svg class="w-4 h-4 fill-none stroke-current" stroke-width="2" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            <span>Download collection.json</span>
          </button>
        </div>
        <p class="text-[11px] text-zinc-500 font-mono font-medium">
          Import in Nuvio App &rarr; Settings &rarr; Collections &rarr; Import from URL or File.
        </p>
      </div>
    </form>
  </main>

  <!-- Footer -->
  <footer class="border-t-2 border-black bg-[#12131A] py-6 text-center text-xs text-zinc-400 font-mono font-semibold">
    <div class="flex items-center justify-center gap-2 mb-2 text-zinc-300">
      <svg class="w-4 h-4" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-width="34" stroke-linecap="round" stroke-linejoin="round">
        <g transform="translate(19.2, 19.2) scale(0.85)">
          <path d="M 76 192 L 76 98 C 76 60 104 60 116 84 L 140 172 C 152 196 180 196 180 158 L 180 64"/>
        </g>
      </svg>
      <span class="font-bold text-white">${params.addonName}</span>
      <span>&bull;</span>
      <span>v1.0.0</span>
    </div>
    <div class="text-[11px] text-zinc-500">
      <span>Zero ads. Multi-source relay for Nuvio &amp; Stremio. Powered by Cloudflare Workers &amp; Hono.</span>
      <span class="mx-1">&bull;</span>
      <a href="/site.webmanifest" class="hover:text-zinc-300 underline decoration-zinc-700 transition">Manifest</a>
    </div>
  </footer>

  <script>
    const defaultMeta = ${JSON.stringify(params.defaultMetadataUrl)};
    const defaultStream = ${JSON.stringify(params.defaultStreamUrl)};
    const defaultSubs = ${JSON.stringify(params.defaultSubsUrl)};
    const host = window.location.origin;

    const metaInput = document.getElementById('metadataUrl');
    const streamInput = document.getElementById('streamUrl');
    const subsInput = document.getElementById('subsUrl');
    const manifestDisplay = document.getElementById('manifestDisplay');
    const collectionDisplay = document.getElementById('collectionDisplay');

    function getAddonUrls() {
      const meta = metaInput.value.trim();
      const stream = streamInput.value.trim();
      const subs = subsInput.value.trim();

      const isDefault = (meta === defaultMeta && stream === defaultStream && subs === defaultSubs);

      let manifestPath = 'manifest.json';
      if (!isDefault) {
        const config = {
          metadataUrl: meta,
          streamUrl: stream,
          subsUrl: subs
        };
        const encoded = btoa(JSON.stringify(config)).replace(/\\+/g, '-').replace(/\\//g, '_').replace(/=+$/, '');
        manifestPath = encoded + '/manifest.json';
      }

      const httpsUrl = host + '/' + manifestPath;
      const stremioUrl = httpsUrl.replace(/^https?:\\/\\//, 'stremio://');
      const webUrl = 'https://web.stremio.com/#/addons?addon=' + encodeURIComponent(httpsUrl);

      return { httpsUrl, stremioUrl, webUrl };
    }

    function getCollectionUrl() {
      const meta = metaInput.value.trim();
      const stream = streamInput.value.trim();
      const subs = subsInput.value.trim();

      const isDefault = (meta === defaultMeta && stream === defaultStream && subs === defaultSubs);

      let collectionPath = 'collection.json';
      if (!isDefault) {
        const config = {
          metadataUrl: meta,
          streamUrl: stream,
          subsUrl: subs
        };
        const encoded = btoa(JSON.stringify(config)).replace(/\\+/g, '-').replace(/\\//g, '_').replace(/=+$/, '');
        collectionPath = encoded + '/collection.json';
      }

      return host + '/' + collectionPath;
    }

    function updateUrl() {
      const { httpsUrl } = getAddonUrls();
      manifestDisplay.textContent = httpsUrl;
      const collUrl = getCollectionUrl();
      collectionDisplay.textContent = collUrl;
    }

    function installAddon() {
      const { stremioUrl } = getAddonUrls();
      window.location.href = stremioUrl;
    }

    function openStremioWeb() {
      const { webUrl } = getAddonUrls();
      window.open(webUrl, '_blank');
    }

    async function copyAddonUrl() {
      const { httpsUrl } = getAddonUrls();
      await navigator.clipboard.writeText(httpsUrl);
      const textSpan = document.getElementById('copyBtnText');
      textSpan.innerText = 'Copied to Clipboard!';
      setTimeout(() => {
        textSpan.innerText = 'Copy Manifest URL';
      }, 2000);
    }

    async function copyCollectionUrl() {
      const url = getCollectionUrl();
      await navigator.clipboard.writeText(url);
      const textSpan = document.getElementById('copyCollectionBtnText');
      textSpan.innerText = 'Copied to Clipboard!';
      setTimeout(() => {
        textSpan.innerText = 'Copy Collection URL';
      }, 2000);
    }

    function downloadCollectionJson() {
      const url = getCollectionUrl();
      const a = document.createElement('a');
      a.href = url;
      a.download = 'collection.json';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }

    function resetDefaults() {
      metaInput.value = defaultMeta;
      streamInput.value = defaultStream;
      subsInput.value = defaultSubs;
      updateUrl();
    }

    async function testUpstreams() {
      const btn = document.getElementById('testBtn');
      const diagIndicator = document.getElementById('diagIndicator');
      const metaStatus = document.getElementById('metaStatus');
      const streamStatus = document.getElementById('streamStatus');
      const subsStatus = document.getElementById('subsStatus');

      btn.disabled = true;
      diagIndicator.className = 'w-3 h-3 rounded-full border border-black bg-amber-400 animate-pulse inline-block shadow-[1px_1px_0px_#000]';
      metaStatus.innerHTML = '<span class="text-zinc-500 font-bold animate-pulse">QUERYING...</span>';
      streamStatus.innerHTML = '<span class="text-zinc-500 font-bold animate-pulse">QUERYING...</span>';
      subsStatus.innerHTML = '<span class="text-zinc-500 font-bold animate-pulse">QUERYING...</span>';

      try {
        const query = new URLSearchParams({
          metadataUrl: metaInput.value.trim(),
          streamUrl: streamInput.value.trim(),
          subsUrl: subsInput.value.trim()
        });

        const res = await fetch('/api/ping?' + query.toString());
        const data = await res.json();

        renderStatus(metaStatus, data.metadata);
        renderStatus(streamStatus, data.stream);
        renderStatus(subsStatus, data.subs);

        const allOk = data.metadata.ok && data.stream.ok && data.subs.ok;
        diagIndicator.className = allOk 
          ? 'w-3 h-3 rounded-full border border-black bg-emerald-400 inline-block shadow-[1px_1px_0px_#000]' 
          : 'w-3 h-3 rounded-full border border-black bg-rose-500 inline-block shadow-[1px_1px_0px_#000]';
      } catch (err) {
        metaStatus.innerHTML = '<span class="text-rose-400 font-bold">Failed: ' + err.message + '</span>';
        diagIndicator.className = 'w-3 h-3 rounded-full border border-black bg-rose-500 inline-block shadow-[1px_1px_0px_#000]';
      } finally {
        btn.disabled = false;
      }
    }

    function renderStatus(el, result) {
      if (result.ok) {
        el.innerHTML = '<span class="text-emerald-300 font-bold bg-[#133929] border border-black px-2 py-0.5 rounded shadow-[1px_1px_0px_#000]">READY (' + result.latencyMs + 'ms)</span>';
      } else {
        el.innerHTML = '<span class="text-rose-300 font-bold bg-[#3D1418] border border-black px-2 py-0.5 rounded shadow-[1px_1px_0px_#000]">' + (result.error || 'OFFLINE') + '</span>';
      }
    }

    [metaInput, streamInput, subsInput].forEach(el => el.addEventListener('input', updateUrl));
    updateUrl();
  </script>
</body>
</html>`;
}
