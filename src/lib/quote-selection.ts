import { services } from "./content";

export type PropertyType = "residential" | "commercial";

export const MAINTENANCE_FREQUENCIES = [
  {
    id: "weekly",
    label: "Weekly",
    description: "A consistent clean every week to keep your space in top shape.",
  },
  {
    id: "biweekly",
    label: "Biweekly",
    description: "Every two weeks — a popular balance of freshness and flexibility.",
  },
  {
    id: "monthly",
    label: "Monthly",
    description: "Once-a-month maintenance for spaces that need a regular refresh.",
  },
] as const;

export type MaintenanceFrequency = (typeof MAINTENANCE_FREQUENCIES)[number]["id"];

export const MAINTENANCE_SERVICE_ID = "maintenance-clean";

export function parsePropertyType(value: string | undefined): PropertyType | null {
  if (value === "residential" || value === "commercial") return value;
  return null;
}

export function parseMaintenanceFrequency(
  value: string | undefined,
): MaintenanceFrequency | null {
  if (value === "weekly" || value === "biweekly" || value === "monthly") return value;
  return null;
}

export function getServiceLabel(serviceId: string | undefined) {
  if (!serviceId) return null;
  return services.find((service) => service.id === serviceId)?.title ?? null;
}

export function getMaintenanceFrequencyLabel(
  frequency: MaintenanceFrequency | string | null | undefined,
) {
  if (!frequency) return null;
  return MAINTENANCE_FREQUENCIES.find((option) => option.id === frequency)?.label ?? null;
}

export function formatPropertyLabel(propertyType: PropertyType) {
  return propertyType === "residential" ? "Residential" : "Commercial";
}

export function buildQuoteUrl(
  property: PropertyType,
  serviceId: string,
  frequency?: MaintenanceFrequency,
) {
  const params = new URLSearchParams({ property, service: serviceId });
  if (frequency) params.set("frequency", frequency);
  return `/instant-quote?${params.toString()}`;
}

export function maintenanceNeedsFrequency(serviceId: string | null | undefined) {
  return serviceId === MAINTENANCE_SERVICE_ID;
}
