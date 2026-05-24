export type PageId = "home" | "install" | "use" | "submit" | "data" | "profile";

export const NAV_ITEMS: { id: PageId | "github"; label: string; href: string; external?: boolean }[] = [
  { id: "home", label: "Home", href: "/" },
  { id: "install", label: "Install", href: "/install.html" },
  { id: "use", label: "Run & results", href: "/use.html" },
  { id: "submit", label: "Submit", href: "/submit.html" },
  { id: "data", label: "Community data", href: "/data.html" },
  { id: "profile", label: "Profile preview", href: "/profile.html" },
  { id: "github", label: "GitHub", href: "https://github.com/sovereignsquad/impact", external: true },
];
