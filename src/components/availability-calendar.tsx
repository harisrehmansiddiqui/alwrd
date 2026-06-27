"use client";

import { useMemo, useState } from "react";
import {
  buildMonthGrid,
  earliestBookableDate,
  isBookable,
  isSameDay,
  monthLabel,
} from "@/lib/dates";

const WEEKDAYS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

export function AvailabilityCalendar({
  value,
  onSelect,
}: {
  value: Date | null;
  onSelect: (date: Date) => void;
}) {
  // Open the calendar on the first month that actually has bookable dates.
  const earliest = useMemo(() => earliestBookableDate(), []);
  const [view, setView] = useState(() => ({
    year: earliest.getFullYear(),
    month: earliest.getMonth(),
  }));

  const grid = useMemo(
    () => buildMonthGrid(view.year, view.month),
    [view.year, view.month],
  );

  const atEarliestMonth =
    view.year === earliest.getFullYear() && view.month === earliest.getMonth();

  function shiftMonth(delta: number) {
    setView((v) => {
      const next = new Date(v.year, v.month + delta, 1);
      return { year: next.getFullYear(), month: next.getMonth() };
    });
  }

  return (
    <div className="w-72 rounded-2xl bg-white p-4 shadow-card">
      <div className="mb-3 flex items-center justify-between">
        <button
          type="button"
          onClick={() => shiftMonth(-1)}
          disabled={atEarliestMonth}
          className="grid h-8 w-8 place-items-center rounded-lg text-ink/70 hover:bg-surface-tint disabled:opacity-30"
          aria-label="Previous month"
        >
          ‹
        </button>
        <span className="font-display text-sm font-semibold text-brand-heading">
          {monthLabel(view.year, view.month)}
        </span>
        <button
          type="button"
          onClick={() => shiftMonth(1)}
          className="grid h-8 w-8 place-items-center rounded-lg text-ink/70 hover:bg-surface-tint"
          aria-label="Next month"
        >
          ›
        </button>
      </div>

      <div className="mb-1 grid grid-cols-7 text-center text-[11px] font-medium text-slate-muted">
        {WEEKDAYS.map((d) => (
          <span key={d}>{d}</span>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {grid.map((date, i) => {
          if (!date) return <span key={i} />;

          const bookable = isBookable(date);
          const selected = value ? isSameDay(date, value) : false;

          return (
            <button
              key={i}
              type="button"
              disabled={!bookable}
              onClick={() => onSelect(date)}
              className={[
                "h-9 rounded-lg text-sm font-medium transition-colors",
                selected
                  ? "bg-brand text-white"
                  : bookable
                    ? "bg-brand-pill text-brand-heading hover:bg-brand hover:text-white"
                    : "cursor-not-allowed bg-red-50 text-red-400",
              ].join(" ")}
            >
              {date.getDate()}
            </button>
          );
        })}
      </div>

      <div className="mt-3 flex items-center justify-center gap-4 text-[11px] text-slate-muted">
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-brand-pill" /> Available
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-red-200" /> Unavailable
        </span>
      </div>
    </div>
  );
}
