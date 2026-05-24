import { Anchor, Code, List, Text } from "@mantine/core";
import { ArticleSection } from "../components/ArticleSection";
import { PageHeader } from "../components/PageHeader";
import { PublicShell } from "../components/PublicShell";
import { StateBlock } from "../components/StateBlock";

const PATH_B = `git clone https://github.com/sovereignsquad/impact.git
cd impact
npm ci
npm run build
npm install -g ./apps/cli`;

const AFTER_INSTALL = `mkdir -p ./reports
impact scan --no-submit -o ./reports
open ./reports/impact-report.html`;

export function InstallPage() {
  return (
    <PublicShell pageId="install">
      <PageHeader
        crumb={[{ label: "Home", href: "/" }, { label: "Install" }]}
        title="Install IMPACT"
        lead={
          <>
            IMPACT runs as a CLI on your machine. <strong>macOS</strong> is the supported primary path; Linux is partial;
            Windows is experimental — see{" "}
            <Anchor href="https://github.com/sovereignsquad/impact/blob/main/docs/support-matrix.md">support matrix</Anchor>.
          </>
        }
      />

      <StateBlock title="Path C (npm)">
        <Code>npm install -g @impact/cli</Code> is <strong>not</strong> the live primary install until{" "}
        <Anchor href="https://github.com/sovereignsquad/impact/issues/34">#34</Anchor> is closed with publish, verify,
        smoke, and evidence. Until then, use <strong>Path B</strong> below.
      </StateBlock>

      <ArticleSection title="Path B — from source (verified today)">
        <Text c="dimmed">Requires Git, Node.js 20+, and npm.</Text>
        <Code block>{PATH_B}</Code>
        <Text c="dimmed" size="sm">
          Optional: pin to release tag <Code>v0.3.0</Code> before <Code>npm ci</Code> if you want a known release.
        </Text>
      </ArticleSection>

      <ArticleSection title="Path C — npm registry (after #34)">
        <Text c="dimmed">When the package is public and verified:</Text>
        <Code block>npm install -g @impact/cli</Code>
        <Text c="dimmed" size="sm">
          Track progress on <Anchor href="https://github.com/sovereignsquad/impact/issues/34">issue #34</Anchor>.
        </Text>
      </ArticleSection>

      <ArticleSection title="Prerequisites">
        <List c="dimmed">
          <List.Item>
            Node.js <strong>20+</strong>
          </List.Item>
          <List.Item>Git (for Path B)</List.Item>
          <List.Item>macOS 13+ recommended for host probes</List.Item>
        </List>
      </ArticleSection>

      <ArticleSection title="After install — expected outputs">
        <Code block>{AFTER_INSTALL}</Code>
        <Text c="dimmed" size="sm">
          Artifacts: <Code>impact-profile.json</Code>, <Code>impact-report.html</Code>. Nothing is uploaded with{" "}
          <Code>--no-submit</Code>.
        </Text>
      </ArticleSection>

      <ArticleSection title="Troubleshooting">
        <List c="dimmed">
          <List.Item>
            <strong>404 on npm</strong> — package not published yet; use Path B.
          </List.Item>
          <List.Item>
            <strong>EACCES</strong> on global install — use a user-owned npm prefix or a Node version manager.
          </List.Item>
          <List.Item>
            <strong>command not found: impact</strong> — ensure npm’s global bin directory is on your <Code>PATH</Code>.
          </List.Item>
        </List>
        <Text c="dimmed" size="sm">
          Full detail:{" "}
          <Anchor href="https://github.com/sovereignsquad/impact/blob/main/docs/install-macos.md">install-macos.md</Anchor>.
        </Text>
      </ArticleSection>

      <Text mt="lg">
        Next: <Anchor href="/use.html">Run a scan and open your report →</Anchor>
      </Text>
    </PublicShell>
  );
}
