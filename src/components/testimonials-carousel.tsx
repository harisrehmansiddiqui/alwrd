"use client";

import Image from "next/image";
import { useRef } from "react";
import type { CmsTestimonial } from "@/lib/cms";
import { testimonials as fallbackTestimonials } from "@/lib/content";

const THUMBS = ["/gallery/4.jpg", "/gallery/5.jpg", "/gallery/6.jpg", "/gallery/7.jpg"];

export function TestimonialsCarousel({ items }: { items?: CmsTestimonial[] }) {
  const testimonials = items?.length ? items : fallbackTestimonials.map((t) => ({
    ...t,
    image: null,
  }));
  const trackRef = useRef<HTMLDivElement>(null);

  function scroll(dir: number) {
    trackRef.current?.scrollBy({ left: dir * 320, behavior: "smooth" });
  }

  return (
    <div className="relative">
      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {testimonials.slice(0, 3).map((t, i) => (
          <article
            key={t.name}
            className="relative flex h-[420px] w-[280px] shrink-0 snap-start flex-col overflow-hidden rounded-2xl sm:w-[300px]"
          >
            <Image
              src={(t.image || THUMBS[i]) ?? "/gallery/4.jpg"}
              alt=""
              fill
              className="object-cover"
              sizes="300px"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-[#5c4033]/75 to-[#3d2a1f]" />

            <div className="relative flex flex-1 flex-col p-5">
              <p className="text-[10px] font-bold uppercase tracking-widest text-white/80">
                Al Wrd · Real experience · Real review
              </p>

              <div className="mt-auto flex flex-col items-center pb-2 pt-8">
                <div className="relative">
                  <span className="grid h-20 w-20 place-items-center overflow-hidden rounded-full border-4 border-white/30 bg-primary/30 text-2xl font-bold text-white">
                    {t.name.charAt(0)}
                  </span>
                  {t.video && (
                    <span
                      className="absolute inset-0 grid place-items-center rounded-full bg-black/25"
                      aria-hidden
                    >
                      <span className="grid h-10 w-10 place-items-center rounded-full bg-white/95 text-primary shadow-lg">
                        <svg viewBox="0 0 24 24" className="ml-0.5 h-5 w-5 fill-current">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </span>
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="relative mx-4 mb-4 rounded-xl border border-white/20 bg-white/15 p-4 backdrop-blur-md">
              <p className="line-clamp-3 text-sm leading-relaxed text-white/95">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="mt-3 flex items-center justify-between gap-2">
                <div>
                  <p className="text-sm font-bold text-white">{t.name}</p>
                  <p className="text-xs text-white/75">{t.city}</p>
                </div>
                <div className="flex gap-0.5 text-amber-300">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <svg key={j} viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current">
                      <path d="M12 2l2.9 6 6.6.6-5 4.4 1.5 6.5L12 16.9 5.9 19.5 7.4 13l-5-4.4 6.6-.6L12 2z" />
                    </svg>
                  ))}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-4 flex justify-center gap-2">
        <button
          type="button"
          onClick={() => scroll(-1)}
          className="grid h-9 w-9 place-items-center rounded-full border border-outline-variant text-on-surface-variant hover:bg-surface-container-low"
          aria-label="Previous testimonial"
        >
          ‹
        </button>
        <button
          type="button"
          onClick={() => scroll(1)}
          className="grid h-9 w-9 place-items-center rounded-full border border-outline-variant text-on-surface-variant hover:bg-surface-container-low"
          aria-label="Next testimonial"
        >
          ›
        </button>
      </div>
    </div>
  );
}

export function TestimonialsSection({ items }: { items?: CmsTestimonial[] }) {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-[1280px] min-w-0 px-4 sm:px-6">
        <h2 className="text-center text-2xl font-semibold text-on-background md:text-[32px]">
          What Pilgrims Are Saying
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-center text-base text-on-surface-variant">
          Watch experiences from those who&apos;ve planned and performed Umrah with us.
        </p>
        <div className="mt-10">
          <TestimonialsCarousel items={items} />
        </div>
      </div>
    </section>
  );
}
