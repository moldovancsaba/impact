#!/usr/bin/env bash
# Apply retitled issues + SSOT bodies + labels. Run from repo root.
# Requires: gh auth, write access to sovereignsquad/impact
set -euo pipefail
REPO="sovereignsquad/impact"
ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
BD="$ROOT/scripts/gh-issue-bodies"

edit() {
  local num="$1" title="$2" file="$3"
  gh issue edit "$num" --repo "$REPO" --title "$title" --body-file "$file"
}

edit 1 "IMPACT P0: Product doctrine — Industrial Multi-Platform Agent Connector Test" "$BD/issue-01.md"
edit 2 "IMPACT P0: CI/CD, lint, and release hygiene" "$BD/issue-02.md"
edit 3 "IMPACT P1: Architecture and operations SSOT in-repo" "$BD/issue-03.md"
edit 4 "IMPACT P1: Contributor Covenant code of conduct" "$BD/issue-04.md"
edit 5 "IMPACT P1: Discussions and private vulnerability reporting" "$BD/issue-05.md"
edit 6 "IMPACT P0: Monorepo foundation and schema-first delivery" "$BD/issue-06.md"
edit 7 "IMPACT P0: Host scanner — coarse machine and OS signals" "$BD/issue-07.md"
edit 8 "IMPACT P0: Runtime scanner — Ollama, MLX, and adapters" "$BD/issue-08.md"
edit 9 "IMPACT P1: AI tool allowlist scanner (PATH and versions)" "$BD/issue-09.md"
edit 10 "IMPACT P0: Model inventory across supported runtimes" "$BD/issue-10.md"
edit 11 "IMPACT P0: Privacy pipeline — salt, denylist, consent, submission gate" "$BD/issue-11.md"
edit 12 "IMPACT P0: JSON and offline HTML reporting" "$BD/issue-12.md"
edit 13 "IMPACT P1: Anonymous submission client and server contract" "$BD/issue-13.md"
edit 14 "IMPACT P1: Readiness hints without benchmark claims" "$BD/issue-14.md"
edit 15 "IMPACT P0: Automated tests, fixtures, and failure isolation" "$BD/issue-15.md"
edit 16 "IMPACT P0: Programme phases 0–4 — discovery through capability benchmarks" "$BD/issue-16.md"

edit 17 "IMPACT P0: Separate operational state from discovery semantics in schema" "$BD/issue-17.md"
edit 18 "IMPACT P0: Define deterministic confidence assignment rules" "$BD/issue-18.md"
edit 19 "IMPACT P0: Add report rendering tests for degraded and partial states" "$BD/issue-19.md"
edit 20 "IMPACT P0: Expand fixture scenario matrix and invalid-fixture rejection" "$BD/issue-20.md"
edit 21 "IMPACT P0: Implement submission timeout, bounded retry, and local receipt" "$BD/issue-21.md"
edit 22 "IMPACT P1: Add explicit submission payload preview artifact" "$BD/issue-22.md"
edit 23 "IMPACT P1: macOS-first packaging and release path" "$BD/issue-23.md"
edit 24 "IMPACT P1: Add support diagnostics block to report and CLI summary" "$BD/issue-24.md"
edit 25 "IMPACT P1: Document support matrix and degraded platform behaviour" "$BD/issue-25.md"
edit 26 "IMPACT P1: Add merge-path tests for multi-entity scan orchestration" "$BD/issue-26.md"
edit 27 "IMPACT P1: Complete macOS-first packaging and release path" "$BD/issue-27.md"
edit 28 "IMPACT P1: Implement explicit duplicate-submission handling for 409 responses" "$BD/issue-28.md"

# Programme roadmap horizon markers + ideabank (board-quality bodies)
edit 29 "IMPACT P1: Programme roadmap — benchmark phases and evaluation ladder" "$BD/issue-29.md"
edit 30 "IMPACT P1: Programme roadmap — anonymous submission and ingest services" "$BD/issue-30.md"
edit 31 "IMPACT P1: Programme roadmap — platform parity and runtime coverage" "$BD/issue-31.md"
edit 32 "IMPACT P1: Programme roadmap — release/distribution and adoption surface" "$BD/issue-32.md"
edit 42 "IMPACT P2: Ideabank — DMG drag-drop installer" "$BD/issue-42.md"
edit 43 "IMPACT P2: Ideabank — native GUI, accounts, leaderboards, auto-update" "$BD/issue-43.md"

