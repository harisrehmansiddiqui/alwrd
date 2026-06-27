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
    whatsapp: "923001234567",
    phone: "+92 300 1234567",
    email: "info@alwrdgroup.com",
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

  const packages = [
    {
      slug: "comfort-umrah-lahore-14n",
      title: "Comfort Package",
      audience: "family" as const,
      tier: "standard" as const,
      tagline: "Umrah journey filled with blessing & barakah",
      image: "/packages/comfort-1.jpg",
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
      amenities: ["All-Inclusive", "Ziyarat Included", "4 Star Hotel", "Taif Tour"],
      featured: "group",
      departure: { city: "Karachi", date: "2026-08-10", days: 15, nights: 14, price: 299000, old: 330000 },
    },
    {
      slug: "royale-umrah-lahore-9n",
      title: "Royale Package",
      audience: "couple" as const,
      tier: "premium" as const,
      tagline: "Stay five-star luxury with our exclusive Royale package",
      image: "/packages/royale-1.jpg",
      amenities: ["All-Inclusive", "5 Star Hotel", "Private Transport", "Ziyarat Included"],
      featured: "premium",
      departure: { city: "Lahore", date: "2026-09-05", days: 10, nights: 9, price: 610000, old: 680000 },
    },
  ];

  for (const p of packages) {
    const pkg = await prisma.package.upsert({
      where: { slug: p.slug },
      update: {},
      create: {
        slug: p.slug,
        title: p.title,
        audience: p.audience,
        tier: p.tier,
        tagline: p.tagline,
        image: p.image,
        amenities: p.amenities,
        featured: p.featured,
      },
    });
    await prisma.departure.create({
      data: {
        packageId: pkg.id,
        city: p.departure.city,
        departureDate: new Date(p.departure.date),
        durationDays: p.departure.days,
        durationNights: p.departure.nights,
        price: p.departure.price,
        oldPrice: p.departure.old,
        seats: 30,
      },
    });
  }

  console.log("Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
