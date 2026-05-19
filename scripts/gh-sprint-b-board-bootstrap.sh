#!/usr/bin/env bash
# One-off: create Sprint B issues #17–#28, add to org project 4, set Status. Historical — do not re-run.
# Requires: gh auth, jq. Run from repo root after merging issue bodies.
# Idempotent-ish: do not re-run if issues already exist (creates duplicates).
set -euo pipefail

REPO="sovereignsquad/impact"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
BD="$ROOT/scripts/gh-issue-bodies"
PROJECT_ID="PVT_kwHOACGtF84BTnzN"
STATUS_FIELD="PVTSSF_lAHOACGtF84BTnzNzhA1jZc"
DONE="98236657"
TODO="f75ad846"

if ! command -v jq &>/dev/null; then
  echo "jq is required" >&2
  exit 1
fi

add_to_project() {
  local url="$1"
  local status="$2"
  local json
  json=$(gh project item-add 2 --owner moldovancsaba --url "$url" --format json)
  local item_id
  item_id=$(echo "$json" | jq -r .id)
  gh project item-edit \
    --id "$item_id" \
    --project-id "$PROJECT_ID" \
    --field-id "$STATUS_FIELD" \
    --single-select-option-id "$status"
}

create_boarded() {
  local title="$1"
  local file="$2"
  local label="$3"
  local status="$4"
  local url
  url=$(gh issue create --repo "$REPO" --title "$title" --body-file "$BD/$file" --label "$label" --label "area/platform")
  add_to_project "$url" "$status"
  echo "$url"
}

echo "Creating Sprint B issues (P0/P1) and Sprint B.1 follow-ups…"

create_boarded "IMPACT P0: Separate operational state from discovery semantics in schema" issue-17.md P0 "$DONE"
create_boarded "IMPACT P0: Define deterministic confidence assignment rules" issue-18.md P0 "$DONE"
create_boarded "IMPACT P0: Add report rendering tests for degraded and partial states" issue-19.md P0 "$DONE"
create_boarded "IMPACT P0: Expand fixture scenario matrix and invalid-fixture rejection" issue-20.md P0 "$DONE"
create_boarded "IMPACT P0: Implement submission timeout, bounded retry, and local receipt" issue-21.md P0 "$DONE"
create_boarded "IMPACT P1: Add explicit submission payload preview artifact" issue-22.md P1 "$DONE"
create_boarded "IMPACT P1: macOS-first packaging and release path" issue-23.md P1 "$TODO"
create_boarded "IMPACT P1: Add support diagnostics block to report and CLI summary" issue-24.md P1 "$DONE"
create_boarded "IMPACT P1: Document support matrix and degraded platform behaviour" issue-25.md P1 "$DONE"
create_boarded "IMPACT P1: Add merge-path tests for multi-entity scan orchestration" issue-26.md P1 "$DONE"

create_boarded "IMPACT P1: Complete macOS-first packaging and release path" issue-27.md P1 "$TODO"
create_boarded "IMPACT P1: Implement explicit duplicate-submission handling for 409 responses" issue-28.md P1 "$DONE"

echo ""
echo "Done. Update apply-updates.sh / apply-status.sh with new issue numbers and project item IDs from:"
echo "  gh project item-list 2 --owner moldovancsaba --format json -L 50"
