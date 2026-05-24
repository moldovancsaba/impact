# GDS local adapter — IMPACT (`@impact/web`)

**Status:** **Active** (GDS migration complete in repo — issues [#76](https://github.com/sovereignsquad/impact/issues/76)–[#82](https://github.com/sovereignsquad/impact/issues/82))  
**Migration plan:** [gds-migration-plan.md](gds-migration-plan.md)  
**Upstream SSOT:** [general-design-system](https://github.com/moldovancsaba/general-design-system) v**2.2.0**

> `/Users/Shared/Projects/GENERAL_DESIGN_SYSTEM` is the single source of truth for design, UI, and UX. Project-local files describe only implementation adapter details, migration state, validation commands, and approved exceptions.

## Runtime

| Item | Path |
|------|------|
| Root provider | `apps/web/src/providers/AppProviders.tsx` |
| Theme (GDS-aligned, vendored) | `apps/web/src/theme/gds-theme-base.ts`, `apps/web/src/theme/impact-theme.ts` |
| Modals / notifications | `@mantine/modals`, `@mantine/notifications` in `AppProviders` |
| Mount helper | `apps/web/src/mount.tsx` |

## Pattern contracts

| GDS family | Local path |
|------------|------------|
| Public shell | `apps/web/src/components/PublicShell.tsx` |
| Page header | `apps/web/src/components/PageHeader.tsx` |
| State block | `apps/web/src/components/StateBlock.tsx` |
| Responsive data view | `apps/web/src/components/StatsTable.tsx` |
| Article sections | `apps/web/src/components/ArticleSection.tsx` + page modules under `apps/web/src/pages/` |

## Pages (React + Mantine)

| Route | Entry | Page module |
|-------|-------|-------------|
| `/` | `src/entries/home.tsx` | `pages/HomePage.tsx` |
| `/install.html` | `src/entries/install.tsx` | `pages/InstallPage.tsx` |
| `/use.html` | `src/entries/use.tsx` | `pages/UsePage.tsx` |
| `/submit.html` | `src/entries/submit.tsx` | `pages/SubmitPage.tsx` |
| `/data.html` | `src/entries/data.tsx` | `pages/DataPage.tsx` |
| `/profile.html` | `src/entries/profile.tsx` | `pages/ProfilePage.tsx` |

Legacy **`src/style.css`** removed — Mantine is the only product UI authority for the public shell.

## Validation

```bash
npm run lint:gds          # raw hex/rgb guard on apps/web/src/**/*.tsx
npm run build -w @impact/web
npm run verify:release    # includes lint:gds + web build
```

## Exceptions

None for the public web shell. CLI offline **`impact-report.html`** is out of scope for GDS.

## Board

Issues **#76–#82** — close on deploy proof when production is rebuilt with this stack.
