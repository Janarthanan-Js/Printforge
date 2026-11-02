import type { MetadataRoute } from "next";
import { getAllModels } from "./lib/models";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const models = await getAllModels();

  const staticRoutes = [
    { path: "", priority: 1 },
    { path: "/3d-models", priority: 0.9 },
    { path: "/about", priority: 0.6 },
    { path: "/about/mission", priority: 0.5 },
  ].map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route.priority,
  }));

  const modelRoutes = models.map((model) => ({
    url: `${baseUrl}/3d-models/${model.id}`,
    lastModified: new Date(model.dateAdded),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...modelRoutes];
}
