import type { MetadataRoute } from "next";

const BASE = "https://biqadx.com";

// Public routes only. Deferred/hidden routes (careers, newsroom, search) are
// intentionally excluded — they are noindex until they carry real content.
export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/about",
    "/metasurface-diagnostics",
    "/metacard",
    "/omega-pro",
    "/how-it-works",
    "/partners",
    "/contact",
    "/legal/development-stage",
    "/privacy",
    "/terms",
    "/cookies",
    "/accessibility",
  ];

  return routes.map((route) => ({
    url: `${BASE}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}
