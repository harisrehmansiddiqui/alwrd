"use client";

import { useEffect, useRef, useState } from "react";
import { MaterialIcon } from "@/components/material-icon";
import type { DuaPhase } from "@/lib/duas";

export function DuasTimeline({ phases }: { phases: DuaPhase[] }) {
  const [activeId, setActiveId] = useState(phases[0]?.id ?? "");
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    for (const phase of phases) {
      const el = sectionRefs.current[phase.id];
      if (!el) continue;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveId(phase.id);
        },
        { rootMargin: "-20% 0px -55% 0px", threshold: 0 },
      );
      obs.observe(el);
      observers.push(obs);
    }
    return () => observers.forEach((o) => o.disconnect());
  }, [phases]);

  function scrollTo(id: string) {
    sectionRefs.current[id]?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[220px_1fr]">
      <nav
        aria-label="Du'a journey phases"
        className="hidden lg:block"
      >
        <div className="sticky top-24 space-y-1">
          {phases.map((phase) => (
            <button
              key={phase.id}
              type="button"
              onClick={() => scrollTo(phase.id)}
              className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                activeId === phase.id
                  ? "bg-primary/10 font-semibold text-primary"
                  : "text-on-surface-variant hover:bg-surface-container-low hover:text-primary"
              }`}
            >
              <span
                className={`grid h-6 w-6 shrink-0 place-items-center rounded-full text-xs font-bold ${
                  activeId === phase.id
                    ? "bg-primary text-on-primary"
                    : "bg-surface-container-high text-on-surface-variant"
                }`}
              >
                {phase.step}
              </span>
              <span className="line-clamp-2">{phase.title}</span>
            </button>
          ))}
        </div>
      </nav>

      <div className="space-y-10">
        {phases.map((phase) => (
          <section
            key={phase.id}
            id={phase.id}
            ref={(el) => {
              sectionRefs.current[phase.id] = el;
            }}
            className="scroll-mt-24"
          >
            <div className="flex items-start gap-4">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-primary/10">
                <MaterialIcon name={phase.icon} className="text-2xl text-primary" />
              </span>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-primary">
                  Step {phase.step}
                </p>
                <h2 className="font-display text-xl font-bold text-ink sm:text-2xl">
                  {phase.title}
                </h2>
                <p className="mt-1 text-sm text-slate-muted">{phase.subtitle}</p>
              </div>
            </div>

            <div className="mt-6 space-y-4 border-l-2 border-primary/20 pl-6">
              {phase.duas.map((dua) => (
                <article
                  key={dua.title}
                  className="rounded-2xl border border-outline-variant bg-white p-5 shadow-sm sm:p-6"
                >
                  <h3 className="font-display text-base font-semibold text-brand-heading">
                    {dua.title}
                  </h3>
                  {dua.arabic && (
                    <p
                      className="mt-3 text-right text-lg leading-loose text-ink"
                      dir="rtl"
                      lang="ar"
                    >
                      {dua.arabic}
                    </p>
                  )}
                  <p className="mt-3 text-sm italic text-primary/90">
                    {dua.transliteration}
                  </p>
                  <p className="mt-2 text-sm text-ink/80">{dua.translation}</p>
                  {dua.note && (
                    <p className="mt-3 rounded-lg bg-surface-container-low px-3 py-2 text-xs text-on-surface-variant">
                      {dua.note}
                    </p>
                  )}
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
