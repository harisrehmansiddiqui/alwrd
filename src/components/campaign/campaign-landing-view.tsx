import Image from "next/image";
import Link from "next/link";
import { CampaignInquiryForm } from "@/components/campaign-inquiry-form";
import { CampaignFooter } from "@/components/campaign/campaign-footer";
import { CampaignNav } from "@/components/campaign/campaign-nav";
import { MaterialIcon } from "@/components/material-icon";
import {
  CAMPAIGN_ADVANTAGES,
  CAMPAIGN_PACKAGES,
  CAMPAIGN_PLANNING_FEATURES,
  formatCampaignPrice,
} from "@/lib/campaign-landing";
import { partnerLogos, stats } from "@/lib/content";

export function CampaignLandingView() {
  const pilgrimsStat = stats.find((s) => s.label.includes("Pilgrim")) ?? stats[0];

  return (
    <div className="scroll-smooth bg-background">
      <CampaignNav />
      <main className="pt-20">
        {/* Hero */}
        <section className="relative flex min-h-[600px] items-center overflow-hidden lg:min-h-[870px]">
          <Image
            src="/hero.jpg"
            alt="The Holy Kaaba in Makkah at golden hour"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/85 via-primary/45 to-transparent" />
          <div className="relative z-10 mx-auto w-full max-w-[1200px] px-4 sm:px-6">
            <div className="max-w-2xl text-on-primary">
              <span className="mb-6 inline-block rounded-full border border-primary-30/40 bg-primary-20/30 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-primary-10 backdrop-blur-sm sm:text-sm">
                Pakistan&apos;s 1st Tech-Enabled Umrah Experience
              </span>
              <h1 className="text-4xl font-heavy leading-tight sm:text-5xl lg:text-[56px] lg:leading-[64px]">
                Your Sacred Journey,{" "}
                <span className="text-primary-20">Simplified.</span>
              </h1>
              <p className="mt-6 max-w-lg text-lg leading-relaxed opacity-90">
                Al Wrd brings transparency and technology to your pilgrimage. Manage
                your Umrah through our smart system with real-time updates and 24/7
                support.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  href="#packages"
                  className="inline-flex items-center gap-2 rounded-lg bg-primary-20 px-8 py-4 text-sm font-bold text-on-primary-container transition-transform hover:scale-105"
                >
                  Explore Packages
                  <MaterialIcon name="arrow_forward" />
                </Link>
                <Link
                  href="#planning"
                  className="rounded-lg border border-white/30 bg-white/10 px-8 py-4 text-sm font-bold text-white backdrop-blur-md transition-all hover:bg-white/20"
                >
                  Learn How It Works
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Planning */}
        <section className="bg-surface py-20 lg:py-24" id="planning">
          <div className="mx-auto grid max-w-[1200px] items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2 className="text-2xl font-bold leading-tight text-primary sm:text-[32px] sm:leading-10">
                Plan with Alwrd — Pakistan&apos;s 1st Smart Umrah System
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-on-surface-variant">
                We&apos;ve eliminated the traditional stress of Umrah planning. Our
                digital-first approach ensures you have every detail — from flights to
                hotel rooms — at your fingertips before you even leave home.
              </p>
              <ul className="mt-8 space-y-5">
                {CAMPAIGN_PLANNING_FEATURES.map((item) => (
                  <li key={item.title} className="flex items-start gap-4">
                    <MaterialIcon name={item.icon} className="mt-0.5 shrink-0 text-primary" />
                    <div>
                      <h4 className="text-sm font-bold text-primary">{item.title}</h4>
                      <p className="mt-1 text-base text-on-surface-variant">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <div className="relative aspect-square overflow-hidden rounded-xl border-4 border-white campaign-soft-float">
                <Image
                  src="/gallery/4.jpg"
                  alt="Al Wrd digital Umrah planning on mobile"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 560px"
                />
              </div>
              <div className="campaign-glass campaign-soft-float absolute -bottom-6 -left-6 hidden max-w-xs rounded-xl p-6 lg:block">
                <p className="text-2xl font-bold text-primary">100%</p>
                <p className="text-xs font-bold uppercase tracking-wider text-primary">
                  Transparency Guaranteed
                </p>
                <p className="mt-2 text-sm text-on-surface-variant">
                  Every booking is registered with the Ministry of Hajj &amp; Umrah.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Packages */}
        <section className="bg-surface-container-low py-20 lg:py-24" id="packages">
          <div className="mx-auto max-w-[1200px] px-4 text-center sm:px-6">
            <h2 className="text-2xl font-bold text-primary sm:text-[32px]">
              Curated Sacred Journeys
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-on-surface-variant">
              Choose the experience that fits your spiritual needs. Every package
              includes our signature Smart assistance.
            </p>
          </div>
          <div className="mx-auto mt-12 grid max-w-[1200px] gap-8 px-4 sm:px-6 md:grid-cols-3 md:items-end">
            {CAMPAIGN_PACKAGES.map((pkg) => (
              <article
                key={pkg.id}
                className={`group overflow-hidden rounded-xl border bg-surface-container-lowest transition-all hover:-translate-y-2 hover:shadow-xl ${
                  pkg.featured
                    ? "relative z-10 scale-100 border-2 border-primary campaign-soft-float md:scale-105"
                    : "border-outline-variant"
                }`}
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={pkg.image}
                    alt={pkg.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="400px"
                  />
                  {pkg.badge && (
                    <span className="absolute left-4 top-4 rounded-full bg-primary px-3 py-1 text-[10px] font-bold uppercase text-on-primary">
                      {pkg.badge}
                    </span>
                  )}
                </div>
                <div className="p-8">
                  <div className="mb-4 flex items-start justify-between gap-3">
                    <h3 className="text-xl font-bold text-primary">{pkg.title}</h3>
                    <span className="shrink-0 font-bold text-primary">
                      {formatCampaignPrice(pkg.price)}
                    </span>
                  </div>
                  <p className="mb-6 text-sm text-on-surface-variant">{pkg.desc}</p>
                  <ul className="mb-8 space-y-3">
                    {pkg.features.map((f) => (
                      <li
                        key={f.label}
                        className="flex items-center gap-2 text-sm text-on-surface-variant"
                      >
                        <MaterialIcon name={f.icon} className="text-base text-primary" />
                        {f.label}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={pkg.href}
                    className={`block w-full rounded-lg py-3.5 text-center text-sm font-bold transition-colors ${
                      pkg.featured
                        ? "bg-primary py-4 text-on-primary shadow-lg hover:opacity-90"
                        : "border-2 border-primary text-primary hover:bg-primary hover:text-on-primary"
                    }`}
                  >
                    {pkg.cta}
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Advantages */}
        <section className="bg-surface py-20 lg:py-24">
          <div className="mx-auto max-w-[1200px] px-4 text-center sm:px-6">
            <h2 className="text-2xl font-bold text-primary sm:text-[32px]">
              The Al Wrd Advantage
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-on-surface-variant">
              Standard with every package. No compromises.
            </p>
          </div>
          <div className="mx-auto mt-12 grid max-w-[1200px] grid-cols-2 gap-6 px-4 sm:px-6 lg:grid-cols-4 lg:gap-8">
            {CAMPAIGN_ADVANTAGES.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="group rounded-xl border border-outline-variant bg-surface-container-lowest p-6 text-center transition-colors duration-500 hover:border-primary lg:p-8"
              >
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary-10 text-primary transition-all group-hover:bg-primary group-hover:text-on-primary">
                  <MaterialIcon name={item.icon} className="text-3xl" />
                </div>
                <h4 className="text-lg font-bold text-primary">{item.title}</h4>
                <p className="mt-2 text-sm text-on-surface-variant">{item.desc}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Inquiry */}
        <section className="relative overflow-hidden bg-primary py-20 lg:py-24" id="inquiry">
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: "radial-gradient(#82db6f 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
          <div className="relative z-10 mx-auto max-w-[1200px] px-4 sm:px-6">
            <div className="flex flex-col items-center gap-12 lg:flex-row lg:gap-16">
              <div className="flex-1 text-on-primary">
                <h2 className="text-3xl font-heavy leading-tight sm:text-4xl lg:text-[56px] lg:leading-[64px]">
                  Start Your Journey Today
                </h2>
                <p className="mt-6 max-w-lg text-lg leading-relaxed text-primary-10 opacity-90">
                  Request a personalized quote and let our smart system handle the
                  complexity of your spiritual journey.
                </p>
                <div className="mt-10 grid grid-cols-2 gap-8">
                  <div>
                    <p className="text-2xl font-bold text-primary-20">{pilgrimsStat.value}</p>
                    <p className="text-xs uppercase tracking-widest opacity-70">
                      {pilgrimsStat.label}
                    </p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-primary-20">100%</p>
                    <p className="text-xs uppercase tracking-widest opacity-70">
                      Verified Hotels
                    </p>
                  </div>
                </div>
              </div>
              <div className="w-full max-w-xl flex-1">
                <div className="rounded-xl bg-surface-container-lowest p-8 campaign-soft-float sm:p-10">
                  <CampaignInquiryForm variant="landing" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Trust */}
        <section className="border-b border-outline-variant bg-surface-container-low py-12">
          <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
            <div className="flex flex-wrap items-center justify-center gap-10 opacity-60 grayscale transition-all duration-500 hover:grayscale-0 sm:gap-12">
              {partnerLogos.map((name) => (
                <span
                  key={name}
                  className="text-lg font-bold text-on-surface-variant sm:text-xl"
                >
                  {name}
                </span>
              ))}
              <span className="flex items-center gap-2 text-sm font-semibold text-primary">
                <MaterialIcon name="verified" />
                Licensed Operator — Pakistan
              </span>
            </div>
          </div>
        </section>
      </main>
      <CampaignFooter />
    </div>
  );
}
