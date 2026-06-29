import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { FaqAccordion } from "@/components/faq-accordion";
import { JsonLd } from "@/components/json-ld";
import { faqs } from "@/lib/content";
import { faqPageSchema } from "@/lib/seo";
import { whatsappLink, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description:
    "Answers to common questions about Umrah packages, visa processing, hotels, booking and on-ground support with Al Wrd Hajj & Umrah.",
};

export default function FaqPage() {
  return (
    <div className="bg-surface-tint">
      <JsonLd data={faqPageSchema(faqs)} />
      <PageHeader
        title="Frequently Asked Questions"
        subtitle="Everything you need to know before you book your Umrah."
      />
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <FaqAccordion />

        <div className="mt-10 rounded-2xl bg-tertiary p-8 text-center text-on-tertiary">
          <h2 className="font-display text-xl font-bold">Still have questions?</h2>
          <p className="mt-2 text-sm text-neutral-40">
            Our team is here to help you plan your journey.
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <a
              href={whatsappLink("Assalamu alaikum, I have a question about Umrah.")}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl bg-secondary px-5 py-3 text-sm font-semibold text-on-secondary hover:bg-neutral-20"
            >
              Chat on WhatsApp
            </a>
            <a
              href={`tel:${site.phone.replace(/\s/g, "")}`}
              className="rounded-xl border border-neutral-40 px-5 py-3 text-sm font-semibold text-on-tertiary"
            >
              Call {site.phone}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
