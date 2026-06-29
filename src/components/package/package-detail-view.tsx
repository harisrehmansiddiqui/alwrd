"use client";

import { useCallback, useEffect, useState } from "react";
import { MaterialIcon } from "@/components/material-icon";
import {
  FullItineraryTimeline,
  BlockRenderer,
} from "@/components/package/itinerary-blocks";
import { PackageGallery } from "@/components/package/package-gallery";
import {
  PackageBookingMobileBar,
  PackageBookingPanel,
} from "@/components/package/package-booking-panel";
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

import { PACKAGE_OVERVIEW_TABS, type PackageOverviewTabId } from "@/lib/package-overview-tabs";

type Props = {
  pkg: Package;
  departures: Package[];
  days: ItineraryDay[];
  meals: MealPlan[];
  policies: PackagePolicy[];
};

export function PackageDetailView({
  pkg,
  departures,
  days,
  meals,
  policies,
}: Props) {
  const [departureId, setDepartureId] = useState(pkg.departureId);
  const [tab, setTab] = useState<PackageOverviewTabId>("itinerary");
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

  const galleryImages =
    pkg.gallery.length >= 5
      ? pkg.gallery.slice(0, 5)
      : [
          pkg.image,
          "/gallery/1.jpg",
          "/gallery/2.jpg",
          "/gallery/3.jpg",
          "/gallery/4.jpg",
        ];

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
        <PackageGallery
          videoUrl={pkg.videoUrl}
          posterUrl={pkg.image}
          images={galleryImages}
        />
      </div>

      {/* Two-column: overview + booking */}
      <div className="mx-auto mt-8 grid max-w-[1200px] min-w-0 gap-10 px-4 sm:px-5 lg:grid-cols-[1fr_320px] lg:px-8">
        <div className="min-w-0">
          <h2 className="text-xl font-bold text-tertiary">Package Overview</h2>

          {/* Icon tabs */}
          <div className="mt-5 flex gap-1 overflow-x-auto border-b border-secondary pb-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {PACKAGE_OVERVIEW_TABS.map((t) => (
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
            <div className="sticky top-[68px] z-10 bg-white py-3">
              <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
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
            <PackageBookingPanel
              departures={departures}
              departureId={departureId}
              onDepartureChange={setDepartureId}
            />
          </div>
        </aside>
      </div>

      <PackageBookingMobileBar
        departures={departures}
        departureId={departureId}
        onDepartureChange={setDepartureId}
      />
    </div>
  );
}
