import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { beforeEach, describe, expect, it } from "vitest";
import { processSubmissionMongo } from "../ingest-core";
import type { SubmissionDocument } from "../_mongo";

const __dirname = dirname(fileURLToPath(import.meta.url));
const fixturePath = join(__dirname, "../../fixtures/baseline-profile.sample.json");

class FakeSubmissionsCollection {
  private docs: SubmissionDocument[] = [];

  async insertOne(doc: SubmissionDocument): Promise<void> {
    const dupHash = this.docs.find((x) => x.payload_sha256 === doc.payload_sha256);
    if (dupHash) {
      const err = new Error("duplicate") as Error & { code: number };
      err.code = 11000;
      throw err;
    }
    const dupRun = this.docs.find((x) => x.run_id === doc.run_id);
    if (dupRun) {
      const err = new Error("duplicate") as Error & { code: number };
      err.code = 11000;
      throw err;
    }
    this.docs.push(doc);
  }

  async findOne(filter: Partial<SubmissionDocument>): Promise<{ submission_id: string } | null> {
    const doc = this.docs.find((x) => {
      if (filter.payload_sha256) {
        return x.payload_sha256 === filter.payload_sha256;
      }
      if (filter.run_id) {
        return x.run_id === filter.run_id;
      }
      return false;
    });
    return doc ? { submission_id: doc.submission_id } : null;
  }
}

describe("processSubmissionMongo", () => {
  let submissions: FakeSubmissionsCollection;

  beforeEach(() => {
    submissions = new FakeSubmissionsCollection();
  });

  it("accepts valid profile JSON", async () => {
    const raw = readFileSync(fixturePath, "utf8");
    const r = await processSubmissionMongo(submissions as never, raw);
    expect(r.status).toBe(200);
    if (r.status === 200) {
      expect(r.body.submission_id).toMatch(/^[0-9a-f-]{36}$/i);
      expect(r.body.received_at).toMatch(/^\d{4}-\d{2}-\d{2}T/);
    }
  });

  it("returns 400 for invalid JSON", async () => {
    const r = await processSubmissionMongo(submissions as never, "not-json");
    expect(r.status).toBe(400);
  });

  it("returns 409 on duplicate payload", async () => {
    const raw = readFileSync(fixturePath, "utf8");
    expect((await processSubmissionMongo(submissions as never, raw)).status).toBe(200);
    const r2 = await processSubmissionMongo(submissions as never, raw);
    expect(r2.status).toBe(409);
    if (r2.status === 409) {
      expect(r2.body.message).toContain("Duplicate payload");
    }
  });

  it("returns 409 on duplicate run_id with changed body", async () => {
    const base = JSON.parse(readFileSync(fixturePath, "utf8")) as Record<string, unknown>;
    expect((await processSubmissionMongo(submissions as never, JSON.stringify(base))).status).toBe(200);
    const changed = JSON.stringify({ ...base, created_at: "2099-01-01T00:00:00.000Z" });
    const r2 = await processSubmissionMongo(submissions as never, changed);
    expect(r2.status).toBe(409);
    if (r2.status === 409) {
      expect(r2.body.message).toContain("run_id");
    }
  });
});
