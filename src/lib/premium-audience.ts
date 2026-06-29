import type { AudienceLandingSlug } from "@/lib/audience-landing";

export type PremiumAudienceCard = {
  slug: AudienceLandingSlug;
  title: string;
  subtitle: string;
  href: string;
  image: string;
  features: string[];
  priceFrom: number;
  badge?: string;
  cta: string;
};

export const PREMIUM_AUDIENCE_CARDS: PremiumAudienceCard[] = [
  {
    slug: "individual",
    title: "Individual Package",
    subtitle: "Personalized itineraries for solo pilgrims seeking peace and flexibility.",
    href: "/umrah/individual",
    image: "/gallery/1.jpg",
    features: [
      "Flexible pacing",
      "Visa assistance",
      "24/7 pilgrim support",
      "Hotels near the Haram",
    ],
    priceFrom: 485_000,
    cta: "Explore Individual",
  },
  {
    slug: "couple",
    title: "Couple Package",
    subtitle: "Stay in five-star luxury with our exclusive Royale experience.",
    href: "/umrah/couple",
    image: "/gallery/2.jpg",
    features: [
      "5-star accommodations",
      "VIP private transfers",
      "Gourmet dining",
      "24/7 dedicated guide",
    ],
    priceFrom: 610_000,
    badge: "TOP CHOICE",
    cta: "Explore Royale Package",
  },
  {
    slug: "family",
    title: "Family Umrah Package",
    subtitle: "Kid-friendly hotels, private family transport, and guided support.",
    href: "/umrah/family",
    image: "/gallery/3.jpg",
    features: [
      "Family suites",
      "Private vehicles",
      "Visa for all members",
      "Guided peace of mind",
    ],
    priceFrom: 520_000,
    cta: "Explore Family",
  },
];
