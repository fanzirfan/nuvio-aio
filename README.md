# fanzirfan AIO

Stremio and Nuvio relay addon built on Cloudflare Workers using Hono and TypeScript. The service routes requests to three separate upstream addons through a single manifest endpoint:

1. **Catalogs and Metadata:** [AIOMetadata](https://aiometadata.elfhosted.com/) (IMDb, TMDB, TVDB, MyAnimeList, streaming provider catalogs).
2. **Streams and Live TV:** [PenguPlay](https://pengu.uk/) (movies, series, anime, and live channels).
3. **Subtitles:** [Nuvio Subs](https://nuvio-subs.fanzirfan.workers.dev/) and PenguPlay (fetched in parallel, deduplicated, with ad-free subtitles prioritized).

---

## Routing Architecture

The worker receives Stremio protocol requests and delegates them based on resource type:

- `/catalog/:type/:pathParam`: Routes to PenguPlay for live TV (`tv`), or AIOMetadata for movies, series, and anime catalogs.
- `/meta/:type/:pathParam`: Routes live TV identifiers (`pp-live:`) to PenguPlay, and all other media IDs to AIOMetadata.
- `/stream/:type/:pathParam`: Routes directly to PenguPlay.
- `/subtitles/:type/:pathParam`: Queries both Nuvio Subs and PenguPlay concurrently via `Promise.allSettled`, removes duplicates by subtitle URL, and prepends ad-free subtitles.

```
                  [ Stremio / Nuvio Client ]
                              │
                              ▼
              ┌───────────────────────────────┐
              │    fanzirfan AIO (Worker)     │
              └───────┬───────┬───────┬───────┘
                      │       │       │
       ┌──────────────┘       │       └──────────────┐
       ▼                      ▼                      ▼
[ AIOMetadata ]          [ PenguPlay ]         [ Nuvio Subs ]
  Catalogs & Meta      Streams & Live TV       Ad-Free Subs
```

---

## Configuration

The addon operates in two modes:

- **Default:** Access `/manifest.json` directly to use the upstream URLs defined in `wrangler.toml`.
- **Custom Parameters:** Access `/:config/manifest.json`, where `:config` contains a base64-encoded JSON object with custom `metadataUrl`, `streamUrl`, or `subsUrl` values.

A web configuration interface is available at the root path (`/`) to test upstream connections and generate custom installation links.

---

## Development and Deployment

### Install Dependencies
```bash
npm install
```

### Local Development
```bash
npm run dev
```

Open `http://localhost:8787` in your browser to access the configuration interface.

### Run Tests and Typecheck
```bash
npm test
npm run typecheck
```

### Deploy to Cloudflare Workers
```bash
npm run deploy
```

---

## Installation

1. Copy the manifest URL from your deployed worker:
   ```
   https://<your-worker>.<subdomain>.workers.dev/manifest.json
   ```
2. Paste the URL into the search box in Stremio Addons or add it directly inside Nuvio.

---

## License

MIT
