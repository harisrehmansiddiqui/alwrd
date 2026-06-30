import Link from "next/link";
import { prisma } from "@/lib/db";
import { AdminCard, AdminDeleteButton, AdminPageHeader } from "@/components/admin/admin-ui";
import { deleteLegalPage } from "../content/actions";

export const dynamic = "force-dynamic";

export default async function AdminLegalPage() {
  const rows = await prisma.legalPage.findMany({ orderBy: { slug: "asc" } });

  return (
    <div>
      <AdminPageHeader title="Legal pages" action={{ label: "+ Add page", href: "/admin/legal/new" }} />
      <AdminCard>
        <table className="w-full text-left text-sm">
          <thead className="border-b border-black/5 bg-surface-tint text-xs uppercase text-slate-muted">
            <tr>
              <th className="px-5 py-3">Title</th>
              <th className="px-5 py-3">Slug</th>
              <th className="px-5 py-3">Updated</th>
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-black/5">
            {rows.map((row) => (
              <tr key={row.id}>
                <td className="px-5 py-3">
                  <Link href={`/admin/legal/${row.id}`} className="font-medium text-brand hover:underline">
                    {row.title}
                  </Link>
                </td>
                <td className="px-5 py-3">/{row.slug}</td>
                <td className="px-5 py-3">{row.updatedAt.toLocaleDateString()}</td>
                <td className="px-5 py-3 text-right">
                  <AdminDeleteButton action={deleteLegalPage} id={row.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </AdminCard>
    </div>
  );
}
