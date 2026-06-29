import type { Metadata } from "next";
import Link from "next/link";
import { CampaignInquiryForm } from "@/components/campaign-inquiry-form";
import { MaterialIcon } from "@/components/material-icon";
import { highlights, testimonials, trustBadges } from "@/lib/content";
import { PREMIUM_AUDIENCE_CARDS } from "@/lib/premium-audience";
import { formatPKR } from "@/lib/packages";
import { absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Book Umrah — Pakistan's Digital Umrah Platform",
  description:
    "Plan with Alwrd — Pakistan's 1st Smart Umrah System. Be Blessed, Be Budgeted, Be Balanced.",
  alternates: { canonical: absoluteUrl("/book-umrah") },
  robots: { index: true, follow: true },
};

const DURATION_BLOCKS = [
  { days: 10, label: "10-Day Comfort", desc: "Focused worship with essential ziyarat and guided support." },
  { days: 14, label: "14-Day Reflection", desc: "Balanced time in Makkah and Madinah with premium hotels." },
  { days: 21, label: "21-Day Retreat", desc: "Extended stay for deeper spiritual connection and rest." },
];

export default function BookUmrahLandingPage() {
  const featured = testimonials[1];

  return (
    <>
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/hero.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/70" />
        <div className="relative mx-auto max-w-[1280px] px-4 py-16 text-center text-white sm:px-6 sm:py-24">
          <p className="text-sm font-semibold uppercase tracking-widest text-white/90">
            Be Blessed · Be Budgeted · Be Balanced
          </p>
          <h1 className="mx-auto mt-4 max-w-3xl text-3xl font-heavy leading-tight sm:text-4xl lg:text-5xl">
            Plan with Alwrd — Pakistan&apos;s 1st Smart Umrah System
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base text-white/90 sm:text-lg">
            From visa to ziyarat, we handle the logistics so you can focus on worship.
            Transparent PKR pricing — no agents, no hidden charges.
          </p>
        </div>
      </section>

      <section className="border-b border-outline-variant bg-white py-12 sm:py-16">
        <div className="mx-auto grid max-w-[1280px] gap-10 px-4 lg:grid-cols-2 lg:items-start lg:px-8">
          <div>
            <h2 className="font-display text-2xl font-bold text-ink">
              Get your Umrah quote
            </h2>
            <p className="mt-2 text-sm text-slate-muted">
              Tell us your preferred month and group size — we confirm availability on WhatsApp.
            </p>
            <div className="mt-6 rounded-2xl border border-outline-variant bg-surface-container-low p-6 shadow-sm sm:p-8">
              <CampaignInquiryForm />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
            {DURATION_BLOCKS.map((block) => (
              <div
                key={block.days}
                className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-5 shadow-sm"
              >
                <p className="text-xs font-bold uppercase tracking-wide text-primary">
                  {block.days} days
                </p>
                <h3 className="mt-2 font-display text-lg font-semibold text-ink">
                  {block.label}
                </h3>
                <p className="mt-2 text-sm text-slate-muted">{block.desc}</p>
                <Link
                  href={`/packages?duration=${block.days}`}
                  className="mt-4 inline-block text-sm font-semibold text-primary hover:underline"
                >
                  View packages →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6">
          <h2 className="text-center font-display text-2xl font-bold text-ink">
            Value-added services
          </h2>
          <p className="mx-auto mt-2 max-w-lg text-center text-sm text-slate-muted">
            Why booking with Alwrd is better than planning alone.
          </p>
          <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
            {highlights.slice(0, 4).map((h) => (
              <Link
                key={h.title}
                href={h.href}
                className="rounded-xl border border-outline-variant bg-white p-4 text-center shadow-sm transition-all hover:border-primary/40 hover:shadow-md"
              >
                <MaterialIcon name={h.icon} className="mx-auto text-2xl text-primary" />
                <p className="mt-2 text-sm font-semibold text-ink">{h.title}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-outline-variant bg-surface-container-low py-16">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6">
          <h2 className="text-center font-display text-2xl font-bold text-ink">
            Premium packages for every pilgrim
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {PREMIUM_AUDIENCE_CARDS.map((card) => (
              <Link
                key={card.slug}
                href={card.href}
                className="rounded-2xl border border-outline-variant bg-white p-6 shadow-sm transition-all hover:border-primary/40 hover:shadow-md"
              >
                <h3 className="font-display font-semibold text-ink">{card.title}</h3>
                <p className="mt-1 text-sm text-slate-muted">From {formatPKR(card.priceFrom)}</p>
                <span className="mt-3 inline-block text-sm font-semibold text-primary">
                  {card.cta} →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-2xl px-4 text-center sm:px-6">
          <MaterialIcon name="verified" className="mx-auto text-4xl text-primary" />
          <h2 className="mt-4 font-display text-xl font-bold text-ink">{trustBadges.title}</h2>
          <p className="mt-2 text-sm text-slate-muted">{trustBadges.desc}</p>
          <blockquote className="mt-8 rounded-2xl border border-outline-variant bg-white p-6 italic text-on-surface-variant shadow-sm">
            &ldquo;{featured.quote}&rdquo;
            <footer className="mt-3 text-sm font-semibold not-italic text-ink">
              — {featured.name}, {featured.city}
            </footer>
          </blockquote>
        </div>
      </section>
    </>
  );
}
