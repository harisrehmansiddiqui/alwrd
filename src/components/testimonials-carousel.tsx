"use client";

import { useRef } from "react";
import { testimonials } from "@/lib/content";

export function TestimonialsCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);

  function scroll(dir: number) {
    trackRef.current?.scrollBy({ left: dir * 340, behavior: "smooth" });
  }

  return (
    <div className="relative">
      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {testimonials.map((t) => (
          <article
            key={t.name}
            className="flex w-[300px] shrink-0 snap-start flex-col rounded-2xl border border-black/5 bg-white p-6 shadow-sm"
          >
            <div className="flex items-center gap-1 text-gold">
              {Array.from({ length: t.rating }).map((_, i) => (
                <svg key={i} viewBox="0 0 24 24" className="h-4 w-4 fill-current">
                  <path d="M12 2l2.9 6 6.6.6-5 4.4 1.5 6.5L12 16.9 5.9 19.5 7.4 13l-5-4.4 6.6-.6L12 2z" />
                </svg>
              ))}
            </div>
            <p className="mt-3 flex-1 text-sm text-ink/80">&ldquo;{t.quote}&rdquo;</p>
            <div className="mt-5 flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-brand-pill font-display font-semibold text-brand-heading">
                {t.name.charAt(0)}
              </span>
              <div>
                <div className="text-sm font-semibold text-ink">{t.name}</div>
                <div className="text-xs text-slate-muted">{t.city}</div>
              </div>
              {t.video && (
                <span className="ml-auto grid h-8 w-8 place-items-center rounded-full bg-brand text-white">
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
              )}
            </div>
          </article>
        ))}
      </div>

      <div className="mt-4 flex justify-center gap-2">
        <button
          type="button"
          onClick={() => scroll(-1)}
          className="grid h-9 w-9 place-items-center rounded-full border border-black/10 text-ink/70 hover:bg-surface-tint"
          aria-label="Previous"
        >
          ‹
        </button>
        <button
          type="button"
          onClick={() => scroll(1)}
          className="grid h-9 w-9 place-items-center rounded-full border border-black/10 text-ink/70 hover:bg-surface-tint"
          aria-label="Next"
        >
          ›
        </button>
      </div>
    </div>
  );
}
