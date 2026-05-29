# Field confidence rules (deterministic)

**SSOT for machine-assigned `confidence` on provenanced fields.** Scanners should use `fieldConfidence(ruleId)` from `@doneisbetter/schemas` with rule ids defined in `packages/schemas/src/confidence-rules.ts`. Do not assign field confidence ad hoc without extending this document and the map.

## Levels

| Value | Meaning |
| ----- | ------- |
| **high** | Direct successful probe from an authoritative source (CLI exited zero with parseable output, HTTP API success, etc.). |
| **medium** | Indirect or partial evidence from a credible source (derived mappings, heuristic hints, version string ambiguity). |
| **low** | Weak inference or degraded probe — useful directionally, not authoritative. |
| **unknown** | No reliable signal (missing probe, failure, or intentionally not attempted). |

## Rules by signal (examples)

| Scenario | Rule id (code) | Confidence |
| -------- | -------------- | ---------- |
| Host OS name from platform mapping | `host_os_mapping` | high |
| Host OS version from `os.release` | `host_os_release` | high |
| Host architecture | `host_arch` | high |
| Host chip string from `os.cpus[0].model` | `host_chip_from_cpus` | medium |
| Host chip absent / null model | `host_chip_absent` | unknown |
| Host memory from `os.totalmem` | `host_memory` | high |
| Host core count | `host_core_count` | high |
| Disk free from `df` success | `host_disk_df_success` | medium |
| Disk probe failed | `host_disk_df_fail` | unknown |
| Coarse fingerprint | `host_fingerprint` | high |
| Machine class derivation | `host_machine_class` | medium |
| Metal hint on Darwin | `host_metal_hint` | medium |
| Ollama `--version` success | `ollama_version_cli` | high |
| Ollama binary suspected but version missing | `ollama_version_missing` | unknown |
| Ollama HTTP `/api/tags` success | `ollama_reachable_api` | high |
| MLX from `pip show` | `mlx_pip_show` | high |
| MLX not in pip | `mlx_pip_absent` | unknown |
| Allowlisted tool on PATH | `tool_which_hit` | high |
| Tool not on PATH | `tool_which_miss` | unknown |
| Tool version from CLI | `tool_version_cli` | medium |
| Tool present but version probe failed | `tool_version_probe_fail` | unknown |
| Model row from runtime API | `model_from_ollama_api` | high |

Future **configured** endpoints (user-supplied URLs, config files) should get explicit rule ids when implemented.

## Readiness and runtime rows

- **Readiness** `presence` (`detected` | `inferred` | `configured` | `unknown`) describes the epistemic basis of the summary text, not field confidence.
- **Runtime** `status` describes operational availability; **runtime** `presence` describes how we know the row applies. Do not use `partial` as a `presence` value — `partial` belongs in `status` for partial runtime support.

HTML reports include a short legend that mirrors this document.
