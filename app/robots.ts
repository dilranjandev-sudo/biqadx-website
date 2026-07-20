import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Deferred/hidden routes stay out of search until they carry real content.
      disallow: ["/careers", "/newsroom", "/search", "/api/"],
    },
    sitemap: "https://biqadx.com/sitemap.xml",
  };
}
