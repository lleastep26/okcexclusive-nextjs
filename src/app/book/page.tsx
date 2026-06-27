import type { Metadata } from "next";
import { QuoteForm } from "@/components/QuoteForm";
import { CheckCircleIcon } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Book a Clean",
  description:
    "Request a free cleaning quote from Exclusive Cleaning Services. Choose your service, tell us about your space, and we'll confirm your appointment.",
};

const highlights = [
  "Free, no-obligation quotes",
  "Flexible one-time or recurring service",
  "100% satisfaction guarantee",
];

export default function BookPage() {
  return (
    <section className="section-padding bg-slate-50">
      <div className="section-container">
        <div className="grid gap-12 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <p className="section-label">Book a Clean</p>
            <h1 className="section-title mt-3">Get your free quote</h1>
            <p className="section-subtitle">
              Tell us about your space and the service you need. We&apos;ll
              review your request and follow up to confirm details and pricing.
            </p>

            <ul className="mt-8 space-y-3">
              {highlights.map((highlight) => (
                <li
                  key={highlight}
                  className="flex items-center gap-3 text-sm text-slate-700"
                >
                  <CheckCircleIcon className="h-5 w-5 shrink-0 text-accent" />
                  {highlight}
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <div className="card">
              <QuoteForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
