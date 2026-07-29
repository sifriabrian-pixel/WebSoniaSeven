import type { MetadataRoute } from "next";
import { getAllProperties } from "@/lib/data";
import { SITE_URL } from "@/lib/seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const properties = await getAllProperties();

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

  return [...staticRoutes, ...propertyRoutes];
}
