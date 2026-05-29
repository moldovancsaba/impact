# MLP activation — credentials checklist

One-time setup so **`bash scripts/run-activation-delivery.sh`** can finish all five non-GDS deliverables.

## 1. npm — [#34](https://github.com/sovereignsquad/impact/issues/34)

**Local:**

```bash
npm login
npm run publish:npm
npm view @doneisbetter/cli version
# clean machine: npm install -g @doneisbetter/cli && impact scan --no-submit -o ./reports
```

**GitHub Actions:** Settings → Secrets → **`NPM_TOKEN`** (npm automation token with publish on `@doneisbetter`). Then Actions → **Publish npm packages** → Run workflow.

## 2. Vercel + MongoDB Atlas ingest — [#58](https://github.com/sovereignsquad/impact/issues/58)

Set these **Vercel Project Environment Variables** (Preview + Production):

```bash
MONGODB_URI=<mongodb+srv://...>
MONGODB_DB=impact
MONGODB_COLLECTION_SUBMISSIONS=submissions   # optional; default: submissions
IMPACT_STATS_MIN_BUCKET_COUNT=5
IMPACT_STATS_CORS_ORIGIN=*
```

After deploy, verify Vercel API routes directly:

```bash
curl -sS https://impact.sovereignsquad.com/api/health
curl -sS https://impact.sovereignsquad.com/api/stats/overview
```

## 3. Seed + stats verify — [#59](https://github.com/sovereignsquad/impact/issues/59)–[#61](https://github.com/sovereignsquad/impact/issues/61)

After Vercel shows **`stats_mode: mongodb`**:

```bash
export IMPACT_SUBMIT_URL=https://impact.sovereignsquad.com/api/ingest
bash scripts/seed-ingest-submissions.sh 6
curl -sS https://impact.sovereignsquad.com/api/stats/full | head -c 500
```

## 4. Public proof — [#62](https://github.com/sovereignsquad/impact/issues/62)

Run [web-deploy-smoke.md](web-deploy-smoke.md) § **Live stats** on **https://impact.sovereignsquad.com/data.html**. Attach screenshots to **#62**.

## 5. Path C primary copy — [#44](https://github.com/sovereignsquad/impact/issues/44)

**Only after #34:**

```bash
node scripts/flip-path-c-primary-copy.mjs
npm run build -w @doneisbetter/web
vercel --prod --yes
```

## Orchestrator

```bash
bash scripts/run-activation-delivery.sh
```

Exits **0** when all steps succeed; **2** with a blocker list when credentials or hosted services are missing.
