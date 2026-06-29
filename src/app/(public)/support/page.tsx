import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { PageHeader } from "@/components/page-header";
import { WhatsAppQrCard } from "@/components/whatsapp-qr";
import { MaterialIcon } from "@/components/material-icon";
import { contactPhones, contactEmails, offices, telHref } from "@/lib/company";
import { SUPPORT_WHATSAPP_MESSAGE } from "@/lib/collaborations";
import { absoluteUrl } from "@/lib/seo";
import { whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Pilgrim Support",
  description:
    "24/7 Umrah pilgrim support from Al Wrd — WhatsApp, phone, email, and on-ground coordinators in Makkah and Madinah.",
  alternates: { canonical: absoluteUrl("/support") },
};

const quickLinks = [
  { title: "Essential Du'as", href: "/resources/duas", icon: "menu_book" },
  { title: "Umrah Checklist", href: "/resources/checklist", icon: "checklist" },
  {
    title: "24/7 On-Ground Support",
    href: "/our-services/on-ground-support",
    icon: "support_agent",
  },
  { title: "FAQ", href: "/faq", icon: "help" },
  { title: "Contact offices", href: "/contact", icon: "location_on" },
  { title: "Send inquiry", href: "/inquiry", icon: "mail" },
];

export default function SupportPage() {
  return (
    <div className="bg-surface-tint">
      <PageHeader
        title="Your Journey, Fully Supported"
        subtitle="Reach our team before, during, and after your Umrah — by QR, WhatsApp, phone, or email."
      />

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
          <div>
            <h2 className="font-display text-2xl font-bold text-ink">
              Scan &amp; connect instantly
            </h2>
            <p className="mt-2 text-slate-muted">
              Save this QR on your phone before travel. Scan at the airport or in
              the Haram to message our coordinators directly on WhatsApp.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                "Pre-departure questions about visa and packing",
                "On-ground help with hotels, transport, and ziyarat",
                "Emergency escalation to our KSA operations team",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-sm text-on-surface-variant"
                >
                  <MaterialIcon
                    name="check_circle"
                    className="shrink-0 text-lg text-primary"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <WhatsAppQrCard
            message={SUPPORT_WHATSAPP_MESSAGE}
            title="Al Wrd Pilgrim Support"
            subtitle="Scan to open WhatsApp — available 24/7 in Saudi Arabia."
            className="mx-auto max-w-sm lg:mx-0 lg:ml-auto"
          />
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-2xl border border-outline-variant bg-white p-6 shadow-sm">
            <MaterialIcon name="call" className="text-2xl text-primary" />
            <h3 className="mt-3 font-display font-semibold text-ink">Phone</h3>
            <ul className="mt-3 space-y-2">
              {contactPhones.map((p) => (
                <li key={p.number}>
                  <a
                    href={telHref(p.number)}
                    className="text-sm text-primary hover:underline"
                  >
                    {p.number}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-outline-variant bg-white p-6 shadow-sm">
            <MaterialIcon name="mail" className="text-2xl text-primary" />
            <h3 className="mt-3 font-display font-semibold text-ink">Email</h3>
            <ul className="mt-3 space-y-2">
              {contactEmails.map((e) => (
                <li key={e.address}>
                  <a
                    href={`mailto:${e.address}`}
                    className="text-sm text-primary hover:underline"
                  >
                    {e.address}
                  </a>
                  <span className="block text-xs text-slate-muted">
                    {e.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-outline-variant bg-white p-6 shadow-sm">
            <MaterialIcon name="location_on" className="text-2xl text-primary" />
            <h3 className="mt-3 font-display font-semibold text-ink">Offices</h3>
            <ul className="mt-3 space-y-2">
              {offices.map((o) => (
                <li key={o.id} className="text-sm text-on-surface-variant">
                  <strong className="text-ink">{o.city}</strong> — {o.label}
                </li>
              ))}
            </ul>
            <Link
              href="/contact"
              className="mt-3 inline-block text-sm font-semibold text-primary hover:underline"
            >
              View maps →
            </Link>
          </div>
        </div>

        <h2 className="mt-16 font-display text-2xl font-bold text-ink">
          Helpful resources
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {quickLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-3 rounded-2xl border border-outline-variant bg-white p-4 shadow-sm transition-all hover:border-primary/40 hover:shadow-md"
            >
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10">
                <MaterialIcon name={link.icon} className="text-primary" />
              </span>
              <span className="font-medium text-ink">{link.title}</span>
            </Link>
          ))}
        </div>

        <div className="mt-12 rounded-2xl bg-primary p-8 text-center text-on-primary sm:p-10">
          <h2 className="font-display text-xl font-bold sm:text-2xl">
            Need help right now?
          </h2>
          <p className="mx-auto mt-2 max-w-lg text-sm opacity-90">
            Message us on WhatsApp and a coordinator will respond as quickly as
            possible.
          </p>
          <a
            href={whatsappLink(SUPPORT_WHATSAPP_MESSAGE)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-block rounded-lg bg-white px-6 py-3 text-sm font-semibold text-primary hover:bg-white/90"
          >
            Chat on WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
