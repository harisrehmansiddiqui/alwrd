import Link from "next/link";
import { whatsappLink } from "@/lib/site";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-ink">
      {/* Drop a real hero photo at /public/hero.jpg and it layers over this gradient. */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-60"
        style={{ backgroundImage: "url('/hero.jpg')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/80" />
      <div
        className="absolute left-1/2 top-1/3 h-72 w-72 -translate-x-1/2 rounded-full opacity-30 blur-3xl"
        style={{ background: "radial-gradient(circle, #e0a92e, transparent 70%)" }}
      />

      <div className="relative mx-auto max-w-4xl px-4 py-24 text-center sm:px-6 sm:py-32">
        <h1 className="font-display text-4xl font-extrabold uppercase leading-tight text-white sm:text-5xl md:text-6xl">
          Your Trusted Partner for a Peaceful Umrah
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-base text-white/80 sm:text-lg">
          Complete Umrah packages from Pakistan including fast visa processing,
          premium hotels near the Haram, authentic meals, and private transport.
        </p>
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/packages"
            className="rounded-xl bg-brand px-7 py-3.5 text-sm font-semibold text-white shadow-lg transition-colors hover:bg-brand-deep"
          >
            Book Your Umrah Now
          </Link>
          <a
            href={whatsappLink("Assalamu alaikum, I'd like to know more about your Umrah packages.")}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl border border-white/25 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-white/10"
          >
            WhatsApp Support
          </a>
        </div>
      </div>
    </section>
  );
}
