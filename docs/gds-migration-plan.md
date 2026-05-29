# GDS migration plan — `@doneisbetter/web`

**Status:** **Complete** (2026-05-27) — **`@doneisbetter/gds-theme` + `@doneisbetter/gds-core` v2.6.5**; enforcement via **`@doneisbetter/gds-eslint-config`** + **`@doneisbetter/gds-compliance`** (theme governance).  
**SSOT (design):** [sovereignsquad/general-design-system](https://github.com/sovereignsquad/general-design-system) v**2.4.3** (pinned in [`gds.version`](../gds.version))  
**Local adapter:** [gds-adapter.md](gds-adapter.md) — only **`ImpactShell`** remains (nav + version footer).

## Outcome

| Before | After |
|--------|--------|
| ~550 lines custom `style.css` + duplicated HTML shell | React MPA + Mantine via GDS packages |
| Local `PublicShell`, `PageHeader`, `StateBlock`, … | `@gds/core` contracts |
| Vendored `gds-theme-base.ts` | `@gds/theme` `GdsProvider` + `gdsDarkPublicTheme` |

Legacy **`style.css`** and local pattern components are **removed**. CLI offline **`impact-report.html`** stays out of scope.

## Install / CI

`npm ci` runs **`preinstall`** → [`scripts/prepare-gds-deps.mjs`](../scripts/prepare-gds-deps.mjs) (clone/build `.gds-src`). Override: **`GDS_REPO_PATH`**. Skip: **`SKIP_GDS_PREPARE=1`**.

## Phases (issues #76–#82)

All phases **Done** in repo. Board closure: deploy smoke on production after each release that touches `@doneisbetter/web`.

| Phase | Issue | Delivered |
|-------|-------|-----------|
| G0 | [#76](https://github.com/sovereignsquad/impact/issues/76) | Adapter doc, adoption manifest |
| G1 | [#77](https://github.com/sovereignsquad/impact/issues/77) | `@gds/theme` root runtime |
| G2 | [#78](https://github.com/sovereignsquad/impact/issues/78) | `PublicShell` via `ImpactShell` |
| G3 | [#79](https://github.com/sovereignsquad/impact/issues/79) | `DocsPageShell` on install/use/submit |
| G4 | [#80](https://github.com/sovereignsquad/impact/issues/80) | `data` + `profile` (`SimpleDataTable`, `UploadDropzone`, …) |
| G5 | [#81](https://github.com/sovereignsquad/impact/issues/81) | Homepage + CSS deletion |
| G6 | [#82](https://github.com/sovereignsquad/impact/issues/82) | `lint:gds` + ESLint GDS rules |

## Related docs

- [web.md](web.md) — build, deploy, stats API  
- [gds-adapter.md](gds-adapter.md) — consumer contract  
- [web-deploy-smoke.md](web-deploy-smoke.md) — post-deploy QA  
