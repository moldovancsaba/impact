# CTO — next execution and board management

**Audience:** developers executing **MLP activation** and maintaining **org project 4** hygiene. **Operational runbook:** [mlp-activation-path.md](mlp-activation-path.md). **Activation runbook is accepted** — the next step is **execution** plus **board hygiene**, not more repo framing.

**Internal note (maintainers):** prefer developer time on **activation** and **issue-quality cleanup**, not additional product prose.

---

**MLP product execution (summary + raw submission):** [mlp-cto-directive-mlp-summary-payload.md](mlp-cto-directive-mlp-summary-payload.md). **Org migration + project SSOT rebuild:** [mlp-cto-directive-org-migration-sovereignsquad.md](mlp-cto-directive-org-migration-sovereignsquad.md).

## Status — activation pass accepted (2026-04-05)

**Accepted.** The latest developer pass is **meaningful, valid progress** — not blocked by “what to build,” but by **credentials, hosting, and activation**.

### Specifically accepted

- **`npm whoami` / `npm view`** confirmation that **[#34](https://github.com/sovereignsquad/impact/issues/34)** is **still** blocked by **real npm auth / publish** (not repo gaps).
- Successful **`DRY_RUN=1 npm run publish:npm:dry-run`**.
- **Docker ingest permission fix** in [`Dockerfile.ingest`](../Dockerfile.ingest) (`USER node` + writable **`/app/data`** / **`/data`**).
- Successful **local** ingest image build; **restart persistence** proof (SQLite **`submission_count`** survives `docker restart`).
- Evidence in **[activation-execution-status.md](activation-execution-status.md)**.
- **Issue comment** on **#34** with summary + link to status doc.
- Fixes **pushed to `main`**.

### What remains true (operational blockers)

These are **maintainer / infrastructure** blockers, **not** repo-design blockers:

- **npm publish** (credentials + `npm run publish:npm`)
- **Hosted ingest** deployment (HTTPS origin)
- **`IMPACT_INGEST_UPSTREAM`** on Vercel + **web redeploy**
- **Submission volume** above privacy threshold
- **Live public `/data.html`** aggregate proof before closing **[#62](https://github.com/sovereignsquad/impact/issues/62)**

### Maintainer order (do these next, in sequence)

1. `npm login` → `npm run publish:npm` → `npm view @doneisbetter/cli version`  
2. Deploy ingest from **`Dockerfile.ingest`**; persistent **`IMPACT_INGEST_DB_PATH`**  
3. `vercel env add IMPACT_INGEST_UPSTREAM production --value "https://YOUR-INGEST-ORIGIN" --yes` (no trailing slash)  
4. **Redeploy** the web app on Vercel  
5. **Submit** enough profiles for thresholds  
6. **Verify** real aggregate tables on **`/data.html`**  
7. Close **[#34](https://github.com/sovereignsquad/impact/issues/34)** and **[#58](https://github.com/sovereignsquad/impact/issues/58)–[#62](https://github.com/sovereignsquad/impact/issues/62)** in **documented closure order** (**#62** last)

### Developer next tasks (after maintainer inputs land)

1. **Stay on activation / evidence** — do **not** switch back to general planning or doc churn for its own sake.

2. **Hosted validation pass** — as soon as the maintainer provides **published npm package**, **ingest origin**, and **`IMPACT_INGEST_UPSTREAM`** is set, execute:
   - Verify **`/api/health`** ( **`stats_mode: upstream`** )
   - Verify **`/api/stats/*`** on the **public** origin
   - Verify **fallback vs upstream** behaviour
   - Verify **`/data.html`**
   - Update **[activation-execution-status.md](activation-execution-status.md)**
   - Post **issue evidence** for **#58–#62** in **closure order** (comments / attachments as appropriate)

3. **Board discipline** until hosted proof exists:
   - **#34** → **In Progress** until publish proof  
   - **#58** → **In Progress**  
   - **#59–#62** → staged per **[closure readiness](mlp-activation-path.md#issue-readiness-honest)** — **do not** mark **#62** **Done** before **public `/data.html`** live proof  

4. **Issue quality** — continue **only** where helpful; **activation** remains the **primary** delivery track.

### What not to do

- No **fake** closure on **#34**  
- No **fake** “dashboard live” claim  
- No **production threshold weakening**  
- No **doc reshaping** unless tied to **delivered evidence**

---

## 1. What you do next

### Execute the activation runbook in order

Use **[mlp-activation-path.md](mlp-activation-path.md)** as the operational source of truth.

**First — close [#34](https://github.com/sovereignsquad/impact/issues/34)**

- `npm login`
- `npm run publish:npm`
- `npm view @doneisbetter/cli`
- **Clean-machine Path C** smoke from the published package
- Attach **evidence** to **#34**
- Move **#34** to **Done** when acceptance is met

**Then — dashboard activation path**

- Deploy **hosted ingest** ([`Dockerfile.ingest`](../Dockerfile.ingest), [ingest-server.md](ingest-server.md))
- Configure **persistent** **`IMPACT_INGEST_DB_PATH`**
- Verify **`/health`** and **`/healthz`** on the ingest origin
- Set **`IMPACT_INGEST_UPSTREAM`** on Vercel
- Keep **`VITE_STATS_API_BASE`** aligned ([web.md](web.md))
- Set **`IMPACT_SUBMIT_URL`** to the **real** ingest origin for clients
- **Seed** enough submissions for thresholds ([mlp-activation-path.md](mlp-activation-path.md) §4)
- Verify **`/api/stats/*`** (public same-origin path)
- Verify **`/data.html`** with **real** aggregates
- Close **[#58](https://github.com/sovereignsquad/impact/issues/58)–[#62](https://github.com/sovereignsquad/impact/issues/62)** in the **documented order**, with **[#62](https://github.com/sovereignsquad/impact/issues/62) last**

### Report back with proof, not summary

Use the **report-back** structure in [mlp-activation-path.md](mlp-activation-path.md) (end of file).

Expect in the handoff:

- Published **npm** version
- **`npm view`** result
- **Ingest host URL**
- **Health** output
- **Stats** endpoint samples
- **Threshold** value and current **submission volume**
- Proof **`/data.html`** shows **real** aggregates
- Explicit **recommendation** for which of **#34**, **#58–#62** are **Review**-ready or **Done**-ready

---

## 2. GitHub Project board management

### Workflow rule

- The **board** ([org project 4](https://github.com/orgs/sovereignsquad/projects/4) **Status**) is **workflow** truth.
- **Issue titles** are not workflow.
- **Issue bodies** are **scope / acceptance** truth ([ssot-map.md](ssot-map.md)).

### Status movement — keep now (baseline template)

Automated template: [`scripts/gh-issue-bodies/apply-status.sh`](../scripts/gh-issue-bodies/apply-status.sh) (re-run after drift).

| Issue(s) | Status |
| -------- | ------ |
| **#34** | **In Progress** |
| **#58** | **In Progress** |
| **#59–#62** | **Todo** |
| **#63–#66** | **Backlog** |

### After **#34** closes

- **#34** → **Done**

### During dashboard activation — low WIP

- Do **not** move **#59** to **In Progress** until **#58** is materially underway and **hosted ingest** is **real**.
- Move **#60** only when **aggregation** is truly underway in **hosted** context.
- Move **#61** only when **live endpoint** wiring is the **active** task.
- Move **#62** only when **public web verification** is the **active** task.

### Closure order (dashboard)

1. **#58** first  
2. Then **#59**  
3. Then **#60**  
4. Then **#61**  
5. **#62** last  

### Packaging track (**#63–#66**)

- Stay **Backlog** unless there is **real spare capacity**.
- Move forward only when activation allows.
- **DMG** is **last** — never the **first** packaging move.

### Board quality — required standard

All **active** issues must read as **real delivery contracts**, not thin task notes.

**Implementation issues** should include (aligned with [`scripts/gh-issue-bodies/README.md`](../scripts/gh-issue-bodies/README.md)):

1. Objective  
2. Unified Context  
3. Based On  
4. Problem  
5. Goal  
6. Scope  
7. Execution Prompt  
8. Scope / Non-Goals  
9. Constraints  
10. Acceptance Checks  
11. Dependencies  
12. Out of Scope  
13. Risks  
14. Delivery Artifact  
15. Developer Notes  

**Roadmap / horizon-marker issues** — at minimum:

- Objective  
- Unified Context  
- Theme / Goal  
- Why this matters  
- What it does not mean yet  
- Dependencies / downstream links  
- Risks of misunderstanding  
- Related execution issues  

### Special rule — active dashboard and distribution issues

For **#34**, **#44–#49**, **#58–#66**, each issue body must clearly separate:

- What is **already shipped** in repo  
- What is still **operational**  
- What qualifies for **Review**  
- What qualifies for **Done**  

### Board cleanup order

**First wave** — upgrade and sync bodies for:

- **#34**  
- **#44–#49**  
- **#58–#66**  

**Second wave** — upgrade and sync:

- **#29–#32**  
- **#50–#57**  
- Any still-visible **umbrella** issue that is too thin  

### Sync rule

1. **Rewrite** markdown in **`scripts/gh-issue-bodies/`** first (source of truth for issue text).  
2. **Sync GitHub** with **`apply-updates.sh`** so live issues match the repo.  
3. Adjust **Status** with **`apply-status.sh`** or the Project UI when workflow changes.

---

## 3. What not to do

- No more **status-doc churn** for its own sake  
- No **fake** community volume  
- No **production threshold weakening** for optics  
- No benchmark overlays  
- No GUI / leaderboard / account work  
- No bulk **In Progress** board noise  

---

## 4. Definition of success (this phase)

This phase **succeeds** when:

- **#34** is **truly closed** with **public install** proof  
- **Hosted ingest** is **live**  
- **Public stats** endpoints return **real** data (not only fallback)  
- **`/data.html`** shows **real** aggregates when thresholds allow  
- **#58–#62** are **closed** in the **right order**  
- The board stays **low-WIP** and **high-quality**  
- The active issue set reads like a **serious operating system**, not a messy backlog  
