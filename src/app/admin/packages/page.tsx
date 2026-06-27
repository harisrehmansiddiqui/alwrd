import Link from "next/link";
import { prisma } from "@/lib/db";
import { formatPKR } from "@/lib/packages";
import { deletePackage } from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminPackagesPage() {
  const packages = await prisma.package.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      departures: { orderBy: { departureDate: "asc" }, take: 1 },
    },
  });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-bold text-ink">Packages</h1>
        <Link
          href="/admin/packages/new"
          className="rounded-xl bg-brand px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-deep"
        >
          + New package
        </Link>
      </div>

      <div className="mt-5 overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm">
        {packages.length === 0 ? (
          <p className="px-5 py-10 text-center text-sm text-slate-muted">
            No packages yet. Create your first one.
          </p>
        ) : (
          <table className="w-full text-left text-sm">
            <thead className="border-b border-black/5 bg-surface-tint text-xs uppercase text-slate-muted">
              <tr>
                <th className="px-5 py-3 font-medium">Title</th>
                <th className="px-5 py-3 font-medium">Tier</th>
                <th className="px-5 py-3 font-medium">Next departure</th>
                <th className="px-5 py-3 font-medium">Price</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              {packages.map((p) => {
                const dep = p.departures[0];
                return (
                  <tr key={p.id} className="hover:bg-surface-tint">
                    <td className="px-5 py-3">
                      <Link href={`/admin/packages/${p.id}`} className="font-medium text-brand hover:underline">
                        {p.title}
                      </Link>
                      <div className="text-xs text-slate-muted">{p.slug}</div>
                    </td>
                    <td className="px-5 py-3 capitalize text-ink/80">{p.tier}</td>
                    <td className="px-5 py-3 text-ink/80">
                      {dep ? `${dep.city} · ${dep.departureDate.toLocaleDateString()}` : "—"}
                    </td>
                    <td className="px-5 py-3 text-ink/80">
                      {dep ? formatPKR(dep.price) : "—"}
                    </td>
                    <td className="px-5 py-3">
                      <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${p.active ? "bg-brand-pill text-brand-heading" : "bg-black/5 text-slate-muted"}`}>
                        {p.active ? "Active" : "Hidden"}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-right">
                      <form action={deletePackage}>
                        <input type="hidden" name="id" value={p.id} />
                        <button
                          type="submit"
                          className="text-sm font-medium text-red-600 hover:underline"
                        >
                          Delete
                        </button>
                      </form>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
