import type { Metadata } from "next";
import Link from "next/link";
import { InquiryForm } from "@/components/inquiry-form";
import { getPackage, formatPKR, TIERS } from "@/lib/packages";

export const metadata: Metadata = {
  title: "Request a Package",
  description:
    "Send an Umrah package inquiry to Al Wrd Hajj & Umrah. Our team confirms availability and details with you personally.",
};

export default async function InquiryPage({
  searchParams,
}: {
  searchParams: Promise<{ package?: string }>;
}) {
  const { package: slug } = await searchParams;
  const pkg = slug ? getPackage(slug) : undefined;

  return (
    <div className="bg-surface-tint">
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="font-display text-3xl font-bold text-brand-heading sm:text-4xl">
          Request Your Umrah Package
        </h1>
        <p className="mt-2 text-slate-muted">
          Share your details and our team will confirm availability, pricing and
          the next steps with you personally.
        </p>

        {pkg && (
          <div className="mt-6 flex items-center justify-between rounded-2xl border border-brand/20 bg-white p-4 shadow-sm">
            <div>
              <div className="text-xs font-medium text-slate-muted">
                {TIERS[pkg.tier].label} · {pkg.city} · {pkg.durationDays}D/
                {pkg.durationNights}N
              </div>
              <div className="font-display text-lg font-semibold text-ink">
                {pkg.title}
              </div>
            </div>
            <div className="text-right">
              <div className="font-display text-lg font-bold text-brand-heading">
                {formatPKR(pkg.price)}
              </div>
              <Link
                href={`/packages/${pkg.slug}`}
                className="text-xs text-brand hover:underline"
              >
                View details
              </Link>
            </div>
          </div>
        )}

        <div className="mt-6 rounded-2xl border border-black/5 bg-white p-6 shadow-sm sm:p-8">
          <InquiryForm packageSlug={pkg?.slug} />
        </div>
      </div>
    </div>
  );
}
