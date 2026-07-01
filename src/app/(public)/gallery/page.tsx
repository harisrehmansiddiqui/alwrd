import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { getGalleryImages } from "@/lib/cms";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Moments from the journeys of pilgrims we have proudly served with Al Wrd Hajj & Umrah.",
};

export const dynamic = "force-dynamic";

export default async function GalleryPage() {
  const galleryImages = await getGalleryImages();

  return (
    <div className="bg-surface-tint">
      <PageHeader
        title="Gallery"
        subtitle="Moments from the journeys of pilgrims we have proudly served."
      />
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {galleryImages.map((src, i) => (
            <div
              key={i}
              className="aspect-square rounded-2xl bg-white bg-cover bg-center shadow-sm"
              style={{ backgroundImage: `url('${src}')` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
