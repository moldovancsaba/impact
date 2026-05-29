#!/usr/bin/env node
/**
 * Ensures @gds/* packages are built and installable via file: deps before npm ci resolves workspaces.
 * SSOT: https://github.com/sovereignsquad/general-design-system (see gds.version)
 */
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const gdsVersion = readFileSync(join(root, "gds.version"), "utf8").trim();
const gdsRoot =
  process.env.GDS_REPO_PATH?.trim() ||
  join(root, ".gds-src");
const gdsRemote = process.env.GDS_REPO_URL?.trim() || "https://github.com/sovereignsquad/general-design-system.git";
const gdsTag = `gds-v${gdsVersion}`;
const stampPath = join(gdsRoot, ".gds-prepared");
const themeDist = join(gdsRoot, "packages/gds-theme/dist/index.mjs");
const coreDist = join(gdsRoot, "packages/gds-core/dist/index.mjs");
const complianceEntry = join(gdsRoot, "packages/gds-compliance/index.js");
const eslintEntry = join(gdsRoot, "packages/gds-eslint-config/index.js");

function run(cmd, args, cwd = root) {
  execFileSync(cmd, args, { cwd, stdio: "inherit", env: process.env });
}

function readGdsRepoVersion() {
  const versionFile = join(gdsRoot, "VERSION");
  if (existsSync(versionFile)) {
    return readFileSync(versionFile, "utf8").trim();
  }
  const pkg = join(gdsRoot, "packages/gds-theme/package.json");
  if (existsSync(pkg)) {
    return JSON.parse(readFileSync(pkg, "utf8")).version;
  }
  return null;
}

function ensureClone() {
  if (existsSync(join(gdsRoot, ".git"))) {
    return;
  }
  if (existsSync(gdsRoot)) {
    run("rm", ["-rf", gdsRoot]);
  }
  run("git", ["clone", "--depth", "1", gdsRemote, gdsRoot]);
}

function checkoutPinnedTag() {
  if (!existsSync(join(gdsRoot, ".git"))) {
    return;
  }
  run("git", ["fetch", "origin", `refs/tags/${gdsTag}:refs/tags/${gdsTag}`, "--depth", "1"], gdsRoot);
  run("git", ["checkout", gdsTag], gdsRoot);
}

function buildPackages() {
  if (!existsSync(join(gdsRoot, "package.json"))) {
    throw new Error(`GDS root missing at ${gdsRoot}`);
  }
  run("npm", ["ci"], gdsRoot);
  run(
    "npm",
    ["run", "build", "--workspace=@doneisbetter/gds-theme", "--workspace=@doneisbetter/gds-core"],
    gdsRoot,
  );
  if (
    !existsSync(themeDist) ||
    !existsSync(coreDist) ||
    !existsSync(complianceEntry) ||
    !existsSync(eslintEntry)
  ) {
    throw new Error("GDS build did not produce required @doneisbetter/gds-* package outputs");
  }
}

function needsBuild() {
  if (!existsSync(stampPath)) {
    return true;
  }
  const stamp = readFileSync(stampPath, "utf8").trim();
  if (stamp !== gdsVersion) {
    return true;
  }
  const repoVersion = readGdsRepoVersion();
  if (repoVersion && repoVersion !== gdsVersion) {
    console.warn(`GDS repo version ${repoVersion} differs from pinned gds.version ${gdsVersion}`);
  }
  return (
    !existsSync(themeDist) ||
    !existsSync(coreDist) ||
    !existsSync(complianceEntry) ||
    !existsSync(eslintEntry)
  );
}

function markPrepared() {
  writeFileSync(stampPath, `${gdsVersion}\n`, "utf8");
}

function main() {
  if (process.env.SKIP_GDS_PREPARE === "1") {
    console.log("SKIP_GDS_PREPARE=1 — skipping GDS prepare");
    return;
  }

  if (!process.env.GDS_REPO_PATH) {
    ensureClone();
    checkoutPinnedTag();
  } else if (!existsSync(gdsRoot)) {
    throw new Error(`GDS_REPO_PATH does not exist: ${gdsRoot}`);
  }

  if (needsBuild()) {
    console.log(`Preparing GDS ${gdsVersion} (${gdsTag}) at ${gdsRoot}…`);
    if (!process.env.GDS_REPO_PATH) {
      checkoutPinnedTag();
    }
    buildPackages();
    markPrepared();
  } else {
    console.log(`GDS ${gdsVersion} already prepared at ${gdsRoot}`);
  }
}

try {
  main();
} catch (err) {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
}
