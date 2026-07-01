import { prisma } from "@/lib/db";
import {
  faqs as staticFaqs,
  heroSlides as staticHeroSlides,
  partnerLogos as staticPartnerLogos,
  resources as staticResources,
  stats as staticStats,
  testimonials as staticTestimonials,
  trustBadges as staticTrustBadges,
} from "@/lib/content";
import { getMediaMap, resolveUrl } from "@/lib/media";
import { site as defaultSite } from "@/lib/site";

export type CmsTestimonial = {
  name: string;
  city: string;
  rating: number;
  quote: string;
  video: boolean;
  image?: string | null;
};

export type CmsFaq = { q: string; a: string; category?: string | null };

export type CmsHeroSlide = { src: string; alt: string };

export type CmsResourceCard = {
  title: string;
  desc: string;
  href: string;
  image: string;
};

export type SiteConfig = typeof defaultSite & {
  trustTitle: string;
  trustDesc: string;
  trustCertificate: string;
};

const SETTING_KEYS = [
  "whatsapp",
  "phone",
  "email",
  "supportEmail",
  "location",
  "trustTitle",
  "trustDesc",
  "trustCertificate",
  "instagram",
  "facebook",
  "tiktok",
] as const;

export async function getHeroSlides(): Promise<CmsHeroSlide[]> {
  const rows = await prisma.banner.findMany({
    where: { active: true },
    orderBy: { sortOrder: "asc" },
  });
  if (rows.length === 0) return staticHeroSlides;
  return rows.map((b) => ({
    src: b.imageDesktop,
    alt: b.headline ?? "Al Wrd Umrah",
  }));
}

export async function getTestimonials(): Promise<CmsTestimonial[]> {
  const rows = await prisma.testimonial.findMany({
    where: { active: true },
    orderBy: { sortOrder: "asc" },
  });
  if (rows.length === 0) {
    return staticTestimonials.map((t) => ({
      name: t.name,
      city: t.city,
      rating: t.rating,
      quote: t.quote,
      video: t.video,
    }));
  }
  return rows.map((t) => ({
    name: t.name,
    city: t.city ?? "",
    rating: t.rating,
    quote: t.quote,
    video: Boolean(t.videoUrl),
    image: t.image,
  }));
}

export async function getFaqs(): Promise<CmsFaq[]> {
  const rows = await prisma.faq.findMany({ orderBy: { sortOrder: "asc" } });
  if (rows.length === 0) return staticFaqs.map((f) => ({ q: f.q, a: f.a }));
  return rows.map((f) => ({ q: f.question, a: f.answer, category: f.category }));
}

export async function getTrustStats() {
  const rows = await prisma.trustStat.findMany({ orderBy: { sortOrder: "asc" } });
  if (rows.length === 0) return staticStats;
  return rows.map((s) => ({
    value: s.value,
    label: s.label,
    variant: "primary" as const,
  }));
}

export async function getPartnerLogos(): Promise<string[]> {
  const rows = await prisma.partnerLogo.findMany({ orderBy: { sortOrder: "asc" } });
  if (rows.length === 0) return staticPartnerLogos;
  return rows.map((p) => p.name);
}

export async function getTrustBadges() {
  const settings = await getSiteSettingsMap();
  return {
    title: settings.trustTitle ?? staticTrustBadges.title,
    desc: settings.trustDesc ?? staticTrustBadges.desc,
    certificate: settings.trustCertificate ?? staticTrustBadges.certificate,
  };
}

export async function getResourceCards(): Promise<CmsResourceCard[]> {
  const [rows, media] = await Promise.all([
    prisma.resource.findMany({
      where: { published: true, type: { in: ["checklist", "blog"] } },
      orderBy: { createdAt: "asc" },
    }),
    getMediaMap(),
  ]);
  if (rows.length === 0) {
    return staticResources.map((r) => ({
      title: r.title,
      desc: r.desc,
      href: r.href,
      image:
        r.href.includes("duas")
          ? resolveUrl(media, "resources.duas", r.image)
          : r.href.includes("checklist")
            ? resolveUrl(media, "resources.checklist", r.image)
            : resolveUrl(media, "resources.support", r.image),
    }));
  }
  return rows.map((r) => ({
    title: r.title,
    desc: r.metaDesc ?? r.title,
    href: r.type === "checklist" ? "/resources/checklist" : `/resources/${r.slug}`,
    image: resolveUrl(media, "resources.checklist", "/resources/checklist.jpg"),
  }));
}

export async function getGalleryImages(): Promise<string[]> {
  const media = await getMediaMap();
  return Array.from({ length: 8 }, (_, i) =>
    resolveUrl(media, `gallery.${i + 1}`, `/gallery/${i + 1}.jpg`),
  );
}

export async function getLegalPage(slug: string) {
  const page = await prisma.legalPage.findUnique({ where: { slug } });
  return page;
}

export async function getSiteSettingsMap(): Promise<Record<string, string>> {
  const rows = await prisma.siteSetting.findMany();
  const map: Record<string, string> = {};
  for (const row of rows) map[row.key] = row.value;
  return map;
}

export async function getSiteConfig(): Promise<SiteConfig> {
  const s = await getSiteSettingsMap();
  return {
    ...defaultSite,
    whatsapp: s.whatsapp ?? defaultSite.whatsapp,
    phone: s.phone ?? defaultSite.phone,
    email: s.email ?? defaultSite.email,
    supportEmail: s.supportEmail ?? defaultSite.supportEmail,
    location: s.location ?? defaultSite.location,
    socials: {
      instagram: s.instagram ?? defaultSite.socials.instagram,
      facebook: s.facebook ?? defaultSite.socials.facebook,
      tiktok: s.tiktok ?? defaultSite.socials.tiktok,
    },
    trustTitle: s.trustTitle ?? staticTrustBadges.title,
    trustDesc: s.trustDesc ?? staticTrustBadges.desc,
    trustCertificate: s.trustCertificate ?? staticTrustBadges.certificate,
  };
}

export async function getIntegrationModules() {
  return prisma.integrationModule.findMany({ orderBy: { key: "asc" } });
}

export { SETTING_KEYS };
