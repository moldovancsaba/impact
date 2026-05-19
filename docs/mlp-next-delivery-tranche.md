# MLP — next delivery tranche (CTO directive)

**Purpose:** SSOT for the **next** delivery work after the **frozen** public-web/doc tranche ([mlp-status-cto.md](mlp-status-cto.md)). **Product:** (1) **real community dashboard data** on the webapp, (2) **downloadable macOS distribution** — **not equal in readiness**. **Reality:** the **product shell** (web pages, local scanner, docs) is **ahead** of **production infrastructure** (publish/trust, **data backend**). **Primary focus (CTO 2026-04-12):** **background system** — ingest → storage → aggregation → privacy → read API → web wiring (**#58–#62**). **Path D** (DMG) remains **not** consumer-grade until **signing + notarization** ([#65](https://github.com/sovereignsquad/impact/issues/65)).

**Execution spine (this doc):** **[#34](https://github.com/sovereignsquad/impact/issues/34)** install gate → dashboard **[#58](https://github.com/sovereignsquad/impact/issues/58)–[#62](https://github.com/sovereignsquad/impact/issues/62)** → macOS packaging **[#63](https://github.com/sovereignsquad/impact/issues/63)–[#66](https://github.com/sovereignsquad/impact/issues/66)**. **Process discipline:** prefer not to **distract** from **#34** with dashboard **board** work until **#34** is **Done**; **in-repo** dashboard code may **land early** (current state — see § *Current operating state*).

**CTO activation execution (deliverables + evidence + closure order):** [mlp-activation-path.md](mlp-activation-path.md). **Board management + issue quality + definition of success:** [mlp-cto-next-execution.md](mlp-cto-next-execution.md). **MLP execution — client summary + raw submission (active):** [mlp-cto-directive-mlp-summary-payload.md](mlp-cto-directive-mlp-summary-payload.md).

**Project board (workflow SSOT):** [sovereignsquad · impact (project 4)](https://github.com/orgs/sovereignsquad/projects/4/views/1). **Status** on each card = column; issue **body** = scope/acceptance ([project-management.md](project-management.md), [ssot-map.md](ssot-map.md)). **Org repo:** **`sovereignsquad/impact`**. Archive: [personal Project #2](https://github.com/users/moldovancsaba/projects/2).

**Established:** CTO directive · **Accepted:** 2026-04-07 (initial) · **Confirmed SSOT:** 2026-04-08 · **Operating model:** 2026-04-09 · **Distribution reality + dual-track sequencing:** 2026-04-10 · **SSOT usability (board + index at top):** 2026-04-11 · **Background system first (#58–#62):** 2026-04-12.

<a id="github-issue-index"></a>

## Project board — linked issues (titles)

Tables below list **related GitHub issues** that correspond to cards on **Project #2**, with **titles** for readers without issue access. Repo: **sovereignsquad/impact**. Base URL: `https://github.com/sovereignsquad/impact/issues/`

### Install gate & MLP spine

| # | Title |
| - | ----- |
| [34](https://github.com/sovereignsquad/impact/issues/34) | IMPACT P1: Publish @impact/cli to npm registry |
| [44](https://github.com/sovereignsquad/impact/issues/44) | IMPACT P0: MLP M1 — Public install and adoption |
| [45](https://github.com/sovereignsquad/impact/issues/45) | IMPACT P0: MLP M2 — Report delight and first-run payoff |
| [46](https://github.com/sovereignsquad/impact/issues/46) | IMPACT P0: MLP M3 — Conservative recommendation engine |
| [47](https://github.com/sovereignsquad/impact/issues/47) | IMPACT P1: MLP M4 — Shareable result layer |
| [48](https://github.com/sovereignsquad/impact/issues/48) | IMPACT P1: MLP M5 — Community visibility MVP |
| [49](https://github.com/sovereignsquad/impact/issues/49) | IMPACT P1: MLP M6 — Install polish after npm |

### Public web shell (H1–H8)

| # | Title |
| - | ----- |
| [50](https://github.com/sovereignsquad/impact/issues/50) | IMPACT P0: MLP Web H1 — Historical data information architecture |
| [51](https://github.com/sovereignsquad/impact/issues/51) | IMPACT P0: MLP Web H2 — Historical hardware dataset MVP |
| [52](https://github.com/sovereignsquad/impact/issues/52) | IMPACT P0: MLP Web H3 — Historical tools/runtimes dataset MVP |
| [53](https://github.com/sovereignsquad/impact/issues/53) | IMPACT P0: MLP Web H4 — Historical LLM/model dataset MVP |
| [54](https://github.com/sovereignsquad/impact/issues/54) | IMPACT P0: MLP Web H5 — Install / download page |
| [55](https://github.com/sovereignsquad/impact/issues/55) | IMPACT P0: MLP Web H6 — Launch / use page |
| [56](https://github.com/sovereignsquad/impact/issues/56) | IMPACT P0: MLP Web H7 — Submit result page |
| [57](https://github.com/sovereignsquad/impact/issues/57) | IMPACT P0: MLP Web H8 — Homepage rework (four pillars) |

### Dashboard tranche (D1–D5) — Phase 2 of this doc

| # | Title |
| - | ----- |
| [58](https://github.com/sovereignsquad/impact/issues/58) | IMPACT P0: Dashboard D1 — Ingest MVP |
| [59](https://github.com/sovereignsquad/impact/issues/59) | IMPACT P0: Dashboard D2 — Aggregation model |
| [60](https://github.com/sovereignsquad/impact/issues/60) | IMPACT P0: Dashboard D3 — Privacy thresholds |
| [61](https://github.com/sovereignsquad/impact/issues/61) | IMPACT P0: Dashboard D4 — Dashboard read API |
| [62](https://github.com/sovereignsquad/impact/issues/62) | IMPACT P0: Dashboard D5 — Wire webapp to real aggregates |

### macOS packaging (M1–M4) — Phase 3 of this doc

| # | Title |
| - | ----- |
| [63](https://github.com/sovereignsquad/impact/issues/63) | IMPACT P1: macOS M1 — Distribution decision (binary vs app) |
| [64](https://github.com/sovereignsquad/impact/issues/64) | IMPACT P1: macOS M2 — Packaging pipeline & clean-Mac smoke |
| [65](https://github.com/sovereignsquad/impact/issues/65) | IMPACT P1: macOS M3 — Signing & notarization plan |
| [66](https://github.com/sovereignsquad/impact/issues/66) | IMPACT P1: macOS M4 — DMG packaging (after M1–M3) |

### Related programme issues (context — may also appear on the board)

| # | Title |
| - | ----- |
| [35](https://github.com/sovereignsquad/impact/issues/35) | IMPACT P1: Anonymous ingest service MVP |
| [36](https://github.com/sovereignsquad/impact/issues/36) | IMPACT P1: Community aggregates — governance, pipeline, metric definitions |
| [37](https://github.com/sovereignsquad/impact/issues/37) | IMPACT P1: Public stats surface (dashboard or API) |
| [38](https://github.com/sovereignsquad/impact/issues/38) | IMPACT P1: Standalone binary packaging — investigation |
| [39](https://github.com/sovereignsquad/impact/issues/39) | IMPACT P1: Programme — signed releases and desktop-style macOS distribution |
| [40](https://github.com/sovereignsquad/impact/issues/40) | IMPACT P1: Programme — public benchmark portal and compare vs crowd |
| [41](https://github.com/sovereignsquad/impact/issues/41) | IMPACT P1: Programme — cross-platform parity for install and analytics |
| [42](https://github.com/sovereignsquad/impact/issues/42) | IMPACT P2: Ideabank — DMG drag-drop installer |
| [43](https://github.com/sovereignsquad/impact/issues/43) | IMPACT P2: Ideabank — native GUI, accounts, leaderboards, auto-update |

---

## CTO acceptance — next delivery tranche

**2026-04-11 — Control document usability accepted.** The tranche SSOT is **much easier to use**. The material fix was **not** only adding links: it was **moving** the **board mapping and issue index to the top**, where architects and operators see **Project #2**, **key views**, **execution spine**, and **linked issues** **without** scrolling through full doctrine first. **Duplicate** tables at the bottom are **removed** — less noise and **drift** risk.

**Encoded state (unchanged from 2026-04-10):** **Path B** real · **Path C** blocked by publish (**#34**) · **Path D** technically real, **not** consumer-grade. **Operating model:** **Track A** — distribution **trust** completion · **Track B** — **dashboard** foundation — **hosted** community stats (deploy + volume) remain the **main gap vs product promise**; **in-repo** D1–D5 code **exists** (see below).

**Current operating state**

- **Green:** MVP · **in-repo MLP shell** · **in-repo dashboard D1–D5** — [`apps/ingest`](../apps/ingest) (POST ingest + SQLite + **`GET /api/stats/*`**, privacy thresholds, CORS) and [`apps/web`](../apps/web) **`data.html`** with **`VITE_STATS_API_BASE`** ([ingest-server.md](ingest-server.md), [apps/web/README.md](../apps/web/README.md)) · **production same-origin `GET /api/stats/*` + `/api/health` on Vercel** ([`api/`](../api/), [web.md](web.md) § Deploy) · **`VITE_STATS_API_BASE`** in Vercel **Production, Preview, Development** · **tranche documentation**  
- **Amber:** **Real** public aggregates — need **hosted durable ingest**, **`IMPACT_INGEST_UPSTREAM`**, **`IMPACT_SUBMIT_URL`**, and enough submissions (**fallback** is honest, not crowd data) · **[#34](https://github.com/sovereignsquad/impact/issues/34)** · **Path D** trust/compliance · GitHub **Done** / evidence on **#58–#62** may trail code  
- **Red:** _none for dashboard code path_ — **do not** claim **meaningful** community **dashboard data** until **upstream** + **volume** + thresholds allow publication

**Immediate next steps**

1. **Deploy / operate hosted ingest** → set **`IMPACT_INGEST_UPSTREAM`** on Vercel → **`IMPACT_SUBMIT_URL`** on clients → seed → verify **`/data.html`** shows **non-fallback** aggregates when thresholds allow → **close [#58](https://github.com/sovereignsquad/impact/issues/58)–[#62](https://github.com/sovereignsquad/impact/issues/62)** with proof ([board closure model](#board-closure-dashboard))  
2. **Close [#34](https://github.com/sovereignsquad/impact/issues/34)** (publish **`@impact/cli`**, `npm view`, clean-machine smoke) — **parallel** where capacity  
3. **Mac trust** work **in parallel only if capacity** allows  
4. **Keep DMG non-final** until **M3** ([#65](https://github.com/sovereignsquad/impact/issues/65)) is done  

**Decision:** **This file** is the **confirmed SSOT** for the **next public delivery phase** — a **clean, usable control document**.

**Confirmed (unchanged):** **This file** as SSOT · [mlp-status-cto.md](mlp-status-cto.md) aligned · [CHANGELOG.md](../CHANGELOG.md) records the trail · [§ Project board — linked issues](#github-issue-index) (top of file) lists **#34–#66** + programme **#35–#43** with titles for readers without GitHub access.

<a id="board-closure-dashboard"></a>

## CTO acceptance — dashboard backend in repo (2026-04-03)

**Formal leadership acceptance:** [mlp-status-cto.md § CTO acceptance — leadership view](mlp-status-cto.md#cto-acceptance-leadership-dashboard) — canonical **one-page verdict**; **repo-complete ≠ product-live**; canonical **leadership sentence**; **control stack** split; **steps 1–11** + **report-back**; GitHub **activation** tracked on **[#58](https://github.com/sovereignsquad/impact/issues/58)**, **npm** on **[#34](https://github.com/sovereignsquad/impact/issues/34)**.

**Accepted in code:** D1–D5 (**#58–#62**) — ingest MVP, aggregation, privacy thresholds, stats read API, web wiring (**`VITE_STATS_API_BASE`** + `/data.html`); HTTP integration tests; CORS; SQLite persistence; duplicate handling per [submission-contract.md](submission-contract.md); **`npm run verify:release`** green.

**Not accepted as publicly delivered (real aggregates):** hosted SQLite ingest (TLS, persistent DB, backup/`better-sqlite3` ops); **`IMPACT_INGEST_UPSTREAM`** on Vercel so **`/api/stats/*`** is **not** only **fallback**; **`IMPACT_SUBMIT_URL`** pointed at that host; enough submissions for meaningful buckets; hosted smoke proving **non-fallback** JSON and **`/data.html`** behaviour (vs low-sample suppression).

**Immediate operations:** sync GitHub issue bodies/status for **#59–#62** to repo truth → **deploy ingest** (repo ships **[`Dockerfile.ingest`](../Dockerfile.ingest)** + **`npm run docker:ingest:build`** — see [ingest-server.md](ingest-server.md) § *Container image*, [`deploy/ingest-fly.example.toml`](../deploy/ingest-fly.example.toml)) → set **`IMPACT_INGEST_UPSTREAM`** (+ confirm **`VITE_STATS_API_BASE`** / redeploy web if needed) → **seed** volume (or **non-public** test env with controlled threshold tuning only) → **verify** **`/api/health`** **`stats_mode: upstream`**, endpoints, and **`/data.html`** UX.

### Board closure model (#58–#62)

**Substance:** **#58–#62** are **largely implemented in repo** — do **not** treat them as untouched backlog — but **do not** mass-close on code alone.

| Issue | Toward Review / Done when |
| ----- | ------------------------- |
| **[#58](https://github.com/sovereignsquad/impact/issues/58)** | **Hosted** ingest accepts real submissions (contract-aligned). |
| **[#59](https://github.com/sovereignsquad/impact/issues/59)**, **[#60](https://github.com/sovereignsquad/impact/issues/60)**, **[#61](https://github.com/sovereignsquad/impact/issues/61)** | **Hosted** API returns correct aggregates with **privacy suppression** verified. |
| **[#62](https://github.com/sovereignsquad/impact/issues/62)** | **Public** webapp wired to **live** API and **verified** (real tables when thresholds allow; placeholders when not). |

**#62 last:** keep **#62** open until **public** verification — see [mlp-status-cto.md](mlp-status-cto.md) (full CTO assessment).

**Constraint:** keep privacy thresholds **real** in production — **no** fabricated volume; **no** weakening suppression for optics.

---

## CTO assessment — three distribution paths (2026-04-10)

**What is newly true — three distribution states**

1. **Path B — repo-based install** — **real**, **verified**, **already usable**.  
2. **Path C — `npm install`** — **implementation-ready** in repo; **not publicly live** until publish; **blocked** by **npm login / publish / `npm view` / clean-Mac smoke** — **[#34](https://github.com/sovereignsquad/impact/issues/34)** is **still not Done**.  
3. **Path D — DMG** — **working local packaging pipeline** ([`packaging/macos/`](../packaging/macos/)); **`.dmg`**, **checksum**, **`Impact.app`**, **ad-hoc** signing, **local smoke** passed — **not** a **fully trusted, consumer-grade** Mac release until **Developer ID**, **notarization**, **release hosting**, and **clean end-user validation** from the **published** artifact. **Do not market** Path D as “the Mac app is done.”

**Strategic correction**

Earlier sequencing assumed **#34 → dashboard → packaging → DMG last**. **What happened:** packaging **advanced early** as **infrastructure** — **partway** only — **acceptable** if we **do not pretend** it is **complete** public Mac delivery.

| Lens | Position |
| ---- | -------- |
| **Distribution** | **Further along** than before. |
| **Trust / compliance** | **Still incomplete** for polished macOS distribution. |
| **Dashboard** | **In repo:** D1–D5 shipped in code (**#58–#62**); **hosted** live stats + board closure **amber**. |

**macOS tranche nuance (M1–M4)**

| Stage | Issue | Status call |
| ----- | ----- | ----------- |
| **M1** | [#63](https://github.com/sovereignsquad/impact/issues/63) | **Done enough** ([macos-distribution.md](macos-distribution.md)). |
| **M2** | [#64](https://github.com/sovereignsquad/impact/issues/64) | **Partially to substantially done** (scripted DMG + artifact + docs; evidence on **released** artifact TBD). |
| **M3** | [#65](https://github.com/sovereignsquad/impact/issues/65) | **Not done** (ad-hoc only). |
| **M4** | [#66](https://github.com/sovereignsquad/impact/issues/66) | **Technically produced** — **not** public-quality Mac release until **M3** is done. |

**Current status call**

- **Green:** MVP · **public web shell** · **in-repo MLP** · **local DMG build pipeline** · **in-repo dashboard spine** (ingest + read API + optional `data.html` wiring).  
- **Amber:** **#34** open · Path D **trust-incomplete** · Mac artifact **technical** but **below** polished product bar · **deployed** ingest + submission volume for **public** dashboard value.  
- **Red:** _none_ for **#58–#62** code — programme **Done** follows ops evidence.

**Operating model (updated)**

1. **Close [#34](https://github.com/sovereignsquad/impact/issues/34)** — `npm login` → `npm run publish:npm` → `npm view` → **Path C** smoke → evidence — **still the most important short-term adoption step.**  
2. **Attach DMG + checksum** to a **GitHub Release**; **do not overclaim** trust.  
3. **Do not** call the DMG **finished** until **M3** is done.  
4. **Board / evidence:** **#58–#62** — code is **in repo**; close issues when **production** ingest and web build point at real data per acceptance (may follow **#34**).  
5. **Two tracks after #34** (if capacity): **Track A** — signing, notarization, release flow, clean-Mac validation of **published** DMG. **Track B** — **dashboard (#58–#62)**. **Primary product-value: Track B.** **Parallel allowed** — strict “packaging only in Backlog until dashboard advances” **softens**; **constraint: do not let DMG work distract from the dashboard tranche.**

**Bottom line:** **Downloadable Mac app** — much closer; remainder mostly **signing, notarization, release-quality validation**. **Dashboard code** — **in repo** (**#58–#62**); **end-user-visible live aggregates** need **deployed ingest** + **volume** + honest **web** build config.

**Message to the developer**

Packaging progress is **accepted** (pipeline, app bundle, DMG, checksum, local smoke, docs). **Not accepted** as **finished Mac delivery** until Developer ID, notarization, release validation, and end-user proof on the **released** artifact. **Immediate:** finish **#34**; attach DMG to Release; begin **#58** after **#34**; signing/notarization **in parallel only if capacity**; **do not lose** the dashboard tranche — historical hardware / tools / LLMs / web visibility remain the **missing product-value layer**.

**Strong product choices (preserved):** **Out of scope:** native GUI, accounts/profile layer, leaderboards, benchmark overlays.

---

<a id="cto-directive-background"></a>

## CTO directive — background system delivery (2026-04-12)

### Why the product shell is ahead of production infrastructure

**App / install paths — only one is fully finished**

| Path | State |
| ---- | ----- |
| **B — repo install** | **Real** and **working** |
| **C — npm** | **Prepared** in repo; **not live** until `@impact/cli` is **published** and **smoke-tested** (**[#34](https://github.com/sovereignsquad/impact/issues/34)**) |
| **D — DMG** | **Pipeline** produces **`.app` + DMG**; **not consumer-grade** without **Developer ID** signing, **Apple notarization**, and **release/distribution validation** on the **published** artifact |

**Honest summary:** we can **build** the Mac artifact; we have **not** finished the **trust / release** layer for a **proper** downloadable Mac app.

**Dashboard — not delivered**

**Pages exist**; the **data system** behind them does **not**. To show **real** historical community data we still need: **ingest backend** · **validation / deduplication** · **storage** · **aggregation** · **privacy thresholds** · **read API** · **frontend wiring** to real aggregates. Today: **shell** only — **not** the **live community data engine**.

**Why it happened**

Shipped: **MVP scanner**, **docs**, **web shell**, **report/recommendations**, **packaging progress**. **Still missing:** hard **operational** work — **publish/auth/release**, **signing/notarization**, **backend ingestion and analytics**.

**Real blockers**

| To ship the **app** properly | To ship the **dashboard** properly |
| ---------------------------- | ------------------------------------ |
| 1. Close **#34** (npm) | 1. Start **#58** |
| 2. Finish signing / notarization | 2. Then **#59** |
| 3. Publish DMG as **trusted** release | 3. Then **#60 → #61 → #62** |

**Short answer:** stakeholders want **finished public surfaces**; the team delivered the **front layer** and **local engineering** layer — **not** the final **operational** layer. The gap is **not** “we don’t know what to build” — it is the **last mile**: **infrastructure, release, trust, and data plumbing**.

**Deliver everything — yes.** Correct focus: **background system** so the shell becomes **true**.

---

### Product decision

The **next missing product value** is the **backend** that powers **real community visibility**. **Front-end shell** is **no longer** the bottleneck. **Bottleneck:** **data path** behind it.

**Treat the dashboard as a backend-driven product**, not a static-site problem.

---

### Delivery tranche — backend foundation for community visibility

**Issue mapping (board):** conceptual phases below align with **D1–D5** / **[#58](https://github.com/sovereignsquad/impact/issues/58)–[#62](https://github.com/sovereignsquad/impact/issues/62)**; **#58** should include a **minimal persistent storage model** (Phases 1–2); **#59** covers normalization + aggregation (Phase 3); **#60–#62** follow as below.

#### Phase 1 — Submission ingest (→ D1 / [#58](https://github.com/sovereignsquad/impact/issues/58))

**Deliver:** HTTP endpoint for profile submission · **schema validation** on inbound payloads · **duplicate detection** · **write** accepted submissions to storage · **reject** invalid payloads cleanly · **minimal** operational logging.

**Minimum result:** a submitted `impact-profile.json` can be **received** and **stored safely**.

#### Phase 2 — Storage model (within D1 / [#58](https://github.com/sovereignsquad/impact/issues/58))

**Persist at minimum:** submission id · received timestamp · schema version · normalized machine class · OS/platform · chip family · memory band · runtime/tool/model dimensions · raw or **canonical sanitized** profile payload · dedupe keys/hashes · processing status.

**Minimum result:** backend can **persist records** suitable for **later aggregation**.

#### Phase 3 — Normalization and aggregation (→ D2 / [#59](https://github.com/sovereignsquad/impact/issues/59))

**Normalize** dimensions: machine classes · chip families · memory bands · platform families · runtime families · tool families · model families · locality split. **Then aggregate:** counts · averages · medians where useful · top-N · distribution buckets.

**Minimum result:** **first dashboard summaries** computable from **real** submissions.

#### Phase 4 — Privacy threshold enforcement (→ D3 / [#60](https://github.com/sovereignsquad/impact/issues/60)) — mandatory before public display

**Rules:** minimum cohort size · low-sample suppression · safe grouping · no fingerprintable slices · no raw unique-machine exposure.

**Minimum result:** system can decide what is **safe to publish**.

#### Phase 5 — Read API for the webapp (→ D4 / [#61](https://github.com/sovereignsquad/impact/issues/61))

**After** Phases 1–4. **Example** endpoint shapes: `/api/stats/overview` · `/api/stats/hardware` · `/api/stats/tools` · `/api/stats/models` (exact paths TBD; **stable contract** required).

**Minimum result:** website can **stop using placeholders** and show **real aggregates** (after **#62** wiring).

#### Phase 6 — Web wiring (→ D5 / [#62](https://github.com/sovereignsquad/impact/issues/62))

Replace `data.html` (and related) placeholders with **real** aggregate data **only** when **D1–D4** are live.

---

### Execution order and WIP

**Order (unchanged):** **#58 → #59 → #60 → #61 → #62**.

**Low WIP:** **do not** implement all five at once. **#58** first · **#59** only when ingest is **materially** underway · **#60–#62** **staged** until unblocked.

---

### Product architecture (keep it simple)

**Recommended first shape:** **one** backend service · **one** database · **one** aggregation job layer (or query layer) · **one** read API · **one** webapp consumer.

**Suggested components:** Submission API → Database → Aggregation (scheduled rollup or query) → Stats API → Web frontend. **Enough** for first **live** community data — **no** complex platform **first**.

---

<a id="what-not-to-do-dashboard-tranche"></a>

### What not to do (this tranche)

**Do not** spend this tranche on: **more doc reshaping** · **landing-page polishing** · **DMG completion first** · **benchmark** logic · **leaderboards** · **account** systems · **compare-my-machine** features. **GUI/DMG** only **spare capacity**, separate from dashboard spine. **Bottleneck = data backend.**

---

### CTO directive — developer copy

**Focus shifts to background system delivery.**

**Primary objective:** build the foundation for: **anonymous submissions in** · **validate + dedupe** · **store safely** · **aggregate** to publishable metrics · **enforce privacy thresholds** · **read API** for the webapp.

| Step | Issue | Deliver |
| ---- | ----- | ------- |
| 1 | [#58](https://github.com/sovereignsquad/impact/issues/58) | Ingest MVP: endpoint, validation, dup detection, **persistent** storage, logging, runbook |
| 2 | [#59](https://github.com/sovereignsquad/impact/issues/59) | Normalized dimensions, aggregation schema, rollup/query layer, metric definitions |
| 3 | [#60](https://github.com/sovereignsquad/impact/issues/60) | Low-sample suppression, publication thresholds, safe grouping |
| 4 | [#61](https://github.com/sovereignsquad/impact/issues/61) | Stable stats endpoints (hardware, tools, models, overview) |
| 5 | [#62](https://github.com/sovereignsquad/impact/issues/62) | Wire webapp to **real** aggregates **only** after D1–D4 live |

**WIP:** only **#58** active first · **#59** when D1 materially underway · **#60–#62** staged · **no** scattering across all tickets.

**Constraints:** **no** fake community data · **no** benchmark overlays · **no** accounts/profiles · **no** leaderboards · **no** GUI/DMG **in this tranche** except **separate spare capacity** · **privacy thresholds before** public aggregates.

---

### Definition of success (this tranche)

**Success when:** real profiles **ingested safely** · system **computes** aggregate hardware/tool/model views · **publication safety** enforced · webapp **consumes real** aggregate endpoints **instead of placeholders**.

### Immediate management summary

**Yes** — focus **background system delivery**. The next milestone is **not** another prettier page: **real data** from submitted profiles into **safe public** aggregate views.

---

## What was missing (management summary)

### 1. Downloadable macOS app

**Path B** and **Path C** (after **#34**) cover CLI install from repo and npm. **Path D** — a **local DMG pipeline** exists ([`packaging/macos/`](../packaging/macos/)); **`.dmg` + `Impact.app` + checksum** are produced; **local smoke** passed. **Still missing** for **consumer-grade** Mac delivery: **Developer ID** signing, **notarization**, **release/distribution** for the artifact, **clean end-user validation** from the **published** DMG, and **honest** public positioning (engineering milestone — not “Mac app done”). See § *CTO assessment — three distribution paths* and [macos-distribution.md](macos-distribution.md).

**Product choice:** **.app + DMG** as engineering path; **npm** preferred when live. **No GUI scope** in this tranche.

### 2. Web dashboard (real data)

The **web shell** exists; **in-repo** **read API + aggregation** exist under [`apps/ingest`](../apps/ingest). **`data.html`** can show **real** tables when built with **`VITE_STATS_API_BASE`** pointing at a running ingest. A **public** community dashboard still requires **hosted** ingest and enough submissions. **Expanded deliverables, phases, architecture, and success criteria:** § [CTO directive — background system delivery](#cto-directive-background) (2026-04-12).

**Issue spine:** **[#58](https://github.com/sovereignsquad/impact/issues/58)–[#62](https://github.com/sovereignsquad/impact/issues/62)**. Legacy context: **[#48](https://github.com/sovereignsquad/impact/issues/48)**, **[#51](https://github.com/sovereignsquad/impact/issues/51)–[#53](https://github.com/sovereignsquad/impact/issues/53)** — superseded in execution detail by **#58–#62**.

---

## Execution order

### Phase 1 — Public install gate (mandatory)

1. **Close [#34](https://github.com/sovereignsquad/impact/issues/34)** — publish `@impact/cli`, `npm view @impact/cli`, published-package smoke, evidence, board **Done**.

### Phase 2 — Dashboard foundation (start immediately after #34)

**SSOT for per-phase deliverables:** § [CTO directive — background system delivery](#cto-directive-background) (ingest → storage → aggregation → privacy → read API → web wiring).

| ID | Issue | Deliverables |
| -- | ----- | ------------ |
| **D1** | [#58](https://github.com/sovereignsquad/impact/issues/58) | **In repo:** [`apps/ingest`](../apps/ingest) — HTTP POST, Zod validation, SQLite, **409** dedupe; [ingest-server.md](ingest-server.md). **Ops/deploy** may remain before board **Done**. |
| **D2** | [#59](https://github.com/sovereignsquad/impact/issues/59) | **In repo:** `impact.stats.v0.1` + rollups in [`aggregate.ts`](../apps/ingest/src/aggregate.ts) / [`stats-from-db.ts`](../apps/ingest/src/stats-from-db.ts); docs in [ingest-server.md](ingest-server.md) |
| **D3** | [#60](https://github.com/sovereignsquad/impact/issues/60) | **In repo:** `IMPACT_STATS_MIN_BUCKET_COUNT`, global + per-bucket suppression in `buildPublicStats` |
| **D4** | [#61](https://github.com/sovereignsquad/impact/issues/61) | **In repo:** `GET /api/stats/overview|full|hardware|tools|models`, `OPTIONS` + CORS; tests [`http-server.test.ts`](../apps/ingest/src/http-server.test.ts) |
| **D5** | [#62](https://github.com/sovereignsquad/impact/issues/62) | **In repo:** [`data.html`](../apps/web/data.html) + [`data-entry.ts`](../apps/web/src/data-entry.ts) + **`VITE_STATS_API_BASE`**; no benchmark overlays |

**Dimensions to support (D2):** machine classes, chip families, memory bands, platform counts, runtime/tool families, model families, locality split.

### Phase 3 — macOS distribution (may overlap dashboard after #34; M3 gates “finished” Path D)

| ID | Issue | Deliverables / status (2026-04-10) |
| -- | ----- | ------------------------------------ |
| **M1** | [#63](https://github.com/sovereignsquad/impact/issues/63) | **Done enough** — [macos-distribution.md](macos-distribution.md) |
| **M2** | [#64](https://github.com/sovereignsquad/impact/issues/64) | **Substantial** — scripted DMG, versioned artifact, Path D docs; **released-artifact** smoke evidence still open |
| **M3** | [#65](https://github.com/sovereignsquad/impact/issues/65) | **Open** — Developer ID + notarization (ad-hoc only today) |
| **M4** | [#66](https://github.com/sovereignsquad/impact/issues/66) | **DMG produced** — **not** “final public-quality Mac release” until **M3** |

---

## Board movement & WIP discipline

**Use the board to preserve sequence, not only visibility.** **`apply-status.sh`** template: **[#58](https://github.com/sovereignsquad/impact/issues/58)** **In Progress** (activation sprint owner); **#59–#62** **Todo** until closure order; **[#34](https://github.com/sovereignsquad/impact/issues/34)** **In Progress** (npm) — **parallel** allowed.

| When | Action |
| ---- | ------ |
| **Now** | **[#34](https://github.com/sovereignsquad/impact/issues/34)** + **[#58](https://github.com/sovereignsquad/impact/issues/58)** **In Progress** — execute **maintainer** path and **dashboard activation** (see issue bodies + [mlp-status-cto.md](mlp-status-cto.md#cto-acceptance-leadership-dashboard)). **#59–#62** **Todo** until hosted proof advances them. |
| **After production ingest + web wired** | Close **[#58](https://github.com/sovereignsquad/impact/issues/58)–[#62](https://github.com/sovereignsquad/impact/issues/62)** per [closure model](#board-closure-dashboard) with evidence. |
| **Low WIP** | Prefer **one** **dashboard** card **In Progress** (**#58** today); advance **#59–#62** only as closure model allows. |
| **macOS tranche** | **Signing / notarization** (**#65**, **#66**) may run **in parallel** if capacity — **do not** market Path D finished until **M3**. |
| **Ideabank** | GUI, accounts, leaderboards — no new issues required here. |

Re-run [`apply-status.sh`](../scripts/gh-issue-bodies/apply-status.sh) to reset the **Status** template after board drift; override in the UI when **hosted** truth differs.

---

## Constraints

- **No** fake dashboard / community data.  
- **No** benchmark overlays.  
- **No** claiming **consumer-grade** Mac delivery for Path D until **M3** (Developer ID + notarization) — engineering DMG pipeline may exist earlier (**do not** overclaim trust).  
- **No** GUI scope creep.  
- **No** account / public profile layer.  
- **Privacy thresholds** must exist **before** public aggregates go live; **privacy-safe** language everywhere.  
- **This tranche — do not** prioritize: **doc reshaping** · **landing polish** · **DMG first** · **leaderboards** · **compare-my-machine** · **accounts** — see [What not to do (this tranche)](#what-not-to-do-dashboard-tranche).

---

## Definition of success

**Dashboard / backend tranche:** real profiles **ingested safely**; **aggregates** for hardware / tools / models **computable**; **publication safety** enforced; webapp **consumes real** stats API **not placeholders** — see § *Definition of success (this tranche)* under [CTO directive — background system delivery](#cto-directive-background).

**Mac distribution:** **Path C** (npm) and **Path D** (DMG + `Impact.app`) both support **no-clone** install; **Path D** is **trust-complete** only after **M3** (signing + notarization + release validation).

**Trust:** public claims match shipped reality; privacy thresholds enforced.

---

## Developer handoff (report back)

Next handoff must include:

- What shipped for **ingest / storage**  
- Which **dashboard endpoints** exist  
- Which **aggregate sections** are live on the webapp  
- **Chosen macOS distribution path** (M1)  
- **M2 / M4** pipeline status (DMG produced locally vs **released** + trust-complete per **M3**)  
- **Dashboard (#58–#62)** — what is live vs placeholder

---

## Developer directive (CTO — verbatim intent)

**This document** is the **SSOT** for the next public delivery phase. **Primary focus (2026-04-12):** § [CTO directive — background system delivery](#cto-directive-background) — dashboard = **backend-driven product**. **Update (2026-04-03):** **#58–#62** are **implemented in repo** — priority shifts to **hosted verification** and **activation**; see § [CTO acceptance — dashboard backend in repo](#board-closure-dashboard) and [mlp-status-cto.md](mlp-status-cto.md).

**#34** remains the **public npm** gate — do **not** claim Path C live until closed.

**Board / ops:** align Status with **deployed** truth — [Board closure model (#58–#62)](#board-closure-dashboard); § *Board movement & WIP discipline* above. **macOS trust** (**#65** / **#66**) **spare capacity**; **do not** let DMG **distract** from **stats activation** or **#34**.

---

## Related

**Issue index (titles):** [§ Project board — linked issues](#github-issue-index) at the **top** of this file. **Backend tranche directive:** [§ CTO directive — background system delivery](#cto-directive-background). **Closure model:** [§ Board closure model](#board-closure-dashboard).

- [mlp-status-cto.md](mlp-status-cto.md) · [mlp-execution.md](mlp-execution.md) · [mlp.md](mlp.md) · [web.md](web.md) · [submission-contract.md](submission-contract.md) · [#38](https://github.com/sovereignsquad/impact/issues/38) (historical binary spike — defer to **#63**)
