import type { ImpactProfile, ProvenancedString, ProvenancedNumber, ProvenancedBoolean } from "@doneisbetter/schemas";
import { buildDiagnostics } from "./diagnostics.js";
import { buildRecommendations, type Recommendation } from "./recommendations.js";

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function meta(source: string, probe: string | null, confidence: string): string {
  return `<span class="muted"> · ${esc(source)}${probe ? ` · ${esc(probe)}` : ""} · ${esc(confidence)}</span>`;
}

function cellStr(f: ProvenancedString): string {
  const v = f.value ?? "—";
  return `${esc(v)}${meta(f.source, f.probe, f.confidence)}`;
}

function cellNum(f: ProvenancedNumber, suffix = ""): string {
  const v = f.value != null ? `${f.value}${suffix}` : "—";
  return `${esc(v)}${meta(f.source, f.probe, f.confidence)}`;
}

function cellBool(f: ProvenancedBoolean): string {
  const v = f.value === null ? "unknown" : f.value ? "yes" : "no";
  return `${esc(v)}${meta(f.source, f.probe, f.confidence)}`;
}

function glanceCard(profile: ImpactProfile): string {
  const r = profile.readiness;
  const mem =
    profile.host.memory_gb?.value != null ? `${String(profile.host.memory_gb.value)} GB RAM (coarse)` : null;
  const os = [profile.host.os_name.value, profile.host.architecture.value].filter(Boolean).join(" · ");
  const lead = r
    ? `<p><strong>${esc(r.summary)}</strong></p>`
    : `<p><strong>Local inventory snapshot</strong> — this report reflects one scan on this machine at <code>${esc(profile.created_at)}</code>.</p>`;
  const tail = `<p class="muted">${esc(os)}${mem ? ` · ${esc(mem)}` : ""}. This is <strong>discovery and provenance</strong>, not a benchmark score or cloud evaluation.</p>`;
  return `<div class="card glance"><h2>At a glance</h2>${lead}${tail}</div>`;
}

function meaningCard(profile: ImpactProfile): string {
  const bullets: string[] = [
    "Values are conservative: <strong>status</strong> is operational (installed / reachable), <strong>presence</strong> is what we know about the row, and <strong>confidence</strong> labels field-level certainty.",
    "The models table only lists what supported local APIs or commands returned during this run — absence is not proof a model does not exist elsewhere.",
  ];
  if (profile.readiness?.presence) {
    bullets.push(
      `Readiness text (if shown) has epistemic basis <code>${esc(profile.readiness.presence)}</code> — interpret it as a coarse hint, not a grade.`
    );
  }
  return `<div class="card"><h2>What this scan means</h2><ul class="tight">${bullets
    .map((b) => `<li>${b}</li>`)
    .join("")}</ul></div>`;
}

function recommendationItem(rec: Recommendation): string {
  const ev =
    rec.evidence.length > 0
      ? `<p class="muted">Grounded in: ${rec.evidence.map((e) => `<code>${esc(e)}</code>`).join(", ")}</p>`
      : "";
  return `<li><strong>${esc(rec.title)}</strong> — ${esc(rec.body)}${ev}</li>`;
}

function stepsCard(recs: Recommendation[]): string {
  const body =
    recs.length === 0
      ? `<p class="muted">No extra automated suggestions for this profile — review runtimes, tools, and models below.</p>`
      : `<ol class="tight steps">${recs.map((r) => recommendationItem(r)).join("")}</ol>`;
  return `<div class="card"><h2>Suggested next steps</h2><p class="muted">Deterministic hints from this scan only — not remote advice.</p>${body}</div>`;
}

function limitationsCard(): string {
  return `<div class="card subtle"><h2>Known limitations (this product version)</h2>
    <ul class="tight">
      <li>Allowlisted tools only — other binaries are intentionally ignored.</li>
      <li>Runtime and model coverage depends on what this build probes; partial runtimes are labeled honestly.</li>
      <li>Disk and memory figures are coarse OS-level hints where available.</li>
      <li>No continuous monitoring — re-run after you change your environment.</li>
    </ul>
  </div>`;
}

function confidenceLegendCard(): string {
  return `<div class="card">
    <h2>Field confidence (legend)</h2>
    <p class="muted">Per-field <code>confidence</code> is assigned from deterministic rules (see <code>docs/confidence-rules.md</code>).</p>
    <ul class="tight">
      <li><strong>high</strong> — direct successful probe from an authoritative source (e.g. CLI version that exited zero, runtime HTTP API success).</li>
      <li><strong>medium</strong> — indirect or partial evidence from a credible source (e.g. derived OS mapping, tool version parse ambiguity).</li>
      <li><strong>low</strong> — weak inference or degraded probe (use with care).</li>
      <li><strong>unknown</strong> — no reliable signal for this field.</li>
    </ul>
  </div>`;
}

