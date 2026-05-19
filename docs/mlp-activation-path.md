# MLP activation path — CTO execution checklist

**Purpose:** single **operator/developer runbook** to move IMPACT from a strong **product shell** to a **live MLP**: public install, hosted ingest, real aggregates on the public web, and **proof**. **Board closure model** for **#58–#62** remains in [mlp-next-delivery-tranche.md](mlp-next-delivery-tranche.md#board-closure-dashboard). **Leadership framing:** [mlp-status-cto.md](mlp-status-cto.md#cto-acceptance-leadership-dashboard).

**When to use:** you are executing activation (not replanning engine work). **Do not** close **#62** before the **public** `/data.html` proof exists.

**Preflight (automated):** `bash scripts/activation-preflight.sh` — `/api/health`, npm publish, `IMPACT_INGEST_UPSTREAM` on Vercel.

**CTO — execution order, report-back expectations, board WIP rules, issue body bar, cleanup waves:** [mlp-cto-next-execution.md](mlp-cto-next-execution.md).

---

## Primary objective

Close the remaining **operational** gaps:

1. **Real public install** (Path C)
2. **Real hosted ingest**
3. **Real aggregate dashboard data** (non-fallback)
4. **Proof** the live system works

---

## 1. Close [#34](https://github.com/sovereignsquad/impact/issues/34) — public install gate

**Priority:** P0

**Deliver**

- `npm login` (maintainer account scoped to publish `@impact/*`)
- `npm run publish:npm` (see [npm-publish.md](npm-publish.md))
- `npm view @impact/cli`
- **Clean-machine Path C smoke** from the **published** package (not repo clone)
- Attach evidence to **#34**
- Move **#34** to **Done** on the board when criteria met

**Evidence required**

- Published **package version(s)**
- Exact **install** command used
- Exact **run** command used
- Proof **`impact-profile.json`** and **`impact-report.html`** were generated
- Short **recommendation to close** the issue

**Acceptance**

Path C is **truly public** — no longer “prepared on `main` but not live on npm.”

---

## 2. Deploy hosted ingest

