import { mergeThemeOverrides } from "@mantine/core";
import { gdsThemeBase } from "./gds-theme-base";

/** IMPACT public shell — dark scheme on GDS token baseline. */
export const impactTheme = mergeThemeOverrides(gdsThemeBase, {
  defaultRadius: "md",
});
