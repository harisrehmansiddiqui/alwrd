"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { adminNav } from "@/lib/admin/nav";

export function AdminSidebarNav() {
  const pathname = usePathname();
  let lastSection: string | undefined;

  return (
    <nav className="mt-8 flex flex-1 flex-col gap-1">
      {adminNav.map((item) => {
        const showSection = item.section && item.section !== lastSection;
        if (item.section) lastSection = item.section;
        const active =
          item.href === "/admin"
            ? pathname === "/admin"
            : pathname === item.href || pathname.startsWith(`${item.href}/`);

        return (
          <div key={item.href}>
            {showSection && (
              <p className="mb-1 mt-4 px-3 text-[10px] font-bold uppercase tracking-wider text-slate-muted first:mt-0">
                {item.section}
              </p>
            )}
            <Link
              href={item.href}
              className={`block rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                active
                  ? "bg-brand-pill text-brand-heading"
                  : "text-ink/80 hover:bg-brand-pill hover:text-brand-heading"
              }`}
            >
              {item.label}
            </Link>
          </div>
        );
      })}
    </nav>
  );
}
