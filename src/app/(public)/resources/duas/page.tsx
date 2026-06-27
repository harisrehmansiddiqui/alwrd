import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";

export const metadata: Metadata = {
  title: "Essential Du'as for Umrah",
  description:
    "A simple guide to the essential du'as recited during Umrah — talbiyah, du'as for tawaf, sa'i and more.",
};

const duas = [
  { title: "Talbiyah", text: "Labbayka Allahumma labbayk, labbayka la sharika laka labbayk. Innal-hamda wan-ni'mata laka wal-mulk, la sharika lak." },
  { title: "Entering the Masjid", text: "Allahumma aftah li abwaba rahmatik." },
  { title: "During Tawaf", text: "Rabbana atina fid-dunya hasanatan wa fil-akhirati hasanatan wa qina 'adhaban-nar." },
  { title: "Between Safa and Marwah", text: "Inna as-Safa wal-Marwata min sha'a'irillah." },
];

export default function DuasPage() {
  return (
    <div className="bg-surface-tint">
      <PageHeader
        title="Essential Du'as for Umrah"
        subtitle="Keep these close throughout your sacred journey."
      />
      <div className="mx-auto max-w-3xl space-y-4 px-4 py-12 sm:px-6 lg:px-8">
        {duas.map((d) => (
          <div
            key={d.title}
            className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm"
          >
            <h2 className="font-display text-lg font-semibold text-brand-heading">
              {d.title}
            </h2>
            <p className="mt-2 text-ink/80">{d.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
