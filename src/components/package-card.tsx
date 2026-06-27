import Link from "next/link";
import {
  type Package,
  TIERS,
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

export function PackageCard({ pkg }: { pkg: Package }) {
  const tier = TIERS[pkg.tier];
  const discount = discountPercent(pkg);

  return (
    <Link
      href={`/packages/${pkg.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-card"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-surface-tint">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
          style={{ backgroundImage: `url('${pkg.image}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-deep/30 to-transparent" />
        {discount && (
          <span className="absolute right-3 top-3 rounded-full bg-gold px-2.5 py-1 text-xs font-bold text-ink">
            {discount}% off
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-center justify-between text-xs font-medium text-slate-muted">
          <span>
            {pkg.durationDays}D / {pkg.durationNights}N ·{" "}
            {shortDate(pkg.departureDate)}
          </span>
          <span className="rounded-full bg-surface-tint px-2 py-0.5">
            {pkg.city}
          </span>
        </div>

        <h3 className="mt-2 flex items-center gap-1.5 font-display text-lg font-semibold text-ink">
          <svg viewBox="0 0 24 24" className="h-4 w-4 fill-gold">
            <path d="M12 2l2.9 6 6.6.6-5 4.4 1.5 6.5L12 16.9 5.9 19.5 7.4 13l-5-4.4 6.6-.6L12 2z" />
          </svg>
          {pkg.title}
        </h3>
        <p className="mt-1 text-sm text-slate-muted">{pkg.tagline}</p>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {pkg.amenities.map((a) => (
            <span
              key={a}
              className="rounded-md bg-brand-pill px-2 py-0.5 text-[11px] font-medium text-brand-heading"
            >
              {a}
            </span>
          ))}
        </div>

        <div className="mt-auto flex items-end justify-between pt-4">
          <div>
            {pkg.oldPrice && (
              <span className="block text-xs text-slate-muted line-through">
                {formatPKR(pkg.oldPrice)}
              </span>
            )}
            <span className="font-display text-lg font-bold text-brand-heading">
              {formatPKR(pkg.price)}
            </span>
            <span className="ml-1 text-xs text-slate-muted">per person</span>
          </div>
          <span className="rounded-lg bg-brand px-3.5 py-2 text-xs font-semibold text-white transition-colors group-hover:bg-brand-deep">
            View Details
          </span>
        </div>
      </div>
    </Link>
  );
}
