import type { Metadata } from "next";
import { PackageCard } from "@/components/package-card";
import { PackageFilters } from "@/components/package-filters";
import {
  filterPackages,
  getCities,
  type PackageFilters as Filters,
} from "@/lib/packages";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Umrah Packages",
  description:
    "Browse Umrah packages from Pakistan by city, type, duration and price. Compare inclusions and book with Al Wrd Hajj & Umrah.",
};

export default async function PackagesPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const params = await searchParams;
  const filters: Filters = {
    tier: params.tier,
    audience: params.audience,
    city: params.city,
    duration: params.duration,
    date: params.date,
    minPrice: params.minPrice,
    maxPrice: params.maxPrice,
    q: params.q,
  };

  const results = await filterPackages(filters);
  const cities = await getCities();

  return (
    <div className="bg-surface-tint">
      <div className="border-b border-black/5 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <h1 className="font-display text-3xl font-bold text-brand-heading sm:text-4xl">
            Umrah Packages
          </h1>
          <p className="mt-2 max-w-2xl text-slate-muted">
            Transparent pricing, trusted guidance and honest inclusions — find
            the package that fits your journey.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <PackageFilters cities={cities} />

        <p className="mt-6 text-sm text-slate-muted">
          {results.length} package{results.length === 1 ? "" : "s"} available
        </p>

        {results.length > 0 ? (
          <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((pkg) => (
              <PackageCard key={pkg.departureId} pkg={pkg} />
            ))}
          </div>
        ) : (
          <div className="mt-10 rounded-2xl border border-dashed border-black/10 bg-white p-12 text-center">
            <p className="font-display text-lg font-semibold text-ink">
              No packages match your filters
            </p>
            <p className="mt-1 text-sm text-slate-muted">
              Try widening your dates or price range, or contact us for a custom
              plan.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
