"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { BookingPackageOverview } from "@/components/booking/booking-package-overview";
import { CustomSelect } from "@/components/custom-select";
import { MaterialIcon } from "@/components/material-icon";
import {
  calculateBookingTotal,
  formatPKR,
  formatTravelDate,
  PAYMENT_OPTIONS,
  ROOM_OPTIONS,
  type PaymentOption,
  type RoomPreference,
  type TravelerForm,
} from "@/lib/booking";
import type { ItineraryDay, MealPlan, PackagePolicy } from "@/lib/itinerary";
import type { Package } from "@/lib/packages";
import { TIERS } from "@/lib/packages";

const GENDER_OPTIONS = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
];

type Props = {
  pkg: Package;
  days: ItineraryDay[];
  meals: MealPlan[];
  policies: PackagePolicy[];
  travelDateLabel: string;
};

export function BookingCheckoutView({
  pkg,
  days,
  meals,
  policies,
  travelDateLabel,
}: Props) {
  const [travelerCount, setTravelerCount] = useState(1);
  const [travelers, setTravelers] = useState<TravelerForm[]>([
    { name: "", gender: "", dob: "", passportNumber: "", passportExpiry: "" },
  ]);
  const [room, setRoom] = useState<RoomPreference>("quad");
  const [payment, setPayment] = useState<PaymentOption>("partial");
  const [coupon, setCoupon] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [openTraveler, setOpenTraveler] = useState(0);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [reference, setReference] = useState("");
  const [error, setError] = useState("");

  const pricing = useMemo(
    () => calculateBookingTotal(pkg, travelerCount, room),
    [pkg, travelerCount, room],
  );

  const canSubmit = useMemo(() => {
    if (!termsAccepted || status === "submitting") return false;
    const phoneOk = contactPhone.replace(/\D/g, "").length >= 10;
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactEmail.trim());
    const travelersOk = travelers.slice(0, travelerCount).every(
      (t) =>
        t.name.trim().length >= 2 &&
        t.gender &&
        t.passportNumber.trim().length >= 5,
    );
    return phoneOk && emailOk && travelersOk;
  }, [travelers, travelerCount, termsAccepted, status, contactPhone, contactEmail]);

  function updateTravelerCount(count: number) {
    setTravelerCount(count);
    setTravelers((prev) => {
      const next = [...prev];
      while (next.length < count) {
        next.push({
          name: "",
          gender: "",
          dob: "",
          passportNumber: "",
          passportExpiry: "",
        });
      }
      return next.slice(0, count);
    });
  }

  function updateTraveler(index: number, patch: Partial<TravelerForm>) {
    setTravelers((prev) =>
      prev.map((t, i) => (i === index ? { ...t, ...patch } : t)),
    );
  }

  async function handleSubmit() {
    if (!canSubmit) return;
    setStatus("submitting");
    setError("");

    const activeTravelers = travelers.slice(0, travelerCount);
    const primary = activeTravelers[0];

    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          travelerName: primary.name.trim(),
          phone: `+92 ${contactPhone.replace(/\D/g, "")}`,
          email: contactEmail.trim(),
          passportNumber: primary.passportNumber.trim(),
          travelDate: pkg.departureDate.slice(0, 10),
          groupSize: travelerCount,
          packageSlug: pkg.slug,
          departureId: pkg.departureId,
          roomPreference: room,
          paymentOption: payment,
          couponCode: coupon.trim() || undefined,
          travelers: activeTravelers,
          bookingTotal: pricing.total,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Could not submit booking. Please try again.");
        setStatus("error");
        return;
      }
      setReference(data.reference);
      setStatus("success");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setError("Network error. Please check your connection.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="mx-auto max-w-lg px-4 py-16 text-center sm:py-24">
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-primary text-on-primary">
          <MaterialIcon name="check_circle" className="text-4xl" />
        </span>
        <h1 className="mt-6 text-2xl font-bold text-tertiary">Booking Request Received</h1>
        <p className="mt-2 text-sm text-neutral">
          Reference: <strong className="text-tertiary">{reference}</strong>
        </p>
        <p className="mt-4 text-sm leading-relaxed text-neutral">
          Our team will contact you within 24 hours to confirm traveler details and
          complete {payment === "office" ? "payment at our office" : "your payment"}.
        </p>
        <Link
          href="/packages"
          className="mt-8 inline-block rounded-lg bg-primary px-8 py-3 text-sm font-semibold text-on-primary hover:bg-primary-dark"
        >
          Browse More Packages
        </Link>
      </div>
    );
  }

  return (
    <div className="min-w-0 bg-[#fafafa] pb-32 lg:pb-12">
      {/* Header strip */}
      <div className="border-b border-neutral-20 bg-white">
        <div className="mx-auto max-w-[1200px] min-w-0 px-4 py-4 sm:px-6 lg:px-8">
          <nav className="text-xs text-neutral">
            <Link href="/" className="hover:text-primary">Home</Link>
            <span className="mx-2">›</span>
            <Link href="/packages" className="hover:text-primary">Packages</Link>
            <span className="mx-2">›</span>
            <Link href={`/packages/${pkg.slug}`} className="hover:text-primary">
              {pkg.title}
            </Link>
            <span className="mx-2">›</span>
            <span className="text-tertiary">Booking</span>
          </nav>
          <div className="mt-3 flex items-start gap-3">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-primary-10">
              <MaterialIcon name="mosque" className="text-xl text-primary" />
            </span>
            <div className="min-w-0">
              <h1 className="text-xl font-bold text-tertiary sm:text-2xl">{pkg.title}</h1>
              <p className="mt-0.5 text-sm text-neutral">
                {pkg.city} · {pkg.durationDays}D / {pkg.durationNights}N ·{" "}
                {TIERS[pkg.tier].label} ({TIERS[pkg.tier].stars}-Star)
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-[1200px] min-w-0 gap-8 px-4 py-6 sm:px-6 lg:grid-cols-[1fr_340px] lg:gap-10 lg:px-8 lg:py-8">
        {/* Main column */}
        <div className="min-w-0 space-y-8">
          {/* Travelers */}
          <section className="rounded-2xl border border-neutral-20 bg-white p-4 shadow-sm sm:p-6">
            <h2 className="text-lg font-bold text-tertiary">Travelers</h2>
            <div className="mt-4 max-w-xs">
              <label className="text-xs font-semibold text-neutral">Total travelers</label>
              <CustomSelect
                variant="standalone"
                value={String(travelerCount)}
                onChange={(v) => updateTravelerCount(Number(v))}
                options={Array.from({ length: 6 }, (_, i) => ({
                  value: String(i + 1),
                  label: `${i + 1} Adult${i + 1 > 1 ? "s" : ""}`,
                }))}
              />
            </div>

            <div className="mt-5 space-y-3">
              {travelers.slice(0, travelerCount).map((traveler, i) => (
                <TravelerAccordion
                  key={i}
                  index={i}
                  traveler={traveler}
                  open={openTraveler === i}
                  onToggle={() => setOpenTraveler(openTraveler === i ? -1 : i)}
                  onChange={(patch) => updateTraveler(i, patch)}
                />
              ))}
            </div>

            <div className="mt-5 grid gap-4 border-t border-neutral-20 pt-5 sm:grid-cols-2">
              <Field label="Contact Mobile">
                <div className="flex overflow-hidden rounded-lg border border-neutral-20 bg-white focus-within:border-primary focus-within:ring-1 focus-within:ring-primary">
                  <span className="flex items-center border-r border-neutral-20 bg-secondary/50 px-3 text-sm font-semibold text-tertiary">
                    +92
                  </span>
                  <input
                    type="tel"
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    placeholder="3XX XXXXXXX"
                    className="min-w-0 flex-1 px-3 py-2.5 text-sm outline-none"
                  />
                </div>
              </Field>
              <Field label="Contact Email">
                <input
                  type="email"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  placeholder="you@email.com"
                  className={inputClass}
                />
              </Field>
            </div>
          </section>

          {/* Room preferences */}
          <section className="rounded-2xl border border-neutral-20 bg-white p-4 shadow-sm sm:p-6">
            <h2 className="text-lg font-bold text-tertiary">Room Preferences</h2>
            <p className="mt-1 text-sm text-neutral">
              Select the room type that suits your group
            </p>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {ROOM_OPTIONS.map((opt) => {
                const selected = room === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setRoom(opt.id)}
                    className={`overflow-hidden rounded-xl border-2 text-left transition-all ${
                      selected
                        ? "border-primary shadow-[0_0_0_1px_#006400]"
                        : "border-neutral-20 hover:border-primary/30"
                    }`}
                  >
                    <div className="relative h-32 w-full sm:h-36">
                      <Image
                        src={opt.image}
                        alt={opt.label}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, 280px"
                      />
                      {selected && (
                        <span className="absolute right-3 top-3 grid h-6 w-6 place-items-center rounded-full bg-primary text-on-primary">
                          <MaterialIcon name="check" className="text-sm" />
                        </span>
                      )}
                    </div>
                    <div className="p-3">
                      <p className="font-semibold text-tertiary">{opt.label}</p>
                      <p className="mt-0.5 text-xs text-neutral">{opt.desc}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </section>

          <BookingPackageOverview days={days} meals={meals} policies={policies} />
        </div>

        {/* Sidebar — desktop */}
        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <SummaryCard
              pkg={pkg}
              travelDateLabel={travelDateLabel}
              room={room}
              travelerCount={travelerCount}
              pricing={pricing}
              payment={payment}
              onPaymentChange={setPayment}
              coupon={coupon}
              onCouponChange={setCoupon}
              termsAccepted={termsAccepted}
              onTermsChange={setTermsAccepted}
              canSubmit={canSubmit}
              onSubmit={handleSubmit}
              submitting={status === "submitting"}
              error={error}
            />
          </div>
        </aside>
      </div>

      {/* Mobile bottom bar + drawer-style summary */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-neutral-20 bg-white p-4 shadow-[0_-4px_24px_rgba(0,0,0,0.08)] lg:hidden">
        {error && (
          <p className="mb-2 text-center text-xs text-red-600">{error}</p>
        )}
        <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="text-xs text-neutral">{travelerCount} traveler(s)</p>
            <p className="text-lg font-bold text-tertiary">{formatPKR(pricing.total)}</p>
          </div>
          <button
            type="button"
            disabled={!canSubmit}
            onClick={handleSubmit}
            className="shrink-0 rounded-lg bg-primary px-6 py-3 text-sm font-bold text-on-primary disabled:cursor-not-allowed disabled:opacity-50"
          >
            {status === "submitting" ? "Submitting…" : "Proceed to Payment"}
          </button>
        </div>
        <MobileSummaryExtras
          payment={payment}
          onPaymentChange={setPayment}
          coupon={coupon}
          onCouponChange={setCoupon}
          termsAccepted={termsAccepted}
          onTermsChange={setTermsAccepted}
          pricing={pricing}
        />
      </div>
    </div>
  );
}

function TravelerAccordion({
  index,
  traveler,
  open,
  onToggle,
  onChange,
}: {
  index: number;
  traveler: TravelerForm;
  open: boolean;
  onToggle: () => void;
  onChange: (patch: Partial<TravelerForm>) => void;
}) {
  const label = index === 0 ? "Primary" : `Traveler ${index + 1}`;

  return (
    <div className="overflow-hidden rounded-xl border border-neutral-20">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between px-4 py-3 text-left"
      >
        <span className="text-sm font-semibold text-tertiary">
          Traveler {index + 1} (Adult) {index === 0 && `(${label})`}
        </span>
        <MaterialIcon
          name="expand_more"
          className={`text-neutral transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div className="grid gap-4 border-t border-neutral-20 px-4 py-4 sm:grid-cols-2">
          <Field label="Full Name" className="sm:col-span-2">
            <input
              value={traveler.name}
              onChange={(e) => onChange({ name: e.target.value })}
              placeholder="As on passport"
              className={inputClass}
            />
          </Field>
          <Field label="Gender">
            <CustomSelect
              variant="standalone"
              value={traveler.gender}
              onChange={(v) => onChange({ gender: v })}
              placeholder="Select gender"
              options={GENDER_OPTIONS}
            />
          </Field>
          <Field label="Date of Birth">
            <input
              type="date"
              value={traveler.dob}
              onChange={(e) => onChange({ dob: e.target.value })}
              className={inputClass}
            />
          </Field>
          <Field label="Passport Number">
            <input
              value={traveler.passportNumber}
              onChange={(e) => onChange({ passportNumber: e.target.value })}
              placeholder="AB1234567"
              className={inputClass}
            />
          </Field>
          <Field label="Passport Expiry">
            <input
              type="date"
              value={traveler.passportExpiry}
              onChange={(e) => onChange({ passportExpiry: e.target.value })}
              className={inputClass}
            />
          </Field>
        </div>
      )}
    </div>
  );
}

function SummaryCard({
  pkg,
  travelDateLabel,
  room,
  travelerCount,
  pricing,
  payment,
  onPaymentChange,
  coupon,
  onCouponChange,
  termsAccepted,
  onTermsChange,
  canSubmit,
  onSubmit,
  submitting,
  error,
}: {
  pkg: Package;
  travelDateLabel: string;
  room: RoomPreference;
  travelerCount: number;
  pricing: ReturnType<typeof calculateBookingTotal>;
  payment: PaymentOption;
  onPaymentChange: (v: PaymentOption) => void;
  coupon: string;
  onCouponChange: (v: string) => void;
  termsAccepted: boolean;
  onTermsChange: (v: boolean) => void;
  canSubmit: boolean;
  onSubmit: () => void;
  submitting: boolean;
  error: string;
}) {
  const roomLabel = ROOM_OPTIONS.find((r) => r.id === room)?.label ?? room;

  return (
    <div className="rounded-2xl border border-neutral-20 bg-white p-5 shadow-[0_4px_24px_rgba(0,0,0,0.06)]">
      <h2 className="text-base font-bold text-tertiary">Summary Details</h2>
      <p className="mt-1 text-xs text-neutral">
        {travelerCount} Adult(s) · {roomLabel}
      </p>
      <p className="mt-0.5 text-xs text-neutral">Travel: {travelDateLabel}</p>

      <dl className="mt-5 space-y-2 text-sm">
        <div className="flex justify-between text-neutral">
          <span>Package price (per adult)</span>
          <span>{formatPKR(pricing.perPerson)}</span>
        </div>
        <div className="flex justify-between text-neutral">
          <span>Travelers</span>
          <span>× {travelerCount}</span>
        </div>
        <div className="flex justify-between text-neutral">
          <span>Subtotal</span>
          <span>{formatPKR(pricing.subtotal)}</span>
        </div>
        <div className="flex justify-between text-neutral">
          <span>Taxes &amp; fees (5%)</span>
          <span>{formatPKR(pricing.taxes)}</span>
        </div>
        <div className="flex justify-between border-t border-neutral-20 pt-2 text-base font-bold text-tertiary">
          <span>Total Amount</span>
          <span>{formatPKR(pricing.total)}</span>
        </div>
      </dl>

      <div className="mt-5 space-y-2">
        <p className="text-xs font-semibold text-tertiary">Payment options</p>
        {PAYMENT_OPTIONS.map((opt) => (
          <label
            key={opt.id}
            className={`flex cursor-pointer items-start gap-3 rounded-lg border p-3 transition-colors ${
              payment === opt.id
                ? "border-primary bg-primary-10"
                : "border-neutral-20 hover:border-primary/30"
            }`}
          >
            <input
              type="radio"
              name="payment"
              checked={payment === opt.id}
              onChange={() => onPaymentChange(opt.id)}
              className="mt-0.5 accent-primary"
            />
            <span>
              <span className="block text-sm font-semibold text-tertiary">
                {opt.label}
              </span>
              <span className="block text-xs text-neutral">
                {opt.id === "partial"
                  ? `Minimum deposit ${formatPKR(pricing.deposit)}`
                  : opt.desc}
              </span>
            </span>
          </label>
        ))}
      </div>

      <div className="mt-4">
        <label className="text-xs font-semibold text-neutral">Coupon code</label>
        <div className="mt-1.5 flex gap-2">
          <input
            value={coupon}
            onChange={(e) => onCouponChange(e.target.value)}
            placeholder="Enter code"
            className={`${inputClass} flex-1`}
          />
          <button
            type="button"
            className="shrink-0 rounded-lg border border-primary px-4 text-sm font-semibold text-primary hover:bg-primary-10"
          >
            Apply
          </button>
        </div>
      </div>

      <label className="mt-4 flex cursor-pointer items-start gap-2">
        <input
          type="checkbox"
          checked={termsAccepted}
          onChange={(e) => onTermsChange(e.target.checked)}
          className="mt-0.5 accent-primary"
        />
        <span className="text-xs text-neutral">
          I agree to the{" "}
          <Link href="/terms" className="font-medium text-primary underline">
            Terms &amp; Conditions
          </Link>{" "}
          and booking policies for {pkg.title}.
        </span>
      </label>

      {error && <p className="mt-3 text-xs text-red-600">{error}</p>}

      <button
        type="button"
        disabled={!canSubmit}
        onClick={onSubmit}
        className="mt-4 w-full rounded-lg bg-primary py-3.5 text-sm font-bold text-on-primary transition-colors hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-50"
      >
        {submitting ? "Submitting…" : "Proceed to Payment"}
      </button>

      <p className="mt-3 flex items-start gap-1 text-[10px] leading-relaxed text-neutral">
        <MaterialIcon name="info" className="mt-0.5 shrink-0 text-xs" />
        Booking amount is non-refundable once confirmed. Our team will contact you
        to complete payment.
      </p>
    </div>
  );
}

function MobileSummaryExtras({
  payment,
  onPaymentChange,
  coupon,
  onCouponChange,
  termsAccepted,
  onTermsChange,
  pricing,
}: {
  payment: PaymentOption;
  onPaymentChange: (v: PaymentOption) => void;
  coupon: string;
  onCouponChange: (v: string) => void;
  termsAccepted: boolean;
  onTermsChange: (v: boolean) => void;
  pricing: ReturnType<typeof calculateBookingTotal>;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="mx-auto mt-2 max-w-[1200px]">
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className="flex w-full items-center justify-center gap-1 text-xs font-medium text-primary"
      >
        {expanded ? "Hide" : "Show"} payment options
        <MaterialIcon
          name="expand_more"
          className={`text-sm transition-transform ${expanded ? "rotate-180" : ""}`}
        />
      </button>
      {expanded && (
        <div className="mt-3 space-y-2 border-t border-neutral-20 pt-3">
          {PAYMENT_OPTIONS.map((opt) => (
            <label
              key={opt.id}
              className={`flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-2 text-xs ${
                payment === opt.id ? "border-primary bg-primary-10" : "border-neutral-20"
              }`}
            >
              <input
                type="radio"
                checked={payment === opt.id}
                onChange={() => onPaymentChange(opt.id)}
                className="accent-primary"
              />
              <span className="font-medium text-tertiary">
                {opt.label}
                {opt.id === "partial" && ` (${formatPKR(pricing.deposit)} min)`}
              </span>
            </label>
          ))}
          <label className="flex items-start gap-2 pt-1">
            <input
              type="checkbox"
              checked={termsAccepted}
              onChange={(e) => onTermsChange(e.target.checked)}
              className="mt-0.5 accent-primary"
            />
            <span className="text-[11px] text-neutral">
              I agree to the{" "}
              <Link href="/terms" className="text-primary underline">
                Terms
              </Link>
            </span>
          </label>
        </div>
      )}
    </div>
  );
}

function Field({
  label,
  children,
  className = "",
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="text-xs font-semibold text-neutral">{label}</span>
      <div className="mt-1">{children}</div>
    </label>
  );
}

const inputClass =
  "w-full rounded-lg border border-neutral-20 bg-white px-3 py-2.5 text-sm text-tertiary outline-none transition-colors placeholder:text-neutral-40 focus:border-primary focus:ring-1 focus:ring-primary";
