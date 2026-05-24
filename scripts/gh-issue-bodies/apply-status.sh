#!/usr/bin/env bash
# Set org Project "impact" (sovereignsquad/4) Status from workflow SSOT.
# Compatible with bash 3.2 (macOS).
# https://github.com/orgs/sovereignsquad/projects/4 — item IDs from `gh project item-add` / item-list.
set -euo pipefail
PROJECT_ID="PVT_kwDOEEuBB84BTwCK"
STATUS_FIELD="PVTSSF_lADOEEuBB84BTwCKzhA81Ew"

IDEABANK=4c7bc4d5
ROADMAP=93da8466
BACKLOG=53cb63a1
TODO=f75ad846
IN_PROGRESS=47fc9ee4
REVIEW=a278dab5
DONE=98236657

set_status() {
  local item_id="$1" option_id="$2"
  gh project item-edit \
    --id "$item_id" \
    --project-id "$PROJECT_ID" \
    --field-id "$STATUS_FIELD" \
    --single-select-option-id "$option_id"
}

item_for_issue() {
  case "$1" in
    1) echo PVTI_lADOEEuBB84BTwCKzgpI_Do ;;
    2) echo PVTI_lADOEEuBB84BTwCKzgpI_G4 ;;
    3) echo PVTI_lADOEEuBB84BTwCKzgpI_HM ;;
    4) echo PVTI_lADOEEuBB84BTwCKzgpI_Hc ;;
    5) echo PVTI_lADOEEuBB84BTwCKzgpI_Ho ;;
    6) echo PVTI_lADOEEuBB84BTwCKzgpI_H4 ;;
    7) echo PVTI_lADOEEuBB84BTwCKzgpI_II ;;
    8) echo PVTI_lADOEEuBB84BTwCKzgpI_IU ;;
    9) echo PVTI_lADOEEuBB84BTwCKzgpI_Ig ;;
    10) echo PVTI_lADOEEuBB84BTwCKzgpI_Io ;;
    11) echo PVTI_lADOEEuBB84BTwCKzgpI_I4 ;;
    12) echo PVTI_lADOEEuBB84BTwCKzgpI_JI ;;
    13) echo PVTI_lADOEEuBB84BTwCKzgpI_JQ ;;
    14) echo PVTI_lADOEEuBB84BTwCKzgpI_Js ;;
    15) echo PVTI_lADOEEuBB84BTwCKzgpI_KA ;;
    16) echo PVTI_lADOEEuBB84BTwCKzgpI_KQ ;;
    17) echo PVTI_lADOEEuBB84BTwCKzgpI_Kk ;;
    18) echo PVTI_lADOEEuBB84BTwCKzgpI_K0 ;;
    19) echo PVTI_lADOEEuBB84BTwCKzgpI_LU ;;
    20) echo PVTI_lADOEEuBB84BTwCKzgpI_Ls ;;
    21) echo PVTI_lADOEEuBB84BTwCKzgpI_Lw ;;
    22) echo PVTI_lADOEEuBB84BTwCKzgpI_MA ;;
    23) echo PVTI_lADOEEuBB84BTwCKzgpI_Mg ;;
    24) echo PVTI_lADOEEuBB84BTwCKzgpI_Mw ;;
    25) echo PVTI_lADOEEuBB84BTwCKzgpI_NI ;;
    26) echo PVTI_lADOEEuBB84BTwCKzgpI_NY ;;
    27) echo PVTI_lADOEEuBB84BTwCKzgpI_No ;;
    28) echo PVTI_lADOEEuBB84BTwCKzgpI_N4 ;;
    29) echo PVTI_lADOEEuBB84BTwCKzgpI_OM ;;
    30) echo PVTI_lADOEEuBB84BTwCKzgpI_Oc ;;
    31) echo PVTI_lADOEEuBB84BTwCKzgpI_Os ;;
    32) echo PVTI_lADOEEuBB84BTwCKzgpI_O4 ;;
    33) echo PVTI_lADOEEuBB84BTwCKzgpI_PI ;;
    34) echo PVTI_lADOEEuBB84BTwCKzgpI_PU ;;
    35) echo PVTI_lADOEEuBB84BTwCKzgpI_P4 ;;
    36) echo PVTI_lADOEEuBB84BTwCKzgpI_QY ;;
    37) echo PVTI_lADOEEuBB84BTwCKzgpI_Qk ;;
    38) echo PVTI_lADOEEuBB84BTwCKzgpI_Qw ;;
    39) echo PVTI_lADOEEuBB84BTwCKzgpI_RU ;;
    40) echo PVTI_lADOEEuBB84BTwCKzgpI_Rs ;;
    41) echo PVTI_lADOEEuBB84BTwCKzgpI_R8 ;;
    42) echo PVTI_lADOEEuBB84BTwCKzgpI_SQ ;;
    43) echo PVTI_lADOEEuBB84BTwCKzgpI_SU ;;
    44) echo PVTI_lADOEEuBB84BTwCKzgpI_Sg ;;
    45) echo PVTI_lADOEEuBB84BTwCKzgpI_S4 ;;
    46) echo PVTI_lADOEEuBB84BTwCKzgpI_TQ ;;
    47) echo PVTI_lADOEEuBB84BTwCKzgpI_TY ;;
    48) echo PVTI_lADOEEuBB84BTwCKzgpI_Ts ;;
    49) echo PVTI_lADOEEuBB84BTwCKzgpI_Tw ;;
    50) echo PVTI_lADOEEuBB84BTwCKzgpI_UM ;;
    51) echo PVTI_lADOEEuBB84BTwCKzgpI_Uk ;;
    52) echo PVTI_lADOEEuBB84BTwCKzgpI_Uw ;;
    53) echo PVTI_lADOEEuBB84BTwCKzgpI_U0 ;;
    54) echo PVTI_lADOEEuBB84BTwCKzgpI_VI ;;
    55) echo PVTI_lADOEEuBB84BTwCKzgpI_Vc ;;
    56) echo PVTI_lADOEEuBB84BTwCKzgpI_Vo ;;
    57) echo PVTI_lADOEEuBB84BTwCKzgpI_Vs ;;
    58) echo PVTI_lADOEEuBB84BTwCKzgpI_WE ;;
    59) echo PVTI_lADOEEuBB84BTwCKzgpI_Wk ;;
    60) echo PVTI_lADOEEuBB84BTwCKzgpI_Ww ;;
    61) echo PVTI_lADOEEuBB84BTwCKzgpI_XE ;;
    62) echo PVTI_lADOEEuBB84BTwCKzgpI_XM ;;
    63) echo PVTI_lADOEEuBB84BTwCKzgpI_XU ;;
    64) echo PVTI_lADOEEuBB84BTwCKzgpI_Xk ;;
    65) echo PVTI_lADOEEuBB84BTwCKzgpI_Xs ;;
    66) echo PVTI_lADOEEuBB84BTwCKzgpI_X0 ;;
    67) echo PVTI_lADOEEuBB84BTwCKzgpI_YA ;;
    68) echo PVTI_lADOEEuBB84BTwCKzgpI_YM ;;
    69) echo PVTI_lADOEEuBB84BTwCKzgpI_YY ;;
    70) echo PVTI_lADOEEuBB84BTwCKzgpI_Yk ;;
    71) echo PVTI_lADOEEuBB84BTwCKzgpI_Ys ;;
    72) echo PVTI_lADOEEuBB84BTwCKzgpI_ZA ;;
    73) echo PVTI_lADOEEuBB84BTwCKzgpI_ZE ;;
    74) echo PVTI_lADOEEuBB84BTwCKzgpI_ZU ;;
    76) echo PVTI_lADOEEuBB84BTwCKzgtpb28 ;;
    77) echo PVTI_lADOEEuBB84BTwCKzgtpb3c ;;
    78) echo PVTI_lADOEEuBB84BTwCKzgtpb3w ;;
    79) echo PVTI_lADOEEuBB84BTwCKzgtpb4g ;;
    80) echo PVTI_lADOEEuBB84BTwCKzgtpb5M ;;
    81) echo PVTI_lADOEEuBB84BTwCKzgtpb5g ;;
    82) echo PVTI_lADOEEuBB84BTwCKzgtpb8s ;;
    *) echo ""; return 1 ;;
  esac
}

