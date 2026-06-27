import { SearchWidget } from "@/components/search-widget";
import { HeroCarousel } from "@/components/hero-carousel";
import { heroSlides } from "@/lib/content";

export function Hero() {
  return (
    <section className="hero-pattern overflow-hidden py-12 sm:py-14 lg:py-16">
      <div className="mx-auto grid min-w-0 max-w-[1280px] grid-cols-1 gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:items-stretch lg:gap-10">
        <div className="flex min-w-0 flex-col space-y-6">
          <span className="inline-block w-fit rounded-full bg-primary/10 px-4 py-1 text-sm font-semibold text-primary">
            Book. Budget. Be Blessed.
          </span>
          <h1 className="text-[32px] font-heavy leading-tight text-on-background md:text-[48px] md:leading-[56px]">
            Transparent Booking.
            <br />
            <span className="text-primary">No Agents. No Hidden Charges.</span>
          </h1>
          <p className="max-w-lg text-lg font-light leading-7 text-on-surface-variant">
            Plan your Umrah with transparent pricing, trusted guidance, honest
            commitments, and a dedicated support team — delivering exactly what
            is promised.
          </p>
          <SearchWidget />
        </div>

        <div className="relative min-h-[280px] min-w-0 sm:min-h-[340px] lg:min-h-[580px]">
          <HeroCarousel slides={heroSlides} fillHeight />
        </div>
      </div>
    </section>
  );
}
