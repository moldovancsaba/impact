# GDS local adapter — IMPACT (`@impact/web`)

**Status:** **Active** — **100% GDS** for the public shell (packages + enforcement)  
**Migration plan:** [gds-migration-plan.md](gds-migration-plan.md)  
**Upstream SSOT:** [sovereignsquad/general-design-system](https://github.com/sovereignsquad/general-design-system) v**2.4.3** (pinned in [`gds.version`](../gds.version))

> [sovereignsquad/general-design-system](https://github.com/sovereignsquad/general-design-system) is the single source of truth for design, UI, and UX. This repo consumes **`@gds/theme`** and **`@gds/core`** directly; project-local code is limited to the thin **`ImpactShell`** adapter (nav + version footer).

## Packages (registry-ready; installed via `file:` until npm publish)

| Package | Role |
|---------|------|
| `@gds/theme` | `GdsProvider`, `gdsDarkPublicTheme` |
| `@gds/core` | `PublicShell`, `DocsPageShell`, `PageHeader`, `StateBlock`, `SimpleDataTable`, `PlaceholderPanel`, `UploadDropzone`, … |
| `@gds/eslint-config` | `no-raw-design-values`, `no-forbidden-ui-imports` on `apps/web/src` |
| `@gds/compliance` | Adoption manifest + forbidden import/color scan |

Built from upstream on **`npm ci`** via [`scripts/prepare-gds-deps.mjs`](../scripts/prepare-gds-deps.mjs) (clone → `apps/web/../../.gds-src`). Override with **`GDS_REPO_PATH`** for local GDS checkout. Skip with **`SKIP_GDS_PREPARE=1`** only when `node_modules/@gds/*` is already present.

## Runtime

| Item | Path / import |
|------|----------------|
| Root provider | `apps/web/src/providers/AppProviders.tsx` → `@gds/theme/client` `GdsProvider` |
| Theme | `@gds/theme/client` `gdsDarkPublicTheme` |
| Shell adapter | `apps/web/src/shell/impact-shell.tsx` → `@gds/core/client` `PublicShell` |
| Adoption manifest | `apps/web/gds-adoption.json` |
| Pages | `apps/web/src/pages/*.tsx` |

## Removed (no local pattern duplicates)

- `src/components/PublicShell.tsx`, `PageHeader.tsx`, `StateBlock.tsx`, `StatsTable.tsx`, `ArticleSection.tsx`, `SiteFooter.tsx`
- `src/theme/gds-theme-base.ts`, `impact-theme.ts` (vendored theme deleted)

## Validation

```bash
npm ci                    # preinstall prepares GDS 2.4.3
npm run lint              # includes @gds/eslint-config rules on apps/web/src
npm run lint:gds          # gds-compliance check + adoption manifest
npm run build -w @impact/web
npm run verify:release    # lint + lint:gds + build + tests
```

## Exceptions

None for the public web shell. CLI offline **`impact-report.html`** is out of scope for GDS.

## Board

Issues **#76–#82** — GDS migration tranche; shell is now package-backed.
