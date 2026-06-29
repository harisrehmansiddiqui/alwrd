"use client";

import { useState } from "react";
import { faqs as defaultFaqs } from "@/lib/content";

export function FaqAccordion({
  items = defaultFaqs,
}: {
  items?: { q: string; a: string }[];
}) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="space-y-3">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div
            key={item.q}
            className="overflow-hidden rounded-2xl border border-black/5 bg-white"
          >
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
              aria-expanded={isOpen}
            >
              <span className="font-display text-base font-semibold text-ink">
                {item.q}
              </span>
              <span
                className={`shrink-0 text-brand transition-transform ${
                  isOpen ? "rotate-45" : ""
                }`}
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
                  <path d="M11 5h2v6h6v2h-6v6h-2v-6H5v-2h6z" />
                </svg>
              </span>
            </button>
            {isOpen && (
              <p className="px-5 pb-5 text-sm text-slate-muted">{item.a}</p>
            )}
          </div>
        );
      })}
    </div>
  );
}
