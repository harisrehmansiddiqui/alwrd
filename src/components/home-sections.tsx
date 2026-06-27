import Link from "next/link";
import { SectionHeading } from "@/components/section-heading";
import { PackageCard } from "@/components/package-card";
import { MaterialIcon } from "@/components/material-icon";
import { formatPKR, type Package } from "@/lib/packages";
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
  premiumFeatures,
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
    <section className="bg-surface-container-lowest pb-16 pt-6 sm:pb-20 sm:pt-8">
      <Container>
        <SectionHeading
          title="Group Packages"
          subtitle="Pre-designed itineraries ideal for families and group travel."
          action={{ label: "View All", href: "/packages?type=group" }}
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

export function PremiumPackages({ packages }: { packages: Package[] }) {
  const featured = packages[0];
  if (!featured) return null;

  return (
    <section className="bg-surface py-20">
      <Container>
        <SectionHeading
          title="Premium Packages"
          subtitle="Personalized plans tailored to your airline choices and 5-star comfort."
        />
        <div className="flex flex-col items-stretch overflow-hidden rounded-2xl border border-outline-variant bg-surface-container-lowest shadow-xl lg:flex-row">
          <div className="relative min-h-[300px] lg:w-1/2">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url('${featured.image}')` }}
            />
          </div>
          <div className="space-y-6 p-8 lg:w-1/2 lg:p-12">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-primary">
                  Top Choice
                </span>
                <h3 className="mt-2 text-[32px] font-bold text-primary">
                  {featured.title}
                </h3>
              </div>
              <div className="rounded-full bg-primary/10 px-4 py-1 text-xs font-bold text-primary">
                {featured.durationDays}D / {featured.durationNights}N
              </div>
            </div>
            <p className="text-lg leading-relaxed text-on-surface-variant">
              {featured.description ?? featured.tagline}
            </p>
            <div className="grid grid-cols-2 gap-4">
              {premiumFeatures.map((f) => (
                <div key={f.label} className="flex items-center gap-3">
                  <MaterialIcon name={f.icon} className="text-primary" />
                  <span className="text-base text-on-surface">{f.label}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-col items-center justify-between gap-6 border-t border-outline-variant pt-6 md:flex-row">
              <div>
                <p className="text-xs text-on-surface-variant">Starting from</p>
                <p className="text-[32px] font-bold text-primary">
                  {formatPKR(featured.price)}{" "}
                  <span className="text-xs font-normal text-on-surface-variant">
                    / person
                  </span>
                </p>
              </div>
              <Link
                href={`/packages/${featured.slug}`}
                className="w-full rounded-lg bg-primary px-8 py-4 text-center text-sm font-semibold text-on-primary shadow-lg shadow-primary/20 transition-transform hover:scale-105 hover:bg-primary-dark md:w-auto"
              >
                Explore {featured.title}
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export function GalleryCollaborations() {
  const featured = testimonials[1];
  const masonryCols = [
    [galleryImages[0], galleryImages[1]],
    [galleryImages[2], galleryImages[3]],
    [galleryImages[4], galleryImages[5]],
    [galleryImages[6], galleryImages[7] ?? galleryImages[0]],
  ];

  return (
    <section className="bg-surface-container-low py-20">
      <Container>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="space-y-6 lg:col-span-4">
            <h2 className="text-2xl font-semibold text-on-background md:text-[32px]">
              Collaborations
            </h2>
            <p className="text-base text-on-surface-variant">
              Relive the moments of faith and companionship shared by our
              pilgrims.
            </p>
            <div className="grid grid-cols-2 gap-4 pt-4">
              {collaborations.map((src, i) => (
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

export function UniqueHighlights() {
  return (
    <section className="bg-surface-container-lowest py-20">
      <Container>
        <SectionHeading
          title="Our Unique Highlights"
          subtitle="Special offerings to make your Umrah more meaningful, comfortable, and technically seamless."
          centered
        />
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {highlights.map((h) => (
            <div
              key={h.title}
              className="group rounded-xl border border-outline-variant p-6 text-center transition-all hover:border-primary/40 hover:bg-surface-container-low"
            >
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 transition-transform group-hover:scale-110">
                <MaterialIcon name={h.icon} className="text-primary" />
              </div>
              <h3 className="text-base font-bold text-on-surface">{h.title}</h3>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

export function HaramainTrain() {
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
              style={{ backgroundImage: "url('/gallery/3.jpg')" }}
            />
          </div>

          <div className="grid grid-cols-2 gap-4 md:col-span-5">
            {stats.map((s) => (
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

export function PartnerStrip() {
  return (
    <section className="overflow-hidden border-y border-outline-variant bg-surface-container-lowest py-12">
      <Container>
        <div className="flex flex-wrap items-center justify-center gap-12 opacity-60 grayscale transition-all hover:grayscale-0">
          {partnerLogos.map((name) => (
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
            <div className="relative rounded-3xl border-4 border-primary/10 bg-surface-container-lowest p-8 shadow-xl">
              <div className="flex h-48 w-48 items-center justify-center rounded-2xl bg-surface-container-low">
                <MaterialIcon name="qr_code_2" className="text-6xl text-primary/30" />
              </div>
              <div className="absolute -right-4 -top-4 rounded-lg bg-primary p-2 text-on-primary shadow-lg">
                <MaterialIcon name="qr_code_scanner" />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export function ResourcesSection() {
  return (
    <section className="bg-background py-20">
      <Container>
        <SectionHeading
          title="Your Journey, Fully Supported"
          subtitle="Helpful resources and services to guide you before and during your Umrah."
          centered
        />
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {resources.map((r) => (
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
      </Container>
    </section>
  );
}

export function TrustBadges() {
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
              {trustBadges.title}
            </h2>
            <p className="text-lg text-on-surface-variant">{trustBadges.desc}</p>
            <p className="text-base font-bold text-primary">
              ({trustBadges.certificate})
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
