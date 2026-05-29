## Objective

**Dashboard D1 — Ingest MVP.** Backend path to receive anonymous profiles, validate, deduplicate, store safely.

## SSOT

[mlp-next-delivery-tranche.md](../../docs/mlp-next-delivery-tranche.md) Phase 2 · [mlp-status-cto.md § Leadership view](../../docs/mlp-status-cto.md#cto-acceptance-leadership-dashboard) · relates **[#48](https://github.com/sovereignsquad/impact/issues/48)** · [submission-contract.md](../../docs/submission-contract.md)

## Activation sprint — dashboard **product-live** (CTO directive)

**Ingest is implemented in repo — this is not a documentation problem.** Execute until **hosted** proof exists.

**Do:**

1. **Deploy ingest** (TLS, production-appropriate host).  
2. Configure **DB / runtime** — persistent **`IMPACT_INGEST_DB_PATH`**, **`better-sqlite3`** on target platform, **health** (`/health`), **logging**.  
3. **Expose live `GET /api/stats/*`** — reachable from the web deployment (CORS as needed).  
4. Set **`VITE_STATS_API_BASE=<live-ingest-origin>`** on the **production** web build.  
5. **Redeploy web**.  
6. **Seed** enough **real** submissions for meaningful buckets **or** document **threshold / volume** status honestly (no production privacy gaming).  
7. **Smoke** **`/api/stats/overview`**, **`/full`**, **`/hardware`**, **`/tools`**, **`/models`**, and **`/data.html`** (placeholder vs live vs suppression).  
8. Move **[#59](https://github.com/sovereignsquad/impact/issues/59)–[#62](https://github.com/sovereignsquad/impact/issues/62)** toward **Review / Done** per [closure model](../../docs/mlp-next-delivery-tranche.md#board-closure-dashboard) — **#62** last for public verification.

**Report-back (comment on this issue or linked doc):**

- Ingest **base URL**  
- **Health** check result  
- **Stats endpoints** — sample responses or status codes  
- **Web URL** showing **live** stats (or explicit “below threshold”)  
- **Volume** vs **`IMPACT_STATS_MIN_BUCKET_COUNT`**  
- Which issues are **Review** / **Done**-ready  

**Parallel:** **[#34](https://github.com/sovereignsquad/impact/issues/34)** (npm) can advance on maintainer capacity — see that issue for the **six-step** publish path.

## Start when (board)

**D1 code** is **Done** in repo. **Activation** may run **without** waiting on **#34**; coordinate with maintainers if shared infra.

## Deliverables

- [x] Ingest HTTP endpoint(s) — [`apps/ingest`](../../apps/ingest) `POST /` and `POST /ingest`, `GET /health`
- [x] Validation layer — `@doneisbetter/schemas` / `parseSubmissionBody` (legacy profile or **`impact.submission.v0.1`** envelope with **`dashboard_summary`**)
- [x] Duplicate handling — **409** + `submission_id` per [submission-contract.md](../../docs/submission-contract.md) (`payload_sha256` + `run_id` UNIQUE)
- [x] Storage schema + persistence — SQLite (`better-sqlite3`), default `./data/ingest.db`; columns **`profile_json`** + **`dashboard_summary_json`**
- [x] Basic ops README — [apps/ingest/README.md](../../apps/ingest/README.md), [ingest-server.md](../../docs/ingest-server.md)

## Acceptance

- [x] Can accept a well-formed submission from CLI path (`IMPACT_SUBMIT_URL` → local ingest)
- [x] Invalid payloads rejected with clear errors (**400** + schema message)
- [x] Documented duplicate behaviour (README + contract)

**Board Done (hosted):** ingest **deployed**, stats API **live**, evidence attached — per **Activation sprint** above and [closure model](../../docs/mlp-next-delivery-tranche.md#board-closure-dashboard).
