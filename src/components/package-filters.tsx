"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { AvailabilityCalendar } from "@/components/availability-calendar";
import { CustomSelect } from "@/components/custom-select";
import { MaterialIcon } from "@/components/material-icon";
import { formatDate } from "@/lib/dates";

const TIERS = [
  { value: "", label: "All Types" },
  { value: "economy", label: "Economy (3-Star)" },
  { value: "standard", label: "Comfort (4-Star)" },
  { value: "premium", label: "Royale (5-Star)" },
];
const AUDIENCES = [
  { value: "", label: "Everyone" },
  { value: "group", label: "Group" },
  { value: "family", label: "Family" },
  { value: "couple", label: "Couple" },
];
const DURATIONS = [
  { value: "", label: "Any Duration" },
  { value: "7", label: "7 Days" },
  { value: "10", label: "10 Days" },
  { value: "14", label: "14 Days" },
  { value: "21", label: "21 Days" },
];

function monthOptions(): { value: string; label: string }[] {
  const opts = [{ value: "", label: "Any Month" }];
  const start = new Date();
  start.setDate(1);
  for (let i = 0; i < 12; i++) {
    const d = new Date(start.getFullYear(), start.getMonth() + i, 1);
    const value = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    const label = d.toLocaleDateString("en-GB", { month: "long", year: "numeric" });
    opts.push({ value, label });
  }
  return opts;
}

export function PackageFilters({ cities }: { cities: string[] }) {
  const router = useRouter();
  const params = useSearchParams();
  const [calendarOpen, setCalendarOpen] = useState(false);
  const dateFieldRef = useRef<HTMLDivElement>(null);

  const update = useCallback(
    (key: string, value: string) => {
      const next = new URLSearchParams(params.toString());
      next.delete("page");
      if (value) next.set(key, value);
      else next.delete(key);
      if (key === "date") next.delete("month");
      if (key === "month") next.delete("date");
      router.push(`/packages?${next.toString()}`);
    },
    [params, router],
  );

  const get = (key: string) => params.get(key) ?? "";
  const hasFilters = Array.from(params.keys()).some((k) => k !== "page");
  const dateValue = get("date");

  useEffect(() => {
    if (!calendarOpen) return;
    function onPointerDown(e: MouseEvent) {
      if (dateFieldRef.current && !dateFieldRef.current.contains(e.target as Node)) {
        setCalendarOpen(false);
      }
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setCalendarOpen(false);
    }
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [calendarOpen]);

  const cityOptions = [
    { value: "", label: "All Cities" },
    ...cities.map((c) => ({ value: c, label: c })),
  ];

  const selectedDate = dateValue ? new Date(dateValue) : null;

  return (
    <div className="rounded-2xl border border-outline-variant bg-white p-4 shadow-sm">
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <input
          type="search"
          placeholder="Search packages…"
          defaultValue={get("q")}
          onChange={(e) => update("q", e.target.value)}
          className="rounded-lg border border-outline-variant bg-surface px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary md:col-span-2 xl:col-span-1"
        />

        <CustomSelect
          variant="standalone"
          value={get("city")}
          onChange={(v) => update("city", v)}
          options={cityOptions}
          placeholder="All Cities"
        />

        <CustomSelect
          variant="standalone"
          value={get("tier")}
          onChange={(v) => update("tier", v)}
          options={TIERS}
        />

        <CustomSelect
          variant="standalone"
          value={get("audience")}
          onChange={(v) => update("audience", v)}
          options={AUDIENCES}
        />

        <CustomSelect
          variant="standalone"
          value={get("duration")}
          onChange={(v) => update("duration", v)}
          options={DURATIONS}
        />

        <CustomSelect
          variant="standalone"
          value={get("month")}
          onChange={(v) => update("month", v)}
          options={monthOptions()}
          placeholder="Any Month"
        />

        <div ref={dateFieldRef} className="relative md:col-span-2 xl:col-span-1">
          <button
            type="button"
            aria-expanded={calendarOpen}
            onClick={() => setCalendarOpen((v) => !v)}
            className="flex w-full items-center justify-between gap-2 rounded-lg border border-outline-variant bg-surface px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
          >
            <span className="flex items-center gap-2 truncate">
              <MaterialIcon name="calendar_month" className="text-lg text-primary" />
              {selectedDate ? (
                formatDate(selectedDate)
              ) : (
                <span className="text-on-surface-variant">Travel date</span>
              )}
            </span>
            <MaterialIcon
              name="expand_more"
              className={`shrink-0 text-lg transition-transform ${calendarOpen ? "rotate-180" : ""}`}
            />
          </button>
          {calendarOpen && (
            <div className="absolute left-0 top-full z-20 mt-2 w-full min-w-[16rem] sm:w-72">
              <AvailabilityCalendar
                value={selectedDate}
                onSelect={(d) => {
                  update("date", d.toISOString().slice(0, 10));
                  setCalendarOpen(false);
                }}
                compact
              />
            </div>
          )}
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-3">
        <input
          type="number"
          placeholder="Min price"
          defaultValue={get("minPrice")}
          onChange={(e) => update("minPrice", e.target.value)}
          className="w-32 rounded-lg border border-outline-variant bg-surface px-3 py-2 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
        />
        <span className="text-neutral">—</span>
        <input
          type="number"
          placeholder="Max price"
          defaultValue={get("maxPrice")}
          onChange={(e) => update("maxPrice", e.target.value)}
          className="w-32 rounded-lg border border-outline-variant bg-surface px-3 py-2 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
        />
        {hasFilters && (
          <button
            type="button"
            onClick={() => router.push("/packages")}
            className="ml-auto text-sm font-semibold text-primary hover:underline"
          >
            Clear all
          </button>
        )}
      </div>

      <p className="mt-3 text-xs text-on-surface-variant">
        Bookings open from 10 days ahead. Past and within-10-day departures are
        hidden automatically.
      </p>
    </div>
  );
}
