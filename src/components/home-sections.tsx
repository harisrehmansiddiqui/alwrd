import Image from "next/image";
import Link from "next/link";
import { SectionHeading } from "@/components/section-heading";
import { WhatsAppQrCard } from "@/components/whatsapp-qr";
import { SUPPORT_WHATSAPP_MESSAGE } from "@/lib/collaborations";
import { PackageCard } from "@/components/package-card";
import { MaterialIcon } from "@/components/material-icon";
import { formatPKR, type Package } from "@/lib/packages";
import { PREMIUM_AUDIENCE_CARDS, type PremiumAudienceCard } from "@/lib/premium-audience";
import {
  highlights,
  stats,
  trainFeatures,
  esimFeatures,
  resources,
  partnerLogos,
  galleryImages,
  collaborations,
  trustBadges,
  testimonials,
} from "@/lib/content";

function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-[1280px] min-w-0 px-4 sm:px-6">{children}</div>
  );
}

export function GroupPackages({ packages }: { packages: Package[] }) {
  const featured = packages.slice(0, 3);
  if (featured.length === 0) return null;

  return (
    <section className="bg-surface-container-lowest pb-16 pt-4 sm:pb-20 sm:pt-6">
      <Container>
        <SectionHeading
          title="Group Packages"
          subtitle="Pre-designed itineraries ideal for families and group travel."
          action={{ label: "View All", href: "/packages?featured=group" }}
        />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
          {featured.map((pkg) => (
            <PackageCard key={pkg.departureId} pkg={pkg} />
          ))}
        </div>
      </Container>
    </section>
  );
}

