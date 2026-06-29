import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ServiceDetailView } from "@/components/service-detail-view";
import { MaterialIcon } from "@/components/material-icon";
import {
  VALUE_SERVICE_SLUGS,
  getValueService,
  otherServices,
  type ValueServiceSlug,
} from "@/lib/value-services";
import { absoluteUrl } from "@/lib/seo";

export function generateStaticParams() {
  return VALUE_SERVICE_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getValueService(slug);
  if (!service) return { title: "Service not found" };
  const url = absoluteUrl(`/our-services/${service.slug}`);
  return {
    title: service.title,
    description: service.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      title: `${service.title} | Al Wrd Hajj & Umrah`,
      description: service.metaDescription,
      url,
      images: [{ url: absoluteUrl(service.image), alt: service.title }],
    },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getValueService(slug);
  if (!service) notFound();

  const related = otherServices(service.slug as ValueServiceSlug).slice(0, 4);

  return (
    <>
      <ServiceDetailView service={service} />
      <section className="border-t border-black/5 bg-surface-container-low py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl font-bold text-ink">
            More value-added services
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((s) => (
              <Link
                key={s.slug}
                href={`/our-services/${s.slug}`}
                className="group overflow-hidden rounded-2xl border border-outline-variant bg-white shadow-sm transition-all hover:border-primary/40 hover:shadow-md"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={s.image}
                    alt={s.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, 25vw"
                  />
                  <div className="absolute bottom-3 left-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 shadow-sm">
                    <MaterialIcon name={s.icon} className="text-primary text-lg" />
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-sm font-bold text-on-surface">{s.title}</h3>
                  <p className="mt-1 text-xs text-on-surface-variant line-clamp-2">
                    {s.shortDesc}
                  </p>
                </div>
              </Link>
            ))}
          </div>
          <Link
            href="/our-services"
            className="mt-8 inline-block text-sm font-semibold text-primary hover:underline"
          >
            ← All services
          </Link>
        </div>
      </section>
    </>
  );
}
