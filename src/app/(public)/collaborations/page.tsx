import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { PageHeader } from "@/components/page-header";
import { MaterialIcon } from "@/components/material-icon";
import {
  collaborationHighlights,
  collaborationPartners,
} from "@/lib/collaborations";
import {
  collaborations,
  galleryImages,
  testimonials,
} from "@/lib/content";
import { absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Collaborations",
  description:
    "Al Wrd Hajj & Umrah partners with leading airlines, hotels, and community groups to deliver transparent Umrah packages from Pakistan.",
  alternates: { canonical: absoluteUrl("/collaborations") },
};

export default function CollaborationsPage() {
  const featured = testimonials.slice(0, 2);

  return (
    <div className="bg-surface-tint">
      <PageHeader
        title="Collaborations & Partners"
        subtitle="Trusted airline, hotel, and community partnerships that power every Al Wrd departure."
      />

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <h2 className="font-display text-2xl font-bold text-ink">
          Airline & travel partners
        </h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {collaborationPartners.map((p) => (
            <div
              key={p.name}
              className="rounded-2xl border border-outline-variant bg-white p-6 shadow-sm"
            >
              <span className="text-xl font-bold text-primary">{p.name}</span>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-slate-muted">
                {p.type}
              </p>
              <p className="mt-2 text-sm text-on-surface-variant">{p.desc}</p>
            </div>
          ))}
        </div>

        <h2 className="mt-14 font-display text-2xl font-bold text-ink">
          What our partnerships enable
        </h2>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {collaborationHighlights.map((item) => (
            <li
              key={item}
              className="flex items-start gap-2 rounded-xl border border-outline-variant bg-white px-4 py-3 text-sm text-on-surface-variant"
            >
              <MaterialIcon
                name="handshake"
                className="shrink-0 text-lg text-primary"
              />
              {item}
            </li>
          ))}
        </ul>

        <h2 className="mt-14 font-display text-2xl font-bold text-ink">
          Moments with our pilgrims
        </h2>
        <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
          {galleryImages.slice(0, 8).map((src, i) => (
            <div
              key={`${src}-${i}`}
              className="relative aspect-square overflow-hidden rounded-2xl border border-outline-variant"
            >
              <Image
                src={src}
                alt=""
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>
          ))}
        </div>
        <Link
          href="/gallery"
          className="mt-4 inline-block text-sm font-semibold text-primary hover:underline"
        >
          View full gallery →
        </Link>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {collaborations.map((src, i) => (
            <div
              key={i}
              className="relative h-48 overflow-hidden rounded-2xl border border-outline-variant sm:h-56"
            >
              <Image src={src} alt="" fill className="object-cover" sizes="50vw" />
            </div>
          ))}
        </div>

        <h2 className="mt-14 font-display text-2xl font-bold text-ink">
          Pilgrim stories
        </h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          {featured.map((t) => (
            <blockquote
              key={t.name}
              className="rounded-2xl border border-primary/20 bg-primary/5 p-6"
            >
              <p className="italic text-on-surface-variant">
                &ldquo;{t.quote}&rdquo;
              </p>
              <footer className="mt-4 text-sm font-semibold text-ink">
                {t.name} · {t.city}
              </footer>
            </blockquote>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap gap-4">
          <Link
            href="/packages"
            className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-on-primary hover:bg-primary-dark"
          >
            Browse packages
          </Link>
          <Link
            href="/contact"
            className="rounded-lg border border-outline-variant px-5 py-2.5 text-sm font-semibold text-primary hover:bg-primary/5"
          >
            Partner with us
          </Link>
        </div>
      </div>
    </div>
  );
}
