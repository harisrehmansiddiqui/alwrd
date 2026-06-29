import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/json-ld";
import { PackageDetailView } from "@/components/package/package-detail-view";
import {
  buildItinerary,
  buildMealPlan,
  packagePolicies,
} from "@/lib/itinerary";
import { getPackage, formatPKR } from "@/lib/packages";
import {
  absoluteUrl,
  breadcrumbSchema,
  packagePageDescription,
  packageProductSchema,
} from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const pkg = await getPackage(slug);
  if (!pkg) return { title: "Package not found" };
  const description = packagePageDescription(pkg);
  const url = absoluteUrl(`/packages/${slug}`);
  return {
    title: `${pkg.title} — ${pkg.durationDays} Days from ${pkg.city}`,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${pkg.title} | Al Wrd Hajj & Umrah`,
      description,
      url,
      images: [{ url: absoluteUrl(pkg.image), alt: pkg.title }],
    },
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
  const bookHref = `/packages/${pkg.slug}/book`;

  const makkahNights = Math.max(1, Math.round(pkg.durationNights * 0.57));
  const madinahNights = Math.max(1, pkg.durationNights - makkahNights);

  const startDate = new Date(pkg.departureDate);
  const travelDateLabel = startDate.toLocaleDateString("en-GB", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Umrah Packages", path: "/packages" },
    { name: pkg.title, path: `/packages/${pkg.slug}` },
  ];

  return (
    <>
      <JsonLd
        data={[packageProductSchema(pkg), breadcrumbSchema(breadcrumbs)]}
      />
      <div className="border-b border-secondary bg-white">
        <div className="mx-auto max-w-[1200px] min-w-0 px-4 py-4 lg:px-8">
          <nav aria-label="Breadcrumb" className="text-xs text-neutral">
            <Link href="/" className="hover:text-primary hover:underline">
              Home
            </Link>
            <span className="mx-2">›</span>
            <Link href="/packages" className="hover:text-primary hover:underline">
              Umrah
            </Link>
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
