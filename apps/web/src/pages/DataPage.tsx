import { Anchor, Badge, Card, Grid, Stack, Text } from "@mantine/core";
import { useEffect, useState, type ReactNode } from "react";
import { PageHeader } from "../components/PageHeader";
import { PublicShell } from "../components/PublicShell";
import { StateBlock } from "../components/StateBlock";
import { StatsTable, type StatsBucket } from "../components/StatsTable";
import { statsJsonUrl } from "../stats-api-url";

type FullStats = {
  schema_version: string;
  generated_at: string;
  submission_count: number;
  below_global_threshold: boolean;
  privacy: { min_bucket_count: number; suppressed_small_buckets: boolean };
  hardware: {
    machine_class: StatsBucket[];
    chip: StatsBucket[];
    memory_band: StatsBucket[];
    os_name: StatsBucket[];
    architecture: StatsBucket[];
  };
  tools: {
    runtime_id: StatsBucket[];
    runtime_by_status: StatsBucket[];
    tool_id: StatsBucket[];
  };
  models: {
    by_id_locality: StatsBucket[];
  };
};

function PlaceholderCard({
  title,
  issue,
  description,
  live,
}: {
  title: string;
  issue: string;
  description: string;
  live: ReactNode | null;
}) {
  return (
    <Card withBorder padding="lg" radius="md">
      <Text fw={600} mb="sm">
        {title}
      </Text>
      {live ?? (
        <>
          <Badge color="red" variant="light" mb="sm">
            Coming soon — live when sufficient data exists
          </Badge>
          <Text size="sm" c="dimmed">
            {description}
          </Text>
          <Text size="xs" c="dimmed" mt="xs">
            Issue: <Anchor href={issue}>{issue.replace("https://github.com/sovereignsquad/impact/issues/", "#")}</Anchor>
          </Text>
        </>
      )}
    </Card>
  );
}

export function DataPage() {
  const [status, setStatus] = useState<string | null>(null);
  const [stats, setStats] = useState<FullStats | null>(null);
  const [error, setError] = useState<string | null>(null);

  const apiBase = (import.meta.env.VITE_STATS_API_BASE ?? "").trim().replace(/\/$/, "");

  useEffect(() => {
    if (!apiBase) return;
    setStatus("Loading aggregate stats…");
    void (async () => {
      try {
        const res = await fetch(statsJsonUrl(apiBase, "full"), { headers: { Accept: "application/json" } });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = (await res.json()) as FullStats;
        setStats(data);
        setStatus(`Live data from ingest (as of ${data.generated_at}, schema ${data.schema_version}).`);
        setError(null);
      } catch (e) {
        const msg = e instanceof Error ? e.message : "Unknown error";
        setError(msg);
        setStatus(`Could not load stats from ${apiBase} (${msg}). Placeholder copy below still applies.`);
      }
    })();
  }, [apiBase]);

  const thresholdNote = stats ? (
    <Text size="sm" c="dimmed" mb="md">
      {stats.below_global_threshold ? (
        <>
          Total submissions ({stats.submission_count}) are below the server minimum ({stats.privacy.min_bucket_count}) for
          publishing dimension breakdowns.
        </>
      ) : (
        <>
          Buckets require at least <strong>{stats.privacy.min_bucket_count}</strong> submissions each; smaller groups are
          omitted.
        </>
      )}
    </Text>
  ) : null;

  const hwLive = stats ? (
    <Stack gap="xs">
      {thresholdNote}
      <StatsTable title="Machine class" rows={stats.hardware.machine_class} />
      <StatsTable title="Chip" rows={stats.hardware.chip} />
      <StatsTable title="Memory band" rows={stats.hardware.memory_band} />
      <StatsTable title="OS" rows={stats.hardware.os_name} />
      <StatsTable title="Architecture" rows={stats.hardware.architecture} />
    </Stack>
  ) : null;

  const toolsLive = stats ? (
    <Stack gap="xs">
      {thresholdNote}
      <StatsTable title="Runtime ID" rows={stats.tools.runtime_id} />
      <StatsTable title="Runtime × status" rows={stats.tools.runtime_by_status} />
      <StatsTable title="Tool ID" rows={stats.tools.tool_id} />
    </Stack>
  ) : null;

  const modelsLive = stats ? (
    <Stack gap="xs">
      {thresholdNote}
      <StatsTable title="Model × locality" rows={stats.models.by_id_locality} />
    </Stack>
  ) : null;

  return (
    <PublicShell pageId="data">
      <PageHeader
        crumb={[{ label: "Home", href: "/" }, { label: "Community data" }]}
        title="Community data"
        lead={
          <>
            This area shows <strong>aggregate</strong> views of what the community runs — hardware, tools/runtimes, and
            models — without exposing individual submissions. When the site is built with a stats API base URL, tables are{" "}
            <strong>updated from submitted profiles</strong> subject to server privacy thresholds. Otherwise you see honest
            placeholders only — <strong>no fake live numbers.</strong>
          </>
        }
      />

      <StateBlock title="Status">
        Structure ships first. <strong>Live charts and counts</strong> appear only when ingest is operational, enough
        opted-in submissions exist, and <strong>privacy thresholds</strong> allow publication. See programme issues{" "}
        <Anchor href="https://github.com/sovereignsquad/impact/issues/48">#48</Anchor> and{" "}
        <Anchor href="https://github.com/sovereignsquad/impact/issues/51">#51</Anchor>–
        <Anchor href="https://github.com/sovereignsquad/impact/issues/53">#53</Anchor>.
      </StateBlock>

      {status ? (
        <Text size="sm" c="dimmed" mb="md">
          {status}
        </Text>
      ) : null}
      {error && !stats ? (
        <Text size="sm" c="red" mb="md">
          {error}
        </Text>
      ) : null}

      <Grid gutter="md" mb="lg">
        <Grid.Col span={{ base: 12, md: 4 }}>
          <PlaceholderCard
            title="Hardware tested"
            issue="https://github.com/sovereignsquad/impact/issues/51"
            description="Planned aggregates: machine classes, chip families, memory bands, OS/platform distribution."
            live={hwLive}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 4 }}>
          <PlaceholderCard
            title="Tools & runtimes tested"
            issue="https://github.com/sovereignsquad/impact/issues/52"
            description="Planned aggregates: detected runtime/tool families (e.g. Ollama, MLX) and counts by family as profiles report them."
            live={toolsLive}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 4 }}>
          <PlaceholderCard
            title="LLMs / models tested"
            issue="https://github.com/sovereignsquad/impact/issues/53"
            description="Planned aggregates: normalised model families, local vs cloud split where schema allows, runtime associations."
            live={modelsLive}
          />
        </Grid.Col>
      </Grid>

      <Text c="dimmed" size="sm">
        Information architecture: <Anchor href="https://github.com/sovereignsquad/impact/issues/50">#50</Anchor>.
        Contribute optionally via <Anchor href="/submit.html">Submit</Anchor>.
      </Text>
    </PublicShell>
  );
}
