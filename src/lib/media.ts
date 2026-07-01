import { unstable_cache } from "next/cache";
import { prisma } from "@/lib/db";
import { MEDIA_REGISTRY, MEDIA_REGISTRY_MAP, type MediaRegistryEntry } from "@/lib/media-registry";

export type ResolvedMedia = MediaRegistryEntry & {
  url: string;
  isCustom: boolean;
};

async function loadMediaMap(): Promise<Record<string, string>> {
  const rows = await prisma.mediaImage.findMany();
  const map: Record<string, string> = {};

  for (const entry of MEDIA_REGISTRY) {
    map[entry.key] = entry.defaultUrl;
  }
  for (const row of rows) {
    map[row.key] = row.url;
  }
  return map;
}

export const getMediaMap = unstable_cache(loadMediaMap, ["site-media-map"], {
  revalidate: 30,
  tags: ["site-media"],
});

export async function getMediaUrl(
  key: string,
  fallback?: string,
): Promise<string> {
  const map = await getMediaMap();
  return map[key] ?? fallback ?? MEDIA_REGISTRY_MAP[key]?.defaultUrl ?? "";
}

export async function getResolvedMediaList(): Promise<ResolvedMedia[]> {
  const map = await getMediaMap();
  return MEDIA_REGISTRY.map((entry) => ({
    ...entry,
    url: map[entry.key] ?? entry.defaultUrl,
    isCustom: map[entry.key] !== entry.defaultUrl,
  }));
}

export function resolveUrl(
  map: Record<string, string>,
  key: string,
  fallback?: string,
): string {
  return map[key] ?? fallback ?? MEDIA_REGISTRY_MAP[key]?.defaultUrl ?? "";
}
