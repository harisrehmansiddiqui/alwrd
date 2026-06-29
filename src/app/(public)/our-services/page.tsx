import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { MaterialIcon } from "@/components/material-icon";
import { VALUE_SERVICE_SLUGS, VALUE_SERVICES } from "@/lib/value-services";

export const metadata: Metadata = {
  title: "Our Services",
  description:
    "Visa processing, premium hotels near the Haram, private transport, authentic meals, ziyarat tours and 24/7 support — everything Al Wrd offers.",
};

const coreServices = [
  {
    title: "Umrah Visa Processing",
    desc: "Fast, reliable visa handling with full documentation support.",
  },
  {
    title: "Hotels Near the Haram",
    desc: "3, 4 and 5-star hotels within walking distance of the holy mosques.",
  },
  {
    title: "Private Transport",
    desc: "Air-conditioned airport transfers and inter-city travel.",
  },
  {
    title: "Authentic Meals",
    desc: "Daily Pakistani breakfast and dinner to keep you comfortable.",
  },
  {
    title: "Guided Ziyarat",
    desc: "Visit the historic sites of Makkah and Madinah with our guides.",
  },
  {
    title: "24/7 On-Ground Support",
    desc: "A dedicated team with you at every step of the journey.",
    href: "/our-services/on-ground-support",
  },
];

export default function ServicesPage() {
  const highlights = VALUE_SERVICE_SLUGS.map((slug) => VALUE_SERVICES[slug]);

  return (
    <div className="bg-surface-tint">
      <PageHeader
        title="Our Services"
        subtitle="Everything you need for a smooth and blessed Umrah."
      />
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {coreServices.map((s) => {
            const inner = (
              <>
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-pill">
                  <svg viewBox="0 0 24 24" className="h-5 w-5 fill-brand">
                    <path d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z" />
                  </svg>
                </span>
                <h3 className="mt-3 font-display text-base font-semibold text-ink">
                  {s.title}
                </h3>
                <p className="mt-1 text-sm text-slate-muted">{s.desc}</p>
              </>
            );

            if ("href" in s && s.href) {
              return (
                <Link
                  key={s.title}
                  href={s.href}
                  className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm transition-all hover:border-primary/30 hover:shadow-md"
                >
                  {inner}
                </Link>
              );
            }

            return (
              <div
                key={s.title}
                className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm"
              >
                {inner}
              </div>
            );
          })}
        </div>

        <h2 className="mt-12 font-display text-2xl font-bold text-ink">
          Unique highlights
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-slate-muted">
          Click any service to learn what is included and how to add it to your
          package.
        </p>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map((h) => (
            <Link
              key={h.slug}
              href={`/our-services/${h.slug}`}
              className="group overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm transition-all hover:border-primary/40 hover:shadow-md"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={h.image}
                  alt={h.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 50vw, 25vw"
                />
                <div className="absolute bottom-3 left-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 shadow-sm">
                  <MaterialIcon name={h.icon} className="text-lg text-primary" />
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-display text-sm font-semibold text-ink">
                  {h.title}
                </h3>
                <p className="mt-1 text-xs text-slate-muted">{h.shortDesc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
