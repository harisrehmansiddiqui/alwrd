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
  compact = false,
}: {
  value: Date | null;
  onSelect: (date: Date) => void;
  compact?: boolean;
}) {
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
    <div
      className={`w-full rounded-2xl border border-outline-variant bg-white shadow-[0_8px_32px_rgba(0,0,0,0.12)] ${compact ? "p-3" : "w-72 p-4 shadow-card"}`}
    >
      <div className={`flex items-center justify-between ${compact ? "mb-2" : "mb-3"}`}>
        <button
          type="button"
          onClick={() => shiftMonth(-1)}
          disabled={atEarliestMonth}
          className="grid h-8 w-8 place-items-center rounded-lg text-on-surface/70 hover:bg-surface-container-low disabled:opacity-30"
          aria-label="Previous month"
        >
          ‹
        </button>
        <span className="text-sm font-semibold text-on-background">
          {monthLabel(view.year, view.month)}
        </span>
        <button
          type="button"
          onClick={() => shiftMonth(1)}
          className="grid h-8 w-8 place-items-center rounded-lg text-on-surface/70 hover:bg-surface-container-low"
          aria-label="Next month"
        >
          ›
        </button>
      </div>

      <div className="mb-1 grid grid-cols-7 text-center text-[10px] font-medium text-neutral sm:text-[11px]">
        {WEEKDAYS.map((d) => (
          <span key={d}>{d}</span>
        ))}
      </div>

      <div className={`grid grid-cols-7 ${compact ? "gap-0.5" : "gap-1"}`}>
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
                compact ? "h-8 rounded-md text-xs" : "h-9 rounded-lg text-sm",
                "font-medium transition-colors",
                selected
                  ? "bg-primary text-on-primary"
                  : bookable
                    ? "bg-primary-10 text-primary hover:bg-primary hover:text-on-primary"
                    : "cursor-not-allowed bg-neutral-10 text-neutral-40",
              ].join(" ")}
            >
              {date.getDate()}
            </button>
          );
        })}
      </div>

      <div className={`flex items-center justify-center gap-4 text-[10px] text-neutral sm:text-[11px] ${compact ? "mt-2" : "mt-3"}`}>
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-primary-10" /> Available
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-neutral-20" /> Unavailable
        </span>
      </div>
    </div>
  );
}