export function PremiumPackages({
  cards,
}: {
  packages?: Package[];
  cards?: PremiumAudienceCard[];
}) {
  const audienceCards = cards ?? PREMIUM_AUDIENCE_CARDS;
  return (
    <section className="bg-surface py-20">
      <Container>
        <SectionHeading
          title="Premium Packages"
          subtitle="Personalized plans tailored to your airline choices and 5-star comfort."
          centered
        />
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {audienceCards.map((card) => (
            <article
              key={card.slug}
              className="group flex flex-col overflow-hidden rounded-2xl border border-outline-variant bg-surface-container-lowest shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                {card.badge && (
                  <span className="absolute left-4 top-4 rounded-full bg-primary px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-on-primary">
                    {card.badge}
                  </span>
                )}
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-xl font-bold text-white">{card.title}</h3>
                  <p className="mt-1 line-clamp-2 text-xs text-white/85">{card.subtitle}</p>
                </div>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <ul className="space-y-2">
                  {card.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-center gap-2 text-sm text-on-surface-variant"
                    >
                      <MaterialIcon name="check_circle" className="shrink-0 text-base text-primary" />
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto border-t border-outline-variant pt-5">
                  <p className="text-xs text-on-surface-variant">Starting from</p>
                  <p className="text-2xl font-bold text-primary">
                    {formatPKR(card.priceFrom)}
                    <span className="text-xs font-normal text-on-surface-variant"> / person</span>
                  </p>
                  <Link
                    href={card.href}
                    className="mt-4 block rounded-lg bg-primary py-3 text-center text-sm font-semibold text-on-primary transition-colors hover:bg-primary-dark"
                  >
                    {card.cta}
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

export function GalleryCollaborations({
  galleryImages: galleryProp,
  collaborationImages,
}: {
  galleryImages?: string[];
  collaborationImages?: string[];
}) {
  const images = galleryProp?.length ? galleryProp : galleryImages;
  const collab = collaborationImages?.length ? collaborationImages : collaborations;
  const featured = testimonials[1];
  const masonryCols = [
    [images[0], images[1]],
    [images[2], images[3]],
    [images[4], images[5]],
    [images[6], images[7] ?? images[0]],
  ];

  return (
    <section className="bg-surface-container-low py-20">
      <Container>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="space-y-6 lg:col-span-4">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2 className="text-2xl font-semibold text-on-background md:text-[32px]">
                Collaborations
              </h2>
              <Link
                href="/collaborations"
                className="text-sm font-semibold text-primary hover:underline"
              >
                View collaborations →
              </Link>
            </div>
            <p className="text-base text-on-surface-variant">
              Relive the moments of faith and companionship shared by our
              pilgrims.
            </p>
            <div className="grid grid-cols-2 gap-4 pt-4">
              {collab.map((src, i) => (
                <div
                  key={i}
                  className="h-40 rounded-xl border border-outline-variant bg-cover bg-center shadow-sm"
                  style={{ backgroundImage: `url('${src}')` }}
                />
              ))}
            </div>
            <div className="mt-4 rounded-xl border border-primary/20 bg-primary/5 p-6">
              <div className="mb-4 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-primary/20 bg-primary/10 font-bold text-primary">
                  {featured.name.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-on-surface">{featured.name}</p>
                  <p className="text-xs text-on-surface-variant">
                    {featured.city}
                  </p>
                </div>
              </div>
              <p className="text-base italic text-on-surface-variant">
                &ldquo;{featured.quote}&rdquo;
              </p>
            </div>
          </div>

          <div className="lg:col-span-8">
            <div className="grid h-full grid-cols-2 gap-4 md:grid-cols-4">
              {masonryCols.map((col, ci) => (
                <div
                  key={ci}
                  className={`space-y-4 ${ci % 2 === 1 ? "pt-8" : ci === 3 ? "pt-12" : ""}`}
                >
                  {col.map((src, i) => (
                    <div
                      key={`${ci}-${i}`}
                      className={`w-full rounded-2xl border border-outline-variant bg-cover bg-center shadow-sm ${
                        i === 0 ? "h-48 md:h-64" : "h-40 md:h-48"
                      }`}
                      style={{ backgroundImage: `url('${src}')` }}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export function UniqueHighlights({
  cards,
}: {
  cards?: typeof highlights;
}) {
  const items = cards?.length ? cards : highlights;
  return (
    <section className="bg-surface-container-lowest py-20">
      <Container>
        <SectionHeading
          title="Our Unique Highlights"
          subtitle="Special offerings to make your Umrah more meaningful, comfortable, and technically seamless."
          centered
          action={{ label: "View Details", href: "/our-services" }}
        />
        <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4">
          {items.map((h) => (
            <Link
              key={h.title}
              href={h.href}
              className="group overflow-hidden rounded-2xl border border-outline-variant bg-white transition-all hover:border-primary/40 hover:shadow-[0_8px_30px_rgba(0,100,0,0.08)]"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={h.image}
                  alt={h.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 flex h-10 w-10 items-center justify-center rounded-full bg-white/95 shadow-sm">
                  <MaterialIcon name={h.icon} className="text-primary" />
                </div>
              </div>
              <div className="p-4 text-center sm:p-5">
                <h3 className="text-sm font-bold text-on-surface sm:text-base">
                  {h.title}
                </h3>
                <p className="mt-1 hidden text-xs font-light text-on-surface-variant sm:block">
                  {h.desc}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}

export function HaramainTrain({
  trustStats,
  promoImage,
}: {
  trustStats?: { value: string; label: string; variant: string }[];
  promoImage?: string;
}) {
  const statItems = trustStats?.length ? trustStats : stats;
  const trainBg = promoImage ?? "/gallery/3.jpg";
  return (
    <section className="bg-surface py-20">
      <Container>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
          <div className="flex flex-col overflow-hidden rounded-2xl border border-outline-variant bg-surface-container-lowest shadow-sm md:col-span-7 md:flex-row">
            <div className="flex flex-col justify-center space-y-4 p-8 md:w-1/2">
              <h3 className="text-xl font-semibold text-primary">
                Haramain High-Speed Train
              </h3>
              <p className="text-base text-on-surface-variant">
                Travel effortlessly between the holy cities with the fastest
                rail experience in Saudi Arabia.
              </p>
              <ul className="space-y-2">
                {trainFeatures.map((f) => (
                  <li
                    key={f.title}
                    className="flex items-center gap-2 text-sm text-on-surface"
                  >
                    <MaterialIcon name={f.icon} className="text-sm text-primary" />
                    {f.title}
                  </li>
                ))}
              </ul>
              <button
                type="button"
                className="w-fit rounded-lg border border-outline-variant bg-surface-container-low px-4 py-2 text-sm font-semibold text-on-surface-variant"
              >
                Coming Soon
              </button>
            </div>
            <div
              className="relative h-48 bg-cover bg-center md:h-auto md:w-1/2"
              style={{ backgroundImage: `url('${trainBg}')` }}
            />
          </div>

          <div className="grid grid-cols-2 gap-4 md:col-span-5">
            {statItems.map((s) => (
              <div
                key={s.label}
                className={`flex flex-col items-center justify-center rounded-2xl p-6 text-center shadow-sm ${
                  s.variant === "primary"
                    ? "bg-primary text-on-primary shadow-md"
                    : s.variant === "secondary"
                      ? "bg-tertiary text-on-tertiary shadow-md"
                      : "border border-outline-variant bg-surface-container-lowest"
                }`}
              >
                <p
                  className={`text-2xl font-bold md:text-[32px] ${
                    s.variant === "light" ? "text-primary" : ""
                  }`}
                >
                  {s.value}
                </p>
                <p
                  className={`text-xs ${
                    s.variant === "light"
                      ? "text-on-surface-variant"
                      : "opacity-90"
                  }`}
                >
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

export function PartnerStrip({ logos }: { logos?: string[] }) {
  const names = logos?.length ? logos : partnerLogos;
  return (
    <section className="overflow-hidden border-y border-outline-variant bg-surface-container-lowest py-12">
      <Container>
        <div className="flex flex-wrap items-center justify-center gap-12 opacity-60 grayscale transition-all hover:grayscale-0">
          {names.map((name) => (
            <span
              key={name}
              className="text-xl font-bold text-on-surface-variant"
            >
              {name}
            </span>
          ))}
        </div>
      </Container>
    </section>
  );
}

export function EsimPromo() {
  return (
    <section className="bg-surface-container-high/20 py-20">
      <Container>
        <div className="flex flex-col items-center gap-12 rounded-3xl border border-outline-variant bg-surface-container-lowest p-8 shadow-md lg:flex-row lg:p-12">
          <div className="space-y-6 lg:w-2/3">
            <h2 className="text-2xl font-semibold text-on-background md:text-[32px]">
              Stay Connected With eSIM During Your Journey
            </h2>
            <p className="text-lg text-on-surface-variant">
              Instant activation, no roaming charges, works seamlessly in Saudi
              Arabia. Access essential services throughout your journey without
              searching for physical SIM shops.
            </p>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {esimFeatures.map((f) => (
                <div
                  key={f.title}
                  className="rounded-xl border border-primary/10 bg-surface p-4"
                >
                  <MaterialIcon name={f.icon} className="mb-2 text-primary" />
                  <h4 className="font-bold text-on-surface">{f.title}</h4>
                  <p className="text-xs text-on-surface-variant">{f.desc}</p>
                </div>
              ))}
            </div>
            <button
              type="button"
              className="rounded-lg border border-primary/20 bg-primary/10 px-8 py-3 text-sm font-semibold text-primary transition-colors hover:bg-primary/20"
            >
              Coming Soon
            </button>
          </div>
          <div className="flex justify-center lg:w-1/3">
            <WhatsAppQrCard
              message="Assalamu alaikum, I am interested in eSIM for my Umrah trip."
              title="Scan for WhatsApp"
              subtitle="eSIM activation coming soon — message us to register interest."
              size={176}
            />
          </div>
        </div>
      </Container>
    </section>
  );
}

export function ResourcesSection({
  cards,
}: {
  cards?: { title: string; desc: string; href: string; image: string }[];
}) {
  const items = cards?.length ? cards : resources;
  return (
    <section className="bg-background py-20">
      <Container>
        <SectionHeading
          title="Your Journey, Fully Supported"
          subtitle="Helpful resources and services to guide you before and during your Umrah."
          centered
        />
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {items.map((r) => (
            <Link
              key={r.title}
              href={r.href}
              className="group overflow-hidden rounded-2xl border border-outline-variant bg-surface-container-lowest transition-all hover:shadow-xl"
            >
              <div className="h-48 overflow-hidden bg-surface-container-low">
                <div
                  className="h-full w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                  style={{
                    backgroundImage: `url('${r.image}'), linear-gradient(135deg, #f0f5e9, #ebf0e3)`,
                  }}
                />
              </div>
              <div className="space-y-3 p-6">
                <h3 className="text-xl font-semibold text-on-surface">
                  {r.title}
                </h3>
                <p className="text-sm text-on-surface-variant">{r.desc}</p>
                <span className="inline-flex items-center text-sm font-semibold text-primary group-hover:underline">
                  Check it out
                  <MaterialIcon name="arrow_forward" className="ml-1 text-sm" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center gap-8 rounded-3xl border border-outline-variant bg-surface-container-low p-8 lg:flex-row lg:p-10">
          <div className="flex-1 text-center lg:text-left">
            <h3 className="font-display text-xl font-bold text-on-background sm:text-2xl">
              Scan for instant pilgrim support
            </h3>
            <p className="mt-2 max-w-lg text-sm text-on-surface-variant">
              Save our WhatsApp QR before you travel — message coordinators in
              Pakistan or Saudi Arabia anytime during your journey.
            </p>
            <Link
              href="/support"
              className="mt-4 inline-block text-sm font-semibold text-primary hover:underline"
            >
              Visit support page →
            </Link>
          </div>
          <WhatsAppQrCard
            message={SUPPORT_WHATSAPP_MESSAGE}
            title="Al Wrd Support"
            subtitle="Scan with your phone camera"
            size={160}
            className="shrink-0"
          />
        </div>
      </Container>
    </section>
  );
}

export function TrustBadges({
  badges,
}: {
  badges?: { title: string; desc: string; certificate: string };
}) {
  const trust = badges ?? trustBadges;
  return (
    <section className="bg-surface py-20">
      <Container>
        <div className="flex flex-col items-center gap-12 rounded-3xl border border-outline-variant bg-surface-container-lowest p-8 shadow-sm md:flex-row">
          <div className="md:w-1/2">
            <div className="rounded-xl border-2 border-dashed border-outline-variant bg-surface-container-low p-4">
              <div className="flex aspect-[4/3] items-center justify-center rounded bg-surface-container">
                <MaterialIcon
                  name="verified"
                  className="text-6xl text-primary/30"
                />
              </div>
            </div>
          </div>
          <div className="space-y-4 md:w-1/2">
            <div className="flex items-center gap-2 text-primary">
              <MaterialIcon name="verified" />
              <span className="text-sm font-semibold">Government Verified</span>
            </div>
            <h2 className="text-2xl font-semibold text-on-background md:text-[32px]">
              {trust.title}
            </h2>
            <p className="text-lg text-on-surface-variant">{trust.desc}</p>
            <p className="text-base font-bold text-primary">
              ({trust.certificate})
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}

// Keep exports used elsewhere
export { GalleryCollaborations as Gallery };
export { GalleryCollaborations as Collaborations };
export { PartnerStrip as TrustStats };
