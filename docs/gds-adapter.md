# GDS local adapter — IMPACT (`@doneisbetter/web`)

**Status:** **Active** — **100% GDS** for the public shell (packages + enforcement)  
**Migration plan:** [gds-migration-plan.md](gds-migration-plan.md)  
**Upstream SSOT:** [sovereignsquad/general-design-system](https://github.com/sovereignsquad/general-design-system) v**2.6.5** (pinned in [`gds.version`](../gds.version); tag **`gds-v2.6.5`**)

> [sovereignsquad/general-design-system](https://github.com/sovereignsquad/general-design-system) is the single source of truth for design, UI, and UX. This repo consumes **`@doneisbetter/gds-theme`** and **`@doneisbetter/gds-core`** directly; project-local code is limited to the thin **`ImpactShell`** adapter (nav + version footer).

## Packages (registry-ready; installed via `file:` until npm publish)

| Package | Role |
|---------|------|
| `@doneisbetter/gds-theme` | `GdsProvider`, `gdsDarkPublicTheme` |
| `@doneisbetter/gds-core` | `PublicShell`, `DocsPageShell`, `PageHeader`, `StateBlock`, `SimpleDataTable`, `PlaceholderPanel`, `UploadDropzone`, … |
| `@doneisbetter/gds-eslint-config` | `no-raw-design-values`, `no-forbidden-ui-imports` on `apps/web/src` |
| `@doneisbetter/gds-compliance` | Adoption manifest + theme governance + forbidden import/color scan |

Built from upstream on **`npm ci`** via [`scripts/prepare-gds-deps.mjs`](../scripts/prepare-gds-deps.mjs) (clone → `apps/web/../../.gds-src`). Override with **`GDS_REPO_PATH`** for local GDS checkout. Skip with **`SKIP_GDS_PREPARE=1`** only when `node_modules/@doneisbetter/gds-*` is already present.

## Runtime

| Item | Path / import |
|------|----------------|
| Root provider | `apps/web/src/providers/AppProviders.tsx` → `@doneisbetter/gds-theme/client` `GdsProvider` |
| Theme | `@doneisbetter/gds-theme/client` **`gdsDarkPublicTheme`** (approved lane; no local `extendGdsTheme` / `createTheme` branding layer) |
| Shell adapter | `apps/web/src/shell/impact-shell.tsx` → `@doneisbetter/gds-core/client` `PublicShell` |
| Theme governance | `apps/web/gds-adoption.json` → `compliance.approvedThemeLanes`, `compliance.themeOwnershipPaths` |
| Adoption manifest | `apps/web/gds-adoption.json` |
| Pages | `apps/web/src/pages/*.tsx` |

## Removed (no local pattern duplicates)

- `src/components/PublicShell.tsx`, `PageHeader.tsx`, `StateBlock.tsx`, `StatsTable.tsx`, `ArticleSection.tsx`, `SiteFooter.tsx`
- `src/theme/gds-theme-base.ts`, `impact-theme.ts` (vendored theme deleted)

## Validation

```bash
npm ci                    # preinstall prepares GDS 2.6.5 (tag gds-v2.6.5)
npm run lint              # includes @doneisbetter/gds-eslint-config rules on apps/web/src
npm run lint:gds          # gds-compliance check + adoption manifest
npm run build -w @doneisbetter/web
npm run verify:release    # lint + lint:gds + build + tests
```

## Exceptions

None for the public web shell. CLI offline **`impact-report.html`** is out of scope for GDS.

## Board

Issues **#76–#82** — GDS migration tranche; shell is now package-backed.
