export const site = {
  name: "Al Wrd",
  tagline: "Hajj & Umrah",
  // Update these once the client confirms the live contact details.
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
  { label: "Our Services", href: "/our-services" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "Contact", href: "/contact" },
  { label: "Book Your Umrah", href: "/packages" },
  { label: "Blog & Resources", href: "/resources" },
];

export function whatsappLink(message?: string) {
  const base = `https://wa.me/${site.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
