import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { highlights } from "@/lib/content";

export const metadata: Metadata = {
  title: "Our Services",
  description:
    "Visa processing, premium hotels near the Haram, private transport, authentic meals, ziyarat tours and 24/7 support — everything Al Wrd offers.",
};

const services = [
  { title: "Umrah Visa Processing", desc: "Fast, reliable visa handling with full documentation support." },
  { title: "Hotels Near the Haram", desc: "3, 4 and 5-star hotels within walking distance of the holy mosques." },
  { title: "Private Transport", desc: "Air-conditioned airport transfers and inter-city travel." },
  { title: "Authentic Meals", desc: "Daily Pakistani breakfast and dinner to keep you comfortable." },
  { title: "Guided Ziyarat", desc: "Visit the historic sites of Makkah and Madinah with our guides." },
  { title: "24/7 On-Ground Support", desc: "A dedicated team with you at every step of the journey." },
];

export default function ServicesPage() {
  return (
    <div className="bg-surface-tint">
      <PageHeader
        title="Our Services"
        subtitle="Everything you need for a smooth and blessed Umrah."
      />
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <div
              key={s.title}
              className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm"
            >
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-pill">
                <svg viewBox="0 0 24 24" className="h-5 w-5 fill-brand">
                  <path d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z" />
                </svg>
              </span>
              <h3 className="mt-3 font-display text-base font-semibold text-ink">
                {s.title}
              </h3>
              <p className="mt-1 text-sm text-slate-muted">{s.desc}</p>
            </div>
          ))}
        </div>

        <h2 className="mt-12 font-display text-2xl font-bold text-ink">
          Unique highlights
        </h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map((h) => (
            <div
              key={h.title}
              className="rounded-2xl border border-black/5 bg-white p-5 shadow-sm"
            >
              <h3 className="font-display text-sm font-semibold text-ink">
                {h.title}
              </h3>
              <p className="mt-1 text-xs text-slate-muted">{h.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
