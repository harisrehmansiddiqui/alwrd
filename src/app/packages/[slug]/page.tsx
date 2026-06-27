import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getAllPackages,
  getPackage,
  TIERS,
  discountPercent,
  formatPKR,
  type Package,
} from "@/lib/packages";
import { whatsappLink } from "@/lib/site";

const STANDARD_INCLUSIONS = [
  "Return economy flights",
  "Umrah visa processing",
  "Airport & inter-city transfers",
  "Hotel accommodation near the Haram",
  "Daily breakfast and dinner",
  "Guided ziyarat tours",
  "24/7 on-ground support",
];

function buildItinerary(pkg: Package) {
  return [
    { day: 1, title: "Arrival in Jeddah & transfer to Makkah", desc: "Meet & greet at the airport, private transfer and hotel check-in." },
    { day: 2, title: "Perform Umrah", desc: "Guided Umrah with our on-ground team, at your own pace." },
    { day: 3, title: "Ibadah in Makkah", desc: "Prayers at Masjid al-Haram and optional ziyarat of nearby sites." },
    { day: Math.max(4, pkg.durationNights - 2), title: "Transfer to Madinah", desc: "Travel to Madinah and check in to your hotel near Masjid an-Nabawi." },
    { day: pkg.durationNights, title: "Departure", desc: "Final prayers, hotel checkout and transfer to the airport." },
  ];
}

export function generateStaticParams() {
  return getAllPackages().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const pkg = getPackage(slug);
  if (!pkg) return { title: "Package not found" };
  return {
    title: `${pkg.title} — ${pkg.durationDays} Days from ${pkg.city}`,
    description: `${pkg.tagline}. ${pkg.durationDays}D/${pkg.durationNights}N Umrah package from ${pkg.city}, from ${formatPKR(pkg.price)} per person.`,
  };
}

export default async function PackageDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const pkg = getPackage(slug);
  if (!pkg) notFound();

  const tier = TIERS[pkg.tier];
  const discount = discountPercent(pkg);
  const itinerary = buildItinerary(pkg);
  const bookHref = `/inquiry?package=${pkg.slug}`;

  return (
    <div className="bg-surface-tint">
      <section className="relative bg-ink text-white">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-50"
          style={{ backgroundImage: `url('${pkg.image}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink to-ink/40" />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <Link href="/packages" className="text-sm text-white/70 hover:text-white">
            ← Back to packages
          </Link>
          <div className="mt-4 flex flex-wrap items-center gap-2 text-sm text-white/80">
            <span className="rounded-full bg-white/15 px-3 py-1">
              {tier.label} · {tier.stars}-Star
            </span>
            <span className="rounded-full bg-white/15 px-3 py-1">{pkg.city}</span>
            <span className="rounded-full bg-white/15 px-3 py-1">
              {pkg.durationDays}D / {pkg.durationNights}N
            </span>
          </div>
          <h1 className="mt-4 font-display text-3xl font-extrabold sm:text-5xl">
            {pkg.title}
          </h1>
          <p className="mt-2 max-w-2xl text-white/80">{pkg.tagline}</p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
          <div className="space-y-10">
            <Block title="What's included">
              <ul className="grid gap-2 sm:grid-cols-2">
                {STANDARD_INCLUSIONS.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-ink/80">
                    <svg viewBox="0 0 24 24" className="mt-0.5 h-4 w-4 shrink-0 fill-brand">
                      <path d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {pkg.amenities.map((a) => (
                  <span
                    key={a}
                    className="rounded-md bg-brand-pill px-2 py-0.5 text-[11px] font-medium text-brand-heading"
                  >
                    {a}
                  </span>
                ))}
              </div>
            </Block>

            <Block title="Day-by-day itinerary">
              <ol className="space-y-4">
                {itinerary.map((step) => (
                  <li key={step.day} className="flex gap-4">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand text-sm font-semibold text-white">
                      {step.day}
                    </span>
                    <div>
                      <h3 className="font-display text-base font-semibold text-ink">
                        {step.title}
                      </h3>
                      <p className="text-sm text-slate-muted">{step.desc}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </Block>

            <Block title="Hotels">
              <div className="grid gap-4 sm:grid-cols-2">
                {["Makkah", "Madinah"].map((cityName) => (
                  <div key={cityName} className="rounded-xl bg-surface-tint p-4">
                    <div className="text-xs font-medium text-slate-muted">
                      {cityName}
                    </div>
                    <div className="mt-1 font-display font-semibold text-ink">
                      {tier.stars}-Star Hotel near the Haram
                    </div>
                    <div className="mt-1 flex text-gold">
                      {Array.from({ length: tier.stars }).map((_, i) => (
                        <svg key={i} viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current">
                          <path d="M12 2l2.9 6 6.6.6-5 4.4 1.5 6.5L12 16.9 5.9 19.5 7.4 13l-5-4.4 6.6-.6L12 2z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Block>
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-card">
              {pkg.oldPrice && (
                <span className="text-sm text-slate-muted line-through">
                  {formatPKR(pkg.oldPrice)}
                </span>
              )}
              <div className="flex items-end gap-2">
                <span className="font-display text-3xl font-extrabold text-brand-heading">
                  {formatPKR(pkg.price)}
                </span>
                <span className="pb-1 text-sm text-slate-muted">per person</span>
              </div>
              {discount && (
                <span className="mt-1 inline-block rounded-full bg-gold/20 px-2.5 py-0.5 text-xs font-bold text-ink">
                  Save {discount}%
                </span>
              )}

              <Link
                href={bookHref}
                className="mt-5 block rounded-xl bg-brand px-5 py-3.5 text-center text-sm font-semibold text-white transition-colors hover:bg-brand-deep"
              >
                Request This Package
              </Link>
              <a
                href={whatsappLink(`Assalamu alaikum, I'm interested in the ${pkg.title} (${pkg.city}, ${pkg.durationDays} days).`)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 block rounded-xl border border-brand/30 px-5 py-3.5 text-center text-sm font-semibold text-brand transition-colors hover:bg-brand-pill"
              >
                Ask on WhatsApp
              </a>
              <p className="mt-4 text-center text-xs text-slate-muted">
                No payment now — submit an inquiry and our team will confirm
                availability and details with you.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

function Block({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
      <h2 className="mb-4 font-display text-xl font-bold text-ink">{title}</h2>
      {children}
    </section>
  );
}
