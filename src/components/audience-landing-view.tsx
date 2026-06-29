import Link from "next/link";
import { FaqAccordion } from "@/components/faq-accordion";
import { InquiryForm } from "@/components/inquiry-form";
import { MaterialIcon } from "@/components/material-icon";
import { PackageCard } from "@/components/package-card";
import { PageHeader } from "@/components/page-header";
import { JsonLd } from "@/components/json-ld";
import { SectionHeading } from "@/components/section-heading";
import type { AudienceLandingConfig } from "@/lib/audience-landing";
import { packagesFilterHref } from "@/lib/audience-landing";
import type { Package } from "@/lib/packages";
import { faqPageSchema } from "@/lib/seo";
import { whatsappLink, site } from "@/lib/site";

export function AudienceLandingView({
  config,
  packages,
}: {
  config: AudienceLandingConfig;
  packages: Package[];
}) {
  const featured = packages.slice(0, 6);
  const catalogHref = packagesFilterHref(config.slug);

  return (
    <div className="bg-surface-tint">
      <JsonLd data={faqPageSchema(config.faqs)} />
      <PageHeader title={config.title} subtitle={config.subtitle} />

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {config.benefits.map((b) => (
            <div
              key={b.title}
              className="rounded-2xl border border-outline-variant bg-white p-6 shadow-sm"
            >
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10">
                <MaterialIcon name={b.icon} className="text-primary" />
              </span>
              <h2 className="mt-3 font-display text-base font-semibold text-ink">
                {b.title}
              </h2>
              <p className="mt-1 text-sm text-slate-muted">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <section className="border-t border-black/5 bg-surface-container-lowest py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title={config.packagesHeading}
            subtitle={config.packagesSubtitle}
            action={{ label: "View all", href: catalogHref }}
          />
          {featured.length > 0 ? (
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featured.map((pkg) => (
                <PackageCard key={pkg.departureId} pkg={pkg} />
              ))}
            </div>
          ) : (
            <div className="mt-8 rounded-2xl border border-dashed border-black/10 bg-white p-10 text-center">
              <p className="font-display text-lg font-semibold text-ink">
                No upcoming packages in this category
              </p>
              <p className="mt-2 text-sm text-slate-muted">
                Submit an inquiry below and our team will share available dates
                with you.
              </p>
              <Link
                href="/packages"
                className="mt-4 inline-block text-sm font-semibold text-primary hover:underline"
              >
                Browse all packages →
              </Link>
            </div>
          )}
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Frequently asked questions"
            subtitle={`Common questions about ${config.title.toLowerCase()}.`}
            centered
          />
          <div className="mt-8">
            <FaqAccordion items={config.faqs} />
          </div>
        </div>
      </section>

      <section className="border-t border-black/5 bg-white py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl font-bold text-brand-heading sm:text-3xl">
            Request your package
          </h2>
          <p className="mt-2 text-slate-muted">
            Tell us your travel dates and group size — we confirm availability
            and pricing personally on WhatsApp or phone.
          </p>
          <div className="mt-6 rounded-2xl border border-black/5 bg-surface-tint p-6 shadow-sm sm:p-8">
            <InquiryForm defaultGroupSize={config.defaultGroupSize} />
          </div>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <a
              href={whatsappLink(
                `Assalamu alaikum, I am interested in ${config.title}.`,
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-on-primary hover:bg-primary-dark"
            >
              Chat on WhatsApp
            </a>
            <a
              href={`tel:${site.phone.replace(/\s/g, "")}`}
              className="rounded-xl border border-outline-variant px-5 py-3 text-sm font-semibold text-on-surface"
            >
              Call {site.phone}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
