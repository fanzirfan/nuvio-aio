<p align="center">
  <img src="branding/dist/symbol/nuvio-symbol-app-icon-128.png" width="96" height="96" alt="Nuvio AIO Logo" />
</p>

<h1 align="center">nuvio-aio &bull; fanzirfan AIO</h1>

<p align="center">
  <strong>High-performance Stremio &amp; Nuvio relay engine built on Cloudflare Workers using Hono and TypeScript.</strong>
</p>

<p align="center">
  <a href="https://github.com/fanzirfan/nuvio-aio"><img src="https://img.shields.io/badge/Repo-fanzirfan%2Fnuvio--aio-181717.svg?logo=github&logoColor=white" alt="GitHub repository" /></a>
  <a href="https://nuvio-aio.fanzirfan.workers.dev/"><img src="https://img.shields.io/badge/Live-Configure%20UI-F38020.svg?logo=cloudflare&logoColor=white" alt="Live configure UI" /></a>
  <a href="https://workers.cloudflare.com/"><img src="https://img.shields.io/badge/Cloudflare-Workers-F38020.svg?logo=cloudflare&logoColor=white" alt="Cloudflare Workers" /></a>
  <a href="https://hono.dev/"><img src="https://img.shields.io/badge/Hono-v4.7-E36002.svg" alt="Hono" /></a>
  <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/TypeScript-5.8-blue.svg?logo=typescript&logoColor=white" alt="TypeScript" /></a>
  <a href="https://stremio.com/"><img src="https://img.shields.io/badge/Stremio-Addon%20Protocol-7B5BF5.svg" alt="Stremio Addon" /></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/License-GPL%203.0-blue.svg" alt="License: GPL 3.0" /></a>
</p>

---

## Overview

**nuvio-aio** is a unified edge relay service consolidating multiple upstream providers into a single seamless Stremio and Nuvio manifest endpoint:

