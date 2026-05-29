import { PageHeader, StateBlock } from "@doneisbetter/gds-core/client";
import { Accordion, Anchor, Badge, Button, Group, List, Stack, Text } from "@mantine/core";
import { ImpactShell } from "../shell/impact-shell";

export function HomePage() {
  return (
    <ImpactShell pageId="home">
      <Stack gap="lg" pt="md">
        <Badge variant="light" color="teal" w="fit-content">
          Privacy-first · Local scan · No benchmark hype
        </Badge>
        <PageHeader
          eyebrow="Discovery, not benchmarks"
          title="See what your machine can run for local AI — without uploading your environment"
          description="IMPACT inventories your OS, runtimes, tools, and models, then writes an offline HTML report and JSON profile. Submission is optional and only after you configure an endpoint and confirm. This is discovery and provenance, not a performance score."
        />

        <StateBlock
          variant="success"
          title="Install from npm (Path C)"
          compact
          description={
            <>
              Primary install: <Text component="code" span>npm install -g @doneisbetter/cli</Text>. From-source (Path B) remains
              documented on the <Anchor href="/install.html">install page</Anchor> for contributors and air-gapped setups.
            </>
          }
        />

        <Group>
          <Button component="a" href="/install.html">
            Install IMPACT
          </Button>
          <Button component="a" href="/data.html" variant="default">
            Explore community data
          </Button>
        </Group>
        <Group gap="sm">
          <Button component="a" href="/use.html" variant="subtle" size="sm">
            Run a scan &amp; open your report
          </Button>
          <Button component="a" href="/submit.html" variant="subtle" size="sm">
            How optional submission works
          </Button>
        </Group>

        <Stack gap="sm">
          <Text fw={600} size="lg">
            What you get in under a minute
          </Text>
          <List spacing="xs" c="dimmed">
            <List.Item>
              <Text span c="var(--mantine-color-text)" fw={600}>
                Local inventory
              </Text>{" "}
              — what is installed, reachable, and how confidently we know it.
            </List.Item>
            <List.Item>
              <Text span c="var(--mantine-color-text)" fw={600}>
                Readable report
              </Text>{" "}
              — open <Text component="code" span>impact-report.html</Text> in a browser after one command.
            </List.Item>
            <List.Item>
              <Text span c="var(--mantine-color-text)" fw={600}>
                Optional community loop
              </Text>{" "}
              — submit an anonymous payload if you choose; aggregates on this site will appear only when ingest and
              privacy thresholds are met (<Anchor href="/data.html">Community data</Anchor>).
            </List.Item>
          </List>
          <Text size="sm" c="dimmed">
            Not shipped: benchmark leaderboards, DMG/app installer, or “AI readiness” scores — see{" "}
            <Anchor href="https://github.com/sovereignsquad/impact/blob/main/docs/current-state.md">current-state.md</Anchor>.
          </Text>
        </Stack>

        <Text fw={600} size="lg">
          FAQ
        </Text>
        <Accordion variant="separated">
          <Accordion.Item value="upload">
            <Accordion.Control>Does IMPACT upload my data?</Accordion.Control>
            <Accordion.Panel>
              No by default. Scans stay on your machine unless you opt into submission. See{" "}
              <Anchor href="https://github.com/sovereignsquad/impact/blob/main/docs/privacy-for-users.md">
                privacy for users
              </Anchor>
              .
            </Accordion.Panel>
          </Accordion.Item>
          <Accordion.Item value="benchmark">
            <Accordion.Control>Is this a benchmark?</Accordion.Control>
            <Accordion.Panel>
              No. v0.x is honest <strong>discovery</strong> and export. Benchmarks are programme roadmap, not current
              product claims.
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>
      </Stack>
    </ImpactShell>
  );
}
