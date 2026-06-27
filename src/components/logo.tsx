import Link from "next/link";
import { site } from "@/lib/site";

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-2">
      <span
        className={`grid h-10 w-10 place-items-center rounded-full ${
          light ? "bg-white/15" : "bg-primary/10"
        }`}
        aria-hidden
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5 fill-primary">
          <path d="M12 2l2.2 4.8L19 8l-3.5 3.4.9 5.1L12 14.9 7.6 16.5l.9-5.1L5 8l4.8-1.2L12 2z" />
        </svg>
      </span>
      <span
        className={`text-xl font-bold tracking-tight ${
          light ? "text-on-primary" : "text-primary"
        }`}
      >
        {site.name}
      </span>
    </Link>
  );
}
