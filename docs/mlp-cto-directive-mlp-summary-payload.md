# CTO directive — MLP delivery (client-prepared dashboard summary)

**Status:** active execution spine for the **Minimum Loveable Product** path. **Board / issues:** [#34](https://github.com/sovereignsquad/impact/issues/34) (install), [#58](https://github.com/sovereignsquad/impact/issues/58)–[#62](https://github.com/sovereignsquad/impact/issues/62) (dashboard activation). **Related:** [mlp-next-delivery-tranche.md](mlp-next-delivery-tranche.md), [submission-contract.md](submission-contract.md).

---

## Outcome

IMPACT becomes a **usable MLP**:

1. App runs locally in a **real** user flow.  
2. Website shows **real** aggregate results, not only placeholders (when thresholds allow).  
3. Submission / ingest / processing produces **useful public data**.  
4. The path stays **honest**, **privacy-safe**, and **publishable**.

---

## Decision: client-prepared summary + raw profile

The **local app** produces a **normalized dashboard summary** alongside the **canonical raw profile**.

| Payload | Role |
| ------- | ---- |
| **Raw profile** | Source of truth; future reprocessing; audits; richer analytics later. |
| **Dashboard summary** | Fast path for aggregation; smaller, stable buckets for public stats. |

**Trust model:** summary is **good enough** for lightweight community stats; server **keeps raw** for later verification / re-aggregation. Do not trust summary alone forever — reprocessing from raw remains possible.

---

## Phases (execution order)

| Phase | Focus | Deliverables |
| ----- | ----- | ------------ |
| **0** | **#34** | `npm login`, `npm run publish:npm`, Path C smoke, evidence, close **#34**. |
| **1** | Local summary | `impact.summary.v0.1` in **@doneisbetter/schemas**; **buildDashboardSummary** in **@doneisbetter/core**; local artifact + tests. |
| **2** | Ingest | Accept **`impact.submission.v0.1`** envelope (profile + summary); persist both; contract + DB + duplicate rules. |
| **3** | Aggregates | Prefer **summary** for public rollup when present; fallback to raw parse for legacy rows; thresholds unchanged. |
| **4** | Web | **/data.html** shows real aggregates from live stats API (honest empty below threshold). |
| **5** | Local UX | Install → scan → report → optional submit → receipt; docs aligned. |

---

## Summary schema (v0.1)

See **@doneisbetter/schemas** — `DashboardSummary` / `impact.summary.v0.1`:

- `summary_version`, `profile_schema_version`, optional `normalization_version`  
- `platform_family`, `machine_class`, `chip_family`, `memory_band_gb`  
- `runtime_families`, `tool_families`, `model_families` (string arrays)  
- `local_model_count`, `cloud_tool_present`  
- `reachable_runtime_count`, `partial_runtime_count`  
- optional `architecture` for parity with existing stats slices  

---

## Submission wire format

- **Legacy:** single JSON `ImpactProfile` (`impact.v0.3`) — still accepted.  
- **MLP:** envelope `submission_kind: "impact.submission.v0.1"` + `profile` + `dashboard_summary`.  

Normative detail: [submission-contract.md](submission-contract.md).

---

## What not to do

- No complex analytics platform first; no benchmarks overlay; no accounts; no leaderboards; no DMG-first distraction.  
- **Do not** weaken privacy thresholds for cosmetics.  
- **Do not** fake aggregates or close **#62** without public proof.

---

## Definition of success

A user can **install**, **run locally**, **generate outputs**, **submit**, backend stores **raw + summary**, and the **website** shows **useful** public aggregates derived from submissions when volume and thresholds allow.

---

## Implementation reference (repo)

| Area | Location |
| ---- | -------- |
| Summary schema | `packages/schemas/src/dashboard-summary.ts`, `submission-body.ts` |
| Summary generation | `packages/core/src/dashboard-summary.ts` |
| Ingest persistence / stats | `apps/ingest/src/store.ts`, `handle-submit.ts`, `aggregate-summary.ts`, `stats-from-db.ts` |
| Client POST | `packages/submission`, `apps/cli` |

Issue bodies **#58–#62** should explicitly reference **raw + summary** and **summary-first aggregation** (update via `scripts/gh-issue-bodies/` when syncing GitHub).
