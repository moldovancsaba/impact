## Objective

Add **continuous integration** and **quality gates** so every change to IMPACT is built, tested, and linted automatically—supporting a **global contributor base** and a sovereign benchmark foundation that cannot regress silently.

## Unified Context

Today the monorepo builds and tests **locally** (`npm run build`, `npm test`) but there is **no enforced gate on `main`**. For a programme that will grow into benchmarking and cross-platform runners, CI is part of **trust infrastructure**. This issue tracks **only automation and documented expectations**, not feature work.

## Based On

- Monorepo root `package.json` scripts
- CONTRIBUTING.md (to be updated when workflows land)
- Doctrine #1

## Problem

- Contributors cannot see **green/red** state without cloning.
- Regressions in `@doneisbetter/schemas` or scanners can ship unnoticed.
- Release hygiene (versioning, tags) is undefined.

## Goal

- GitHub Actions workflow(s) on `pull_request` and `push` to `main`: install, build, test.
- Optional: `eslint` / `prettier` with agreed rules (incremental OK).
- CONTRIBUTING section: **what CI runs** and how to reproduce locally.

## Scope

In scope:

- `.github/workflows/ci.yml` (or split jobs)
- Node 20.x matrix if justified
- Cache `npm` where sensible

Out of scope:

- Publishing to npm or binary packaging (separate issue when needed)
- Self-hosted runners

## Execution Prompt

Implement CI, document it, and paste **workflow run links** as delivery evidence in comments.

## Constraints

- Workflows must not require secrets for default PRs from forks (read-only CI).
- Failures must be **actionable** (clear log, not flaky network tests).

## Acceptance Checks

- [ ] CI runs on PR and on `main` push.
- [ ] `npm ci`, `npm run build`, `npm test` succeed in CI.
- [ ] CONTRIBUTING describes the gate and local parity commands.
- [ ] At least one intentional failing PR was used to verify the gate blocks merge (comment evidence optional).

## Dependencies

- **Depends on:** stable scripts in repo (already present).
- **Informs:** #15 (tests expand CI value).

## Risks

- Flaky integration tests if later added—design timeouts and hermetic fixtures early.

## Delivery Artifact

- Workflow YAML + CONTRIBUTING update + comment with sample green run.

## Developer Notes

- Board **Status** tracks readiness (e.g. Backlog → In Progress → Done)—**not** the issue title.
- Programme card quality bar: [mvp-factory-control#498](https://github.com/moldovancsaba/mvp-factory-control/issues/498).

## Scope / Non-Goals

Non-goals: npm publication, binary packaging (see #23 / #27), self-hosted runners — listed under Scope above.

## Out of Scope

- Publishing packages to the public npm registry (separate packaging track)
- Self-hosted GitHub Actions runners
