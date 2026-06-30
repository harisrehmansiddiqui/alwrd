import type { Metadata } from "next";
import Link from "next/link";
import { getSession } from "@/lib/auth";
import { AdminSidebarNav } from "@/components/admin/admin-sidebar-nav";
import { logout } from "./auth-actions";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (!session) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen bg-surface-tint">
      <aside className="hidden w-64 shrink-0 flex-col border-r border-black/5 bg-white px-4 py-6 sm:flex">
        <Link href="/admin" className="px-2 font-display text-lg font-extrabold text-brand-heading">
          Al Wrd Admin
        </Link>
        <AdminSidebarNav />
        <div className="border-t border-black/5 pt-4">
          <div className="px-3 text-xs text-slate-muted">{session.name}</div>
          <div className="px-3 text-[10px] capitalize text-slate-muted">{session.role.replace("_", " ")}</div>
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

      <div className="min-w-0 flex-1">
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
