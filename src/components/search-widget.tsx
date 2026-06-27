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

  const fieldClass =
    "w-full rounded-lg border border-outline-variant bg-surface py-3 pl-10 pr-4 text-sm text-on-surface outline-none focus:border-primary focus:ring-1 focus:ring-primary";

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-8 flex flex-col gap-4 rounded-xl border border-outline-variant bg-surface-container-lowest p-6 shadow-md"
    >
      {/* 1. Departure city */}
      <Field label="Departure City" icon="location_on">
        <select
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className={fieldClass}
        >
          {CITIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </Field>

      {/* 2. Duration */}
      <Field label="Duration" icon="schedule">
        <select
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          className={fieldClass}
        >
          {DURATIONS.map((d) => (
            <option key={d.value || "any"} value={d.value}>
              {d.label}
            </option>
          ))}
        </select>
      </Field>

      {/* 3. Package type */}
      <Field label="Package Type" icon="category">
        <select
          id="package-type"
          value={type}
          onChange={(e) => setType(e.target.value)}
          className={fieldClass}
        >
          {PACKAGE_TYPES.map((t) => (
            <option key={t.value} value={t.value}>
              {t.label}
            </option>
          ))}
        </select>
      </Field>

      {/* 4. No of persons */}
      <Field label="No. of Persons" icon="groups">
        <select
          value={persons}
          onChange={(e) => setPersons(e.target.value)}
          className={fieldClass}
        >
          {PERSON_COUNTS.map((n) => (
            <option key={n} value={String(n)}>
              {n} {n === 1 ? "person" : "persons"}
            </option>
          ))}
        </select>
      </Field>

      {/* 5. Date */}
      <div ref={dateRef} className="relative">
        <Field label="Travel Date" icon="calendar_month">
          <button
            type="button"
            onClick={() => setCalendarOpen((v) => !v)}
            className={`${fieldClass} text-left`}
          >
            {date ? (
              formatDate(date)
            ) : (
              <span className="text-on-surface-variant">Select date</span>
            )}
          </button>
        </Field>
        {calendarOpen && (
          <div className="absolute left-0 right-0 z-20 mt-2 sm:left-auto sm:right-0 sm:w-auto">
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
          className="pointer-events-none absolute left-3 top-1/2 z-10 -translate-y-1/2 text-primary"
        />
        {children}
      </div>
    </div>
  );
}
