import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PackageDetailView } from "@/components/package/package-detail-view";
import {
  buildItinerary,
  buildMealPlan,
  packagePolicies,
} from "@/lib/itinerary";
import { getPackage, formatPKR } from "@/lib/packages";

export const revalidate = 300;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const pkg = await getPackage(slug);
  if (!pkg) return { title: "Package not found" };
  return {
    title: `${pkg.title} — ${pkg.durationDays} Days from ${pkg.city}`,
    description: `${pkg.tagline}. ${pkg.durationDays}D/${pkg.durationNights}N Umrah package from ${pkg.city}, from ${formatPKR(pkg.price)} per person.`,
  };
}

export default async function PackageDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const pkg = await getPackage(slug);
  if (!pkg) notFound();

  const itinerary = buildItinerary(pkg);
  const meals = buildMealPlan(pkg);
  const bookHref = `/inquiry?package=${pkg.slug}`;

  const makkahNights = Math.max(1, Math.round(pkg.durationNights * 0.57));
  const madinahNights = Math.max(1, pkg.durationNights - makkahNights);

  const startDate = new Date(pkg.departureDate);
  const travelDateLabel = startDate.toLocaleDateString("en-GB", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <>
      <div className="border-b border-secondary bg-white">
        <div className="mx-auto max-w-[1200px] px-5 py-4 lg:px-8">
          <nav className="text-xs text-neutral">
            <span>Home</span>
            <span className="mx-2">›</span>
            <span>Umrah</span>
            <span className="mx-2">›</span>
            <span className="text-tertiary">{pkg.title}</span>
          </nav>
          <h1 className="mt-2 text-2xl font-bold text-tertiary">{pkg.title}</h1>
          <p className="mt-1 text-sm text-neutral">
            {pkg.durationDays}D / {pkg.durationNights}N · {makkahNights} Makkah /{" "}
            {madinahNights} Madinah
          </p>
        </div>
      </div>

      <PackageDetailView
        pkg={pkg}
        days={itinerary}
        meals={meals}
        policies={packagePolicies}
        bookHref={bookHref}
        travelDateLabel={travelDateLabel}
      />
    </>
  );
}