# npm publish / Path C gate (docs/npm-publish.md, mlp-status-cto.md)
edit 34 "IMPACT P1: Publish @impact/cli to npm registry" "$BD/issue-34.md"

# MLP track (see docs/mlp.md)
edit 44 "IMPACT P0: MLP M1 — Public install and adoption" "$BD/issue-44.md"
edit 45 "IMPACT P0: MLP M2 — Report delight and first-run payoff" "$BD/issue-45.md"
edit 46 "IMPACT P0: MLP M3 — Conservative recommendation engine" "$BD/issue-46.md"
edit 47 "IMPACT P1: MLP M4 — Shareable result layer" "$BD/issue-47.md"
edit 48 "IMPACT P1: MLP M5 — Community visibility MVP" "$BD/issue-48.md"
edit 49 "IMPACT P1: MLP M6 — Install polish after npm" "$BD/issue-49.md"

# MLP public web / historical data (see docs/mlp-status-cto.md)
edit 50 "IMPACT P0: MLP Web H1 — Historical data information architecture" "$BD/issue-50.md"
edit 51 "IMPACT P0: MLP Web H2 — Historical hardware dataset MVP" "$BD/issue-51.md"
edit 52 "IMPACT P0: MLP Web H3 — Historical tools/runtimes dataset MVP" "$BD/issue-52.md"
edit 53 "IMPACT P0: MLP Web H4 — Historical LLM/model dataset MVP" "$BD/issue-53.md"
edit 54 "IMPACT P0: MLP Web H5 — Install / download page" "$BD/issue-54.md"
edit 55 "IMPACT P0: MLP Web H6 — Launch / use page" "$BD/issue-55.md"
edit 56 "IMPACT P0: MLP Web H7 — Submit result page" "$BD/issue-56.md"
edit 57 "IMPACT P0: MLP Web H8 — Homepage rework (four pillars)" "$BD/issue-57.md"

# Dashboard + macOS packaging tranche (docs/mlp-next-delivery-tranche.md)
edit 58 "IMPACT P0: Dashboard D1 — Ingest MVP" "$BD/issue-58.md"
edit 59 "IMPACT P0: Dashboard D2 — Aggregation model" "$BD/issue-59.md"
edit 60 "IMPACT P0: Dashboard D3 — Privacy thresholds" "$BD/issue-60.md"
edit 61 "IMPACT P0: Dashboard D4 — Dashboard read API" "$BD/issue-61.md"
edit 62 "IMPACT P0: Dashboard D5 — Wire webapp to real aggregates" "$BD/issue-62.md"
edit 63 "IMPACT P1: macOS M1 — Distribution decision (binary vs app)" "$BD/issue-63.md"
edit 64 "IMPACT P1: macOS M2 — Packaging pipeline & clean-Mac smoke" "$BD/issue-64.md"
edit 65 "IMPACT P1: macOS M3 — Signing & notarization plan" "$BD/issue-65.md"
edit 66 "IMPACT P1: macOS M4 — DMG packaging (after M1–M3)" "$BD/issue-66.md"

# Ideabank — future analytics, ops, and distribution themes (P2)
edit 67 "IMPACT P2: Ideabank — Compare my machine vs community cohort" "$BD/issue-67.md"
edit 68 "IMPACT P2: Ideabank — Public demo dataset / sandbox dashboard mode" "$BD/issue-68.md"
edit 69 "IMPACT P2: Ideabank — Raw-profile reprocessing and schema migration pipeline" "$BD/issue-69.md"
edit 70 "IMPACT P2: Ideabank — Enterprise / self-hosted deployment pack" "$BD/issue-70.md"
edit 71 "IMPACT P2: Ideabank — Submission anti-abuse and reputation controls" "$BD/issue-71.md"
edit 72 "IMPACT P2: Ideabank — Historical trends and time-series dashboard" "$BD/issue-72.md"
edit 73 "IMPACT P2: Ideabank — Release channel governance" "$BD/issue-73.md"
edit 74 "IMPACT P2: Ideabank — Public dataset export / research snapshot" "$BD/issue-74.md"

