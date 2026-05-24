import { ScrollArea, Table, Text, Title } from "@mantine/core";

export type StatsBucket = { key: string; count: number };

export function StatsTable({ title, rows }: { title: string; rows: StatsBucket[] }) {
  if (rows.length === 0) {
    return (
      <Text size="sm" c="dimmed" mb="md">
        {title}: no buckets above the privacy threshold.
      </Text>
    );
  }
  return (
    <>
      <Title order={4} size="sm" mb="xs">
        {title}
      </Title>
      <ScrollArea mb="md">
        <Table striped highlightOnHover withTableBorder>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Key</Table.Th>
              <Table.Th>Count</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {rows.map((r) => (
              <Table.Tr key={r.key}>
                <Table.Td>{r.key}</Table.Td>
                <Table.Td>{r.count}</Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </ScrollArea>
    </>
  );
}
