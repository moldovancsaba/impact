#!/usr/bin/env node
/**
 * GDS drift guard for @impact/web — forbid raw CSS color literals in feature TSX.
 */
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const webSrc = path.join(root, "apps/web/src");
const allow = new Set([
  path.join(webSrc, "theme", "gds-theme-base.ts"),
  path.join(webSrc, "theme", "impact-theme.ts"),
]);

const hexRe = /#[0-9a-fA-F]{3,8}\b/g;
const rgbRe = /\brgb\s*\(/g;

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const e of entries) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) files.push(...(await walk(p)));
    else if (e.name.endsWith(".tsx")) files.push(p);
  }
  return files;
}

const violations = [];
for (const file of await walk(webSrc)) {
  if (allow.has(file)) continue;
  const text = await readFile(file, "utf8");
  for (const re of [hexRe, rgbRe]) {
    re.lastIndex = 0;
    if (re.test(text)) {
      violations.push(`${path.relative(root, file)}: raw color literal (${re.source})`);
      break;
    }
  }
}

if (violations.length > 0) {
  console.error("GDS lint failed:\n" + violations.join("\n"));
  process.exit(1);
}
console.log("GDS web lint OK");
