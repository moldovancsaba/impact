## Objective

Provide an **indexed programme map** (phases 0–4) for IMPACT so architects, contributors, and operators share the same **sequencing mental model** without encoding phase names into issue titles.

## Unified Context

IMPACT is the **Industrial Multi-Platform Agent Connector Test**: a path toward a **fully sovereign brain (system + tool + LLM) benchmark system**. Delivery is incremental. Early phases **discover and document** the environment; later phases add **atomic and capability benchmarks** without breaking privacy and consent principles.

This issue is a **programme spine**, not a single sprint. Individual capabilities are tracked in **sibling issues** (#6–#15, etc.). **Status** on the board (e.g. Roadmap vs Done) reflects how “fresh” the index stays, not day-to-day execution.

## Based On

- `docs/product.md` phase table
- Doctrine issue #1
- Kanban: [Project board](https://github.com/orgs/sovereignsquad/projects/4/views/1)

## Problem

Without a visible phase ladder, teams confuse **v0.1 discovery** with **full benchmark product**, or schedule benchmarks before schema and observability exist.

## Goal

Readable phase index with **goals, entry/exit hints, and pointers** to the issues that implement each phase.

## Scope

| Phase | Goal |
| ----- | ---- |
| 0 | Foundation — monorepo, schema, contracts, fixtures, privacy policy |
| 1 | MVP discovery — host, runtimes, tools, models, reports, consent |
| 2 | Readiness hints — coarse rules, **no** benchmark scores |
| 3 | Atomic benchmark foundation — repeatability, heartbeats, scalar/token/JSON probes |
| 4 | Capability benchmarks — sandboxed CRUD/shell layers, attribution |

## Execution Prompt

When a phase completes, update **this issue** with **evidence links** (PRs, tags, ADRs). Do not duplicate status in the title.

## Constraints

- Phase 3+ must not ship until Phase 1 discovery is **trustworthy** (tests, CI, schema stability).
- Benchmark language in user-facing output must match the active phase.

## Acceptance Checks

- [ ] Phase table matches `docs/product.md` or explains intentional deltas inline.
- [ ] Each phase lists **at least one** linked implementation issue.
- [ ] Board **Status** reflects whether this index was reviewed in the last programme increment.

## Dependencies

- **Related:** #1 (doctrine), #6 (foundation), #15 (tests/hardening).

## Risks

- Stale index: mitigate by dating the last review in a comment at each release.

## Delivery Artifact

- This issue body + comments as **programme changelog**.

## Developer Notes

- Title stays **free of** workflow words (`Roadmap`, `Backlog`)—those are **Status** options on the board.

- Programme card quality bar: [mvp-factory-control#498](https://github.com/moldovancsaba/mvp-factory-control/issues/498).
