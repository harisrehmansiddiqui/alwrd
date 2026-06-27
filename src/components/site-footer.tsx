import Link from "next/link";
import { Logo } from "@/components/logo";
import { site } from "@/lib/site";

const columns = [
  {
    title: "Packages",
    links: [
      { label: "All Umrah Packages", href: "/packages" },
      { label: "Group Packages", href: "/packages?type=group" },
      { label: "Family Packages", href: "/packages?type=family" },
      { label: "Couple Packages", href: "/packages?type=couple" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "How It Works", href: "/how-it-works" },
      { label: "Our Services", href: "/our-services" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Essential Du'as", href: "/resources/duas" },
      { label: "Umrah Checklist", href: "/resources/checklist" },
      { label: "Blog", href: "/resources" },
      { label: "FAQ", href: "/faq" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Terms of Service", href: "/terms" },
      { label: "Privacy Policy", href: "/privacy" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="bg-brand-deep text-white">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_repeat(4,1fr)]">
          <div>
            <Logo light />
            <p className="mt-4 max-w-xs text-sm text-white/70">
              Complete Umrah packages from Pakistan — fast visa, premium hotels
              near the Haram, authentic meals and private transport.
            </p>
            <div className="mt-5 flex gap-3">
              <SocialIcon href={site.socials.facebook} label="Facebook">
                <path d="M13 22v-8h2.7l.4-3H13V9c0-.9.3-1.5 1.6-1.5H16V4.9c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.5-4 4.1V11H7v3h2.6v8H13z" />
              </SocialIcon>
              <SocialIcon href={site.socials.instagram} label="Instagram">
                <path d="M12 8.8A3.2 3.2 0 1 0 12 15.2 3.2 3.2 0 0 0 12 8.8zm0 5.3a2.1 2.1 0 1 1 0-4.2 2.1 2.1 0 0 1 0 4.2zM16.5 7a.8.8 0 1 0 0 1.6.8.8 0 0 0 0-1.6zM7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4zm0 1.6A2.4 2.4 0 0 0 4.6 7v10A2.4 2.4 0 0 0 7 19.4h10A2.4 2.4 0 0 0 19.4 17V7A2.4 2.4 0 0 0 17 4.6H7z" />
              </SocialIcon>
              <SocialIcon href={site.socials.tiktok} label="TikTok">
                <path d="M16.5 3c.3 2 1.5 3.4 3.5 3.6V9c-1.3.1-2.5-.3-3.5-1v5.6a4.9 4.9 0 1 1-4.9-4.9c.3 0 .5 0 .8.1v2.5a2.4 2.4 0 1 0 1.7 2.3V3h2.4z" />
              </SocialIcon>
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-semibold text-white">{col.title}</h4>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/70 transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-white/10 pt-6 text-sm text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Al Wrd Hajj & Umrah. All rights reserved.</p>
          <p>{site.location}</p>
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="grid h-9 w-9 place-items-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
    >
      <svg viewBox="0 0 24 24" className="h-4.5 w-4.5 fill-white">
        {children}
      </svg>
    </a>
  );
}
