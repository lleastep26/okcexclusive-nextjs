import { services } from "./content";
import type { PropertyType } from "./quote-selection";

export type ServiceId = (typeof services)[number]["id"];

const RESIDENTIAL_RATES: Record<ServiceId, number> = {
  "deep-clean": 0.2,
  "maintenance-clean": 0.12,
  "post-construction": 0.35,
  "one-time": 0.2,
};

const COMMERCIAL_RATES: Record<ServiceId, number> = {
  "deep-clean": 0.25,
  "maintenance-clean": 0.12,
  "post-construction": 0.4,
  "one-time": 0.15,
};

const SERVICE_MINIMUMS: Partial<Record<ServiceId, number>> = {
  "deep-clean": 300,
  "post-construction": 300,
  "one-time": 200,
};

function isServiceId(value: string | null | undefined): value is ServiceId {
  return !!value && services.some((service) => service.id === value);
}

function getServiceMinimum(serviceId: string | null | undefined): number | null {
  if (!isServiceId(serviceId)) return null;
  return SERVICE_MINIMUMS[serviceId] ?? null;
}

export function getQuoteRate(
  propertyType: PropertyType | null,
  serviceId: string | null | undefined,
): number {
  if (isServiceId(serviceId)) {
    if (propertyType === "commercial") {
      return COMMERCIAL_RATES[serviceId];
    }
    return RESIDENTIAL_RATES[serviceId];
  }

  return propertyType === "commercial"
    ? COMMERCIAL_RATES["deep-clean"]
    : RESIDENTIAL_RATES["deep-clean"];
}

export function calcQuotePrice(
  sqft: number,
  propertyType: PropertyType | null,
  serviceId: string | null | undefined,
): { price: number; rate: number; minimumApplied: boolean; minimum: number | null } {
  const rate = getQuoteRate(propertyType, serviceId);
  const calculated = sqft * rate;
  const minimum = getServiceMinimum(serviceId);

  if (minimum === null) {
    return { price: calculated, rate, minimumApplied: false, minimum: null };
  }

  return {
    price: Math.max(calculated, minimum),
    rate,
    minimumApplied: calculated < minimum,
    minimum,
  };
}

export function formatRate(rate: number): string {
  return `$${rate.toFixed(2)} per sq ft`;
}
