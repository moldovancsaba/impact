import { mkdir, readFile, writeFile } from "node:fs/promises";
import { homedir } from "node:os";
import path from "node:path";
import { randomBytes } from "node:crypto";
import type { ImpactProfile } from "@doneisbetter/schemas";

const DIR = ".impact";
const SALT_FILE = "salt";

export function privacyBlock(): ImpactProfile["privacy"] {
  return {
    raw_identifiers_stored: false,
    consent_required_for_submission: true,
  };
}

export async function loadOrCreateSalt(): Promise<string> {
  const dir = path.join(homedir(), DIR);
  const file = path.join(dir, SALT_FILE);
  try {
    const existing = (await readFile(file, "utf8")).trim();
    if (existing.length >= 16) return existing;
  } catch {
    /* missing */
  }
  await mkdir(dir, { recursive: true });
  const salt = randomBytes(24).toString("hex");
  await writeFile(file, `${salt}\n`, { mode: 0o600 });
  return salt;
}

/** Fields never collected or transmitted for the profile contract (documentation + guard rails). */
export const SENSITIVE_FIELD_DENYLIST = [
  "serial_number",
  "hardware_uuid",
  "username",
  "hostname",
  "ssh_keys",
  "env_secrets",
  "file_contents",
] as const;
