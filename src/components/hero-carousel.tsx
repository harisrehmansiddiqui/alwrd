"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

type Slide = { src: string; alt: string };

export function HeroCarousel({
  slides,
  fillHeight = false,
}: {
  slides: Slide[];
  fillHeight?: boolean;
}) {
  const [active, setActive] = useState(0);
  const count = slides.length;

  const goTo = useCallback(
    (index: number) => {
      setActive((index + count) % count);
    },
    [count],
  );

  useEffect(() => {
    if (count <= 1) return;
    const timer = window.setInterval(() => {
      setActive((i) => (i + 1) % count);
    }, 5000);
    return () => window.clearInterval(timer);
  }, [count]);

  if (count === 0) return null;

  return (
    <div
      className={`relative w-full overflow-hidden rounded-2xl shadow-2xl ${
        fillHeight
          ? "absolute inset-0 h-full min-h-[280px]"
          : "aspect-[4/3]"
      }`}
    >
      {slides.map((slide, i) => (
        <div
          key={slide.src}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
            i === active ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
          aria-hidden={i !== active}
        >
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority={i === 0}
          />
        </div>
      ))}

      {count > 1 && (
        <div className="absolute inset-x-0 bottom-4 flex justify-center gap-2">
          {slides.map((slide, i) => (
            <button
              key={slide.src}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Show slide ${i + 1}: ${slide.alt}`}
              aria-current={i === active}
              className={`h-2 w-2 rounded-full transition-all ${
                i === active
                  ? "scale-110 bg-white"
                  : "bg-white/45 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
