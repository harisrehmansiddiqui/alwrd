import Link from "next/link";
import { Logo } from "@/components/logo";
import { SocialLinks } from "@/components/social-links";
import { site } from "@/lib/site";

const columns = [
  {
    title: "Product",
    links: [
      { label: "Umrah Packages", href: "/packages" },
      { label: "Family Umrah", href: "/umrah/family" },
      { label: "Couple Umrah", href: "/umrah/couple" },
      { label: "Individual Umrah", href: "/umrah/individual" },
      { label: "Essential Du'as", href: "/resources/duas" },
      { label: "Umrah Checklist", href: "/resources/checklist" },
      { label: "eSIM Services", href: "/resources" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "How It Works", href: "/how-it-works" },
      { label: "Contact Us", href: "/contact" },
      { label: "Our Services", href: "/our-services" },
      { label: "Gallery", href: "/gallery" },
      { label: "Collaborations", href: "/collaborations" },
      { label: "Pilgrim Support", href: "/support" },
      { label: "Send Inquiry", href: "/inquiry" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "FAQ", href: "/faq" },
      { label: "Pilgrim Support", href: "/support" },
      { label: "Blog", href: "/resources" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms & Conditions", href: "/terms" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-outline-variant bg-surface-container-low">
      <div className="mx-auto grid max-w-[1280px] min-w-0 grid-cols-1 gap-8 px-4 py-20 sm:px-6 md:grid-cols-4">
        <div className="space-y-4">
          <Logo variant="black" size="footer" />
          <p className="text-xs leading-relaxed text-on-surface-variant">
            Pakistan&apos;s trusted Umrah platform — plan and book your journey
            directly, with faith, transparency, and no hidden charges.
          </p>
          <SocialLinks />
        </div>

        {columns.map((col) => (
          <div key={col.title}>
            <h4 className="mb-4 font-bold text-primary">{col.title}</h4>
            <ul className="space-y-2">
              {col.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-xs text-on-surface-variant transition-colors hover:text-primary hover:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mx-auto flex max-w-[1280px] min-w-0 flex-col items-center justify-between gap-4 border-t border-outline-variant px-4 py-6 sm:px-6 md:flex-row">
        <p className="text-xs text-on-surface-variant">
          © {new Date().getFullYear()} {site.name} Hajj & Umrah. All rights
          reserved. Licensed Hajj & Umrah operator.
        </p>
        <p className="text-xs text-on-surface-variant">{site.location}</p>
      </div>
    </footer>
  );
}
