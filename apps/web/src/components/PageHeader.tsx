import { Anchor, Breadcrumbs, Stack, Text, Title } from "@mantine/core";
import type { ReactNode } from "react";

export function PageHeader({
  title,
  lead,
  crumb,
}: {
  title: string;
  lead?: ReactNode;
  crumb?: { label: string; href?: string }[];
}) {
  return (
    <Stack gap="sm" mb="lg">
      {crumb && crumb.length > 0 ? (
        <Breadcrumbs>
          {crumb.map((c, i) =>
            c.href ? (
              <Anchor key={i} href={c.href} size="sm" c="dimmed">
                {c.label}
              </Anchor>
            ) : (
              <Text key={i} size="sm" c="dimmed">
                {c.label}
              </Text>
            )
          )}
        </Breadcrumbs>
      ) : null}
      <Title order={1}>{title}</Title>
      {lead ? (
        <Text size="lg" c="dimmed">
          {lead}
        </Text>
      ) : null}
    </Stack>
  );
}
