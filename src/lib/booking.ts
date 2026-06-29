import type { Package } from "@/lib/packages";
import { formatPKR } from "@/lib/packages";
import {
  PACKAGE_OVERVIEW_TABS,
  type PackageOverviewTabId,
} from "@/lib/package-overview-tabs";

export type RoomPreference = "quad" | "triple";
export type PaymentOption = "full" | "partial" | "bank" | "jazzcash" | "office";

export type TravelerForm = {
  name: string;
  gender: string;
  dob: string;
  cnic: string;
  passportNumber: string;
  passportExpiry: string;
};

export const ROOM_OPTIONS: {
  id: RoomPreference;
  label: string;
  desc: string;
  image: string;
  multiplier: number;
}[] = [
  {
    id: "quad",
    label: "Quad Sharing",
    desc: "4 pilgrims per room — best value",
    image: "/gallery/2.jpg",
    multiplier: 1,
  },
  {
    id: "triple",
    label: "Triple Sharing",
    desc: "3 pilgrims per room — more space",
    image: "/gallery/3.jpg",
    multiplier: 1.12,
  },
];

export const PAYMENT_OPTIONS: {
  id: PaymentOption;
  label: string;
  desc: string;
}[] = [
  {
    id: "partial",
    label: "Partial deposit",
    desc: "Secure your seat — pay minimum deposit first",
  },
  {
    id: "full",
    label: "Full payment (PKR)",
    desc: "Pay the complete package amount in one go",
  },
  {
    id: "bank",
    label: "Bank transfer",
    desc: "Transfer to our Pakistani bank account (details on confirmation)",
  },
  {
    id: "jazzcash",
    label: "JazzCash / EasyPaisa",
    desc: "Pay via mobile wallet in Pakistan",
  },
  {
    id: "office",
    label: "Pay at office",
    desc: "Visit our Islamabad office to complete payment",
  },
];

export const PK_PAYMENT_INSTRUCTIONS: Record<
  "bank" | "jazzcash" | "office" | "partial" | "full",
  string
> = {
  partial:
    "Our team will share the deposit amount and payment link or account details on WhatsApp within 24 hours.",
  full: "Our team will send a payment summary and confirmed PKR total on WhatsApp.",
  bank: "Bank account details (IBAN / account title) will be shared on WhatsApp after we verify your booking request.",
  jazzcash:
    "Send your deposit to our official JazzCash / EasyPaisa merchant number — details provided on WhatsApp.",
  office:
    "Visit our Islamabad head office with your reference number and CNIC to complete payment in person.",
};

/** Normalize Pakistani mobile input to +92XXXXXXXXXX */
export function formatPakistanPhone(input: string): string {
  const digits = input.replace(/\D/g, "");
  if (digits.startsWith("92") && digits.length >= 12) {
    return `+${digits}`;
  }
  if (digits.startsWith("0")) {
    return `+92${digits.slice(1)}`;
  }
  return `+92${digits}`;
}

export function isValidPakistanMobile(input: string): boolean {
  const digits = input.replace(/\D/g, "");
  const local = digits.startsWith("92") ? digits.slice(2) : digits;
  return /^3\d{9}$/.test(local);
}

export const BOOKING_TABS = PACKAGE_OVERVIEW_TABS;
export type BookingTabId = PackageOverviewTabId;

/** @deprecated use BOOKING_TABS */
export const SERVICE_ICONS = BOOKING_TABS;

export function emptyTraveler(primary = false): TravelerForm {
  return {
    name: primary ? "" : "",
    gender: "",
    dob: "",
    cnic: "",
    passportNumber: "",
    passportExpiry: "",
  };
}

export function calculateBookingTotal(
  pkg: Package,
  travelers: number,
  room: RoomPreference,
): {
  perPerson: number;
  subtotal: number;
  taxes: number;
  total: number;
  deposit: number;
} {
  const roomOpt = ROOM_OPTIONS.find((r) => r.id === room)!;
  const perPerson = Math.round(pkg.price * roomOpt.multiplier);
  const subtotal = perPerson * travelers;
  const taxes = Math.round(subtotal * 0.05);
  const total = subtotal + taxes;
  const deposit = Math.max(50_000, Math.round(total * 0.1));

  return { perPerson, subtotal, taxes, total, deposit };
}

export function formatTravelDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export { formatPKR };
