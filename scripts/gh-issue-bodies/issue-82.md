## Objective

Add **GDS enforcement** so `@impact/web` cannot drift back to ad hoc CSS or legacy imports after Mantine migration.

## Unified context

GDS `GOVERNANCE_AND_ADOPTION.md` §4 — import boundaries, forbidden raw colors, pattern drift checks. Closes the tranche after **#81** deletion pass.

## Scope

- ESLint or custom script: flag raw `#` / `rgb(` in `apps/web/src/**/*.tsx` (allowlist theme files only)
- Optional: forbid new imports from `style.css` after deletion
- Wire into root `npm run verify:release` or dedicated `npm run lint:gds`
- Document commands in [gds-adapter.md](../../docs/gds-adapter.md)
- PR checklist snippet in CONTRIBUTING or `apps/web/README.md`

## Non-goals

- Linting CLI report HTML
- Enforcing Mantine in other workspaces

## Acceptance checks

- [ ] CI/local script fails on intentional raw-color violation in test fixture
- [ ] Adapter doc lists validation command
- [ ] CONTRIBUTING or web README references GDS PR checklist

## Dependencies

- **#81** — legacy CSS deletion (enforcement meaningful after migration)

## Delivery artifact

- Lint script + npm script + docs

## Board

**Backlog** — P2 · `area/platform` · tranche **G6**
