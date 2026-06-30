import Link from "next/link";
import { prisma } from "@/lib/db";
import { AdminCard, AdminDeleteButton, AdminPageHeader } from "@/components/admin/admin-ui";
import { deleteResource } from "../content/actions";

export const dynamic = "force-dynamic";

export default async function AdminResourcesPage() {
  const rows = await prisma.resource.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <AdminPageHeader title="Resources" action={{ label: "+ Add resource", href: "/admin/resources/new" }} />
      <p className="mb-4 text-sm text-slate-muted">
        Manage checklist articles and blog posts. Du&apos;as guide remains in code at /resources/duas.
      </p>
      <AdminCard>
        <table className="w-full text-left text-sm">
          <thead className="border-b border-black/5 bg-surface-tint text-xs uppercase text-slate-muted">
            <tr>
              <th className="px-5 py-3">Title</th>
              <th className="px-5 py-3">Type</th>
              <th className="px-5 py-3">Published</th>
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-black/5">
            {rows.map((row) => (
              <tr key={row.id}>
                <td className="px-5 py-3">
                  <Link href={`/admin/resources/${row.id}`} className="font-medium text-brand hover:underline">
                    {row.title}
                  </Link>
                  <div className="text-xs text-slate-muted">/{row.slug}</div>
                </td>
                <td className="px-5 py-3 capitalize">{row.type}</td>
                <td className="px-5 py-3">{row.published ? "Yes" : "Draft"}</td>
                <td className="px-5 py-3 text-right">
                  <AdminDeleteButton action={deleteResource} id={row.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </AdminCard>
    </div>
  );
}
