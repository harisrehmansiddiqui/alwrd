import Link from "next/link";
import { prisma } from "@/lib/db";
import { AdminCard, AdminDeleteButton, AdminPageHeader } from "@/components/admin/admin-ui";
import { deleteBanner } from "../content/actions";

export const dynamic = "force-dynamic";

export default async function AdminBannersPage() {
  const rows = await prisma.banner.findMany({ orderBy: { sortOrder: "asc" } });

  return (
    <div>
      <AdminPageHeader title="Hero banners" action={{ label: "+ Add banner", href: "/admin/banners/new" }} />
      <AdminCard>
        {rows.length === 0 ? (
          <p className="px-5 py-10 text-center text-sm text-slate-muted">No banners yet.</p>
        ) : (
          <table className="w-full text-left text-sm">
            <thead className="border-b border-black/5 bg-surface-tint text-xs uppercase text-slate-muted">
              <tr>
                <th className="px-5 py-3">Headline</th>
                <th className="px-5 py-3">Image</th>
                <th className="px-5 py-3">Order</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              {rows.map((row) => (
                <tr key={row.id}>
                  <td className="px-5 py-3">
                    <Link href={`/admin/banners/${row.id}`} className="font-medium text-brand hover:underline">
                      {row.headline ?? "Untitled"}
                    </Link>
                  </td>
                  <td className="px-5 py-3 text-xs text-slate-muted">{row.imageDesktop}</td>
                  <td className="px-5 py-3">{row.sortOrder}</td>
                  <td className="px-5 py-3">{row.active ? "Active" : "Hidden"}</td>
                  <td className="px-5 py-3 text-right">
                    <AdminDeleteButton action={deleteBanner} id={row.id} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </AdminCard>
    </div>
  );
}
