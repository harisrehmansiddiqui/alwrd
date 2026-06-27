import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Login",
  description: "Sign in to view your Umrah inquiries and bookings with Al Wrd.",
};

export default function LoginPage() {
  return (
    <div className="bg-surface-tint">
      <PageHeader title="Login / Sign Up" />
      <div className="mx-auto max-w-md px-4 py-12 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-black/5 bg-white p-8 text-center shadow-sm">
          <h2 className="font-display text-lg font-semibold text-ink">
            Pilgrim accounts are coming soon
          </h2>
          <p className="mt-2 text-sm text-slate-muted">
            Soon you'll be able to track your inquiries and bookings here. For
            now, browse packages and send an inquiry — our team will follow up
            personally.
          </p>
          <div className="mt-6 flex flex-col gap-3">
            <Link
              href="/packages"
              className="rounded-xl bg-brand px-5 py-3 text-sm font-semibold text-white hover:bg-brand-deep"
            >
              Browse Packages
            </Link>
            <a
              href={whatsappLink("Assalamu alaikum, I'd like help with my Umrah booking.")}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border border-brand/30 px-5 py-3 text-sm font-semibold text-brand hover:bg-brand-pill"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
