import { Anchor, Code, List, Text } from "@mantine/core";
import { ArticleSection } from "../components/ArticleSection";
import { PageHeader } from "../components/PageHeader";
import { PublicShell } from "../components/PublicShell";

export function SubmitPage() {
  return (
    <PublicShell pageId="submit">
      <PageHeader
        crumb={[{ label: "Home", href: "/" }, { label: "Submit" }]}
        title="Submit a result (optional)"
        lead={
          <>
            Submission is <strong>off by default</strong>. IMPACT never uploads your scan unless you configure an endpoint
            and explicitly confirm. This page explains what that means and how it relates to future{" "}
            <Anchor href="/data.html">community data</Anchor>.
          </>
        }
      />

      <ArticleSection title="What submission is">
        <Text c="dimmed">
          An <strong>optional</strong> HTTP POST of a <strong>privacy-shaped profile</strong> to a server you or your
          organisation configure (<Code>IMPACT_SUBMIT_URL</Code>). It is designed to support anonymous, aggregate statistics
          — not to identify you.
        </Text>
      </ArticleSection>

      <ArticleSection title="What is sent (when you opt in)">
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
      </ArticleSection>

      <ArticleSection title="What is not sent by default">
        <List c="dimmed">
          <List.Item>
            <strong>Nothing</strong> without configuration + consent — default scan is local-only.
          </List.Item>
          <List.Item>
            No raw serials, hardware UUIDs, usernames, hostnames as identifiers, or arbitrary file contents (see privacy
            docs).
          </List.Item>
        </List>
      </ArticleSection>

      <ArticleSection title="Preview and receipt">
        <Text c="dimmed">
          The CLI can write <Code>impact-submission-preview.json</Code> (exact outbound body) and, after an attempt,{" "}
          <Code>impact-submission-receipt.json</Code> plus a local log under <Code>~/.impact/</Code> — so you keep a record
          on your machine.
        </Text>
      </ArticleSection>

      <ArticleSection title="How this powers historical data">
        <Text c="dimmed">
          <Anchor href="/data.html">Community data</Anchor> on this site will show <strong>aggregates</strong> only after an
          ingest pipeline exists, enough submissions exist, and <strong>privacy thresholds</strong> are met. Your row does
          not appear instantly on the website; counts update on the server’s schedule and policy.
        </Text>
      </ArticleSection>

      <ArticleSection title="Trust">
        <Text c="dimmed">
          Read{" "}
          <Anchor href="https://github.com/sovereignsquad/impact/blob/main/docs/privacy-for-users.md">privacy for users</Anchor>{" "}
          and the formal{" "}
          <Anchor href="https://github.com/sovereignsquad/impact/blob/main/docs/privacy-policy.md">privacy policy</Anchor>.
        </Text>
      </ArticleSection>

      <Text mt="lg">
        <Anchor href="/use.html">← Back to run &amp; results</Anchor> · <Anchor href="/data.html">Community data →</Anchor>
      </Text>
    </PublicShell>
  );
}
