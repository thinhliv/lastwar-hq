import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://footzone.vn";
  const lastModified = new Date();

  return [
    { url: baseUrl, lastModified, changeFrequency: "daily", priority: 1.0 },
    { url: `${baseUrl}/pricing`, lastModified, changeFrequency: "daily", priority: 0.95 },
    { url: `${baseUrl}/guide`, lastModified, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/tools`, lastModified, changeFrequency: "weekly", priority: 0.85 },
    { url: `${baseUrl}/tools/calculators`, lastModified, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/tools/clan-finder`, lastModified, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/tools/server-stats`, lastModified, changeFrequency: "weekly", priority: 0.7 },
    { url: `${baseUrl}/about`, lastModified, changeFrequency: "monthly", priority: 0.5 },
  ];
}
