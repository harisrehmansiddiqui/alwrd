export const site = {
  name: "Al Wrd",
  tagline: "Hajj & Umrah",
  whatsapp: "923001234567",
  phone: "+92 300 1234567",
  email: "info@alwrdgroup.com",
  location: "Lahore, Pakistan",
  socials: {
    instagram: "https://www.instagram.com/alwrdhajjumrah/",
    facebook: "https://www.facebook.com/alwrdhajjumrah",
    tiktok: "https://www.tiktok.com/@alwrdhajjumrah",
  },
};

export const mainNav = [
  { label: "Home", href: "/" },
  { label: "Group Packages", href: "/packages?featured=group" },
  { label: "Premium Packages", href: "/packages?tier=premium" },
  { label: "Contact Us", href: "/contact" },
];

export function whatsappLink(message?: string) {
  const base = `https://wa.me/${site.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
