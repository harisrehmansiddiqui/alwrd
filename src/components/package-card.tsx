import Image from "next/image";
import Link from "next/link";
import { AmenityMarquee } from "@/components/amenity-marquee";
import {
  type Package,
  discountPercent,
  formatPKR,
} from "@/lib/packages";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

function shortDate(iso: string): string {
  const d = new Date(iso);
  return `${WEEKDAYS[d.getDay()]}, ${String(d.getDate()).padStart(2, "0")} ${
    MONTHS[d.getMonth()]
  }`;
}

function HexIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5 shrink-0 fill-sky-500"
      aria-hidden
    >
      <path d="M12 2l8 4.5v11L12 22l-8-4.5v-11L12 2zm0 2.2L6 7.4v9.2l6 3.4 6-3.4V7.4l-6-3.2z" />
    </svg>
  );
}

function galleryThumbs(pkg: Package): string[] {
  const fromGallery = pkg.gallery.filter(Boolean).slice(0, 3);
  if (fromGallery.length >= 3) return fromGallery;
  return [
    ...fromGallery,
    ...Array.from({ length: 3 - fromGallery.length }, () => pkg.image),
  ];
}

export function PackageCard({ pkg }: { pkg: Package }) {
  const discount = discountPercent(pkg);
  const thumbs = galleryThumbs(pkg);
  const href = `/packages/${pkg.slug}`;

  return (
    <Link
      href={href}
      className="group flex flex-col overflow-hidden rounded-2xl border border-black/[0.06] bg-white shadow-[0_4px_24px_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.1)]"
    >
      <div className="relative">
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={pkg.image}
            alt={pkg.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
          />
        </div>

        <div className="absolute bottom-0 left-1/2 flex -translate-x-1/2 translate-y-1/2 gap-2">
          {thumbs.map((src, i) => (
            <div
              key={`${src}-${i}`}
              className="relative h-11 w-11 overflow-hidden rounded-full border-2 border-white bg-surface-container-low shadow-md sm:h-12 sm:w-12"
            >
              <Image
                src={src}
                alt=""
                fill
                className="object-cover"
                sizes="48px"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-1 flex-col px-5 pb-5 pt-9">
        <div className="mb-3 flex items-center justify-between gap-2 text-xs font-medium text-on-surface-variant">
          <div className="flex flex-wrap gap-1.5">
            <span className="rounded-full bg-soft-smoke px-2.5 py-1">
              {pkg.durationDays}D / {pkg.durationNights}N
            </span>
            <span className="rounded-full bg-soft-smoke px-2.5 py-1">
              {shortDate(pkg.departureDate)}
            </span>
          </div>
          <span className="shrink-0 rounded-full bg-soft-smoke px-2.5 py-1">
            {pkg.city}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <HexIcon />
          <h3 className="text-lg font-bold text-on-surface">{pkg.title}</h3>
        </div>
        <p className="mt-1 text-sm text-on-surface-variant">{pkg.tagline}</p>

        <div className="mt-4">
          <AmenityMarquee items={pkg.amenities} />
        </div>

        <div className="mt-auto flex items-end justify-between gap-3 pt-5">
          <div>
            {pkg.oldPrice && (
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm text-on-surface-variant line-through">
                  {formatPKR(pkg.oldPrice)}
                </span>
                {discount && (
                  <span className="rounded-md bg-emerald-50 px-1.5 py-0.5 text-xs font-bold text-emerald-600">
                    {discount}% off
                  </span>
                )}
              </div>
            )}
            <p className="mt-0.5 text-xl font-bold text-on-surface sm:text-2xl">
              {formatPKR(pkg.price)}
              <span className="ml-1 text-xs font-normal text-on-surface-variant">
                per person
              </span>
            </p>
          </div>

          <span className="shrink-0 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-on-primary transition-colors group-hover:bg-primary-dark">
            View Details
          </span>
        </div>
      </div>
    </Link>
  );
}
