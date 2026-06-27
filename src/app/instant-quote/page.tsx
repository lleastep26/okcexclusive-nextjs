import type { Metadata } from "next";
import { InstantQuoteForm } from "@/components/InstantQuoteForm";
import { CheckCircleIcon } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Instant Deep Clean Quote",
  description:
    "Get an instant price for a deep clean — enter your square footage and see your quote immediately. No waiting, no back-and-forth.",
};

const highlights = [
  "Instant pricing — no waiting",
  "$0.35 per sq ft · $300 minimum",
  "We'll follow up to confirm your appointment",
];

export default function InstantQuotePage() {
  return (
    <section className="section-padding bg-slate-50">
      <div className="section-container">
        <div className="grid gap-12 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <p className="section-label">Deep Clean Pricing</p>
            <h1 className="section-title mt-3">Get your instant quote</h1>
            <p className="section-subtitle">
              Enter your square footage and see your deep clean price right away —
              no waiting, no back-and-forth. Fill in your contact info and
              we&apos;ll reach out to schedule.
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
              <InstantQuoteForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
