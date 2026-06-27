import { Suspense } from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

function HeaderFallback() {
  return (
    <header className="sticky top-0 z-50 border-b border-outline-variant bg-surface/80 py-3 shadow-sm backdrop-blur-md">
      <div className="mx-auto h-10 max-w-[1280px] px-4" />
    </header>
  );
}

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Suspense fallback={<HeaderFallback />}>
        <SiteHeader />
      </Suspense>
      <main className="min-w-0 flex-1 overflow-x-hidden">{children}</main>
      <SiteFooter />
    </>
  );
}
