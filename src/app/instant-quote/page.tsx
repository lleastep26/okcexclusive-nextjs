import type { Metadata } from "next";
import Link from "next/link";
import { InstantQuoteFlow } from "@/components/InstantQuoteFlow";
import { CheckCircleIcon } from "@/components/Icons";
import {
  formatPropertyLabel,
  getMaintenanceFrequencyLabel,
  getServiceLabel,
  parseMaintenanceFrequency,
  parsePropertyType,
} from "@/lib/quote-selection";

export const metadata: Metadata = {
  title: "Instant Quote",
  description:
    "Get an instant cleaning quote from Exclusive Cleaning Services. Enter your square footage and contact info to see your price right away.",
};

const highlights = [
  "Instant pricing — no waiting",
  "We'll follow up to confirm your appointment",
];

type InstantQuotePageProps = {
  searchParams: Promise<{ property?: string; service?: string; frequency?: string }>;
};

export default async function InstantQuotePage({ searchParams }: InstantQuotePageProps) {
  const params = await searchParams;
  const propertyType = parsePropertyType(params.property);
  const serviceLabel = getServiceLabel(params.service);
  const frequencyLabel = getMaintenanceFrequencyLabel(
    parseMaintenanceFrequency(params.frequency),
  );

  return (
    <section className="section-padding bg-slate-50">
      <div className="section-container">
        <div className="grid gap-12 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <p className="section-label">Instant Quote</p>
            <h1 className="section-title mt-3">Get your instant quote</h1>
            <p className="section-subtitle">
              Enter your square footage and contact info to see your price right
              away — no waiting, no back-and-forth. We&apos;ll reach out to
              confirm your appointment.
            </p>

            {(propertyType || serviceLabel || frequencyLabel) && (
              <p className="mt-4 text-sm text-slate-600">
                Quoting for{" "}
                <span className="font-medium text-slate-950">
                  {[
                    propertyType ? formatPropertyLabel(propertyType) : null,
                    serviceLabel,
                    frequencyLabel,
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
              <InstantQuoteFlow
                propertyType={propertyType}
                serviceId={params.service ?? null}
                frequency={parseMaintenanceFrequency(params.frequency)}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
