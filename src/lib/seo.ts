import type { Metadata } from "next";
import type { Package } from "@/lib/packages";
import { formatPKR } from "@/lib/packages";
import { site } from "@/lib/site";

/** Public site URL — set NEXT_PUBLIC_SITE_URL in production (e.g. https://alwrdgroup.com). */
export function getSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (fromEnv) return fromEnv;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "https://alwrd.vercel.app";
}

export const DEFAULT_OG_IMAGE = "/hero.jpg";

export function absoluteUrl(path: string): string {
  const base = getSiteUrl();
  return path.startsWith("http") ? path : `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

export function defaultMetadata(): Metadata {
  const url = getSiteUrl();
  const title = "Al Wrd — Transparent Umrah Booking from Pakistan";
  const description =
    "Plan your Umrah with transparent pricing, trusted guidance, and dedicated support — no agents, no hidden charges.";

  return {
    metadataBase: new URL(url),
    title: {
      default: title,
      template: "%s | Al Wrd Hajj & Umrah",
    },
    description,
    keywords: [
      "Umrah packages Pakistan",
      "Umrah booking",
      "digital Umrah platform",
      "Umrah visa Pakistan",
      "Makkah Madinah packages",
      "Hajj and Umrah",
    ],
    authors: [{ name: "Al Wrd Hajj & Umrah" }],
    creator: "Al Wrd Hajj & Umrah",
    openGraph: {
      type: "website",
      locale: "en_PK",
      url,
      siteName: "Al Wrd Hajj & Umrah",
      title,
      description,
      images: [
        {
          url: absoluteUrl(DEFAULT_OG_IMAGE),
          width: 1200,
          height: 630,
          alt: "Al Wrd — Umrah booking from Pakistan",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [absoluteUrl(DEFAULT_OG_IMAGE)],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true },
    },
    alternates: {
      canonical: url,
    },
  };
}

export function organizationSchema() {
  const url = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: "Al Wrd Hajj & Umrah",
    url,
    logo: absoluteUrl("/brand/logo-black.png"),
    description:
      "Pakistan's first digital Umrah booking platform — transparent pricing, trusted guidance, no hidden charges.",
    email: site.email,
    telephone: site.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Islamabad",
      addressCountry: "PK",
    },
    sameAs: Object.values(site.socials),
  };
}

export function websiteSchema() {
  const url = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Al Wrd Hajj & Umrah",
    url,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${url}/packages?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function faqPageSchema(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };
}

export function packageProductSchema(pkg: Package) {
  const url = absoluteUrl(`/packages/${pkg.slug}`);
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: pkg.title,
    description: pkg.tagline,
    image: absoluteUrl(pkg.image),
    brand: { "@type": "Brand", name: "Al Wrd Hajj & Umrah" },
    offers: {
      "@type": "Offer",
      url,
      priceCurrency: "PKR",
      price: pkg.price,
      availability: "https://schema.org/InStock",
      validFrom: pkg.departureDate,
    },
  };
}

export function breadcrumbSchema(
  items: { name: string; path: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function packagePageDescription(pkg: Package): string {
  return `${pkg.tagline}. ${pkg.durationDays}D/${pkg.durationNights}N Umrah package from ${pkg.city}, from ${formatPKR(pkg.price)} per person.`;
}
