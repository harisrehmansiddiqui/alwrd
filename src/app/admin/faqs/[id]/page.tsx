import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { AdminField, AdminPageHeader } from "@/components/admin/admin-ui";
import { saveFaq } from "@/app/admin/content/actions";

export default async function AdminFaqEditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const isNew = id === "new";
  const row = isNew ? null : await prisma.faq.findUnique({ where: { id } });
  if (!isNew && !row) notFound();

  return (
    <div>
      <AdminPageHeader title={isNew ? "New FAQ" : "Edit FAQ"} />
      <form action={saveFaq} className="max-w-2xl space-y-4 rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
        {row && <input type="hidden" name="id" value={row.id} />}
        <AdminField label="Question" name="question" defaultValue={row?.question} required />
        <AdminField label="Answer" name="answer" rows={5} defaultValue={row?.answer} required />
        <AdminField label="Category" name="category" defaultValue={row?.category ?? ""} />
        <AdminField label="Sort order" name="sortOrder" type="number" defaultValue={row?.sortOrder ?? 0} />
        <div className="flex gap-3 pt-2">
          <button type="submit" className="rounded-xl bg-brand px-5 py-2.5 text-sm font-semibold text-white">Save</button>
          <Link href="/admin/faqs" className="rounded-xl border border-black/10 px-5 py-2.5 text-sm">Cancel</Link>
        </div>
      </form>
    </div>
  );
}
