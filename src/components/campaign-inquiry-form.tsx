"use client";

import { useState } from "react";

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

type Status = "idle" | "submitting" | "success" | "error";

export function CampaignInquiryForm({ variant = "default" }: { variant?: "default" | "landing" }) {
  const isLanding = variant === "landing";
  const [status, setStatus] = useState<Status>("idle");
  const [reference, setReference] = useState("");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setError("");

    const form = new FormData(e.currentTarget);
    const name = String(form.get("travelerName") ?? "").trim();
    const phone = String(form.get("phone") ?? "").trim();
    const month = String(form.get("preferredMonth") ?? "").trim();
    const groupSize = Number(form.get("groupSize") ?? 1);
    const phoneDigits = phone.replace(/\D/g, "").slice(-10);

    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          travelerName: name,
          phone,
          email: `lead.${phoneDigits || Date.now()}@inquiry.alwrdgroup.com`,
          groupSize,
          specialRequests: month ? `Preferred travel month: ${month}` : "",
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }
      setReference(data.reference);
      setStatus("success");
    } catch {
      setError("Network error. Please check your connection.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        className={`text-center ${isLanding ? "p-4" : "rounded-2xl border border-primary/20 bg-primary/5 p-8"}`}
      >
        <h3 className="font-display text-xl font-bold text-primary">
          Thank you — we&apos;ll be in touch
        </h3>
        <p className="mt-2 text-sm text-on-surface-variant">
          Reference: <strong>{reference}</strong>. Our team will contact you on
          WhatsApp within 24 hours.
        </p>
      </div>
    );
  }

  const fieldClass = isLanding
    ? "w-full rounded-lg border border-outline-variant bg-white px-3 py-3 text-sm outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
    : "w-full rounded-xl border border-black/10 bg-white px-3 py-2.5 text-sm outline-none focus:border-primary";

  const labelClass = isLanding
    ? "mb-2 block text-sm font-semibold text-primary"
    : "mb-1.5 block text-sm font-medium text-ink";

  return (
    <form onSubmit={onSubmit} className={isLanding ? "space-y-6" : "space-y-4"}>
      {isLanding ? (
        <>
          <label className="block">
            <span className={labelClass}>
              Full Name <span className="text-primary">*</span>
            </span>
            <input
              name="travelerName"
              required
              placeholder="Enter your name"
              className={fieldClass}
            />
          </label>
          <label className="block">
            <span className={labelClass}>
              WhatsApp Number <span className="text-primary">*</span>
            </span>
            <input
              name="phone"
              type="tel"
              required
              placeholder="+92 3XX XXXXXXX"
              className={fieldClass}
            />
          </label>
          <div className="grid grid-cols-2 gap-4">
            <label className="block">
              <span className={labelClass}>
                Preferred Month <span className="text-primary">*</span>
              </span>
              <select name="preferredMonth" required className={fieldClass}>
                <option value="">Select month</option>
                {MONTHS.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className={labelClass}>
                Group Size <span className="text-primary">*</span>
              </span>
              <input
                name="groupSize"
                type="number"
                required
                min={1}
                defaultValue={2}
                className={fieldClass}
              />
            </label>
          </div>
        </>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Full name" name="travelerName" required fieldClass={fieldClass} labelClass={labelClass} />
          <Field label="WhatsApp number" name="phone" type="tel" required placeholder="+92 3XX XXXXXXX" fieldClass={fieldClass} labelClass={labelClass} />
          <label className="block sm:col-span-1">
            <span className={labelClass}>
              Preferred month <span className="text-primary">*</span>
            </span>
            <select name="preferredMonth" required className={fieldClass}>
              <option value="">Select month</option>
              {MONTHS.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </label>
          <Field label="Group size" name="groupSize" type="number" required min={1} defaultValue="1" fieldClass={fieldClass} labelClass={labelClass} />
        </div>
      )}

      {status === "error" && (
        <p className="rounded-lg bg-red-50 px-4 py-2.5 text-sm text-red-600">{error}</p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className={
          isLanding
            ? "w-full rounded-lg bg-primary py-4 text-lg font-bold text-on-primary shadow-lg transition-opacity hover:opacity-90 disabled:opacity-60"
            : "w-full rounded-xl bg-primary px-5 py-3.5 text-sm font-bold text-on-primary hover:bg-primary-dark disabled:opacity-60"
        }
      >
        {status === "submitting"
          ? "Sending…"
          : isLanding
            ? "Request a Quote"
            : "Get my Umrah quote"}
      </button>
      {isLanding && (
        <p className="text-center text-xs text-on-surface-variant">
          We typically respond within 15 minutes.
        </p>
      )}
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  placeholder,
  min,
  defaultValue,
  fieldClass,
  labelClass,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  min?: number;
  defaultValue?: string;
  fieldClass: string;
  labelClass: string;
}) {
  return (
    <label className="block">
      <span className={labelClass}>
        {label}
        {required && <span className="text-primary"> *</span>}
      </span>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        min={min}
        defaultValue={defaultValue}
        className={fieldClass}
      />
    </label>
  );
}
