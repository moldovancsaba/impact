import { Stack, Title } from "@mantine/core";
import type { ReactNode } from "react";

export function ArticleSection({ title, children }: { title?: string; children: ReactNode }) {
  return (
    <Stack gap="sm" mb="lg">
      {title ? <Title order={2}>{title}</Title> : null}
      {children}
    </Stack>
  );
}
