#!/usr/bin/env bash
# Quick activation preflight (#34 npm, #58 hosted ingest). Exit 0 = informational only.
set -euo pipefail

WEB="${WEB_ORIGIN:-https://impact.sovereignsquad.com}"
echo "==> Web ${WEB}"
curl -fsS "${WEB}/api/health" | python3 -m json.tool || { echo "FAIL: /api/health"; exit 1; }

echo ""
echo "==> npm @doneisbetter/cli (Path C gate #34)"
if npm view @doneisbetter/cli version 2>/dev/null; then
  echo "    Published on npm."
else
  echo "    NOT on npm yet — #34 still open."
fi

echo ""
echo "==> Vercel IMPACT_INGEST_UPSTREAM (production)"
if command -v vercel >/dev/null 2>&1; then
  vercel env ls production -S narimato 2>/dev/null | rg -i 'IMPACT_INGEST_UPSTREAM' || echo "    Not set — stats use honest fallback on Vercel."
else
  echo "    vercel CLI not installed — check dashboard."
fi

echo ""
echo "==> Board focus (org project 4)"
echo "    In Progress expected: #1 #3 #34 #58 #65 — see apply-status.sh"
echo "    Runbook: docs/mlp-activation-path.md"
