"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { MaterialIcon } from "@/components/material-icon";
import {
  FullItineraryTimeline,
  BlockRenderer,
} from "@/components/package/itinerary-blocks";
import type {
  ItineraryDay,
  ItineraryBlock,
  MealPlan,
  PackagePolicy,
} from "@/lib/itinerary";
import { collectBlocks } from "@/lib/itinerary";
import type { Package } from "@/lib/packages";
import { discountPercent, formatPKR } from "@/lib/packages";
import { faqs } from "@/lib/content";

const TABS = [
  { id: "itinerary", label: "Itinerary", icon: "map" },
  { id: "flights", label: "Flights", icon: "flight" },
  { id: "transfers", label: "Transfers", icon: "directions_bus" },
  { id: "hotels", label: "Hotels", icon: "hotel" },
  { id: "meals", label: "Meals", icon: "restaurant" },
  { id: "ziyarat", label: "Ziyarat", icon: "mosque" },
  { id: "faq", label: "FAQ", icon: "help" },
  { id: "policies", label: "Policies", icon: "policy" },
] as const;

type TabId = (typeof TABS)[number]["id"];

type Props = {
  pkg: Package;
  days: ItineraryDay[];
  meals: MealPlan[];
  policies: PackagePolicy[];
  bookHref: string;
  travelDateLabel: string;
};

