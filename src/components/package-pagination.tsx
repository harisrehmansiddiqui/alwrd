"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

const PAGE_SIZE = 9;

export function PackagePagination({
  page,
  total,
}: {
  page: number;
  total: number;
}) {
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  if (totalPages <= 1) return null;

  const params = useSearchParams();

  function hrefFor(nextPage: number) {
    const q = new URLSearchParams(params.toString());
    if (nextPage <= 1) q.delete("page");
    else q.set("page", String(nextPage));
    const qs = q.toString();
    return qs ? `/packages?${qs}` : "/packages";
  }

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav
      aria-label="Package results pages"
      className="mt-10 flex flex-wrap items-center justify-center gap-2"
    >
      <Link
        href={hrefFor(page - 1)}
        aria-disabled={page <= 1}
        className={`rounded-lg border px-3 py-2 text-sm font-medium ${
          page <= 1
            ? "pointer-events-none border-outline-variant text-neutral-40"
            : "border-outline-variant text-primary hover:bg-primary/5"
        }`}
      >
        Previous
      </Link>

      {pages.map((p) => (
        <Link
          key={p}
          href={hrefFor(p)}
          aria-current={p === page ? "page" : undefined}
          className={`grid h-9 min-w-9 place-items-center rounded-lg px-2 text-sm font-semibold ${
            p === page
              ? "bg-primary text-on-primary"
              : "border border-outline-variant text-on-surface hover:border-primary hover:text-primary"
          }`}
        >
          {p}
        </Link>
      ))}

      <Link
        href={hrefFor(page + 1)}
        aria-disabled={page >= totalPages}
        className={`rounded-lg border px-3 py-2 text-sm font-medium ${
          page >= totalPages
            ? "pointer-events-none border-outline-variant text-neutral-40"
            : "border-outline-variant text-primary hover:bg-primary/5"
        }`}
      >
        Next
      </Link>
    </nav>
  );
}

export const PACKAGES_PAGE_SIZE = PAGE_SIZE;
