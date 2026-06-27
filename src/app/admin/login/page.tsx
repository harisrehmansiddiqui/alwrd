import type { Metadata } from "next";
import { LoginForm } from "./login-form";

export const metadata: Metadata = {
  title: "Admin Login",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <div className="grid min-h-screen place-items-center bg-surface-tint px-4">
      <div className="w-full max-w-sm rounded-2xl border border-black/5 bg-white p-8 shadow-card">
        <h1 className="font-display text-2xl font-bold text-brand-heading">
          Al Wrd Admin
        </h1>
        <p className="mt-1 text-sm text-slate-muted">
          Sign in to manage packages and inquiries.
        </p>
        <div className="mt-6">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
