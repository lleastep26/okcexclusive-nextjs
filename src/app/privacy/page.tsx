import type { Metadata } from "next";
import Link from "next/link";
import { CONTACT, SITE_NAME, SITE_URL } from "@/lib/constants";
import { privacyPolicy } from "@/lib/privacy-content";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy Policy for ${SITE_NAME}. Learn how we collect, use, and protect your information when you visit our website or use our services.`,
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <section className="section-padding bg-white">
      <div className="section-container">
        <div className="mx-auto max-w-3xl">
          <p className="section-label">Legal</p>
          <h1 className="section-title mt-3">Privacy Policy</h1>
          <p className="mt-4 text-sm text-slate-500">
            Effective date: {privacyPolicy.effectiveDate} · Last updated:{" "}
            {privacyPolicy.lastUpdated}
          </p>

          <div className="mt-10 space-y-10 text-slate-600 leading-relaxed">
            {privacyPolicy.sections.map((section) => (
              <section key={section.title}>
                <h2 className="font-display text-2xl font-semibold text-slate-950">
                  {section.title}
                </h2>

                {"paragraphs" in section &&
                  section.paragraphs?.map((paragraph) => (
                    <p key={paragraph.slice(0, 48)} className="mt-4">
                      {paragraph}
                    </p>
                  ))}

                {"list" in section && section.list && (
                  <ul className="mt-4 list-disc space-y-2 pl-6">
                    {section.list.map((item) => (
                      <li key={item.slice(0, 48)}>{item}</li>
                    ))}
                  </ul>
                )}

                {"paragraphsAfter" in section &&
                  section.paragraphsAfter?.map((paragraph) => (
                    <p key={paragraph.slice(0, 48)} className="mt-4">
                      {paragraph}
                    </p>
                  ))}

                {"contact" in section && section.contact && (
                  <ul className="mt-4 space-y-2">
                    <li>
                      <span className="font-medium text-slate-950">{SITE_NAME}</span>
                    </li>
                    <li>
                      Website:{" "}
                      <Link href="/" className="text-accent hover:underline">
                        {SITE_URL}
                      </Link>
                    </li>
                    <li>
                      Email:{" "}
                      <a
                        href={`mailto:${CONTACT.email}`}
                        className="text-accent hover:underline"
                      >
                        {CONTACT.email}
                      </a>
                    </li>
                    <li>
                      Phone:{" "}
                      <a href={CONTACT.phoneHref} className="text-accent hover:underline">
                        {CONTACT.phone}
                      </a>
                    </li>
                    <li>{CONTACT.area}</li>
                  </ul>
                )}
              </section>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
