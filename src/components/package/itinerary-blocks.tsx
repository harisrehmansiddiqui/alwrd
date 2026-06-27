"use client";

import { useRef, useState } from "react";
import { MaterialIcon } from "@/components/material-icon";
import type {
  FlightBlock,
  TransferBlock,
  HotelBlock,
  ServiceBlock,
  ZiyaratBlock,
  GuideBlock,
  NoteBlock,
  AlertBlock,
  GalleryBlock,
  ItineraryBlock,
  ItineraryDay,
} from "@/lib/itinerary";

const AMENITY_ICONS: Record<string, string> = {
  Toiletries: "soap",
  WiFi: "wifi",
  "Led TV": "tv",
  "Air Conditioning": "ac_unit",
  Kettle: "coffee",
  "Mini Fridge": "kitchen",
  Closet: "checkroom",
  Elevator: "elevator",
};

export function BlockRenderer({ block }: { block: ItineraryBlock }) {
  switch (block.type) {
    case "flight":
      return <FlightCard block={block} />;
    case "alert":
      return <AlertCard block={block} />;
    case "transfer":
      return <TransferCard block={block} />;
    case "hotel":
      return <HotelCard block={block} />;
    case "service":
      return <ServiceCard block={block} />;
    case "ziyarat":
      return <ZiyaratCard block={block} />;
    case "gallery":
      return <GalleryStrip block={block} />;
    case "guide":
      return <GuideCard block={block} />;
    case "note":
      return <NoteCard block={block} />;
    default:
      return null;
  }
}

export function DayTimeline({ day }: { day: ItineraryDay }) {
  return (
    <div className="relative pl-24">
      {/* Left timeline rail */}
      <div className="absolute left-0 top-0 flex w-20 flex-col items-end">
        <span className="rounded-lg bg-primary-10 px-2 py-1 text-xs font-bold text-primary">
          {day.label}
        </span>
        {day.date && (
          <span className="mt-1 text-[10px] text-neutral">{day.date}</span>
        )}
        <div className="absolute left-[calc(100%+12px)] top-8 bottom-0 w-px bg-secondary" />
      </div>

      <div className="space-y-8">
        {day.blocks.map((block, i) => (
          <div key={i} className="relative">
            <BlockRenderer block={block} />
          </div>
        ))}
      </div>
    </div>
  );
}

function Section({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="py-2">
      <h3 className="text-base font-bold text-tertiary">{title}</h3>
      {subtitle && (
        <p className="mt-0.5 text-sm text-neutral">{subtitle}</p>
      )}
      <div className="mt-4">{children}</div>
    </section>
  );
}

function FlightCard({ block }: { block: FlightBlock }) {
  const [open, setOpen] = useState(false);

  return (
    <Section title={block.title} subtitle={block.subtitle}>
      <div className="rounded-xl border border-neutral-20 bg-white p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-sm font-bold text-primary">
            {block.airline.slice(0, 2).toUpperCase()}
          </div>
          <div>
            <p className="text-sm font-semibold text-tertiary">{block.airline}</p>
            <p className="text-xs text-neutral">{block.date}</p>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-[1fr_auto_1fr] items-center gap-4">
          <div>
            <p className="text-2xl font-bold text-tertiary">{block.fromCode}</p>
            <p className="text-sm font-semibold">{block.departTime}</p>
            <p className="mt-0.5 text-xs text-neutral">{block.fromAirport}</p>
          </div>
          <div className="flex flex-col items-center gap-1 text-primary">
            <MaterialIcon name="flight" className="rotate-90 text-xl" />
            <span className="text-xs font-medium">{block.duration}</span>
            <span className="text-[10px] uppercase text-neutral">{block.stops}</span>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-tertiary">{block.toCode}</p>
            <p className="text-sm font-semibold">{block.arriveTime}</p>
            <p className="mt-0.5 text-xs text-neutral">{block.toAirport}</p>
          </div>
        </div>
      </div>

      <div className="mt-3 flex items-start gap-2 rounded-lg border border-primary-20 bg-primary-10 px-3 py-2.5 text-xs text-on-primary-container">
        <MaterialIcon name="info" className="mt-0.5 shrink-0 text-sm" />
        <span>
          {block.cabinBaggage} and {block.checkInBaggage}. Any Baggage crossing
          this specified limit is extra chargeable.
        </span>
      </div>

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="mt-3 flex items-center gap-1 text-sm font-semibold text-primary"
      >
        View baggage information
        <MaterialIcon name={open ? "expand_less" : "expand_more"} />
      </button>
      {open && (
        <ul className="mt-2 space-y-1 pl-4 text-sm text-neutral">
          <li className="list-disc">{block.cabinBaggage}</li>
          <li className="list-disc">{block.checkInBaggage}</li>
        </ul>
      )}
    </Section>
  );
}

function AlertCard({ block }: { block: AlertBlock }) {
  return (
    <div className="rounded-xl bg-primary-10 px-4 py-3">
      <p className="text-sm font-semibold text-on-primary-container">{block.title}</p>
      <p className="mt-1 text-sm text-on-primary-container/90">{block.body}</p>
    </div>
  );
}

