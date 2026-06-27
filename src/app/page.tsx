import { Hero } from "@/components/hero";
import { SearchWidget } from "@/components/search-widget";
import { WhatsAppFloat } from "@/components/whatsapp-float";
import {
  GroupPackages,
  PremiumPackages,
  Testimonials,
  Collaborations,
  UniqueHighlights,
  HaramainTrain,
  Gallery,
  TrustStats,
  EsimPromo,
  ResourcesSection,
  TrustBadges,
} from "@/components/home-sections";

export default function Home() {
  return (
    <>
      <Hero />

      <section className="relative bg-surface-tint">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <h2 className="font-display text-3xl font-bold text-brand-heading sm:text-4xl">
              Find Your Perfect Umrah Package in Seconds
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-slate-muted">
              Tell us your group size, preferred package type, duration, and
              start date — get instant personalized recommendations.
            </p>
          </div>
          <SearchWidget />
        </div>
      </section>

      <GroupPackages />
      <PremiumPackages />
      <Testimonials />
      <Collaborations />
      <UniqueHighlights />
      <HaramainTrain />
      <Gallery />
      <TrustStats />
      <EsimPromo />
      <ResourcesSection />
      <TrustBadges />

      <WhatsAppFloat />
    </>
  );
}
