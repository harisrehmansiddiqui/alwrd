import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Al Wrd Hajj & Umrah. Share your details and our Umrah experts will get back to you.",
};

const CONTACT_IMAGE =
  "https://images.unsplash.com/photo-1564769625905-50d102379625?auto=format&fit=crop&w=1312&q=80";

export default function ContactPage() {
  return (
    <div className="bg-white">
      <div className="mx-auto w-full max-w-[1600px] px-0 py-8 lg:py-24 lg:pb-14">
        {/* Hero intro */}
        <div className="px-2.5 text-center lg:px-0">
          <p className="mx-auto w-max rounded-2xl border-4 border-primary-10 px-2.5 py-0.5 text-sm font-medium leading-5 text-primary">
            Contact us
          </p>
          <h1 className="mx-auto mt-3 max-w-[900px] text-[30px] font-bold leading-9 text-tertiary lg:mt-4 lg:text-[56px] lg:leading-[66px]">
            Our Friendly Team Would Love To Hear From You.
          </h1>
          <p className="mx-auto mt-4 max-w-[624px] text-sm leading-[18px] text-[#475467] lg:mt-5 lg:text-xl lg:leading-[30px]">
            You can contact us by filling out the form below. We&apos;re here to
            help and ensure you get the support you need.
          </p>
        </div>

        {/* Form + image */}
        <div className="mt-8 lg:mt-20">
          <div className="mx-auto flex max-w-[1600px] flex-col justify-between gap-10 px-4 lg:flex-row lg:gap-16 lg:px-20">
            <div className="w-full lg:max-w-[656px] lg:py-[68px] lg:pr-[88px]">
              <h2 className="text-xl font-semibold leading-[26px] text-[#101828] lg:text-4xl lg:leading-[44px]">
                Contact Us
              </h2>
              <p className="mt-4 text-base leading-[18px] text-[#475467] lg:mt-5 lg:text-xl lg:leading-[30px]">
                Please Share your details below and our Umrah experts will get
                in touch with you.
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
      </div>
    </div>
  );
}
