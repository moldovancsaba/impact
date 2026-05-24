import { Anchor, AppShell, Box, Group, Text } from "@mantine/core";
import type { ReactNode } from "react";
import type { PageId } from "../constants/nav";
import { NAV_ITEMS } from "../constants/nav";
import { SiteFooter } from "./SiteFooter";

export function PublicShell({ pageId, children }: { pageId: PageId; children: ReactNode }) {
  return (
    <AppShell header={{ height: 56 }} padding="md">
      <AppShell.Header
        style={{
          backdropFilter: "blur(8px)",
          borderBottom: "1px solid var(--mantine-color-dark-4)",
        }}
      >
        <Group h="100%" px="md" justify="space-between" wrap="wrap">
          <Anchor href="/" underline="never" c="var(--mantine-color-text)">
            <Text fw={700} size="md" style={{ letterSpacing: "0.04em" }}>
              I.M.P.A.C.T.
            </Text>
          </Anchor>
          <Group component="nav" gap="md" aria-label="Primary">
            {NAV_ITEMS.map((item) => {
              const active = item.id === pageId;
              return (
                <Anchor
                  key={item.href}
                  href={item.href}
                  size="sm"
                  c={active ? "var(--mantine-color-text)" : "dimmed"}
                  fw={active ? 600 : 400}
                  underline="never"
                  {...(item.external ? { target: "_blank", rel: "noopener" } : {})}
                  aria-current={active ? "page" : undefined}
                >
                  {item.label}
                </Anchor>
              );
            })}
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Main>
        <Box maw={720} mx="auto" w="100%" pb="xl">
          {children}
        </Box>
        <SiteFooter />
      </AppShell.Main>
    </AppShell>
  );
}
