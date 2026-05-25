# Scripts

Project automation lives here (e.g. [`publish-npm-packages.sh`](publish-npm-packages.sh), GitHub issue body helpers under [`gh-issue-bodies/`](gh-issue-bodies/)). **Authority map:** [docs/ssot-map.md](../docs/ssot-map.md). **Versioning:** [current-state.md](../docs/current-state.md) § Versioning. Quick local CLI run after build:

```bash
npm ci
npm run build
npm run impact -- scan --no-submit -o ./reports
```

**Ingest + real submit (no TTY):** after `npm run build`, run [`local-e2e-submit.sh`](local-e2e-submit.sh) — starts **`@impact/ingest`** on port **19887**, runs **`impact scan --yes-submit`** with **`IMPACT_SUBMIT_NON_INTERACTIVE=1`**, prints **`/api/stats/overview`**.

**Hosted ingest + Vercel upstream:** [`deploy-ingest-fly-and-wire-vercel.sh`](deploy-ingest-fly-and-wire-vercel.sh) (Fly deploy + **`IMPACT_INGEST_UPSTREAM`** + **`vercel --prod`**) when **`flyctl`** is authenticated; or GitHub Actions [`.github/workflows/deploy-ingest-fly.yml`](../.github/workflows/deploy-ingest-fly.yml) then [`vercel-wire-ingest-upstream.sh`](vercel-wire-ingest-upstream.sh) `https://<app>.fly.dev`. Config: root [`fly.ingest.toml`](../fly.ingest.toml).

**Activation delivery (five non-GDS steps):** [`run-activation-delivery.sh`](run-activation-delivery.sh) orchestrates **#34**, **#58**, upstream+seed, **#62** smoke, **#44** copy flip. Credentials: [docs/mlp-activation-credentials.md](../docs/mlp-activation-credentials.md). Seed only: [`seed-ingest-submissions.sh`](seed-ingest-submissions.sh). After npm publish: [`flip-path-c-primary-copy.mjs`](flip-path-c-primary-copy.mjs).
