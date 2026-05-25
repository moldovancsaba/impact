# IMPACT public web shell (`apps/web`)

**Purpose:** first **public-facing** web surface for IMPACT — not a replacement for the offline **`impact-report.html`** from the CLI, but where users **discover install**, **learn the run/submit flow**, **browse community data (structure first)**, and preview a local profile **without upload**.

**Code:** [`apps/web`](../apps/web/)

**Board:** shell pages **[#50](https://github.com/sovereignsquad/impact/issues/50)**, **[#54](https://github.com/sovereignsquad/impact/issues/54)–[#57](https://github.com/sovereignsquad/impact/issues/57)**. **Real dashboard data** — **[#58](https://github.com/sovereignsquad/impact/issues/58)–[#62](https://github.com/sovereignsquad/impact/issues/62)** ([mlp-next-delivery-tranche.md](mlp-next-delivery-tranche.md)); legacy **[#51](https://github.com/sovereignsquad/impact/issues/51)–[#53](https://github.com/sovereignsquad/impact/issues/53)** superseded in execution detail by **#58–#62**. **GDS migration** — **Complete** ([#76](https://github.com/sovereignsquad/impact/issues/76)–[#82](https://github.com/sovereignsquad/impact/issues/82)); [gds-migration-plan.md](gds-migration-plan.md), [gds-adapter.md](gds-adapter.md).

**Design SSOT:** [sovereignsquad/general-design-system](https://github.com/sovereignsquad/general-design-system) v2.4.3 — **`@gds/theme` + `@gds/core`**; thin **`ImpactShell`** adapter only.

---

## Site map (multi-page)

Vite **MPA** — each route is its own HTML entry (see `vite.config.ts` `rollupOptions.input`).

| Path | Role |
| ---- | ---- |
| **`/`** (`index.html`) | **Home** — hero, install truth (**Path B** until **#34** closes), primary/secondary/tertiary CTAs, short FAQ ([**#57**](https://github.com/sovereignsquad/impact/issues/57)). |
| **`/install.html`** | **Install / download** — Path B commands, Path C gated on **#34**, prerequisites, outputs, troubleshooting ([**#54**](https://github.com/sovereignsquad/impact/issues/54)). |
| **`/use.html`** | **Run & results** — scan command, HTML/JSON outputs, `reachable` / `partial` / `unknown`, link to profile preview ([**#55**](https://github.com/sovereignsquad/impact/issues/55)). |
| **`/submit.html`** | **Submit** — optional submission, preview/receipt, privacy, how aggregates appear later ([**#56**](https://github.com/sovereignsquad/impact/issues/56)). |
| **`/data.html`** | **Community data** — placeholders by default; **live aggregate tables** when the site is built with **`VITE_STATS_API_BASE`** pointing at a running ingest (`GET /api/stats/full`). Privacy thresholds apply ([**#50**](https://github.com/sovereignsquad/impact/issues/50), [**#58–#62**](https://github.com/sovereignsquad/impact/issues/58)). |
| **`/profile.html`** | **Profile preview** — drop `impact-profile.json`; `ImpactProfileSchema.safeParse` + `buildRecommendations` in-browser only. |

**Rule:** Do **not** present **npm Path C** as the live primary install until **[#34](https://github.com/sovereignsquad/impact/issues/34)** is closed (publish, verify, smoke, evidence). Copy on **home** and **install** reflects that.

---

## What ships today

- **React + Mantine** MPA via **GDS** (`GdsProvider`, `PublicShell`, `DocsPageShell`, `StateBlock`, …) — see [gds-adapter.md](gds-adapter.md).
- Multi-page **nav** with active state (`PublicNav` / `ImpactShell`).
- **Honest install** story (Path B verified; Path C explicit gate).
- **Community data** — placeholders **or** live stats when **`VITE_STATS_API_BASE`** is set at build time (`SimpleDataTable` via `@gds/core`).
- **Profile explorer** — `UploadDropzone` + in-browser `ImpactProfileSchema` + `buildRecommendations`.
- **Version line** in footer: **Web shell** semver + **profile schema** (`impact.v0.3`) — [current-state.md](current-state.md) § Versioning.
- No benchmark **scores**, no silent upload, no fabricated aggregate counts when the API is unset.

---

## Deploy and smoke (operations)

After each production deploy, run the checklist: **[web-deploy-smoke.md](web-deploy-smoke.md)** (`/`, `/install.html`, `/use.html`, `/submit.html`, `/data.html`, `/profile.html`). When the build uses **`VITE_STATS_API_BASE`**, also run § **Live stats** (ingest health + **`/api/stats/*`** + `/data.html` behaviour).

---

## Developer commands

```bash
npm ci                    # prepares @gds/* from sovereignsquad/general-design-system
npm run dev -w @impact/web
npm run build -w @impact/web
npm run lint:gds          # adoption manifest + gds-compliance
```

Root **`npm run verify:release`** includes **`lint:gds`**, ESLint GDS rules on `apps/web/src`, and the web build.

### Deploy (Vercel)

Use the **repository root** as the Vercel project root (monorepo). Root [`vercel.json`](../vercel.json) sets **`outputDirectory`** to **`apps/web/dist`**. **Install** and **build** run at root: `npm ci` (runs **`preinstall`** → prepares GDS **2.4.3** in `.gds-src`), then `npm run build` (all workspaces including `@impact/web`).

If the Vercel dashboard had **Output Directory** set to `public`, remove it or set it to **`apps/web/dist`** so it matches `vercel.json`.

**Production (configured):** canonical **[https://impact.sovereignsquad.com](https://impact.sovereignsquad.com)** — add all desired hostnames under the Vercel project (**Domains**); they serve the same deployment. Legacy alias **impact.messmass.com** may remain attached if still needed. Deploy: `vercel --prod --yes` from repo root (linked project **`narimato/05_impact`**, formerly `impact`). GitHub integration picks up **`vercel.json`** on push. Root **`package.json`** **`engines.node`** and **`.nvmrc`** are **`24`**. If the Vercel dashboard still shows **22.x**, set **Settings → Build and Deployment → Node.js Version** to **24.x** (dashboard value overrides `engines` until changed). Root **`vercel.json`** documents **`VITE_STATS_API_BASE`** **`/api`** for **`/data.html`** (multi-domain safe). **If the project already defines `VITE_STATS_API_BASE` under Settings → Environment Variables, that value is used at build time** — keep it **`/api`** (or remove it and rely on `vercel.json` only if you have verified the build picks it up). After each production deploy, run `vercel alias set <deployment-url> impact.sovereignsquad.com` if the custom domain should track the latest deployment (Vercel usually also assigns **impact.messmass.com** automatically when it is the primary production domain).

**`/api` on Vercel:** the repo includes root **[`api/`](../api/)** serverless routes alongside the static **`apps/web/dist`** output. **`GET /api/stats/overview|full|hardware|tools|models`** return **200** with valid JSON. Without **`IMPACT_INGEST_UPSTREAM`**, responses use an **honest fallback** (zero submissions, below threshold — same shape as real ingest). Set **`IMPACT_INGEST_UPSTREAM`** to a hosted SQLite ingest origin (no trailing slash) to **proxy** those paths to the real service. **`GET /api/health`** reports **`stats_mode`**: `fallback` vs `upstream`. See [ingest-server.md](ingest-server.md) § *Vercel stats routes*.

### `VITE_STATS_API_BASE` (community stats on `/data.html`)

Set at **build** time. The web app calls **`stats/overview`**, **`stats/full`**, etc. relative to that base. Two supported shapes:

| Pattern | Example `VITE_STATS_API_BASE` | Resulting fetch for full stats |
| ------- | ----------------------------- | -------------------------------- |
| **Same-origin path** (recommended on Vercel with multiple domains) | `/api` | `/api/stats/full` (browser resolves to current host) |
| **Site origin** (ingest mounted at `/api/stats/…` on that host) | `https://impact.sovereignsquad.com` | `https://impact.sovereignsquad.com/api/stats/full` |
| **API mount** (absolute; base already ends with `/api`) | `https://impact.sovereignsquad.com/api` | `https://impact.sovereignsquad.com/api/stats/full` |

Local dev ingest (default port): `http://127.0.0.1:8787` → `http://127.0.0.1:8787/api/stats/full`.

**Same-origin on Vercel:** set **`VITE_STATS_API_BASE=/api`** (as in root **`vercel.json`**) so stats requests stay on the same hostname the user chose (**sovereignsquad.com**, **messmass.com**, preview URLs, etc.). **`/api/stats/*`** is implemented by this repo’s **Vercel Functions** (fallback or **`IMPACT_INGEST_UPSTREAM`** proxy). Other static hosts still need their own **`/api`** routing or a separate API origin.

**Separate API origin:** e.g. web `https://impact.sovereignsquad.com`, API `https://api.example.com`. Set **`VITE_STATS_API_BASE`** to the ingest **site origin** (second table row), e.g. `https://api.example.com`, so fetches go to `…/api/stats/full`. Configure CORS on ingest if the browser calls cross-origin.

**External ingest only (no repo `api/`):** you can instead use **`vercel.json` `rewrites`** so **`/api/:path*`** is forwarded to a remote ingest host — only if you are **not** relying on the bundled **`api/`** handlers (avoid double-handling).

---

## Roadmap (aligned with MLP)

1. **#34 close** — flip primary CTA copy to npm where appropriate (**M1** / **#44**).
2. **Live aggregates in production** — ingest deployed + web build with **`VITE_STATS_API_BASE`**; programme closure **#58–#62** on the board when ops match [mlp-next-delivery-tranche.md](mlp-next-delivery-tranche.md).
3. **Polish** — badges, sample profile mode, deeper results explainer (**W3–W4**).

Constraints: no benchmark **scores**, no hype “readiness index,” no silent data collection from the profile explorer.

---

## SSOT

- **Product facts:** [current-state.md](current-state.md), [user-expectations-mvp.md](user-expectations-mvp.md).
- **MLP sequencing & CTO slice:** [mlp.md](mlp.md), [mlp-status-cto.md](mlp-status-cto.md).
- **Authority map:** [ssot-map.md](ssot-map.md).
