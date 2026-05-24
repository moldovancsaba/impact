import { StrictMode, type ComponentType } from "react";
import { createRoot } from "react-dom/client";
import { AppProviders } from "./providers/AppProviders";

export function mountPage(Page: ComponentType, pageId: string): void {
  const rootEl = document.getElementById("root");
  if (!rootEl) {
    throw new Error("Missing #root mount point");
  }
  document.documentElement.dataset.page = pageId;
  createRoot(rootEl).render(
    <StrictMode>
      <AppProviders>
        <Page />
      </AppProviders>
    </StrictMode>
  );
}
