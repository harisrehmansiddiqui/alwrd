"use client";

import { useCallback, useEffect, useState } from "react";
import {
  BlockRenderer,
  FullItineraryTimeline,
} from "@/components/package/itinerary-blocks";
import { MaterialIcon } from "@/components/material-icon";
import { faqs } from "@/lib/content";
import type {
  ItineraryBlock,
  ItineraryDay,
  MealPlan,
  PackagePolicy,
} from "@/lib/itinerary";
import { collectBlocks } from "@/lib/itinerary";
import {
  PACKAGE_OVERVIEW_TABS,
  PACKAGE_SECTION_TITLES,
  packageSectionId,
  type PackageOverviewTabId,
} from "@/lib/package-overview-tabs";

type Props = {
  days: ItineraryDay[];
  meals: MealPlan[];
  policies: PackagePolicy[];
};

export function BookingPackageOverview({ days, meals, policies }: Props) {
  const [activeTab, setActiveTab] = useState<PackageOverviewTabId>("itinerary");
  const [activeDayId, setActiveDayId] = useState(days[0]?.id ?? "");

  const flights = collectBlocks(days, "flight");
  const transfers = collectBlocks(days, "transfer");
  const hotels = collectBlocks(days, "hotel");
  const ziyarat = collectBlocks(days, "ziyarat");

  const scrollToSection = useCallback((id: PackageOverviewTabId) => {
    setActiveTab(id);
    document.getElementById(packageSectionId(id))?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, []);

  const scrollToDay = useCallback((id: string) => {
    setActiveDayId(id);
    document.getElementById(`day-${id}`)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, []);

  useEffect(() => {
    const sections = PACKAGE_OVERVIEW_TABS.map((t) =>
      document.getElementById(packageSectionId(t.id)),
    ).filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) {
          const id = visible[0].target.id.replace(
            "package-section-",
            "",
          ) as PackageOverviewTabId;
          setActiveTab(id);
        }
      },
      { rootMargin: "-20% 0px -55% 0px", threshold: [0, 0.15, 0.35] },
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [days]);

  useEffect(() => {
    if (days.length === 0) return;

    const daySections = days
      .map((d) => document.getElementById(`day-${d.id}`))
      .filter((el): el is HTMLElement => el !== null);

    if (daySections.length === 0) return;

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

    daySections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [days]);

  return (
    <div className="min-w-0">
      <h2 className="text-lg font-bold text-tertiary">Package Overview</h2>

      <div className="sticky top-[68px] z-20 -mx-4 mt-4 border-b border-secondary bg-[#fafafa] px-4 py-1 sm:-mx-6 sm:px-6">
        <div className="flex gap-1 overflow-x-auto pb-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {PACKAGE_OVERVIEW_TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => scrollToSection(t.id)}
              className={`flex shrink-0 flex-col items-center gap-1 px-3 py-3 text-xs font-medium transition-colors sm:px-4 ${
                activeTab === t.id
                  ? "border-b-2 border-primary bg-primary-10 text-primary"
                  : "text-neutral hover:text-primary"
              }`}
            >
              <MaterialIcon name={t.icon} className="text-xl" />
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 space-y-8">
        <OverviewSection id="itinerary" title={PACKAGE_SECTION_TITLES.itinerary}>
          {days.length > 0 && (
            <div className="sticky top-[132px] z-10 -mx-1 mb-4 bg-white py-2">
              <div className="flex gap-2 overflow-x-auto px-1 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
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
          <FullItineraryTimeline days={days} />
        </OverviewSection>

        <OverviewSection id="flights" title={PACKAGE_SECTION_TITLES.flights}>
          <TabBlocks blocks={flights} empty="No flight details available." />
        </OverviewSection>

        <OverviewSection id="transfers" title={PACKAGE_SECTION_TITLES.transfers}>
          <TabBlocks blocks={transfers} empty="No transfer details available." />
        </OverviewSection>

        <OverviewSection id="hotels" title={PACKAGE_SECTION_TITLES.hotels}>
          <TabBlocks blocks={hotels} empty="No hotel details available." />
        </OverviewSection>

        <OverviewSection id="meals" title={PACKAGE_SECTION_TITLES.meals}>
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
        </OverviewSection>

        <OverviewSection id="ziyarat" title={PACKAGE_SECTION_TITLES.ziyarat}>
          <TabBlocks blocks={ziyarat} empty="No ziyarat details available." />
        </OverviewSection>

        <OverviewSection id="faq" title={PACKAGE_SECTION_TITLES.faq}>
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
        </OverviewSection>

        <OverviewSection id="policies" title={PACKAGE_SECTION_TITLES.policies}>
          <div className="space-y-6">
            {policies.map((p) => (
              <div key={p.title}>
                <h3 className="font-semibold text-tertiary">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral">{p.body}</p>
              </div>
            ))}
          </div>
        </OverviewSection>
      </div>
    </div>
  );
}

function OverviewSection({
  id,
  title,
  children,
}: {
  id: PackageOverviewTabId;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={packageSectionId(id)}
      className="scroll-mt-32 rounded-2xl border border-neutral-20 bg-white p-4 shadow-sm sm:p-6"
    >
      <h3 className="text-base font-bold text-tertiary">{title}</h3>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function TabBlocks({
  blocks,
  empty,
}: {
  blocks: ItineraryBlock[];
  empty: string;
}) {
  if (blocks.length === 0) {
    return <p className="text-sm text-neutral">{empty}</p>;
  }
  return (
    <div className="space-y-8">
      {blocks.map((block, i) => (
        <BlockRenderer key={i} block={block} />
      ))}
    </div>
  );
}
