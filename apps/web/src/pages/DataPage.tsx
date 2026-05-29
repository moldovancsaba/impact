import { DocsPageShell, PlaceholderPanel, SimpleDataTable, StateBlock } from "@doneisbetter/gds-core/client";
import { Anchor, Grid, Stack, Text } from "@mantine/core";
import { useEffect, useState, type ReactNode } from "react";
import { ImpactShell } from "../shell/impact-shell";
import { bucketsToRows, type StatsBucket } from "../lib/stats-rows";
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

function StatsBlock({ title, rows }: { title: string; rows: StatsBucket[] }) {
  return (
    <Stack gap="xs">
      <Text fw={600} size="sm">
        {title}
      </Text>
      <SimpleDataTable
        columns={[
          { key: "key", header: "Key" },
          { key: "count", header: "Count" },
        ]}
        rows={bucketsToRows(rows)}
        emptyTitle={`${title}: no buckets`}
        emptyDescription="No buckets above the privacy threshold."
        getRowKey={(row) => row.key}
      />
    </Stack>
  );
}

function DataPanel({
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
  const issueLabel = issue.replace("https://github.com/sovereignsquad/impact/issues/", "#");
  return (
    <PlaceholderPanel
      title={title}
      description={description}
      badge="Coming soon — live when sufficient data exists"
      mode={live ? "live" : "placeholder"}
      footer={
        <Anchor href={issue} size="xs">
          Issue: {issueLabel}
        </Anchor>
      }
    >
      {live}
    </PlaceholderPanel>
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
      <StatsBlock title="Machine class" rows={stats.hardware.machine_class} />
      <StatsBlock title="Chip" rows={stats.hardware.chip} />
      <StatsBlock title="Memory band" rows={stats.hardware.memory_band} />
      <StatsBlock title="OS" rows={stats.hardware.os_name} />
      <StatsBlock title="Architecture" rows={stats.hardware.architecture} />
    </Stack>
  ) : null;

  const toolsLive = stats ? (
    <Stack gap="xs">
      {thresholdNote}
      <StatsBlock title="Runtime ID" rows={stats.tools.runtime_id} />
      <StatsBlock title="Runtime × status" rows={stats.tools.runtime_by_status} />
      <StatsBlock title="Tool ID" rows={stats.tools.tool_id} />
    </Stack>
  ) : null;

  const modelsLive = stats ? (
    <Stack gap="xs">
      {thresholdNote}
      <StatsBlock title="Model × locality" rows={stats.models.by_id_locality} />
    </Stack>
  ) : null;

  return (
    <ImpactShell pageId="data">
      <DocsPageShell
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Community data" }]}
        title="Community data"
        lead={
          <>
            This area shows <strong>aggregate</strong> views of what the community runs — hardware, tools/runtimes, and
            models — without exposing individual submissions. When the site is built with a stats API base URL, tables are{" "}
            <strong>updated from submitted profiles</strong> subject to server privacy thresholds. Otherwise you see honest
            placeholders only — <strong>no fake live numbers.</strong>
          </>
        }
      >
        <StateBlock
          variant="info"
          title="Status"
          compact
          description={
            <>
              Structure ships first. <strong>Live charts and counts</strong> appear only when ingest is operational, enough
              opted-in submissions exist, and <strong>privacy thresholds</strong> allow publication. See programme issues{" "}
              <Anchor href="https://github.com/sovereignsquad/impact/issues/48">#48</Anchor> and{" "}
              <Anchor href="https://github.com/sovereignsquad/impact/issues/51">#51</Anchor>–
              <Anchor href="https://github.com/sovereignsquad/impact/issues/53">#53</Anchor>.
            </>
          }
        />

        {status ? (
          <Text size="sm" c="dimmed" mb="md">
            {status}
          </Text>
        ) : null}
        {error && !stats ? (
          <StateBlock variant="error" title="Stats API error" description={error} compact />
        ) : null}

        <Grid gutter="md" mb="lg">
          <Grid.Col span={{ base: 12, md: 4 }}>
            <DataPanel
              title="Hardware tested"
              issue="https://github.com/sovereignsquad/impact/issues/51"
              description="Planned aggregates: machine classes, chip families, memory bands, OS/platform distribution."
              live={hwLive}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 4 }}>
            <DataPanel
              title="Tools & runtimes tested"
              issue="https://github.com/sovereignsquad/impact/issues/52"
              description="Planned aggregates: detected runtime/tool families (e.g. Ollama, MLX) and counts by family as profiles report them."
              live={toolsLive}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 4 }}>
            <DataPanel
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
      </DocsPageShell>
    </ImpactShell>
  );
}
