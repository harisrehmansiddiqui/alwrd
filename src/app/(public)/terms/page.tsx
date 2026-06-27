import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms governing the use of the Al Wrd Hajj & Umrah website and services.",
};

export default function TermsPage() {
  return (
    <div className="bg-surface-tint">
      <PageHeader title="Terms of Service" />
      <div className="mx-auto max-w-3xl space-y-5 px-4 py-12 text-sm leading-relaxed text-ink/80 sm:px-6 lg:px-8">
        <p>
          By using this website and submitting an inquiry, you agree to the
          following terms. Package prices, availability and inclusions are
          indicative and confirmed by our team at the time of booking.
        </p>
        <Section title="Inquiries and bookings">
          Submitting an inquiry does not constitute a confirmed booking. A
          booking is confirmed only after our team verifies availability and you
          complete the agreed payment offline.
        </Section>
        <Section title="Pricing">
          All prices are in Pakistani Rupees (PKR) and may change based on
          airline, hotel and seasonal availability. The final price is confirmed
          before booking.
        </Section>
        <Section title="Visa and travel documents">
          Pilgrims are responsible for providing accurate documents. We process
          Umrah visas but cannot guarantee approvals, which are subject to the
          relevant authorities.
        </Section>
        <Section title="Cancellations">
          Cancellation and refund terms are shared at the time of booking and
          depend on airline and hotel policies.
        </Section>
        <p className="text-slate-muted">
          For any questions about these terms, please contact our team.
        </p>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="font-display text-base font-semibold text-ink">{title}</h2>
      <p className="mt-1">{children}</p>
    </div>
  );
}
