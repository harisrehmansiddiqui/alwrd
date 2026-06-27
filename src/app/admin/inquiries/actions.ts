"use server";

import { revalidatePath } from "next/cache";
import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";

const STATUSES = [
  "new",
  "high_quality_lead",
  "contacted",
  "confirmed",
  "closed",
  "lost",
] as const;

type Status = (typeof STATUSES)[number];

export async function updateInquiryStatus(formData: FormData) {
  const session = await getSession();
  if (!session) throw new Error("Unauthorized");

  const id = String(formData.get("id"));
  const status = String(formData.get("status"));
  if (!STATUSES.includes(status as Status)) throw new Error("Invalid status");

  await prisma.inquiry.update({
    where: { id },
    data: { status: status as Status },
  });

  revalidatePath(`/admin/inquiries/${id}`);
  revalidatePath("/admin/inquiries");
}

export async function addInquiryNote(formData: FormData) {
  const session = await getSession();
  if (!session) throw new Error("Unauthorized");

  const id = String(formData.get("id"));
  const text = String(formData.get("note") ?? "").trim();
  if (!text) return;

  const inquiry = await prisma.inquiry.findUnique({
    where: { id },
    select: { notes: true },
  });
  type Note = { by: string; at: string; text: string };
  const existing: Note[] = Array.isArray(inquiry?.notes)
    ? (inquiry!.notes as unknown as Note[])
    : [];

  const notes: Note[] = [
    ...existing,
    { by: session.name, at: new Date().toISOString(), text },
  ];

  await prisma.inquiry.update({
    where: { id },
    data: { notes: notes as unknown as Prisma.InputJsonValue },
  });

  revalidatePath(`/admin/inquiries/${id}`);
}
