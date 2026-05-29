## Objective

Deliver the **repository foundation** for IMPACT: **npm workspaces**, **TypeScript** packages, **schema-first** profile contract (`impact.v0.1`), **CLI entrypoint**, and **ordered build** so every downstream scanner and benchmark module plugs into one orchestrator.

## Unified Context

IMPACT is the **Industrial Multi-Platform Agent Connector Test** programme. Phase **0–1** requires a **modular monorepo** so host/runtimes/tools/models/privacy/reporting/submission can evolve independently without circular chaos. **Schema-first** design prevents “JSON soup” before benchmarking layers arrive.

## Based On

- `docs/product.md` Phase 0/1
- Doctrine #1, phase index #16
- Implemented tree: `apps/cli`, `packages/*`

## Problem

Without a strict package graph and validation, the programme will accrete scripts that cannot be tested or extended for **multi-platform** benchmark runners.

## Goal

- Workspaces + `npm run build` ordered chain.
- `@doneisbetter/schemas` exports Zod + types; tests prove invalid profiles fail.
- `@doneisbetter/core` orchestrates scanners; CLI invokes `runScan`.
- Fixtures prove schema validity.

## Scope

In scope:

- Package boundaries as merged in `main`
- `tsconfig.base.json`, workspace `package.json`
- `fixtures/baseline-profile.sample.json`

Out of scope:

- CI automation (issue #2)
- Full benchmark harness (later phases)

## Execution Prompt

Treat this issue as **foundation complete** when acceptance below is met; file follow-ups for CI (#2) and deeper tests (#15).

## Constraints

- Node **>=20** engine field respected.
- No circular imports between packages.

## Acceptance Checks

- [ ] `npm install && npm run build` succeeds on clean clone.
- [ ] `npm test` runs schema + core unit tests.
- [ ] `npm run impact -- scan --no-submit -o ./reports` produces JSON + HTML.
- [ ] `impact.v0.1` schema documented in `packages/schemas`.

## Dependencies

- **Enables:** #7–#14
- **Improved by:** #2 (CI), #15 (tests)

## Risks

- Windows path/exec gaps—document and track per-scanner.

## Delivery Artifact

- Merged codebase on `main` (link commits in comment).
- This issue body updated if package list changes.

## Developer Notes

- **Board Status** should reflect delivery (e.g. **Done**)—**not** the title.
- Evidence: repo tree + README quick start.

- Programme card quality bar: [mvp-factory-control#498](https://github.com/moldovancsaba/mvp-factory-control/issues/498).