function TransferCard({ block }: { block: TransferBlock }) {
  return (
    <Section title={block.title} subtitle={block.subtitle}>
      <div className="flex gap-4 rounded-2xl bg-secondary/40 p-4 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
        {block.image && (
          <div
            className="hidden h-24 w-32 shrink-0 rounded-xl bg-cover bg-center sm:block"
            style={{ backgroundImage: `url('${block.image}')` }}
          />
        )}
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2 text-sm font-medium text-tertiary">
            <span>{block.from}</span>
            <MaterialIcon name="arrow_forward" className="text-primary" />
            <span>{block.to}</span>
          </div>
          <div className="mt-3 flex flex-wrap gap-4 text-sm text-neutral">
            <span className="flex items-center gap-1">
              <MaterialIcon name="directions_bus" className="text-primary" />
              {block.vehicle}
            </span>
            <span>{block.duration}</span>
            <span>Up to {block.capacity} passengers</span>
          </div>
        </div>
      </div>
    </Section>
  );
}

function HotelCard({ block }: { block: HotelBlock }) {
  const [open, setOpen] = useState(false);

  return (
    <Section title={block.title} subtitle={block.subtitle}>
      <div className="flex gap-4 rounded-2xl bg-secondary/30 p-4 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
        <div
          className="h-28 w-28 shrink-0 rounded-xl bg-cover bg-center sm:h-32 sm:w-36"
          style={{
            backgroundImage: `url('${block.image ?? "/gallery/2.jpg"}')`,
          }}
        />
        <div className="min-w-0 flex-1">
          <p className="text-lg font-bold capitalize text-tertiary">{block.name}</p>
          <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-neutral">
            <span className="flex items-center gap-0.5 text-primary">
              {Array.from({ length: block.stars }).map((_, i) => (
                <MaterialIcon key={i} name="star" className="text-sm" filled />
              ))}
              <span className="ml-1 text-neutral">{block.rating}/5.0</span>
            </span>
            <span>{block.distanceM}m from Haram</span>
          </div>
          <p className="mt-1 text-xs text-neutral">
            {block.walkMinutes} min walk · {block.address} · {block.nights} nights
          </p>
          <div className="mt-3 flex flex-wrap gap-3">
            {block.amenities.slice(0, 5).map((a) => (
              <span
                key={a}
                className="flex items-center gap-1 text-[11px] text-neutral"
              >
                <MaterialIcon
                  name={AMENITY_ICONS[a] ?? "check"}
                  className="text-sm text-primary"
                />
                {a}
              </span>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="mt-2 text-xs font-semibold text-primary"
          >
            {open ? "Hide amenities" : "View all amenities"}
          </button>
          {open && (
            <div className="mt-2 flex flex-wrap gap-2">
              {block.amenities.map((a) => (
                <span key={a} className="text-[11px] text-neutral">
                  {a}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </Section>
  );
}

function ServiceCard({ block }: { block: ServiceBlock }) {
  return (
    <Section title={block.title}>
      <div className="flex gap-4">
        {block.image && (
          <div
            className="h-20 w-20 shrink-0 rounded-xl bg-cover bg-center"
            style={{ backgroundImage: `url('${block.image}')` }}
          />
        )}
        <div className="flex items-start gap-3">
          <MaterialIcon name="check_circle" className="mt-0.5 text-xl text-primary" />
          <div>
            <p className="font-semibold text-tertiary">{block.name}</p>
            <p className="mt-1 text-sm text-neutral">{block.desc}</p>
          </div>
        </div>
      </div>
    </Section>
  );
}

function GalleryStrip({ block }: { block: GalleryBlock }) {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <Section title={block.title} subtitle={block.subtitle}>
      <div
        ref={ref}
        className="flex gap-3 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {block.images.map((src, i) => (
          <div
            key={i}
            className="h-36 w-52 shrink-0 rounded-xl bg-cover bg-center shadow-[0_2px_12px_rgba(0,0,0,0.06)]"
            style={{ backgroundImage: `url('${src}')` }}
          />
        ))}
      </div>
    </Section>
  );
}

function ZiyaratCard({ block }: { block: ZiyaratBlock }) {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? block.activities : block.activities.slice(0, 3);

  return (
    <Section title={block.title}>
      <div className="flex gap-2">
        {visible.map((activity, i) => (
          <div
            key={activity}
            className="relative h-28 w-36 shrink-0 rounded-lg bg-cover bg-center"
            style={{ backgroundImage: `url('/gallery/${(i % 6) + 1}.jpg')` }}
          >
            <span className="absolute inset-x-0 bottom-0 rounded-b-lg bg-gradient-to-t from-black/60 to-transparent p-2 text-[10px] font-semibold text-white">
              {activity}
            </span>
          </div>
        ))}
        {!expanded && block.activities.length > 3 && (
          <button
            type="button"
            onClick={() => setExpanded(true)}
            className="flex h-28 w-28 shrink-0 flex-col items-center justify-center rounded-lg bg-secondary text-xs font-semibold text-primary"
          >
            View All
          </button>
        )}
      </div>
    </Section>
  );
}

function GuideCard({ block }: { block: GuideBlock }) {
  return (
    <div className="flex gap-4 rounded-xl bg-secondary/50 p-4">
      <div
        className="h-16 w-16 shrink-0 rounded-lg bg-cover bg-center"
        style={{ backgroundImage: "url('/resources/support.jpg')" }}
      />
      <div className="min-w-0 flex-1">
        <p className="font-semibold text-tertiary">{block.title}</p>
        <p className="mt-0.5 text-sm text-neutral">{block.desc}</p>
        <a
          href={block.href}
          className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-primary"
        >
          {block.cta}
          <MaterialIcon name="north_east" className="text-sm" />
        </a>
      </div>
    </div>
  );
}

function NoteCard({ block }: { block: NoteBlock }) {
  return (
    <p className="py-4 text-center text-sm italic text-neutral">{block.text}</p>
  );
}
