#!/usr/bin/env node
/**
 * Ensures @gds/* packages are built and installable via file: deps before npm ci resolves workspaces.
 * SSOT: https://github.com/sovereignsquad/general-design-system (see gds.version)
 */
import { execFileSync, execSync } from "node:child_process";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const gdsVersion = readFileSync(join(root, "gds.version"), "utf8").trim();
const gdsRoot =
  process.env.GDS_REPO_PATH?.trim() ||
  join(root, ".gds-src");
const gdsRemote = process.env.GDS_REPO_URL?.trim() || "https://github.com/sovereignsquad/general-design-system.git";
const stampPath = join(gdsRoot, ".gds-prepared");
const themeDist = join(gdsRoot, "packages/gds-theme/dist/index.mjs");
const coreDist = join(gdsRoot, "packages/gds-core/dist/index.mjs");

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

function refreshSource() {
  if (!existsSync(join(gdsRoot, ".git"))) {
    return;
  }
  run("git", ["fetch", "--depth", "1", "origin"], gdsRoot);
  run("git", ["checkout", "main"], gdsRoot);
  run("git", ["pull", "--ff-only", "origin", "main"], gdsRoot);
}

function buildPackages() {
  if (!existsSync(join(gdsRoot, "package.json"))) {
    throw new Error(`GDS root missing at ${gdsRoot}`);
  }
  run("npm", ["ci"], gdsRoot);
  run("npm", ["run", "build", "--workspace=@gds/theme", "--workspace=@gds/core"], gdsRoot);
  if (!existsSync(themeDist) || !existsSync(coreDist)) {
    throw new Error("GDS build did not produce dist/ for @gds/theme or @gds/core");
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
  return !existsSync(themeDist) || !existsSync(coreDist);
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
    refreshSource();
  } else if (!existsSync(gdsRoot)) {
    throw new Error(`GDS_REPO_PATH does not exist: ${gdsRoot}`);
  }

  if (needsBuild()) {
    console.log(`Preparing GDS ${gdsVersion} at ${gdsRoot}…`);
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
