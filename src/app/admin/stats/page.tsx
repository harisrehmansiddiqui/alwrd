import Link from "next/link";
import { prisma } from "@/lib/db";
import { AdminCard, AdminDeleteButton, AdminPageHeader } from "@/components/admin/admin-ui";
import { deleteTrustStat } from "../content/actions";

export const dynamic = "force-dynamic";

export default async function AdminStatsPage() {
  const rows = await prisma.trustStat.findMany({ orderBy: { sortOrder: "asc" } });

  return (
    <div>
      <AdminPageHeader title="Trust stats" action={{ label: "+ Add stat", href: "/admin/stats/new" }} />
      <AdminCard>
        <table className="w-full text-left text-sm">
          <thead className="border-b border-black/5 bg-surface-tint text-xs uppercase text-slate-muted">
            <tr>
              <th className="px-5 py-3">Value</th>
              <th className="px-5 py-3">Label</th>
              <th className="px-5 py-3">Order</th>
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-black/5">
            {rows.map((row) => (
              <tr key={row.id}>
                <td className="px-5 py-3">
                  <Link href={`/admin/stats/${row.id}`} className="font-medium text-brand hover:underline">
                    {row.value}
                  </Link>
                </td>
                <td className="px-5 py-3">{row.label}</td>
                <td className="px-5 py-3">{row.sortOrder}</td>
                <td className="px-5 py-3 text-right">
                  <AdminDeleteButton action={deleteTrustStat} id={row.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </AdminCard>
    </div>
  );
}
