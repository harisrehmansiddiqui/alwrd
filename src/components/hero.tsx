import { SearchWidget } from "@/components/search-widget";
import { HeroCarousel } from "@/components/hero-carousel";
import { heroSlides } from "@/lib/content";

export function Hero() {
  return (
    <section className="hero-pattern overflow-hidden py-12 sm:py-16 lg:py-[72px]">
      <div className="mx-auto grid min-w-0 max-w-[1280px] grid-cols-1 items-center gap-8 px-4 sm:px-6 lg:grid-cols-2">
        <div className="min-w-0 space-y-6">
          <span className="inline-block rounded-full bg-primary/10 px-4 py-1 text-sm font-semibold text-primary">
            Book. Budget. Be Blessed.
          </span>
          <h1 className="text-[32px] font-bold leading-tight text-on-background md:text-[48px] md:leading-[56px]">
            Transparent Booking.
            <br />
            <span className="text-primary">No Agents. No Hidden Charges.</span>
          </h1>
          <p className="max-w-lg text-lg leading-7 text-on-surface-variant">
            Plan your Umrah with transparent pricing, trusted guidance, honest
            commitments, and a dedicated support team — delivering exactly what
            is promised.
          </p>
          <SearchWidget />
        </div>

        <div className="relative min-w-0">
          <HeroCarousel slides={heroSlides} />
        </div>
      </div>
    </section>
  );
}
