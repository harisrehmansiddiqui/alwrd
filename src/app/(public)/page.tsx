import type { Metadata } from "next";
import { Hero } from "@/components/hero";
import { WhatsAppFloat } from "@/components/whatsapp-float";
import { TestimonialsSection } from "@/components/testimonials-carousel";
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
import {
  getHeroSlides,
  getPartnerLogos,
  getResourceCards,
  getTestimonials,
  getTrustBadges,
  getTrustStats,
} from "@/lib/cms";
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

export const dynamic = "force-dynamic";

export default async function Home() {
  const [
    { group, premium },
    slides,
    testimonials,
    trustStats,
    partners,
    resources,
    trustBadges,
  ] = await Promise.all([
    getHomepagePackages(),
    getHeroSlides(),
    getTestimonials(),
    getTrustStats(),
    getPartnerLogos(),
    getResourceCards(),
    getTrustBadges(),
  ]);

  return (
    <>
      <Hero slides={slides} />
      <GroupPackages packages={group} />
      <PremiumPackages packages={premium} />
      <TestimonialsSection items={testimonials} />
      <GalleryCollaborations />
      <UniqueHighlights />
      <HaramainTrain trustStats={trustStats} />
      <PartnerStrip logos={partners} />
      <EsimPromo />
      <ResourcesSection cards={resources} />
      <TrustBadges badges={trustBadges} />
      <WhatsAppFloat />
    </>
  );
}