# GDS migration tranche (docs/gds-migration-plan.md)
edit 76 "IMPACT P2: GDS G0 — Governance, adapter doc, and CSS freeze" "$BD/issue-76.md"
edit 77 "IMPACT P2: GDS G1 — Mantine root runtime in @impact/web" "$BD/issue-77.md"
edit 78 "IMPACT P2: GDS G2 — Public shell and page header contracts" "$BD/issue-78.md"
edit 79 "IMPACT P2: GDS G3 — Migrate install, use, submit pages" "$BD/issue-79.md"
edit 80 "IMPACT P2: GDS G4 — Migrate data and profile surfaces" "$BD/issue-80.md"
edit 81 "IMPACT P2: GDS G5 — Homepage migration and legacy CSS deletion" "$BD/issue-81.md"
edit 82 "IMPACT P2: GDS G6 — GDS enforcement and CI validation" "$BD/issue-82.md"

# Labels: P0/P1 + area; drop legacy "epic" from implementation workstreams
for n in 1 2 6 7 8 10 11 12 15 16; do
  gh issue edit "$n" --repo "$REPO" --add-label "P0" 2>/dev/null || true
  gh issue edit "$n" --repo "$REPO" --add-label "area/platform" 2>/dev/null || true
done
for n in 3 4 5 9 13 14 22 23 24 25 26 27 28 34; do
  gh issue edit "$n" --repo "$REPO" --add-label "P1" 2>/dev/null || true
  gh issue edit "$n" --repo "$REPO" --add-label "area/platform" 2>/dev/null || true
done
for n in 17 18 19 20 21; do
  gh issue edit "$n" --repo "$REPO" --add-label "P0" 2>/dev/null || true
  gh issue edit "$n" --repo "$REPO" --add-label "area/platform" 2>/dev/null || true
done
for n in 44 45 46; do
  gh issue edit "$n" --repo "$REPO" --add-label "P0" 2>/dev/null || true
  gh issue edit "$n" --repo "$REPO" --add-label "area/platform" 2>/dev/null || true
done
for n in 47 48 49; do
  gh issue edit "$n" --repo "$REPO" --add-label "P1" 2>/dev/null || true
  gh issue edit "$n" --repo "$REPO" --add-label "area/platform" 2>/dev/null || true
done
for n in 50 51 52 53 54 55 56 57; do
  gh issue edit "$n" --repo "$REPO" --add-label "P0" 2>/dev/null || true
  gh issue edit "$n" --repo "$REPO" --add-label "area/platform" 2>/dev/null || true
done
for n in 58 59 60 61 62; do
  gh issue edit "$n" --repo "$REPO" --add-label "P0" 2>/dev/null || true
  gh issue edit "$n" --repo "$REPO" --add-label "area/platform" 2>/dev/null || true
done
for n in 63 64 65 66; do
  gh issue edit "$n" --repo "$REPO" --add-label "P1" 2>/dev/null || true
  gh issue edit "$n" --repo "$REPO" --add-label "area/platform" 2>/dev/null || true
done
for n in 29 30 31 32; do
  gh issue edit "$n" --repo "$REPO" --add-label "roadmap" 2>/dev/null || true
  gh issue edit "$n" --repo "$REPO" --add-label "P1" 2>/dev/null || true
  gh issue edit "$n" --repo "$REPO" --add-label "area/platform" 2>/dev/null || true
done
# Ideabank P2 cards: P2 + area/platform only (not phase-2)
for n in 67 68 69 70 71 72 73 74 76 77 78 79 80 81 82; do
  gh issue edit "$n" --repo "$REPO" --remove-label "phase-2" 2>/dev/null || true
  gh issue edit "$n" --repo "$REPO" --add-label "P2" 2>/dev/null || true
  gh issue edit "$n" --repo "$REPO" --add-label "area/platform" 2>/dev/null || true
done
for n in 6 7 8 9 10 11 12 13 14 15; do
  gh issue edit "$n" --repo "$REPO" --remove-label "epic" 2>/dev/null || true
done

echo "Issue bodies and titles updated."
