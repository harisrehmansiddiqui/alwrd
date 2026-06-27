import Link from "next/link";
import { site } from "@/lib/site";

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-2.5">
      <span
        className="grid h-9 w-9 place-items-center rounded-full bg-brand-pill"
        aria-hidden
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5 fill-brand">
          <path d="M12 2l2.2 4.8L19 8l-3.5 3.4.9 5.1L12 14.9 7.6 16.5l.9-5.1L5 8l4.8-1.2L12 2z" />
        </svg>
      </span>
      <span className="leading-tight">
        <span
          className={`block font-display text-lg font-extrabold tracking-tight ${
            light ? "text-white" : "text-brand-heading"
          }`}
        >
          {site.name.toUpperCase()}
        </span>
        <span
          className={`block text-[10px] font-semibold uppercase tracking-[0.18em] ${
            light ? "text-white/70" : "text-slate-muted"
          }`}
        >
          {site.tagline}
        </span>
      </span>
    </Link>
  );
}
