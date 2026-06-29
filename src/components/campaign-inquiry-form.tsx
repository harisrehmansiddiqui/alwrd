"use client";

import { useState } from "react";

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

type Status = "idle" | "submitting" | "success" | "error";

export function CampaignInquiryForm() {
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
      <div className="rounded-2xl border border-primary/20 bg-primary/5 p-8 text-center">
        <h3 className="font-display text-xl font-bold text-ink">
          Thank you — we&apos;ll be in touch
        </h3>
        <p className="mt-2 text-sm text-slate-muted">
          Reference: <strong>{reference}</strong>. Our team will contact you on
          WhatsApp within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Full name" name="travelerName" required />
        <Field label="WhatsApp number" name="phone" type="tel" required placeholder="+92 3XX XXXXXXX" />
        <label className="block sm:col-span-1">
          <span className="mb-1.5 block text-sm font-medium text-ink">
            Preferred month <span className="text-primary">*</span>
          </span>
          <select
            name="preferredMonth"
            required
            className="w-full rounded-xl border border-black/10 bg-white px-3 py-2.5 text-sm outline-none focus:border-primary"
          >
            <option value="">Select month</option>
            {MONTHS.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </label>
        <Field
          label="Group size"
          name="groupSize"
          type="number"
          required
          min={1}
          defaultValue="1"
        />
      </div>

      {status === "error" && (
        <p className="rounded-lg bg-red-50 px-4 py-2.5 text-sm text-red-600">{error}</p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full rounded-xl bg-primary px-5 py-3.5 text-sm font-bold text-on-primary hover:bg-primary-dark disabled:opacity-60"
      >
        {status === "submitting" ? "Sending…" : "Get my Umrah quote"}
      </button>
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
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  min?: number;
  defaultValue?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-ink">
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
        className="w-full rounded-xl border border-black/10 bg-white px-3 py-2.5 text-sm outline-none focus:border-primary"
      />
    </label>
  );
}
