import { AdminPageHeader } from "@/components/admin/admin-ui";
import { MediaUploadCard } from "@/components/admin/media-upload-card";
import { MEDIA_CATEGORIES } from "@/lib/media-registry";
import { getResolvedMediaList } from "@/lib/media";
import { resetMediaImage, saveMediaImage } from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminMediaPage() {
  const items = await getResolvedMediaList();

  return (
    <div>
      <AdminPageHeader title="Site images" />
      <p className="mb-6 max-w-2xl text-sm text-slate-muted">
        Upload or replace any image used across the website. Changes appear on the live site
        immediately after upload. On Vercel, enable{" "}
        <strong>Blob storage</strong> and set <code className="text-xs">BLOB_READ_WRITE_TOKEN</code>{" "}
        in environment variables.
      </p>

      {MEDIA_CATEGORIES.map((category) => {
        const group = items.filter((i) => i.category === category);
        if (group.length === 0) return null;
        return (
          <section key={category} className="mb-10">
            <h2 className="mb-4 font-display text-lg font-semibold text-ink">{category}</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {group.map((item) => (
                <MediaUploadCard
                  key={item.key}
                  mediaKey={item.key}
                  label={item.label}
                  category={item.category}
                  currentUrl={item.url}
                  defaultUrl={item.defaultUrl}
                  isCustom={item.isCustom}
                  onSave={saveMediaImage}
                  onReset={resetMediaImage}
                />
              ))}
            </div>
          </section>
        );
      })}

      <section className="mb-10 rounded-2xl border border-dashed border-black/10 bg-white p-6">
        <h2 className="font-display text-lg font-semibold text-ink">Also editable elsewhere</h2>
        <ul className="mt-3 space-y-1 text-sm text-slate-muted">
          <li>• <strong>Packages</strong> — each package has its own cover image</li>
          <li>• <strong>Hero banners</strong> — homepage carousel slides</li>
          <li>• <strong>Testimonials</strong> — pilgrim photo per review</li>
          <li>• <strong>Partner logos</strong> — airline / partner images</li>
        </ul>
      </section>
    </div>
  );
}
