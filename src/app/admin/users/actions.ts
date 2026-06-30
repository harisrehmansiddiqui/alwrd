"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";
import { requireSuperAdmin } from "@/lib/admin/guard";

export async function saveAdminUser(formData: FormData) {
  await requireSuperAdmin();
  const id = String(formData.get("id") ?? "");
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const role = String(formData.get("role") ?? "agent");
  const password = String(formData.get("password") ?? "");

  if (id) {
    const data: { name: string; email: string; role: "super_admin" | "agent"; passwordHash?: string } = {
      name,
      email,
      role: role as "super_admin" | "agent",
    };
    if (password) data.passwordHash = bcrypt.hashSync(password, 10);
    await prisma.adminUser.update({ where: { id }, data });
  } else {
    if (!password) throw new Error("Password required for new user");
    await prisma.adminUser.create({
      data: {
        name,
        email,
        role: role as "super_admin" | "agent",
        passwordHash: bcrypt.hashSync(password, 10),
      },
    });
  }
  revalidatePath("/admin/users");
  redirect("/admin/users");
}

export async function deleteAdminUser(formData: FormData) {
  const session = await requireSuperAdmin();
  const id = String(formData.get("id"));
  if (id === session.sub) throw new Error("Cannot delete your own account");
  await prisma.adminUser.delete({ where: { id } });
  revalidatePath("/admin/users");
}
