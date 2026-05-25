# Public web shell — deploy and smoke checklist

**Purpose:** operational QA after each deploy of [`apps/web`](../apps/web/) (Vite + **GDS** React build → `apps/web/dist/`). **SSOT for build/deploy:** [web.md](web.md), [gds-adapter.md](gds-adapter.md). **Product constraints:** [mlp-status-cto.md](mlp-status-cto.md#cto-acceptance-leadership-dashboard). **Activation sprint:** [issue #58](https://github.com/sovereignsquad/impact/issues/58) body + [ingest-server.md](ingest-server.md).

**When:** after merge to `main` (or before tagging a release that advertises the site).

---

## URLs to hit

Replace `ORIGIN` with production base — canonical **`https://impact.sovereignsquad.com`**, or any other hostname attached to the same Vercel deployment (e.g. legacy **`https://impact.messmass.com`**). Smoke each hostname you care about.

| Path | Check |
| ---- | ----- |
| `ORIGIN/` | Home: GDS layout, info **StateBlock** (**Path B** until **#34**), CTAs, no npm-as-primary lie |
| `ORIGIN/install.html` | Path B first; Path C explicitly gated on [#34](https://github.com/sovereignsquad/impact/issues/34) |
| `ORIGIN/use.html` | Scan flow, status vocabulary, links work |
| `ORIGIN/submit.html` | Optional submission, privacy, no silent upload implication |
| `ORIGIN/data.html` | **If build has no `VITE_STATS_API_BASE`:** placeholders honest; thresholds explained; **no fake counts**. **If live stats build:** tables or threshold copy match API; status line mentions live ingest (see § *Live stats* below). |
| `ORIGIN/profile.html` | Nav works; drop or pick a real `impact-profile.json` → parses and shows runtimes + suggestions |

---

## Navigation & UI (GDS)

- [ ] Header nav links reach all six surfaces (plus GitHub).
- [ ] Active state highlights current page (`PublicShell` / `ImpactShell`).
- [ ] Internal links use site-root paths (`/install.html`, …) suitable for static hosting.
- [ ] Dark public theme renders (no unstyled flash; Mantine CSS loaded).
- [ ] No obvious layout regression vs prior deploy (readable on mobile width).

---

## Copy / product truth

- [ ] **No** page implies **npm Path C** is live before **#34** is closed.
- [ ] **No** benchmark or “readiness score” claims beyond discovery scope.
- [ ] **Privacy** language explicit on submit + home FAQ.
- [ ] Historical data: **no** implied live aggregates unless the deploy was built with **`VITE_STATS_API_BASE`** and ingest is actually reachable.

---

## Live stats (when web was built with `VITE_STATS_API_BASE`)

Use only when production is wired to a **hosted** ingest (see [mlp-status-cto.md § Leadership view](mlp-status-cto.md#cto-acceptance-leadership-dashboard) steps 1–8).

Replace **`WEB_ORIGIN`** with the static site base (same as `ORIGIN` above). **`INGEST_ORIGIN`** is the host (no trailing slash) that serves ingest **health** and **`/api/stats/*`** — either the **same** host as the web app when `/api` is proxied to ingest, or a **dedicated** API host. Example same-origin: `INGEST_ORIGIN=https://impact.sovereignsquad.com` and stats at `WEB_ORIGIN/api/stats/full` (production build uses **`VITE_STATS_API_BASE=/api`** — see [web.md](web.md) § **`VITE_STATS_API_BASE`**).

### Ingest API (direct)

- [ ] `INGEST_ORIGIN/health` or `INGEST_ORIGIN/healthz` → **200** JSON ok (on **Vercel same-origin**, you may use **`WEB_ORIGIN/api/health`** for the bundled stats edge — see [ingest-server.md](ingest-server.md) § *Vercel stats routes*)  
- [ ] `INGEST_ORIGIN/api/stats/overview` → **200**; `schema_version` **`impact.stats.overview.v0.1`**  
- [ ] `INGEST_ORIGIN/api/stats/full` → **200**; `schema_version` **`impact.stats.v0.1`**; if `below_global_threshold`, dimension arrays empty (expected when volume low)  
- [ ] `GET` responses include CORS headers if the browser calls cross-origin (or same-origin if proxied)

### Web (`/data.html`)

- [ ] Page loads **without** console errors from fetch  
- [ ] Either aggregate **tables** visible (volume above thresholds) **or** explicit **below threshold** / empty-bucket copy — **not** silent failure  
- [ ] Footer shows **Web shell** version line ([current-state.md](current-state.md) § Versioning)

---

## Profile explorer

- [ ] Valid `impact-profile.json` (`impact.v0.3`) renders summary + runtimes table + suggested steps.
- [ ] Invalid JSON shows a clear error (no silent failure).

---

## Evidence (optional)

Paste checklist result + date into deploy notes, release PR, or a short comment on [#57](https://github.com/sovereignsquad/impact/issues/57) / Vercel deployment thread.

---

## After [#34](https://github.com/sovereignsquad/impact/issues/34) closes

Update **home** and **install** copy so **Path C** is **primary** and **Path B** is **fallback** — tracked under **[#44](https://github.com/sovereignsquad/impact/issues/44)**; re-run this smoke list for install-truth regression.
