# Release checklist — IMPACT

Use this for **tagged releases** and **release candidates**. Execute in order; do not skip validation steps.

## Preconditions

- [ ] Default branch (`main`) is green in CI
- [ ] No open P0 defects blocking release

## Version and changelog

- [ ] Align **all** version layers per [current-state.md](current-state.md) **§ Versioning (SSOT)** — Git tag `vX.Y.Z`, npm `X.Y.Z` on every `@doneisbetter/*` workspace + pinned internal deps, profile `schema_version` if schema bumped, `impact --version` via `apps/cli/package.json`, **`apps/web/package.json`** (footer “Web shell” line) + **`vite.config.ts`** `PROFILE_SCHEMA_VERSION` if schema bumped, **`apps/ingest/package.json`** if ingest ships with the tag
- [ ] Bump **all** `@doneisbetter/*` workspace versions and **pinned** internal `dependencies` to the same semver (see `packages/*/package.json`, `apps/cli/package.json`, `apps/web/package.json`, `apps/ingest/package.json`)
- [ ] `npm install` at repo root (refresh lockfile)
- [ ] Update [CHANGELOG.md](../CHANGELOG.md) `[Unreleased]` → dated section with summary
- [ ] Commit: `chore(release): vX.Y.Z` (or merge PR)

## Build and quality gates (local or CI)

- [ ] `npm ci` (runs **`preinstall`** — clones/builds [sovereignsquad/general-design-system](https://github.com/sovereignsquad/general-design-system) per [`gds.version`](../gds.version) into `.gds-src`; needs network on fresh machines)
- [ ] `npm run lint` (includes **@doneisbetter/gds-eslint-config** on `apps/web/src`)
- [ ] `npm run lint:gds` (`apps/web/gds-adoption.json` + **@doneisbetter/gds-compliance**, including theme governance fields)
- [ ] `npm run build`
- [ ] `npm test`
- [ ] `npm run validate-fixtures`
- [ ] `npm run validate-invalid-fixtures`

## Packaging / distribution

**Path C (registry):** preferred for users — see [install-macos.md](install-macos.md).

- [ ] `npm run publish:npm:dry-run` — inspect tarballs (only `dist/` shipped)
- [ ] `npm login` and `npm run publish:npm` per [npm-publish.md](npm-publish.md) (order preserved in script)
- [ ] `npm view @doneisbetter/cli version` matches release
- [ ] **Path C** smoke in [smoke-test-macos.md](smoke-test-macos.md): `npm install -g @doneisbetter/cli` → scan → artefacts

**Path B (source):** always valid fallback.

- [ ] From clean clone: **Path B** in [smoke-test-macos.md](smoke-test-macos.md)
- [ ] Confirm `impact --version` and scan outputs

*(Path A — standalone binary: [#38](https://github.com/sovereignsquad/impact/issues/38).)*

**Path D (DMG):** optional artifact for users who cannot use the registry — see [macos-distribution.md](macos-distribution.md).

- [ ] On **macOS:** `npm run build:dmg` (see [`packaging/macos/README.md`](../packaging/macos/README.md))
- [ ] Verify checksum `packaging/macos/out/*.sha256`; attach **`.dmg`** to the **GitHub Release** (not committed to git)
- [ ] **Path D** smoke: mount DMG → run `Impact.app/Contents/MacOS/impact scan --no-submit` → artefacts

## Git tag and GitHub

- [ ] `git tag -a vX.Y.Z -m "vX.Y.Z"`
- [ ] `git push origin vX.Y.Z`
- [ ] Create **GitHub Release** with notes (copy from CHANGELOG; link install + smoke-test docs)

## Post-release smoke

- [ ] On a **fresh macOS** environment (VM or clean user): run [smoke-test-macos.md](smoke-test-macos.md) against the **tag** or release archive
- [ ] Attach or paste evidence (commands + output paths) on the **GitHub Release** discussion and/or the **active distribution issue** ([#34](https://github.com/sovereignsquad/impact/issues/34) for Path C; Path B evidence historically on **#27** — use whichever issue tracks the release you are proving)

## Optional submission sanity (non-default)

- [ ] Only if testing ingest: `IMPACT_SUBMIT_URL` set, TTY consent path — not part of default smoke

---

**Evidence routing:** [ssot-map.md](ssot-map.md). Default today: **Path C** proof belongs on **#34** until closed; **Release** notes still link [smoke-test-macos.md](smoke-test-macos.md).
