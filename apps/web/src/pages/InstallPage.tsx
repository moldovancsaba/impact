import { DocsPageShell, StateBlock } from "@doneisbetter/gds-core/client";
import { Anchor, Code, List, Stack, Text, Title } from "@mantine/core";
import { ImpactShell } from "../shell/impact-shell";

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
    <ImpactShell pageId="install">
      <DocsPageShell
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
        </Stack>

        <Stack gap="sm" mb="lg">
          <Title order={2}>Prerequisites</Title>
          <List c="dimmed">
            <List.Item>
              Node.js <strong>20+</strong>
            </List.Item>
            <List.Item>Git (for Path B)</List.Item>
            <List.Item>macOS 13+ recommended for host probes</List.Item>
          </List>
        </Stack>

        <Stack gap="sm" mb="lg">
          <Title order={2}>After install — expected outputs</Title>
          <Code block>{AFTER_INSTALL}</Code>
          <Text c="dimmed" size="sm">
            Artifacts: <Code>impact-profile.json</Code>, <Code>impact-report.html</Code>. Nothing is uploaded with{" "}
            <Code>--no-submit</Code>.
          </Text>
        </Stack>

        <Stack gap="sm" mb="lg">
          <Title order={2}>Troubleshooting</Title>
          <List c="dimmed">
            <List.Item>
              <strong>404 on npm</strong> — check registry scope <Code>@doneisbetter/cli</Code> or use Path B.
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
        </Stack>
      </DocsPageShell>
    </ImpactShell>
  );
}
