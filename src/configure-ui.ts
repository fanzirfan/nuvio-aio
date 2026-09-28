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
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700&family=Geist+Mono:wght@400;500;600&display=swap" rel="stylesheet">
  <script>
    tailwind.config = {
      darkMode: 'class',
      theme: {
        extend: {
          fontFamily: {
            sans: ['Geist', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
            mono: ['Geist Mono', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
          },
          colors: {
            brand: {
              50: '#f4f4f5',
              100: '#e4e4e7',
              200: '#d4d4d8',
              800: '#27272a',
              900: '#18181b',
              950: '#09090b',
            }
          }
        }
      }
    }
  </script>
  <style>
    body { font-family: 'Geist', sans-serif; }
    code, .font-mono { font-family: 'Geist Mono', monospace; }
  </style>
</head>
<body class="bg-[#09090b] text-[#f4f4f5] min-h-screen flex flex-col justify-between antialiased selection:bg-zinc-800 selection:text-white">
  <!-- Top Bar -->
  <header class="border-b border-zinc-800/80 bg-[#09090b]/80 backdrop-blur-md sticky top-0 z-30">
    <div class="max-w-2xl mx-auto px-4 h-14 flex items-center justify-between">
      <div class="flex items-center space-x-2.5">
        <div class="w-6 h-6 rounded-md bg-zinc-100 flex items-center justify-center text-zinc-950 font-bold text-xs tracking-tight">
          A
        </div>
        <span class="text-sm font-semibold tracking-tight text-zinc-100">${params.addonName}</span>
        <span class="text-[11px] text-zinc-500 font-mono bg-zinc-900 border border-zinc-800 px-1.5 py-0.5 rounded">v1.0.0</span>
      </div>
      <div class="flex items-center space-x-2 text-xs text-zinc-400">
        <span class="inline-flex items-center gap-1.5 text-[11px] font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-800/50 px-2 py-0.5 rounded-full">
          <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
          Edge Active
        </span>
      </div>
    </div>
  </header>

  <!-- Main Content -->
  <main class="max-w-2xl mx-auto w-full px-4 py-8 flex-1">
    <!-- Header Title -->
    <div class="mb-6">
      <h1 class="text-xl font-medium tracking-tight text-zinc-100">All-in-One Relay Engine</h1>
      <p class="text-xs text-zinc-400 mt-1 leading-relaxed">
        Single unified Stremio endpoint combining rich metadata catalogs, multi-provider streams with Live TV, and ad-free subtitles.
      </p>
    </div>

    <!-- Overview Badges -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-6">
      <div class="bg-[#121215] border border-zinc-800/80 rounded-lg p-3">
        <div class="text-[10px] font-mono uppercase tracking-wider text-zinc-500">Metadata & Catalogs</div>
        <div class="text-xs font-semibold text-zinc-200 mt-1">AIOMetadata</div>
        <div class="text-[11px] text-zinc-400 mt-0.5">33+ Curated Catalogs</div>
      </div>
      <div class="bg-[#121215] border border-zinc-800/80 rounded-lg p-3">
        <div class="text-[10px] font-mono uppercase tracking-wider text-zinc-500">Streams & Channels</div>
        <div class="text-xs font-semibold text-zinc-200 mt-1">PenguPlay</div>
        <div class="text-[11px] text-zinc-400 mt-0.5">VOD & Live TV Engine</div>
      </div>
      <div class="bg-[#121215] border border-zinc-800/80 rounded-lg p-3">
        <div class="text-[10px] font-mono uppercase tracking-wider text-zinc-500">Zero-Ad Subtitles</div>
        <div class="text-xs font-semibold text-zinc-200 mt-1">Nuvio Subs + Pengu</div>
        <div class="text-[11px] text-zinc-400 mt-0.5">Auto-Merged & Cleaned</div>
      </div>
    </div>

    <form id="configForm" class="space-y-4" onsubmit="event.preventDefault();">
      <!-- Section 1: Metadata Upstream -->
      <div class="bg-[#121215] border border-zinc-800/80 rounded-xl p-4 sm:p-5">
        <div class="flex items-center justify-between mb-1.5">
          <label for="metadataUrl" class="text-xs font-semibold uppercase tracking-wider text-zinc-300">
            Metadata Provider
          </label>
          <span class="text-[10px] font-mono text-zinc-500 bg-zinc-900 border border-zinc-800 px-1.5 py-0.5 rounded">
            catalog / meta
          </span>
        </div>
        <p class="text-xs text-zinc-400 mb-2.5">
          Powers home carousels, genre filters, and detailed movie/series metadata.
        </p>
        <div class="relative">
          <input 
            type="text" 
            id="metadataUrl" 
            value="${params.defaultMetadataUrl}" 
            placeholder="https://aiometadata.../manifest.json" 
            class="w-full bg-[#09090b] border border-zinc-800 rounded-lg px-3.5 py-2 text-xs font-mono text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 transition"
          />
        </div>
      </div>

      <!-- Section 2: Stream Upstream -->
      <div class="bg-[#121215] border border-zinc-800/80 rounded-xl p-4 sm:p-5">
        <div class="flex items-center justify-between mb-1.5">
          <label for="streamUrl" class="text-xs font-semibold uppercase tracking-wider text-zinc-300">
            Stream & Live TV Provider
          </label>
          <span class="text-[10px] font-mono text-zinc-500 bg-zinc-900 border border-zinc-800 px-1.5 py-0.5 rounded">
            stream / pp-live
          </span>
        </div>
        <p class="text-xs text-zinc-400 mb-2.5">
          Supplies multi-source video playback, quality selectors, and live broadcast channels.
        </p>
        <div class="relative">
          <input 
            type="text" 
            id="streamUrl" 
            value="${params.defaultStreamUrl}" 
            placeholder="https://pengu.uk/.../manifest.json" 
            class="w-full bg-[#09090b] border border-zinc-800 rounded-lg px-3.5 py-2 text-xs font-mono text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 transition"
          />
        </div>
      </div>

      <!-- Section 3: Subtitles Upstream -->
      <div class="bg-[#121215] border border-zinc-800/80 rounded-xl p-4 sm:p-5">
        <div class="flex items-center justify-between mb-1.5">
          <label for="subsUrl" class="text-xs font-semibold uppercase tracking-wider text-zinc-300">
            Subtitle Provider
          </label>
          <span class="text-[10px] font-mono text-zinc-500 bg-zinc-900 border border-zinc-800 px-1.5 py-0.5 rounded">
            subtitles (parallel)
          </span>
        </div>
        <p class="text-xs text-zinc-400 mb-2.5">
          Fetches sanitized, ad-free subtitles first, then appends secondary provider subtitles.
        </p>
        <div class="relative">
          <input 
            type="text" 
            id="subsUrl" 
            value="${params.defaultSubsUrl}" 
            placeholder="https://nuvio-subs.../manifest.json" 
            class="w-full bg-[#09090b] border border-zinc-800 rounded-lg px-3.5 py-2 text-xs font-mono text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 transition"
          />
        </div>
      </div>

      <!-- Connection Health Diagnostics Box -->
      <div class="bg-[#121215] border border-zinc-800/80 rounded-xl p-4 sm:p-5">
        <div class="flex items-center justify-between mb-3">
          <div class="flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-zinc-600 inline-block" id="diagIndicator"></span>
            <span class="text-xs font-semibold uppercase tracking-wider text-zinc-400">Upstream Health Check</span>
          </div>
          <button 
            type="button" 
            id="testBtn" 
            onclick="testUpstreams()" 
            class="text-xs px-2.5 py-1 rounded-md bg-zinc-800 text-zinc-200 hover:bg-zinc-700 hover:text-white transition font-mono border border-zinc-700 disabled:opacity-50"
          >
            Run Ping Test
          </button>
        </div>
        <div id="debugResults" class="space-y-2 text-xs font-mono">
          <div class="flex items-center justify-between py-1 border-b border-zinc-800/50">
            <span class="text-zinc-400">Metadata (AIOMetadata)</span>
            <span id="metaStatus" class="text-zinc-600">STANDBY</span>
          </div>
          <div class="flex items-center justify-between py-1 border-b border-zinc-800/50">
            <span class="text-zinc-400">Stream (PenguPlay)</span>
            <span id="streamStatus" class="text-zinc-600">STANDBY</span>
          </div>
          <div class="flex items-center justify-between py-1">
            <span class="text-zinc-400">Subtitles (Nuvio Subs)</span>
            <span id="subsStatus" class="text-zinc-600">STANDBY</span>
          </div>
        </div>
      </div>

      <!-- Manifest Output & Installation Station -->
      <div class="bg-[#121215] border border-zinc-800/80 rounded-xl p-4 sm:p-5 space-y-4">
        <div>
          <div class="flex items-center justify-between mb-1.5">
            <label class="text-xs font-semibold uppercase tracking-wider text-zinc-400">Active Manifest Endpoint</label>
            <button type="button" onclick="resetDefaults()" class="text-[11px] text-zinc-500 hover:text-zinc-300 font-mono transition">
              Reset to Defaults
            </button>
          </div>
          <div class="bg-[#09090b] border border-zinc-800 rounded-lg p-3 font-mono text-xs text-zinc-300 break-all select-all" id="manifestDisplay">
            Calculating...
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
          <button 
            type="button" 
            onclick="installAddon()" 
            class="w-full bg-zinc-100 text-zinc-950 hover:bg-white font-medium py-2.5 px-4 rounded-lg text-xs transition flex items-center justify-center gap-2 font-mono shadow-sm"
          >
            <svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
            Install to Stremio (App)
          </button>
          
          <button 
            type="button" 
            onclick="openStremioWeb()" 
            class="w-full bg-zinc-900 border border-zinc-700/80 text-zinc-200 hover:bg-zinc-800/80 hover:text-white font-medium py-2.5 px-4 rounded-lg text-xs transition flex items-center justify-center gap-2 font-mono"
          >
            <svg class="w-3.5 h-3.5 fill-none stroke-current" stroke-width="2" viewBox="0 0 24 24"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
            Open in Stremio Web
          </button>
        </div>

        <button 
          type="button" 
          onclick="copyAddonUrl()" 
          class="w-full bg-zinc-900 border border-zinc-800 text-zinc-400 hover:bg-zinc-800/60 hover:text-zinc-200 font-medium py-2 px-4 rounded-lg text-xs transition flex items-center justify-center gap-2 font-mono"
        >
          <svg class="w-3.5 h-3.5 fill-none stroke-current" stroke-width="2" viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
          <span id="copyBtnText">Copy Manifest URL</span>
        </button>
      </div>
    </form>
  </main>

  <!-- Footer -->
  <footer class="border-t border-zinc-900 py-6 text-center text-xs text-zinc-600 font-mono">
    <span>${params.addonName}</span> &bull; <span>Powered by Cloudflare Workers & Hono</span>
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

    function updateUrl() {
      const { httpsUrl } = getAddonUrls();
      manifestDisplay.textContent = httpsUrl;
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
      diagIndicator.className = 'w-2 h-2 rounded-full bg-amber-400 animate-pulse inline-block';
      metaStatus.innerHTML = '<span class="text-zinc-500 animate-pulse">pinging...</span>';
      streamStatus.innerHTML = '<span class="text-zinc-500 animate-pulse">pinging...</span>';
      subsStatus.innerHTML = '<span class="text-zinc-500 animate-pulse">pinging...</span>';

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
          ? 'w-2 h-2 rounded-full bg-emerald-400 inline-block' 
          : 'w-2 h-2 rounded-full bg-rose-400 inline-block';
      } catch (err) {
        metaStatus.innerHTML = '<span class="text-rose-400">Error</span>';
        diagIndicator.className = 'w-2 h-2 rounded-full bg-rose-400 inline-block';
      } finally {
        btn.disabled = false;
      }
    }

    function renderStatus(el, result) {
      if (result.ok) {
        el.innerHTML = '<span class="text-emerald-400 font-medium">ONLINE (' + result.latencyMs + 'ms)</span>';
      } else {
        el.innerHTML = '<span class="text-rose-400 font-medium">' + (result.error || 'OFFLINE') + '</span>';
      }
    }

    [metaInput, streamInput, subsInput].forEach(el => el.addEventListener('input', updateUrl));
    updateUrl();
  </script>
</body>
</html>`;
}
