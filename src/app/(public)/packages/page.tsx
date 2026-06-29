import type { Metadata } from "next";
import { Suspense } from "react";
import { PackageCard } from "@/components/package-card";
import { PackageFilters } from "@/components/package-filters";
import {
  PACKAGES_PAGE_SIZE,
  PackagePagination,
} from "@/components/package-pagination";
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

function resolveFilters(
  params: Record<string, string | undefined>,
): Filters {
  // Legacy nav links (?type=group) → featured group packages.
  const featured =
    params.featured ??
    (params.type === "group" ? "group" : undefined);

  return {
    tier: params.tier,
    audience: params.audience,
    featured,
    city: params.city,
    duration: params.duration,
    date: params.date,
    month: params.month,
    minPrice: params.minPrice,
    maxPrice: params.maxPrice,
    q: params.q,
  };
}

export default async function PackagesPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const params = await searchParams;
  const filters = resolveFilters(params);
  const page = Math.max(1, Number(params.page ?? 1) || 1);

  const [results, cities] = await Promise.all([
    filterPackages(filters),
    getCities(),
  ]);

  const total = results.length;
  const totalPages = Math.max(1, Math.ceil(total / PACKAGES_PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const slice = results.slice(
    (currentPage - 1) * PACKAGES_PAGE_SIZE,
    currentPage * PACKAGES_PAGE_SIZE,
  );

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
        <Suspense fallback={null}>
          <PackageFilters cities={cities} />
        </Suspense>

        <p className="mt-6 text-sm text-slate-muted">
          {total} package{total === 1 ? "" : "s"} available
          {totalPages > 1 && (
            <>
              {" "}
              · Page {currentPage} of {totalPages}
            </>
          )}
        </p>

        {slice.length > 0 ? (
          <>
            <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {slice.map((pkg) => (
                <PackageCard key={pkg.departureId} pkg={pkg} />
              ))}
            </div>
            <Suspense fallback={null}>
              <PackagePagination page={currentPage} total={total} />
            </Suspense>
          </>
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
