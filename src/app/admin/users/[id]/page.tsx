import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { AdminField, AdminPageHeader, AdminSelect } from "@/components/admin/admin-ui";
import { saveAdminUser } from "../actions";

export default async function AdminUserEditPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (session?.role !== "super_admin") notFound();

  const { id } = await params;
  const isNew = id === "new";
  const row = isNew ? null : await prisma.adminUser.findUnique({ where: { id } });
  if (!isNew && !row) notFound();

  return (
    <div>
      <AdminPageHeader title={isNew ? "New admin user" : "Edit admin user"} />
      <form action={saveAdminUser} className="max-w-xl space-y-4 rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
        {row && <input type="hidden" name="id" value={row.id} />}
        <AdminField label="Name" name="name" defaultValue={row?.name} required />
        <AdminField label="Email" name="email" type="email" defaultValue={row?.email} required />
        <AdminSelect
          label="Role"
          name="role"
          defaultValue={row?.role ?? "agent"}
          options={[
            ["agent", "Agent"],
            ["super_admin", "Super admin"],
          ]}
        />
        <AdminField
          label={isNew ? "Password" : "New password (leave blank to keep)"}
          name="password"
          type="password"
          required={isNew}
        />
        <div className="flex gap-3 pt-2">
          <button type="submit" className="rounded-xl bg-brand px-5 py-2.5 text-sm font-semibold text-white">Save</button>
          <Link href="/admin/users" className="rounded-xl border border-black/10 px-5 py-2.5 text-sm">Cancel</Link>
        </div>
      </form>
    </div>
  );
}
