import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const webPkg = JSON.parse(readFileSync(path.resolve(__dirname, "package.json"), "utf8")) as { version: string };

/** Must match `ImpactProfileSchema` literal in @doneisbetter/schemas (release with CLI + npm). */
const PROFILE_SCHEMA_VERSION = "impact.v0.3";

export default defineConfig({
  plugins: [react()],
  define: {
    __IMPACT_WEB_VERSION__: JSON.stringify(webPkg.version),
    __IMPACT_PROFILE_SCHEMA_VERSION__: JSON.stringify(PROFILE_SCHEMA_VERSION),
  },
  root: ".",
  publicDir: "public",
  build: {
    outDir: "dist",
    emptyOutDir: true,
    sourcemap: true,
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "index.html"),
        install: path.resolve(__dirname, "install.html"),
        use: path.resolve(__dirname, "use.html"),
        submit: path.resolve(__dirname, "submit.html"),
        data: path.resolve(__dirname, "data.html"),
        profile: path.resolve(__dirname, "profile.html"),
      },
    },
  },
  resolve: {
    alias: {
      "@doneisbetter/schemas": path.resolve(__dirname, "../../packages/schemas/src/index.ts"),
      "@doneisbetter/reporting/recommendations": path.resolve(
        __dirname,
        "../../packages/reporting/src/recommendations.ts"
      ),
    },
  },
  server: {
    port: 5173,
  },
});
