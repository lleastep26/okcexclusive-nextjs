import { services } from "./content";
import type { MaintenanceFrequency } from "./quote-selection";
import { MAINTENANCE_SERVICE_ID } from "./quote-selection";
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

const MAINTENANCE_FREQUENCY_RATES: Record<MaintenanceFrequency, number> = {
  weekly: 0.08,
  biweekly: 0.12,
  monthly: 0.15,
};

const VISITS_PER_MONTH: Record<MaintenanceFrequency, number> = {
  weekly: 4,
  biweekly: 2,
  monthly: 1,
};

const SERVICE_MINIMUMS: Partial<Record<ServiceId, number>> = {
  "deep-clean": 300,
  "post-construction": 300,
  "one-time": 200,
};

export type QuoteResult = {
  price: number;
  rate: number;
  minimumApplied: boolean;
  minimum: number | null;
  isMaintenanceMonthly: boolean;
  visitsPerMonth: number | null;
  perVisitPrice: number | null;
};

function isServiceId(value: string | null | undefined): value is ServiceId {
  return !!value && services.some((service) => service.id === value);
}

function isMaintenanceFrequency(
  value: string | null | undefined,
): value is MaintenanceFrequency {
  return value === "weekly" || value === "biweekly" || value === "monthly";
}

function getServiceMinimum(serviceId: string | null | undefined): number | null {
  if (!isServiceId(serviceId)) return null;
  return SERVICE_MINIMUMS[serviceId] ?? null;
}

function getStandardRate(
  propertyType: PropertyType | null,
  serviceId: ServiceId,
): number {
  if (propertyType === "commercial") {
    return COMMERCIAL_RATES[serviceId];
  }
  return RESIDENTIAL_RATES[serviceId];
}

export function getQuoteRate(
  propertyType: PropertyType | null,
  serviceId: string | null | undefined,
  maintenanceFrequency?: MaintenanceFrequency | null,
): number {
  if (
    serviceId === MAINTENANCE_SERVICE_ID &&
    isMaintenanceFrequency(maintenanceFrequency)
  ) {
    return MAINTENANCE_FREQUENCY_RATES[maintenanceFrequency];
  }

  if (isServiceId(serviceId)) {
    return getStandardRate(propertyType, serviceId);
  }

  return propertyType === "commercial"
    ? COMMERCIAL_RATES["deep-clean"]
    : RESIDENTIAL_RATES["deep-clean"];
}

export function calcQuotePrice(
  sqft: number,
  propertyType: PropertyType | null,
  serviceId: string | null | undefined,
  maintenanceFrequency?: MaintenanceFrequency | null,
): QuoteResult {
  if (
    serviceId === MAINTENANCE_SERVICE_ID &&
    isMaintenanceFrequency(maintenanceFrequency)
  ) {
    const rate = MAINTENANCE_FREQUENCY_RATES[maintenanceFrequency];
    const visitsPerMonth = VISITS_PER_MONTH[maintenanceFrequency];
    const perVisitPrice = sqft * rate;
    const price = perVisitPrice * visitsPerMonth;

    return {
      price,
      rate,
      minimumApplied: false,
      minimum: null,
      isMaintenanceMonthly: true,
      visitsPerMonth,
      perVisitPrice,
    };
  }

  const rate = getQuoteRate(propertyType, serviceId, maintenanceFrequency);
  const calculated = sqft * rate;
  const minimum = getServiceMinimum(serviceId);

  if (minimum === null) {
    return {
      price: calculated,
      rate,
      minimumApplied: false,
      minimum: null,
      isMaintenanceMonthly: false,
      visitsPerMonth: null,
      perVisitPrice: null,
    };
  }

  return {
    price: Math.max(calculated, minimum),
    rate,
    minimumApplied: calculated < minimum,
    minimum,
    isMaintenanceMonthly: false,
    visitsPerMonth: null,
    perVisitPrice: null,
  };
}

export function formatRate(rate: number): string {
  return `$${rate.toFixed(2)} per sq ft`;
}

export function formatRatePerVisit(rate: number): string {
  return `$${rate.toFixed(2)} per sq ft per visit`;
}

export function formatRateShort(rate: number): string {
  return `$${rate.toFixed(2)}/sq ft`;
}

export function formatPrice(price: number): string {
  return `$${price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export function formatQuoteSummary(quote: QuoteResult, sqft: number): string {
  if (
    quote.isMaintenanceMonthly &&
    quote.visitsPerMonth !== null &&
    quote.perVisitPrice !== null
  ) {
    return `Based on ${sqft.toLocaleString()} sq ft @ ${formatRateShort(quote.rate)} per visit × ${quote.visitsPerMonth} visits per month (${formatPrice(quote.perVisitPrice)} per visit)`;
  }

  const minimumNote =
    quote.minimumApplied && quote.minimum
      ? ` (minimum $${quote.minimum} applies)`
      : "";

  return `Based on ${sqft.toLocaleString()} sq ft @ ${formatRateShort(quote.rate)}${minimumNote}`;
}

export function formatQuoteEmailDetails(
  quote: QuoteResult,
  sqft: number,
): string {
  if (
    quote.isMaintenanceMonthly &&
    quote.visitsPerMonth !== null &&
    quote.perVisitPrice !== null
  ) {
    return [
      `Rate: ${formatRatePerVisit(quote.rate)}`,
      `Visits per month: ${quote.visitsPerMonth}`,
      `Per visit: ${formatPrice(quote.perVisitPrice)}`,
      `Monthly total: ${formatPrice(quote.price)}`,
    ].join("\n");
  }

  return `Quote for ${sqft.toLocaleString()} sq ft: ${formatPrice(quote.price)}${quote.minimumApplied && quote.minimum ? ` (minimum $${quote.minimum} applied)` : ""}`;
}
