import { PublicShell } from "@gds/core/client";
import { Anchor, Stack, Text } from "@mantine/core";
import type { ReactNode } from "react";
import { NAV_ITEMS, type PageId } from "../constants/nav";

function ImpactFooter() {
  return (
    <Stack gap="xs" align="center">
      <Text size="sm" c="dimmed" ta="center">
        IMPACT — <Text component="em" span>Industrial Multi-Platform Agent Connector Test</Text> · MIT License ·{" "}
        <Anchor href="https://github.com/sovereignsquad/impact" size="sm">
          github.com/sovereignsquad/impact
        </Anchor>
      </Text>
      <Text size="xs" c="dimmed" aria-label="Site build information">
        Web shell {__IMPACT_WEB_VERSION__} · profile schema {__IMPACT_PROFILE_SCHEMA_VERSION__}
      </Text>
    </Stack>
  );
}

const SHELL_NAV = NAV_ITEMS.filter((item) => item.id !== "github");

export function ImpactShell({ pageId, children }: { pageId: PageId; children: ReactNode }) {
  const github = NAV_ITEMS.find((item) => item.id === "github");

  return (
    <PublicShell
      brand={
        <Anchor href="/" underline="never" c="var(--mantine-color-text)">
          <Text fw={700} size="md" style={{ letterSpacing: "0.04em" }}>
            I.M.P.A.C.T.
          </Text>
        </Anchor>
      }
      navItems={SHELL_NAV}
      activeNavId={pageId}
      actions={
        github ? (
          <Anchor href={github.href} size="sm" target="_blank" rel="noopener noreferrer">
            {github.label}
          </Anchor>
        ) : null
      }
      footer={<ImpactFooter />}
      maxContentWidth={720}
      compact
    >
      {children}
    </PublicShell>
  );
}
