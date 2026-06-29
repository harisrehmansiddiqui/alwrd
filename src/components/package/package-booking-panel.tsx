"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { CustomSelect } from "@/components/custom-select";
import { MaterialIcon } from "@/components/material-icon";
import { formatTravelDate } from "@/lib/booking";
import {
  bookUrl,
  discountPercent,
  formatPKR,
  type Package,
} from "@/lib/packages";

type PanelProps = {
  departures: Package[];
  departureId: string;
  onDepartureChange: (id: string) => void;
};

export function PackageBookingPanel({
  departures,
  departureId,
  onDepartureChange,
}: PanelProps) {
  const [fareOpen, setFareOpen] = useState(false);

  const pkg = useMemo(
    () => departures.find((d) => d.departureId === departureId) ?? departures[0],
    [departures, departureId],
  );

  if (!pkg) return null;

  const discount = discountPercent(pkg);
  const href = bookUrl(pkg.slug, pkg.departureId);

  const dateOptions = departures.map((d) => ({
    value: d.departureId,
    label: `${formatTravelDate(d.departureDate)} · ${d.city} · ${formatPKR(d.price)}`,
  }));

  return (
    <div className="rounded-xl bg-white p-5 shadow-[0_2px_24px_rgba(0,0,0,0.06)]">
      <div className="flex items-center gap-2">
        <svg viewBox="0 0 24 24" className="h-5 w-5 fill-primary" aria-hidden>
          <path d="M12 2l8 4.5v11L12 22l-8-4.5v-11L12 2zm0 2.2L6 7.4v9.2l6 3.4 6-3.4V7.4l-6-3.2z" />
        </svg>
        <span className="text-sm font-semibold text-tertiary">{pkg.title}</span>
      </div>

      {pkg.oldPrice && (
        <div className="mt-4 flex items-center gap-2">
          <span className="text-sm text-neutral line-through">
            {formatPKR(pkg.oldPrice)}
          </span>
          {discount && (
            <span className="text-xs font-bold text-primary">{discount}% off</span>
          )}
        </div>
      )}

      <p className="mt-1 text-3xl font-bold text-tertiary">{formatPKR(pkg.price)}</p>
      <p className="text-xs text-neutral">— per person (PKR)</p>

      <div className="mt-5">
        <span className="text-xs font-medium text-neutral">Travel Date</span>
        <div className="mt-1.5">
          {departures.length > 1 ? (
            <CustomSelect
              variant="standalone"
              value={departureId}
              onChange={onDepartureChange}
              options={dateOptions}
            />
          ) : (
            <div className="flex items-center justify-between rounded-lg bg-secondary/80 px-3 py-2.5 text-sm text-tertiary">
              {formatTravelDate(pkg.departureDate)}
              <MaterialIcon name="calendar_month" className="text-neutral" />
            </div>
          )}
        </div>
        <p className="mt-1 text-[11px] text-neutral">
          {pkg.city} · {pkg.durationDays}D / {pkg.durationNights}N
        </p>
      </div>

      <button
        type="button"
        onClick={() => setFareOpen((v) => !v)}
        className="mt-3 text-sm font-semibold text-primary"
      >
        View Fare Breakdown
      </button>
      {fareOpen && (
        <div className="mt-2 space-y-1 text-xs text-neutral">
          <div className="flex justify-between">
            <span>Base fare</span>
            <span>{formatPKR(Math.round(pkg.price * 0.85))}</span>
          </div>
          <div className="flex justify-between">
            <span>Taxes &amp; fees</span>
            <span>{formatPKR(Math.round(pkg.price * 0.15))}</span>
          </div>
          <div className="flex justify-between font-semibold text-tertiary">
            <span>Total per person</span>
            <span>{formatPKR(pkg.price)}</span>
          </div>
        </div>
      )}

      <p className="mt-3 flex items-center gap-1 text-[11px] text-neutral">
        <MaterialIcon name="info" className="text-sm" />
        All prices in Pakistani Rupees (PKR)
      </p>

      <Link
        href={href}
        className="mt-4 block rounded-lg bg-primary py-3.5 text-center text-sm font-bold text-on-primary transition-colors hover:opacity-95"
      >
        Book Now
      </Link>
    </div>
  );
}

export function PackageBookingMobileBar({
  departures,
  departureId,
  onDepartureChange,
}: PanelProps) {
  const pkg = useMemo(
    () => departures.find((d) => d.departureId === departureId) ?? departures[0],
    [departures, departureId],
  );

  if (!pkg) return null;

  const dateOptions = departures.map((d) => ({
    value: d.departureId,
    label: formatTravelDate(d.departureDate),
  }));

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-neutral-20 bg-white p-4 shadow-[0_-4px_16px_rgba(0,0,0,0.08)] lg:hidden">
      <div className="mx-auto max-w-[1200px] space-y-2">
        {departures.length > 1 && (
          <CustomSelect
            variant="standalone"
            value={departureId}
            onChange={onDepartureChange}
            options={dateOptions}
          />
        )}
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="truncate text-xs text-neutral">{pkg.title}</p>
            <p className="text-lg font-bold text-tertiary">{formatPKR(pkg.price)}</p>
          </div>
          <Link
            href={bookUrl(pkg.slug, pkg.departureId)}
            className="shrink-0 rounded-lg bg-primary px-6 py-3 text-sm font-bold text-on-primary"
          >
            Book Now
          </Link>
        </div>
      </div>
    </div>
  );
}
