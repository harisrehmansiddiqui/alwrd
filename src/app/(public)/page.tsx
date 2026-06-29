import type { Metadata } from "next";
import { Hero } from "@/components/hero";
import { WhatsAppFloat } from "@/components/whatsapp-float";
import {
  GroupPackages,
  PremiumPackages,
  GalleryCollaborations,
  UniqueHighlights,
  HaramainTrain,
  PartnerStrip,
  EsimPromo,
  ResourcesSection,
  TrustBadges,
} from "@/components/home-sections";
import { getHomepagePackages } from "@/lib/packages";
import { absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Transparent Umrah Booking from Pakistan",
  description:
    "Pakistan's first digital Umrah platform. Search packages, book dates, and plan your journey with transparent pricing — no agents, no hidden charges.",
  alternates: { canonical: absoluteUrl("/") },
  openGraph: {
    title: "Al Wrd — Pakistan's 1st Digital Umrah Booking Platform",
    description:
      "Book. Budget. Be Blessed. Transparent Umrah packages from Lahore, Karachi, and Islamabad.",
    url: absoluteUrl("/"),
  },
};

// Dynamic page, but package data is cached via unstable_cache in lib/packages.
export const dynamic = "force-dynamic";

export default async function Home() {
  const { group, premium } = await getHomepagePackages();

  return (
    <>
      <Hero />
      <GroupPackages packages={group} />
      <PremiumPackages packages={premium} />
      <GalleryCollaborations />
      <UniqueHighlights />
      <HaramainTrain />
      <PartnerStrip />
      <EsimPromo />
      <ResourcesSection />
      <TrustBadges />
      <WhatsAppFloat />
    </>
  );
}
