import { Logo } from "@/components/logo";
import { site } from "@/lib/site";

export default function CampaignLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-full flex-col bg-surface-tint">
      <header className="border-b border-outline-variant bg-white py-5">
        <div className="mx-auto flex max-w-[1280px] justify-center px-4 sm:px-6">
          <Logo variant="green" size="header" />
        </div>
      </header>
      <main className="min-w-0 flex-1">{children}</main>
      <footer className="border-t border-outline-variant bg-white py-8">
        <div className="mx-auto max-w-[1280px] px-4 text-center text-xs text-on-surface-variant sm:px-6">
          <p className="font-semibold text-ink">{site.name}</p>
          <p className="mt-1">{site.phone} · {site.supportEmail}</p>
          <p className="mt-3 text-[11px] text-neutral">
            Licensed Umrah operator · Transparent PKR pricing · No hidden charges
          </p>
        </div>
      </footer>
    </div>
  );
}
