import type { Metadata } from "next";
import Link from "next/link";
import { MaterialIcon } from "@/components/material-icon";
import { PageHeader } from "@/components/page-header";
import { globalFootprint, team } from "@/lib/company";
import {
  partnerLogos,
  stats,
  trustBadges,
} from "@/lib/content";
import { absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Al Wrd Hajj & Umrah — Pakistan's trusted digital Umrah platform with offices in Islamabad, Riyadh, and Madinah. Licensed operator, transparent pricing, 29+ years of experience.",
  alternates: { canonical: absoluteUrl("/about") },
};

export default function AboutPage() {
  return (
    <div className="bg-surface-tint">
      <PageHeader
        title="About Al Wrd Hajj & Umrah"
        subtitle="Guided by faith, driven by excellence — serving pilgrims from Pakistan and beyond."
      />

      <div className="mx-auto max-w-3xl space-y-5 px-4 py-12 text-ink/80 sm:px-6 lg:px-8">
        <p>
          At Al Wrd Hajj &amp; Umrah, we understand that performing Umrah is a
          deeply spiritual and life-changing journey. Our mission is to remove
          every logistical burden so you can focus entirely on your worship.
        </p>
        <p>
          As Pakistan&apos;s first digital Umrah booking platform, we offer
          transparent pricing with no agents and no hidden charges. Every package
          includes visa processing, premium hotels near the Haram, authentic
          Pakistani meals, and private transport — backed by coordinators in
          Pakistan and Saudi Arabia.
        </p>
      </div>

      <section className="border-y border-black/5 bg-white py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {stats.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border border-outline-variant bg-surface-container-low p-6 text-center"
              >
                <div className="font-display text-2xl font-extrabold text-primary sm:text-3xl">
                  {s.value}
                </div>
                <div className="mt-1 text-sm text-slate-muted">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl font-bold text-ink">
            Global footprint
          </h2>
          <p className="mt-2 max-w-2xl text-slate-muted">
            Local teams in Pakistan and on-ground support across the Kingdom.
          </p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {globalFootprint.map((region) => (
              <div
                key={region.region}
                className="rounded-2xl border border-outline-variant bg-white p-6 shadow-sm"
              >
                <h3 className="font-display text-lg font-semibold text-primary">
                  {region.region}
                </h3>
                <p className="mt-2 text-sm text-slate-muted">{region.desc}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {region.cities.map((city) => (
                    <span
                      key={city}
                      className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
                    >
                      {city}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-black/5 bg-surface-container-low py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl font-bold text-ink">Our teams</h2>
          <p className="mt-2 text-slate-muted">
            Dedicated specialists across Pakistan and Saudi Arabia.
          </p>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((member) => (
              <div
                key={member.name}
                className="rounded-2xl border border-outline-variant bg-white p-6 shadow-sm"
              >
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10">
                  <MaterialIcon name="groups" className="text-primary" />
                </span>
                <h3 className="mt-3 font-display text-base font-semibold text-ink">
                  {member.name}
                </h3>
                <p className="text-sm font-medium text-primary">{member.role}</p>
                <p className="mt-1 text-xs text-slate-muted">{member.location}</p>
                <p className="mt-2 text-sm text-slate-muted">{member.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-primary/20 bg-primary/5 p-8 sm:p-10">
            <h2 className="font-display text-xl font-bold text-ink sm:text-2xl">
              {trustBadges.title}
            </h2>
            <p className="mt-2 max-w-2xl text-slate-muted">{trustBadges.desc}</p>
            <p className="mt-2 text-sm font-medium text-primary">
              {trustBadges.certificate}
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              {partnerLogos.map((name) => (
                <span
                  key={name}
                  className="rounded-lg border border-outline-variant bg-white px-4 py-2 text-sm font-semibold text-on-surface-variant"
                >
                  {name}
                </span>
              ))}
            </div>
          </div>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/packages"
              className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-on-primary hover:bg-primary-dark"
            >
              Browse packages
            </Link>
            <Link
              href="/contact"
              className="rounded-lg border border-outline-variant px-5 py-2.5 text-sm font-semibold text-primary hover:bg-primary/5"
            >
              Contact us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
