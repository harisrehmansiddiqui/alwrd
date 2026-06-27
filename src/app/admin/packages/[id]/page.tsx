import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { PackageForm } from "../package-form";
import { updatePackage } from "../actions";

export const dynamic = "force-dynamic";

export default async function EditPackagePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const pkg = await prisma.package.findUnique({
    where: { id },
    include: { departures: { orderBy: { departureDate: "asc" }, take: 1 } },
  });
  if (!pkg) notFound();

  const departure = pkg.departures[0] ?? null;

  return (
    <div className="max-w-4xl">
      <Link href="/admin/packages" className="text-sm text-brand hover:underline">
        ← Back to packages
      </Link>
      <h1 className="mt-4 font-display text-2xl font-bold text-ink">
        Edit package
      </h1>
      <div className="mt-6">
        <PackageForm
          action={updatePackage}
          pkg={{
            id: pkg.id,
            title: pkg.title,
            slug: pkg.slug,
            audience: pkg.audience,
            tier: pkg.tier,
            tagline: pkg.tagline,
            description: pkg.description,
            image: pkg.image,
            amenities: (pkg.amenities as string[]) ?? [],
            featured: pkg.featured,
          }}
          departure={departure}
          submitLabel="Save changes"
        />
      </div>
    </div>
  );
}
