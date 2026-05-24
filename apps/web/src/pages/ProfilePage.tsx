import { ImpactProfileSchema, type ImpactProfile } from "@impact/schemas";
import { buildRecommendations } from "@impact/reporting/recommendations";
import { Anchor, Button, Code, FileButton, List, Paper, Stack, Table, Text, Title } from "@mantine/core";
import { useCallback, useState, type DragEvent } from "react";
import { PageHeader } from "../components/PageHeader";
import { PublicShell } from "../components/PublicShell";
import { StateBlock } from "../components/StateBlock";

function DropPaper({ onFile }: { onFile: (f: File | null) => void }) {
  const [active, setActive] = useState(false);
  const onDragOver = (e: DragEvent) => {
    e.preventDefault();
    setActive(true);
  };
  const onDragLeave = () => setActive(false);
  const onDrop = (e: DragEvent) => {
    e.preventDefault();
    setActive(false);
    const f = e.dataTransfer?.files?.[0];
    if (f) void onFile(f);
  };
  return (
    <Paper
      p="xl"
      withBorder
      style={{
        borderStyle: "dashed",
        textAlign: "center",
        borderColor: active ? "var(--mantine-color-teal-6)" : undefined,
      }}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      <Text c="dimmed" size="sm">
        Or drop <Code>impact-profile.json</Code> here
      </Text>
    </Paper>
  );
}

function ProfileResult({ profile }: { profile: ImpactProfile }) {
  const host = profile.host;
  const recs = buildRecommendations(profile);
  const toolsInstalled = profile.tools.filter((t) => t.installed);
  const osLine = `${host.os_name.value ?? ""} ${host.os_version.value ?? ""}`.trim() || "—";
  const memLine = host.memory_gb?.value != null ? `${String(host.memory_gb.value)} GB (coarse)` : "—";
  const readinessLine = profile.readiness
    ? `${profile.readiness.summary} (presence: ${profile.readiness.presence})`
    : "—";
  const toolSummary =
    toolsInstalled.length === 0 ? "None detected on allowlist" : toolsInstalled.map((t) => t.id).join(", ");

  return (
    <Stack gap="md">
      <Table withTableBorder>
        <Table.Tbody>
          <Table.Tr>
            <Table.Td fw={600}>Schema</Table.Td>
            <Table.Td>
              <Code>{profile.schema_version}</Code>
            </Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Td fw={600}>Run ID</Table.Td>
            <Table.Td>
              <Code>{profile.run_id}</Code>
            </Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Td fw={600}>Created</Table.Td>
            <Table.Td>{profile.created_at}</Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Td fw={600}>OS</Table.Td>
            <Table.Td>{osLine}</Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Td fw={600}>Memory (coarse)</Table.Td>
            <Table.Td>{memLine}</Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Td fw={600}>Models</Table.Td>
            <Table.Td>{String(profile.models.length)} listed</Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Td fw={600}>Tools (allowlist)</Table.Td>
            <Table.Td>{toolSummary}</Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Td fw={600}>Readiness</Table.Td>
            <Table.Td>{readinessLine}</Table.Td>
          </Table.Tr>
        </Table.Tbody>
      </Table>

      <Title order={3} size="h4">
        Runtimes
      </Title>
      <Table withTableBorder striped>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>ID</Table.Th>
            <Table.Th>Status</Table.Th>
            <Table.Th>Installed</Table.Th>
            <Table.Th>Reachable</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {profile.runtimes.length === 0 ? (
            <Table.Tr>
              <Table.Td colSpan={4}>No runtime rows</Table.Td>
            </Table.Tr>
          ) : (
            profile.runtimes.map((r) => (
              <Table.Tr key={r.id}>
                <Table.Td>
                  <Code>{r.id}</Code>
                </Table.Td>
                <Table.Td>
                  <Code>{r.status}</Code>
                </Table.Td>
                <Table.Td>{r.installed ? "yes" : "no"}</Table.Td>
                <Table.Td>{r.reachable === null ? "—" : r.reachable ? "yes" : "no"}</Table.Td>
              </Table.Tr>
            ))
          )}
        </Table.Tbody>
      </Table>

      <Title order={3} size="h4">
        Suggested next steps
      </Title>
      <Text size="sm" c="dimmed">
        Same deterministic rules as <Code>impact-report.html</Code> — not remote advice.
      </Text>
      {recs.length === 0 ? (
        <Text size="sm" c="dimmed">
          No extra automated hints for this profile — open the full HTML report for tables and provenance.
        </Text>
      ) : (
        <List spacing="xs">
          {recs.map((r) => (
            <List.Item key={r.title}>
              <strong>{r.title}</strong> — {r.body}
              {r.evidence.length > 0 ? (
                <Text span size="xs" c="dimmed">
                  {" "}
                  ({r.evidence.join("; ")})
                </Text>
              ) : null}
            </List.Item>
          ))}
        </List>
      )}

      <Text size="sm" c="dimmed">
        This is a <strong>summary</strong> only. Open <Code>impact-report.html</Code> from the same scan for the full
        offline report. Nothing is uploaded.
      </Text>
    </Stack>
  );
}

export function ProfilePage() {
  const [error, setError] = useState<string | null>(null);
  const [profile, setProfile] = useState<ImpactProfile | null>(null);

  const handleFile = useCallback(async (file: File | null) => {
    if (!file) return;
    setError(null);
    setProfile(null);
    let json: unknown;
    try {
      json = JSON.parse(await file.text()) as unknown;
    } catch {
      setError("Could not parse JSON. Choose a valid impact-profile.json file.");
      return;
    }
    const parsed = ImpactProfileSchema.safeParse(json);
    if (!parsed.success) {
      const first = parsed.error.flatten().formErrors[0] ?? parsed.error.message;
      setError(`Not a valid impact.v0.3 profile: ${first}`);
      return;
    }
    setProfile(parsed.data);
  }, []);

  return (
    <PublicShell pageId="profile">
      <PageHeader
        crumb={[{ label: "Home", href: "/" }, { label: "Profile preview" }]}
        title="Preview a profile file"
        lead={
          <>
            Drop <Code>impact-profile.json</Code> from a local scan or choose a file. Parsing uses{" "}
            <Code>@impact/schemas</Code> in <strong>your browser</strong> — nothing is uploaded.
          </>
        }
      />

      <Stack gap="md" mb="lg">
        <FileButton onChange={handleFile} accept=".json,application/json">
          {(props) => (
            <Button {...props} variant="light">
              Choose impact-profile.json
            </Button>
          )}
        </FileButton>
        <DropPaper onFile={handleFile} />
      </Stack>

      {error ? (
        <StateBlock color="red" title="Could not load profile">
          {error}
        </StateBlock>
      ) : null}

      {profile ? <ProfileResult profile={profile} /> : null}

      <Text mt="lg">
        <Anchor href="/use.html">← How to run a scan</Anchor>
      </Text>
    </PublicShell>
  );
}
