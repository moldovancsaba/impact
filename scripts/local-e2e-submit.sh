#!/usr/bin/env bash
# Local end-to-end: start ingest on a free port, run a real `impact scan` + POST, print stats overview.
# Requires: repo built (`npm run build`), macOS/Linux, curl.
set -euo pipefail
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

PORT="${PORT:-19887}"
WORKDIR="${TMPDIR:-/tmp}/impact-e2e-$$"
mkdir -p "$WORKDIR"
cleanup() {
  if [[ -n "${INGEST_PID:-}" ]] && kill -0 "$INGEST_PID" 2>/dev/null; then
    kill "$INGEST_PID" 2>/dev/null || true
    wait "$INGEST_PID" 2>/dev/null || true
  fi
}
trap cleanup EXIT

export IMPACT_INGEST_DB_PATH="$WORKDIR/ingest.db"
export PORT
export HOST=127.0.0.1

npm run start -w @doneisbetter/ingest &
INGEST_PID=$!

for _ in $(seq 1 50); do
  if curl -sfS "http://127.0.0.1:${PORT}/health" >/dev/null 2>&1; then
    break
  fi
  sleep 0.15
done

if ! curl -sfS "http://127.0.0.1:${PORT}/health" >/dev/null 2>&1; then
  echo "ingest failed to listen on ${PORT}" >&2
  exit 1
fi

export IMPACT_SUBMIT_URL="http://127.0.0.1:${PORT}/"
export IMPACT_SUBMIT_NON_INTERACTIVE=1
REPORT_DIR="$WORKDIR/reports"
mkdir -p "$REPORT_DIR"

npm run impact -- scan --yes-submit -o "$REPORT_DIR"

echo ""
echo "--- GET /api/stats/overview ---"
curl -sS "http://127.0.0.1:${PORT}/api/stats/overview"
echo ""
echo ""
echo "Reports: $REPORT_DIR"
echo "SQLite:  $IMPACT_INGEST_DB_PATH"
