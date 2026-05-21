import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://smart-list.co.uk";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/"], // Restrict crawlers from potential internal API routes
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
