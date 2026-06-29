export type Office = {
  id: string;
  city: string;
  country: string;
  label: string;
  address: string;
  phone?: string;
  lat: number;
  lng: number;
};

export const offices: Office[] = [
  {
    id: "islamabad",
    city: "Islamabad",
    country: "Pakistan",
    label: "Head Office",
    address: "Blue Area, Islamabad, Pakistan",
    phone: "+92 307 8953816",
    lat: 33.7077,
    lng: 73.0551,
  },
  {
    id: "riyadh",
    city: "Riyadh",
    country: "Saudi Arabia",
    label: "KSA Operations",
    address: "Al Olaya District, Riyadh, Saudi Arabia",
    phone: "+966 59 571 0372",
    lat: 24.7136,
    lng: 46.6753,
  },
  {
    id: "madinah",
    city: "Madinah",
    country: "Saudi Arabia",
    label: "On-Ground Support",
    address: "Central Madinah, Saudi Arabia",
    phone: "+966 59 345 0035",
    lat: 24.4672,
    lng: 39.6111,
  },
];

export const contactPhones = [
  { label: "Pakistan", number: "+92 307 8953816" },
  { label: "Pakistan", number: "+92 303 8100786" },
  { label: "Saudi Arabia", number: "+966 59 571 0372" },
  { label: "Saudi Arabia", number: "+966 59 345 0035" },
];

export const contactEmails = [
  { label: "General inquiries", address: "info@alwrdgroup.com" },
  { label: "Pilgrim support", address: "support@alwrdgroup.com" },
];

export const team = [
  {
    name: "Leadership Team",
    role: "Strategy & pilgrim trust",
    location: "Islamabad, PK",
    desc: "Sets transparent pricing standards and oversees licensed Hajj & Umrah operations.",
  },
  {
    name: "Visa & Documentation",
    role: "Processing desk",
    location: "Islamabad, PK",
    desc: "Handles Umrah visa applications, passport checks, and pre-travel paperwork.",
  },
  {
    name: "KSA Operations",
    role: "Riyadh coordination",
    location: "Riyadh, KSA",
    desc: "Manages airline partners, hotel allocations, and airport meet-and-greet.",
  },
  {
    name: "Madinah Support",
    role: "On-ground team",
    location: "Madinah, KSA",
    desc: "24/7 pilgrim assistance, ziyarat coordination, and daily check-ins.",
  },
  {
    name: "Customer Experience",
    role: "Pakistan helpline",
    location: "Lahore · Karachi · Islamabad",
    desc: "WhatsApp, phone, and inquiry follow-up for every booking request.",
  },
];

export const globalFootprint = [
  {
    region: "Pakistan",
    cities: ["Islamabad", "Lahore", "Karachi", "Faisalabad", "Multan"],
    desc: "Departure cities, visa processing, and pre-travel orientation.",
  },
  {
    region: "Saudi Arabia",
    cities: ["Makkah", "Madinah", "Riyadh", "Jeddah"],
    desc: "Hotels near the Haram, transport, and round-the-clock pilgrim support.",
  },
];

export function mapsEmbedUrl(lat: number, lng: number): string {
  return `https://maps.google.com/maps?q=${lat},${lng}&z=14&output=embed`;
}

export function telHref(number: string): string {
  return `tel:${number.replace(/[\s-]/g, "")}`;
}
