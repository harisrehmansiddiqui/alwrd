import Link from "next/link";
import { prisma } from "@/lib/db";
import { AdminCard, AdminDeleteButton, AdminPageHeader } from "@/components/admin/admin-ui";
import { deletePartner } from "../content/actions";

export const dynamic = "force-dynamic";

export default async function AdminPartnersPage() {
  const rows = await prisma.partnerLogo.findMany({ orderBy: { sortOrder: "asc" } });

  return (
    <div>
      <AdminPageHeader title="Partner logos" action={{ label: "+ Add partner", href: "/admin/partners/new" }} />
      <AdminCard>
        <table className="w-full text-left text-sm">
          <thead className="border-b border-black/5 bg-surface-tint text-xs uppercase text-slate-muted">
            <tr>
              <th className="px-5 py-3">Name</th>
              <th className="px-5 py-3">Logo path</th>
              <th className="px-5 py-3">Order</th>
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-black/5">
            {rows.map((row) => (
              <tr key={row.id}>
                <td className="px-5 py-3">
                  <Link href={`/admin/partners/${row.id}`} className="font-medium text-brand hover:underline">
                    {row.name}
                  </Link>
                </td>
                <td className="px-5 py-3 text-xs text-slate-muted">{row.logo ?? "—"}</td>
                <td className="px-5 py-3">{row.sortOrder}</td>
                <td className="px-5 py-3 text-right">
                  <AdminDeleteButton action={deletePartner} id={row.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </AdminCard>
    </div>
  );
}
