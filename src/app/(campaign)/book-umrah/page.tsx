import type { Metadata } from "next";
import { CampaignLandingView } from "@/components/campaign/campaign-landing-view";
import { absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Alwrd | Pakistan's 1st Smart Umrah System",
  description:
    "Experience the future of spiritual travel with Alwrd. Pakistan's first technology-enabled Umrah provider — transparent pricing and 24/7 support.",
  alternates: { canonical: absoluteUrl("/book-umrah") },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Alwrd | Pakistan's 1st Smart Umrah System",
    description:
      "Plan with Alwrd — Be Blessed, Be Budgeted, Be Balanced. Book your Umrah with transparent PKR pricing.",
    url: absoluteUrl("/book-umrah"),
    images: [{ url: absoluteUrl("/hero.jpg"), alt: "Al Wrd Umrah" }],
  },
};

export default function BookUmrahLandingPage() {
  return <CampaignLandingView />;
}
