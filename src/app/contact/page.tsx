import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { MailIcon, MapPinIcon, PhoneIcon } from "@/components/Icons";
import { CONTACT } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Exclusive Cleaning Services in Oklahoma City. Call, email, or send us a message for a quote or questions.",
};

export default function ContactPage() {
  return (
    <section className="section-padding bg-white">
      <div className="section-container">
        <div className="max-w-2xl">
          <p className="section-label">Contact Us</p>
          <h1 className="section-title mt-3">We&apos;d love to hear from you</h1>
          <p className="section-subtitle">
            Interested in a quote or have questions? Fill out the form and we
            will be in touch shortly.
          </p>
        </div>

        <div className="mt-12 grid gap-12 lg:grid-cols-5">
          <div className="space-y-8 lg:col-span-2">
            <div>
              <h2 className="font-display text-xl font-semibold text-slate-950">
                Exclusive Cleaning
              </h2>
            </div>

            <ul className="space-y-6">
              <li className="flex gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-accent">
                  <MapPinIcon />
                </span>
                <div>
                  <p className="text-sm font-semibold text-slate-950">Location</p>
                  <p className="mt-1 text-sm text-slate-600">{CONTACT.area}</p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-accent">
                  <PhoneIcon />
                </span>
                <div>
                  <p className="text-sm font-semibold text-slate-950">Phone</p>
                  <a
                    href={CONTACT.phoneHref}
                    className="mt-1 block text-sm text-slate-600 transition-colors hover:text-accent"
                  >
                    {CONTACT.phone}
                  </a>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-accent">
                  <MailIcon />
                </span>
                <div>
                  <p className="text-sm font-semibold text-slate-950">Email</p>
                  <a
                    href={`mailto:${CONTACT.email}`}
                    className="mt-1 block text-sm text-slate-600 transition-colors hover:text-accent"
                  >
                    {CONTACT.email}
                  </a>
                </div>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <div className="card">
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