1. **Catalogs &amp; Rich Metadata:** Powered by [AIOMetadata](https://aiometadata.elfhosted.com/) (IMDb, TMDB, TVDB, MyAnimeList, and 33+ streaming provider carousels).
2. **Video Streams &amp; Live TV:** Powered by [PenguPlay](https://pengu.uk/) (multi-source video playback, quality selectors, and live broadcast channels).
3. **Clean &amp; Ad-Free Subtitles:** Powered by [Nuvio Subs](https://github.com/fanzirfan/nuvio-subs) ([live configurator](https://nuvio-subs.fanzirfan.workers.dev/configure)) + PenguPlay (queried concurrently, deduplicated, prioritizing ad-free releases).

---

## Related Projects &amp; Repositories

| Project | Repository | Live Endpoint | Role |
|---|---|---|---|
| **nuvio-aio** (this repo) | [github.com/fanzirfan/nuvio-aio](https://github.com/fanzirfan/nuvio-aio) | [nuvio-aio.fanzirfan.workers.dev](https://nuvio-aio.fanzirfan.workers.dev/) | All-in-One metadata, stream &amp; subtitle relay |
| **nuvio-subs** | [github.com/fanzirfan/nuvio-subs](https://github.com/fanzirfan/nuvio-subs) | [nuvio-subs.fanzirfan.workers.dev/configure](https://nuvio-subs.fanzirfan.workers.dev/configure) | Zero-ad subtitle engine (SubDL, OpenSubtitles, Subsource) used as this relay's subtitle upstream |

The configure UI (`/`) exposes both links as header chips and in the footer.

Third-party upstreams relayed by this addon: [AIOMetadata](https://aiometadata.elfhosted.com/) (catalogs/meta) and [PenguPlay](https://pengu.uk/) (streams/Live TV).
More of my projects: [github.com/fanzirfan](https://github.com/fanzirfan).

---

## Branding &amp; Visual Identity

All official brand assets are organized under the [`branding/`](branding/) directory and served directly by the worker:

### 1. Vector Master Logos
- **Horizontal Logo:** [`branding/nuvio-horizontal.svg`](branding/nuvio-horizontal.svg) &mdash; Master horizontal logo with wordmark.
- **Stacked Logo:** [`branding/nuvio-stacked.svg`](branding/nuvio-stacked.svg) &mdash; Master stacked badge layout.
- **Brand Symbol:** [`branding/nuvio-symbol.svg`](branding/nuvio-symbol.svg) &mdash; The distinctive Nuvio ribbon monogram mark.

### 2. Web &amp; App Distribution (`branding/dist/`)
- **App Icons:** High-resolution icons in 32px, 64px, 128px, 256px, and 512px formats ([`branding/dist/symbol/nuvio-symbol-app-icon-512.png`](branding/dist/symbol/nuvio-symbol-app-icon-512.png)).
- **Favicons:** Multi-size favicons (`favicon.ico`, `favicon.svg`, `favicon-16.png`, `favicon-32.png`, `favicon-48.png`).
- **Touch &amp; PWA Icons:** `apple-touch-icon.png`, `icon-192.png`, `icon-512.png`, `maskable-512.png`, and [`site.webmanifest`](branding/dist/symbol/site.webmanifest).
- **Color Variants:** Black and White variants for light and dark themes in [`branding/dist/horizontal/`](branding/dist/horizontal/) and [`branding/dist/symbol/`](branding/dist/symbol/).

### 3. Integrated Web Endpoints
The Worker directly serves the branding assets with immutable caching headers:
- `GET /favicon.ico` &amp; `GET /favicon.svg` &mdash; Browser favicons.
- `GET /apple-touch-icon.png` &mdash; iOS Home screen touch icon.
- `GET /icon-192.png` &amp; `GET /icon-512.png` &mdash; Progressive web app icons &amp; Stremio manifest logo.
- `GET /site.webmanifest` &mdash; PWA application manifest.
- `GET /branding/*` &mdash; Direct route for all assets in the branding repository.

---

## Routing Architecture

Incoming Stremio protocol requests are dynamically routed according to resource type and identifier:

- `/catalog/:type/:pathParam`: Routes live TV (`tv`) requests to PenguPlay, and movies, series, or anime catalogs to AIOMetadata.
- `/meta/:type/:pathParam`: Routes live broadcast channels (`pp-live:`) to PenguPlay, and all standard media IDs (`tt*`, `tmdb:*`, `kitsu:*`, etc.) to AIOMetadata.
- `/stream/:type/:pathParam`: Streams video sources directly through PenguPlay with customized relay naming.
- `/subtitles/:type/:pathParam`: Concurrently fetches subtitles from Nuvio Subs and PenguPlay, strips advertisements, deduplicates streams by file URL, and returns clean subtitles.

```
                  [ Stremio / Nuvio Client ]
                              │
                              ▼
              ┌───────────────────────────────┐
              │    nuvio-aio Relay (Worker)   │
              └───────┬───────┬───────┬───────┘
                      │       │       │
       ┌──────────────┘       │       └──────────────┐
       ▼                      ▼                      ▼
[ AIOMetadata ]          [ PenguPlay ]         [ Nuvio Subs ]
  Catalogs & Meta      Streams & Live TV       Ad-Free Subs
```

---

## Web Configuration Interface

Access the root URL (`/`) in your browser to access the interactive web management dashboard:

- **Live Upstream Diagnostics:** Test latency and uptime for AIOMetadata, PenguPlay, and Nuvio Subs with the built-in ping test tool (`/api/ping`).
- **Custom Endpoint Encoder:** Configure custom upstream URLs with live URL generation and base64 configuration hashing (`/:config/manifest.json`).
- **One-Click Installation:** Direct links to install into desktop/mobile Stremio (`stremio://`) or open directly in Stremio Web.
- **Nuvio Collections Station:** Copy or download the pre-configured Nuvio collection layout.
- **GitHub &amp; Related Projects:** Header chips and footer link to this repo (`fanzirfan/nuvio-aio`), the sibling `nuvio-subs` subtitle engine repo, and its live configurator.

---

## Nuvio Collections Home Layout

The addon serves a curated collection layout containing **88 catalog sources** across three primary categories tailored for the Nuvio home screen:

1. **Discover:** Popular, Trending, Top Rated, and Upcoming movies and series.
2. **Streaming Platforms:** Netflix, Disney+, Apple TV+, Prime Video, Max, Hulu, Paramount+, and Peacock.
3. **Genres:** Action, Comedy, Drama, Sci-Fi, Horror, Animation, and more.

All catalog sources point back to `irfan.nuvio.aio`, allowing Nuvio to stream and populate all home carousels directly from this relay.

### How to Import into Nuvio:
- **Via URL:** In Nuvio Settings &rarr; Collections &rarr; Import from URL, paste:
  ```
  https://<your-worker>.<subdomain>.workers.dev/collection.json
  ```
  *(Or custom parameterized config URL: `https://<your-worker>.<subdomain>.workers.dev/<config>/collection.json`)*
- **Via File:** Download `collection.json` from the web UI (`/`) and upload it under Nuvio Settings &rarr; Collections &rarr; Import from File.

---

## Development and Deployment

### 1. Install Dependencies
```bash
npm install
```

### 2. Local Development
```bash
npm run dev
```
Open `http://localhost:8787` in your browser.

### 3. Run Tests and Typecheck
```bash
npm test
npm run typecheck
```
`typecheck` regenerates `worker-configuration.d.ts` from `wrangler.jsonc` (`wrangler types`) before running `tsc`, so runtime/binding types stay in sync with the config.

### 4. Deploy to Cloudflare Workers
```bash
npm run deploy
```

---

## Addon Installation in Stremio

1. Copy your deployed manifest URL:
   ```
   https://<your-worker>.<subdomain>.workers.dev/manifest.json
   ```
2. Paste the URL into the search bar inside **Stremio &rarr; Addons** or add it to **Nuvio**.

---

## Disclaimer

> [!IMPORTANT]
> **Legal Disclaimer & Content Hosting Policy**
>
> 1. **No Hosting of Media:** This project (**nuvio-aio**) does **NOT** host, store, cache, upload, scrape, or transmit any video, audio, torrent, or copyrighted media files on any server, edge worker, or database. 
> 2. **Middleware & Protocol Relay Only:** This software functions strictly as a lightweight middleware, proxy, and protocol adapter conforming to the public Stremio Addon specification. It merely translates and relays HTTP requests between the client application (e.g., Stremio or Nuvio) and third-party upstream endpoints explicitly specified by the user or configuration.
> 3. **Third-Party Services:** All metadata, media streams, live broadcasts, and subtitles are sourced independently from external, third-party services (such as AIOMetadata, Pengu, OpenSubtitles, SubDL, etc.). The author and contributors of this repository have no control over, affiliation with, or responsibility for the content, licensing, or availability provided by these upstream entities.
> 4. **User Responsibility:** Users are solely responsible for ensuring that their use of this software complies with all applicable local, national, and international laws, regulations, and copyright restrictions. The author and contributors assume no liability for any misuse, copyright infringement, or damages arising from the use of this project.
> 5. **Educational Purpose:** This project is provided as free, open-source software strictly for educational, technical interoperability, and research purposes under the GPL-3.0 license.

---

## License

This project is licensed under the [GNU General Public License v3.0 (GPL 3.0)](LICENSE) &copy; fanzirfan.