export function renderHtmlReport(profile: ImpactProfile): string {
  const { host, runtimes, tools, models, privacy, readiness } = profile;
  const toolsInstalled = tools.filter((t) => t.installed);
  const mlx = runtimes.find((r) => r.id === "mlx_python");
  const diagnostics = buildDiagnostics(profile);
  const recommendations = buildRecommendations(profile);

  const mlxNotice =
    mlx && mlx.installed
      ? `<div class="card warn"><h2>MLX support (honest scope)</h2><p>${esc(
          mlx.capabilities?.notes ??
            "MLX runtime row present; see capabilities.model_inventory for enumeration status."
        )}</p><p class="muted">Model inventory support: <strong>${esc(
          mlx.capabilities?.model_inventory ?? "none"
        )}</strong> — do not assume full MLX model discovery.</p></div>`
      : "";

  const diagnosticsCard =
    diagnostics.length > 0
      ? `<div class="card"><h2>Diagnostics</h2><ul class="tight">${diagnostics
          .map((d) => `<li>${esc(d)}</li>`)
          .join("")}</ul></div>`
      : "";

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>I.M.P.A.C.T. report</title>
  <style>
    :root { font-family: system-ui, sans-serif; line-height: 1.45; color: #111; background: #fafafa; }
    body { max-width: 960px; margin: 0 auto; padding: 1.5rem; }
    h1 { font-size: 1.35rem; }
    h2 { font-size: 1.05rem; margin-top: 1.75rem; border-bottom: 1px solid #ddd; padding-bottom: 0.25rem; }
    .card { background: #fff; border: 1px solid #e5e5e5; border-radius: 8px; padding: 1rem 1.25rem; margin: 1rem 0; }
    .card.warn { border-color: #e6c35c; background: #fffbeb; }
    table { width: 100%; border-collapse: collapse; font-size: 0.9rem; }
    th, td { text-align: left; padding: 0.45rem 0.5rem; border-bottom: 1px solid #eee; vertical-align: top; }
    th { color: #555; font-weight: 600; }
    .muted { color: #666; font-size: 0.88rem; }
    code { font-size: 0.85em; background: #f0f0f0; padding: 0.1em 0.35em; border-radius: 4px; }
    .pill { display: inline-block; padding: 0.15rem 0.5rem; border-radius: 999px; background: #eef; font-size: 0.8rem; }
    footer { margin-top: 2rem; padding-top: 1rem; border-top: 1px solid #ddd; font-size: 0.85rem; color: #555; }
    ul.tight { margin: 0.35rem 0 0 1.1rem; padding: 0; }
    ol.steps { margin: 0.5rem 0 0 1.2rem; padding: 0; }
    ol.steps li { margin: 0.5rem 0; }
    .card.subtle { background: #f7f7f7; border-style: dashed; }
    .card.glance { border-color: #c5d4f0; background: #f8faff; }
  </style>
</head>
<body>
  <h1>I.M.P.A.C.T. <span class="pill">${esc(profile.schema_version)}</span></h1>
  <p class="muted">Local, privacy-first scan. Run ID: <code>${esc(profile.run_id)}</code> · ${esc(profile.created_at)}</p>
  <p class="muted">Values show <strong>source · probe · field confidence</strong> where applicable (provenance). Runtime rows separate <strong>status</strong> (availability) from <strong>presence</strong> (how we know the row applies).</p>

  ${glanceCard(profile)}
  ${meaningCard(profile)}
  ${stepsCard(recommendations)}
  ${confidenceLegendCard()}

  <div class="card">
    <h2>Host</h2>
    <table>
      <tr><th>OS</th><td>${cellStr(host.os_name)} ${cellStr(host.os_version)} (${cellStr(host.architecture)})</td></tr>
      <tr><th>Chip / CPU</th><td>${cellStr(host.chip)}</td></tr>
      <tr><th>Memory</th><td>${cellNum(host.memory_gb, " GB")}</td></tr>
      <tr><th>Free disk (approx.)</th><td>${host.disk ? cellNum(host.disk.free_gb, " GB") : "—"}</td></tr>
      <tr><th>Machine class</th><td>${cellStr(host.machine_class)}</td></tr>
      <tr><th>Fingerprint</th><td>${cellStr(host.fingerprint_hash)} <span class="muted">(coarse, salted; no serial/UUID)</span></td></tr>
      ${
        host.gpu_acceleration
          ? `<tr><th>GPU / Metal hint</th><td>${cellBool(host.gpu_acceleration.metal_available)}</td></tr>`
          : ""
      }
    </table>
  </div>

  ${mlxNotice}

  ${diagnosticsCard}

  ${
    readiness
      ? `<div class="card"><h2>Readiness (coarse)</h2><p>${esc(readiness.summary)}</p><p class="muted">Presence (epistemic basis): <code>${esc(readiness.presence)}</code> — not a benchmark score.</p></div>`
      : ""
  }

  <div class="card">
    <h2>Runtimes</h2>
    <table><thead><tr><th>ID</th><th>Status</th><th>Installed</th><th>Reachable</th><th>Presence</th><th>Version</th><th>Model inventory</th></tr></thead><tbody>
    ${runtimes
      .map(
        (r) =>
          `<tr><td><code>${esc(r.id)}</code></td><td><code>${esc(r.status)}</code></td><td>${r.installed}</td><td>${r.reachable === null ? "—" : String(r.reachable)}</td><td><code>${esc(r.presence)}</code></td><td>${cellStr(r.version)}</td><td>${esc(r.capabilities?.model_inventory ?? "—")}</td></tr>`
      )
      .join("")}
    </tbody></table>
    ${runtimes
      .map((r) =>
        r.capabilities?.notes
          ? `<p class="muted"><code>${esc(r.id)}</code>: ${esc(r.capabilities.notes)}</p>`
          : ""
      )
      .join("")}
  </div>

  <div class="card">
    <h2>Tools (allowlist)</h2>
    <p class="muted">Only curated tools are checked; others are intentionally ignored.</p>
    <table><thead><tr><th>ID</th><th>Presence</th><th>Version</th><th>Kind</th></tr></thead><tbody>
    ${toolsInstalled
      .map(
        (t) =>
          `<tr><td><code>${esc(t.id)}</code></td><td>${esc(t.presence)}</td><td>${cellStr(t.version)}</td><td>${esc(t.kind)}</td></tr>`
      )
      .join("")}
    ${toolsInstalled.length === 0 ? "<tr><td colspan='4'>No allowlisted tools detected on PATH.</td></tr>" : ""}
    </tbody></table>
  </div>

  <div class="card">
    <h2>Models</h2>
    <table><thead><tr><th>ID</th><th>Runtime</th><th>Locality</th><th>Presence</th><th>Source / probe</th><th>Confidence</th><th>Quantization</th></tr></thead><tbody>
    ${models
      .map((m) => {
        const q = m.quantization ? cellStr(m.quantization) : "—";
        return `<tr><td><code>${esc(m.id)}</code></td><td>${esc(m.runtime_id)}</td><td>${esc(m.locality)}</td><td><code>${esc(m.presence)}</code></td><td>${esc(m.source)}${m.probe ? ` · ${esc(m.probe)}` : ""}</td><td>${esc(m.confidence)}</td><td>${q}</td></tr>`;
      })
      .join("")}
    ${models.length === 0 ? "<tr><td colspan='7'>No models enumerated (runtime offline, not installed, or inventory not configured).</td></tr>" : ""}
    </tbody></table>
  </div>

  <div class="card">
    <h2>What we did <em>not</em> collect</h2>
    <ul class="tight">
      <li>Hardware serial numbers or vendor UUIDs</li>
      <li>Usernames, hostnames as identifiers, home path names</li>
      <li>Contents of arbitrary files or projects</li>
      <li>Environment variables beyond what OS/tool CLIs expose for version checks</li>
      <li>Continuous or background telemetry</li>
    </ul>
  </div>

  <div class="card">
    <h2>Privacy</h2>
    <p>Raw identifiers stored: <strong>${String(privacy.raw_identifiers_stored)}</strong></p>
    <p>Submission requires explicit consent: <strong>${String(privacy.consent_required_for_submission)}</strong></p>
    <p class="muted">See <code>docs/privacy-policy.md</code> and <code>docs/submission-contract.md</code> in the repository.</p>
  </div>

  ${limitationsCard()}

  <footer>
    <p><strong>Platform support (this build)</strong></p>
    <ul class="tight">
      <li><strong>macOS</strong> — supported target for host probes (Metal hint, <code>df</code>).</li>
      <li><strong>Linux</strong> — partial / best-effort; probes depend on common userland (<code>df</code>, <code>which</code>).</li>
      <li><strong>Windows</strong> — experimental; disk and some shell probes may return unknown until parity work lands.</li>
    </ul>
    <p class="muted">See <code>docs/support-matrix.md</code> for detail. Schema: ${esc(profile.schema_version)} · Report is a point-in-time snapshot; re-run after changing your environment.</p>
  </footer>
</body>
</html>`;
}
