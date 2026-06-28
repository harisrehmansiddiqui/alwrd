import type { Metadata } from "next";
import Image from "next/image";
import { LoginForm } from "@/components/auth/login-form";

export const metadata: Metadata = {
  title: "Login",
  description: "Sign in to plan, book and track your Umrah with Al Wrd.",
};

export default function LoginPage() {
  return (
    <div className="flex min-h-[100dvh] flex-col lg:grid lg:grid-cols-2">
      {/* Mobile / tablet hero */}
      <div className="relative h-40 shrink-0 sm:h-52 lg:hidden">
        <Image
          src="/gallery/2.jpg"
          alt="Masjid an-Nabawi, Madinah"
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/40" />
      </div>

      <LoginForm />

      {/* Desktop side panel */}
      <div className="relative hidden min-h-[100dvh] lg:block">
        <Image
          src="/gallery/2.jpg"
          alt="Masjid an-Nabawi, Madinah"
          fill
          className="object-cover"
          sizes="50vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
        <div className="absolute bottom-12 left-10 right-10 text-white">
          <p className="text-sm font-medium uppercase tracking-wider text-white/80">
            Al Wrd Hajj & Umrah
          </p>
          <p className="mt-2 max-w-md text-2xl font-bold leading-tight">
            Transparent booking. No agents. No hidden charges.
          </p>
        </div>
      </div>
    </div>
  );
}
