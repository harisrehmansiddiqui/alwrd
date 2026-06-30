import Link from "next/link";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { AdminCard, AdminDeleteButton, AdminPageHeader } from "@/components/admin/admin-ui";
import { deleteAdminUser } from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminUsersPage() {
  const session = await getSession();
  const rows = await prisma.adminUser.findMany({ orderBy: { createdAt: "asc" } });

  if (session?.role !== "super_admin") {
    return (
      <div>
        <AdminPageHeader title="Admin users" />
        <p className="text-sm text-slate-muted">Only super admins can manage users.</p>
      </div>
    );
  }

  return (
    <div>
      <AdminPageHeader title="Admin users" action={{ label: "+ Add user", href: "/admin/users/new" }} />
      <AdminCard>
        <table className="w-full text-left text-sm">
          <thead className="border-b border-black/5 bg-surface-tint text-xs uppercase text-slate-muted">
            <tr>
              <th className="px-5 py-3">Name</th>
              <th className="px-5 py-3">Email</th>
              <th className="px-5 py-3">Role</th>
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-black/5">
            {rows.map((row) => (
              <tr key={row.id}>
                <td className="px-5 py-3">
                  <Link href={`/admin/users/${row.id}`} className="font-medium text-brand hover:underline">
                    {row.name}
                  </Link>
                </td>
                <td className="px-5 py-3">{row.email}</td>
                <td className="px-5 py-3 capitalize">{row.role.replace("_", " ")}</td>
                <td className="px-5 py-3 text-right">
                  {row.id !== session.sub && (
                    <AdminDeleteButton action={deleteAdminUser} id={row.id} />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </AdminCard>
    </div>
  );
}
