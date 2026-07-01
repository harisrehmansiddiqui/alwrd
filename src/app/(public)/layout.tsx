import { Suspense } from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { getMediaMap, resolveUrl } from "@/lib/media";

function HeaderFallback() {
  return (
    <header className="sticky top-0 z-50 border-b border-outline-variant bg-surface/80 py-3 shadow-sm backdrop-blur-md">
      <div className="mx-auto h-10 max-w-[1280px] px-4" />
    </header>
  );
}

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const media = await getMediaMap();
  const logoSrc = resolveUrl(media, "brand.logo-black");

  return (
    <>
      <Suspense fallback={<HeaderFallback />}>
        <SiteHeader logoSrc={logoSrc} />
      </Suspense>
      <main className="min-w-0 flex-1 overflow-x-hidden">{children}</main>
      <SiteFooter logoSrc={logoSrc} />
    </>
  );
}
