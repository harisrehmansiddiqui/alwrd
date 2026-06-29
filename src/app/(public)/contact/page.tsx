import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { MaterialIcon } from "@/components/material-icon";
import { OfficeMap } from "@/components/office-map";
import { SocialLinks } from "@/components/social-links";
import {
  contactEmails,
  contactPhones,
  offices,
  telHref,
} from "@/lib/company";
import { absoluteUrl } from "@/lib/seo";
import { site, whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact Al Wrd Hajj & Umrah — offices in Islamabad, Riyadh, and Madinah. Call, WhatsApp, or email our Umrah experts.",
  alternates: { canonical: absoluteUrl("/contact") },
};

const CONTACT_IMAGE =
  "https://images.unsplash.com/photo-1564769625905-50d102379625?auto=format&fit=crop&w=1312&q=80";

export default function ContactPage() {
  return (
    <div className="overflow-x-hidden bg-white">
      <div className="mx-auto w-full max-w-[1600px] px-0 py-8 lg:py-24 lg:pb-14">
        <div className="px-4 text-center sm:px-6 lg:px-0">
          <p className="mx-auto inline-block rounded-2xl border-4 border-primary-10 px-2.5 py-0.5 text-sm font-medium leading-5 text-primary">
            Contact us
          </p>
          <h1 className="mx-auto mt-3 max-w-[900px] text-[30px] font-bold leading-9 text-tertiary lg:mt-4 lg:text-[56px] lg:leading-[66px]">
            Our Friendly Team Would Love To Hear From You.
          </h1>
          <p className="mx-auto mt-4 max-w-[624px] text-sm font-light leading-[18px] text-[#475467] lg:mt-5 lg:text-xl lg:leading-[30px]">
            Reach us in Pakistan or Saudi Arabia — by form, phone, WhatsApp, or
            email.
          </p>
          <SocialLinks className="mx-auto mt-6 justify-center" />
        </div>

        <div className="mt-8 lg:mt-20">
          <div className="mx-auto flex max-w-[1600px] flex-col justify-between gap-10 px-4 lg:flex-row lg:gap-16 lg:px-20">
            <div className="w-full lg:max-w-[656px] lg:py-[68px] lg:pr-[88px]">
              <h2 className="text-xl font-semibold leading-[26px] text-[#101828] lg:text-4xl lg:leading-[44px]">
                Send a message
              </h2>
              <p className="mt-4 text-base leading-[18px] text-[#475467] lg:mt-5 lg:text-xl lg:leading-[30px]">
                Share your details and our Umrah experts will get in touch with
                you.
              </p>
              <ContactForm />
            </div>

            <div
              className="relative hidden h-[800px] w-full max-w-[656px] rounded-[20px] bg-cover bg-center lg:block"
              style={{ backgroundImage: `url('${CONTACT_IMAGE}')` }}
              role="img"
              aria-label="Contact us"
            />
          </div>
        </div>

        <section className="mx-auto mt-16 max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl font-bold text-tertiary sm:text-3xl">
            Our offices
          </h2>
          <p className="mt-2 text-slate-muted">
            Visit or call our teams in Pakistan and Saudi Arabia.
          </p>
          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {offices.map((office) => (
              <article
                key={office.id}
                className="overflow-hidden rounded-2xl border border-outline-variant bg-white shadow-sm"
              >
                <div className="relative h-44">
                  <OfficeMap office={office} className="absolute inset-0" />
                </div>
                <div className="p-5">
                  <p className="text-xs font-bold uppercase tracking-wider text-primary">
                    {office.label}
                  </p>
                  <h3 className="mt-1 font-display text-lg font-semibold text-ink">
                    {office.city}, {office.country}
                  </h3>
                  <p className="mt-2 flex items-start gap-2 text-sm text-slate-muted">
                    <MaterialIcon
                      name="location_on"
                      className="shrink-0 text-lg text-primary"
                    />
                    {office.address}
                  </p>
                  {office.phone && (
                    <a
                      href={telHref(office.phone)}
                      className="mt-2 flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                    >
                      <MaterialIcon name="call" className="text-lg" />
                      {office.phone}
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto mt-16 max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
          <div className="grid gap-8 rounded-2xl border border-outline-variant bg-surface-container-low p-8 sm:grid-cols-2 lg:p-10">
            <div>
              <h3 className="font-display text-lg font-semibold text-ink">
                Phone lines
              </h3>
              <ul className="mt-4 space-y-2">
                {contactPhones.map((p) => (
                  <li key={p.number}>
                    <a
                      href={telHref(p.number)}
                      className="text-sm text-primary hover:underline"
                    >
                      {p.number}
                    </a>
                    <span className="ml-2 text-xs text-slate-muted">
                      ({p.label})
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-display text-lg font-semibold text-ink">
                Email
              </h3>
              <ul className="mt-4 space-y-2">
                {contactEmails.map((e) => (
                  <li key={e.address}>
                    <a
                      href={`mailto:${e.address}`}
                      className="text-sm text-primary hover:underline"
                    >
                      {e.address}
                    </a>
                    <span className="ml-2 text-xs text-slate-muted">
                      — {e.label}
                    </span>
                  </li>
                ))}
              </ul>
              <a
                href={whatsappLink("Assalamu alaikum, I would like to contact Al Wrd.")}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-on-primary hover:bg-primary-dark"
              >
                <MaterialIcon name="chat" />
                WhatsApp {site.phone}
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
