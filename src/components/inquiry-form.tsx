"use client";

import { useState } from "react";

type Status = "idle" | "submitting" | "success" | "error";

export function InquiryForm({ packageSlug }: { packageSlug?: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [reference, setReference] = useState("");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setError("");

    const form = new FormData(e.currentTarget);
    const payload = Object.fromEntries(form.entries());

    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
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
      setError("Network error. Please check your connection and try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-brand/20 bg-brand-pill p-8 text-center">
        <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-brand text-white">
          <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current">
            <path d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z" />
          </svg>
        </span>
        <h3 className="mt-4 font-display text-xl font-bold text-brand-heading">
          High-Quality Lead Received
        </h3>
        <p className="mt-2 text-sm text-ink/80">
          Your reference is <strong>{reference}</strong>. Our team will contact
          you shortly on WhatsApp or phone to confirm availability and details.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {packageSlug && (
        <input type="hidden" name="packageSlug" value={packageSlug} />
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <Input name="travelerName" label="Full name" required />
        <Input name="phone" label="Phone / WhatsApp" type="tel" required />
        <Input name="email" label="Email" type="email" required />
        <Input name="passportNumber" label="Passport number (optional)" />
        <Input name="travelDate" label="Preferred travel date" type="date" />
        <Input
          name="groupSize"
          label="Group size"
          type="number"
          defaultValue="1"
          min={1}
          required
        />
      </div>

      <label className="block">
        <span className="mb-1.5 block text-sm font-medium text-ink">
          Special requests (optional)
        </span>
        <textarea
          name="specialRequests"
          rows={3}
          className="w-full rounded-xl border border-black/10 px-3 py-2.5 text-sm outline-none focus:border-brand"
          placeholder="Hotel preference, wheelchair assistance, meal notes…"
        />
      </label>

      {status === "error" && (
        <p className="rounded-lg bg-red-50 px-4 py-2.5 text-sm text-red-600">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full rounded-xl bg-brand px-5 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-brand-deep disabled:opacity-60"
      >
        {status === "submitting" ? "Submitting…" : "Submit Inquiry"}
      </button>
    </form>
  );
}

function Input({
  name,
  label,
  type = "text",
  required,
  defaultValue,
  min,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  defaultValue?: string;
  min?: number;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-ink">
        {label}
        {required && <span className="text-brand"> *</span>}
      </span>
      <input
        name={name}
        type={type}
        required={required}
        defaultValue={defaultValue}
        min={min}
        className="w-full rounded-xl border border-black/10 px-3 py-2.5 text-sm outline-none focus:border-brand"
      />
    </label>
  );
}
