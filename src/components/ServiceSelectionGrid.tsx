"use client";

import { useState } from "react";
import { MaintenanceFrequencyGrid } from "./MaintenanceFrequencyGrid";
import { services } from "@/lib/content";
import {
  buildQuoteUrl,
  MAINTENANCE_SERVICE_ID,
  type PropertyType,
} from "@/lib/quote-selection";
import { useRouter } from "next/navigation";

type ServiceSelectionGridProps = {
  propertyType: PropertyType;
  onBack?: () => void;
  backLabel?: string;
  heading?: string;
  description?: string;
};

const copyByProperty = {
  residential: {
    heading: "What type of clean do you need?",
    description:
      "Choose the service that best fits your home. You'll enter your square footage and contact info on the next step.",
  },
  commercial: {
    heading: "What type of clean do you need?",
    description:
      "Choose the service that best fits your business. You'll enter your square footage and contact info on the next step.",
  },
} as const;

const cardClass =
  "rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm transition-all hover:border-accent hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

export function ServiceSelectionGrid({
  propertyType,
  onBack,
  backLabel = "← Back to property type",
  heading,
  description,
}: ServiceSelectionGridProps) {
  const router = useRouter();
  const [showMaintenanceFrequency, setShowMaintenanceFrequency] = useState(false);
  const copy = copyByProperty[propertyType];

  if (showMaintenanceFrequency) {
    return (
      <MaintenanceFrequencyGrid
        propertyType={propertyType}
        onBack={() => setShowMaintenanceFrequency(false)}
        backLabel="← Back to services"
      />
    );
  }

  function handleServiceSelect(serviceId: string) {
    if (serviceId === MAINTENANCE_SERVICE_ID) {
      setShowMaintenanceFrequency(true);
      return;
    }

    router.push(buildQuoteUrl(propertyType, serviceId));
  }

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
          {heading ?? copy.heading}
        </h2>
        <p className="mt-2 text-sm text-slate-600">{description ?? copy.description}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {services.map((service) => (
          <button
            key={service.id}
            type="button"
            onClick={() => handleServiceSelect(service.id)}
            className={cardClass}
          >
            <span className="font-display text-lg font-semibold text-slate-950">
              {service.title}
            </span>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              {service.description}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}
