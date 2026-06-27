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
    <DaySection day={day} />
  );
}

export function FullItineraryTimeline({ days }: { days: ItineraryDay[] }) {
  return (
    <div className="relative space-y-10 sm:space-y-12">
      <div
        className="absolute bottom-0 left-[84px] top-0 hidden w-px bg-neutral-20 sm:block sm:left-[104px]"
        aria-hidden
      />
      {days.map((day) => (
        <DaySection key={day.id} day={day} />
      ))}
    </div>
  );
}

function DaySection({ day }: { day: ItineraryDay }) {
  return (
    <section id={`day-${day.id}`} className="relative scroll-mt-28">
      {/* Mobile: label above content */}
      <div className="sm:hidden">
        <div className="mb-4">
          <span className="inline-block rounded-lg bg-primary-10 px-2.5 py-1 text-xs font-bold text-primary">
            {day.label}
          </span>
          {day.date && (
            <p className="mt-1 text-[11px] text-neutral">{day.date}</p>
          )}
        </div>
        <div className="min-w-0 space-y-8 border-l-2 border-primary-20 pl-4">
          {day.blocks.map((block, i) => (
            <BlockRenderer key={i} block={block} />
          ))}
        </div>
      </div>

      {/* Desktop: side rail */}
      <div className="hidden min-w-0 sm:grid sm:grid-cols-[84px_minmax(0,1fr)] sm:gap-x-5 lg:grid-cols-[96px_minmax(0,1fr)]">
        <div className="flex flex-col items-end pt-1 text-right">
          <span className="rounded-lg bg-primary-10 px-2 py-1 text-xs font-bold leading-tight text-primary">
            {day.label}
          </span>
          {day.date && (
            <span className="mt-1 text-[10px] text-neutral">{day.date}</span>
          )}
        </div>
        <div className="min-w-0 space-y-8 border-l border-neutral-20 pl-6">
          {day.blocks.map((block, i) => (
            <BlockRenderer key={i} block={block} />
          ))}
        </div>
      </div>
    </section>
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
    <section className="min-w-0 py-2">
      <h3 className="break-words text-base font-bold text-tertiary">{title}</h3>
      {subtitle && (
        <p className="mt-0.5 break-words text-sm text-neutral">{subtitle}</p>
      )}
      <div className="mt-4 min-w-0">{children}</div>
    </section>
  );
}

function FlightPathGraphic({
  duration,
  stops,
}: {
  duration: string;
  stops: string;
}) {
  return (
    <div className="mx-auto flex w-full max-w-[148px] flex-col items-center">
      <div className="relative h-7 w-full sm:h-8">
        <svg viewBox="0 0 140 32" className="h-full w-full" aria-hidden>
          <path
            d="M 8 28 Q 70 2 132 28"
            fill="none"
            stroke="#99cc99"
            strokeWidth="1.5"
            strokeDasharray="4 3"
          />
        </svg>
        <span className="absolute inset-x-0 top-0 text-center text-[10px] font-medium text-neutral">
          {duration}
        </span>
      </div>
      <div className="relative -mt-0.5 flex w-full items-center">
        <div className="h-px flex-1 border-t border-dashed border-neutral-40" />
        <svg
          viewBox="0 0 24 24"
          className="mx-0.5 h-4 w-4 shrink-0 sm:h-[18px] sm:w-[18px]"
          aria-hidden
        >
          <path
            fill="#006400"
            d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 2v1h3v-1l2-2v-5.5L21 16z"
          />
        </svg>
        <div className="h-px flex-1 border-t border-dashed border-neutral-40" />
      </div>
      <span className="mt-0.5 text-[10px] font-medium uppercase tracking-wide text-neutral">
        {stops}
      </span>
    </div>
  );
}

