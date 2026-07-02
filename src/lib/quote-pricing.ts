import { services } from "./content";
import type { PropertyType } from "./quote-selection";

export type ServiceId = (typeof services)[number]["id"];

const RESIDENTIAL_RATE = 0.35;
const RESIDENTIAL_MINIMUM = 300;

const COMMERCIAL_RATES: Record<ServiceId, number> = {
  "deep-clean": 0.25,
  "maintenance-clean": 0.12,
  "post-construction": 0.4,
  "one-time": 0.15,
};

function isServiceId(value: string | null | undefined): value is ServiceId {
  return !!value && services.some((service) => service.id === value);
}

export function getQuoteRate(
  propertyType: PropertyType | null,
  serviceId: string | null | undefined,
): number {
  if (propertyType === "commercial" && isServiceId(serviceId)) {
    return COMMERCIAL_RATES[serviceId];
  }

  return RESIDENTIAL_RATE;
}

export function calcQuotePrice(
  sqft: number,
  propertyType: PropertyType | null,
  serviceId: string | null | undefined,
): { price: number; rate: number; minimumApplied: boolean } {
  const rate = getQuoteRate(propertyType, serviceId);
  const calculated = sqft * rate;

  if (propertyType === "commercial") {
    return { price: calculated, rate, minimumApplied: false };
  }

  const price = Math.max(calculated, RESIDENTIAL_MINIMUM);
  return {
    price,
    rate,
    minimumApplied: calculated < RESIDENTIAL_MINIMUM,
  };
}

export function formatRate(rate: number): string {
  return `$${rate.toFixed(2)} per sq ft`;
}

export function formatRateShort(rate: number): string {
  return `$${rate.toFixed(2)}/sq ft`;
}

export { RESIDENTIAL_MINIMUM };
