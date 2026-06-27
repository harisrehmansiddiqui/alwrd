"use client";

import { MaterialIcon } from "@/components/material-icon";

type AmenityStyle = {
  bg: string;
  text: string;
  icon?: string;
};

const AMENITY_STYLES: { match: RegExp; style: AmenityStyle }[] = [
  { match: /sim/i, style: { bg: "bg-red-50", text: "text-red-600" } },
  {
    match: /hotel|star/i,
    style: { bg: "bg-emerald-50", text: "text-emerald-700" },
  },
  { match: /meal/i, style: { bg: "bg-lime-50", text: "text-lime-700" } },
  {
    match: /flight/i,
    style: { bg: "bg-pink-50", text: "text-pink-600", icon: "flight" },
  },
  {
    match: /transfer|transport/i,
    style: {
      bg: "bg-sky-50",
      text: "text-sky-600",
      icon: "directions_bus",
    },
  },
  { match: /taif/i, style: { bg: "bg-cyan-50", text: "text-cyan-600" } },
  {
    match: /triple|umrah journey/i,
    style: { bg: "bg-blue-50", text: "text-blue-600" },
  },
  {
    match: /museum|ziyarat/i,
    style: { bg: "bg-violet-50", text: "text-violet-600" },
  },
  {
    match: /visa|all-inclusive/i,
    style: { bg: "bg-amber-50", text: "text-amber-700" },
  },
];

const FALLBACK_STYLES: AmenityStyle[] = [
  { bg: "bg-rose-50", text: "text-rose-600" },
  { bg: "bg-teal-50", text: "text-teal-600" },
  { bg: "bg-indigo-50", text: "text-indigo-600" },
  { bg: "bg-orange-50", text: "text-orange-600" },
];

function getAmenityStyle(label: string, index: number): AmenityStyle {
  for (const entry of AMENITY_STYLES) {
    if (entry.match.test(label)) return entry.style;
  }
  return FALLBACK_STYLES[index % FALLBACK_STYLES.length];
}

function AmenityPill({ label, index }: { label: string; index: number }) {
  const style = getAmenityStyle(label, index);

  return (
    <span
      className={`inline-flex shrink-0 items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${style.bg} ${style.text}`}
    >
      {style.icon && (
        <MaterialIcon name={style.icon} className="text-sm" />
      )}
      {label}
    </span>
  );
}

export function AmenityMarquee({ items }: { items: string[] }) {
  if (items.length === 0) return null;

  const loop = [...items, ...items];

  return (
    <div className="amenity-marquee relative max-w-full overflow-hidden py-1">
      <div className="flex w-max animate-amenity-marquee gap-2 hover:[animation-play-state:paused]">
        {loop.map((label, i) => (
          <AmenityPill key={`${label}-${i}`} label={label} index={i % items.length} />
        ))}
      </div>
    </div>
  );
}
