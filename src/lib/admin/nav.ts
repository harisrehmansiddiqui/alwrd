export type AdminNavItem = {
  label: string;
  href: string;
  section?: string;
};

export const adminNav: AdminNavItem[] = [
  { label: "Dashboard", href: "/admin" },
  { label: "Packages", href: "/admin/packages" },
  { label: "Inquiries", href: "/admin/inquiries" },
  { label: "Site images", href: "/admin/media", section: "Content" },
  { label: "Banners", href: "/admin/banners", section: "Content" },
  { label: "Testimonials", href: "/admin/testimonials", section: "Content" },
  { label: "FAQs", href: "/admin/faqs", section: "Content" },
  { label: "Trust stats", href: "/admin/stats", section: "Content" },
  { label: "Partner logos", href: "/admin/partners", section: "Content" },
  { label: "Resources", href: "/admin/resources", section: "Site" },
  { label: "Legal pages", href: "/admin/legal", section: "Site" },
  { label: "Site settings", href: "/admin/settings", section: "Site" },
  { label: "Admin users", href: "/admin/users", section: "Site" },
];
