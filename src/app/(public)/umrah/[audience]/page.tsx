import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AudienceLandingView } from "@/components/audience-landing-view";
import {
  AUDIENCE_SLUGS,
  getAudienceConfig,
} from "@/lib/audience-landing";
import { filterPackages } from "@/lib/packages";
import { absoluteUrl } from "@/lib/seo";

export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return AUDIENCE_SLUGS.map((audience) => ({ audience }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ audience: string }>;
}): Promise<Metadata> {
  const { audience } = await params;
  const config = getAudienceConfig(audience);
  if (!config) return { title: "Page not found" };
  const url = absoluteUrl(`/umrah/${config.slug}`);
  return {
    title: config.title,
    description: config.metaDescription,
    alternates: { canonical: url },
    openGraph: { title: config.title, description: config.metaDescription, url },
  };
}

export default async function AudienceLandingPage({
  params,
}: {
  params: Promise<{ audience: string }>;
}) {
  const { audience } = await params;
  const config = getAudienceConfig(audience);
  if (!config) notFound();

  const packages = await filterPackages({ audience: config.filterAudience });

  return <AudienceLandingView config={config} packages={packages} />;
}
