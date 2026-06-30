import Link from "next/link";
import { prisma } from "@/lib/db";
import { AdminCard, AdminDeleteButton, AdminPageHeader } from "@/components/admin/admin-ui";
import { deleteFaq } from "../content/actions";

export const dynamic = "force-dynamic";

export default async function AdminFaqsPage() {
  const rows = await prisma.faq.findMany({ orderBy: { sortOrder: "asc" } });

  return (
    <div>
      <AdminPageHeader title="FAQs" action={{ label: "+ Add FAQ", href: "/admin/faqs/new" }} />
      <AdminCard>
        <table className="w-full text-left text-sm">
          <thead className="border-b border-black/5 bg-surface-tint text-xs uppercase text-slate-muted">
            <tr>
              <th className="px-5 py-3">Question</th>
              <th className="px-5 py-3">Category</th>
              <th className="px-5 py-3">Order</th>
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-black/5">
            {rows.map((row) => (
              <tr key={row.id}>
                <td className="px-5 py-3">
                  <Link href={`/admin/faqs/${row.id}`} className="font-medium text-brand hover:underline">
                    {row.question}
                  </Link>
                </td>
                <td className="px-5 py-3">{row.category ?? "—"}</td>
                <td className="px-5 py-3">{row.sortOrder}</td>
                <td className="px-5 py-3 text-right">
                  <AdminDeleteButton action={deleteFaq} id={row.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </AdminCard>
    </div>
  );
}
