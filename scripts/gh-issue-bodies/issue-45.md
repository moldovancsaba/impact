## Objective

**MLP M2 — Report delight and first-run payoff:** redesign **`impact-report.html`** so a user gets **clarity and momentum** before reading raw tables — strong summary, “what this means”, “next best action”, known limitations, better visual hierarchy.

## Unified Context

Programme: [docs/mlp.md](https://github.com/sovereignsquad/impact/blob/main/docs/mlp.md). **Constraint:** do **not** land the full M2 slice until **[#34](https://github.com/sovereignsquad/impact/issues/34)** is closed if the work depends on Path C UX testing; **HTML/report work** may start in parallel where it does not depend on registry.

Implementation lives in `@doneisbetter/reporting` and fixtures/tests as today.

## Based On

- [mlp.md — M2](https://github.com/sovereignsquad/impact/blob/main/docs/mlp.md#m2--report-delight-and-first-run-payoff)
- [issue #12](https://github.com/sovereignsquad/impact/issues/12) / `@doneisbetter/reporting`

## Problem

The report may be **correct** but not **rewarding**; users must dig through tables to understand their machine.

## Goal

- Top **summary card** (machine overview + highlights).
- Sections: **What this means** · **Next best action** · **Known limitations**.
- Report feels **curated**, not dumped; tests updated so HTML regressions fail CI.

## Scope

- HTML template + CSS hierarchy in `packages/reporting`.
- Extend [html.test.ts](https://github.com/sovereignsquad/impact/blob/main/packages/reporting/src/html.test.ts) (or equivalent) for new copy/structure.

## Constraints

- No **opaque scores** or benchmark claims; conservative copy only ([mlp.md](https://github.com/sovereignsquad/impact/blob/main/docs/mlp.md)).

## Acceptance Checks

- [ ] User can interpret result **without** reading full tables first
- [ ] Report ends with **actionable next steps**
- [ ] **What this means** / **Next best action** / **Known limitations** present
- [ ] Visual hierarchy clearly separates summary vs detail
- [ ] Tests cover new sections (string or snapshot assertions)

## Dependencies

- **Blocked by:** **#34** optional for *start*; recommend Path C live before calling M2 “done” for production QA

## Delivery Artifacts

- PR with screenshots or sample HTML path noted in comment.
