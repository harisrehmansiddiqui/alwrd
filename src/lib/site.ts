export const site = {
  name: "Al Wrd",
  tagline: "Hajj & Umrah",
  whatsapp: "923001234567",
  phone: "+92 300 1234567",
  email: "info@alwrdgroup.com",
  location: "Lahore, Pakistan",
  socials: {
    facebook: "https://facebook.com",
    instagram: "https://instagram.com",
    tiktok: "https://tiktok.com",
  },
};

export const mainNav = [
  { label: "Home", href: "/" },
  { label: "Group Packages", href: "/packages?type=group" },
  { label: "Premium Packages", href: "/packages?tier=premium" },
  { label: "Contact Us", href: "/contact" },
];

export function whatsappLink(message?: string) {
  const base = `https://wa.me/${site.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
