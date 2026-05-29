# Ingest server — IMPACT profile submission (D1 MVP)

**Purpose:** optional **HTTP ingest** for anonymous `ImpactProfile` payloads so a **dashboard backend** can be built on real stored submissions. Implements [submission-contract.md](submission-contract.md).

**Code:** [`apps/ingest`](../apps/ingest/) (`@doneisbetter/ingest`, **private** workspace).

## What it does

- **POST** `Content-Type: application/json` — body is one **ImpactProfile** (`impact.v0.3`).
- **Validates** with `@doneisbetter/schemas` (`validateImpactProfile`).
- **Dedupes** on **raw body SHA-256** and **`run_id`** (UNIQUE in SQLite) — duplicates return **409** with existing `submission_id` per contract.
- **Persists** to **SQLite** (default `./data/ingest.db`, configurable).
- **Logs** one line per accept/duplicate at **info** (no full payload at info — see contract).

## Run

See [apps/ingest/README.md](../apps/ingest/README.md). Quick path:

```bash
npm run dev:ingest
```

## Relation to the dashboard tranche

**D1 / [#58](https://github.com/sovereignsquad/impact/issues/58)** — ingest, storage, dedupe, validation — is in this service.

**Read API & aggregates** — `GET` JSON under `/api/stats/*` reads validated profiles from SQLite, applies **privacy thresholds** (minimum bucket counts), and returns slice or full payloads. The static site can opt in via **`VITE_STATS_API_BASE`** when building [apps/web](../apps/web/). See [mlp-next-delivery-tranche.md](mlp-next-delivery-tranche.md).

### Stats `GET` endpoints

| Path | Purpose |
| ---- | ------- |
| `/api/stats/overview` | Submission count, global threshold flag, `min_bucket_count` |
| `/api/stats/full` | Full `impact.stats.v0.1` aggregate payload |
| `/api/stats/hardware` | Hardware slice (`impact.stats.hardware.v0.1`) |
| `/api/stats/tools` | Tools/runtimes slice |
| `/api/stats/models` | Models slice |

**Environment:** `IMPACT_STATS_MIN_BUCKET_COUNT` (default **5**) — minimum submissions globally and per published bucket; `IMPACT_STATS_CORS_ORIGIN` (default `*`) for browser access from another origin.

**CORS:** `OPTIONS` is answered with **204**; JSON responses include `Access-Control-Allow-*` headers.

## Hosted smoke (activation)

After deploy, verify (replace `INGEST_ORIGIN`):

```bash
curl -sS "$INGEST_ORIGIN/health"
curl -sS "$INGEST_ORIGIN/api/stats/overview" | head -c 400
curl -sS "$INGEST_ORIGIN/api/stats/full" | head -c 400
```

Expect **200** and JSON. Low submission count → `below_global_threshold: true` and empty dimension buckets is **correct**, not a failure.

Full checklist: [web-deploy-smoke.md](web-deploy-smoke.md) § *Live stats*; report-back list: [mlp-status-cto.md § Leadership view](mlp-status-cto.md#cto-acceptance-leadership-dashboard).

### Vercel ingest + stats routes (production web)

The public site deploy includes root **[`api/`](../api/)** on Vercel:

- **`POST /api/ingest`** (submission ingest + dedupe + validation)
- **`GET /api/stats/*`** (overview/full/hardware/tools/models)
- **`GET /api/health`** (Mongo connectivity health)

| Variable | Role |
| -------- | ---- |
| **`MONGODB_URI`** | Required. Atlas connection string for the ingest/stats database. |
| **`MONGODB_DB`** | Required. Database name. |
| **`MONGODB_COLLECTION_SUBMISSIONS`** | Optional. Collection name (default `submissions`). |
| **`IMPACT_STATS_MIN_BUCKET_COUNT`** | Optional; privacy threshold for published buckets (default **5**). |
| **`IMPACT_STATS_CORS_ORIGIN`** | Optional; `Access-Control-Allow-Origin` for API routes (default **`*`**). |

**Note:** point CLI submissions at **`IMPACT_SUBMIT_URL=https://<your-web-origin>/api/ingest`** for same-deploy ingest.

## Production notes

- Deploy behind **HTTPS**; set `IMPACT_SUBMIT_URL` on clients to the deployed base URL.
- Use Atlas network + credential controls for production (`MONGODB_URI` least privilege user; optional IP restrictions).
- Keep unique indexes on `payload_sha256` and `run_id`; keep `received_at` index for stats scans.
- **Signing / notarization** apply to **Mac CLI/DMG**, not this Node service.

### Container image (hosted ingest)

From repo root:

```bash
docker build -f Dockerfile.ingest -t impact-ingest .
docker run --rm -e HOST=0.0.0.0 -e PORT=8787 -p 8787:8787 impact-ingest
```

- **`Dockerfile.ingest`** — multi-stage build: **`@doneisbetter/schemas`** + **`@doneisbetter/ingest`**, **`node:20-bookworm`** (reliable **`better-sqlite3`** compile).
- **`HOST=0.0.0.0`** in production containers (default in the image); override **`PORT`** as needed.
- **`USER node`** — image creates **`/app/data`** and **`/data`** with **`chown node`** so default **`./data/ingest.db`** works; set **`IMPACT_INGEST_DB_PATH=/data/ingest.db`** when mounting a volume at **`/data`**.
- **`.dockerignore`** excludes **`**/*.tsbuildinfo`** so TypeScript **composite** incremental state from the host cannot skip emitting **`dist/`** in a clean image.
- Rolling verification notes: [activation-execution-status.md](activation-execution-status.md).

**Fly.io:** optional legacy path for standalone SQLite ingest container. Keep only if you need a separate non-Vercel service.

**Railway / Render / other:** run the same image; mount persistent disk for the SQLite file; expose **8787** (or set **`PORT`** to the platform’s assigned port).
