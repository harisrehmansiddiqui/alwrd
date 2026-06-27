import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";

export const metadata: Metadata = {
  title: "How It Works",
  description:
    "Booking your Umrah with Al Wrd is simple: search packages, send an inquiry, confirm details with our team and travel with full support.",
};

const steps = [
  { title: "Search packages", desc: "Tell us your group size, package type, duration and start date to see matching packages." },
  { title: "Pick your package", desc: "Open any package to view full inclusions, itinerary, hotels and pricing." },
  { title: "Send an inquiry", desc: "Submit a quick inquiry — no payment online. You'll receive a reference instantly." },
  { title: "Confirm with our team", desc: "We contact you on WhatsApp or phone to confirm availability, pricing and details." },
  { title: "Travel with support", desc: "Visa, hotels and transport are handled. Our team supports you 24/7 throughout." },
];

export default function HowItWorksPage() {
  return (
    <div className="bg-surface-tint">
      <PageHeader
        title="How It Works"
        subtitle="From search to sacred journey — in five simple steps."
      />
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <ol className="space-y-5">
          {steps.map((step, i) => (
            <li
              key={step.title}
              className="flex gap-4 rounded-2xl border border-black/5 bg-white p-5 shadow-sm"
            >
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand text-sm font-semibold text-white">
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
    </div>
  );
}
