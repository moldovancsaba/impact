# Privacy policy — I.M.P.A.C.T.

**Last updated:** 2026-04-03

This policy describes what the **I.M.P.A.C.T.** open source scanner collects **on your machine**, what is written to **local files**, and what may be sent if you **explicitly opt in** to submission. The shipping profile contract is **`impact.v0.3`** (`schema_version` in exported JSON); privacy boundaries apply regardless of CLI install path (Path B or Path C).

## Local-first

The scan is designed to run **without network access**. Detection uses local system APIs and, where applicable, localhost services (for example an Ollama API on `127.0.0.1`).

## What we do not collect

The tool does **not** intentionally collect or persist:

- Hardware serial numbers or vendor UUIDs in raw form  
- User account names or home directory names as identifiers  
- Hostnames used as identifiers  
- Contents of arbitrary files  
- Environment variables beyond what the OS exposes for version commands (we avoid secret-bearing env)  
- Clipboard, keystrokes, or screen data  

A **coarse fingerprint** may be derived from non-identifying host facts plus a **random salt stored only on your machine** (`~/.impact/salt`) to support anonymous aggregation if you submit. It is not a stable hardware serial.

## What the scan may observe

Depending on your system and installed software, the scan may derive:

- Operating system name and version (as reported by the OS)  
- CPU architecture and generic CPU model string (as reported by the OS)  
- Approximate memory and **approximate** free disk space for the root volume (via system utilities)  
- Presence and versions of **allowlisted** CLI tools on your `PATH`  
- Presence of supported runtimes (e.g. Ollama) and models exposed via supported local APIs  
- Coarse GPU / acceleration hints where the implementation can report them conservatively  

## Local outputs

By default, `impact scan` writes:

- `impact-profile.json` — structured profile  
- `impact-report.html` — human-readable report  

If you choose to submit, the CLI writes **`impact-submission-preview.json`** (exact outbound JSON) before any POST so you can inspect the **exact** payload. See also [privacy-for-users.md](privacy-for-users.md).

## Submission (opt-in)

Normative HTTP rules (request/response, retries, no-PII on the wire): [submission-contract.md](submission-contract.md).


**No data is transmitted** unless you:

1. Choose to submit when prompted (interactive CLI), and  
2. Confirm after seeing what will be sent (including typing `SUBMIT` when that flow is enabled), and  
3. Have configured an endpoint via `IMPACT_SUBMIT_URL` (or future documented configuration).

If submission fails, **local results are preserved**. A short line may be appended to a local log under `~/.impact/` for your records.

## Changes

This policy will evolve with the project. Material changes should be reflected in release notes and on the [project board](https://github.com/orgs/sovereignsquad/projects/4/views/1).

## Contact

Use [GitHub Issues](https://github.com/sovereignsquad/impact/issues) for questions about this policy or the scanner’s behaviour.
