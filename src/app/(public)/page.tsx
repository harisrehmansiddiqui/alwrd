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
  getGalleryImages,
  getHeroSlides,
  getPartnerLogos,
  getResourceCards,
  getTestimonials,
  getTrustBadges,
  getTrustStats,
} from "@/lib/cms";
import { getMediaMap, resolveUrl } from "@/lib/media";
import { getHomepagePackages } from "@/lib/packages";
import { resolvePremiumCards } from "@/lib/premium-audience";
import { resolveHighlightCards } from "@/lib/value-services";
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
    media,
    slides,
    testimonials,
    trustStats,
    partners,
    resources,
    trustBadges,
    galleryImgs,
  ] = await Promise.all([
    getHomepagePackages(),
    getMediaMap(),
    getHeroSlides(),
    getTestimonials(),
    getTrustStats(),
    getPartnerLogos(),
    getResourceCards(),
    getTrustBadges(),
    getGalleryImages(),
  ]);

  return (
    <>
      <Hero slides={slides} />
      <GroupPackages packages={group} />
      <PremiumPackages cards={resolvePremiumCards(media)} packages={premium} />
      <TestimonialsSection items={testimonials} />
      <GalleryCollaborations
        galleryImages={galleryImgs}
        collaborationImages={[
          resolveUrl(media, "collaboration.1"),
          resolveUrl(media, "collaboration.2"),
        ]}
      />
      <UniqueHighlights cards={resolveHighlightCards(media)} />
      <HaramainTrain
        trustStats={trustStats}
        promoImage={resolveUrl(media, "haramain.promo")}
      />
      <PartnerStrip logos={partners} />
      <EsimPromo />
      <ResourcesSection cards={resources} />
      <TrustBadges badges={trustBadges} />
      <WhatsAppFloat />
    </>
  );
}
