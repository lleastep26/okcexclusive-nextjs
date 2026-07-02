import type { Metadata } from "next";
import { BookCleanSelector } from "@/components/BookCleanSelector";
import { CheckCircleIcon } from "@/components/Icons";
import { parsePropertyType, parseServiceId, getServiceLabel } from "@/lib/quote-selection";

export const metadata: Metadata = {
  title: "Book a Clean",
  description:
    "Book a cleaning with Exclusive Cleaning Services. Choose your property type and service, then tell us about your space.",
};

const highlights = [
  "Residential and commercial cleaning",
  "Instant pricing after a few quick questions",
  "100% satisfaction guarantee",
];

type BookPageProps = {
  searchParams: Promise<{ property?: string; service?: string }>;
};

export default async function BookPage({ searchParams }: BookPageProps) {
  const params = await searchParams;
  const initialProperty = parsePropertyType(params.property);
  const initialService = parseServiceId(params.service);
  const serviceLabel = getServiceLabel(initialService ?? undefined);

  return (
    <section className="section-padding bg-slate-50">
      <div className="section-container">
        <div className="grid gap-12 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <p className="section-label">{serviceLabel ? serviceLabel : "Book a Clean"}</p>
            <h1 className="section-title mt-3">
              {serviceLabel ? `Quote your ${serviceLabel.toLowerCase()}` : "Let's get started"}
            </h1>
            <p className="section-subtitle">
              {serviceLabel
                ? `Tell us whether this is a residential or commercial property. We'll take you to a short form to get your instant quote.`
                : `Tell us about your property and the type of clean you need. We'll take you to a short form — enter your square footage and contact info to get your instant quote.`}
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
              <BookCleanSelector
                initialProperty={initialProperty}
                initialService={initialService}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
