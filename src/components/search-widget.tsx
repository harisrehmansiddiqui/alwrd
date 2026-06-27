"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AvailabilityCalendar } from "@/components/availability-calendar";
import { MaterialIcon } from "@/components/material-icon";
import { formatDate } from "@/lib/dates";

const CITIES = ["Lahore", "Karachi", "Islamabad", "Faisalabad", "Multan"];
const DURATIONS = [
  { value: "", label: "Any duration" },
  { value: "7", label: "7 days" },
  { value: "10", label: "10 days" },
  { value: "14", label: "14 days" },
  { value: "15", label: "15 days" },
  { value: "21", label: "21 days" },
];
const PACKAGE_TYPES = [
  { value: "economy", label: "Economy (3-Star)" },
  { value: "standard", label: "Standard (4-Star)" },
  { value: "premium", label: "Premium (5-Star)" },
];
const PERSON_COUNTS = Array.from({ length: 10 }, (_, i) => i + 1);

export function SearchWidget() {
  const router = useRouter();
  const [city, setCity] = useState("Lahore");
  const [duration, setDuration] = useState("");
  const [type, setType] = useState("standard");
  const [persons, setPersons] = useState("1");
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
    if (duration) params.set("duration", duration);
    if (persons !== "1") params.set("persons", persons);
    if (date) params.set("date", date.toISOString().slice(0, 10));
    router.push(`/packages?${params.toString()}`);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-2.5 rounded-xl border border-outline-variant bg-surface-container-lowest p-3 shadow-md sm:gap-3 sm:p-4 lg:gap-4 lg:p-6"
    >
      <div className="grid grid-cols-2 gap-2.5 sm:gap-3 lg:gap-4">
        <Field label="Departure City" icon="location_on">
          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className={controlClass}
          >
            {CITIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Duration" icon="schedule">
          <select
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className={controlClass}
          >
            {DURATIONS.map((d) => (
              <option key={d.value || "any"} value={d.value}>
                {d.label}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Package Type" icon="category">
          <select
            id="package-type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className={controlClass}
          >
            {PACKAGE_TYPES.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </Field>

        <Field label="No. of Persons" icon="groups">
          <select
            value={persons}
            onChange={(e) => setPersons(e.target.value)}
            className={controlClass}
          >
            {PERSON_COUNTS.map((n) => (
              <option key={n} value={String(n)}>
                {n} {n === 1 ? "person" : "persons"}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <div ref={dateRef} className="relative">
        <Field label="Travel Date" icon="calendar_month">
          <button type="button" onClick={() => setCalendarOpen((v) => !v)} className={controlClass}>
            {date ? (
              formatDate(date)
            ) : (
              <span className="text-on-surface-variant">Select date</span>
            )}
          </button>
        </Field>
        {calendarOpen && (
          <div className="absolute left-0 right-0 z-20 mt-1 sm:left-auto sm:right-0 sm:w-auto">
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

      <button
        type="submit"
        className="w-full rounded-lg bg-primary py-3 text-sm font-semibold text-on-primary shadow-md transition-all hover:bg-primary-dark sm:py-3.5 lg:py-4"
      >
        Get Packages
      </button>
    </form>
  );
}

const controlClass =
  "w-full min-w-0 border-0 bg-transparent py-2 text-left text-sm text-on-surface outline-none sm:py-2.5";

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
    <div className="min-w-0 space-y-1">
      <label className="text-xs font-semibold text-on-surface-variant sm:text-sm">
        {label}
      </label>
      <div className="flex min-w-0 items-center gap-2.5 rounded-lg border border-outline-variant bg-surface px-3 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary">
        <MaterialIcon
          name={icon}
          className="shrink-0 text-[18px] text-primary"
        />
        <div className="min-w-0 flex-1">{children}</div>
      </div>
    </div>
  );
}
