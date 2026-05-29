# Publishing `@doneisbetter/cli` to npm

**Audience:** maintainers executing [#34](https://github.com/sovereignsquad/impact/issues/34).

**Version SSOT:** before publishing, confirm tag, npm semver, `schema_version`, and CLI version match [current-state.md](current-state.md) — **§ Versioning (SSOT)**. **Broader authority map:** [ssot-map.md](ssot-map.md).

## Prerequisites

1. **npm account** in org **[doneisbetter](https://www.npmjs.com/org/doneisbetter)** with permission to publish the **`@doneisbetter`** scope (packages are `@doneisbetter/*`, not `@doneisbetter/*`).
2. **Auth** (pick one):
   - **Token (recommended for CI and automation):** create an npm **Granular** or **Classic** token with **publish** on `@doneisbetter/*`, then on this machine only:
     ```bash
     export NPM_TOKEN='npm_…'   # do not commit; do not paste in chat logs
     bash scripts/npm-auth-token.sh
     ```
   - **Interactive:** `npm login` (browser)
3. **Verify:** `npm whoami`

If `npm publish` fails with **`ENEEDAUTH` / need auth**, configure auth above and retry `npm run publish:npm`.

**GitHub Actions:** add repository secret **`NPM_TOKEN`** and run workflow **Publish npm packages** (see [mlp-activation-credentials.md](mlp-activation-credentials.md)).

## What gets published

Ten workspace packages (same **0.3.0** semver), in order:

`@doneisbetter/schemas` → `@doneisbetter/privacy` → scanners → `@doneisbetter/core` → `@doneisbetter/reporting` → `@doneisbetter/submission` → `@doneisbetter/cli`

Each tarball includes only **`dist/`** (see `files` in each `package.json`).

## Commands

From repository root, after merging to `main` and bumping versions if needed:

```bash
npm ci
npm run verify:release
npm run publish:npm:dry-run   # sanity — inspect each package contents
npm run publish:npm           # real publish (no dry-run)
```

Script: [`scripts/publish-npm-packages.sh`](../scripts/publish-npm-packages.sh).

## After publish

1. Confirm: `npm view @doneisbetter/cli version`
2. Run the **registry** section in [smoke-test-macos.md](smoke-test-macos.md) on a clean machine (or clean global prefix).
3. Update [CHANGELOG.md](../CHANGELOG.md) if you cut a new version.
4. GitHub **Release** notes may link to `https://www.npmjs.com/package/@doneisbetter/cli`.

## Version bumps

Internal `@doneisbetter/*` dependencies are pinned to the **same** version as the workspace (e.g. `0.3.0`). For **0.3.1**, bump **all** `package.json` versions and internal `dependencies` in one commit, then publish in order again.
