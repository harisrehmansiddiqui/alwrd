import Link from "next/link";
import { prisma } from "@/lib/db";
import { AdminCard, AdminDeleteButton, AdminPageHeader } from "@/components/admin/admin-ui";
import { deleteTestimonial } from "../content/actions";

export const dynamic = "force-dynamic";

export default async function AdminTestimonialsPage() {
  const rows = await prisma.testimonial.findMany({ orderBy: { sortOrder: "asc" } });

  return (
    <div>
      <AdminPageHeader title="Testimonials" action={{ label: "+ Add testimonial", href: "/admin/testimonials/new" }} />
      <AdminCard>
        <table className="w-full text-left text-sm">
          <thead className="border-b border-black/5 bg-surface-tint text-xs uppercase text-slate-muted">
            <tr>
              <th className="px-5 py-3">Name</th>
              <th className="px-5 py-3">City</th>
              <th className="px-5 py-3">Rating</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-black/5">
            {rows.map((row) => (
              <tr key={row.id}>
                <td className="px-5 py-3">
                  <Link href={`/admin/testimonials/${row.id}`} className="font-medium text-brand hover:underline">
                    {row.name}
                  </Link>
                </td>
                <td className="px-5 py-3">{row.city ?? "—"}</td>
                <td className="px-5 py-3">{row.rating}/5</td>
                <td className="px-5 py-3">{row.active ? "Active" : "Hidden"}</td>
                <td className="px-5 py-3 text-right">
                  <AdminDeleteButton action={deleteTestimonial} id={row.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </AdminCard>
    </div>
  );
}
