"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AvailabilityCalendar } from "@/components/availability-calendar";
import { MaterialIcon } from "@/components/material-icon";
import { formatDate } from "@/lib/dates";

const CITIES = ["Lahore", "Karachi", "Islamabad", "Faisalabad", "Multan"];
const PACKAGE_TYPES = [
  { value: "economy", label: "Economy (3-Star)" },
  { value: "standard", label: "Standard (4-Star)" },
  { value: "premium", label: "Premium (5-Star)" },
];

export function SearchWidget() {
  const router = useRouter();
  const [city, setCity] = useState("Lahore");
  const [type, setType] = useState("standard");
  const [date, setDate] = useState<Date | null>(null);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const dateRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (dateRef.current && !dateRef.current.contains(e.target as Node)) {
        setCalendarOpen(false);
      }
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams({ tier: type, city });
    if (date) params.set("date", date.toISOString().slice(0, 10));
    router.push(`/packages?${params.toString()}`);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-8 space-y-4 rounded-xl border border-outline-variant bg-surface-container-lowest p-6 shadow-md"
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Field label="Departure City" icon="location_on">
          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full rounded-lg border border-outline-variant bg-surface py-3 pl-10 pr-4 text-sm text-on-surface outline-none focus:border-primary focus:ring-primary"
          >
            {CITIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </Field>

        <div ref={dateRef} className="relative">
          <Field label="Travel Month" icon="calendar_month">
            <button
              type="button"
              onClick={() => setCalendarOpen((v) => !v)}
              className="w-full rounded-lg border border-outline-variant bg-surface py-3 pl-10 pr-4 text-left text-sm text-on-surface outline-none focus:border-primary"
            >
              {date ? (
                formatDate(date)
              ) : (
                <span className="text-on-surface-variant">Select date</span>
              )}
            </button>
          </Field>
          {calendarOpen && (
            <div className="absolute right-0 z-20 mt-2">
              <AvailabilityCalendar
                value={date}
                onSelect={(d) => {
                  setDate(d);
                  setCalendarOpen(false);
                }}
              />
            </div>
          )}
        </div>
      </div>

      <label className="sr-only" htmlFor="package-type">
        Package type
      </label>
      <select
        id="package-type"
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="w-full rounded-lg border border-outline-variant bg-surface px-4 py-3 text-sm text-on-surface outline-none focus:border-primary"
      >
        {PACKAGE_TYPES.map((t) => (
          <option key={t.value} value={t.value}>
            {t.label}
          </option>
        ))}
      </select>

      <button
        type="submit"
        className="w-full rounded-lg bg-primary py-4 text-sm font-semibold text-on-primary shadow-md transition-all hover:bg-primary-dark"
      >
        Get Packages
      </button>
    </form>
  );
}

function Field({
  label,
  icon,
  children,
}: {
  label: string;
  icon: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative space-y-1">
      <label className="text-sm font-semibold text-on-surface-variant">
        {label}
      </label>
      <div className="relative">
        <MaterialIcon
          name={icon}
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-primary"
        />
        {children}
      </div>
    </div>
  );
}
