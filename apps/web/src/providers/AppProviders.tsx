import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";
import type { ReactNode } from "react";
import { impactTheme } from "../theme/impact-theme";

import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <MantineProvider theme={impactTheme} defaultColorScheme="dark">
      <ModalsProvider>
        <Notifications position="top-right" zIndex={1000} />
        {children}
      </ModalsProvider>
    </MantineProvider>
  );
}
