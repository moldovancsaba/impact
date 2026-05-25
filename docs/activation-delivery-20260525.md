# Activation delivery — 2026-05-25

| Step | Target | Result |
|------|--------|--------|
| 1 #34 npm | publish | **blocked** |
| 2 #58 ingest | Fly | **blocked** |
| 3 upstream+seed | Vercel + ingest | see /api/health |
| 4 #62 /data.html | https://impact.sovereignsquad.com/data.html | checked |
| 5 #44 copy | Path C primary | see blocker list |

## Blockers
- #34 — run: npm login && npm run publish:npm
- #58 — add GitHub secret FLY_API_TOKEN and run workflow 'Deploy ingest (Fly.io)', or: flyctl auth login && bash scripts/deploy-ingest-fly-and-wire-vercel.sh
- #59–#60 — ingest not reachable; seed skipped
- #44 — skipped until @impact/cli is on npm (honest install gate)
