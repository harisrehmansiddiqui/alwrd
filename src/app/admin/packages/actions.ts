"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function parsePackage(formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  const slugInput = String(formData.get("slug") ?? "").trim();
  const featured = String(formData.get("featured") ?? "");
  const amenities = String(formData.get("amenities") ?? "")
    .split(",")
    .map((a) => a.trim())
    .filter(Boolean);

  return {
    title,
    slug: slugInput ? slugify(slugInput) : slugify(title),
    audience: String(formData.get("audience") ?? "group"),
    tier: String(formData.get("tier") ?? "standard"),
    tagline: String(formData.get("tagline") ?? "").trim(),
    description: String(formData.get("description") ?? "").trim() || null,
    image: String(formData.get("image") ?? "").trim() || "/packages/placeholder.jpg",
    amenities,
    featured: featured === "none" || !featured ? null : featured,
  };
}

function parseDeparture(formData: FormData) {
  return {
    city: String(formData.get("city") ?? "").trim(),
    departureDate: new Date(String(formData.get("departureDate"))),
    durationDays: Number(formData.get("durationDays") ?? 0),
    durationNights: Number(formData.get("durationNights") ?? 0),
    price: Number(formData.get("price") ?? 0),
    oldPrice: formData.get("oldPrice") ? Number(formData.get("oldPrice")) : null,
    seats: Number(formData.get("seats") ?? 0),
  };
}

export async function createPackage(formData: FormData) {
  if (!(await getSession())) throw new Error("Unauthorized");

  const pkgData = parsePackage(formData);
  const depData = parseDeparture(formData);

  const pkg = await prisma.package.create({
    data: {
      ...pkgData,
      audience: pkgData.audience as never,
      tier: pkgData.tier as never,
    },
  });
  await prisma.departure.create({
    data: { ...depData, packageId: pkg.id },
  });

  revalidatePath("/admin/packages");
  redirect("/admin/packages");
}

export async function updatePackage(formData: FormData) {
  if (!(await getSession())) throw new Error("Unauthorized");

  const id = String(formData.get("id"));
  const pkgData = parsePackage(formData);
  const depData = parseDeparture(formData);

  await prisma.package.update({
    where: { id },
    data: {
      ...pkgData,
      audience: pkgData.audience as never,
      tier: pkgData.tier as never,
    },
  });

  const departureId = String(formData.get("departureId") ?? "");
  if (departureId) {
    await prisma.departure.update({ where: { id: departureId }, data: depData });
  } else {
    await prisma.departure.create({ data: { ...depData, packageId: id } });
  }

  revalidatePath("/admin/packages");
  redirect("/admin/packages");
}

export async function deletePackage(formData: FormData) {
  if (!(await getSession())) throw new Error("Unauthorized");
  const id = String(formData.get("id"));
  await prisma.package.delete({ where: { id } });
  revalidatePath("/admin/packages");
}
