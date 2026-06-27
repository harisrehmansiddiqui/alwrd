"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AvailabilityCalendar } from "@/components/availability-calendar";
import { formatDate } from "@/lib/dates";

const PERSON_OPTIONS = [1, 2, 3, 4, 5, 6, 7, 8];
const PACKAGE_TYPES = [
  { value: "economy", label: "Economy (3-Star)" },
  { value: "standard", label: "Standard (4-Star)" },
  { value: "premium", label: "Premium (5-Star)" },
];
const DURATIONS = [7, 10, 14, 21];

export function SearchWidget() {
  const router = useRouter();
  const [persons, setPersons] = useState(1);
  const [type, setType] = useState("standard");
  const [duration, setDuration] = useState(14);
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
    const params = new URLSearchParams({
      persons: String(persons),
      type,
      duration: String(duration),
    });
    if (date) params.set("date", date.toISOString().slice(0, 10));
    router.push(`/packages?${params.toString()}`);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl bg-white p-5 shadow-card sm:p-6"
    >
      <div className="grid gap-4 md:grid-cols-4">
        <Field label="No. of Persons" icon={<PersonIcon />}>
          <select
            value={persons}
            onChange={(e) => setPersons(Number(e.target.value))}
            className="w-full bg-transparent text-sm font-medium text-ink outline-none"
          >
            {PERSON_OPTIONS.map((n) => (
              <option key={n} value={n}>
                {n} {n === 1 ? "Person" : "Persons"}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Package Type" icon={<StarIcon />}>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full bg-transparent text-sm font-medium text-ink outline-none"
          >
            {PACKAGE_TYPES.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Duration" icon={<ClockIcon />}>
          <select
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            className="w-full bg-transparent text-sm font-medium text-ink outline-none"
          >
            {DURATIONS.map((d) => (
              <option key={d} value={d}>
                {d} Days
              </option>
            ))}
          </select>
        </Field>

        <div ref={dateRef} className="relative">
          <Field label="Start Date" icon={<CalendarIcon />}>
            <button
              type="button"
              onClick={() => setCalendarOpen((v) => !v)}
              className="w-full text-left text-sm font-medium text-ink"
            >
              {date ? (
                formatDate(date)
              ) : (
                <span className="text-slate-muted">dd/mm/yyyy</span>
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

      <button
        type="submit"
        className="mx-auto mt-5 flex items-center justify-center gap-2 rounded-xl bg-brand px-8 py-3.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-deep"
      >
        Show My Packages
        <span aria-hidden>→</span>
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
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <label className="block rounded-2xl border border-black/8 bg-surface-tint px-4 py-3">
      <span className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-slate-muted">
        <span className="text-brand">{icon}</span>
        {label}
      </span>
      {children}
    </label>
  );
}

function PersonIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
      <path d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10zm0 2c-4.4 0-8 2.7-8 6v2h16v-2c0-3.3-3.6-6-8-6z" />
    </svg>
  );
}
function StarIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
      <path d="M12 2l2.9 6 6.6.6-5 4.4 1.5 6.5L12 16.9 5.9 19.5 7.4 13l-5-4.4 6.6-.6L12 2z" />
    </svg>
  );
}
function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
      <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm1 10.6 4 2.3-1 1.7-5-2.9V6h2v6.6z" />
    </svg>
  );
}
function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
      <path d="M7 2v2H5a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-2V2h-2v2H9V2H7zM5 9h14v10H5V9z" />
    </svg>
  );
}
