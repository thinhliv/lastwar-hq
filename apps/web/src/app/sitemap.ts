import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://footzone.vn";
  const lastModified = new Date();

  return [
    { url: baseUrl, lastModified, changeFrequency: "daily", priority: 1.0 },
    { url: `${baseUrl}/tools`, lastModified, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/tools/calculators`, lastModified, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/tools/calculators/advanced`, lastModified, changeFrequency: "weekly", priority: 0.7 },
    { url: `${baseUrl}/tools/events`, lastModified, changeFrequency: "daily", priority: 0.8 },
    { url: `${baseUrl}/tools/events/ammo-bonanza`, lastModified, changeFrequency: "weekly", priority: 0.7 },
    { url: `${baseUrl}/tools/events/desert-treasure`, lastModified, changeFrequency: "weekly", priority: 0.7 },
    { url: `${baseUrl}/tools/calculators/resource-planner`, lastModified, changeFrequency: "weekly", priority: 0.7 },
    { url: `${baseUrl}/tools/calculators/building-planner`, lastModified, changeFrequency: "weekly", priority: 0.7 },
    { url: `${baseUrl}/tools/hero-tier`, lastModified, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/tools/maps`, lastModified, changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/tools/server-stats`, lastModified, changeFrequency: "weekly", priority: 0.6 },
    { url: `${baseUrl}/tools/clan-finder`, lastModified, changeFrequency: "weekly", priority: 0.7 },
    { url: `${baseUrl}/tools/alliance`, lastModified, changeFrequency: "weekly", priority: 0.7 },
    { url: `${baseUrl}/guides`, lastModified, changeFrequency: "weekly", priority: 0.7 },
    { url: `${baseUrl}/news`, lastModified, changeFrequency: "daily", priority: 0.8 },
    { url: `${baseUrl}/chat`, lastModified, changeFrequency: "always", priority: 0.5 },
    { url: `${baseUrl}/profile`, lastModified, changeFrequency: "monthly", priority: 0.4 },
    { url: `${baseUrl}/settings`, lastModified, changeFrequency: "monthly", priority: 0.3 },
  ];
}
