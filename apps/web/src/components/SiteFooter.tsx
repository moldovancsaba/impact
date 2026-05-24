import { Anchor, Stack, Text } from "@mantine/core";

export function SiteFooter() {
  return (
    <Stack component="footer" gap="xs" py="xl" align="center" mt="auto" style={{ borderTop: "1px solid var(--mantine-color-dark-4)" }}>
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
