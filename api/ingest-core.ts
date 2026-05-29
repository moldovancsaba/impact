import { createHash, randomUUID } from "node:crypto";
import { parseSubmissionBody } from "@doneisbetter/schemas";
import type { Collection } from "mongodb";
import { ZodError } from "zod";
import type { SubmissionDocument } from "./_mongo";

export const MAX_BODY_BYTES = 2 * 1024 * 1024;

export type SubmitResult =
  | { status: 200; body: { submission_id: string; received_at: string } }
  | { status: 409; body: { submission_id: string; message: string } }
  | { status: 400; body: { error: string } }
  | { status: 500; body: { error: string } };

function sha256Hex(s: string): string {
  return createHash("sha256").update(s, "utf8").digest("hex");
}

function isMongoDuplicateError(error: unknown): error is { code: number } {
  return Boolean(error && typeof error === "object" && "code" in error && (error as { code: number }).code === 11000);
}

export async function processSubmissionMongo(
  submissions: Collection<SubmissionDocument>,
  rawBody: string,
): Promise<SubmitResult> {
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
  const doc: SubmissionDocument = {
    submission_id: randomUUID(),
    received_at: new Date().toISOString(),
    payload_sha256: sha256Hex(rawBody),
    run_id: profile.run_id,
    schema_version: profile.schema_version,
    profile_json: profile,
    dashboard_summary_json: submission.dashboard_summary ?? null,
  };

  try {
    await submissions.insertOne(doc);
    return {
      status: 200,
      body: { submission_id: doc.submission_id, received_at: doc.received_at },
    };
  } catch (e) {
    if (!isMongoDuplicateError(e)) {
      return { status: 500, body: { error: "Storage unavailable" } };
    }

    const existingByHash = await submissions.findOne(
      { payload_sha256: doc.payload_sha256 },
      { projection: { submission_id: 1 } },
    );
    if (existingByHash?.submission_id) {
      return {
        status: 409,
        body: {
          submission_id: existingByHash.submission_id,
          message: "Duplicate payload (same content hash)",
        },
      };
    }

    const existingByRun = await submissions.findOne({ run_id: doc.run_id }, { projection: { submission_id: 1 } });
    if (existingByRun?.submission_id) {
      return {
        status: 409,
        body: { submission_id: existingByRun.submission_id, message: "Duplicate run_id" },
      };
    }

    return { status: 409, body: { submission_id: doc.submission_id, message: "Duplicate submission" } };
  }
}
