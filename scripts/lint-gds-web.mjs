#!/usr/bin/env node
/**
 * GDS enforcement for @impact/web — adoption manifest + compliance scan.
 */
import { execFileSync } from "node:child_process";
import { existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const manifest = join(root, "apps/web/gds-adoption.json");
const complianceBin = join(root, "node_modules/@gds/compliance/bin/gds-compliance.js");

if (!existsSync(manifest)) {
  console.error(`Missing GDS adoption manifest: ${manifest}`);
  process.exit(1);
}

if (!existsSync(complianceBin)) {
  console.error("Missing @gds/compliance — run npm ci (preinstall prepares GDS packages).");
  process.exit(1);
}

execFileSync(process.execPath, [complianceBin, "check", "--manifest", manifest], {
  cwd: join(root, "apps/web"),
  stdio: "inherit",
});

console.log("GDS web compliance OK");
