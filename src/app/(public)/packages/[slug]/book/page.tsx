import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BookingCheckoutView } from "@/components/booking/booking-checkout-view";
import { buildItinerary, buildMealPlan, packagePolicies } from "@/lib/itinerary";
import { formatTravelDate } from "@/lib/booking";
import { getPackage } from "@/lib/packages";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const pkg = await getPackage(slug);
  if (!pkg) return { title: "Booking" };
  return {
    title: `Book ${pkg.title}`,
    description: `Complete your Umrah booking for ${pkg.title} from ${pkg.city}.`,
  };
}

export default async function BookingPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const pkg = await getPackage(slug);
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
