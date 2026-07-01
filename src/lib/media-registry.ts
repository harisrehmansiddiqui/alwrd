export type MediaRegistryEntry = {
  key: string;
  label: string;
  category: string;
  defaultUrl: string;
  alt?: string;
  sortOrder: number;
};

const gallery = (n: number, label: string): MediaRegistryEntry => ({
  key: `gallery.${n}`,
  label,
  category: "Gallery",
  defaultUrl: `/gallery/${n}.jpg`,
  sortOrder: n,
});

export const MEDIA_REGISTRY: MediaRegistryEntry[] = [
  {
    key: "brand.logo-green",
    label: "Logo (green)",
    category: "Brand",
    defaultUrl: "/brand/logo-green.png",
    sortOrder: 1,
  },
  {
    key: "brand.logo-black",
    label: "Logo (black)",
    category: "Brand",
    defaultUrl: "/brand/logo-black.png",
    sortOrder: 2,
  },
  {
    key: "hero.main",
    label: "Homepage hero (fallback)",
    category: "Hero",
    defaultUrl: "/hero.jpg",
    sortOrder: 1,
  },
  {
    key: "campaign.hero",
    label: "Campaign landing hero",
    category: "Hero",
    defaultUrl: "/campaign-hero.jpg",
    sortOrder: 2,
  },
  gallery(1, "Gallery image 1"),
  gallery(2, "Gallery image 2"),
  gallery(3, "Gallery image 3"),
  gallery(4, "Gallery image 4"),
  gallery(5, "Gallery image 5"),
  gallery(6, "Gallery image 6"),
  gallery(7, "Gallery image 7"),
  gallery(8, "Gallery image 8"),
  {
    key: "resources.duas",
    label: "Resources — Du'as card",
    category: "Resources",
    defaultUrl: "/resources/duas.jpg",
    sortOrder: 1,
  },
  {
    key: "resources.checklist",
    label: "Resources — Checklist card",
    category: "Resources",
    defaultUrl: "/resources/checklist.jpg",
    sortOrder: 2,
  },
  {
    key: "resources.support",
    label: "Resources — Support card",
    category: "Resources",
    defaultUrl: "/resources/support.jpg",
    sortOrder: 3,
  },
  {
    key: "premium.individual",
    label: "Premium — Individual package",
    category: "Premium packages",
    defaultUrl: "/gallery/1.jpg",
    sortOrder: 1,
  },
  {
    key: "premium.couple",
    label: "Premium — Couple package",
    category: "Premium packages",
    defaultUrl: "/gallery/2.jpg",
    sortOrder: 2,
  },
  {
    key: "premium.family",
    label: "Premium — Family package",
    category: "Premium packages",
    defaultUrl: "/gallery/3.jpg",
    sortOrder: 3,
  },
  {
    key: "campaign.package.10-day",
    label: "Campaign — 10-Day Royale",
    category: "Campaign",
    defaultUrl: "/gallery/1.jpg",
    sortOrder: 1,
  },
  {
    key: "campaign.package.14-day",
    label: "Campaign — 14-Day Comfort",
    category: "Campaign",
    defaultUrl: "/gallery/2.jpg",
    sortOrder: 2,
  },
  {
    key: "campaign.package.21-day",
    label: "Campaign — 21-Day Spiritual",
    category: "Campaign",
    defaultUrl: "/gallery/3.jpg",
    sortOrder: 3,
  },
  {
    key: "campaign.planning",
    label: "Campaign — Planning section",
    category: "Campaign",
    defaultUrl: "/gallery/4.jpg",
    sortOrder: 4,
  },
  {
    key: "collaboration.1",
    label: "Collaboration partner 1",
    category: "Collaborations",
    defaultUrl: "/collaborations/1.jpg",
    sortOrder: 1,
  },
  {
    key: "collaboration.2",
    label: "Collaboration partner 2",
    category: "Collaborations",
    defaultUrl: "/collaborations/2.jpg",
    sortOrder: 2,
  },
  {
    key: "haramain.promo",
    label: "Haramain train promo",
    category: "Homepage sections",
    defaultUrl: "/gallery/3.jpg",
    sortOrder: 1,
  },
  {
    key: "contact.hero",
    label: "Contact page hero",
    category: "Pages",
    defaultUrl:
      "https://images.unsplash.com/photo-1564769625905-50d102379625?auto=format&fit=crop&w=1312&q=80",
    sortOrder: 1,
  },
  ...[
    "triple-umrah",
    "premium-umrah-kit",
    "local-sim",
    "wheelchair-assistance",
    "on-ground-support",
    "pre-departure-orientation",
    "haramain-train",
    "umrah-holidays",
  ].map((slug, i) => ({
    key: `service.${slug}`,
    label: `Service — ${slug.replace(/-/g, " ")}`,
    category: "Our services",
    defaultUrl: `/gallery/${(i % 8) + 1}.jpg`,
    sortOrder: i + 1,
  })),
];

export const MEDIA_REGISTRY_MAP = Object.fromEntries(
  MEDIA_REGISTRY.map((e) => [e.key, e]),
) as Record<string, MediaRegistryEntry>;

export const MEDIA_CATEGORIES = [
  ...new Set(MEDIA_REGISTRY.map((e) => e.category)),
];
