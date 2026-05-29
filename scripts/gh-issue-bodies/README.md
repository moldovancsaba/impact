# GitHub issue bodies (refresh kit)

Markdown here mirrors the **structure and intent** of issues on [sovereignsquad/impact](https://github.com/sovereignsquad/impact). After `apply-updates.sh`, **GitHub issue bodies** are authoritative for scope/acceptance; **org project 4 Status** is authoritative for workflow ([`apply-status.sh`](apply-status.sh)). Full map: [docs/ssot-map.md](../../docs/ssot-map.md).

**Quality bar:** programme cards follow the same sections as [mvp-factory-control#498](https://github.com/moldovancsaba/mvp-factory-control/issues/498) — Objective, Unified Context, Based On, Problem, Goal, Scope, Execution Prompt, Scope / Non-Goals, Constraints, Acceptance Checks, Dependencies, Out of Scope, Risks, Delivery Artifact, Developer Notes.

- `issue-NN.md` — body for GitHub issue `#NN`
- **npm / Path C gate:** `issue-34.md` — [#34](https://github.com/sovereignsquad/impact/issues/34) (included in `apply-updates.sh`)
- **MLP:** `issue-44.md` … `issue-49.md` — [#44](https://github.com/sovereignsquad/impact/issues/44)–[#49](https://github.com/sovereignsquad/impact/issues/49) ([mlp.md](../../docs/mlp.md))
- **MLP public web / historical data:** `issue-50.md` … `issue-57.md` — [#50](https://github.com/sovereignsquad/impact/issues/50)–[#57](https://github.com/sovereignsquad/impact/issues/57) ([mlp-status-cto.md](../../docs/mlp-status-cto.md))
- **Dashboard + macOS packaging tranche:** `issue-58.md` … `issue-66.md` — [#58](https://github.com/sovereignsquad/impact/issues/58)–[#66](https://github.com/sovereignsquad/impact/issues/66) ([mlp-next-delivery-tranche.md](../../docs/mlp-next-delivery-tranche.md)). **#58** = **activation sprint** (product-live); **#34** = **npm maintainer** path — refresh bodies with `apply-updates.sh` after CTO directive changes.
- **Programme roadmap (horizon markers):** `issue-29.md` … `issue-32.md` — [#29](https://github.com/sovereignsquad/impact/issues/29)–[#32](https://github.com/sovereignsquad/impact/issues/32) (Roadmap column; non-executable themes).
- **Ideabank (Someday):** `issue-42.md`, `issue-43.md`, `issue-67.md` … `issue-74.md` — [#42](https://github.com/sovereignsquad/impact/issues/42), [#43](https://github.com/sovereignsquad/impact/issues/43), [#67](https://github.com/sovereignsquad/impact/issues/67)–[#74](https://github.com/sovereignsquad/impact/issues/74) — refresh with `apply-updates.sh`; **Status** = IDEABANK via `apply-status.sh`. Labels for **#67–#74:** `P2`, `area/platform` (no `phase-2`).
- **GDS migration (`@doneisbetter/web`):** `issue-76.md` … `issue-82.md` — [#76](https://github.com/sovereignsquad/impact/issues/76)–[#82](https://github.com/sovereignsquad/impact/issues/82) ([gds-migration-plan.md](../../docs/gds-migration-plan.md)). Bootstrap once: `scripts/gh-gds-tranche-bootstrap.sh`. **Status** = **Backlog** via `apply-status.sh` (parallel to activation; does not compete with **#58** WIP).
- `apply-updates.sh` — `gh issue edit … --body-file` + labels (bash)
- `apply-status.sh` — sets **org project 4 → Status** only (kanban truth). Template: **#58** **In Progress**, **#59–#60** **Done**, **#61–#62** **Todo**, **#34** **In Progress**, **#65** **In Progress** — re-run after drift.
- `gh-ensure-issues-on-project.sh` — add any repo issues missing from org project 4 (`sovereignsquad`, project `4`; safe to re-run)
- `gh-sprint-b-board-bootstrap.sh` — one-off create Sprint B issues (do not re-run)

**Board column names** must not be pasted into issue titles. Use `apply-status.sh` or the UI.

**CTO board + WIP + issue-quality rules (activation phase):** [docs/mlp-cto-next-execution.md](../../docs/mlp-cto-next-execution.md).

**Org migration (cutover done):** [docs/mlp-cto-directive-org-migration-sovereignsquad.md](../../docs/mlp-cto-directive-org-migration-sovereignsquad.md) — board = [org project 4](https://github.com/orgs/sovereignsquad/projects/4). Re-fetch **item IDs** in `apply-status.sh` after bulk `item-add` if cards are re-linked.

**Activation pass comment (optional paste to #34):** [`activation-pass-comment-34.md`](activation-pass-comment-34.md) — edit + `gh issue comment 34 --body-file …`.

**Sprint B:** Issues **#17–#28** are created from `issue-17.md` … `issue-28.md`. To bootstrap a **new** clone of the board rows, run **`scripts/gh-sprint-b-board-bootstrap.sh`** once (not idempotent). Then refresh **item IDs** in `apply-status.sh` via `gh project item-list 4 --owner sovereignsquad --format json -L 100`.

Re-fetch **item IDs** if GitHub ever re-links items (rare); IDs are baked into `apply-status.sh` for automation.
