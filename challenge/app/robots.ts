import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
const baseUrl = siteUrl ?? "http://localhost:3000";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/home",
        "/tv-shows/new",
        "/tv-shows/*/edit",
        "/tv-shows/season/new",
        "/tv-shows/season/*/edit",
        "/tv-shows/episode/new",
        "/tv-shows/episode/*/edit",
        "/watchlist/new",
        "/watchlist/*/edit",
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
