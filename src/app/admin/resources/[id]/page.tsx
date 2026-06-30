import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import {
  AdminCheckbox,
  AdminField,
  AdminPageHeader,
  AdminSelect,
} from "@/components/admin/admin-ui";
import { saveResource } from "@/app/admin/content/actions";

export default async function AdminResourceEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const isNew = id === "new";
  const row = isNew ? null : await prisma.resource.findUnique({ where: { id } });
  if (!isNew && !row) notFound();

  return (
    <div>
      <AdminPageHeader title={isNew ? "New resource" : "Edit resource"} />
      <form action={saveResource} className="max-w-3xl space-y-4 rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
        {row && <input type="hidden" name="id" value={row.id} />}
        <AdminField label="Title" name="title" defaultValue={row?.title} required />
        <AdminField label="Slug" name="slug" defaultValue={row?.slug} placeholder="auto from title" />
        <AdminSelect
          label="Type"
          name="type"
          defaultValue={row?.type ?? "checklist"}
          options={[
            ["checklist", "Checklist"],
            ["blog", "Blog"],
            ["dua", "Du'a guide"],
          ]}
        />
        <AdminField label="Meta description" name="metaDesc" defaultValue={row?.metaDesc ?? ""} />
        <AdminField label="Body (HTML or markdown text)" name="body" rows={12} defaultValue={row?.body} required />
        <AdminCheckbox label="Published" name="published" defaultChecked={row?.published ?? true} />
        <div className="flex gap-3 pt-2">
          <button type="submit" className="rounded-xl bg-brand px-5 py-2.5 text-sm font-semibold text-white">Save</button>
          <Link href="/admin/resources" className="rounded-xl border border-black/10 px-5 py-2.5 text-sm">Cancel</Link>
        </div>
      </form>
    </div>
  );
}
