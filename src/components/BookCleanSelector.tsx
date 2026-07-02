"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { ServiceSelectionGrid } from "./ServiceSelectionGrid";
import { type PropertyType } from "@/lib/quote-selection";

type BookCleanSelectorProps = {
  initialProperty?: PropertyType | null;
};

export function BookCleanSelector({ initialProperty = null }: BookCleanSelectorProps) {
  const router = useRouter();
  const [step, setStep] = useState<"property" | "service">(
    initialProperty ? "service" : "property",
  );
  const [propertyType, setPropertyType] = useState<PropertyType | null>(initialProperty);

  function handlePropertySelect(type: PropertyType) {
    setPropertyType(type);
    setStep("service");
  }

  if (step === "service" && propertyType) {
    return (
      <ServiceSelectionGrid
        propertyType={propertyType}
        onBack={() => {
          if (initialProperty) {
            router.push("/book");
            return;
          }
          setStep("property");
          setPropertyType(null);
        }}
        backLabel={
          initialProperty ? "← Change property type" : "← Back to property type"
        }
      />
    );
  }

  return (
    <div className="space-y-6">
      <div>
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
          onClick={() => handlePropertySelect("residential")}
          className="rounded-2xl border border-slate-200 bg-white p-6 text-left shadow-sm transition-all hover:border-accent hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
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
          onClick={() => handlePropertySelect("commercial")}
          className="rounded-2xl border border-slate-200 bg-white p-6 text-left shadow-sm transition-all hover:border-accent hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
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
