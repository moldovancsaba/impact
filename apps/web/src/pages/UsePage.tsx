import { Anchor, Code, List, Stack, Text } from "@mantine/core";
import { ArticleSection } from "../components/ArticleSection";
import { PageHeader } from "../components/PageHeader";
import { PublicShell } from "../components/PublicShell";

export function UsePage() {
  return (
    <PublicShell pageId="use">
      <PageHeader
        crumb={[{ label: "Home", href: "/" }, { label: "Run & results" }]}
        title="Run IMPACT — from curiosity to a clear picture"
        lead="Four small steps. Everything stays on your disk until you explicitly opt into submission."
      />

      <ArticleSection>
        <List type="ordered" spacing="md" c="dimmed">
          <List.Item>
            <strong>Install</strong> — <Anchor href="/install.html">Install page</Anchor> (Path B today; npm after #34).
          </List.Item>
          <List.Item>
            <strong>Run one command</strong>
            <Code block mt="xs">
              impact scan --no-submit -o ./reports
            </Code>
          </List.Item>
          <List.Item>
            <strong>Open the HTML report</strong> — <Code>impact-report.html</Code> in your output folder. Same facts as
            JSON, with provenance and suggested next steps.
          </List.Item>
          <List.Item>
            <strong>(Optional)</strong> Inspect <Code>impact-profile.json</Code> or use the in-browser{" "}
            <Anchor href="/profile.html">Profile preview</Anchor> — parsing only, no upload.
          </List.Item>
        </List>
      </ArticleSection>

      <ArticleSection title="Understand the report">
        <List c="dimmed">
          <List.Item>
            <strong>Host</strong> — OS, architecture, coarse memory/disk hints, machine class (not a benchmark).
          </List.Item>
          <List.Item>
            <strong>Runtimes</strong> — e.g. Ollama installed vs API reachable; MLX may be <strong>partial</strong> with
            honest notes.
          </List.Item>
          <List.Item>
            <strong>Tools</strong> — allowlisted tools found on <Code>PATH</Code>; others are intentionally ignored.
          </List.Item>
          <List.Item>
            <strong>Models</strong> — what local APIs returned during the scan; empty does not mean “no models on earth.”
          </List.Item>
        </List>
      </ArticleSection>

      <ArticleSection title="What reachable, partial, and unknown mean">
        <Stack gap="sm">
          <Text c="dimmed">
            On <strong>runtimes</strong>, <strong>status</strong> is operational (e.g. installed but API not responding =
            <Code>installed_unreachable</Code>). <strong>Partial</strong> means we surface honest limits (e.g. MLX pip
            detection without full model inventory). <strong>Unknown</strong> means we could not classify reliably on this
            platform.
          </Text>
          <Text c="dimmed" size="sm">
            Normative vocabulary:{" "}
            <Anchor href="https://github.com/sovereignsquad/impact/blob/main/docs/schema-semantics-v0.3.md">
              schema-semantics-v0.3.md
            </Anchor>
            .
          </Text>
        </Stack>
      </ArticleSection>

      <ArticleSection title="What to do next">
        <Text c="dimmed">
          Follow <strong>Suggested next steps</strong> in the HTML report (deterministic hints from your profile). Typical
          actions: start a local runtime, re-scan, or review disk/memory hints — not “buy hardware X.”
        </Text>
      </ArticleSection>

      <Text mt="lg">
        <Anchor href="/profile.html">Try the profile preview in your browser →</Anchor> ·{" "}
        <Anchor href="/submit.html">Optional submission →</Anchor>
      </Text>
    </PublicShell>
  );
}
