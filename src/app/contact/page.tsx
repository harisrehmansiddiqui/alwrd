import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { site, whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Al Wrd Hajj & Umrah. Chat on WhatsApp, call us, or email our team to plan your Umrah from Pakistan.",
};

const channels = [
  {
    label: "WhatsApp",
    value: "Chat with our team",
    href: whatsappLink("Assalamu alaikum, I'd like to plan my Umrah."),
    external: true,
  },
  { label: "Call", value: site.phone, href: `tel:${site.phone.replace(/\s/g, "")}` },
  { label: "Email", value: site.email, href: `mailto:${site.email}` },
];

export default function ContactPage() {
  return (
    <div className="bg-surface-tint">
      <PageHeader
        title="Contact Us"
        subtitle="We're here to help you plan a smooth, blessed Umrah journey."
      />
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-5 sm:grid-cols-3">
          {channels.map((c) => (
            <a
              key={c.label}
              href={c.href}
              target={c.external ? "_blank" : undefined}
              rel={c.external ? "noopener noreferrer" : undefined}
              className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-card"
            >
              <div className="text-sm font-medium text-slate-muted">{c.label}</div>
              <div className="mt-1 font-display text-lg font-semibold text-brand-heading">
                {c.value}
              </div>
            </a>
          ))}
        </div>

        <div className="mt-8 rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
          <h2 className="font-display text-lg font-semibold text-ink">
            Visit us
          </h2>
          <p className="mt-1 text-sm text-slate-muted">{site.location}</p>
        </div>
      </div>
    </div>
  );
}
