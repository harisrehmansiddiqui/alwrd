"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
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
  const [mounted, setMounted] = useState(false);
  const [city, setCity] = useState("Lahore");
  const [duration, setDuration] = useState("");
  const [type, setType] = useState("standard");
  const [persons, setPersons] = useState("1");
  const [date, setDate] = useState<Date | null>(null);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const dateRef = useRef<HTMLDivElement>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!calendarOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [calendarOpen]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams({ tier: type, city });
    if (duration) params.set("duration", duration);
    if (persons !== "1") params.set("persons", persons);
    if (date) params.set("date", date.toISOString().slice(0, 10));
    router.push(`/packages?${params.toString()}`);
  }

  function handleDateSelect(d: Date) {
    setDate(d);
    setCalendarOpen(false);
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-2 rounded-xl border border-outline-variant bg-surface-container-lowest p-2.5 shadow-md sm:gap-2.5 sm:p-3.5 xl:p-4"
      >
        <div className="grid grid-cols-2 gap-2 sm:gap-2.5 xl:gap-3">
          <Field label="Departure City" icon="location_on">
            <CustomSelect
              value={city}
              onChange={setCity}
              options={CITIES.map((c) => ({ value: c, label: c }))}
              compact
            />
          </Field>

          <Field label="Duration" icon="schedule">
            <CustomSelect
              value={duration}
              onChange={setDuration}
              options={DURATIONS}
              compact
            />
          </Field>

          <Field label="Package Type" icon="category">
            <CustomSelect
              id="package-type"
              value={type}
              onChange={setType}
              options={PACKAGE_TYPES}
              compact
            />
          </Field>

          <Field label="Persons" icon="groups">
            <CustomSelect
              value={persons}
              onChange={setPersons}
              options={PERSON_COUNTS}
              compact
            />
          </Field>

          <div ref={dateRef} className="relative col-span-2">
            <Field label="Travel Date" icon="calendar_month">
              <button
                type="button"
                onClick={() => setCalendarOpen((v) => !v)}
                className="flex w-full min-w-0 items-center justify-between gap-2 py-1.5 text-left text-sm outline-none sm:py-2"
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
          </div>
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-primary py-2.5 text-sm font-semibold text-on-primary shadow-md transition-all hover:bg-primary-dark sm:py-3"
        >
          Get Packages
        </button>
      </form>

      {calendarOpen &&
        mounted &&
        createPortal(
          <div data-calendar-overlay className="fixed inset-0 z-[200]">
            <button
              type="button"
              aria-label="Close calendar"
              className="absolute inset-0 bg-black/40"
              onClick={() => setCalendarOpen(false)}
            />
            <div className="absolute left-1/2 top-1/2 w-[min(calc(100vw-2rem),18rem)] -translate-x-1/2 -translate-y-1/2">
              <AvailabilityCalendar
                value={date}
                onSelect={handleDateSelect}
                compact
              />
            </div>
          </div>,
          document.body,
        )}
    </>
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
    <div className="min-w-0 space-y-0.5">
      <label className="whitespace-nowrap text-[11px] font-semibold text-on-surface-variant sm:text-xs">
        {label}
      </label>
      <div className="flex min-w-0 items-center gap-2 rounded-lg border border-outline-variant bg-surface px-2.5 has-[button[aria-expanded=true]]:border-primary has-[button[aria-expanded=true]]:ring-1 has-[button[aria-expanded=true]]:ring-primary focus-within:border-primary focus-within:ring-1 focus-within:ring-primary sm:gap-2.5 sm:px-3">
        <MaterialIcon
          name={icon}
          className="shrink-0 text-base text-primary sm:text-[18px]"
        />
        {children}
      </div>
    </div>
  );
}
