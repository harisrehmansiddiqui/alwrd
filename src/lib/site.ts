export const site = {
  name: "Al Wrd",
  tagline: "Hajj & Umrah",
  whatsapp: "923078953816",
  phone: "+92 307 8953816",
  email: "info@alwrdgroup.com",
  supportEmail: "support@alwrdgroup.com",
  location: "Islamabad, Pakistan",
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
