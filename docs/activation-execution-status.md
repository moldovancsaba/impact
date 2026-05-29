# MLP activation — execution status (developer log)

**Purpose:** rolling **evidence** for the CTO report-back in [mlp-activation-path.md](mlp-activation-path.md). **Board / closure:** [mlp-cto-next-execution.md](mlp-cto-next-execution.md). **Last run:** 2026-05-25 — activation delivery pass (orchestrator + seed script verified locally; production blocked on credentials).

**CTO (2026-04-05):** latest pass **accepted** as real progress; remaining gaps are **operational** (npm publish, hosted ingest, upstream, volume, **`/data.html`** proof) — see **[mlp-cto-next-execution.md](mlp-cto-next-execution.md)** (section *Status — activation pass accepted (2026-04-05)*).

### 2026-05-25 delivery pass

| Step | Result |
|------|--------|
| **Orchestrator** | Added [`scripts/run-activation-delivery.sh`](../scripts/run-activation-delivery.sh), [`scripts/seed-ingest-submissions.sh`](../scripts/seed-ingest-submissions.sh), [`docs/mlp-activation-credentials.md`](mlp-activation-credentials.md) |
| **#34 npm** | **Done (2026-05-26)** — all `@doneisbetter/*` at **0.3.0** on npm; `npm view @doneisbetter/cli` → **0.3.0**; Path C copy flipped on web |
| **#58 hosted ingest** | **In progress** — migrated to first-party Vercel API (`/api/ingest`, `/api/stats/*`) backed by MongoDB Atlas; pending production env wiring + seed evidence |
| **Seed script (local proof)** | **PASS** — 6 fixtures → ingest; `submission_count: 6`, `below_global_threshold: false` |
| **Vercel API mode** | **Target MongoDB** — `curl https://impact.sovereignsquad.com/api/health` should report `stats_mode: mongodb` once env vars are set |
| **#44 copy flip** | **Done** — `scripts/flip-path-c-primary-copy.mjs` (home + install pages) |

---

## 1. Public install ([#34](https://github.com/sovereignsquad/impact/issues/34))

| Check | Result |
| ----- | ------ |
| `npm view @doneisbetter/cli` | **PASS** — **0.3.0** on registry (org **doneisbetter**). |
| `npm run publish:npm` | **PASS** (2026-05-26) — schemas → cli published in dependency order. |
| `DRY_RUN=1 npm run publish:npm:dry-run` | **PASS** — dry-run still valid before bumping semver. |
| Clean-machine Path C smoke | **Recommended** — `npm install -g @doneisbetter/cli` on fresh host per [smoke-test-macos.md](smoke-test-macos.md). |
| **#34 → Done** | **Ready for board** — publish + registry verify done; attach clean-machine smoke evidence on the issue. |

**Verify:**

```bash
npm view @doneisbetter/cli version
npm install -g @doneisbetter/cli@0.3.0 && impact --version
```

---

## 2. Hosted ingest ([#58](https://github.com/sovereignsquad/impact/issues/58))

| Check | Result |
| ----- | ------ |
| `Dockerfile.ingest` build | **PASS** — image tags e.g. `impact-ingest:local`. |
| **`node` user + SQLite dir** | **Fixed** (2026-04-05) — runner creates **`/app/data`** and **`/data`** owned by `node` (was `EACCES` on mkdir). |
| `GET /health`, `/healthz` | **PASS** in container — `{"ok":true,"service":"impact-ingest"}`. |
| `POST` accept + duplicate | **PASS** — `200` + `submission_id`, then **`409`** duplicate with same `submission_id` / message. |
| SQLite after `docker restart` | **PASS** — `submission_count` remains **1** after restart. |
| Public HTTPS origin | **In migration** — Vercel routes now support Mongo-backed ingest/stats directly (`/api/ingest`, `/api/stats/*`). Configure `MONGODB_URI`, `MONGODB_DB`, optional `MONGODB_COLLECTION_SUBMISSIONS`, then deploy Vercel and verify `stats_mode: mongodb`. |

**Local verification commands used:**

