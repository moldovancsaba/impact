import { DocsPageShell } from "@gds/core/client";
import { Anchor, Code, List, Stack, Text, Title } from "@mantine/core";
import { ImpactShell } from "../shell/impact-shell";

export function SubmitPage() {
  return (
    <ImpactShell pageId="submit">
      <DocsPageShell
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Submit" }]}
        title="Submit a result (optional)"
        lead={
          <>
            Submission is <strong>off by default</strong>. IMPACT never uploads your scan unless you configure an endpoint
            and explicitly confirm. This page explains what that means and how it relates to future{" "}
            <Anchor href="/data.html">community data</Anchor>.
          </>
        }
      >
        <Stack gap="sm" mb="lg">
          <Title order={2}>What submission is</Title>
          <Text c="dimmed">
            An <strong>optional</strong> HTTP POST of a <strong>privacy-shaped profile</strong> to a server you or your
            organisation configure (<Code>IMPACT_SUBMIT_URL</Code>). It is designed to support anonymous, aggregate statistics
            — not to identify you.
          </Text>
        </Stack>

        <Stack gap="sm" mb="lg">
          <Title order={2}>What is sent (when you opt in)</Title>
          <List c="dimmed">
            <List.Item>
              The same structured profile fields the CLI can write to <Code>impact-submission-preview.json</Code> — inspect
              that file before sending.
            </List.Item>
            <List.Item>
              Payload is defined in{" "}
              <Anchor href="https://github.com/sovereignsquad/impact/blob/main/docs/submission-contract.md">
                submission-contract.md
              </Anchor>
              .
            </List.Item>
          </List>
        </Stack>

        <Stack gap="sm" mb="lg">
          <Title order={2}>What is not sent by default</Title>
          <List c="dimmed">
            <List.Item>
              <strong>Nothing</strong> without configuration + consent — default scan is local-only.
            </List.Item>
            <List.Item>
              No raw serials, hardware UUIDs, usernames, hostnames as identifiers, or arbitrary file contents (see privacy
              docs).
            </List.Item>
          </List>
        </Stack>

        <Stack gap="sm" mb="lg">
          <Title order={2}>Preview and receipt</Title>
          <Text c="dimmed">
            The CLI can write <Code>impact-submission-preview.json</Code> (exact outbound body) and, after an attempt,{" "}
            <Code>impact-submission-receipt.json</Code> plus a local log under <Code>~/.impact/</Code> — so you keep a record
            on your machine.
          </Text>
        </Stack>

        <Stack gap="sm" mb="lg">
          <Title order={2}>How this powers historical data</Title>
          <Text c="dimmed">
            <Anchor href="/data.html">Community data</Anchor> on this site will show <strong>aggregates</strong> only after an
            ingest pipeline exists, enough submissions exist, and <strong>privacy thresholds</strong> are met. Your row does
            not appear instantly on the website; counts update on the server’s schedule and policy.
          </Text>
        </Stack>

        <Stack gap="sm" mb="lg">
          <Title order={2}>Trust</Title>
          <Text c="dimmed">
            Read{" "}
            <Anchor href="https://github.com/sovereignsquad/impact/blob/main/docs/privacy-for-users.md">privacy for users</Anchor>{" "}
            and the formal{" "}
            <Anchor href="https://github.com/sovereignsquad/impact/blob/main/docs/privacy-policy.md">privacy policy</Anchor>.
          </Text>
        </Stack>

        <Text>
          <Anchor href="/use.html">← Back to run &amp; results</Anchor> · <Anchor href="/data.html">Community data →</Anchor>
        </Text>
      </DocsPageShell>
    </ImpactShell>
  );
}
