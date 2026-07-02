"use client";

import { useRouter } from "next/navigation";
import {
  buildQuoteUrl,
  MAINTENANCE_FREQUENCIES,
  MAINTENANCE_SERVICE_ID,
  type PropertyType,
} from "@/lib/quote-selection";

type MaintenanceFrequencyGridProps = {
  propertyType: PropertyType;
  onBack?: () => void;
  backLabel?: string;
};

const cardClass =
  "rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm transition-all hover:border-accent hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

export function MaintenanceFrequencyGrid({
  propertyType,
  onBack,
  backLabel = "← Back to services",
}: MaintenanceFrequencyGridProps) {
  const router = useRouter();

  return (
    <div className="space-y-6">
      {onBack && (
        <button
          type="button"
          onClick={onBack}
          className="text-sm font-medium text-slate-500 transition-colors hover:text-slate-950"
        >
          {backLabel}
        </button>
      )}

      <div>
        <h2 className="font-display text-xl font-semibold text-slate-950">
          How often would you like service?
        </h2>
        <p className="mt-2 text-sm text-slate-600">
          Choose a maintenance schedule for your{" "}
          {propertyType === "commercial" ? "business" : "home"}. You&apos;ll enter
          your square footage and contact info on the next step.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {MAINTENANCE_FREQUENCIES.map((option) => (
          <button
            key={option.id}
            type="button"
            onClick={() =>
              router.push(
                buildQuoteUrl(propertyType, MAINTENANCE_SERVICE_ID, option.id),
              )
            }
            className={cardClass}
          >
            <span className="font-display text-lg font-semibold text-slate-950">
              {option.label}
            </span>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              {option.description}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}
