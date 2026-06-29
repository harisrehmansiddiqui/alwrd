import type { AudienceType } from "@/lib/packages";

export type AudienceLandingSlug = "family" | "couple" | "individual";

export type AudienceLandingConfig = {
  slug: AudienceLandingSlug;
  /** Value passed to filterPackages — individual maps to group departures for solo pilgrims. */
  filterAudience: AudienceType;
  title: string;
  subtitle: string;
  metaDescription: string;
  benefits: { title: string; desc: string; icon: string }[];
  faqs: { q: string; a: string }[];
  defaultGroupSize: number;
  packagesHeading: string;
  packagesSubtitle: string;
};

export const AUDIENCE_SLUGS: AudienceLandingSlug[] = [
  "family",
  "couple",
  "individual",
];

export const AUDIENCE_LANDINGS: Record<
  AudienceLandingSlug,
  AudienceLandingConfig
> = {
  family: {
    slug: "family",
    filterAudience: "family",
    title: "Family Umrah Packages",
    subtitle:
      "Room layouts, child-friendly hotels, and guided support designed for families travelling together from Pakistan.",
    metaDescription:
      "Family Umrah packages from Pakistan — shared rooms, visa support, hotels near the Haram, and 24/7 guidance for your whole family.",
    packagesHeading: "Packages for families",
    packagesSubtitle:
      "Compare departures with family-friendly inclusions and transparent per-person pricing.",
    defaultGroupSize: 4,
    benefits: [
      {
        title: "Family room options",
        desc: "Connecting and multi-bed rooms arranged so parents and children stay together.",
        icon: "family_restroom",
      },
      {
        title: "Child-friendly hotels",
        desc: "Properties selected for safety, proximity to the Haram, and practical amenities.",
        icon: "hotel",
      },
      {
        title: "Shared transport",
        desc: "Private airport and inter-city transfers sized for your family group.",
        icon: "directions_bus",
      },
      {
        title: "Visa for every member",
        desc: "Umrah visa processing handled for adults and children in one application flow.",
        icon: "badge",
      },
      {
        title: "Authentic meals",
        desc: "Daily breakfast and dinner suited to Pakistani families.",
        icon: "restaurant",
      },
      {
        title: "24/7 family support",
        desc: "On-ground coordinators who understand travelling with children and elderly parents.",
        icon: "support_agent",
      },
    ],
    faqs: [
      {
        q: "Can children travel on a family Umrah package?",
        a: "Yes. Share ages and passport details in your inquiry and we confirm visa requirements and pricing for each traveller.",
      },
      {
        q: "Do you arrange adjoining or family rooms?",
        a: "We request family-suitable room configurations with our hotel partners based on your group size and preferences.",
      },
      {
        q: "How many people count as a family booking?",
        a: "Typically three or more related travellers. Couples and solo pilgrims can explore our Couple and Individual pages.",
      },
      {
        q: "Is ziyarat included for families?",
        a: "Many packages include guided ziyarat. Check each package itinerary or ask our team when you submit an inquiry.",
      },
    ],
  },
  couple: {
    slug: "couple",
    filterAudience: "couple",
    title: "Couple Umrah Packages",
    subtitle:
      "Intimate, well-paced journeys for husbands and wives — private transport, quality hotels, and attentive support.",
    metaDescription:
      "Couple Umrah packages from Pakistan — private rooms, visa processing, hotels near the Haram, and dedicated support for two travellers.",
    packagesHeading: "Packages for couples",
    packagesSubtitle:
      "Handpicked departures with room arrangements and pacing suited to couples.",
    defaultGroupSize: 2,
    benefits: [
      {
        title: "Private double rooms",
        desc: "Comfortable room arrangements for husband and wife throughout Makkah and Madinah.",
        icon: "king_bed",
      },
      {
        title: "Unhurried itinerary",
        desc: "Balanced schedules that leave time for worship without a rushed group pace.",
        icon: "schedule",
      },
      {
        title: "Airport meet & greet",
        desc: "Dedicated pickup on arrival and smooth transfers between cities.",
        icon: "flight_land",
      },
      {
        title: "Visa for both travellers",
        desc: "Single coordinated Umrah visa process for you and your spouse.",
        icon: "badge",
      },
      {
        title: "Hotels near the Haram",
        desc: "3–5 star properties within walking distance, depending on package tier.",
        icon: "mosque",
      },
      {
        title: "WhatsApp coordination",
        desc: "Direct access to our team before departure and throughout your stay.",
        icon: "chat",
      },
    ],
    faqs: [
      {
        q: "Are couple packages only for married couples?",
        a: "Our couple packages are designed for married pairs. Mahram requirements for visa processing still apply under Saudi regulations.",
      },
      {
        q: "Can we choose our travel dates?",
        a: "Select an available departure or share preferred dates in the inquiry form — our team confirms options with you.",
      },
      {
        q: "Is transport private for couples?",
        a: "Airport and inter-city transfers are arranged for your party. Some ziyarat may be shared depending on the package.",
      },
      {
        q: "What documents do we need?",
        a: "Valid passports, marriage certificate where required, and passport photos. We guide you through the full visa checklist.",
      },
    ],
  },
  individual: {
    slug: "individual",
    filterAudience: "group",
    title: "Individual Umrah Packages",
    subtitle:
      "Travel solo with confidence — join a guided group departure, transparent pricing, and full support from Pakistan to return.",
    metaDescription:
      "Individual Umrah packages for solo pilgrims from Pakistan — join group departures with visa support, hotels near the Haram, and 24/7 assistance.",
    packagesHeading: "Packages for solo pilgrims",
    packagesSubtitle:
      "Join upcoming group departures with single-occupancy or shared-room options.",
    defaultGroupSize: 1,
    benefits: [
      {
        title: "Join a guided group",
        desc: "Travel independently while benefiting from an organised departure and on-ground team.",
        icon: "groups",
      },
      {
        title: "Single-traveller pricing",
        desc: "Clear per-person rates with no hidden agent markups.",
        icon: "payments",
      },
      {
        title: "Visa assistance",
        desc: "Step-by-step Umrah visa support for solo applicants from Pakistan.",
        icon: "badge",
      },
      {
        title: "Safe, vetted hotels",
        desc: "Hotels near the Haram with reliable check-in and room allocation.",
        icon: "hotel",
      },
      {
        title: "Orientation before travel",
        desc: "Pre-departure briefing so you know what to expect on the ground.",
        icon: "school",
      },
      {
        title: "24/7 pilgrim support",
        desc: "Our coordinators are reachable throughout your journey via WhatsApp and phone.",
        icon: "support_agent",
      },
    ],
    faqs: [
      {
        q: "Can I travel alone on a group departure?",
        a: "Yes. Individual pilgrims join the same organised departures as larger groups with dedicated coordinator support.",
      },
      {
        q: "Will I share a room?",
        a: "Room allocation depends on the package and your preference. Mention single-room needs in your inquiry.",
      },
      {
        q: "Is mahram required for solo female travellers?",
        a: "Saudi visa rules apply. Share your situation in the inquiry and our team advises on current requirements.",
      },
      {
        q: "How far in advance should I book?",
        a: "Bookings open from 10 days ahead of travel. Earlier inquiries help secure your preferred departure and room type.",
      },
    ],
  },
};

export function getAudienceConfig(
  slug: string,
): AudienceLandingConfig | undefined {
  if (slug in AUDIENCE_LANDINGS) {
    return AUDIENCE_LANDINGS[slug as AudienceLandingSlug];
  }
  return undefined;
}

export function packagesFilterHref(slug: AudienceLandingSlug): string {
  const config = AUDIENCE_LANDINGS[slug];
  return `/packages?audience=${config.filterAudience}`;
}
