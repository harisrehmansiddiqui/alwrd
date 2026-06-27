import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";

export const metadata: Metadata = {
  title: "Complete Umrah Checklist",
  description:
    "A complete Umrah packing and preparation checklist — documents, ihram, essentials and health items for a smooth journey.",
};

const groups = [
  {
    title: "Documents",
    items: ["Passport (valid 6+ months)", "Umrah visa", "Flight tickets", "Hotel vouchers", "Passport-size photos", "Vaccination certificate"],
  },
  {
    title: "Ihram & Clothing",
    items: ["Ihram garments (men)", "Modest clothing", "Comfortable footwear", "Unscented toiletries", "Prayer mat", "Small bag for shoes"],
  },
  {
    title: "Essentials",
    items: ["Medications & first aid", "Power bank & adapter", "Reusable water bottle", "Du'a book", "Some cash (SAR)", "Face mask & sanitiser"],
  },
];

export default function ChecklistPage() {
  return (
    <div className="bg-surface-tint">
      <PageHeader
        title="Complete Umrah Checklist"
        subtitle="Everything to pack and prepare, step by step."
      />
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-3">
          {groups.map((g) => (
            <div
              key={g.title}
              className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm"
            >
              <h2 className="font-display text-base font-semibold text-brand-heading">
                {g.title}
              </h2>
              <ul className="mt-3 space-y-2">
                {g.items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-ink/80">
                    <svg viewBox="0 0 24 24" className="mt-0.5 h-4 w-4 shrink-0 fill-brand">
                      <path d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
