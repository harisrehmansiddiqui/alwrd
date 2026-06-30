import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const adminPassword = process.env.ADMIN_PASSWORD ?? "Alwrd@2026";
  const passwordHash = bcrypt.hashSync(adminPassword, 10);
  await prisma.adminUser.upsert({
    where: { email: "admin@alwrdgroup.com" },
    update: { passwordHash },
    create: {
      name: "Al Wrd Admin",
      email: "admin@alwrdgroup.com",
      passwordHash,
      role: "super_admin",
    },
  });

  const settings: Record<string, string> = {
    currency: "PKR",
    defaultLanguage: "en",
    whatsapp: "923078953816",
    phone: "+92 307 8953816",
    email: "info@alwrdgroup.com",
    supportEmail: "support@alwrdgroup.com",
    location: "Islamabad, Pakistan",
    instagram: "https://www.instagram.com/alwrdhajjumrah/",
    facebook: "https://www.facebook.com/alwrdhajjumrah",
    tiktok: "https://www.tiktok.com/@alwrdhajjumrah",
    trustTitle: "Recognized and Certified Travel Operator",
    trustDesc:
      "Registered Hajj & Umrah service provider with verified airline and hotel partners — transparent pricing with no hidden charges.",
    trustCertificate: "Licensed Operator — Pakistan",
  };
  for (const [key, value] of Object.entries(settings)) {
    await prisma.siteSetting.upsert({
      where: { key },
      update: { value },
      create: { key, value },
    });
  }

  const modules = ["packages", "flights", "hotels", "visa", "train", "esim", "payments"];
  for (const key of modules) {
    await prisma.integrationModule.upsert({
      where: { key },
      update: {},
      create: { key, enabled: key === "packages" },
    });
  }

  const packageGallery = [
    "/packages/comfort-1.jpg",
    "/gallery/1.jpg",
    "/gallery/2.jpg",
    "/gallery/3.jpg",
    "/gallery/4.jpg",
  ];

  const packages = [
    {
      slug: "comfort-umrah-lahore-14n",
      title: "Comfort Package",
      audience: "family" as const,
      tier: "standard" as const,
      tagline: "Umrah journey filled with blessing & barakah",
      image: "/packages/comfort-1.jpg",
      videoUrl:
        "https://cdn.coverr.co/videos/coverr-aerial-view-of-mecca-4775/1080p.mp4",
      gallery: packageGallery,
      amenities: ["All-Inclusive", "Ziyarat Included", "SIM Card", "4 Star Hotel"],
      featured: "group",
      departure: { city: "Lahore", date: "2026-08-01", days: 15, nights: 14, price: 285000, old: 315000 },
    },
    {
      slug: "comfort-umrah-karachi-14n",
      title: "Comfort Package",
      audience: "group" as const,
      tier: "standard" as const,
      tagline: "Designed for a calm and guided Umrah experience",
      image: "/packages/comfort-2.jpg",
      videoUrl:
        "https://cdn.coverr.co/videos/coverr-aerial-view-of-mecca-4775/1080p.mp4",
      gallery: [
        "/packages/comfort-2.jpg",
        "/gallery/2.jpg",
        "/gallery/3.jpg",
        "/gallery/4.jpg",
        "/gallery/5.jpg",
      ],
      amenities: ["All-Inclusive", "Ziyarat Included", "4 Star Hotel", "Taif Tour"],
      featured: "group",
      departure: { city: "Karachi", date: "2026-08-10", days: 15, nights: 14, price: 299000, old: 330000 },
    },
    {
      slug: "comfort-umrah-islamabad-14n",
      title: "Comfort Package",
      audience: "family" as const,
      tier: "standard" as const,
      tagline: "Family-friendly Umrah with guided support throughout",
      image: "/packages/comfort-1.jpg",
      videoUrl:
        "https://cdn.coverr.co/videos/coverr-aerial-view-of-mecca-4775/1080p.mp4",
      gallery: packageGallery,
      amenities: ["All-Inclusive", "Ziyarat Included", "SIM Card", "4 Star Hotel", "Taif Tour"],
      featured: "group",
      departure: { city: "Islamabad", date: "2026-08-15", days: 15, nights: 14, price: 289000, old: 320000 },
    },
    {
      slug: "royale-umrah-lahore-9n",
      title: "Royale Package",
      audience: "couple" as const,
      tier: "premium" as const,
      tagline: "Stay five-star luxury with our exclusive Royale package",
      image: "/packages/royale-1.jpg",
      videoUrl:
        "https://cdn.coverr.co/videos/coverr-aerial-view-of-mecca-4775/1080p.mp4",
      gallery: [
        "/packages/royale-1.jpg",
        "/gallery/5.jpg",
        "/gallery/6.jpg",
        "/gallery/7.jpg",
        "/gallery/8.jpg",
      ],
      amenities: ["All-Inclusive", "5 Star Hotel", "Private Transport", "Ziyarat Included"],
      featured: "premium",
      departure: { city: "Lahore", date: "2026-09-05", days: 10, nights: 9, price: 610000, old: 680000 },
    },
  ];

  for (const p of packages) {
    const pkg = await prisma.package.upsert({
      where: { slug: p.slug },
      update: {
        gallery: p.gallery,
        videoUrl: p.videoUrl,
      },
      create: {
        slug: p.slug,
        title: p.title,
        audience: p.audience,
        tier: p.tier,
        tagline: p.tagline,
        image: p.image,
        videoUrl: p.videoUrl,
        gallery: p.gallery,
        amenities: p.amenities,
        featured: p.featured,
      },
    });
    const departureDate = new Date(p.departure.date);
    const existing = await prisma.departure.findFirst({
      where: { packageId: pkg.id, city: p.departure.city, departureDate },
    });
    const departureData = {
      city: p.departure.city,
      departureDate,
      durationDays: p.departure.days,
      durationNights: p.departure.nights,
      price: p.departure.price,
      oldPrice: p.departure.old,
      seats: 30,
      active: true,
    };
    if (existing) {
      await prisma.departure.update({
        where: { id: existing.id },
        data: departureData,
      });
    } else {
      await prisma.departure.create({
        data: { ...departureData, packageId: pkg.id },
      });
    }
  }

  // ── CMS content (homepage, FAQ, trust) ──
  const heroSlides = [
    { src: "/hero.jpg", alt: "Pilgrims at the Holy Mosque in Makkah" },
    { src: "/gallery/1.jpg", alt: "Umrah journey at the Haram" },
    { src: "/gallery/2.jpg", alt: "Madinah — the city of the Prophet" },
    { src: "/gallery/3.jpg", alt: "Guided ziyarat and support team" },
  ];
  for (const [i, slide] of heroSlides.entries()) {
    const existing = await prisma.banner.findFirst({ where: { imageDesktop: slide.src } });
    if (!existing) {
      await prisma.banner.create({
        data: {
          headline: slide.alt,
          imageDesktop: slide.src,
          sortOrder: i,
          active: true,
        },
      });
    }
  }

  const testimonialRows = [
    { name: "Arman Khan", city: "Lahore", quote: "From visa to hotels near the Haram, everything was handled. The smoothest Umrah we could have asked for.", video: true },
    { name: "Nafisa Siddiqui", city: "Karachi", quote: "Transparent pricing and dedicated support made my journey peaceful and focused on ibadah. Truly no hidden charges!", video: true },
    { name: "Wasim Shaikh", city: "Islamabad", quote: "Transparent pricing, no hidden charges, and premium hotels exactly as promised. Highly recommended.", video: false },
    { name: "Hira Malik", city: "Faisalabad", quote: "Authentic Pakistani meals and private transport made the whole trip comfortable for the family.", video: false },
  ];
  for (const [i, t] of testimonialRows.entries()) {
    const existing = await prisma.testimonial.findFirst({ where: { name: t.name } });
    if (!existing) {
      await prisma.testimonial.create({
        data: {
          name: t.name,
          city: t.city,
          quote: t.quote,
          rating: 5,
          videoUrl: t.video ? "#video" : null,
          sortOrder: i,
          active: true,
        },
      });
    }
  }

  const faqRows = [
    { q: "How do I book an Umrah package?", a: "Browse our packages, open the one you like and submit an inquiry. Our team contacts you on WhatsApp or phone to confirm availability, pricing and the next steps." },
    { q: "Is visa processing included?", a: "Yes. Every package includes Umrah visa processing. We handle the documentation so you can focus on your worship." },
    { q: "How close are the hotels to the Haram?", a: "We partner with 3, 4 and 5-star hotels within walking distance of Masjid al-Haram in Makkah and Masjid an-Nabawi in Madinah, depending on your package tier." },
    { q: "Can I customise dates or hotels?", a: "Absolutely. Share your preferences in the inquiry form and our team will tailor the package to your travel dates, airline choice and hotel preference." },
    { q: "How early should I book?", a: "Bookings open from 10 days ahead of travel. For the best availability and pricing we recommend reaching out as early as possible." },
    { q: "Do you provide support during the trip?", a: "Yes. Our on-ground team offers 24/7 support throughout your journey, from airport arrival to departure." },
  ];
  for (const [i, f] of faqRows.entries()) {
    const existing = await prisma.faq.findFirst({ where: { question: f.q } });
    if (!existing) {
      await prisma.faq.create({ data: { question: f.q, answer: f.a, sortOrder: i } });
    }
  }

  const statRows = [
    { value: "1,100+", label: "Pilgrims Served" },
    { value: "29+", label: "Years Experience" },
    { value: "12,500+", label: "Visas Processed" },
    { value: "55+", label: "Agencies" },
  ];
  for (const [i, s] of statRows.entries()) {
    const existing = await prisma.trustStat.findFirst({ where: { label: s.label } });
    if (!existing) {
      await prisma.trustStat.create({ data: { ...s, sortOrder: i } });
    }
  }

  for (const [i, name] of ["Saudia", "PIA", "Akasa Air", "flynas", "AirSial"].entries()) {
    const existing = await prisma.partnerLogo.findFirst({ where: { name } });
    if (!existing) {
      await prisma.partnerLogo.create({ data: { name, sortOrder: i } });
    }
  }

  console.log("Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
