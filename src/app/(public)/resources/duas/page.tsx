import type { Metadata } from "next";
import Link from "next/link";
import { DuasTimeline } from "@/components/duas-timeline";
import { FaqAccordion } from "@/components/faq-accordion";
import { JsonLd } from "@/components/json-ld";
import { PageHeader } from "@/components/page-header";
import {
  DUAS_FAQS,
  DUAS_TIMELINE,
  DUAS_WHATSAPP_MESSAGE,
} from "@/lib/duas";
import { absoluteUrl, faqPageSchema } from "@/lib/seo";
import { whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Essential Du'as for Umrah",
  description:
    "A step-by-step guide to essential du'as for Umrah — from Ihram and Talbiyah to Tawaf, Sa'i, and Madinah. Download the PDF via WhatsApp.",
  alternates: { canonical: absoluteUrl("/resources/duas") },
  openGraph: {
    title: "Essential Du'as for Umrah | Al Wrd Hajj & Umrah",
    description:
      "Timeline guide to Umrah supplications with Arabic, transliteration, and translation.",
    url: absoluteUrl("/resources/duas"),
  },
};

const RELATED_LINKS = [
  {
    title: "Umrah Checklist",
    desc: "What to pack and prepare before departure.",
    href: "/resources/checklist",
  },
  {
    title: "Pre-Departure Orientation",
    desc: "Learn the rituals before you travel.",
    href: "/our-services/pre-departure-orientation",
  },
  {
    title: "Browse Packages",
    desc: "Find a departure that fits your dates and budget.",
    href: "/packages",
  },
  {
    title: "FAQ",
    desc: "Answers about booking, visa, and on-ground support.",
    href: "/faq",
  },
];

export default function DuasPage() {
  return (
    <div className="bg-surface-tint">
      <JsonLd data={faqPageSchema(DUAS_FAQS)} />
      <PageHeader
        title="Essential Du'as for Umrah"
        subtitle="Follow the journey step by step — from home to Makkah, Madinah, and completion."
      />

      <div className="border-b border-primary/20 bg-primary/5">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 px-4 py-8 text-center sm:px-6 lg:px-8">
          <p className="text-sm text-on-surface-variant">
            Save this guide offline — request our printable PDF on WhatsApp before
            you travel.
          </p>
          <a
            href={whatsappLink(DUAS_WHATSAPP_MESSAGE)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-on-primary shadow-md hover:bg-primary-dark"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden>
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.882 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Get Du&apos;as PDF on WhatsApp
          </a>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <DuasTimeline phases={DUAS_TIMELINE} />
      </div>

      <section className="border-t border-black/5 bg-white py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center font-display text-2xl font-bold text-ink">
            Frequently asked questions
          </h2>
          <div className="mt-8">
            <FaqAccordion items={DUAS_FAQS} />
          </div>
        </div>
      </section>

      <section className="border-t border-black/5 bg-surface-container-low py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl font-bold text-ink">
            Continue preparing
          </h2>
          <p className="mt-2 text-sm text-slate-muted">
            More resources to support your Umrah journey.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {RELATED_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-2xl border border-outline-variant bg-white p-5 shadow-sm transition-all hover:border-primary/40 hover:shadow-md"
              >
                <h3 className="font-display text-base font-semibold text-primary">
                  {link.title}
                </h3>
                <p className="mt-1 text-sm text-slate-muted">{link.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
