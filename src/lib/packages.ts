import type { Departure, Package as DbPackage, Prisma } from "@prisma/client";
import { unstable_cache } from "next/cache";
import { cache } from "react";
import { prisma } from "@/lib/db";

const PACKAGES_TAG = "packages";
const CACHE_SECONDS = 300;

// Flattened shape the UI renders: a package joined with one of its departures.
export type AudienceType = "group" | "family" | "couple";
export type Tier = "economy" | "standard" | "premium";

export type PackageTier = {
  key: Tier;
  label: string;
  stars: number;
};

export const TIERS: Record<Tier, PackageTier> = {
  economy: { key: "economy", label: "Economy", stars: 3 },
  standard: { key: "standard", label: "Comfort", stars: 4 },
  premium: { key: "premium", label: "Royale", stars: 5 },
};

export type Package = {
  departureId: string;
  slug: string;
  title: string;
  audience: AudienceType;
  tier: Tier;
  tagline: string;
  city: string;
  departureDate: string;
  durationDays: number;
  durationNights: number;
  price: number;
  oldPrice?: number;
  image: string;
  gallery: string[];
  amenities: string[];
  makkahHotel?: string;
  madinahHotel?: string;
  description?: string;
  featured: string | null;
};

type DepartureWithPackage = Departure & { package: DbPackage };

function mapCard(dep: DepartureWithPackage): Package {
  const p = dep.package;
  return {
    departureId: dep.id,
    slug: p.slug,
    title: p.title,
    audience: p.audience as AudienceType,
    tier: p.tier as Tier,
    tagline: p.tagline,
    city: dep.city,
    departureDate: dep.departureDate.toISOString(),
    durationDays: dep.durationDays,
    durationNights: dep.durationNights,
    price: dep.price,
    oldPrice: dep.oldPrice ?? undefined,
    image: p.image,
    gallery: (p.gallery as string[]) ?? [],
    amenities: (p.amenities as string[]) ?? [],
    makkahHotel: p.makkahHotel ?? undefined,
    madinahHotel: p.madinahHotel ?? undefined,
    description: p.description ?? undefined,
    featured: p.featured,
  };
}

function startOfToday(): Date {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
}

// Live departures only: active package, active departure, not already departed.
function liveWhere(extra?: Prisma.DepartureWhereInput): Prisma.DepartureWhereInput {
  return {
    active: true,
    departureDate: { gte: startOfToday() },
    package: { active: true },
    ...extra,
  };
}

async function queryCards(where: Prisma.DepartureWhereInput): Promise<Package[]> {
  const rows = await prisma.departure.findMany({
    where,
    include: { package: true },
    orderBy: { departureDate: "asc" },
  });
  return rows.map(mapCard);
}

/** One card per package slug — earliest upcoming departure wins. */
function onePerPackage(cards: Package[]): Package[] {
  const seen = new Set<string>();
  const out: Package[] = [];
  for (const card of cards) {
    if (seen.has(card.slug)) continue;
    seen.add(card.slug);
    out.push(card);
  }
  return out;
}

/** Single query for homepage — cached at the edge for 5 minutes. */
export async function getHomepagePackages(): Promise<{
  group: Package[];
  premium: Package[];
}> {
  return unstable_cache(
    async () => {
      const rows = await prisma.departure.findMany({
        where: liveWhere({
          package: { active: true, featured: { in: ["group", "premium"] } },
        }),
        include: { package: true },
        orderBy: { departureDate: "asc" },
      });
      const cards = rows.map(mapCard);
      return {
        group: cards.filter((p) => p.featured === "group").slice(0, 3),
        premium: onePerPackage(cards.filter((p) => p.featured === "premium")),
      };
    },
    ["homepage-packages"],
    { revalidate: CACHE_SECONDS, tags: [PACKAGES_TAG] },
  )();
}

export async function getGroupPackages(): Promise<Package[]> {
  return queryCards(liveWhere({ package: { active: true, featured: "group" } }));
}

export async function getPremiumPackages(): Promise<Package[]> {
  return queryCards(liveWhere({ package: { active: true, featured: "premium" } }));
}

export async function getAllPackages(): Promise<Package[]> {
  return queryCards(liveWhere());
}

export type PackageFilters = {
  tier?: string;
  audience?: string;
  city?: string;
  duration?: string;
  date?: string;
  minPrice?: string;
  maxPrice?: string;
  q?: string;
};

export async function filterPackages(filters: PackageFilters): Promise<Package[]> {
  const cacheKey = JSON.stringify(
    Object.entries(filters).sort(([a], [b]) => a.localeCompare(b)),
  );

  return unstable_cache(
    async () => {
      const pkgWhere: Prisma.PackageWhereInput = { active: true };
      if (filters.tier) pkgWhere.tier = filters.tier as Tier;
      if (filters.audience) pkgWhere.audience = filters.audience as AudienceType;
      if (filters.q) {
        pkgWhere.OR = [
          { title: { contains: filters.q, mode: "insensitive" } },
          { tagline: { contains: filters.q, mode: "insensitive" } },
        ];
      }

      const where = liveWhere({ package: pkgWhere });
      if (filters.city) where.city = filters.city;
      if (filters.duration) where.durationDays = Number(filters.duration);
      if (filters.date) {
        where.departureDate = { gte: new Date(filters.date) };
      }
      if (filters.minPrice || filters.maxPrice) {
        where.price = {
          ...(filters.minPrice ? { gte: Number(filters.minPrice) } : {}),
          ...(filters.maxPrice ? { lte: Number(filters.maxPrice) } : {}),
        };
      }

      return queryCards(where);
    },
    ["filter-packages", cacheKey],
    { revalidate: CACHE_SECONDS, tags: [PACKAGES_TAG] },
  )();
}

async function fetchPackageBySlug(slug: string): Promise<Package | undefined> {
  const pkg = await prisma.package.findFirst({
    where: { slug, active: true },
    include: {
      departures: {
        where: { active: true, departureDate: { gte: startOfToday() } },
        orderBy: { departureDate: "asc" },
        take: 1,
      },
    },
  });
  if (!pkg || pkg.departures.length === 0) return undefined;
  return mapCard({ ...pkg.departures[0], package: pkg });
}

export const getPackage = cache(async (slug: string): Promise<Package | undefined> => {
  return unstable_cache(
    async () => fetchPackageBySlug(slug),
    ["package-by-slug", slug],
    { revalidate: CACHE_SECONDS, tags: [PACKAGES_TAG, `package:${slug}`] },
  )();
});

export async function getCities(): Promise<string[]> {
  return unstable_cache(
    async () => {
      const rows = await prisma.departure.findMany({
        where: liveWhere(),
        distinct: ["city"],
        select: { city: true },
        orderBy: { city: "asc" },
      });
      return rows.map((r) => r.city);
    },
    ["departure-cities"],
    { revalidate: 600, tags: [PACKAGES_TAG] },
  )();
}

export function formatPKR(amount: number): string {
  return `₨${amount.toLocaleString("en-PK")}`;
}

export function discountPercent(pkg: Package): number | null {
  if (!pkg.oldPrice || pkg.oldPrice <= pkg.price) return null;
  return Math.round((1 - pkg.price / pkg.oldPrice) * 100);
}
