## Objective

Migrate **article / docs-style pages** to GDS **Article shell**: `install.html`, `use.html`, `submit.html` — Mantine typography, honest copy preserved.

## Unified context

These pages explain Path B install, scan flow, and optional submission. GDS **Article / docs shell** contract: readable width, metadata, mobile collapse. **Do not** weaken **#34** gate or submission honesty.

## Scope

- Migrate `/install.html`, `/use.html`, `/submit.html` bodies into React pages (or hybrid Vite entries) using `PublicShell` + article layout
- Replace custom `.btn`, `.flow-steps`, `.checklist` with Mantine `Button`, `List`, `Text`, `Code`
- Preserve all trust copy: Path B primary, npm gated on **#34**, submission optional
- `npm run verify:release` + [web-deploy-smoke.md](../../docs/web-deploy-smoke.md) for these routes

## Non-goals

- `data.html` / `profile.html` (**#80**)
- Homepage hero (**#81**)
- npm publish (**#34**)

## Acceptance checks

- [ ] Three pages render under Mantine with no regression in honest messaging
- [ ] Install page still states Path B truth; no fake npm/DMG CTAs
- [ ] Smoke checklist passes for `/install.html`, `/use.html`, `/submit.html`

## Dependencies

- **#78** — public shell

## Delivery artifact

- React page modules + removed duplicate static markup for these three routes

## Board

**Backlog** — P2 · `area/platform` · tranche **G3**
