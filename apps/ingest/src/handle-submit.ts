import { createHash } from "node:crypto";
import { randomUUID } from "node:crypto";
import { parseSubmissionBody } from "@doneisbetter/schemas";
import { ZodError } from "zod";
import type Database from "better-sqlite3";
import { insertSubmission } from "./store.js";

export const MAX_BODY_BYTES = 2 * 1024 * 1024;

export type SubmitSuccess = {
  status: 200;
  body: { submission_id: string; received_at: string };
};

export type SubmitDuplicate = {
  status: 409;
  body: { submission_id: string; received_at?: string; message: string };
};

export type SubmitError = {
  status: 400;
  body: { error: string };
};

export type SubmitResult = SubmitSuccess | SubmitDuplicate | SubmitError;

function sha256Hex(s: string): string {
  return createHash("sha256").update(s, "utf8").digest("hex");
}

/**
 * Process raw POST body: JSON parse, schema validate, dedupe + insert.
 * Dedupe uses raw body hash (matches client `JSON.stringify(profile)` bytes if identical).
 */
export function processSubmission(db: Database.Database, rawBody: string): SubmitResult {
  if (rawBody.length > MAX_BODY_BYTES) {
    return { status: 400, body: { error: `Body exceeds ${MAX_BODY_BYTES} bytes` } };
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(rawBody) as unknown;
  } catch {
    return { status: 400, body: { error: "Invalid JSON" } };
  }

  let submission;
  try {
    submission = parseSubmissionBody(parsed);
  } catch (e) {
    if (e instanceof ZodError) {
      const msg = e.issues.map((x) => `${x.path.join(".")}: ${x.message}`).join("; ");
      return { status: 400, body: { error: `Schema validation failed: ${msg}` } };
    }
    throw e;
  }

  const profile = submission.profile;
  const profile_json = JSON.stringify(profile);
  const dashboard_summary_json = submission.dashboard_summary
    ? JSON.stringify(submission.dashboard_summary)
    : null;

  const payload_sha256 = sha256Hex(rawBody);
  const submission_id = randomUUID();
  const received_at = new Date().toISOString();

  const result = insertSubmission(db, {
    submission_id,
    received_at,
    payload_sha256,
    run_id: profile.run_id,
    schema_version: profile.schema_version,
    profile_json,
    dashboard_summary_json,
  });

  if (result.ok) {
    return {
      status: 200,
      body: { submission_id: result.submission_id, received_at: result.received_at },
    };
  }

  return {
    status: 409,
    body: {
      submission_id: result.submission_id,
      message:
        result.conflict === "payload_sha256"
          ? "Duplicate payload (same content hash)"
          : "Duplicate run_id",
    },
  };
}
