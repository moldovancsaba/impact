# MLP activation — execution status (developer log)

**Purpose:** rolling **evidence** for the CTO report-back in [mlp-activation-path.md](mlp-activation-path.md). **Board / closure:** [mlp-cto-next-execution.md](mlp-cto-next-execution.md). **Last run:** 2026-05-25 — activation delivery pass (orchestrator + seed script verified locally; production blocked on credentials).

**CTO (2026-04-05):** latest pass **accepted** as real progress; remaining gaps are **operational** (npm publish, hosted ingest, upstream, volume, **`/data.html`** proof) — see **[mlp-cto-next-execution.md](mlp-cto-next-execution.md)** (section *Status — activation pass accepted (2026-04-05)*).

### 2026-05-25 delivery pass

| Step | Result |
|------|--------|
| **Orchestrator** | Added [`scripts/run-activation-delivery.sh`](../scripts/run-activation-delivery.sh), [`scripts/seed-ingest-submissions.sh`](../scripts/seed-ingest-submissions.sh), [`docs/mlp-activation-credentials.md`](mlp-activation-credentials.md) |
| **#34 npm** | **Blocked** — `npm whoami` ENEEDAUTH; `@impact/cli` still 404. Use **`NPM_TOKEN`** + workflow **Publish npm packages** or `npm login` locally |
| **#58 Fly ingest** | **Blocked** — no `FLY_API_TOKEN` secret; workflow run [26409731604](https://github.com/sovereignsquad/impact/actions/runs/26409731604) failed. Add secret → re-run **Deploy ingest (Fly.io)** |
| **Seed script (local proof)** | **PASS** — 6 fixtures → ingest; `submission_count: 6`, `below_global_threshold: false` |
| **Vercel upstream** | **Still fallback** — `curl https://impact.sovereignsquad.com/api/health` → `stats_mode: fallback` |
| **#44 copy flip** | **Skipped** (honest gate until npm live) |

---

## 1. Public install ([#34](https://github.com/sovereignsquad/impact/issues/34))

| Check | Result |
| ----- | ------ |
| `npm whoami` | **Blocked** — machine not logged in to npm (`ENEEDAUTH`). Maintainer must run `npm login`. |
| `npm view @impact/cli` | **404** — package **not** on the public registry yet. |
| `DRY_RUN=1 npm run publish:npm:dry-run` | **PASS** (2026-04-05) — all workspace packages pack and dry-publish **`0.3.0`** in dependency order. |
| Clean-machine Path C smoke | **Not run** — blocked until real publish. |
| **#34 → Done** | **Not ready** — requires `npm login` + `npm run publish:npm` + evidence on the issue. |

**Recommended next command (maintainer):**

```bash
npm login
npm run publish:npm
npm view @impact/cli version
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
| Public HTTPS origin | **Automation ready, credentials pending** — root [`fly.ingest.toml`](../fly.ingest.toml), [`scripts/deploy-ingest-fly-and-wire-vercel.sh`](../scripts/deploy-ingest-fly-and-wire-vercel.sh), GitHub [`.github/workflows/deploy-ingest-fly.yml`](../.github/workflows/deploy-ingest-fly.yml). **Requires:** `flyctl auth login` or **`FLY_API_TOKEN`** (then run script or workflow); then `bash scripts/vercel-wire-ingest-upstream.sh https://<app>.fly.dev` if Vercel wiring is separate. **This Cursor agent:** Fly token not available → **no live deploy executed**. |

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
| Production `https://impact.sovereignsquad.com/api/*` (and other Vercel hostnames) | **Live** (prior deploy) — fallback when **`IMPACT_INGEST_UPSTREAM`** unset. |
| `IMPACT_INGEST_UPSTREAM` on Vercel | **Not set** — **no public ingest URL** yet to point at. |
| `stats_mode: upstream` on `/api/health` | **Not yet** — still **`fallback`** until upstream is set. |

**After hosted ingest URL exists:**

```bash
vercel env add IMPACT_INGEST_UPSTREAM production --value "https://YOUR-INGEST-ORIGIN" --yes
# plus preview '' if needed
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
| **#58** | **In Progress** | **In-repo + Docker verified**; **hosted TLS + volume** outstanding. |
| **#59** | **Todo** | Aggregation **proven in repo**; hosted proof after ingest + volume. |
| **#60** | **Todo** | Thresholds **proven in repo**; hosted validation after **#59** path. |
| **#61** | **Todo** | Vercel proxy **ready**; **upstream URL** outstanding. |
| **#62** | **Todo** | **Do not close** until public **`/data.html`** shows **real** aggregates. |

---

## Secondary (#65 / #66)

No action in this pass — **P1**, parallel only if capacity.
