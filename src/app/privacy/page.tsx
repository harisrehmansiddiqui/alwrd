import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Al Wrd Hajj & Umrah collects, uses and protects your personal information.",
};

export default function PrivacyPage() {
  return (
    <div className="bg-surface-tint">
      <PageHeader title="Privacy Policy" />
      <div className="mx-auto max-w-3xl space-y-5 px-4 py-12 text-sm leading-relaxed text-ink/80 sm:px-6 lg:px-8">
        <p>
          We respect your privacy. This policy explains what information we
          collect when you use our website and submit an inquiry, and how we use
          it.
        </p>
        <Section title="What we collect">
          When you submit an inquiry we collect your name, contact details,
          travel preferences and any information you choose to share, such as
          passport details and special requests.
        </Section>
        <Section title="How we use it">
          We use your information solely to respond to your inquiry, confirm
          availability and arrange your Umrah. We do not sell your data.
        </Section>
        <Section title="Sharing">
          We share details only with trusted partners — airlines, hotels and
          visa processors — as needed to fulfil your booking.
        </Section>
        <Section title="Your rights">
          You may request access to, correction of, or deletion of your personal
          information by contacting our team.
        </Section>
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
