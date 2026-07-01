import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { AdminField, AdminPageHeader } from "@/components/admin/admin-ui";
import { ImageUploadField } from "@/components/admin/image-upload-field";
import { savePartner } from "@/app/admin/content/actions";

export default async function AdminPartnerEditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const isNew = id === "new";
  const row = isNew ? null : await prisma.partnerLogo.findUnique({ where: { id } });
  if (!isNew && !row) notFound();

  return (
    <div>
      <AdminPageHeader title={isNew ? "New partner" : "Edit partner"} />
      <form action={savePartner} className="max-w-xl space-y-4 rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
        {row && <input type="hidden" name="id" value={row.id} />}
        <AdminField label="Name" name="name" defaultValue={row?.name} required />
        <ImageUploadField name="logo" label="Logo image" defaultValue={row?.logo ?? ""} />
        <AdminField label="Website URL" name="url" defaultValue={row?.url ?? ""} />
        <AdminField label="Sort order" name="sortOrder" type="number" defaultValue={row?.sortOrder ?? 0} />
        <div className="flex gap-3 pt-2">
          <button type="submit" className="rounded-xl bg-brand px-5 py-2.5 text-sm font-semibold text-white">Save</button>
          <Link href="/admin/partners" className="rounded-xl border border-black/10 px-5 py-2.5 text-sm">Cancel</Link>
        </div>
      </form>
    </div>
  );
}
