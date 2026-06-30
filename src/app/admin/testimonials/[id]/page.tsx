import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { AdminCheckbox, AdminField, AdminPageHeader } from "@/components/admin/admin-ui";
import { saveTestimonial } from "@/app/admin/content/actions";

export default async function AdminTestimonialEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const isNew = id === "new";
  const row = isNew ? null : await prisma.testimonial.findUnique({ where: { id } });
  if (!isNew && !row) notFound();

  return (
    <div>
      <AdminPageHeader title={isNew ? "New testimonial" : "Edit testimonial"} />
      <form action={saveTestimonial} className="max-w-2xl space-y-4 rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
        {row && <input type="hidden" name="id" value={row.id} />}
        <AdminField label="Name" name="name" defaultValue={row?.name} required />
        <AdminField label="City" name="city" defaultValue={row?.city ?? ""} />
        <AdminField label="Rating (1–5)" name="rating" type="number" min={1} defaultValue={row?.rating ?? 5} />
        <AdminField label="Quote" name="quote" rows={4} defaultValue={row?.quote} required />
        <AdminField label="Sort order" name="sortOrder" type="number" defaultValue={row?.sortOrder ?? 0} />
        <AdminCheckbox label="Show video badge" name="hasVideo" defaultChecked={Boolean(row?.videoUrl)} />
        <AdminCheckbox label="Active" name="active" defaultChecked={row?.active ?? true} />
        <div className="flex gap-3 pt-2">
          <button type="submit" className="rounded-xl bg-brand px-5 py-2.5 text-sm font-semibold text-white">Save</button>
          <Link href="/admin/testimonials" className="rounded-xl border border-black/10 px-5 py-2.5 text-sm">Cancel</Link>
        </div>
      </form>
    </div>
  );
}
