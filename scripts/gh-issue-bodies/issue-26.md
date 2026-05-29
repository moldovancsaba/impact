## Objective

Verify **multi-entity scan orchestration** merges into a **stable, valid** `ImpactProfile`: host + runtimes + tools + models + privacy + optional readiness—**deterministically** for the same inputs.

## Unified Context

Individual scanner tests are insufficient. Bugs hide in **merge order**, **filtering** (`tools` installed-only), and **readiness** heuristics. Fixture-level tests that **`validateImpactProfile`** real scenario files catch orchestration regressions before they hit users.

Failure modes:

- duplicate runtime ids overwrite silently
- readiness uses wrong field after schema rename
- JSON serialization order breaks diff-based audits (same logical profile should stringify consistently when re-parsed)

## Based On

- Sprint B — B10
- `packages/core/src/merge-path.test.ts` (or equivalent)
- `fixtures/scenarios/*`
- [docs/schema-semantics-v0.3.md](https://github.com/sovereignsquad/impact/blob/main/docs/schema-semantics-v0.3.md)
- [docs/confidence-rules.md](https://github.com/sovereignsquad/impact/blob/main/docs/confidence-rules.md)
- [docs/support-matrix.md](https://github.com/sovereignsquad/impact/blob/main/docs/support-matrix.md)
- [docs/submission-contract.md](https://github.com/sovereignsquad/impact/blob/main/docs/submission-contract.md)

## Problem

Schema grew faster than orchestration test depth.

## Goal

- Tests load scenario fixtures; assert multi-runtime rows, tool unknown version + `presence`, stable round-trip `JSON.stringify` after parse
- Schema validation before write remains implicit in `runScan` (preserve)

## Scope

In scope: `@doneisbetter/core` tests; optional small pure merge helpers if needed.

Out of scope: live subprocess integration across OS matrix in CI.

## Execution Prompt

Add vitest file; import `validateImpactProfile`; cover `mixed-runtime-states`, `tool-detected-version-unknown`, `ollama-reachable-with-models`.

## Scope / Non-Goals

Non-goals: property-based testing entire CLI

## Constraints

- No network in tests

## Acceptance Checks

- [ ] Merge-path tests in CI
- [ ] Mixed states asserted explicitly
- [ ] At least one stability assertion on parsed fixture

## Dependencies

- **Depends on:** #17, #20
- **Related:** #15

## Out of Scope

- Benchmark merge of multiple hosts

## Risks

- Overfitting to fixture text — prefer field assertions

## Delivery Artifact

- `merge-path.test.ts` + any small refactor for testability

## Developer Notes

- Style reference: [mvp-factory-control#498](https://github.com/moldovancsaba/mvp-factory-control/issues/498)
