# CTO directive — org migration (SovereignSquad) + GitHub Project SSOT rebuild

**Status:** **cutover complete** (repo `sovereignsquad/impact`, org [project 4](https://github.com/orgs/sovereignsquad/projects/4/views/1), 74 issues + `apply-status.sh`). Personal Project #2 = archive only. **Audience:** maintainers + developers executing programme governance.

**Related:** [ssot-map.md](ssot-map.md), [project-management.md](project-management.md), [mlp-cto-next-execution.md](mlp-cto-next-execution.md), `scripts/gh-issue-bodies/`.

---

## Objective

Move IMPACT from personal ownership to **`sovereignsquad`** in a **controlled** way: **rebuild** the **GitHub Project (v2)** under the **organization** so it becomes the durable **workflow SSOT**, then **transfer** the repository. Treat GitHub’s **project copy** as **structure only** — copied projects do **not** bring over item cards; you **intentionally** re-add issues and statuses.

---

## Target end state

| Asset | After cutover |
| ----- | ------------- |
| **Repository** | **`sovereignsquad/impact`** (transfer from `sovereignsquad/impact`; GitHub serves redirects from the old URL; clones should **`git remote set-url`** to the canonical URL). |
| **GitHub Project** | **Org-owned** project under **`sovereignsquad`** — **only active workflow board**. |
| **Old personal Project #2** | **Frozen / archive / read-only reference** — not used for Status changes. |

---

## Operating rule (after cutover)

- **Org project** = **workflow truth** (Status column).
- **Issue bodies** = **scope / acceptance truth**.
- **Old personal project** = **historical reference only** — no split-brain.

---

## Execution order

### Phase 1 — Preflight and freeze

**Goal:** avoid mid-migration chaos.

1. Announce a **short board freeze** window.
2. Stop **non-essential** issue edits during migration.
3. **Export / capture:** project views, custom fields, status options, active issue list + current statuses, automation under `scripts/gh-issue-bodies/`.
4. Confirm **`sovereignsquad`** can create repos, **`impact`** name is free, and **owners/admins** are assigned.

**Checks:** org permissions; no repo name collision; who approves transfer and project admin.

---

### Phase 2 — Create the new org project first

**Goal:** future SSOT **before** repo transfer.

1. In **`sovereignsquad`**, create a new Project (v2) by **copying** the current project for **views / fields / workflows** (note: **items do not copy**).
2. Name clearly, e.g. **IMPACT — programme SSOT**.
3. Verify **Status** field, saved views, custom fields, project description / README.
4. Treat this board as the **authoritative** surface going forward once populated.

---

### Phase 3 — Rebuild the board (clean, not mechanical)

**Goal:** do not copy clutter; raise quality.

1. Add **only** issues that should stay **visible** and **relevant**.
2. Re-apply **Status** intentionally; keep **low WIP** (e.g. **#34** / **#58** In Progress only if still true).
3. Fix **weak** bodies, remove **stale/duplicate** cards, archive noise.
4. **Do not** mechanically paste low-quality bodies — migration is the **cleanup** opportunity.

**Priority to make clean first:** **#34**, **#44–#49**, **#58–#66**, **#29–#32**, **#42–#43**, **#50–#57** if still relevant.

---

### Phase 4 — Transfer the repository

**Goal:** code ownership under the org.

1. Transfer **`sovereignsquad/impact`** → **`sovereignsquad/impact`**.
2. Verify issues, PRs, releases, redirects, Actions, secrets, webhooks, deploy keys, branch protection.
3. Update **local remotes:** `git remote set-url origin <new-url>`.

**Notes:** original owner becomes **collaborator** per GitHub transfer rules; **org default permissions** apply after transfer.

---

### Phase 5 — Reconnect operations

**Goal:** org + new project are the **operating base**.

1. Update **Vercel** (or other) GitHub integration to the **new repo**.
2. Update **docs and metadata:** README, `docs/**`, badges, `package.json` / workspace **repository** URLs where they embed `github.com/sovereignsquad/impact`.
3. Re-point **automation** (see [Repo files to update after cutover](#repo-files-to-update-after-cutover)).
4. Ensure **every** primary doc link targets the **new org project**, not personal Project #2.

---

### Phase 6 — Archive the old board

**Goal:** prevent split-brain SSOT.

1. Old project description: **Archived — replaced by sovereignsquad org project** (with link).
2. Remove old project from **primary** docs; stop **all** workflow edits there.
3. Keep only as **historical** reference if needed.

---

## Quality requirements

### Implementation issues (contract-grade)

Include, at minimum: Objective, Unified Context, Based On, Problem, Goal, Scope, Execution Prompt, Scope / Non-Goals, Constraints, Acceptance Checks, Dependencies, Out of Scope, Risks, Delivery Artifact, Developer Notes.

### Roadmap / ideabank cards

Include, at minimum: Objective, Unified Context, Theme / Goal, Why this matters, What this does not mean yet, Dependencies / downstream links, Risks of misunderstanding, Related execution issues.

---

## Risks to avoid

1. **Split-brain** — two boards both “active.”
2. **Structure without content** — pretty project, weak issues.
3. **Repo before project** — team loses orientation during the move.
4. **Broken automation** — scripts still point at old **project IDs** or **owner**.

---

## Recommended improvements on the new org project (day one)

- Default **stakeholder** view: **Programme (Not Done)**.
- **Execution** view: In Progress / Review / Todo.
- Clean **Ideabank** section for horizon cards.
- Project **README** linking: doctrine (**#1**), MLP activation path, execution spine, board rules.

---

## Success criteria

Migration is **complete** when:

- **`sovereignsquad/impact`** is live and integrated.
- **Org-owned GitHub Project** is the **active** workflow SSOT.
- **Docs and automation** reference the **new org repo and new project**.
- **Old personal board** is **not** operational for workflow.
- The **new board** is **cleaner and more trustworthy** than the old.

---

## Repo files to update after cutover

**Repository transfer (Phase 4) is done:** canonical remote is **`sovereignsquad/impact`** (redirects from `moldovancsaba/impact`). In-repo **`github.com/sovereignsquad/impact`** links and **`apply-updates.sh`** `REPO` are aligned.

**Still pending** until the **new org-owned Project** exists: **`apply-status.sh`** project/item/field IDs; replacing **personal [Project #2](https://github.com/users/moldovancsaba/projects/2)** links in docs with the **org project** URL (until then, Project #2 remains **historical / archive** for workflow — do not treat as split SSOT if the org board is active).

When the org project is live, update at least:

| Area | Files / actions |
| ---- | ---------------- |
| **Issue edit script** | [`scripts/gh-issue-bodies/apply-updates.sh`](../scripts/gh-issue-bodies/apply-updates.sh) — `REPO="sovereignsquad/impact"` |
| **Project Status script** | [`scripts/gh-issue-bodies/apply-status.sh`](../scripts/gh-issue-bodies/apply-status.sh) — new **`PROJECT_ID`**, **`STATUS_FIELD`**, **option IDs**, and **per-issue `PVTI_*` item IDs** from `gh project item-list` on the **org** project |
| **SSOT + programme docs** | [ssot-map.md](ssot-map.md), [mlp-next-delivery-tranche.md](mlp-next-delivery-tranche.md), [project-management.md](project-management.md), [current-state.md](current-state.md), [README.md](../README.md), [docs/README.md](README.md) — project links and `github.com/…/impact` URLs |
| **Issue body templates** | [`scripts/gh-issue-bodies/*.md`](../scripts/gh-issue-bodies/) — absolute GitHub URLs (optional: switch to relative `../..` repo paths where possible to reduce owner churn) |
| **Packages** | Workspace `package.json` **repository.url** fields if they pin `moldovancsaba` |
| **CI / hosting** | Vercel Git connection, Fly/GitHub Actions secrets, any webhook URLs |

**One-line recommendation:** create the **org project** first, **clean** it while rebuilding items, **transfer** the repo, then **cut all SSOT links** and **refresh** `apply-status.sh` from the new project’s GraphQL/API IDs.
