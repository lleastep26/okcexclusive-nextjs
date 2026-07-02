"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { services } from "@/lib/content";

type PropertyType = "residential" | "commercial";

function buildQuoteUrl(property: PropertyType, serviceId?: string) {
  const params = new URLSearchParams({ property });
  if (serviceId) params.set("service", serviceId);
  return `/instant-quote?${params.toString()}`;
}

export function BookCleanSelector() {
  const router = useRouter();
  const [step, setStep] = useState<"property" | "service">("property");
  const [propertyType, setPropertyType] = useState<PropertyType | null>(null);

  function handlePropertySelect(type: PropertyType) {
    setPropertyType(type);
    if (type === "commercial") {
      router.push(buildQuoteUrl("commercial"));
      return;
    }
    setStep("service");
  }

  function handleServiceSelect(serviceId: string) {
    if (propertyType !== "residential") return;
    router.push(buildQuoteUrl("residential", serviceId));
  }

  if (step === "service" && propertyType === "residential") {
    return (
      <div className="space-y-6">
        <button
          type="button"
          onClick={() => {
            setStep("property");
            setPropertyType(null);
          }}
          className="text-sm font-medium text-slate-500 transition-colors hover:text-slate-950"
        >
          ← Back to property type
        </button>

        <div>
          <h2 className="font-display text-xl font-semibold text-slate-950">
            What type of clean do you need?
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Choose the service that best fits your home. You&apos;ll enter your
            square footage and contact info on the next step.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {services.map((service) => (
            <button
              key={service.id}
              type="button"
              onClick={() => handleServiceSelect(service.id)}
              className="rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm transition-all hover:border-accent hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
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
