"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/admin/guard";
import { revalidatePublicContent } from "@/lib/admin/revalidate";

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function bool(formData: FormData, key: string) {
  return formData.get(key) === "true";
}

function num(formData: FormData, key: string, fallback = 0) {
  const v = Number(formData.get(key));
  return Number.isFinite(v) ? v : fallback;
}

// ── Banners ──

export async function saveBanner(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const data = {
    headline: String(formData.get("headline") ?? "").trim() || null,
    ctaLabel: String(formData.get("ctaLabel") ?? "").trim() || null,
    ctaHref: String(formData.get("ctaHref") ?? "").trim() || null,
    imageDesktop: String(formData.get("imageDesktop") ?? "").trim(),
    imageMobile: String(formData.get("imageMobile") ?? "").trim() || null,
    sortOrder: num(formData, "sortOrder"),
    active: bool(formData, "active"),
  };
  if (id) await prisma.banner.update({ where: { id }, data });
  else await prisma.banner.create({ data });
  revalidatePublicContent();
  revalidatePath("/admin/banners");
  redirect("/admin/banners");
}

export async function deleteBanner(formData: FormData) {
  await requireAdmin();
  await prisma.banner.delete({ where: { id: String(formData.get("id")) } });
  revalidatePublicContent();
  revalidatePath("/admin/banners");
}

// ── Testimonials ──

export async function saveTestimonial(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const data = {
    name: String(formData.get("name") ?? "").trim(),
    city: String(formData.get("city") ?? "").trim() || null,
    rating: num(formData, "rating", 5),
    quote: String(formData.get("quote") ?? "").trim(),
    videoUrl: bool(formData, "hasVideo") ? "#video" : null,
    sortOrder: num(formData, "sortOrder"),
    active: bool(formData, "active"),
  };
  if (id) await prisma.testimonial.update({ where: { id }, data });
  else await prisma.testimonial.create({ data });
  revalidatePublicContent();
  revalidatePath("/admin/testimonials");
  redirect("/admin/testimonials");
}

export async function deleteTestimonial(formData: FormData) {
  await requireAdmin();
  await prisma.testimonial.delete({ where: { id: String(formData.get("id")) } });
  revalidatePublicContent();
  revalidatePath("/admin/testimonials");
}

// ── FAQs ──

export async function saveFaq(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const data = {
    question: String(formData.get("question") ?? "").trim(),
    answer: String(formData.get("answer") ?? "").trim(),
    category: String(formData.get("category") ?? "").trim() || null,
    sortOrder: num(formData, "sortOrder"),
  };
  if (id) await prisma.faq.update({ where: { id }, data });
  else await prisma.faq.create({ data });
  revalidatePublicContent();
  revalidatePath("/admin/faqs");
  redirect("/admin/faqs");
}

export async function deleteFaq(formData: FormData) {
  await requireAdmin();
  await prisma.faq.delete({ where: { id: String(formData.get("id")) } });
  revalidatePublicContent();
  revalidatePath("/admin/faqs");
}

// ── Trust stats ──

export async function saveTrustStat(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const data = {
    label: String(formData.get("label") ?? "").trim(),
    value: String(formData.get("value") ?? "").trim(),
    sortOrder: num(formData, "sortOrder"),
  };
  if (id) await prisma.trustStat.update({ where: { id }, data });
  else await prisma.trustStat.create({ data });
  revalidatePublicContent();
  revalidatePath("/admin/stats");
  redirect("/admin/stats");
}

export async function deleteTrustStat(formData: FormData) {
  await requireAdmin();
  await prisma.trustStat.delete({ where: { id: String(formData.get("id")) } });
  revalidatePublicContent();
  revalidatePath("/admin/stats");
}

// ── Partners ──

export async function savePartner(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const data = {
    name: String(formData.get("name") ?? "").trim(),
    logo: String(formData.get("logo") ?? "").trim() || null,
    url: String(formData.get("url") ?? "").trim() || null,
    sortOrder: num(formData, "sortOrder"),
  };
  if (id) await prisma.partnerLogo.update({ where: { id }, data });
  else await prisma.partnerLogo.create({ data });
  revalidatePublicContent();
  revalidatePath("/admin/partners");
  redirect("/admin/partners");
}

export async function deletePartner(formData: FormData) {
  await requireAdmin();
  await prisma.partnerLogo.delete({ where: { id: String(formData.get("id")) } });
  revalidatePublicContent();
  revalidatePath("/admin/partners");
}

// ── Resources ──

export async function saveResource(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const title = String(formData.get("title") ?? "").trim();
  const slugInput = String(formData.get("slug") ?? "").trim();
  const data = {
    title,
    slug: slugInput ? slugify(slugInput) : slugify(title),
    type: String(formData.get("type") ?? "blog") as "dua" | "checklist" | "blog",
    body: String(formData.get("body") ?? "").trim(),
    metaTitle: String(formData.get("metaTitle") ?? "").trim() || null,
    metaDesc: String(formData.get("metaDesc") ?? "").trim() || null,
    published: bool(formData, "published"),
  };
  if (id) await prisma.resource.update({ where: { id }, data });
  else await prisma.resource.create({ data });
  revalidatePublicContent();
  revalidatePath("/admin/resources");
  redirect("/admin/resources");
}

export async function deleteResource(formData: FormData) {
  await requireAdmin();
  await prisma.resource.delete({ where: { id: String(formData.get("id")) } });
  revalidatePublicContent();
  revalidatePath("/admin/resources");
}

// ── Legal ──

export async function saveLegalPage(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const title = String(formData.get("title") ?? "").trim();
  const slugInput = String(formData.get("slug") ?? "").trim();
  const data = {
    title,
    slug: slugInput ? slugify(slugInput) : slugify(title),
    body: String(formData.get("body") ?? "").trim(),
  };
  if (id) await prisma.legalPage.update({ where: { id }, data });
  else await prisma.legalPage.create({ data });
  revalidatePublicContent();
  revalidatePath("/admin/legal");
  redirect("/admin/legal");
}

export async function deleteLegalPage(formData: FormData) {
  await requireAdmin();
  await prisma.legalPage.delete({ where: { id: String(formData.get("id")) } });
  revalidatePublicContent();
  revalidatePath("/admin/legal");
}