# Doctrine + roadmap
set_status "$(item_for_issue 1)" "$IN_PROGRESS"
set_status "$(item_for_issue 16)" "$ROADMAP"
# Roadmap theme horizon markers (non-executable)
for n in 29 30 31 32; do
  set_status "$(item_for_issue "$n")" "$ROADMAP"
done

# Historical programme issues
set_status "$(item_for_issue 2)" "$DONE"
set_status "$(item_for_issue 3)" "$IN_PROGRESS"
# Programme hygiene — Backlog (near-future, not next execution queue)
set_status "$(item_for_issue 4)" "$BACKLOG"
set_status "$(item_for_issue 5)" "$BACKLOG"
set_status "$(item_for_issue 6)" "$DONE"
set_status "$(item_for_issue 7)" "$DONE"
set_status "$(item_for_issue 8)" "$DONE"
set_status "$(item_for_issue 9)" "$DONE"
# #10 / #14: MVP discovery + readiness shipped; MLX depth / rule tuning = platform backlog, not "in review" on board
set_status "$(item_for_issue 10)" "$DONE"
set_status "$(item_for_issue 11)" "$DONE"
set_status "$(item_for_issue 12)" "$DONE"
set_status "$(item_for_issue 13)" "$BACKLOG"
set_status "$(item_for_issue 14)" "$DONE"
set_status "$(item_for_issue 15)" "$DONE"

