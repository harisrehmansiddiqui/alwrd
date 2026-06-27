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

export default async function AdminDashboard() {
  const [total, leads, confirmed, packages, recent] = await Promise.all([
    prisma.inquiry.count(),
    prisma.inquiry.count({ where: { status: { in: ["new", "high_quality_lead"] } } }),
    prisma.inquiry.count({ where: { status: "confirmed" } }),
    prisma.package.count(),
    prisma.inquiry.findMany({
      orderBy: { createdAt: "desc" },
      take: 6,
      include: { package: { select: { title: true } } },
    }),
  ]);

  const stats = [
    { label: "Total inquiries", value: total },
    { label: "Open leads", value: leads },
    { label: "Confirmed", value: confirmed },
    { label: "Packages", value: packages },
  ];

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-ink">Dashboard</h1>

      <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-2xl border border-black/5 bg-white p-5 shadow-sm">
            <div className="font-display text-3xl font-extrabold text-brand-heading">
              {s.value}
            </div>
            <div className="mt-1 text-sm text-slate-muted">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-2xl border border-black/5 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-black/5 px-5 py-4">
          <h2 className="font-display font-semibold text-ink">Recent inquiries</h2>
          <Link href="/admin/inquiries" className="text-sm font-medium text-brand hover:underline">
            View all
          </Link>
        </div>
        {recent.length === 0 ? (
          <p className="px-5 py-8 text-center text-sm text-slate-muted">
            No inquiries yet.
          </p>
        ) : (
          <div className="divide-y divide-black/5">
            {recent.map((inq) => (
              <Link
                key={inq.id}
                href={`/admin/inquiries/${inq.id}`}
                className="flex items-center justify-between px-5 py-3 hover:bg-surface-tint"
              >
                <div>
                  <div className="text-sm font-medium text-ink">{inq.travelerName}</div>
                  <div className="text-xs text-slate-muted">
                    {inq.reference} · {inq.package?.title ?? "General inquiry"}
                  </div>
                </div>
                <span className="rounded-full bg-brand-pill px-2.5 py-1 text-xs font-medium text-brand-heading">
                  {STATUS_LABELS[inq.status] ?? inq.status}
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
