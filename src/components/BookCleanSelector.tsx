"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { MaintenanceFrequencyGrid } from "./MaintenanceFrequencyGrid";
import { ServiceSelectionGrid } from "./ServiceSelectionGrid";
import { getServiceLabel } from "@/lib/quote-selection";
import {
  buildQuoteUrl,
  MAINTENANCE_SERVICE_ID,
  type PropertyType,
} from "@/lib/quote-selection";

type BookStep = "property" | "service" | "frequency";

type BookCleanSelectorProps = {
  initialProperty?: PropertyType | null;
  initialService?: string | null;
};

const propertyCardClass =
  "rounded-2xl border border-slate-200 bg-white p-6 text-left shadow-sm transition-all hover:border-accent hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

function PropertyTypeStep({
  serviceLabel,
  onSelect,
}: {
  serviceLabel?: string | null;
  onSelect: (type: PropertyType) => void;
}) {
  return (
    <div className="space-y-6">
      <div>
        {serviceLabel && (
          <p className="text-sm font-medium text-accent">{serviceLabel}</p>
        )}
        <h2 className="font-display text-xl font-semibold text-slate-950">
          What type of property is this for?
        </h2>
        <p className="mt-2 text-sm text-slate-600">
          Select residential or commercial so we can guide you to the right quote.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <button
          type="button"
          onClick={() => onSelect("residential")}
          className={propertyCardClass}
        >
          <span className="font-display text-lg font-semibold text-slate-950">
            Residential
          </span>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            Homes, apartments, and other residential spaces in the OKC area.
          </p>
        </button>

        <button
          type="button"
          onClick={() => onSelect("commercial")}
          className={propertyCardClass}
        >
          <span className="font-display text-lg font-semibold text-slate-950">
            Commercial
          </span>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            Offices, retail, medical facilities, and other business properties.
          </p>
        </button>
      </div>
    </div>
  );
}

function getInitialStep(
  initialProperty: PropertyType | null,
  initialService: string | null,
): BookStep {
  if (initialProperty && !initialService) return "service";
  return "property";
}

export function BookCleanSelector({
  initialProperty = null,
  initialService = null,
}: BookCleanSelectorProps) {
  const router = useRouter();
  const serviceLabel = getServiceLabel(initialService ?? undefined);
  const [step, setStep] = useState<BookStep>(() =>
    getInitialStep(initialProperty, initialService),
  );
  const [propertyType, setPropertyType] = useState<PropertyType | null>(initialProperty);

  function handlePropertySelect(type: PropertyType) {
    setPropertyType(type);

    if (initialService) {
      if (initialService === MAINTENANCE_SERVICE_ID) {
        setStep("frequency");
        return;
      }

      router.push(buildQuoteUrl(type, initialService));
      return;
    }

    setStep("service");
  }

  function handlePropertyBack() {
    if (initialService) {
      router.push("/");
      return;
    }

    if (initialProperty) {
      router.push("/book");
      return;
    }

    setStep("property");
    setPropertyType(null);
  }

  if (step === "frequency" && propertyType && initialService === MAINTENANCE_SERVICE_ID) {
    return (
      <MaintenanceFrequencyGrid
        propertyType={propertyType}
        onBack={() => {
          setPropertyType(initialProperty);
          setStep("property");
        }}
        backLabel="← Back to property type"
      />
    );
  }

  if (step === "service" && propertyType) {
    return (
      <ServiceSelectionGrid
        propertyType={propertyType}
        onBack={handlePropertyBack}
        backLabel={
          initialProperty ? "← Change property type" : "← Back to property type"
        }
      />
    );
  }

  return (
    <PropertyTypeStep
      serviceLabel={initialService ? serviceLabel : null}
      onSelect={handlePropertySelect}
    />
  );
}
