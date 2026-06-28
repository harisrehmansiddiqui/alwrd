export const PACKAGE_OVERVIEW_TABS = [
  { id: "itinerary", label: "Itinerary", icon: "map" },
  { id: "flights", label: "Flights", icon: "flight" },
  { id: "transfers", label: "Transfers", icon: "directions_bus" },
  { id: "hotels", label: "Hotels", icon: "hotel" },
  { id: "meals", label: "Meals", icon: "restaurant" },
  { id: "ziyarat", label: "Ziyarat", icon: "mosque" },
  { id: "faq", label: "FAQ", icon: "help" },
  { id: "policies", label: "Policies", icon: "policy" },
] as const;

export type PackageOverviewTabId =
  (typeof PACKAGE_OVERVIEW_TABS)[number]["id"];

export const PACKAGE_SECTION_TITLES: Record<PackageOverviewTabId, string> = {
  itinerary: "Itinerary",
  flights: "Flight Details",
  transfers: "Transfers",
  hotels: "Hotels",
  meals: "Meals",
  ziyarat: "Ziyarat",
  faq: "Frequently Asked Questions",
  policies: "Policies",
};

export function packageSectionId(tab: PackageOverviewTabId): string {
  return `package-section-${tab}`;
}
