## Objective

Implement a **host scanner** that produces a **structured, privacy-safe `host` object**: OS, version, architecture, CPU model string, memory, coarse free disk, optional acceleration hints, **machine class**, and **salted coarse fingerprint**—**without** serial numbers or hardware UUIDs.

## Unified Context

Discovery is the **first truth layer** for a sovereign benchmark system: you cannot benchmark what you cannot **see**. The host profile must **degrade gracefully** (null/unknown) and never exfiltrate sensitive identifiers.

## Based On

- `packages/scanner-host`
- Schema: `HostSchema` in `@doneisbetter/schemas`
- `docs/privacy-policy.md`

## Problem

Incorrect or over-eager host probing breaks **trust** (too much data) or **utility** (wrong machine class).

## Goal

- Cross-platform **best-effort** host signals with timeouts and safe subprocess use.
- Fingerprint = **SHA-256** of canonical coarse fields + **local salt** (`~/.impact/salt`).

## Scope

In scope:

- `scanHost`, `fingerprintHost`, disk via `df` parsing (Unix); null on failure
- Apple Metal **hint** conservatively on macOS

Out of scope:

- GPU vendor model enumeration beyond safe hints
- Serial / UUID capture

## Execution Prompt

Extend with new signals only via **schema bump** + privacy review.

## Constraints

- Subprocess calls must not hang scan (timeouts).
- No PII fields in `host`.

## Acceptance Checks

- [ ] `host` validates against `ImpactProfileV01Schema`.
- [ ] Missing `df` or permissions → `disk.free_gb` null, scan continues.
- [ ] Fingerprint changes if salt rotates; not stable hardware id.

## Dependencies

- **Depends on:** #6
- **Supports:** #14 (readiness uses host)

## Risks

- **Windows** disk path differs—track explicit follow-up if not covered.

## Delivery Artifact

- `packages/scanner-host` source + sample profile JSON in comments.

## Developer Notes

- Board **Status** reflects verification (e.g. Done after review on target OSes).

- Programme card quality bar: [mvp-factory-control#498](https://github.com/moldovancsaba/mvp-factory-control/issues/498).
