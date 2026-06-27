import { SectionHeading } from "@/components/section-heading";
import { PackageCard } from "@/components/package-card";
import { getGroupPackages, getPremiumPackages } from "@/lib/packages";
import {
  highlights,
  stats,
  trainFeatures,
  esimFeatures,
  resources,
} from "@/lib/content";
import Link from "next/link";

function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">{children}</div>
  );
}

export function GroupPackages() {
  const packages = getGroupPackages();
  return (
    <section className="py-16">
      <Container>
        <SectionHeading
          title="Group Packages"
          subtitle="Pre-designed Umrah packages with fixed itineraries — ideal for families, individuals and group travel at optimised pricing."
          action={{ label: "View All", href: "/packages?type=group" }}
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {packages.map((pkg) => (
            <PackageCard key={pkg.slug} pkg={pkg} />
          ))}
        </div>
      </Container>
    </section>
  );
}

export function PremiumPackages() {
  const packages = getPremiumPackages();
  return (
    <section className="bg-surface-tint py-16">
      <Container>
        <SectionHeading
          title="Premium Packages"
          subtitle="Personalised Umrah plans tailored to your travel dates, airline choices, hotel preferences and comfort needs."
          action={{ label: "View All", href: "/packages?tier=premium" }}
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {packages.map((pkg) => (
            <PackageCard key={pkg.slug} pkg={pkg} />
          ))}
        </div>
      </Container>
    </section>
  );
}

export function UniqueHighlights() {
  return (
    <section className="py-16">
      <Container>
        <SectionHeading
          title="Our Unique Highlights"
          subtitle="Unique offerings to make your Umrah more meaningful and comfortable."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map((h) => (
            <div
              key={h.title}
              className="rounded-2xl border border-black/5 bg-white p-5 shadow-sm transition-shadow hover:shadow-card"
            >
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-pill">
                <svg viewBox="0 0 24 24" className="h-5 w-5 fill-brand">
                  <path d="M12 2l2.9 6 6.6.6-5 4.4 1.5 6.5L12 16.9 5.9 19.5 7.4 13l-5-4.4 6.6-.6L12 2z" />
                </svg>
              </span>
              <h3 className="mt-3 font-display text-base font-semibold text-ink">
                {h.title}
              </h3>
              <p className="mt-1 text-sm text-slate-muted">{h.desc}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

export function HaramainTrain() {
  return (
    <section className="py-16">
      <Container>
        <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-brand-deep to-brand p-8 text-white sm:p-12">
          <span className="inline-block rounded-full bg-white/15 px-3 py-1 text-xs font-semibold">
            Coming Soon
          </span>
          <h2 className="mt-4 font-display text-2xl font-bold sm:text-3xl">
            Haramain High-Speed Train — Fast, Safe & Spiritual
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-white/80">
            Travel effortlessly between the holy cities of Makkah and Madinah
            with the fastest and most comfortable rail experience in Saudi
            Arabia.
          </p>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {trainFeatures.map((f) => (
              <div key={f.title}>
                <h3 className="font-display text-base font-semibold">
                  {f.title}
                </h3>
                <p className="mt-1 text-sm text-white/70">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

export function TrustStats() {
  return (
    <section className="border-y border-black/5 bg-white py-12">
      <Container>
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="font-display text-3xl font-extrabold text-brand-heading sm:text-4xl">
                {s.value}
              </div>
              <div className="mt-1 text-sm text-slate-muted">{s.label}</div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

export function EsimPromo() {
  return (
    <section className="py-16">
      <Container>
        <div className="rounded-3xl bg-surface-tint p-8 sm:p-12">
          <span className="inline-block rounded-full bg-gold/20 px-3 py-1 text-xs font-semibold text-ink">
            Coming Soon
          </span>
          <h2 className="mt-4 font-display text-2xl font-bold text-ink sm:text-3xl">
            Stay Connected With eSIM During Your Journey
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-slate-muted">
            Instant activation, no roaming charges — keep in touch with family
            and access essential services throughout your journey.
          </p>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {esimFeatures.map((f) => (
              <div key={f.title} className="rounded-2xl bg-white p-5 shadow-sm">
                <h3 className="font-display text-base font-semibold text-ink">
                  {f.title}
                </h3>
                <p className="mt-1 text-sm text-slate-muted">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

export function ResourcesSection() {
  return (
    <section className="bg-surface-tint py-16">
      <Container>
        <SectionHeading
          title="Your Journey, Fully Supported"
          subtitle="Helpful resources and services to guide you before and during your Umrah."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {resources.map((r) => (
            <Link
              key={r.title}
              href={r.href}
              className="group rounded-2xl border border-black/5 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-card"
            >
              <h3 className="font-display text-lg font-semibold text-ink">
                {r.title}
              </h3>
              <p className="mt-2 text-sm text-slate-muted">{r.desc}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand">
                Check it out
                <span className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </span>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
