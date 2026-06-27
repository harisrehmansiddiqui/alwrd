"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AvailabilityCalendar } from "@/components/availability-calendar";
import { CustomSelect } from "@/components/custom-select";
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
const PERSON_COUNTS = Array.from({ length: 10 }, (_, i) => ({
  value: String(i + 1),
  label: `${i + 1} ${i + 1 === 1 ? "person" : "persons"}`,
}));

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
          <CustomSelect
            value={city}
            onChange={setCity}
            options={CITIES.map((c) => ({ value: c, label: c }))}
          />
        </Field>

        <Field label="Duration" icon="schedule">
          <CustomSelect
            value={duration}
            onChange={setDuration}
            options={DURATIONS}
          />
        </Field>

        <Field label="Package Type" icon="category">
          <CustomSelect
            id="package-type"
            value={type}
            onChange={setType}
            options={PACKAGE_TYPES}
          />
        </Field>

        <Field label="No. of Persons" icon="groups">
          <CustomSelect
            value={persons}
            onChange={setPersons}
            options={PERSON_COUNTS}
          />
        </Field>
      </div>

      <div ref={dateRef} className="relative">
        <Field label="Travel Date" icon="calendar_month">
          <button
            type="button"
            onClick={() => setCalendarOpen((v) => !v)}
            className="flex w-full min-w-0 items-center justify-between gap-2 py-2 text-left text-sm outline-none sm:py-2.5"
          >
            <span className="truncate">
              {date ? (
                formatDate(date)
              ) : (
                <span className="text-on-surface-variant">Select date</span>
              )}
            </span>
            <MaterialIcon
              name="expand_more"
              className={`shrink-0 text-lg text-neutral transition-transform ${calendarOpen ? "rotate-180" : ""}`}
            />
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
      <div className="flex min-w-0 items-center gap-2.5 rounded-lg border border-outline-variant bg-surface px-3 has-[button[aria-expanded=true]]:border-primary has-[button[aria-expanded=true]]:ring-1 has-[button[aria-expanded=true]]:ring-primary focus-within:border-primary focus-within:ring-1 focus-within:ring-primary">
        <MaterialIcon
          name={icon}
          className="shrink-0 text-[18px] text-primary"
        />
        {children}
      </div>
    </div>
  );
}
