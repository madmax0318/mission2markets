import type { MetadataRoute } from "next";
import { getInsightsPosts } from "@/lib/blog";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://mission2markets.com";

const staticRoutes = [
  "",
  "/about",
  "/services",
  "/store",
  "/contact",
  "/blog",
  "/founders",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getInsightsPosts();

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.8,
  }));

  const blogEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: new Date(post.created_at),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticEntries, ...blogEntries];
}