function FlightCard({ block }: { block: FlightBlock }) {
  const airlineShort = block.airline.split(" ")[0].slice(0, 2).toUpperCase();

  return (
    <Section title={block.title} subtitle={block.subtitle}>
      <div className="overflow-hidden rounded-xl border border-neutral-20 bg-white">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-neutral-20 px-4 py-3">
          <span className="text-sm font-semibold text-[#1B3A4B]">
            {block.fromCity} → {block.toCity}
          </span>
          <span className="flex items-center gap-1.5 text-xs text-neutral sm:text-sm">
            <span className="h-2 w-2 shrink-0 rounded-full bg-primary" />
            {block.date}
          </span>
        </div>

        <div className="grid grid-cols-[auto_1fr_auto] items-center gap-3 px-4 py-5 sm:grid-cols-[64px_auto_1fr_auto] sm:gap-4">
          <div className="col-span-3 flex h-9 w-14 items-center justify-center rounded-lg border border-neutral-20 bg-white text-xs font-bold text-[#E8602A] sm:col-span-1 sm:h-10 sm:w-16">
            {airlineShort}
          </div>

          <div className="shrink-0">
            <p className="text-xl font-bold text-[#1B3A4B] sm:text-2xl">
              {block.fromCode}
            </p>
            <p className="text-sm font-semibold text-tertiary">
              {block.departTime}
            </p>
          </div>

          <div className="col-span-3 min-w-0 sm:col-span-1">
            <FlightPathGraphic duration={block.duration} stops={block.stops} />
          </div>

          <div className="shrink-0 text-right">
            <p className="text-xl font-bold text-[#1B3A4B] sm:text-2xl">
              {block.toCode}
            </p>
            <p className="text-sm font-semibold text-tertiary">
              {block.arriveTime}
            </p>
          </div>
        </div>

        <div className="mx-4 mb-4 flex items-start gap-2 rounded-lg border border-primary-20 bg-primary-10 px-3 py-2.5">
          <svg
            viewBox="0 0 24 24"
            className="mt-0.5 h-4 w-4 shrink-0 fill-primary"
            aria-hidden
          >
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
          </svg>
          <div className="min-w-0 text-xs">
            <p className="font-bold text-on-primary-container">
              {block.cabinBaggage} and {block.checkInBaggage}
            </p>
            <p className="mt-0.5 text-on-primary-container/85">
              Any Baggage crossing this specified limit is extra chargeable.
            </p>
            <button
              type="button"
              className="mt-1 font-medium text-primary underline underline-offset-2"
            >
              View security restricted items
            </button>
          </div>
        </div>
      </div>
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
      <div className="flex flex-col gap-4 rounded-2xl bg-secondary/40 p-4 shadow-[0_2px_12px_rgba(0,0,0,0.03)] sm:flex-row">
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
      <div className="flex flex-col gap-4 rounded-2xl bg-secondary/30 p-4 shadow-[0_2px_12px_rgba(0,0,0,0.03)] sm:flex-row">
        <div
          className="h-40 w-full shrink-0 rounded-xl bg-cover bg-center sm:h-32 sm:w-36"
          style={{
            backgroundImage: `url('${block.image ?? "/gallery/2.jpg"}')`,
          }}
        />
        <div className="min-w-0 flex-1 overflow-hidden">
          <p className="break-words text-lg font-bold capitalize text-tertiary">
            {block.name}
          </p>
          <div className="mt-1 flex flex-col gap-1 text-xs text-neutral sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-3 sm:gap-y-1">
            <span className="flex shrink-0 items-center gap-0.5 text-primary">
              {Array.from({ length: block.stars }).map((_, i) => (
                <MaterialIcon key={i} name="star" className="text-sm" filled />
              ))}
              <span className="ml-1 whitespace-nowrap text-neutral">
                {block.rating}/5.0
              </span>
            </span>
            <span className="shrink-0">{block.distanceM}m from Haram</span>
          </div>
          <p className="mt-1 break-words text-xs text-neutral">
            {block.walkMinutes} min walk · {block.address} · {block.nights}{" "}
            nights
          </p>
          <div className="mt-3 flex flex-wrap gap-x-3 gap-y-2">
            {block.amenities.slice(0, 5).map((a) => (
              <span
                key={a}
                className="flex items-center gap-1 text-[11px] text-neutral"
              >
                <MaterialIcon
                  name={AMENITY_ICONS[a] ?? "check"}
                  className="shrink-0 text-sm text-primary"
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
      <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
        {block.image && (
          <div
            className="h-20 w-20 shrink-0 rounded-xl bg-cover bg-center"
            style={{ backgroundImage: `url('${block.image}')` }}
          />
        )}
        <div className="flex min-w-0 flex-1 items-start gap-3">
          <MaterialIcon
            name="check_circle"
            className="mt-0.5 shrink-0 text-xl text-primary"
          />
          <div className="min-w-0 flex-1">
            <p className="font-semibold text-tertiary">{block.name}</p>
            <p className="mt-1 break-words text-sm text-neutral">{block.desc}</p>
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
      <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
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
