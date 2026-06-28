import type { Package } from "@/lib/packages";
import { formatPKR } from "@/lib/packages";

export type RoomPreference = "quad" | "triple";
export type PaymentOption = "full" | "partial" | "office";

export type TravelerForm = {
  name: string;
  gender: string;
  dob: string;
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
    label: "Pay partial amount",
    desc: "Secure your seat with a minimum deposit",
  },
  {
    id: "full",
    label: "Pay full amount",
    desc: "Complete payment in one transaction",
  },
  {
    id: "office",
    label: "Pay at the office",
    desc: "Visit our Lahore office to complete payment",
  },
];

export const SERVICE_ICONS = [
  { icon: "flight", label: "Flight" },
  { icon: "hotel", label: "Hotel" },
  { icon: "directions_bus", label: "Transfer" },
  { icon: "mosque", label: "Ziyarat" },
  { icon: "badge", label: "Visa" },
  { icon: "health_and_safety", label: "Insurance" },
] as const;

export function emptyTraveler(primary = false): TravelerForm {
  return {
    name: primary ? "" : "",
    gender: "",
    dob: "",
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
