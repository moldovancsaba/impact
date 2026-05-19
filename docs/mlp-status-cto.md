# MLP status — CTO assessment (snapshot)

**Purpose:** single **answerable status memo** for leadership and contributors: how far the MLP has progressed, what is in code, what blocks public adoption, and **ordered next work**. Supplements [mlp.md](mlp.md) (what the MLP **is**), [mlp-execution.md](mlp-execution.md) (how execution is **staged**), and [current-state.md](current-state.md) (broader **operational truth**). **Board workflow:** [sovereignsquad · impact (project 4)](https://github.com/orgs/sovereignsquad/projects/4/views/1).

**Established:** 2026-04-03 · **Updated:** 2026-04-04 — **Vercel stats layer live** — same-origin **`/api/stats/*`** + **`/api/health`** (fallback or **`IMPACT_INGEST_UPSTREAM`** proxy); **`VITE_STATS_API_BASE`** on Production/Preview/Development; **main bottleneck** = **hosted SQLite ingest** + upstream wiring + volume (**#58** activation continues). **#34** = **npm** path unchanged. **Prior:** **2026-04-03** activation directive; **2026-04-12** background-system-first framing in [mlp-next-delivery-tranche.md](mlp-next-delivery-tranche.md).

**Maintain this doc when:** the public install gate (**#34**) closes; **hosted ingest** or **live stats** materially changes; **#58–#62** board closure; or **M1–M3** / **H\*** work materially changes state. **Step-by-step activation work** (evidence, endpoints, closure order): [mlp-activation-path.md](mlp-activation-path.md). **Board workflow, WIP rules, issue body bar, cleanup waves:** [mlp-cto-next-execution.md](mlp-cto-next-execution.md).

<a id="cto-acceptance-leadership-dashboard"></a>

## CTO acceptance — leadership view (dashboard tranche, 2026-04-03)

**Accepted.** This is the **correct leadership view** of the dashboard tranche. The **control stack** is **correct and usable**.

### Canonical entry points

| Audience | Document | Anchor |
| -------- | -------- | ------ |
| **Leadership** — one-page verdict | **This file** | **`docs/mlp-status-cto.md#cto-acceptance-leadership-dashboard`** |
| **Execution / closeout / sequencing** | [mlp-next-delivery-tranche.md](mlp-next-delivery-tranche.md) | **`docs/mlp-next-delivery-tranche.md#board-closure-dashboard`** |

### Sentence for leadership (canonical)

> The **dashboard backend is accepted in code**, and the **public web now has a working same-origin stats path** (Vercel **`/api/stats/*`** — honest fallback until **`IMPACT_INGEST_UPSTREAM`**). **Real community aggregates** are **not** product-live until **hosted SQLite ingest**, **upstream wiring**, **submissions**, and **closure-order verification** are complete.

**Discipline (non-negotiable):** **repo-complete ≠ product-live** for community stats (same intent as the sentence above).

### What is true

**The project has a clean split between:**

- **Leadership status** — this memo (green/amber, bottleneck, acceptance).  
- **Tranche execution and closure** — [mlp-next-delivery-tranche.md](mlp-next-delivery-tranche.md) (closure model, board order).  
- **Repo navigation / audit trail** — [ssot-map.md](ssot-map.md), [docs/README.md](README.md), [CHANGELOG.md](../CHANGELOG.md).

**Also true**

- **Dashboard backend** is **implemented and accepted in repo** (**#58–#62**).  
- **Public stats HTTP path** is **live** on production hostnames (**impact.sovereignsquad.com** and aliases on the same Vercel deployment) — **`GET /api/stats/*`** returns **200** (schema-correct **fallback** without **`IMPACT_INGEST_UPSTREAM`**).  
- **Real crowd aggregates** on **`/data.html`** are **not** product-live until **hosted ingest** + **`IMPACT_INGEST_UPSTREAM`** + **`IMPACT_SUBMIT_URL`** + **enough safe submission volume** + **hosted verification** — **not** more repo planning for the engine.

**Current status call (leadership)**

- **Green:** MVP · **dashboard backend in repo** · **web shell** · **stats API layer on Vercel** (same-origin route + env aligned).  
- **Amber:** **real** dashboard data (fallback still active without upstream) · **npm / public install gate** (**#34**) · **macOS** trust / signing / notarization (**Path D** until **M3**).  
- **Primary bottleneck:** **hosted durable ingest** + **`IMPACT_INGEST_UPSTREAM`** + **submission volume**, then **board closure with proof**.

### Immediate operational sequence

**Dashboard activation (coordinate on [#58](https://github.com/sovereignsquad/impact/issues/58)) — not a documentation problem; execute:**

1. Sync **GitHub** issue truth when ready (bodies + org project for **#59–#62**).  
2. **Deploy ingest** (TLS, durable volume, ops) — Node **`apps/ingest`** + SQLite.  
3. Configure **DB / runtime** — **`IMPACT_INGEST_DB_PATH`**, **`better-sqlite3`** on target arch, **`/health`**, **logging**.  
4. On **Vercel**, set **`IMPACT_INGEST_UPSTREAM`** to that ingest **origin** (no trailing slash) so **`/api/stats/*`** **proxies** instead of **fallback**; set **`IMPACT_SUBMIT_URL`** on clients to the same **hosted** base for **POST**.  
5. **Reconfirm** **`VITE_STATS_API_BASE`** / **redeploy web** if you move off same-origin **`/api`** or change API hosting (production uses **`/api`** so multiple web hostnames stay correct).  
6. **Seed** enough **safe** submissions (privacy thresholds real — **no** production gaming).  
7. **Smoke** **`/api/stats/*`**, **`/api/health`**, and **`/data.html`** — **non-fallback** JSON when volume allows.  
8. **Close [#58](https://github.com/sovereignsquad/impact/issues/58)–[#62](https://github.com/sovereignsquad/impact/issues/62)** in **[closure model](mlp-next-delivery-tranche.md#board-closure-dashboard)** order, with **proof**.

**Report-back (required before mass board Done):** ingest **host URL** · **health** result · **stats endpoint** sample results · **web URL** using live stats · **volume / threshold** status · which issues are **Review** / **Done**-ready.

**Then (MLP path continues):**  
9. Full public **web smoke** — [web-deploy-smoke.md](web-deploy-smoke.md).  
10. **[#34](https://github.com/sovereignsquad/impact/issues/34)** — real **npm install** (maintainer checklist on that issue).  
11. **[#44](https://github.com/sovereignsquad/impact/issues/44)–[#46](https://github.com/sovereignsquad/impact/issues/46)** — evidence once live paths exist.

### Current MLP push

The process is **not** waiting on more **planning**. **Active push:** **make the dashboard live** · **make npm install real** (**#34**) · **then** close issues **with proof**. **Shortest path to delivering the MLP:** live ingest · live stats · live web data · real npm · **then** tighten Mac distribution trust (**#65** / **#66**) — not blocking the above.

---

## Doc layering (SSOT)

| Document | Role |
| -------- | ---- |
| [mlp.md](mlp.md) | What the **MLP is** — doctrine, phases, constraints |
| [mlp-execution.md](mlp-execution.md) | How execution is **staged** — gates, task IDs, order |
| **This file** ([mlp-status-cto.md](mlp-status-cto.md)) | **Main CTO memo** — **current** assessment, leadership acceptance, priorities |
| [mlp-next-delivery-tranche.md](mlp-next-delivery-tranche.md) | **Tranche SSOT** + **[board closure model](mlp-next-delivery-tranche.md#board-closure-dashboard)** (**#58–#62**) |
| [ssot-map.md](ssot-map.md) · [docs/README.md](README.md) | **Authority routing** · doc **navigation** |
| [CHANGELOG.md](../CHANGELOG.md) | **Audit trail** (releases + notable doc/product shifts) |
| [current-state.md](current-state.md) | **Operational truth** — MVP, Path B/C, **versioning SSOT** |

---

## Summary status

| Signal | Call |
| ------ | ---- |
| **MVP** | **Green** — shipped |
| **Public web shell** (multi-page, honest copy) | **Green** — **in repo**; **deploy + smoke** remain operational ([web-deploy-smoke.md](web-deploy-smoke.md)) |
| **Same-origin stats API (production)** | **Green** — **`GET /api/stats/*`** and **`/api/health`** on production web hostnames via Vercel Functions ([web.md](web.md) § Deploy, [ingest-server.md](ingest-server.md) § *Vercel stats routes*) |
| **Historical / community data (`/data.html`)** | **Amber for “real” data** — **UI + fetch path work** with **`VITE_STATS_API_BASE`**; **honest fallback** until **`IMPACT_INGEST_UPSTREAM`**; **live crowd tables** only with **hosted ingest** + **volume** under privacy thresholds |
| **Dashboard backend (D1–D5 / #58–#62)** | **Green** in repo — ingest, SQLite + dedupe, aggregation, privacy thresholds, **`GET /api/stats/*`**, CORS, HTTP tests, **`verify:release`** |
| **Dashboard product-live** (hosted) | **Amber** — **public `/api` responds** but **real aggregates** need **`IMPACT_INGEST_UPSTREAM`** + **POST ingest** + enough submissions |
| **Install truth on site** | **Green** — **strictly gated** on **[#34](https://github.com/sovereignsquad/impact/issues/34)** (Path B primary until close) |
| **Profile explorer** | **Green** — strong MLP asset (`/profile.html`) |
| **In-repo MLP** (report + recommendations + web + ingest/stats) | **Green** |
| **Tranche SSOT** ([mlp-next-delivery-tranche.md](mlp-next-delivery-tranche.md)) | **Green** — **org project 4** + spine + issue index **at top** |
| **Next-delivery tranche** (mac **#63–#66**, activation) | **Green** definition + board mapping; **operational** work = **deploy ingest**, **env web build**, **seed/verify**, **#34**, Path D trust |
| **Path B** (repo install) | **Green** — real, verified, usable |
| **Path C** (npm) | **Amber** — implementation-ready; **not public** until **#34** (login, publish, `npm view`, clean-Mac smoke, evidence) |
| **Path D** (DMG) | **Amber** — **local pipeline + artifact + ad-hoc sign + checksum + local smoke**; **not** consumer-grade until **M3** (Developer ID, notarization, **released** artifact validation) |
| **Public MLP adoption path** (npm as easiest install) | **Amber** until **#34** closed |

**Overall (CTO):** **Repo** — **MVP**, **web shell**, **dashboard engine**, **verification**, and **production stats HTTP path** are **green**. **Bottleneck** — **hosted SQLite ingest**, **`IMPACT_INGEST_UPSTREAM`**, **`IMPACT_SUBMIT_URL`**, **submission volume**, **hosted proof**, **GitHub/board truth** — **not** “missing `/api`” or **`VITE_STATS_API_BASE`**. **#34** and **Path D trust** remain **amber**. **Distinction:** **repo-complete** ≠ **product-live** for **real** community aggregates (fallback ≠ crowd data).

### Distribution snapshot (2026-04-10)

| Path | Call |
| ---- | ---- |
| **B** | **Green** — clone/build install; verified. |
| **C** | **Amber** — ready to publish; blocked on maintainer auth + smoke + evidence (**#34**). |
| **D** | **Amber** — pipeline + `.dmg` + checksum + **ad-hoc** sign + local smoke; **not** notarized / Developer ID / release-validated → **not** “Mac app done.” |

**macOS programme (M1–M4):** **M1** done enough · **M2** substantially done · **M3** not done · **M4** DMG exists — **public-quality** only after **M3**.

**Dashboard:** **In repo** — **#58–#62** delivered as code (ingest MVP, aggregation, privacy, read API, web consumer). **Public `/api/stats/*` on the web host** is **live** (Vercel proxy/fallback). **Real aggregates publicly meaningful** still need **hosted** SQLite ingest + **`IMPACT_INGEST_UPSTREAM`** + **verification** + (typically) **enough submissions** for thresholds. **SSOT:** [mlp-next-delivery-tranche.md — Board closure model](mlp-next-delivery-tranche.md#board-closure-dashboard).

### Product bottleneck shift (2026-04-03; refined 2026-04-04)

**Was:** “We need to build the dashboard backend.” **Then:** **same-origin `/api/stats/*` on Vercel** removed the “missing `/api` path” blocker. **Now:** **durable hosted ingest**, **`IMPACT_INGEST_UPSTREAM`**, **submissions / volume**, **board–issue truth**, **`#34`**, **Path D trust** — **operational**, not conceptual. **Do not** mark **#58–#62** **Done** on **repo code alone** or on **fallback-only** public JSON; **do not** move **#62** to **Done** until the **public** webapp shows **verified** **non-fallback** aggregates when thresholds allow. **Do not** relax **production** privacy thresholds to **fake** community volume.

---

## CTO acceptance — public web / data P0 (2026-04-05)

**Accepted.** The developer delivered the **correct layer**: a **public-facing product shell** that is **honest** about current reality and **does not fake** community data.

**In repo:**

- Homepage, install, launch/use, submit, historical data page, profile explorer  
- Multi-page Vite setup, docs, board traceability, GitHub comments on **#50, #54–#57**

**What is now true**

- MVP shipped; web shell **real and structured**; historical **IA** real; install copy **still** gated by **#34**; aggregates **correctly held back**; profile explorer a **strong** asset.

### Documentation & traceability — cleanup accepted

**Correct SSOT in repo:**

- [web-deploy-smoke.md](web-deploy-smoke.md) — public web shell **smoke checklist** (operational SSOT).  
- **This file** — **post-acceptance** state (not pre-acceptance “build the slice” framing).  
- [mlp-execution.md](mlp-execution.md) · [current-state.md](current-state.md) — **next sequence** (deploy → smoke → **#34** → **#44** → **#44–#46** evidence; **#51–#53** Backlog).  
- Board note on **[#57](https://github.com/sovereignsquad/impact/issues/57)** (and related issue comments).

**CTO:** Further **repo-side reframing** is **not** required right now. The **next real moves are operational:** deploy the web shell → run [web-deploy-smoke.md](web-deploy-smoke.md) against **production** → close **#34** when npm is published and smoke-tested → update install CTA under **#44** → attach **#44–#46** completion evidence.

**Tranche freeze — directive to developers:** **Stop** repo/doc churn **for the accepted P0 web shell slice** (no more wording or status reshaping there). **Wait** for operational results. **Resume** only with: **(1)** **#44** home/install **Path C primary** copy **after #34**; **(2)** **#44–#46** completion evidence **once the live path is verified**.

---

## Next delivery tranche — dashboard + macOS (CTO)

**SSOT:** [mlp-next-delivery-tranche.md](mlp-next-delivery-tranche.md) — [CTO directive — background system delivery](mlp-next-delivery-tranche.md#cto-directive-background); [Board closure model (#58–#62)](mlp-next-delivery-tranche.md#board-closure-dashboard) (**2026-04-03**).

**Order today:** **Dashboard code** is **in repo**. **Operational priority:** **deploy ingest** → **production `VITE_STATS_API_BASE`** → **redeploy web** → **seed / verify** → sync **GitHub** issue **truth** → close **#58–#62** per **hosted** evidence. **In parallel:** **#34** (npm) and **macOS trust** (**#65** / **#66**) — **do not** treat Path D as **finished** until **M3**.

**Board:** align **org project 4** with [closure model](mlp-next-delivery-tranche.md#board-closure-dashboard); [`apply-status.sh`](../scripts/gh-issue-bodies/apply-status.sh) templates may lag — **maintainers override** with **hosted** truth.

---

## Immediate operational sequence (detail)

Same **steps 1–8** (dashboard activation) and **9–11** (web smoke → **#34** → **#44–#46**) as § *CTO acceptance — leadership view* above. Extra detail:

- **Ingest deploy:** **`IMPACT_INGEST_DB_PATH`**, backup posture, **`better-sqlite3`** on target OS/arch; smoke **POST** + all **`GET /api/stats/*`** routes; **health** + **logging** in ops.  
- **Volume:** enough real profiles **or** **non-public** threshold tests — **never** weaken production suppression for optics.  
- **Web:** [web-deploy-smoke.md](web-deploy-smoke.md) for six URLs + **`/data.html`** states.  
- **#34 / #44–#46:** maintainer publish Path C (see **[#34](https://github.com/sovereignsquad/impact/issues/34)** body), then install CTA and MLP evidence.

**Backlog discipline:** **[#51](https://github.com/sovereignsquad/impact/issues/51)–[#53](https://github.com/sovereignsquad/impact/issues/53)** remain **legacy IA**; **#58–#62** are the **execution spine** for real aggregates — see [closure model](mlp-next-delivery-tranche.md#board-closure-dashboard).

---

## What is materially delivered (in repo)

- **Dashboard D1–D5 (#58–#62)** — [`apps/ingest`](../apps/ingest): POST ingest, validation, SQLite + dedupe ([submission-contract.md](submission-contract.md)), aggregation + privacy thresholds, **`GET /api/stats/*`**, CORS, Vitest including HTTP tests; [`apps/web`](../apps/web): **`data.html`** live/fallback via **`VITE_STATS_API_BASE`**.  
- **M3** — Deterministic `buildRecommendations` (`@impact/reporting`); shared with web.  
- **M2** — Richer `impact-report.html` (at a glance, meaning, suggested steps, limitations).  
- **M1** — Install troubleshooting ([install-macos.md](install-macos.md)).  
- **W2** — Web profile explorer (runtimes + same recommendations).  
- **Public web IA** — Multi-page site: **home**, **install**, **run & results**, **submit**, **community data**, **profile preview** ([web.md](web.md)); footer **version** line aligned with [current-state.md](current-state.md) § Versioning.  
- **Tests / build** — **`npm run verify:release`** green at repo root.

Product shape: **scanner + interpretation + guidance + public explainer + in-repo dashboard engine** — **public community stats** still **activation**, not code gap.

---

## Product goal — next lovable moment

> A visitor **sees** what kinds of machines, tools, and models show up in the community dataset, **installs** IMPACT, **runs** it, and **understands** how to **contribute** a result — with **trust** intact.

**Three public-facing surfaces (priority):**

1. **Historical data** on the website — main **proof** layer (aggregates, not hype).  
2. **Download / install** — one obvious **primary CTA** (honest until **#34**).  
3. **Launch → submit** — tiny flow: install → scan → report → optional submit.

---

## Staged delivery (realistic)

| Phase | Content |
| ----- | -------- |
| **A** | Website **structure** + live-ready sections (may be empty / labelled). |
| **B** | Public **install/download** path truth (**#34** unlocks npm-first CTA). |
| **C** | **Submission** story visibility (what is sent, privacy, how stats update **later**). |
| **D** | **Real historical aggregates** once ingest is live enough — **do not fake** data before then. |

**Rule:** Historical **sections** can ship **now**; **live community numbers** only when submissions exist and pass **privacy thresholds**. Copy must say so explicitly.

---

## Historical data — content intent (MVP)

**Start with:** counts, top categories, simple distributions.  
**Later:** trends, compare-my-machine, benchmark overlays (Roadmap — not this slice).

**Sections (IA):**

- **Hardware tested** — machine classes, chip families, memory buckets, OS/platform distribution.  
- **Tools tested** — runtimes/tools (Ollama, MLX, allowlisted tools; more as they appear).  
- **LLMs tested** — normalised model families, local vs cloud where available, runtime associations, top families when data exists.

---

## Board-tracked tasks: H1–H8 (GitHub **#50–#57**)

Executable issues on [org project 4](https://github.com/orgs/sovereignsquad/projects/4). **Status** reapplied via [`apply-status.sh`](../scripts/gh-issue-bodies/apply-status.sh).

| ID | Issue | Board (template) | Priority |
| -- | ----- | ---------------- | -------- |
| **H1** | [#50](https://github.com/sovereignsquad/impact/issues/50) Historical data **information architecture** (hardware / tools / LLMs sections) | **Todo (NEXT)** | P0 |
| **H5** | [#54](https://github.com/sovereignsquad/impact/issues/54) **Install / download** page | **Todo (NEXT)** | P0 |
| **H6** | [#55](https://github.com/sovereignsquad/impact/issues/55) **Launch / use** page | **Todo (NEXT)** | P0 |
| **H7** | [#56](https://github.com/sovereignsquad/impact/issues/56) **Submit result** page | **Todo (NEXT)** | P0 |
| **H8** | [#57](https://github.com/sovereignsquad/impact/issues/57) **Homepage** rework (four pillars) | **Todo (NEXT)** | P0 |
| **H2** | [#51](https://github.com/sovereignsquad/impact/issues/51) Historical **hardware** dataset MVP | **Backlog (SOONER)** | P0 |
| **H3** | [#52](https://github.com/sovereignsquad/impact/issues/52) Historical **tools/runtimes** dataset MVP | **Backlog (SOONER)** | P0 |
| **H4** | [#53](https://github.com/sovereignsquad/impact/issues/53) Historical **LLM/model** dataset MVP | **Backlog (SOONER)** | P0 |

**#34** remains **In Progress (NOW)** until maintainer closeout (publish + smoke + evidence).

**Roadmap (later) — not opened as H-tasks here:** trend charts, compare vs crowd, benchmark overlays on historical data, binary / DMG / desktop delivery.

**Ideabank (later):** personalised accounts, public leaderboards, “social profiles for machines” — do **not** track as P0.

---

## Constraints (non-negotiable)

- **Do not** imply **live community data** on the **public** site before **hosted** ingest + **wired** web + **verified** behaviour.  
- **Do not** imply **npm install is live** before **#34** closes.  
- **Do not** add **benchmark** claims beyond discovery / honest scope.  
- **Privacy** wording explicit ([privacy-for-users.md](privacy-for-users.md), [submission-contract.md](submission-contract.md)).  
- **Placeholders** when API unset; **live** only from **real** API — **no** fabricated aggregate counts.  
- **Do not** relax **production** privacy thresholds to **inflate** public buckets.  
- **No** DMG/GUI from this track unless explicitly rescoped.

---

## CTO directive to developers (current)

**Canonical:** § [CTO acceptance — leadership view](#cto-acceptance-leadership-dashboard) — **sentence for leadership**, **steps 1–11**, **report-back**, **#58** / **#34** issue bodies in [`scripts/gh-issue-bodies/`](../scripts/gh-issue-bodies/).

**Summary:** **Dashboard backend accepted in code** — **`verify:release`** green — but **product not live** until **hosted deployment**, **aggregate activation**, and **closure-order verification**. **Execute** the **activation sprint** on **[#58](https://github.com/sovereignsquad/impact/issues/58)** and **maintainer actions** on **[#34](https://github.com/sovereignsquad/impact/issues/34)**; **then** close issues **with proof**.

**Bottom line:** **Ops** first (**live ingest · live stats · live web · real npm**); **Mac trust** (**#65** / **#66**) follows without blocking the above.

---

## Ongoing engineering (post–#34, parallel where useful)

- Tighten **recommendation** rules (low memory, platform honesty, cloud-first hints).  
- Strengthen report **summary hierarchy** (primary takeaway, top actions).  
- Web explorer: **badges**, **provenance**, **sample profile** mode.

---

## Related links

- [mlp.md](mlp.md) · [mlp-execution.md](mlp-execution.md) · [current-state.md](current-state.md) · [ssot-map.md](ssot-map.md) · [web.md](web.md) · [web-deploy-smoke.md](web-deploy-smoke.md)
