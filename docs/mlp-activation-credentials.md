# MLP activation — credentials checklist

One-time setup so **`bash scripts/run-activation-delivery.sh`** can finish all five non-GDS deliverables.

## 1. npm — [#34](https://github.com/sovereignsquad/impact/issues/34)

**Local:**

```bash
npm login
npm run publish:npm
npm view @impact/cli version
# clean machine: npm install -g @impact/cli && impact scan --no-submit -o ./reports
```

**GitHub Actions:** Settings → Secrets → **`NPM_TOKEN`** (npm automation token with publish on `@impact`). Then Actions → **Publish npm packages** → Run workflow.

## 2. Fly.io ingest — [#58](https://github.com/sovereignsquad/impact/issues/58)

**Local:**

```bash
brew install flyctl   # if needed
flyctl auth login
bash scripts/deploy-ingest-fly-and-wire-vercel.sh
```

**GitHub Actions:** Settings → Secrets → **`FLY_API_TOKEN`** ([deploy token](https://fly.io/user/personal_access_tokens)). Actions → **Deploy ingest (Fly.io)** → Run workflow. Then:

```bash
bash scripts/vercel-wire-ingest-upstream.sh https://impact-mm-ingest.fly.dev
```

## 3. Seed + upstream — [#59](https://github.com/sovereignsquad/impact/issues/59)–[#61](https://github.com/sovereignsquad/impact/issues/61)

After ingest is up and Vercel shows **`stats_mode: upstream`**:

```bash
export IMPACT_SUBMIT_URL=https://impact-mm-ingest.fly.dev/
bash scripts/seed-ingest-submissions.sh 6
curl -sS https://impact.sovereignsquad.com/api/stats/full | head -c 500
```

## 4. Public proof — [#62](https://github.com/sovereignsquad/impact/issues/62)

Run [web-deploy-smoke.md](web-deploy-smoke.md) § **Live stats** on **https://impact.sovereignsquad.com/data.html**. Attach screenshots to **#62**.

## 5. Path C primary copy — [#44](https://github.com/sovereignsquad/impact/issues/44)

**Only after #34:**

```bash
node scripts/flip-path-c-primary-copy.mjs
npm run build -w @impact/web
vercel --prod --yes
```

## Orchestrator

```bash
bash scripts/run-activation-delivery.sh
```

Exits **0** when all steps succeed; **2** with a blocker list when credentials or hosted services are missing.
