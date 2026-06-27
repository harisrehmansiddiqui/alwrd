import { SearchWidget } from "@/components/search-widget";
import { HeroCarousel } from "@/components/hero-carousel";
import { heroSlides } from "@/lib/content";

export function Hero() {
  return (
    <section className="hero-pattern overflow-hidden py-5 sm:py-8 lg:py-14">
      <div className="mx-auto grid min-w-0 max-w-[1280px] grid-cols-1 gap-4 px-4 sm:gap-6 sm:px-6 xl:grid-cols-2 xl:items-stretch xl:gap-10">
        <div className="flex min-w-0 flex-col space-y-3 sm:space-y-4 xl:space-y-5">
          <span className="inline-block w-fit rounded-full bg-primary/10 px-3 py-0.5 text-xs font-semibold text-primary sm:px-4 sm:py-1 sm:text-sm">
            Book. Budget. Be Blessed.
          </span>
          <h1 className="text-[26px] font-heavy leading-[1.15] text-on-background sm:text-[32px] md:text-[40px] md:leading-tight xl:text-[48px] xl:leading-[56px]">
            Transparent Booking.
            <br />
            <span className="text-primary">No Agents. No Hidden Charges.</span>
          </h1>
          <p className="hidden max-w-lg text-base font-light leading-6 text-on-surface-variant sm:block lg:text-lg lg:leading-7">
            Plan your Umrah with transparent pricing, trusted guidance, honest
            commitments, and a dedicated support team — delivering exactly what
            is promised.
          </p>
          <SearchWidget />
        </div>

        {/* Carousel below form on mobile/tablet; side-by-side on xl+ desktop */}
        <div className="relative min-w-0 xl:min-h-[560px]">
          <HeroCarousel
            slides={heroSlides}
            className="h-[180px] sm:h-[220px] md:h-[260px] xl:absolute xl:inset-0 xl:h-full xl:min-h-[560px]"
          />
        </div>
      </div>
    </section>
  );
}
