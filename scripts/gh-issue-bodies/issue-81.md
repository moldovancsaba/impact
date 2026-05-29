## Objective

Migrate **homepage** to Mantine and **delete or narrow** legacy `style.css` — close the GDS migration tranche for `@doneisbetter/web`.

## Unified context

Homepage (**#57** four-pillar intent) ships today in static HTML. This issue **migrates** that content to Mantine components, then removes competing CSS authority. GDS Phase 6: **deletion** of old token system.

## Scope

- Migrate `index.html` hero, truth banner, CTA grid, FAQ to Mantine (preserve copy from current home)
- Remove unused rules from `src/style.css` or delete file if fully superseded
- Drop `site-nav.ts` if nav lives entirely in React shell
- Confirm all six public routes build and deploy
- Update [web.md](../../docs/web.md) — Mantine is now the UI foundation

## Non-goals

- Re-scoping homepage product story (content parity, not redesign)
- CLI offline report HTML

## Acceptance checks

- [ ] `/` renders under Mantine; four pillars reachable in ≤2 clicks ( **#57** acceptance preserved)
- [ ] `style.css` deleted OR reduced to documented narrow exceptions in adapter
- [ ] No raw hex colors in new feature TSX (theme tokens only)
- [ ] Full [web-deploy-smoke.md](../../docs/web-deploy-smoke.md) pass on production hostname

## Dependencies

- **#79**, **#80** — other pages migrated first (recommended)

## Delivery artifact

- Homepage React module; minimal or no legacy CSS

## Board

**Backlog** — P2 · `area/platform` · tranche **G5**
