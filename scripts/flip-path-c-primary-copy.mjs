#!/usr/bin/env node
/**
 * After #34: flip install/home copy so Path C (npm) is primary. Run only when @doneisbetter/cli is on npm.
 */
import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

try {
  execFileSync("npm", ["view", "@doneisbetter/cli", "version"], { stdio: "pipe" });
} catch {
  console.error("Refusing flip: @doneisbetter/cli is not on npm. Close #34 first.");
  process.exit(1);
}

const homePath = join(root, "apps/web/src/pages/HomePage.tsx");
let home = readFileSync(homePath, "utf8");

const installBlockOld = `        <StateBlock
          variant="info"
          title="Install reality today"
          compact
          description={
            <>
              The verified path is <strong>install from source (Path B)</strong>.{" "}
              <Text component="code" span>
                npm install -g @doneisbetter/cli
              </Text>{" "}
              becomes the primary public path only after{" "}
              <Anchor href="https://github.com/sovereignsquad/impact/issues/34">#34</Anchor> is closed (publish + smoke +
              evidence). We do not pretend npm is live until then.
            </>
          }
        />`;

const installBlockNew = `        <StateBlock
          variant="success"
          title="Install from npm (Path C)"
          compact
          description={
            <>
              Primary install: <Text component="code" span>npm install -g @doneisbetter/cli</Text>. From-source (Path B) remains
              documented on the <Anchor href="/install.html">install page</Anchor> for contributors and air-gapped setups.
            </>
          }
        />`;

if (!home.includes(installBlockOld)) {
  if (home.includes("Install from npm (Path C)")) {
    console.log("HomePage already flipped.");
  } else {
    console.error("HomePage install block not found — manual #44 update needed.");
    process.exit(1);
  }
} else {
  home = home.replace(installBlockOld, installBlockNew);
  writeFileSync(homePath, home);
  console.log("Updated HomePage.tsx");
}

const installPath = join(root, "apps/web/src/pages/InstallPage.tsx");
let install = readFileSync(installPath, "utf8");

const pathCFirst = `      <DocsPageShell
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Install" }]}
        title="Install IMPACT"
        lead={
          <>
            <strong>Primary:</strong> <Code>npm install -g @doneisbetter/cli</Code> (macOS 13+ recommended).{" "}
            <strong>Alternative:</strong> install from source (Path B) below. Windows is experimental — see{" "}
            <Anchor href="https://github.com/sovereignsquad/impact/blob/main/docs/support-matrix.md">support matrix</Anchor>.
          </>
        }
        footerNext={{ label: "Run a scan and open your report →", href: "/use.html" }}
      >
        <StateBlock
          variant="success"
          title="Path C — npm (primary)"
          compact
          description={
            <>
              <Code block>npm install -g @doneisbetter/cli</Code>
              <Text c="dimmed" size="sm" mt="xs">
                Verify: <Code>impact --version</Code> then run a scan (see below).
              </Text>
            </>
          }
        />

        <StateBlock
          variant="info"
          title="Path B — from source (alternative)"
          compact
          description="Use when you need a pinned repo checkout or cannot use the public registry."
        />

        <Stack gap="sm" mb="lg">
          <Title order={2}>Path B — from source</Title>
          <Text c="dimmed">Requires Git, Node.js 20+, and npm.</Text>
          <Code block>{PATH_B}</Code>
          <Text c="dimmed" size="sm">
            Optional: pin to release tag <Code>v0.3.0</Code> before <Code>npm ci</Code> if you want a known release.
          </Text>
        </Stack>`;

const prereqMarker =
  '      <Stack gap="sm" mb="lg">\n          <Title order={2}>Prerequisites</Title>';

if (install.includes("Path C — npm (primary)")) {
  console.log("InstallPage already flipped.");
} else {
  const start = install.indexOf("      <DocsPageShell");
  const end = install.indexOf(prereqMarker);
  if (start === -1 || end === -1) {
    console.error("InstallPage structure changed — manual #44 update needed.");
    process.exit(1);
  }
  install = install.slice(0, start) + pathCFirst + "\n\n        " + install.slice(end);
  writeFileSync(installPath, install);
  console.log("Updated InstallPage.tsx");
}

console.log("Path C primary copy applied. Rebuild web and redeploy.");
