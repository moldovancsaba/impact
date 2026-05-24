/**
 * GDS-aligned Mantine theme (general-design-system v2.2.0 / packages/gds-theme).
 * Vendored for portable CI/Vercel builds — upstream SSOT wins on conflict.
 */
import { createTheme } from "@mantine/core";

export const gdsThemeBase = createTheme({
  primaryColor: "violet",
  fontFamily: "Inter, system-ui, Avenir, Helvetica, Arial, sans-serif",
  fontSmoothing: true,
  headings: {
    fontFamily: "Inter, system-ui, Avenir, Helvetica, Arial, sans-serif",
    sizes: {
      h1: { fontSize: "2.5rem", fontWeight: "800" },
      h2: { fontSize: "1.75rem", fontWeight: "700" },
      h3: { fontSize: "1.25rem", fontWeight: "600" },
    },
  },
  defaultRadius: "md",
  components: {
    Button: {
      defaultProps: {
        radius: "md",
        size: "sm",
        fw: 600,
      },
    },
    Card: {
      defaultProps: {
        radius: "lg",
        withBorder: true,
      },
    },
    Paper: {
      defaultProps: {
        radius: "lg",
      },
    },
  },
});
