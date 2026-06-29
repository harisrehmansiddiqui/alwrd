import Link from "next/link";
import { Logo } from "@/components/logo";
import { SocialLinks } from "@/components/social-links";
import { MaterialIcon } from "@/components/material-icon";
import { site } from "@/lib/site";

const FOOTER_LINKS = {
  services: [
    { label: "Group Packages", href: "/packages?featured=group" },
    { label: "Family Umrah", href: "/umrah/family" },
    { label: "Couple Umrah", href: "/umrah/couple" },
    { label: "Individual Umrah", href: "/umrah/individual" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Contact Us", href: "/contact" },
    { label: "How It Works", href: "/how-it-works" },
  ],
  legal: [
    { label: "Terms of Service", href: "/terms" },
    { label: "Privacy Policy", href: "/privacy" },
  ],
};

export function CampaignFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-tertiary px-4 py-16 text-on-tertiary sm:px-6 lg:py-24">
      <div className="mx-auto flex max-w-[1200px] flex-col items-start justify-between gap-12 md:flex-row">
        <div className="max-w-sm">
          <Logo variant="green" size="footer" />
          <p className="mt-6 text-sm leading-relaxed opacity-80">
            © {year} {site.name} Smart Umrah System. All rights reserved.
            Pakistan&apos;s first technology-enabled Umrah provider — transparent
            pricing and 24/7 pilgrim support.
          </p>
          <SocialLinks className="mt-6" />
        </div>

        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 sm:gap-12">
          <div>
            <h5 className="mb-4 text-xs font-bold uppercase tracking-wider text-primary-30">
              Services
            </h5>
            <ul className="space-y-3 text-sm">
              {FOOTER_LINKS.services.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="opacity-80 hover:text-primary-30">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h5 className="mb-4 text-xs font-bold uppercase tracking-wider text-primary-30">
              Company
            </h5>
            <ul className="space-y-3 text-sm">
              {FOOTER_LINKS.company.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="opacity-80 hover:text-primary-30">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <h5 className="mb-4 text-xs font-bold uppercase tracking-wider text-primary-30">
              Legal
            </h5>
            <ul className="space-y-3 text-sm">
              {FOOTER_LINKS.legal.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="opacity-80 hover:text-primary-30">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-16 flex max-w-[1200px] flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 md:flex-row">
        <div className="flex flex-wrap items-center gap-6 text-xs opacity-80">
          <span className="flex items-center gap-2">
            <MaterialIcon name="location_on" className="text-primary-30" />
            Islamabad, Pakistan
          </span>
          <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="flex items-center gap-2 hover:text-primary-30">
            <MaterialIcon name="phone" className="text-primary-30" />
            {site.phone}
          </a>
        </div>
        <p className="text-xs opacity-60">Be Blessed · Be Budgeted · Be Balanced</p>
      </div>
    </footer>
  );
}
