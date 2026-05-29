#!/usr/bin/env node
/**
 * Validate JSON fixtures against @doneisbetter/schemas (build first: npm run build).
 * Recurses under fixtures/ but skips any path segment named "invalid".
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { pathToFileURL } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const schemaEntry = join(root, "packages/schemas/dist/index.js");

const { validateImpactProfile } = await import(pathToFileURL(schemaEntry).href);

function walkJsonFiles(dir) {
  const out = [];
  let names = [];
  try {
    names = readdirSync(dir);
  } catch {
    return out;
  }
  for (const n of names) {
    if (n === "invalid") continue;
    const p = join(dir, n);
    const st = statSync(p);
    if (st.isDirectory()) out.push(...walkJsonFiles(p));
    else if (n.endsWith(".json")) out.push(p);
  }
  return out;
}

const files = walkJsonFiles(join(root, "fixtures")).sort();

let failed = false;
for (const f of files) {
  const raw = readFileSync(f, "utf8");
  let data;
  try {
    data = JSON.parse(raw);
  } catch (e) {
    console.error(`FAIL ${f}: invalid JSON`, e);
    failed = true;
    continue;
  }
  try {
    validateImpactProfile(data);
    console.log(`OK   ${f}`);
  } catch (e) {
    console.error(`FAIL ${f}:`, e.message ?? e);
    failed = true;
  }
}

if (failed) process.exit(1);