# Sprint B — delivered on board (repo complete except packaging track)
for n in 17 18 19 20 21 22 24 25 26 28; do
  set_status "$(item_for_issue "$n")" "$DONE"
done
# B7 — #23 superseded by #27; Path B verified — #27 Done
set_status "$(item_for_issue 23)" "$DONE"
set_status "$(item_for_issue 27)" "$DONE"

# Post-MVP programme (from issue #1 directive) — CTO 2026-04: #33 done; #34 primary; #38 exploratory in Backlog
set_status "$(item_for_issue 33)" "$DONE"
set_status "$(item_for_issue 34)" "$IN_PROGRESS"
for n in 35 36 37 38; do
  set_status "$(item_for_issue "$n")" "$BACKLOG"
done
for n in 39 40 41; do
  set_status "$(item_for_issue "$n")" "$ROADMAP"
done
for n in 42 43 67 68 69 70 71 72 73 74; do
  set_status "$(item_for_issue "$n")" "$IDEABANK"
done

# MLP execution (docs/mlp.md) — CTO: Todo M1–M3; Backlog M4–M6; do not implement spine before #34 closed
for n in 44 45 46; do
  set_status "$(item_for_issue "$n")" "$TODO"
done
for n in 47 48 49; do
  set_status "$(item_for_issue "$n")" "$BACKLOG"
done

# MLP public web / historical data (CTO 2026-04) — H1,H5–H8 Todo; H2–H4 Backlog
for n in 50 54 55 56 57; do
  set_status "$(item_for_issue "$n")" "$TODO"
done
for n in 51 52 53; do
  set_status "$(item_for_issue "$n")" "$BACKLOG"
done

# Next delivery tranche — code in repo; activation sprint owns board **In Progress** on #58 (mlp-status-cto § Leadership view); #59–#62 Todo until closure order / hosted proof
set_status "$(item_for_issue 58)" "$IN_PROGRESS"
for n in 59 60 61 62; do
  set_status "$(item_for_issue "$n")" "$TODO"
done
for n in 63 64 65 66; do
  set_status "$(item_for_issue "$n")" "$BACKLOG"
done

# GDS migration (@impact/web) — Done in repo; see docs/gds-migration-plan.md
for n in 76 77 78 79 80 81 82; do
  set_status "$(item_for_issue "$n")" "$DONE"
done

echo "Org project 4 (sovereignsquad/impact) Status field updated for issues 1–74 + GDS #76–#82 (MVP + MLP + web/data + dashboard + macOS packaging + ideabank + GDS tranche)."
