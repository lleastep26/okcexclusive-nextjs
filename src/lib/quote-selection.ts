import { services } from "./content";

export type PropertyType = "residential" | "commercial";

export function parsePropertyType(value: string | undefined): PropertyType | null {
  if (value === "residential" || value === "commercial") return value;
  return null;
}

export function getServiceLabel(serviceId: string | undefined) {
  if (!serviceId) return null;
  return services.find((service) => service.id === serviceId)?.title ?? null;
}

export function formatPropertyLabel(propertyType: PropertyType) {
  return propertyType === "residential" ? "Residential" : "Commercial";
}
