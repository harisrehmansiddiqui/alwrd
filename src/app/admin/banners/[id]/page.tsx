import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { AdminCheckbox, AdminField, AdminPageHeader } from "@/components/admin/admin-ui";
import { saveBanner } from "@/app/admin/content/actions";

export default async function AdminBannerEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const isNew = id === "new";
  const row = isNew ? null : await prisma.banner.findUnique({ where: { id } });
  if (!isNew && !row) notFound();

  return (
    <div>
      <AdminPageHeader title={isNew ? "New banner" : "Edit banner"} />
      <form action={saveBanner} className="max-w-2xl space-y-4 rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
        {row && <input type="hidden" name="id" value={row.id} />}
        <AdminField label="Headline / alt text" name="headline" defaultValue={row?.headline ?? ""} />
        <AdminField label="Desktop image path" name="imageDesktop" defaultValue={row?.imageDesktop ?? "/hero.jpg"} required />
        <AdminField label="Mobile image path (optional)" name="imageMobile" defaultValue={row?.imageMobile ?? ""} />
        <AdminField label="CTA label" name="ctaLabel" defaultValue={row?.ctaLabel ?? ""} />
        <AdminField label="CTA link" name="ctaHref" defaultValue={row?.ctaHref ?? ""} />
        <AdminField label="Sort order" name="sortOrder" type="number" defaultValue={row?.sortOrder ?? 0} />
        <AdminCheckbox label="Active" name="active" defaultChecked={row?.active ?? true} />
        <div className="flex gap-3 pt-2">
          <button type="submit" className="rounded-xl bg-brand px-5 py-2.5 text-sm font-semibold text-white">
            Save banner
          </button>
          <Link href="/admin/banners" className="rounded-xl border border-black/10 px-5 py-2.5 text-sm font-medium">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
