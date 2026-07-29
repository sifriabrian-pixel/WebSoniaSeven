import type { MetadataRoute } from "next";
import { getAllProperties, getZones } from "@/lib/data";
import { getBlogPosts } from "@/lib/blog";
import { SITE_URL } from "@/lib/seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const properties = await getAllProperties();
  const zones = await getZones();
  const posts = await getBlogPosts();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL, changeFrequency: "weekly", priority: 1 },
    {
      url: `${SITE_URL}/propiedades`,
      changeFrequency: "daily",
      priority: 0.9,
    },
    { url: `${SITE_URL}/sobre-mi`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/contacto`, changeFrequency: "monthly", priority: 0.5 },
  ];

  const propertyRoutes: MetadataRoute.Sitemap = properties.map((p) => ({
    url: `${SITE_URL}/propiedades/${p.slug}`,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const zoneRoutes: MetadataRoute.Sitemap = zones.map((z) => ({
    url: `${SITE_URL}/propiedades/zona/${z.slug}`,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const blogRoutes: MetadataRoute.Sitemap =
    posts.length > 0
      ? [
          { url: `${SITE_URL}/blog`, changeFrequency: "weekly", priority: 0.6 },
          ...posts.map((p) => ({
            url: `${SITE_URL}/blog/${p.slug}`,
            changeFrequency: "monthly" as const,
            priority: 0.5,
          })),
        ]
      : [];

  return [...staticRoutes, ...propertyRoutes, ...zoneRoutes, ...blogRoutes];
}
