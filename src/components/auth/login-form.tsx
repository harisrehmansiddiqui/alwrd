"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Logo } from "@/components/logo";
import { MaterialIcon } from "@/components/material-icon";

type Step = "phone" | "otp";

export function LoginForm() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const phoneDigits = phone.replace(/\D/g, "");
  const canSendOtp = phoneDigits.length >= 10;
  const otpValue = otp.join("");
  const canVerify = otpValue.length === 6;

  function handleSendOtp(e: React.FormEvent) {
    e.preventDefault();
    if (!canSendOtp) return;
    setError("");
    setLoading(true);
    window.setTimeout(() => {
      setLoading(false);
      setStep("otp");
    }, 800);
  }

  function handleVerifyOtp(e: React.FormEvent) {
    e.preventDefault();
    if (!canVerify) return;
    setError("");
    setLoading(true);
    window.setTimeout(() => {
      setLoading(false);
      router.push("/packages?login=success");
    }, 900);
  }

  function handleOtpChange(index: number, value: string) {
    const digit = value.replace(/\D/g, "").slice(-1);
    const next = [...otp];
    next[index] = digit;
    setOtp(next);
    if (digit && index < 5) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  }

  function handleOtpKeyDown(index: number, e: React.KeyboardEvent) {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`)?.focus();
    }
  }

  return (
    <div className="flex flex-1 flex-col lg:min-h-[100dvh]">
      <header className="px-6 py-5 sm:px-10">
        <Logo variant="black" size="header" />
      </header>

      <div className="flex flex-1 flex-col items-center justify-center px-6 pb-8 sm:px-10">
        <div className="w-full max-w-[400px]">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-primary-10">
            <MaterialIcon name="mosque" className="text-3xl text-primary" />
          </div>

          <h1 className="mt-6 text-center text-2xl font-bold text-tertiary sm:text-[28px]">
            {step === "phone" ? "Log In to Continue" : "Verify OTP"}
          </h1>
          <p className="mt-2 text-center text-sm text-neutral">
            {step === "phone"
              ? "Plan, Book & Track Your Umrah"
              : `Enter the 6-digit code sent to +92 ${phoneDigits}`}
          </p>

          {step === "phone" ? (
            <form onSubmit={handleSendOtp} className="mt-8">
              <label className="text-sm font-medium text-neutral">
                Enter Mobile Number
              </label>
              <div className="mt-2 flex overflow-hidden rounded-xl border border-neutral-20 bg-white transition-colors focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/15">
                <span className="flex items-center border-r border-neutral-20 bg-secondary/50 px-4 text-sm font-semibold text-tertiary">
                  +92
                </span>
                <input
                  type="tel"
                  inputMode="numeric"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/[^\d\s-]/g, ""))}
                  placeholder="3XX XXXXXXX"
                  className="min-w-0 flex-1 px-4 py-3.5 text-base text-tertiary outline-none placeholder:text-neutral-40"
                  autoComplete="tel"
                />
              </div>

              {error && <p className="mt-2 text-sm text-red-600">{error}</p>}

              <button
                type="submit"
                disabled={!canSendOtp || loading}
                className="mt-6 w-full rounded-xl bg-primary py-3.5 text-sm font-semibold text-on-primary transition-colors hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? "Sending…" : "Get OTP"}
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="mt-8">
              <div className="flex justify-center gap-2 sm:gap-3">
                {otp.map((digit, i) => (
                  <input
                    key={i}
                    id={`otp-${i}`}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(i, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(i, e)}
                    className="h-12 w-10 rounded-lg border border-neutral-20 text-center text-lg font-bold text-tertiary outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/15 sm:h-14 sm:w-12"
                  />
                ))}
              </div>

              {error && <p className="mt-3 text-center text-sm text-red-600">{error}</p>}

              <button
                type="submit"
                disabled={!canVerify || loading}
                className="mt-6 w-full rounded-xl bg-primary py-3.5 text-sm font-semibold text-on-primary transition-colors hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? "Verifying…" : "Verify & Continue"}
              </button>

              <button
                type="button"
                onClick={() => {
                  setStep("phone");
                  setOtp(["", "", "", "", "", ""]);
                }}
                className="mt-4 w-full text-sm font-medium text-primary hover:underline"
              >
                Change number
              </button>
            </form>
          )}

          <p className="mt-8 text-center text-xs text-neutral">
            By continuing, you agree to our{" "}
            <a href="/terms" className="font-medium text-primary underline">
              Terms
            </a>{" "}
            and{" "}
            <a href="/privacy" className="font-medium text-primary underline">
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>

      <footer className="px-6 py-4 text-center text-[11px] text-neutral sm:px-10">
        © {new Date().getFullYear()} Al Wrd Hajj & Umrah. All rights reserved.
      </footer>
    </div>
  );
}
