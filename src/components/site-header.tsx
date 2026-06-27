"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Logo } from "@/components/logo";
import { SocialLinks } from "@/components/social-links";
import { mainNav } from "@/lib/site";

function matchesNavHref(
  pathname: string,
  searchParams: URLSearchParams,
  href: string,
): boolean {
  if (href === "/") return pathname === "/";

  const [path, queryString] = href.split("?");

  if (path === "/packages") {
    if (pathname !== "/packages") return false;
    if (!queryString) return searchParams.toString() === "";
    const expected = new URLSearchParams(queryString);
    for (const [key, value] of expected.entries()) {
      if (searchParams.get(key) !== value) return false;
    }
    return true;
  }

  if (pathname === path) return true;
  return pathname.startsWith(`${path}/`);
}

export function SiteHeader() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(false);

  function isActive(href: string) {
    return matchesNavHref(pathname, searchParams, href);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-outline-variant bg-surface/80 shadow-sm backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-[1280px] min-w-0 items-center justify-between gap-2 px-3 py-2.5 sm:px-4 sm:py-3 lg:gap-3 lg:px-6 lg:py-3">
        <Logo variant="black" size="header" />

        <nav className="hidden min-w-0 items-center gap-2 lg:flex lg:gap-3 xl:gap-6">
          {mainNav.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`shrink-0 text-xs transition-colors lg:text-sm xl:text-base ${
                  active
                    ? "border-b-2 border-primary pb-1 font-bold text-primary"
                    : "text-on-surface-variant hover:text-primary"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex shrink-0 items-center gap-2 sm:gap-2.5 lg:gap-3">
          <SocialLinks size="sm" className="hidden xl:flex" />

          <Link
            href="/login"
            className="shrink-0 rounded-lg bg-primary px-3.5 py-2 text-xs font-semibold text-on-primary shadow-sm transition-colors hover:bg-primary-dark sm:px-4 sm:text-sm xl:px-6"
          >
            Login
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="grid h-9 w-9 shrink-0 place-items-center rounded-lg text-on-surface lg:hidden"
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current">
              {open ? (
                <path d="M6.4 5L5 6.4 10.6 12 5 17.6 6.4 19 12 13.4 17.6 19 19 17.6 13.4 12 19 6.4 17.6 5 12 10.6z" />
              ) : (
                <path d="M3 6h18v2H3zm0 5h18v2H3zm0 5h18v2H3z" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-outline-variant bg-surface-container-lowest px-4 pb-4 pt-2 lg:hidden">
          {mainNav.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`block rounded-lg px-3 py-2.5 text-sm font-medium ${
                  active
                    ? "bg-primary/10 text-primary"
                    : "text-on-surface-variant hover:bg-surface-container-low hover:text-primary"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <div className="mt-3 border-t border-outline-variant pt-3">
            <SocialLinks />
          </div>
          <Link
            href="/login"
            onClick={() => setOpen(false)}
            className="mt-3 block rounded-lg bg-primary px-4 py-2.5 text-center text-sm font-semibold text-on-primary"
          >
            Login
          </Link>
        </nav>
      )}
    </header>
  );
}
