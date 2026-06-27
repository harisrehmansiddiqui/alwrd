import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { resources } from "@/lib/content";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Helpful Umrah resources from Al Wrd — essential du'as, a complete Umrah checklist and guidance to support your journey.",
};

export default function ResourcesPage() {
  return (
    <div className="bg-surface-tint">
      <PageHeader
        title="Your Journey, Fully Supported"
        subtitle="Guides and resources to help you prepare for a meaningful Umrah."
      />
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {resources.map((r) => (
            <Link
              key={r.title}
              href={r.href}
              className="group rounded-2xl border border-black/5 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-card"
            >
              <h3 className="font-display text-lg font-semibold text-ink">
                {r.title}
              </h3>
              <p className="mt-2 text-sm text-slate-muted">{r.desc}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand">
                Read more
                <span className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
