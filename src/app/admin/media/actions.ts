"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/admin/guard";
import { revalidatePublicContent } from "@/lib/admin/revalidate";
import { MEDIA_REGISTRY_MAP } from "@/lib/media-registry";

export async function saveMediaImage(formData: FormData) {
  await requireAdmin();
  const key = String(formData.get("key") ?? "").trim();
  const url = String(formData.get("url") ?? "").trim();
  if (!key || !url) throw new Error("Key and URL are required");

  const registry = MEDIA_REGISTRY_MAP[key];
  const label = String(formData.get("label") ?? registry?.label ?? key);
  const category = String(formData.get("category") ?? registry?.category ?? "Custom");
  const alt = String(formData.get("alt") ?? "").trim() || null;

  await prisma.mediaImage.upsert({
    where: { key },
    update: { url, label, category, alt },
    create: {
      key,
      url,
      label,
      category,
      alt,
      sortOrder: registry?.sortOrder ?? 0,
    },
  });

  revalidatePublicContent();
  revalidatePath("/admin/media");
}

export async function resetMediaImage(formData: FormData) {
  await requireAdmin();
  const key = String(formData.get("key"));
  await prisma.mediaImage.deleteMany({ where: { key } });
  revalidatePublicContent();
  revalidatePath("/admin/media");
}
