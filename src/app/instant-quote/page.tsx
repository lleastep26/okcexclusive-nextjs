import type { Metadata } from "next";
import Link from "next/link";
import { InstantQuoteForm } from "@/components/InstantQuoteForm";
import { CheckCircleIcon } from "@/components/Icons";
import {
  formatPropertyLabel,
  getServiceLabel,
  parsePropertyType,
} from "@/lib/quote-selection";

export const metadata: Metadata = {
  title: "Request a Quote",
  description:
    "Request a cleaning quote from Exclusive Cleaning Services. Tell us about your space and we'll follow up with pricing and scheduling.",
};

const highlights = [
  "Quick and easy — takes just a few minutes",
  "We'll follow up to confirm your appointment",
];

type InstantQuotePageProps = {
  searchParams: Promise<{ property?: string; service?: string }>;
};

export default async function InstantQuotePage({ searchParams }: InstantQuotePageProps) {
  const params = await searchParams;
  const propertyType = parsePropertyType(params.property);
  const serviceLabel = getServiceLabel(params.service);

  return (
    <section className="section-padding bg-slate-50">
      <div className="section-container">
        <div className="grid gap-12 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <p className="section-label">Request a Quote</p>
            <h1 className="section-title mt-3">Tell us about your space</h1>
            <p className="section-subtitle">
              Enter your square footage and contact info. Our team will review
              your request and reach out with a personalized quote and scheduling
              options.
            </p>

            {(propertyType || serviceLabel) && (
              <p className="mt-4 text-sm text-slate-600">
                Quoting for{" "}
                <span className="font-medium text-slate-950">
                  {[
                    propertyType ? formatPropertyLabel(propertyType) : null,
                    serviceLabel,
                  ]
                    .filter(Boolean)
                    .join(" · ")}
                </span>
                .{" "}
                <Link href="/book" className="font-medium text-accent hover:underline">
                  Change selection
                </Link>
              </p>
            )}

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
              <InstantQuoteForm
                propertyType={propertyType}
                serviceId={params.service ?? null}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
