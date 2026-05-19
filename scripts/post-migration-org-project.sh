#!/usr/bin/env bash
# Post-cutover ops: archive personal Project #2, configure org project 4, link repo.
# Safe to re-run. Requires: gh auth with project scope.
set -euo pipefail

ORG_PROJECT=4
ORG=sovereignsquad
REPO=sovereignsquad/impact
ARCHIVE_OWNER=moldovancsaba
ARCHIVE_PROJECT=2
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

echo "==> Archive personal Project #${ARCHIVE_PROJECT} (description only — do not edit Status there)"
if gh project edit "$ARCHIVE_PROJECT" --owner "$ARCHIVE_OWNER" \
  --title "ARCHIVED — Impact (use sovereignsquad project 4)" \
  --description "Workflow SSOT moved to https://github.com/orgs/sovereignsquad/projects/4 — do not update Status on this board." 2>/dev/null; then
  echo "    Personal project #${ARCHIVE_PROJECT} marked archived."
else
  echo "    Skip: personal project #${ARCHIVE_PROJECT} not found or no access (archive manually in UI if it still exists)."
fi

echo "==> Org project #${ORG_PROJECT} README"
gh project edit "$ORG_PROJECT" --owner "$ORG" --readme "$ROOT/scripts/org-project-readme.md"

echo "==> Link ${REPO} to org project"
gh project link "$ORG_PROJECT" --owner "$ORG" --repo "$REPO" 2>/dev/null || echo "(already linked or link failed — check UI)"

echo "==> Ensure all repo issues are on org project"
bash "$ROOT/scripts/gh-ensure-issues-on-project.sh"

echo "==> Reapply Status columns from apply-status.sh"
bash "$ROOT/scripts/gh-issue-bodies/apply-status.sh"

echo ""
echo "Manual (GitHub UI): on https://github.com/orgs/sovereignsquad/projects/4"
echo "  - New view: Programme (Not Done)  filter: -status:Done -status:\"Declined (NEVER)\""
echo "  - New view: Execution           filter: status:\"Todo (NEXT)\",status:\"In Progress (NOW)\",status:\"Review (ALMOST)\""
echo ""
echo "Next: activation runbook docs/mlp-activation-path.md (#34 npm, #58 ingest upstream)"
