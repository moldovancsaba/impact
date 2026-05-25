import { GdsProvider, gdsDarkPublicTheme } from "@gds/theme/client";
import type { ReactNode } from "react";

import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <GdsProvider theme={gdsDarkPublicTheme} defaultColorScheme="dark">
      {children}
    </GdsProvider>
  );
}
