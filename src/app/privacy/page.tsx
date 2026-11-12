import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `${SITE_NAME}'s privacy policy, including how we use your phone number for text messages.`,
};

export default function PrivacyPage() {
  return (
    <section className="section-padding bg-white">
      <div className="section-container max-w-3xl">
        <p className="section-label">Privacy Policy</p>
        <h1 className="section-title mt-3">How we handle your information</h1>

        <div className="mt-8 space-y-8 text-slate-600 leading-relaxed">
          <div>
            <h2 className="font-display text-xl font-semibold text-slate-950">
              What we collect
            </h2>
            <p className="mt-3">
              When you request a quote, book a service, or contact us, we collect the
              information you provide — your name, phone number, email address, service
              address, and details about the job you&apos;re asking about.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-semibold text-slate-950">
              Text messages (SMS)
            </h2>
            <p className="mt-3">
              If you provide your phone number, {SITE_NAME} may send you text messages
              about your request, appointments, job updates, and review requests. Message
              frequency varies. Message and data rates may apply. Reply STOP at any time
              to opt out of text messages, or reply HELP for help.
            </p>
            <p className="mt-3 font-medium text-slate-950">
              We do not share or sell your mobile number or SMS consent with third parties
              for marketing purposes.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-semibold text-slate-950">
              How we use your information
            </h2>
            <p className="mt-3">
              We use your information to respond to your request, schedule and complete
              your service, send appointment and job updates, follow up after a job is
              finished, and request a review. We do not sell your personal information.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl font-semibold text-slate-950">
              Contact us
            </h2>
            <p className="mt-3">
              Questions about this policy or your information? Reach out through our{" "}
              <a href="/contact" className="underline">
                contact page
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