```bash
docker build -f Dockerfile.ingest -t impact-ingest:local .
docker run -d --name impact-ingest-test -p 18787:8787 -e HOST=0.0.0.0 impact-ingest:local
curl -sS http://127.0.0.1:18787/health
curl -sS -X POST http://127.0.0.1:18787/ingest -H "Content-Type: application/json" -d @fixtures/baseline-profile.sample.json
# second POST → 409
docker restart impact-ingest-test
curl -sS http://127.0.0.1:18787/api/stats/overview
```

### Local CLI → ingest — real machine scan (2026-04-03)

| Check | Result |
| ----- | ------ |
| **`impact scan`** on dev hardware | **PASS** — `impact-profile.json` + `impact-report.html`; diagnostics environment-specific (e.g. MLX partial). |
| Non-interactive POST | **PASS** — `IMPACT_SUBMIT_URL` + `IMPACT_SUBMIT_NON_INTERACTIVE=1` + `impact scan --yes-submit` (see [apps/cli/README.md](../apps/cli/README.md)). |
| [`scripts/local-e2e-submit.sh`](../scripts/local-e2e-submit.sh) | **PASS** — temp SQLite DB; ingest **`POST /`** → **200** + `submission_id`; **`GET /api/stats/overview`** → `submission_count: 1`, `below_global_threshold: true` (default min bucket **5**). |
| Receipt artifacts | `impact-submission-preview.json`, `impact-submission-receipt.json` under temp report dir. |

**Command:**

```bash
npm run build
bash scripts/local-e2e-submit.sh
```

---

## 3. Live stats path ([#61](https://github.com/sovereignsquad/impact/issues/61) / [#62](https://github.com/sovereignsquad/impact/issues/62))

| Check | Result |
| ----- | ------ |
| Production `https://impact.sovereignsquad.com/api/*` | **Live** — routes now read/write directly with Mongo when env vars are configured. |
| `MONGODB_URI` + `MONGODB_DB` on Vercel | **Required** — missing values keep DB-backed ingest/stats unavailable. |
| `stats_mode: mongodb` on `/api/health` | **Target** — should be `mongodb` with `db_status: ok` after env + deploy. |

**After Mongo env vars are set on Vercel:**

```bash
vercel env add MONGODB_URI production --value "mongodb+srv://..." --yes
vercel env add MONGODB_DB production --value "impact" --yes
vercel --prod --scope narimato
```

---

## 4. Seeding & thresholds ([#59](https://github.com/sovereignsquad/impact/issues/59) / [#60](https://github.com/sovereignsquad/impact/issues/60))

| Check | Result |
| ----- | ------ |
| Default `IMPACT_STATS_MIN_BUCKET_COUNT` | **5** |
| Volume after local smoke | **1** submission → **`below_global_threshold: true`**, empty buckets — **expected**. |
| Above-threshold demo | **Not run** — need **≥5** distinct submissions (or non-prod tuning **without** weakening prod rules). |

---

## 5. `/data.html` product-live ([#62](https://github.com/sovereignsquad/impact/issues/62))

| Check | Result |
| ----- | ------ |
| Public page with real crowd tables | **Blocked** until upstream + volume + thresholds allow non-empty buckets. |
| No 404 on stats fetch | **OK** in **fallback** mode today. |

---

## Issue readiness (honest)

| Issue | Suggested column | Notes |
| ----- | ---------------- | ----- |
| **#34** | **In Progress** | Code/registry packages **ready**; **npm auth + publish** outstanding. |
| **#58** | **In Progress** | **In-repo Vercel+Mongo implementation complete**; production env wiring + seeded proof outstanding. |
| **#59** | **Todo** | Aggregation **proven in repo**; hosted proof after ingest + volume. |
| **#60** | **Todo** | Thresholds **proven in repo**; hosted validation after **#59** path. |
| **#61** | **In Progress** | Vercel API is first-party; complete Mongo env wiring and verify live stats. |
| **#62** | **Todo** | **Do not close** until public **`/data.html`** shows **real** aggregates. |

---

## Secondary (#65 / #66)

No action in this pass — **P1**, parallel only if capacity.
