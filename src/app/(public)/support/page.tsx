import type { Metadata } from "next";
import Link from "next/link";
import { FaqAccordion } from "@/components/faq-accordion";
import { JsonLd } from "@/components/json-ld";
import { PageHeader } from "@/components/page-header";
import { WhatsAppQrCard } from "@/components/whatsapp-qr";
import { MaterialIcon } from "@/components/material-icon";
import { contactPhones, contactEmails, telHref } from "@/lib/company";
import { SUPPORT_WHATSAPP_MESSAGE } from "@/lib/collaborations";
import {
  SUPPORT_COMMITMENT,
  SUPPORT_ECOSYSTEM,
  SUPPORT_FAQS,
  SUPPORT_PROCESS,
  SUPPORT_SAFETY,
} from "@/lib/support-content";
import { absoluteUrl, faqPageSchema } from "@/lib/seo";
import { whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "24/7 Pilgrim Support",
  description:
    "Alwrd 24/7 pilgrim support — WhatsApp, phone, and on-ground coordinators in Makkah and Madinah. Always with you before, during, and after your Umrah.",
  alternates: { canonical: absoluteUrl("/support") },
};

export default function SupportPage() {
  return (
    <div className="bg-surface-tint">
      <JsonLd data={faqPageSchema([...SUPPORT_FAQS])} />
      <PageHeader
        title="Alwrd 24/7 Pilgrim Support"
        subtitle="Always with you — from airport arrival to your return home."
      />

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <blockquote className="rounded-2xl border border-primary/15 bg-white p-8 text-lg leading-relaxed text-ink/90 shadow-sm sm:p-10">
          {SUPPORT_COMMITMENT}
        </blockquote>

        <h2 className="mt-16 font-display text-2xl font-bold text-ink">
          Our state-of-the-art support ecosystem
        </h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {SUPPORT_ECOSYSTEM.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-outline-variant bg-white p-6 shadow-sm transition-all hover:border-primary/30 hover:shadow-md"
            >
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-primary/10">
                <MaterialIcon name={item.icon} className="text-2xl text-primary" />
              </span>
              <h3 className="mt-4 font-display text-lg font-semibold text-ink">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-muted">{item.desc}</p>
            </div>
          ))}
        </div>

        <h2 className="mt-16 font-display text-2xl font-bold text-ink">
          How our support process works
        </h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SUPPORT_PROCESS.map((step) => (
            <div
              key={step.step}
              className="relative rounded-2xl border border-outline-variant bg-white p-5 text-center shadow-sm"
            >
              <span className="mx-auto grid h-10 w-10 place-items-center rounded-full bg-primary text-sm font-bold text-on-primary">
                {step.step}
              </span>
              <h3 className="mt-3 font-display font-semibold text-ink">{step.title}</h3>
              <p className="mt-1 text-xs leading-relaxed text-slate-muted">{step.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 grid gap-10 lg:grid-cols-2 lg:items-start">
          <div>
            <h2 className="font-display text-2xl font-bold text-ink">Connection hub</h2>
            <p className="mt-2 text-slate-muted">
              Pakistan and Saudi Arabia support lines — scan or tap to connect.
            </p>
            <ul className="mt-6 space-y-3">
              <li>
                <p className="text-xs font-bold uppercase tracking-wide text-primary">
                  Pakistan
                </p>
                {contactPhones
                  .filter((p) => p.label === "Pakistan")
                  .map((p) => (
                    <a
                      key={p.number}
                      href={telHref(p.number)}
                      className="mt-1 block text-sm font-medium text-ink hover:text-primary"
                    >
                      {p.number}
                    </a>
                  ))}
              </li>
              <li className="pt-2">
                <p className="text-xs font-bold uppercase tracking-wide text-primary">
                  Saudi Arabia
                </p>
                {contactPhones
                  .filter((p) => p.label === "Saudi Arabia")
                  .map((p) => (
                    <a
                      key={p.number}
                      href={telHref(p.number)}
                      className="mt-1 block text-sm font-medium text-ink hover:text-primary"
                    >
                      {p.number}
                    </a>
                  ))}
              </li>
              <li className="pt-2">
                <p className="text-xs font-bold uppercase tracking-wide text-primary">
                  Official WhatsApp (24/7)
                </p>
                <a
                  href={whatsappLink(SUPPORT_WHATSAPP_MESSAGE)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
                >
                  Click to chat
                  <MaterialIcon name="open_in_new" className="text-sm" />
                </a>
              </li>
              <li className="pt-2">
                <p className="text-xs font-bold uppercase tracking-wide text-primary">
                  Support email
                </p>
                <a
                  href={`mailto:${contactEmails[1]?.address ?? "support@alwrdgroup.com"}`}
                  className="mt-1 block text-sm font-medium text-primary hover:underline"
                >
                  {contactEmails[1]?.address ?? "support@alwrdgroup.com"}
                </a>
              </li>
            </ul>
          </div>
          <WhatsAppQrCard
            message={SUPPORT_WHATSAPP_MESSAGE}
            title="Al Wrd Pilgrim Support"
            subtitle="Scan to open WhatsApp — same as Smart Umrah QR flow."
            className="mx-auto max-w-sm lg:ml-auto"
          />
        </div>

        <section className="mt-16 rounded-2xl border border-outline-variant bg-white p-8 shadow-sm">
          <h2 className="font-display text-xl font-bold text-ink">
            The safety verification process
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-muted">{SUPPORT_SAFETY}</p>
        </section>

        <section className="mt-16">
          <h2 className="font-display text-2xl font-bold text-ink">Support FAQ</h2>
          <div className="mt-6">
            <FaqAccordion items={[...SUPPORT_FAQS]} />
          </div>
        </section>

        <div className="mt-12 rounded-2xl bg-primary p-8 text-center text-on-primary sm:p-10">
          <h2 className="font-display text-xl font-bold sm:text-2xl">
            Need immediate assistance?
          </h2>
          <p className="mx-auto mt-2 max-w-lg text-sm opacity-90">
            Our support team is online and ready to help.
          </p>
          <a
            href={whatsappLink(SUPPORT_WHATSAPP_MESSAGE)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-block rounded-lg bg-white px-8 py-3 text-sm font-bold text-primary hover:bg-white/90"
          >
            Chat with a specialist now
          </a>
          <p className="mt-4">
            <Link href="/contact" className="text-sm underline opacity-90 hover:opacity-100">
              View all contact options
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
