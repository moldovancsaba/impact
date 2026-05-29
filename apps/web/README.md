# `@doneisbetter/web` — public marketing shell

**Vite** multi-page site (`index.html`, `install.html`, `use.html`, `submit.html`, `data.html`, `profile.html`): install truth, run/submit explainers, community data (placeholders unless built with a stats API base), and **in-browser** `impact-profile.json` validation via `@doneisbetter/schemas` + `buildRecommendations` (no upload).

**UI:** **100% GDS** — `@gds/theme` (`GdsProvider`, `gdsDarkPublicTheme`) + `@gds/core` pattern contracts. Only local adapter: **`ImpactShell`** (nav + build footer). Each route: **`src/entries/*.tsx`** → **`src/pages/*.tsx`**. See [docs/gds-adapter.md](../../docs/gds-adapter.md).

**Versioning:** `package.json` **version** must match the monorepo release. **`vite.config.ts`** injects **`__IMPACT_WEB_VERSION__`** and **`__IMPACT_PROFILE_SCHEMA_VERSION__`**.

### Community data (`data.html`)

Set **`VITE_STATS_API_BASE`** at **build** time so `/data.html` fetches live stats JSON via `@gds/core` `SimpleDataTable` when privacy thresholds allow.

## Develop

```bash
npm ci
npm run dev -w @doneisbetter/web
```

## Build

```bash
npm run build -w @doneisbetter/web
```

**Vercel:** root [`vercel.json`](../../vercel.json) → `apps/web/dist`.

## Layout

| `src/` | Purpose |
| ------ | ------- |
| `providers/AppProviders.tsx` | `@gds/theme` root |
| `shell/impact-shell.tsx` | IMPACT nav/footer on `PublicShell` |
| `pages/*.tsx` | Route content (`DocsPageShell`, `StateBlock`, …) |
| `entries/*.tsx` | `mount.tsx` per HTML entry |
| `gds-adoption.json` | Compliance manifest |
