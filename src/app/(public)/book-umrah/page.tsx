import type { Metadata } from "next";
import Link from "next/link";
import { CampaignLandingView } from "@/components/campaign-landing-view";
import { absoluteUrl } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Book Umrah — Pakistan's Digital Umrah Platform",
  description:
    "Book Umrah packages directly from Pakistan with transparent pricing, visa support, and 24/7 on-ground assistance. No agents, no hidden charges.",
  alternates: { canonical: absoluteUrl("/book-umrah") },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Book Umrah with Al Wrd — Transparent Pricing",
    description:
      "Search packages, compare inclusions, and inquire today. Pakistan's first digital Umrah booking platform.",
    url: absoluteUrl("/book-umrah"),
  },
};

export default function BookUmrahLandingPage() {
  return (
    <>
      <CampaignLandingView />
      <div className="border-t border-outline-variant bg-white py-6 text-center">
        <Link href="/" className="text-sm text-primary hover:underline">
          ← Back to {site.name} home
        </Link>
      </div>
    </>
  );
}
