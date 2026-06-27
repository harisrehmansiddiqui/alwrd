import Link from "next/link";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

const STATUS_LABELS: Record<string, string> = {
  new: "New",
  high_quality_lead: "High-Quality Lead",
  contacted: "Contacted",
  confirmed: "Confirmed",
  closed: "Closed",
  lost: "Lost",
};

const FILTERS = ["all", ...Object.keys(STATUS_LABELS)];

export default async function InquiriesPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status } = await searchParams;
  const where = status && status !== "all" ? { status: status as never } : {};

  const inquiries = await prisma.inquiry.findMany({
    where,
    orderBy: { createdAt: "desc" },
    include: { package: { select: { title: true } } },
  });

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-ink">Inquiries</h1>

      <div className="mt-5 flex flex-wrap gap-2">
        {FILTERS.map((f) => {
          const active = (status ?? "all") === f;
          return (
            <Link
              key={f}
              href={f === "all" ? "/admin/inquiries" : `/admin/inquiries?status=${f}`}
              className={`rounded-full px-3 py-1.5 text-sm font-medium ${
                active
                  ? "bg-brand text-white"
                  : "bg-white text-ink/70 hover:bg-brand-pill"
              }`}
            >
              {f === "all" ? "All" : STATUS_LABELS[f]}
            </Link>
          );
        })}
      </div>

      <div className="mt-5 overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm">
        {inquiries.length === 0 ? (
          <p className="px-5 py-10 text-center text-sm text-slate-muted">
            No inquiries found.
          </p>
        ) : (
          <table className="w-full text-left text-sm">
            <thead className="border-b border-black/5 bg-surface-tint text-xs uppercase text-slate-muted">
              <tr>
                <th className="px-5 py-3 font-medium">Pilgrim</th>
                <th className="px-5 py-3 font-medium">Package</th>
                <th className="px-5 py-3 font-medium">Contact</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              {inquiries.map((inq) => (
                <tr key={inq.id} className="hover:bg-surface-tint">
                  <td className="px-5 py-3">
                    <Link href={`/admin/inquiries/${inq.id}`} className="font-medium text-brand hover:underline">
                      {inq.travelerName}
                    </Link>
                    <div className="text-xs text-slate-muted">{inq.reference}</div>
                  </td>
                  <td className="px-5 py-3 text-ink/80">
                    {inq.package?.title ?? "—"}
                  </td>
                  <td className="px-5 py-3 text-ink/80">{inq.phone}</td>
                  <td className="px-5 py-3">
                    <span className="rounded-full bg-brand-pill px-2.5 py-1 text-xs font-medium text-brand-heading">
                      {STATUS_LABELS[inq.status] ?? inq.status}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-xs text-slate-muted">
                    {inq.createdAt.toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
