import Link from "next/link";
import { MaterialIcon } from "@/components/material-icon";
import { SearchWidget } from "@/components/search-widget";
import { stats, testimonials, trustBadges } from "@/lib/content";
import { whatsappLink, site } from "@/lib/site";

export function CampaignLandingView() {
  const featured = testimonials[1];

  return (
    <div className="bg-surface-tint">
      <section className="hero-pattern overflow-x-hidden py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-block rounded-full bg-primary/10 px-4 py-1 text-xs font-semibold text-primary sm:text-sm">
              Limited departures · Transparent pricing
            </span>
            <h1 className="mt-4 text-[28px] font-heavy leading-tight text-on-background sm:text-4xl lg:text-5xl">
              Book Your Umrah Directly —
              <span className="text-primary"> No Agents. No Hidden Charges.</span>
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-base text-on-surface-variant sm:text-lg">
              Pakistan&apos;s first digital Umrah platform. Search packages, compare
              inclusions, and submit an inquiry — our team confirms everything
              with you personally.
            </p>
          </div>

          <div className="mx-auto mt-10 max-w-lg">
            <SearchWidget />
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/packages"
              className="rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-on-primary hover:bg-primary-dark"
            >
              Browse all packages
            </Link>
            <a
              href={whatsappLink(
                "Assalamu alaikum, I saw your Umrah offer and would like to book.",
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-outline-variant px-6 py-3 text-sm font-semibold text-primary hover:bg-primary/5"
            >
              WhatsApp us
            </a>
          </div>
        </div>
      </section>

      <section className="border-y border-outline-variant bg-white py-12">
        <div className="mx-auto grid max-w-[1280px] grid-cols-2 gap-6 px-4 sm:grid-cols-4 sm:px-6">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-2xl font-bold text-primary sm:text-3xl">
                {s.value}
              </p>
              <p className="mt-1 text-xs text-on-surface-variant sm:text-sm">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6">
          <h2 className="text-center font-display text-2xl font-bold text-ink sm:text-3xl">
            Why book with {site.name}?
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {[
              {
                icon: "verified",
                title: "Licensed operator",
                desc: trustBadges.desc,
              },
              {
                icon: "payments",
                title: "Transparent PKR pricing",
                desc: "Every inclusion listed upfront — visa, hotels, meals, and transport.",
              },
              {
                icon: "support_agent",
                title: "24/7 support in KSA",
                desc: "Coordinators in Makkah and Madinah from arrival to departure.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-outline-variant bg-white p-6 text-center shadow-sm"
              >
                <span className="mx-auto grid h-12 w-12 place-items-center rounded-xl bg-primary/10">
                  <MaterialIcon name={item.icon} className="text-2xl text-primary" />
                </span>
                <h3 className="mt-4 font-display text-lg font-semibold text-ink">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-slate-muted">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface-container-low py-16">
        <div className="mx-auto max-w-2xl px-4 text-center sm:px-6">
          <p className="text-base italic text-on-surface-variant">
            &ldquo;{featured.quote}&rdquo;
          </p>
          <p className="mt-4 text-sm font-semibold text-ink">
            {featured.name} · {featured.city}
          </p>
          <Link
            href="/inquiry"
            className="mt-8 inline-block rounded-lg bg-primary px-8 py-3.5 text-sm font-semibold text-on-primary hover:bg-primary-dark"
          >
            Start your inquiry
          </Link>
        </div>
      </section>
    </div>
  );
}
