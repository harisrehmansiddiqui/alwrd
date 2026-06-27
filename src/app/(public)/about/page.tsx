import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Al Wrd Hajj & Umrah helps Pakistani pilgrims perform Umrah with complete visa processing, premium hotels near the Haram, authentic meals and reliable transport.",
};

export default function AboutPage() {
  return (
    <div className="bg-surface-tint">
      <PageHeader
        title="About Al Wrd Hajj & Umrah"
        subtitle="Guided by faith, driven by excellence."
      />
      <div className="mx-auto max-w-3xl space-y-5 px-4 py-12 text-ink/80 sm:px-6 lg:px-8">
        <p>
          At Al Wrd Hajj &amp; Umrah, we understand that performing Umrah is a
          deeply spiritual and life-changing journey. Our mission is to remove
          every logistical burden so you can focus entirely on your worship.
        </p>
        <p>
          We offer complete Umrah packages from Pakistan, tailored to the diverse
          needs of our pilgrims. Every package includes fast and reliable visa
          processing, ensuring your documentation is handled smoothly. We partner
          with premium 3, 4 and 5-star hotels within walking distance of the
          Haram in Makkah and Masjid al-Nabawi in Madinah.
        </p>
        <p>
          To make you feel at home, our packages feature authentic Pakistani
          meals and comfortable, air-conditioned private transport for airport
          transfers and inter-city travel — backed by our 24/7 dedicated support
          team.
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <div className="font-display text-3xl font-extrabold text-brand-heading">
              20+
            </div>
            <div className="mt-1 text-sm text-slate-muted">Years of service</div>
          </div>
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <div className="font-display text-3xl font-extrabold text-brand-heading">
              100%
            </div>
            <div className="mt-1 text-sm text-slate-muted">
              Pilgrim satisfaction
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
