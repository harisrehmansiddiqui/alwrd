import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { updateInquiryStatus, addInquiryNote } from "../actions";

export const dynamic = "force-dynamic";

const STATUSES = [
  "new",
  "high_quality_lead",
  "contacted",
  "confirmed",
  "closed",
  "lost",
];

const STATUS_LABELS: Record<string, string> = {
  new: "New",
  high_quality_lead: "High-Quality Lead",
  contacted: "Contacted",
  confirmed: "Confirmed",
  closed: "Closed",
  lost: "Lost",
};

type Note = { by: string; at: string; text: string };

export default async function InquiryDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const inq = await prisma.inquiry.findUnique({
    where: { id },
    include: { package: { select: { title: true, slug: true } } },
  });
  if (!inq) notFound();

  const notes: Note[] = Array.isArray(inq.notes) ? (inq.notes as unknown as Note[]) : [];

  return (
    <div className="max-w-3xl">
      <Link href="/admin/inquiries" className="text-sm text-brand hover:underline">
        ← Back to inquiries
      </Link>

      <div className="mt-4 flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-ink">
            {inq.travelerName}
          </h1>
          <p className="text-sm text-slate-muted">{inq.reference}</p>
        </div>
        <span className="rounded-full bg-brand-pill px-3 py-1.5 text-sm font-medium text-brand-heading">
          {STATUS_LABELS[inq.status] ?? inq.status}
        </span>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
          <h2 className="font-display font-semibold text-ink">Details</h2>
          <dl className="mt-4 space-y-2 text-sm">
            <Row label="Phone" value={inq.phone} />
            <Row label="Email" value={inq.email} />
            <Row label="Passport" value={inq.passportNumber ?? "—"} />
            <Row label="Travel date" value={inq.travelDate ?? "—"} />
            <Row label="Group size" value={String(inq.groupSize)} />
            <Row label="Package" value={inq.package?.title ?? "General inquiry"} />
            <Row label="Submitted" value={inq.createdAt.toLocaleString()} />
          </dl>
          {inq.specialRequests && (
            <div className="mt-4 rounded-xl bg-surface-tint p-3 text-sm text-ink/80">
              <div className="mb-1 text-xs font-medium text-slate-muted">
                Special requests
              </div>
              {inq.specialRequests}
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
            <h2 className="font-display font-semibold text-ink">Update status</h2>
            <form action={updateInquiryStatus} className="mt-4 flex gap-2">
              <input type="hidden" name="id" value={inq.id} />
              <select
                name="status"
                defaultValue={inq.status}
                className="flex-1 rounded-xl border border-black/10 px-3 py-2.5 text-sm outline-none focus:border-brand"
              >
                {STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {STATUS_LABELS[s]}
                  </option>
                ))}
              </select>
              <button
                type="submit"
                className="rounded-xl bg-brand px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-deep"
              >
                Save
              </button>
            </form>
          </div>

          <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm">
            <h2 className="font-display font-semibold text-ink">Notes</h2>
            <div className="mt-4 space-y-3">
              {notes.length === 0 && (
                <p className="text-sm text-slate-muted">No notes yet.</p>
              )}
              {notes.map((n, i) => (
                <div key={i} className="rounded-xl bg-surface-tint p-3 text-sm">
                  <div className="text-ink/80">{n.text}</div>
                  <div className="mt-1 text-xs text-slate-muted">
                    {n.by} · {new Date(n.at).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
            <form action={addInquiryNote} className="mt-4 space-y-2">
              <input type="hidden" name="id" value={inq.id} />
              <textarea
                name="note"
                rows={2}
                placeholder="Add a note…"
                className="w-full rounded-xl border border-black/10 px-3 py-2.5 text-sm outline-none focus:border-brand"
              />
              <button
                type="submit"
                className="rounded-xl border border-brand/30 px-4 py-2 text-sm font-semibold text-brand hover:bg-brand-pill"
              >
                Add note
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="text-slate-muted">{label}</dt>
      <dd className="text-right font-medium text-ink">{value}</dd>
    </div>
  );
}