export function PackageDetailView({
  pkg,
  days,
  meals,
  policies,
  bookHref,
  travelDateLabel,
}: Props) {
  const [tab, setTab] = useState<TabId>("itinerary");
  const [activeDayId, setActiveDayId] = useState(days[0]?.id ?? "");
  const discount = discountPercent(pkg);

  const scrollToDay = useCallback((id: string) => {
    setActiveDayId(id);
    document.getElementById(`day-${id}`)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, []);

  useEffect(() => {
    if (tab !== "itinerary" || days.length === 0) return;

    const sections = days
      .map((d) => document.getElementById(`day-${d.id}`))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) {
          const id = visible[0].target.id.replace("day-", "");
          setActiveDayId(id);
        }
      },
      { rootMargin: "-20% 0px -55% 0px", threshold: [0, 0.15, 0.35] },
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [tab, days]);

  const gallery =
    pkg.gallery.length >= 5
      ? pkg.gallery.slice(0, 5)
      : [pkg.image, "/gallery/1.jpg", "/gallery/2.jpg", "/gallery/3.jpg", "/gallery/4.jpg"];

  const galleryLabels = ["", "Makkah", "Madinah", "Makkah", "Madinah"];

  function blocksForTab(): ItineraryBlock[] {
    switch (tab) {
      case "flights":
        return collectBlocks(days, "flight");
      case "transfers":
        return collectBlocks(days, "transfer");
      case "hotels":
        return collectBlocks(days, "hotel");
      case "ziyarat":
        return collectBlocks(days, "ziyarat");
      default:
        return [];
    }
  }

  return (
    <div className="package-detail min-w-0 overflow-x-hidden bg-white pb-28 lg:pb-10">
      {/* Full-width gallery */}
      <div className="mx-auto max-w-[1200px] min-w-0 px-4 pt-6 sm:px-5 lg:px-8">
        <div className="grid gap-1.5 sm:grid-cols-[1.2fr_1fr_1fr] sm:grid-rows-2">
          <div
            className="relative min-h-[280px] rounded-xl bg-cover bg-center sm:row-span-2 sm:min-h-[400px]"
            style={{ backgroundImage: `url('${gallery[0]}')` }}
          >
            <Link
              href="/gallery"
              className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 rounded-lg bg-white px-4 py-2 text-xs font-bold uppercase tracking-wide text-tertiary shadow-sm"
            >
              View Gallery
              <MaterialIcon name="north_east" className="text-sm" />
            </Link>
          </div>
          {gallery.slice(1, 5).map((src, i) => (
            <div
              key={i}
              className="relative min-h-[140px] rounded-xl bg-cover bg-center sm:min-h-[196px]"
              style={{ backgroundImage: `url('${src}')` }}
            >
              {galleryLabels[i + 1] && (
                <span className="absolute left-3 top-3 rounded-md bg-white/90 px-2 py-0.5 text-[10px] font-bold uppercase text-tertiary">
                  {galleryLabels[i + 1]}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Two-column: overview + booking */}
      <div className="mx-auto mt-8 grid max-w-[1200px] min-w-0 gap-10 px-4 sm:px-5 lg:grid-cols-[1fr_320px] lg:px-8">
        <div className="min-w-0">
          <h2 className="text-xl font-bold text-tertiary">Package Overview</h2>

          {/* Icon tabs */}
          <div className="mt-5 flex gap-1 overflow-x-auto border-b border-secondary pb-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {TABS.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTab(t.id)}
                className={`flex shrink-0 flex-col items-center gap-1 px-4 py-3 text-xs font-medium transition-colors ${
                  tab === t.id
                    ? "border-b-2 border-primary bg-primary-10 text-primary"
                    : "text-neutral hover:text-primary"
                }`}
              >
                <MaterialIcon name={t.icon} className="text-xl" />
                {t.label}
              </button>
            ))}
          </div>

          {/* Day pills — itinerary only */}
          {tab === "itinerary" && (
            <div className="sticky top-[68px] z-10 -mx-4 bg-white px-4 py-3 sm:-mx-0 sm:px-0">
              <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {days.map((day) => (
                  <button
                    key={day.id}
                    type="button"
                    onClick={() => scrollToDay(day.id)}
                    className={`shrink-0 rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
                      activeDayId === day.id
                        ? "bg-primary-10 text-primary"
                        : "text-neutral hover:bg-secondary"
                    }`}
                  >
                    {day.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Content */}
          <div className="mt-6">
            {tab === "itinerary" && (
              <FullItineraryTimeline days={days} />
            )}

            {["flights", "transfers", "hotels", "ziyarat"].includes(tab) && (
              <div className="space-y-8">
                {blocksForTab().map((block, i) => (
                  <BlockRenderer key={i} block={block} />
                ))}
              </div>
            )}

            {tab === "meals" && (
              <div className="space-y-8">
                {meals.map((m) => (
                  <div key={m.title}>
                    <h3 className="font-semibold text-tertiary">{m.title}</h3>
                    <ul className="mt-3 space-y-2">
                      {m.items.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2 text-sm text-neutral"
                        >
                          <MaterialIcon name="restaurant" className="mt-0.5 text-primary" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}

            {tab === "faq" && (
              <div className="space-y-4">
                {faqs.map((f) => (
                  <details key={f.q} className="group">
                    <summary className="flex cursor-pointer list-none items-center justify-between py-3 text-sm font-semibold text-tertiary marker:content-none">
                      {f.q}
                      <MaterialIcon
                        name="expand_more"
                        className="text-neutral transition-transform group-open:rotate-180"
                      />
                    </summary>
                    <p className="pb-4 text-sm text-neutral">{f.a}</p>
                  </details>
                ))}
              </div>
            )}

            {tab === "policies" && (
              <div className="space-y-6">
                {policies.map((p) => (
                  <div key={p.title}>
                    <h3 className="font-semibold text-tertiary">{p.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-neutral">{p.body}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Sticky booking sidebar */}
        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <BookingCard
              pkg={pkg}
              discount={discount}
              travelDateLabel={travelDateLabel}
              bookHref={bookHref}
            />
          </div>
        </aside>
      </div>

      {/* Mobile bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 bg-white p-4 shadow-[0_-2px_20px_rgba(0,0,0,0.06)] lg:hidden">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-4">
          <div>
            {pkg.oldPrice && (
              <span className="text-xs text-neutral line-through">
                {formatPKR(pkg.oldPrice)}
              </span>
            )}
            {discount && (
              <span className="ml-1 text-xs font-bold text-primary">{discount}% off</span>
            )}
            <p className="text-xl font-bold text-tertiary">
              {formatPKR(pkg.price)}
              <span className="text-xs font-normal text-neutral"> — per person</span>
            </p>
          </div>
          <Link
            href={bookHref}
            className="rounded-lg bg-primary px-6 py-3 text-sm font-bold text-on-primary hover:bg-primary-dark"
          >
            Book Now
          </Link>
        </div>
      </div>
    </div>
  );
}

function HexBadge() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-primary" aria-hidden>
      <path d="M12 2l8 4.5v11L12 22l-8-4.5v-11L12 2zm0 2.2L6 7.4v9.2l6 3.4 6-3.4V7.4l-6-3.2z" />
    </svg>
  );
}

function BookingCard({
  pkg,
  discount,
  travelDateLabel,
  bookHref,
}: {
  pkg: Package;
  discount: number | null;
  travelDateLabel: string;
  bookHref: string;
}) {
  const [fareOpen, setFareOpen] = useState(false);

  return (
    <div className="rounded-xl bg-white p-5 shadow-[0_2px_24px_rgba(0,0,0,0.06)]">
      <div className="flex items-center gap-2">
        <HexBadge />
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
      <p className="text-xs text-neutral">— per person</p>

      <label className="mt-5 block">
        <span className="text-xs font-medium text-neutral">Travel Date</span>
        <div className="mt-1.5 flex items-center justify-between rounded-lg bg-secondary/80 px-3 py-2.5 text-sm text-tertiary">
          {travelDateLabel}
          <MaterialIcon name="calendar_month" className="text-neutral" />
        </div>
      </label>

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
            <span>Total</span>
            <span>{formatPKR(pkg.price)}</span>
          </div>
        </div>
      )}

      <p className="mt-3 flex items-center gap-1 text-[11px] text-neutral">
        <MaterialIcon name="info" className="text-sm" />
        Taxes are included in this price
      </p>

      <Link
        href={bookHref}
        className="mt-4 block rounded-lg bg-primary py-3.5 text-center text-sm font-bold text-on-primary transition-colors hover:bg-primary-dark"
      >
        Book Now
      </Link>
    </div>
  );
}
