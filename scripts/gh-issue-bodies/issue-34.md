## Objective

Publish **`@doneisbetter/cli`** to the **npm registry** so users can `npm install -g @doneisbetter/cli` without cloning.

## Scope

- Package naming, `files` / `bin`, provenance
- Update [docs/install-macos.md](https://github.com/sovereignsquad/impact/blob/main/docs/install-macos.md), README Quick start, [smoke-test-macos.md](https://github.com/sovereignsquad/impact/blob/main/docs/smoke-test-macos.md)
- [release-checklist.md](https://github.com/sovereignsquad/impact/blob/main/docs/release-checklist.md) for publish flow
- [npm-publish.md](https://github.com/sovereignsquad/impact/blob/main/docs/npm-publish.md) + `scripts/publish-npm-packages.sh`

## Maintainer actions — unblock public npm (CTO directive)

Execute in order; **stop treating this as planning** — **Path C** goes live only after proof.

1. **`npm login`** (account in org **`doneisbetter`** with **`@doneisbetter`** scope — see [npm-publish.md](../../docs/npm-publish.md)).  
2. **`npm run publish:npm`** from repo root (or `publish:npm:dry-run` first if preferred).  
3. **`npm view @doneisbetter/cli`** — confirm **version** on registry.  
4. **Clean-machine smoke** — fresh macOS (or agreed QA host): `npm install -g @doneisbetter/cli`, `impact --version`, minimal `impact scan` — [smoke-test-macos.md](../../docs/smoke-test-macos.md) Path C.  
5. **Attach evidence** — paste command output / screenshots in a comment on this issue (or link to run log).  
6. **Close #34** — board **Done** when above are satisfied.

## Acceptance

- [x] Repo: all `@doneisbetter/*` at **0.3.0**, `files: ["dist"]`, `publishConfig.access: public`, pinned internal deps, `prepublishOnly`
- [x] `npm run publish:npm:dry-run` passes locally (CI optional — no token)
- [x] Public install documented as **Path C** (registry-first); Path B co-documented
- [x] **Path D (DMG)** in repo: `npm run build:dmg` — [`packaging/macos/`](../../packaging/macos/), [install-macos.md](../../docs/install-macos.md), [macos-distribution.md](../../docs/macos-distribution.md)
- [ ] **Maintainer:** complete **Maintainer actions** above (login → publish → `npm view` → clean-machine smoke → evidence → close).

## Based on

[Issue #1](https://github.com/sovereignsquad/impact/issues/1) — Todo track.
