"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/admin/guard";
import { revalidatePublicContent } from "@/lib/admin/revalidate";
import { SETTING_KEYS } from "@/lib/cms";

export async function saveSiteSettings(formData: FormData) {
  await requireAdmin();
  for (const key of SETTING_KEYS) {
    const value = String(formData.get(key) ?? "").trim();
    if (!value) continue;
    await prisma.siteSetting.upsert({
      where: { key },
      update: { value },
      create: { key, value },
    });
  }
  revalidatePublicContent();
  revalidatePath("/admin/settings");
}

export async function toggleIntegration(formData: FormData) {
  await requireAdmin();
  const key = String(formData.get("key"));
  const enabled = formData.get("enabled") === "true";
  await prisma.integrationModule.update({
    where: { key },
    data: { enabled },
  });
  revalidatePath("/admin/settings");
}
