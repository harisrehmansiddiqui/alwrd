import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { AdminField, AdminPageHeader } from "@/components/admin/admin-ui";
import { saveLegalPage } from "@/app/admin/content/actions";

export default async function AdminLegalEditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const isNew = id === "new";
  const row = isNew ? null : await prisma.legalPage.findUnique({ where: { id } });
  if (!isNew && !row) notFound();

  return (
    <div>
      <AdminPageHeader title={isNew ? "New legal page" : "Edit legal page"} />
      <form action={saveLegalPage} className="max-w-3xl space-y-4 rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
        {row && <input type="hidden" name="id" value={row.id} />}
        <AdminField label="Title" name="title" defaultValue={row?.title} required />
        <AdminField label="Slug" name="slug" defaultValue={row?.slug ?? ""} placeholder="terms or privacy" />
        <AdminField label="Body" name="body" rows={16} defaultValue={row?.body} required />
        <div className="flex gap-3 pt-2">
          <button type="submit" className="rounded-xl bg-brand px-5 py-2.5 text-sm font-semibold text-white">Save</button>
          <Link href="/admin/legal" className="rounded-xl border border-black/10 px-5 py-2.5 text-sm">Cancel</Link>
        </div>
      </form>
    </div>
  );
}
