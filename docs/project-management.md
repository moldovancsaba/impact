# Project management for IMPACT

This document defines how **roadmap**, **backlog**, **todo**, and **board navigation** work for the IMPACT programme.

**Full authority map:** [ssot-map.md](ssot-map.md) (org project vs issues vs `current-state` vs code).

## Single board

**Workflow SSOT:** [sovereignsquad · impact (project 4)](https://github.com/orgs/sovereignsquad/projects/4) — the **Status** field on each card is the authoritative column (Todo / In Progress / Done / …). Issue **bodies** are SSOT for **scope and acceptance**; **do not** encode workflow state in titles.

**Stakeholder default:** [board view](https://github.com/orgs/sovereignsquad/projects/4/views/1) (filter by Status in the UI as needed).

**Archive (read-only reference):** [personal Project #2](https://github.com/users/moldovancsaba/projects/2)

GitHub Project URL: `https://github.com/orgs/sovereignsquad/projects/4`

**Status field** (single select) includes: `IDEABANK (SOMEDAY)`, `Roadmap (LATER)`, `Backlog (SOONER)`, `Todo (NEXT)`, `In Progress (NOW)`, `Review (ALMOST)`, `Done`, `Declined (NEVER)`.

---

## 1. North star / vision — SSOT (no duplicates)

This section is **doctrine and product direction**, not kanban. **Workflow columns** = [org project 4](https://github.com/orgs/sovereignsquad/projects/4) **Status** — [ssot-map.md](ssot-map.md).

The **only** authoritative sources for programme direction are:

| Source | Role |
| ------ | ---- |
| **[Issue #1](https://github.com/sovereignsquad/impact/issues/1)** | Doctrine / north-star operating intent |
| **[Issue #16](https://github.com/sovereignsquad/impact/issues/16)** | Phase ladder 0–4 / roadmap spine |
| **[docs/product.md](product.md)** | Narrative product and programme framing |

**Ruling:** Do **not** create extra “vision” issues that restate doctrine. **Do** maintain **one** **board-visible navigation artifact** — preferably the GitHub Project **short description** plus **README** tab (see §2) — that **links** to the three SSOTs above. A single lightweight **Roadmap** issue with links only is the fallback if the project fields are insufficient. That artifact is **navigation only**, not a second strategy document.

---

## 2. Board navigation artifact

**Preference order:**

1. **GitHub Project** short **description** + **README** tab with bullets linking **#1**, **#16**, and `docs/product.md` on `main`.
2. If that is insufficient, a **single lightweight issue** (e.g. **IMPACT P0: Programme index and north-star links**) kept in **Roadmap (LATER)** — links and orientation only, **no new scope**.

---

## 3. Column semantics (strict)

### Roadmap (LATER)

- **Theme-level** or **deferred** work: directionally accepted, **not** execution-ready, **intentionally** above the day-to-day implementation horizon.
- **Horizon markers** (3–5 theme cards) live here alongside **#16** — not implementation tickets.
- **Anti-pattern:** moving cards here just to “fill” the column.

### Backlog (SOONER)

- Work that is **accepted as real**, **not conceptually blocked**, **not** the immediate next execution set.
- **Near-future committed candidates** — likely pulled after the current sprint or in the **next planning window**.
- **Not** for vague someday ideas (those belong in **IDEABANK** or remain unscheduled).

### Todo (NEXT)

- Work **selected** for the **active near-term execution queue**.
- **Ready enough** to implement; expected to move to **In Progress** soon **without major reframing**.
- **Not** the broad backlog — this is the **next-up stack**.

### In Progress / Review / Done / Declined

Literal delivery state; **Review** means “almost” / pending verification or sign-off.

---

## 4. Saved views (stakeholder defaults)

The **default** board view must not be the only lens: **Done** dominates visually and hides direction.

**Active board:** [org project 4 · views/1](https://github.com/orgs/sovereignsquad/projects/4/views/1). Add filtered saved views on project 4 when needed (recreate the table below on the org project).

**Archive — personal Project #2** (2026-04; historical links only):

| View | Direct link | Filter (approx.) | Purpose |
| ---- | ----------- | ----------------- | -------- |
| **A — Programme (Not Done)** | [views/3](https://github.com/users/moldovancsaba/projects/2/views/3) | `-status:Done -status:"Declined (NEVER)"` | Archive |
| **B — Upcoming** | [views/4](https://github.com/users/moldovancsaba/projects/2/views/4) | Roadmap, Backlog, Todo, In Progress, Review | Archive |
| **C — Execution** | [views/5](https://github.com/users/moldovancsaba/projects/2/views/5) | Todo, In Progress, Review | Archive |
| **D — Done / Audit** | [views/6](https://github.com/users/moldovancsaba/projects/2/views/6) | `status:Done` | Archive |

**Ruling:** Default stakeholder link = **[org project 4 · views/1](https://github.com/orgs/sovereignsquad/projects/4/views/1)**. Recreate **Programme (Not Done)** as a saved view on project 4 when filters are finalized.

**Maintainers:** after cutover or bulk board changes, run [`scripts/post-migration-org-project.sh`](../scripts/post-migration-org-project.sh) (org project README, repo link, `gh-ensure-issues-on-project.sh`, `apply-status.sh`).

See [Managing views](https://docs.github.com/en/issues/planning-and-tracking-with-projects/customizing-views-in-your-project/managing-your-views) and [Filtering projects](https://docs.github.com/en/issues/planning-and-tracking-with-projects/customizing-views-in-your-project/filtering-projects).

---

## 5. Roadmap theme cards (horizon markers)

**#16** remains the **master phase ladder**. The **Roadmap** column should also hold **3–5 theme-level** cards (P1), each linking to relevant issues/docs but **not** replacing executable work:

1. **Benchmark phases / evaluation ladder** — discovery → atomic → capability → benchmark programme (board: **#29**, links **#16** + product doc).
2. **Anonymous submission and ingest services** — contract, storage, aggregation, governance (**#30**, links **#13** + docs).
3. **Platform parity and runtime coverage** — macOS-first → Linux partial → Windows experimental (**#31**, links **#10** + README).
4. **Release / distribution and adoption** — packaging, install paths, onboarding (**#32**, links **#27** + install/release docs).

These are **not** executable sprint tickets; they orient stakeholders.

---

## 6. Current board rules (CTO)

**Authoritative workflow state** is the **Status** field on [org project 4](https://github.com/orgs/sovereignsquad/projects/4). The repo carries a **reapply template**: [`scripts/gh-issue-bodies/apply-status.sh`](../scripts/gh-issue-bodies/apply-status.sh) (run after bulk realignments). If the UI and this section disagree, **trust the Project** and then update this doc + the script.

**Snapshot (post-MVP distribution — aligns with `main` + board template):**

- **In Progress (NOW):** **#34** — publish `@impact/cli` to npm (Path C); stays here until maintainer publish + smoke evidence + issue closed.
- **Todo (NEXT):** **MLP spine** — [#44](https://github.com/sovereignsquad/impact/issues/44)–[#46](https://github.com/sovereignsquad/impact/issues/46). **Public web pages** — [#50](https://github.com/sovereignsquad/impact/issues/50), [#54](https://github.com/sovereignsquad/impact/issues/54)–[#57](https://github.com/sovereignsquad/impact/issues/57) (shipped in repo; close when evidence OK). **Dashboard (after #34)** — [#58](https://github.com/sovereignsquad/impact/issues/58)–[#62](https://github.com/sovereignsquad/impact/issues/62): keep **low WIP** — **#58** In Progress first, then **#59** when D1 is underway, etc. ([mlp-next-delivery-tranche.md](mlp-next-delivery-tranche.md) § Board movement). See [mlp-status-cto.md](mlp-status-cto.md).
- **Backlog (SOONER):** **#4**, **#5**; **#13** when ingest is not the active slice; **#35–#37**; **#38** (binary spike — fold into **#63**); **MLP** [#47](https://github.com/sovereignsquad/impact/issues/47)–[#49](https://github.com/sovereignsquad/impact/issues/49); **#51**–**#53** (legacy aggregate rows; execution detail in **#58–#62**); **macOS packaging M1–M4** [#63](https://github.com/sovereignsquad/impact/issues/63)–[#66](https://github.com/sovereignsquad/impact/issues/66) (after dashboard trajectory); **GDS migration** [#76](https://github.com/sovereignsquad/impact/issues/76)–[#82](https://github.com/sovereignsquad/impact/issues/82) ([gds-migration-plan.md](gds-migration-plan.md)) — Mantine alignment for `@impact/web`; **does not** compete with **#58** activation WIP.
- **Done:** **#27** — Path B packaging / macOS smoke **complete**; do **not** keep **#27** in Todo/Backlog for “packaging completion”.
- **Roadmap (LATER):** **#16**, theme cards **#29–#32**, and long-horizon programme issues **#39–#41**.
- **#1** may stay **In Progress** as a **living doctrine** anchor (curated, not a one-shot ticket); **#3** similarly for architecture SSOT — or move to **Roadmap** if you prefer “stable reference, not active sprint”.

**Split rule:** **#10 / #13 / #14** — **do not split** merely to populate Backlog. Split only if acceptance criteria are incoherent or shipped vs future work is mixed unhelpfully. Otherwise **comment** on the issue and set **Status** to **truth** (MVP model inventory + readiness are **Done** on the board; deeper MLX / rule work tracks under platform themes).

---

## 7. Anti-patterns

- Moving cards for **visual cosmetics** without a **status truth** change.
- Duplicating product doctrine across many issues that will **drift**.
- Artificial **issue splitting** to fill columns.

---

## Critical rule: state lives on the board, not in titles

- **Do not** encode workflow state in issue titles.
- **Do** set the **Status** field on the Project item.
- **Priority** (P0/P1) may appear as **labels** and in titles as programme priority (see [mvp-factory-control#495](https://github.com/moldovancsaba/mvp-factory-control/issues/495)).

### Issue bodies (SSOT for work)

Issues are the **system of record** for **implementable** intent. Use a rich structure (Objective, Unified Context, …). Bodies under `scripts/gh-issue-bodies/` refresh GitHub; **GitHub remains authoritative** after push.

**In-repo snapshot:** [current-state.md](current-state.md).

---

## Required habits for maintainers

1. **Create a GitHub Issue** for every meaningful unit of work (feature, bug, doc set, infra task).
2. **Add the issue to org project 4** (`gh project item-add 4 --owner sovereignsquad` or the GitHub UI).
3. **Set Status** so **Roadmap / Backlog / Todo** semantics match §3.
4. **Link PRs** to issues.

---

## GitHub CLI examples

```bash
gh project item-add 2 --owner moldovancsaba \
  --url https://github.com/sovereignsquad/impact/issues/<number>
```

```bash
gh project view 2 --owner moldovancsaba
```

Board status template (maintainer machine): `scripts/gh-issue-bodies/apply-status.sh` (includes **IDEABANK** option id for ideabank cards).  
Ensure issues on board: `scripts/gh-ensure-issues-on-project.sh`

---

## Visibility

The project is intended to be **public**. If you change visibility, document the reason in an issue.

### If Roadmap / Backlog look empty

- Use **saved views** (§4), especially **Programme (Not Done)**.
- Ensure **theme roadmap** cards (§5) and **#16** are in **Roadmap**.
- **Backlog** should hold **near-future** candidates (§3), not empty by default.

---

## Relation to this repository

- **Code and deep technical docs** — this repo.
- **Plan and order** — GitHub Issues + [org project 4](https://github.com/orgs/sovereignsquad/projects/4) **Status** + saved views.
- **When two markdown files disagree** — [ssot-map.md](ssot-map.md).

That split keeps the repo clean while planning stays discoverable.
