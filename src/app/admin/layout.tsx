import type { Metadata } from "next";
import Link from "next/link";
import { getSession } from "@/lib/auth";
import { logout } from "./auth-actions";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

const nav = [
  { label: "Dashboard", href: "/admin" },
  { label: "Packages", href: "/admin/packages" },
  { label: "Inquiries", href: "/admin/inquiries" },
];

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  // The login page renders without the admin shell.
  if (!session) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen bg-surface-tint">
      <aside className="hidden w-60 shrink-0 flex-col border-r border-black/5 bg-white px-4 py-6 sm:flex">
        <Link href="/admin" className="px-2 font-display text-lg font-extrabold text-brand-heading">
          Al Wrd Admin
        </Link>
        <nav className="mt-8 flex flex-1 flex-col gap-1">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-ink/80 hover:bg-brand-pill hover:text-brand-heading"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="border-t border-black/5 pt-4">
          <div className="px-3 text-xs text-slate-muted">{session.name}</div>
          <form action={logout}>
            <button
              type="submit"
              className="mt-2 w-full rounded-lg px-3 py-2 text-left text-sm font-medium text-red-600 hover:bg-red-50"
            >
              Sign out
            </button>
          </form>
        </div>
      </aside>

      <div className="flex-1">
        <header className="flex items-center justify-between border-b border-black/5 bg-white px-6 py-4 sm:hidden">
          <span className="font-display font-bold text-brand-heading">Al Wrd Admin</span>
          <form action={logout}>
            <button type="submit" className="text-sm font-medium text-red-600">
              Sign out
            </button>
          </form>
        </header>
        <main className="p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
