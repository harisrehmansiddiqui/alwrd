import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/seo";
import { getAllPackages } from "@/lib/packages";

const STATIC_ROUTES = [
  "",
  "/packages",
  "/about",
  "/contact",
  "/faq",
  "/gallery",
  "/how-it-works",
  "/inquiry",
  "/login",
  "/our-services",
  "/privacy",
  "/resources",
  "/resources/checklist",
  "/resources/duas",
  "/terms",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = getSiteUrl();
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: path === "" ? "daily" : "weekly",
    priority: path === "" ? 1 : path === "/packages" ? 0.9 : 0.7,
  }));

  let packageEntries: MetadataRoute.Sitemap = [];
  try {
    const packages = await getAllPackages();
    const slugs = [...new Set(packages.map((p) => p.slug))];
    packageEntries = slugs.flatMap((slug) => [
      {
        url: `${base}/packages/${slug}`,
        lastModified: now,
        changeFrequency: "weekly" as const,
        priority: 0.8,
      },
      {
        url: `${base}/packages/${slug}/book`,
        lastModified: now,
        changeFrequency: "weekly" as const,
        priority: 0.75,
      },
    ]);
  } catch {
    // DB unavailable during build — static routes still published.
  }

  return [...staticEntries, ...packageEntries];
}
