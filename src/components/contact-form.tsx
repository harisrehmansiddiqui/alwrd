"use client";

import { useMemo, useState } from "react";

type Status = "idle" | "submitting" | "success" | "error";

const fieldLabel =
  "text-sm font-medium text-[#344054]";
const fieldInput =
  "mt-1.5 w-full rounded-lg border border-[#D0D5DD] bg-white px-3.5 py-3 text-base font-medium text-tertiary outline-none transition-colors placeholder:font-normal placeholder:text-[#667085] focus:border-primary focus:ring-2 focus:ring-primary/15";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [reference, setReference] = useState("");
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const canSubmit = useMemo(() => {
    if (status === "submitting") return false;
    return (
      name.trim().length >= 2 &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) &&
      phone.replace(/\D/g, "").length >= 7 &&
      message.trim().length >= 3
    );
  }, [name, email, phone, message, status]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!canSubmit) return;

    setStatus("submitting");
    setError("");

    const payload = {
      travelerName: name.trim(),
      email: email.trim(),
      phone: `+92 ${phone.trim()}`,
      groupSize: 1,
      specialRequests: message.trim(),
    };

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
      <div className="rounded-2xl border border-primary-20 bg-primary-10 p-8 text-center">
        <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-primary text-on-primary">
          <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current" aria-hidden>
            <path d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z" />
          </svg>
        </span>
        <h3 className="mt-4 text-xl font-bold text-tertiary">
          Request Submitted Successfully
        </h3>
        <p className="mt-2 text-sm text-neutral">
          Your reference is <strong className="text-tertiary">{reference}</strong>.
          Our Umrah experts will get in touch with you shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="mt-5 space-y-6 lg:mt-12">
      <div>
        <label htmlFor="contact-name" className={fieldLabel}>
          Full name
        </label>
        <input
          id="contact-name"
          name="travelerName"
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={fieldInput}
          placeholder="Enter your full name"
        />
      </div>

      <div>
        <label htmlFor="contact-email" className={fieldLabel}>
          Email
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={fieldInput}
          placeholder="Enter your email address"
        />
      </div>

      <div>
        <label htmlFor="contact-phone" className={fieldLabel}>
          Phone Number
        </label>
        <div className="mt-1.5 flex overflow-hidden rounded-lg border border-[#D0D5DD] bg-white transition-colors focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/15">
          <span className="flex items-center border-r border-[#D0D5DD] px-3.5 py-3 text-base text-tertiary">
            +92
          </span>
          <input
            id="contact-phone"
            name="phone"
            type="tel"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="min-w-0 flex-1 px-3.5 py-3 text-base font-medium text-tertiary outline-none placeholder:font-normal placeholder:text-[#667085]"
            placeholder="300 1234567"
          />
        </div>
      </div>

      <div>
        <label htmlFor="contact-message" className={fieldLabel}>
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={`${fieldInput} resize-none`}
          placeholder="Write your message here...."
        />
      </div>

      {status === "error" && (
        <p className="rounded-lg bg-red-50 px-4 py-2.5 text-sm text-error">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={!canSubmit}
        className={`mt-1.5 w-full rounded-lg px-5 py-3 text-sm font-semibold transition-colors lg:text-base ${
          canSubmit
            ? "bg-primary text-on-primary hover:bg-primary-dark"
            : "cursor-not-allowed bg-[#D0D5DD] text-white"
        }`}
      >
        {status === "submitting" ? "Submitting…" : "Submit Request"}
      </button>
    </form>
  );
}
