## Objective

**MLP M1 — Public install and adoption:** make **Path C** (`npm install -g @doneisbetter/cli`) the **public default** install story; keep **Path B** as fallback; record verification so users can install **from docs alone**.

## Unified Context

Canonical programme: [docs/mlp.md](https://github.com/sovereignsquad/impact/blob/main/docs/mlp.md). **Do not** start heavy M2/M3 implementation until **[#34](https://github.com/sovereignsquad/impact/issues/34)** is **operationally closed** (publish + smoke evidence). M1 completes the **adoption** layer around the npm path.

## Based On

- [mlp.md — M1](https://github.com/sovereignsquad/impact/blob/main/docs/mlp.md#m1--public-install-and-adoption)
- [#34](https://github.com/sovereignsquad/impact/issues/34) — npm publish gate
- [install-macos.md](https://github.com/sovereignsquad/impact/blob/main/docs/install-macos.md), [smoke-test-macos.md](https://github.com/sovereignsquad/impact/blob/main/docs/smoke-test-macos.md), [README.md](https://github.com/sovereignsquad/impact/blob/main/README.md)

## Problem

Without a **live registry package** and **docs-first** quick start, install friction suppresses trials even though MVP is correct.

## Goal

- `@doneisbetter/cli` **published** and **installable** per docs.
- README **Quick start** leads with **public** Path C; Path B clearly **fallback**.
- Smoke evidence **recorded** (Path C row in smoke doc or issue comment).

## Scope

- Align README, install-macos, release-checklist, smoke-test with **published npm** reality after **#34** closes.
- Optional: troubleshooting / `npm view` checks documented.

## Constraints

- **No** benchmark scoring, DMG, or GUI scope (see [mlp.md — What not to do](https://github.com/sovereignsquad/impact/blob/main/docs/mlp.md#what-not-to-do-for-mlp)).

## Acceptance Checks

- [ ] **[#34](https://github.com/sovereignsquad/impact/issues/34)** is **closed** with publish + Path C smoke evidence
- [ ] `npm install -g @doneisbetter/cli` works **following only** published docs
- [ ] README quick start points at **Path C** first
- [ ] Path B documented as fallback
- [ ] Smoke / verification trail updated for **registry** install

## Dependencies

- **Blocks:** —  
- **Blocked by:** **#34** (for closure of this issue)

## Delivery Artifacts

- Doc PRs + smoke evidence links; optional short comment on this issue when done.
