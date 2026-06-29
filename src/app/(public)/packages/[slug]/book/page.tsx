import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BookingCheckoutView } from "@/components/booking/booking-checkout-view";
import { buildItinerary, buildMealPlan, packagePolicies } from "@/lib/itinerary";
import { formatTravelDate } from "@/lib/booking";
import { getPackageByDeparture } from "@/lib/packages";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const pkg = await getPackageByDeparture(slug);
  if (!pkg) return { title: "Booking" };
  return {
    title: `Book ${pkg.title}`,
    description: `Complete your Umrah booking for ${pkg.title} from ${pkg.city}.`,
  };
}

export default async function BookingPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ departure?: string }>;
}) {
  const { slug } = await params;
  const { departure } = await searchParams;
  const pkg = await getPackageByDeparture(slug, departure);
  if (!pkg) notFound();

  const days = buildItinerary(pkg);
  const meals = buildMealPlan(pkg);
  const travelDateLabel = formatTravelDate(pkg.departureDate);

  return (
    <BookingCheckoutView
      pkg={pkg}
      days={days}
      meals={meals}
      policies={packagePolicies}
      travelDateLabel={travelDateLabel}
    />
  );
}
