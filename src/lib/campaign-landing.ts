import { formatPKR } from "@/lib/packages";

export const CAMPAIGN_PACKAGES = [
  {
    id: "10-day",
    badge: "Most Popular",
    title: "10-Day Royale",
    price: 325_000,
    desc: "Ultra-luxury stay within walking distance of Haram.",
    features: [
      { icon: "flight", label: "Direct Flights (PIA / Saudia)" },
      { icon: "hotel", label: "5-Star Conrad / Hilton" },
    ],
    image: "/gallery/1.jpg",
    href: "/packages?duration=10",
    cta: "Select Royale",
    featured: false,
  },
  {
    id: "14-day",
    badge: "Al Wrd Signature",
    title: "14-Day Comfort",
    price: 280_000,
    desc: "Balanced itinerary with high-speed rail travel included.",
    features: [
      { icon: "train", label: "Haramain High-Speed Train" },
      { icon: "hotel", label: "4-Star Makkah & Madinah" },
    ],
    image: "/gallery/2.jpg",
    href: "/packages?duration=14",
    cta: "Choose Comfort",
    featured: true,
  },
  {
    id: "21-day",
    badge: null,
    title: "21-Day Spiritual",
    price: 245_000,
    desc: "Extended stay for deep devotion and multiple ziyarat.",
    features: [
      { icon: "history_edu", label: "Exclusive History Lectures" },
      { icon: "directions_bus", label: "Full Transportation (VIP Bus)" },
    ],
    image: "/gallery/3.jpg",
    href: "/packages?duration=21",
    cta: "Select Spiritual",
    featured: false,
  },
] as const;

export const CAMPAIGN_ADVANTAGES = [
  {
    icon: "train",
    title: "Haramain Train",
    desc: "Seamless luxury travel between the Holy Cities.",
    href: "/our-services/haramain-train",
  },
  {
    icon: "sim_card",
    title: "Local SIM & Data",
    desc: "Stay connected with pre-activated high-speed internet.",
    href: "/our-services/local-sim",
  },
  {
    icon: "accessible",
    title: "Wheelchair Care",
    desc: "Dedicated assistance for elderly and special needs.",
    href: "/our-services/wheelchair-assistance",
  },
  {
    icon: "support_agent",
    title: "24/7 Support",
    desc: "Round-the-clock ground support via WhatsApp & call.",
    href: "/support",
  },
] as const;

export const CAMPAIGN_PLANNING_FEATURES = [
  {
    icon: "verified_user",
    title: "Direct Transparent Pricing",
    desc: "No hidden agent fees. See exactly where your money goes.",
  },
  {
    icon: "smartphone",
    title: "Digital-First Itinerary",
    desc: "Live updates on transport, ziyarat schedules, and hotel check-ins.",
  },
] as const;

export function formatCampaignPrice(amount: number): string {
  return formatPKR(amount);
}
