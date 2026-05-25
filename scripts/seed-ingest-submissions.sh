#!/usr/bin/env bash
# POST N distinct fixture profiles to a running ingest (default: IMPACT_SUBMIT_URL or arg).
# Usage:
#   export IMPACT_SUBMIT_URL=https://impact-mm-ingest.fly.dev/
#   bash scripts/seed-ingest-submissions.sh 6
#
set -euo pipefail
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
COUNT="${1:-6}"
ORIGIN=""

if [[ -n "${IMPACT_SUBMIT_URL:-}" ]]; then
  ORIGIN="${IMPACT_SUBMIT_URL%/}/"
  if [[ "${1:-}" =~ ^[0-9]+$ ]]; then
    COUNT="${1}"
  fi
elif [[ "${1:-}" == https://* ]]; then
  ORIGIN="${1%/}/"
  COUNT="${2:-6}"
else
  echo "usage: IMPACT_SUBMIT_URL=https://host/ $0 [count]" >&2
  echo "   or: $0 https://host/ [count]" >&2
  exit 1
fi

FIXTURES=(
  "$ROOT/fixtures/baseline-profile.sample.json"
  "$ROOT/fixtures/scenarios/ollama-reachable-with-models.json"
  "$ROOT/fixtures/scenarios/mixed-runtime-states.json"
  "$ROOT/fixtures/scenarios/linux-partial-support.json"
  "$ROOT/fixtures/scenarios/host-partial-provenance.json"
  "$ROOT/fixtures/scenarios/tool-detected-version-unknown.json"
  "$ROOT/fixtures/scenarios/no-runtimes.json"
  "$ROOT/fixtures/scenarios/windows-experimental-unknowns.json"
)

echo "==> Seeding ${COUNT} submissions to ${ORIGIN}"
accepted=0
for i in $(seq 1 "$COUNT"); do
  f="${FIXTURES[$(( (i - 1) % ${#FIXTURES[@]} ))]}"
  body="$(node -e "
    const fs = require('fs');
    const crypto = require('crypto');
    const p = JSON.parse(fs.readFileSync(process.argv[1], 'utf8'));
    p.run_id = crypto.randomUUID();
    p.created_at = new Date().toISOString();
    console.log(JSON.stringify(p));
  " "$f")"
  code="$(curl -sS -o /tmp/impact-seed-resp.json -w '%{http_code}' \
    -X POST "${ORIGIN}" \
    -H 'Content-Type: application/json' \
    -d "$body")"
  if [[ "$code" == "200" || "$code" == "201" || "$code" == "409" ]]; then
    accepted=$((accepted + 1))
    echo "  [$i/$COUNT] $code $(basename "$f") run_id=$(node -p "JSON.parse(require('fs').readFileSync('/tmp/impact-seed-resp.json','utf8')).submission_id || 'dup'")"
  else
    echo "  [$i/$COUNT] FAIL HTTP $code $(cat /tmp/impact-seed-resp.json)" >&2
    exit 1
  fi
done

echo ""
echo "==> GET ${ORIGIN}api/stats/overview"
curl -sS "${ORIGIN}api/stats/overview" | node -e "const j=JSON.parse(require('fs').readFileSync(0,'utf8')); console.log(JSON.stringify({submission_count:j.submission_count,below_global_threshold:j.below_global_threshold},null,2));"
echo ""
echo "Accepted or duplicate: ${accepted}/${COUNT}"
