import type { Departure, Package as DbPackage, Prisma } from "@prisma/client";
import { prisma } from "@/lib/db";

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
  amenities: string[];
  featured: string | null;
};

type DepartureWithPackage = Departure & { package: DbPackage };

function mapCard(dep: DepartureWithPackage): Package {
  const p = dep.package;
  return {
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
    amenities: (p.amenities as string[]) ?? [],
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
}

export async function getPackage(slug: string): Promise<Package | undefined> {
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

export async function getCities(): Promise<string[]> {
  const rows = await prisma.departure.findMany({
    where: liveWhere(),
    distinct: ["city"],
    select: { city: true },
    orderBy: { city: "asc" },
  });
  return rows.map((r) => r.city);
}

export function formatPKR(amount: number): string {
  return `₨${amount.toLocaleString("en-PK")}`;
}

export function discountPercent(pkg: Package): number | null {
  if (!pkg.oldPrice || pkg.oldPrice <= pkg.price) return null;
  return Math.round((1 - pkg.price / pkg.oldPrice) * 100);
}
