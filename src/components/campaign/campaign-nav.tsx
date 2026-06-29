"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Logo } from "@/components/logo";

export function CampaignNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 50);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 border-b border-outline-variant/50 bg-surface/90 backdrop-blur-md transition-all duration-300 ${
        scrolled ? "h-16 shadow-sm" : "h-20"
      }`}
    >
      <div className="mx-auto flex h-full max-w-[1200px] items-center justify-between px-4 sm:px-6">
        <Logo variant="green" size="header" />
        <span className="hidden font-semibold uppercase tracking-widest text-on-surface-variant md:block md:text-xs lg:text-sm">
          Smart Umrah System
        </span>
        <Link
          href="#inquiry"
          className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-on-primary transition-opacity hover:opacity-90"
        >
          Book Now
        </Link>
      </div>
    </nav>
  );
}
