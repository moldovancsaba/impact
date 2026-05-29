# `@doneisbetter/cli`

**I.M.P.A.C.T.** command-line scanner — local AI environment inventory, JSON + HTML reports, optional consent-based submission.

## Install

```bash
npm install -g @doneisbetter/cli
impact --version
impact scan --no-submit -o ./reports
```

If the package is not yet on the registry, build from source: [install-macos.md](../../docs/install-macos.md).

## Optional submission (local ingest / CI)

Interactive default: set **`IMPACT_SUBMIT_URL`**, run **`impact scan`** (no `--no-submit`), answer prompts, optionally type **`SUBMIT`**. With **`--yes-submit`**, the final **`SUBMIT`** token is skipped after you accept the first prompt.

**Non-interactive** (automation only — triple opt-in: endpoint env, **`IMPACT_SUBMIT_NON_INTERACTIVE=1`**, **`--yes-submit`**):

```bash
export IMPACT_SUBMIT_URL=http://127.0.0.1:8787/
export IMPACT_SUBMIT_NON_INTERACTIVE=1
impact scan --yes-submit -o ./reports
```

Without a TTY, submission is skipped unless all of the above are set. See also [`scripts/local-e2e-submit.sh`](../../scripts/local-e2e-submit.sh).

## Docs

- Repository: [github.com/sovereignsquad/impact](https://github.com/sovereignsquad/impact)
- License: MIT
