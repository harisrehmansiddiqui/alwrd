import Image from "next/image";
import Link from "next/link";
import { FaqAccordion } from "@/components/faq-accordion";
import { JsonLd } from "@/components/json-ld";
import { MaterialIcon } from "@/components/material-icon";
import { PageHeader } from "@/components/page-header";
import type { ValueServiceConfig } from "@/lib/value-services";
import { faqPageSchema } from "@/lib/seo";
import { whatsappLink } from "@/lib/site";

export function ServiceDetailView({ service }: { service: ValueServiceConfig }) {
  return (
    <div className="bg-surface-tint">
      <JsonLd data={faqPageSchema(service.faqs)} />
      <PageHeader title={service.title} subtitle={service.subtitle} />

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
          <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-outline-variant shadow-sm">
            <Image
              src={service.image}
              alt={service.title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          </div>
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              <MaterialIcon name={service.icon} className="text-base" />
              Value-added service
            </span>
            <p className="mt-4 text-base leading-relaxed text-on-surface-variant">
              {service.intro}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/inquiry"
                className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-on-primary hover:bg-primary-dark"
              >
                Request this service
              </Link>
              <a
                href={whatsappLink(service.inquiryMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-outline-variant px-5 py-2.5 text-sm font-semibold text-primary hover:bg-primary/5"
              >
                WhatsApp us
              </a>
            </div>
          </div>
        </div>

        <h2 className="mt-14 font-display text-2xl font-bold text-ink">
          What&apos;s included
        </h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          {service.features.map((f) => (
            <div
              key={f.title}
              className="rounded-2xl border border-outline-variant bg-white p-6 shadow-sm"
            >
              <h3 className="font-display text-base font-semibold text-ink">
                {f.title}
              </h3>
              <p className="mt-1 text-sm text-slate-muted">{f.desc}</p>
            </div>
          ))}
        </div>

        <h2 className="mt-14 font-display text-2xl font-bold text-ink">
          How it works
        </h2>
        <ol className="mt-6 space-y-4">
          {service.steps.map((step, i) => (
            <li
              key={step.title}
              className="flex gap-4 rounded-2xl border border-outline-variant bg-white p-5 shadow-sm"
            >
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary text-sm font-bold text-on-primary">
                {i + 1}
              </span>
              <div>
                <h3 className="font-display text-base font-semibold text-ink">
                  {step.title}
                </h3>
                <p className="mt-1 text-sm text-slate-muted">{step.desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <section className="border-t border-black/5 bg-white py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center font-display text-2xl font-bold text-ink">
            Common questions
          </h2>
          <div className="mt-8">
            <FaqAccordion items={service.faqs} />
          </div>
        </div>
      </section>
    </div>
  );
}
