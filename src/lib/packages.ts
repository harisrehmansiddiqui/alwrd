// Domain types for packages. These mirror the Prisma models so swapping the
// in-memory data below for real database queries later is a drop-in change.

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
  departureDate: string; // ISO date
  durationDays: number;
  durationNights: number;
  price: number; // PKR per person
  oldPrice?: number;
  image: string;
  amenities: string[];
  featured: "group" | "premium";
};

const PACKAGES: Package[] = [
  {
    slug: "comfort-umrah-lahore-14n",
    title: "Comfort Package",
    audience: "family",
    tier: "standard",
    tagline: "Umrah journey filled with blessing & barakah",
    city: "Lahore",
    departureDate: "2026-08-01",
    durationDays: 15,
    durationNights: 14,
    price: 285000,
    oldPrice: 315000,
    image: "/packages/comfort-1.jpg",
    amenities: ["All-Inclusive", "Ziyarat Included", "SIM Card", "4 Star Hotel"],
    featured: "group",
  },
  {
    slug: "comfort-umrah-karachi-14n",
    title: "Comfort Package",
    audience: "group",
    tier: "standard",
    tagline: "Designed for a calm and guided Umrah experience",
    city: "Karachi",
    departureDate: "2026-08-10",
    durationDays: 15,
    durationNights: 14,
    price: 299000,
    oldPrice: 330000,
    image: "/packages/comfort-2.jpg",
    amenities: ["All-Inclusive", "Ziyarat Included", "4 Star Hotel", "Taif Tour"],
    featured: "group",
  },
  {
    slug: "comfort-umrah-islamabad-14n",
    title: "Comfort Package",
    audience: "couple",
    tier: "standard",
    tagline: "Premium comfort without premium pricing",
    city: "Islamabad",
    departureDate: "2026-08-17",
    durationDays: 15,
    durationNights: 14,
    price: 294000,
    oldPrice: 324000,
    image: "/packages/comfort-3.jpg",
    amenities: ["All-Inclusive", "Ziyarat Included", "4 Star Hotel", "Triple Umrah"],
    featured: "group",
  },
  {
    slug: "royale-umrah-lahore-9n",
    title: "Royale Package",
    audience: "couple",
    tier: "premium",
    tagline: "Stay five-luxury with our exclusive Royale package",
    city: "Lahore",
    departureDate: "2026-09-05",
    durationDays: 10,
    durationNights: 9,
    price: 610000,
    oldPrice: 680000,
    image: "/packages/royale-1.jpg",
    amenities: ["All-Inclusive", "5 Star Hotel", "Private Transport", "Ziyarat Included"],
    featured: "premium",
  },
];

const today = () => {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
};

// Past or already-departed packages must never surface (PDF requirement).
function isLive(pkg: Package): boolean {
  return new Date(pkg.departureDate).getTime() >= today().getTime();
}

export function getGroupPackages(): Package[] {
  return PACKAGES.filter((p) => p.featured === "group" && isLive(p));
}

export function getPremiumPackages(): Package[] {
  return PACKAGES.filter((p) => p.featured === "premium" && isLive(p));
}

export function getAllPackages(): Package[] {
  return PACKAGES.filter(isLive);
}

export function getPackage(slug: string): Package | undefined {
  return PACKAGES.find((p) => p.slug === slug);
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

export function filterPackages(filters: PackageFilters): Package[] {
  const min = filters.minPrice ? Number(filters.minPrice) : undefined;
  const max = filters.maxPrice ? Number(filters.maxPrice) : undefined;
  const query = filters.q?.trim().toLowerCase();
  const fromDate = filters.date ? new Date(filters.date).getTime() : undefined;

  return getAllPackages().filter((p) => {
    if (filters.tier && p.tier !== filters.tier) return false;
    if (filters.audience && p.audience !== filters.audience) return false;
    if (filters.city && p.city.toLowerCase() !== filters.city.toLowerCase())
      return false;
    if (filters.duration && p.durationDays !== Number(filters.duration))
      return false;
    if (min !== undefined && p.price < min) return false;
    if (max !== undefined && p.price > max) return false;
    if (fromDate && new Date(p.departureDate).getTime() < fromDate) return false;
    if (query && !`${p.title} ${p.tagline} ${p.city}`.toLowerCase().includes(query))
      return false;
    return true;
  });
}

export function getCities(): string[] {
  return Array.from(new Set(getAllPackages().map((p) => p.city))).sort();
}

export function formatPKR(amount: number): string {
  return `₨${amount.toLocaleString("en-PK")}`;
}

export function discountPercent(pkg: Package): number | null {
  if (!pkg.oldPrice || pkg.oldPrice <= pkg.price) return null;
  return Math.round((1 - pkg.price / pkg.oldPrice) * 100);
}
