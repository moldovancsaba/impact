# IMPACT documentation

**New here?** Read the repo **[README.md](../README.md)** first — what IMPACT is, quick start, privacy, and scope.

**Versions confused?** See **[current-state.md § Versioning](current-state.md#versioning-ssot)** — Git tag, npm, profile `schema_version`, CLI, and **public web** are listed in one table. Bump them together on release.

**Docs disagree?** **[ssot-map.md](ssot-map.md)** says which source wins (org project 4 Status, issue bodies, this file, code).

---

## Choose a path

| I want to… | Start here |
| ---------- | ---------- |
| **Install and run the scanner** | [install-macos.md](install-macos.md) — Path B (source), Path C (npm when live), Path D (DMG) |
| **Understand privacy and consent** | [privacy-for-users.md](privacy-for-users.md) (plain language) → [privacy-policy.md](privacy-policy.md) (formal) |
| **Use or deploy the public website** | [web.md](web.md) — GDS React shell, build, **`VITE_STATS_API_BASE`**, Vercel · [gds-adapter.md](gds-adapter.md) · [web-deploy-smoke.md](web-deploy-smoke.md) after deploy |
| **Run optional HTTP submission / ingest** | [submission-contract.md](submission-contract.md) · [ingest-server.md](ingest-server.md) — POST ingest + **`GET /api/stats/*`** · **Activation credentials:** [mlp-activation-credentials.md](mlp-activation-credentials.md) |
| **See what is actually shipped** | [current-state.md](current-state.md) · [user-expectations-mvp.md](user-expectations-mvp.md) |
| **Contribute or follow the programme** | [project-management.md](project-management.md) · [product.md](product.md) · [mlp.md](mlp.md) |
| **Planned org + GitHub Project migration** | [mlp-cto-directive-org-migration-sovereignsquad.md](mlp-cto-directive-org-migration-sovereignsquad.md) |

---

## For users (product & trust)

| Document | What it is |
| -------- | ---------- |
| [install-macos.md](install-macos.md) | Install paths, outputs, troubleshooting |
| [macos-distribution.md](macos-distribution.md) | macOS packaging (npm vs app/DMG), signing context |
| [privacy-for-users.md](privacy-for-users.md) | What is collected, what is not, consent |
| [privacy-policy.md](privacy-policy.md) | Privacy policy |
| [support-matrix.md](support-matrix.md) | macOS / Linux / Windows expectations |
| [current-state.md](current-state.md) | Operational snapshot + **version SSOT** |
| [user-expectations-mvp.md](user-expectations-mvp.md) | Honest MVP scope |

---

## Programme & delivery

| Document | What it is |
| -------- | ---------- |
| [ssot-map.md](ssot-map.md) | Authority routing |
| [mlp.md](mlp.md) | MLP phases M1–M6 |
| [mlp-status-cto.md](mlp-status-cto.md) | CTO assessment — [leadership acceptance / eight-step ops](mlp-status-cto.md#cto-acceptance-leadership-dashboard); **repo-complete ≠ product-live** |
| [mlp-execution.md](mlp-execution.md) | Execution order |
| [mlp-next-delivery-tranche.md](mlp-next-delivery-tranche.md) | Dashboard **#58–#62** (code + [board closure](mlp-next-delivery-tranche.md#board-closure-dashboard)), macOS **#63–#66** |
| [mlp-activation-path.md](mlp-activation-path.md) | **MLP activation** — npm **#34**, hosted ingest, Vercel **`IMPACT_INGEST_UPSTREAM`**, seeding, `/data.html` proof, **#58–#62** closure order, report-back format |
| [mlp-cto-next-execution.md](mlp-cto-next-execution.md) | **CTO execution memo** — proof-first report-back, org project **Status** rules, low WIP, issue body quality, cleanup waves, **`scripts/gh-issue-bodies/`** sync order |
| [activation-execution-status.md](activation-execution-status.md) | **Activation log** — latest npm/Docker/Vercel/blocker evidence for **#34** / **#58–#62** |
| [product.md](product.md) | Product definition |
| [project-management.md](project-management.md) | Board workflow |
| [submission-contract.md](submission-contract.md) | Submission HTTP contract |
| [ingest-server.md](ingest-server.md) | Ingest + stats API |

---

## Builders & maintainers

| Document | What it is |
| -------- | ---------- |
| [architecture.md](architecture.md) | Layout and data flow |
| [architect-handoff.md](architect-handoff.md) | Architect onboarding |
| [release-checklist.md](release-checklist.md) | Release steps |
| [gds-adapter.md](gds-adapter.md) | **GDS** consumer contract for `@doneisbetter/web` |
| [gds-migration-plan.md](gds-migration-plan.md) | GDS migration history (complete) |
| [npm-publish.md](npm-publish.md) | Publish `@doneisbetter/*` |
| [smoke-test-macos.md](smoke-test-macos.md) | Fresh-mac QA |
| [docs-alignment-after-packaging.md](docs-alignment-after-packaging.md) | Post-packaging doc reconciliation |

---

## Reference

| Document | What it is |
| -------- | ---------- |
| [schema-semantics-v0.3.md](schema-semantics-v0.3.md) | `status` vs `presence` vs provenance |
| [confidence-rules.md](confidence-rules.md) | Confidence rules |

---

## Assets

| Path | Purpose |
| ---- | ------- |
| [assets/impact-report-sample.png](assets/impact-report-sample.png) | README sample screenshot |
| [assets/impact-profile-redacted.excerpt.json](assets/impact-profile-redacted.excerpt.json) | Redacted JSON excerpt |

Regenerate the screenshot (repo root, after `npm run build`):

```bash
npm run impact -- scan --no-submit -o /tmp/impact-shot
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --headless --disable-gpu --window-size=1200,900 \
  --screenshot=docs/assets/impact-report-sample.png \
  "file:///tmp/impact-shot/impact-report.html"
```

Adjust the Chrome path on non-macOS hosts.