**Priority:** P0 · **Maps to:** [#58](https://github.com/sovereignsquad/impact/issues/58)

**Deliver**

- Build and run ingest from **[`Dockerfile.ingest`](../Dockerfile.ingest)** (or equivalent) — `npm run docker:ingest:build`
- Deploy on chosen host (Fly, Railway, Render, etc.)
- Configure **persistent** **`IMPACT_INGEST_DB_PATH`**
- Confirm **`GET /health`** and **`GET /healthz`** reachable on the **ingest origin** (not only via Vercel proxy)
- Confirm **SQLite survives restart** (same data after redeploy)
- **Document** the live ingest **origin** (HTTPS base URL, no trailing slash) where the team can find it

**Required runtime checks**

- `GET /health` and `/healthz`
- **One** real accepted **POST** submission (contract-aligned)
- **One** duplicate submission → expected **409** / contract behaviour

**Evidence required**

- Ingest **host URL**
- **Health** response (JSON snippet)
- **DB path** / volume / runtime config summary
- **Successful** submission proof (receipt or server log line — no full payload dumps at info if policy says otherwise)
- **Duplicate** case proof

**Acceptance**

Hosted ingest **accepts** and **persists** real submissions.

---

## 3. Wire the live stats path

**Priority:** P0 · **Maps to:** [#61](https://github.com/sovereignsquad/impact/issues/61) / [#62](https://github.com/sovereignsquad/impact/issues/62)

**Deliver**

- Set **`IMPACT_INGEST_UPSTREAM`** on **Vercel** (Production; Preview/Development if desired) to the **ingest origin** from step 2
- Confirm same-origin **`/api/stats/*`** **proxies** real stats (**`GET /api/health`** → `stats_mode: upstream`, not only `fallback`)
- Keep **`VITE_STATS_API_BASE`** aligned with public web origin (see [web.md](web.md) § `VITE_STATS_API_BASE`)
- **`IMPACT_SUBMIT_URL`** on clients points at the **real** ingest origin for **POST**

**Required endpoint checks** (public site, same-origin)

- `/api/health`
- `/api/stats/overview`
- `/api/stats/full`
- `/api/stats/hardware`
- `/api/stats/tools`
- `/api/stats/models`

**Evidence required**

- Full **URLs** hit
- Short **response samples** (schema version, `submission_count`, `below_global_threshold` as relevant)
- Proof **upstream mode** is active (health + non-fallback behaviour)

**Acceptance**

The public webapp can fetch **real** stats through the live backend path.

---

## 4. Seed submissions for visible aggregates

**Priority:** P0 · **Maps to:** [#59](https://github.com/sovereignsquad/impact/issues/59) / [#60](https://github.com/sovereignsquad/impact/issues/60)

**Deliver**

- Submit enough **real** or **controlled test** profiles to satisfy **`IMPACT_STATS_MIN_BUCKET_COUNT`** (default **5**) without **weakening** production privacy rules for optics
- Verify **suppression** below threshold (honest empty / global flag)
- Verify **real buckets** above threshold
- **No** fingerprintable low-*n* slices

**Evidence required**

- Current **threshold** value in production
- **Sample volume** achieved (aggregate level — not identifying)
- Sample **`/api/stats/full`** (or screenshot) showing expected behaviour
- Confirmation **suppression** behaved correctly at low volume

**Acceptance**

Dashboard can show **real visible** aggregates **without** violating privacy rules.

---

## 5. Verify `/data.html` in product-live mode

**Priority:** P0 · **Maps to:** [#62](https://github.com/sovereignsquad/impact/issues/62)

**Deliver**

Smoke the **public** page:

- No **404** stats fetch; status line reflects **live** ingest
- **Hardware**, **tools/runtimes**, **models** sections show **real** tables when thresholds allow — not placeholder-only when API is live and data exists
- Copy stays **honest** and **privacy-safe** (no false “from community” claims when still fallback-only)

**Evidence required**

- Public **URL**
- Screenshots or structured notes
- Confirmation of **live** table rendering when volume allows
- Confirmation copy matches truth

**Acceptance**

`/data.html` is **publicly** showing **real** aggregate data when the backend and volume support it.

---

## Closure order (#58–#62)

Close in **this** order on the board:

| Issue | Close when |
| ----- | ---------- |
| **[#58](https://github.com/sovereignsquad/impact/issues/58)** | Hosted ingest accepts real submissions; **duplicate** handling verified |
| **[#59](https://github.com/sovereignsquad/impact/issues/59)** | Aggregation output correct from **stored** submissions (hosted) |
| **[#60](https://github.com/sovereignsquad/impact/issues/60)** | Privacy thresholds **enforced** and validated in **hosted** mode |
| **[#61](https://github.com/sovereignsquad/impact/issues/61)** | Public stats endpoints return correct **live** responses (via Vercel proxy path as deployed) |
| **[#62](https://github.com/sovereignsquad/impact/issues/62)** | **Only** when the **public webapp** shows **real** aggregate proof — **do not** close **#62** first |

---

## Secondary track — macOS distribution trust (parallel if capacity)

**Priority:** P1 · **Maps to:** [#65](https://github.com/sovereignsquad/impact/issues/65) / [#66](https://github.com/sovereignsquad/impact/issues/66)

**Deliver**

- Document **Developer ID** signing path
- Document **notarization** flow
- Clarify what remains before the **DMG** is **consumer-grade**
- Attach current **DMG** + **checksum** to a **release** for testing if not already

**Rule:** do **not** market the DMG as **complete** until signing + notarization meet **M3** bar ([mlp-next-delivery-tranche.md](mlp-next-delivery-tranche.md), [macos-distribution.md](macos-distribution.md)).

---

## Do not do next

- No benchmark overlays
- No leaderboard work
- No account / profile system
- No GUI expansion
- No doc/SSOT churn unless **required** by real delivery evidence
- **No** production threshold gaming to populate the dashboard

---

## Report-back format (next handoff)

### Public install

- Package version published
- `npm view` result
- Clean-machine Path C smoke evidence
- Whether **#34** is ready to close

### Hosted ingest

- Ingest host URL
- Health endpoint results
- Persistence setup
- Submission + duplicate proof

### Live stats

- `/api/stats/*` results (samples)
- Whether **fallback** mode is gone
- Threshold value and current sample volume
- Proof **`/data.html`** shows real aggregates

### Issue readiness

- Which of **#58–#62** are **Review**-ready
- Which are **Done**-ready
- What still **blocks** the rest

---

## Execution log (rolling)

Maintainers record automated or manual passes here: **[activation-execution-status.md](activation-execution-status.md)**.
