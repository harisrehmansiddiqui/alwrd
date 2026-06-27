import { SearchWidget } from "@/components/search-widget";
import { HeroCarousel } from "@/components/hero-carousel";
import { heroSlides } from "@/lib/content";

export function Hero() {
  return (
    <section className="hero-pattern overflow-x-hidden py-3 sm:py-6 xl:py-6 2xl:py-10">
      <div className="mx-auto grid min-w-0 max-w-[1280px] grid-cols-1 gap-3 px-4 sm:gap-6 sm:px-6 xl:grid-cols-2 xl:items-start xl:gap-8 2xl:gap-10">
        <div className="flex min-w-0 flex-col space-y-2 sm:space-y-3 xl:space-y-3 2xl:space-y-4">
          <span className="inline-block w-fit rounded-full bg-primary/10 px-3 py-0.5 text-[11px] font-semibold text-primary sm:px-4 sm:py-1 sm:text-sm">
            Book. Budget. Be Blessed.
          </span>
          <h1 className="text-[22px] font-heavy leading-[1.15] text-on-background sm:text-[28px] md:text-[32px] md:leading-tight xl:text-[36px] 2xl:text-[44px] 2xl:leading-[52px]">
            Transparent Booking.
            <br />
            <span className="text-primary">No Agents. No Hidden Charges.</span>
          </h1>
          <p className="hidden max-w-lg text-base font-light leading-6 text-on-surface-variant 2xl:block 2xl:text-lg 2xl:leading-7">
            Plan your Umrah with transparent pricing, trusted guidance, honest
            commitments, and a dedicated support team — delivering exactly what
            is promised.
          </p>
          <SearchWidget />
        </div>

        <div className="relative hidden min-w-0 xl:block">
          <HeroCarousel
            slides={heroSlides}
            className="h-[min(420px,calc(100svh-5.5rem))] 2xl:h-[min(480px,calc(100svh-6rem))]"
          />
        </div>
      </div>
    </section>
  );
}
