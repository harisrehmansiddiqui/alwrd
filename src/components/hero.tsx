import { SearchWidget } from "@/components/search-widget";
import { MaterialIcon } from "@/components/material-icon";

export function Hero() {
  return (
    <section className="hero-pattern overflow-hidden py-16 sm:py-20 lg:py-[80px]">
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
          <div
            className="aspect-[4/3] w-full rounded-2xl bg-cover bg-center shadow-2xl"
            style={{ backgroundImage: "url('/hero.jpg')" }}
            role="img"
            aria-label="Umrah pilgrimage experience"
          />
          <div className="glass absolute -bottom-6 -left-6 hidden rounded-xl border border-outline-variant p-6 shadow-lg md:block">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-on-primary">
                <MaterialIcon name="verified" />
              </div>
              <div>
                <p className="font-bold text-primary">Licensed Operator</p>
                <p className="text-xs text-on-surface-variant">
                  Registered Hajj & Umrah provider
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
