import { createHash } from "node:crypto";
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { getSubmissionsCollection } from "./_mongo";
import { MAX_BODY_BYTES, processSubmissionMongo } from "./ingest-core";
import { corsHeaders, sendJson } from "./_util";

function getBodyString(req: VercelRequest): string {
  if (typeof req.body === "string") {
    return req.body;
  }
  if (Buffer.isBuffer(req.body)) {
    return req.body.toString("utf8");
  }
  if (req.body && typeof req.body === "object") {
    return JSON.stringify(req.body);
  }
  return "";
}

export default async function handler(req: VercelRequest, res: VercelResponse): Promise<void> {
  if (req.method === "OPTIONS") {
    res.writeHead(204, corsHeaders(["GET", "POST", "OPTIONS"]));
    res.end();
    return;
  }
  if (req.method !== "POST") {
    sendJson(res, 405, { error: "Method not allowed" }, ["GET", "POST", "OPTIONS"]);
    return;
  }

  const ct = req.headers["content-type"] ?? "";
  if (!ct.toLowerCase().includes("application/json")) {
    sendJson(res, 400, { error: "Content-Type must be application/json" }, ["GET", "POST", "OPTIONS"]);
    return;
  }

  const raw = getBodyString(req);
  if (!raw) {
    sendJson(res, 400, { error: "Invalid JSON" }, ["GET", "POST", "OPTIONS"]);
    return;
  }
  if (Buffer.byteLength(raw, "utf8") > MAX_BODY_BYTES) {
    sendJson(res, 400, { error: `Body exceeds ${MAX_BODY_BYTES} bytes` }, ["GET", "POST", "OPTIONS"]);
    return;
  }

  try {
    const submissions = await getSubmissionsCollection();
    const out = await processSubmissionMongo(submissions, raw);
    sendJson(res, out.status, out.body, ["GET", "POST", "OPTIONS"]);
    if (out.status === 200 && "submission_id" in out.body) {
      let runId = "?";
      try {
        runId = (JSON.parse(raw) as { run_id?: string }).run_id ?? "?";
      } catch {
        /* ignore */
      }
      const hp = createHash("sha256").update(raw, "utf8").digest("hex").slice(0, 12);
      console.log(`[ingest] accepted submission_id=${out.body.submission_id} run_id=${runId} payload_sha256=${hp}…`);
    } else if (out.status === 409) {
      console.log(`[ingest] duplicate -> ${out.body.submission_id} (${out.body.message})`);
    }
  } catch {
    sendJson(res, 503, { error: "database_unavailable" }, ["GET", "POST", "OPTIONS"]);
  }
}
