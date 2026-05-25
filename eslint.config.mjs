import eslint from "@eslint/js";
import { createGdsConfig } from "@gds/eslint-config";
import tseslint from "typescript-eslint";

const gdsWebConfig = createGdsConfig();

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    ignores: [
      "**/dist/**",
      "**/node_modules/**",
      "**/.gds-src/**",
      "scripts/validate-fixtures.mjs",
      "scripts/validate-invalid-fixtures.mjs",
      "scripts/lint-gds-web.mjs",
      "scripts/prepare-gds-deps.mjs",
    ],
  },
  {
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
    },
  },
  {
    files: ["apps/web/src/**/*.{ts,tsx}"],
    ...gdsWebConfig[0],
  }
);
