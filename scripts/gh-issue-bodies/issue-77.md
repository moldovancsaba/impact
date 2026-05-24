## Objective

Add **Mantine root runtime** to `@impact/web`: React + Vite, **`gds-theme`**, central modals/notifications — one smoke route proves **Vercel deploy** still works.

## Unified context

GDS Phase 1 per [gds-migration-plan.md](../../docs/gds-migration-plan.md). Replaces the static-only foundation with the **only approved** product UI platform. First PR shape per GDS: root provider + theme + **one** migrated surface (smoke page or minimal `/` wrapper).

## Scope

- Add React to `apps/web` (Vite React plugin or `@vitejs/plugin-react`)
- Dependencies: `@mantine/core`, `@mantine/hooks`, `@mantine/notifications`, `@mantine/modals` (versions aligned with GDS playground)
- Consume **`gds-theme`** from general-design-system (`packages/gds-theme`) via workspace path, git submodule, or published package — document choice in adapter
- Root composition: `MantineProvider`, `ModalsProvider`, notifications
- One **smoke entry** (e.g. `/gds-smoke.html` or partial `/` wrapper) rendering Mantine `Button` + `Text`
- Update [apps/web/README.md](../../apps/web/README.md) with dev/build notes
- `npm run verify:release` green

## Non-goals

- Full page migrations (**#78–#81**)
- Deleting `style.css` yet
- Changing stats API or ingest wiring

## Acceptance checks

- [ ] `npm run build -w @impact/web` succeeds
- [ ] Smoke route renders under Mantine theme (Inter / GDS defaults)
- [ ] Vercel production build path unchanged (`apps/web/dist`)
- [ ] Adapter doc lists exact provider + theme module paths

## Dependencies

- **#76** — governance + freeze complete

## Constraints

- Do **not** expand WIP if **#58** activation is staffed single-threaded — coordinate with maintainers

## Delivery artifact

- `apps/web/src/providers/` (or equivalent), theme import, updated `package.json`

## Board

**Backlog** — P2 · `area/platform` · tranche **G1**
