"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { InstantQuoteForm } from "./InstantQuoteForm";
import { MaintenanceFrequencyGrid } from "./MaintenanceFrequencyGrid";
import {
  formatPropertyLabel,
  getMaintenanceFrequencyLabel,
  getServiceLabel,
  maintenanceNeedsFrequency,
  type MaintenanceFrequency,
  type PropertyType,
} from "@/lib/quote-selection";

type InstantQuoteFlowProps = {
  propertyType: PropertyType | null;
  serviceId: string | null;
  frequency: MaintenanceFrequency | null;
};

export function InstantQuoteFlow({
  propertyType,
  serviceId,
  frequency,
}: InstantQuoteFlowProps) {
  const router = useRouter();
  const serviceLabel = getServiceLabel(serviceId ?? undefined);
  const frequencyLabel = getMaintenanceFrequencyLabel(frequency);

  const needsFrequency =
    propertyType &&
    maintenanceNeedsFrequency(serviceId) &&
    !frequency;

  if (needsFrequency) {
    return (
      <MaintenanceFrequencyGrid
        propertyType={propertyType}
        onBack={() => router.push("/book")}
        backLabel="← Back to book a clean"
      />
    );
  }

  return (
    <>
      {(propertyType || serviceLabel || frequencyLabel) && (
        <p className="mb-6 text-sm text-slate-600 lg:hidden">
          Quoting for{" "}
          <span className="font-medium text-slate-950">
            {[
              propertyType ? formatPropertyLabel(propertyType) : null,
              serviceLabel,
              frequencyLabel,
            ]
              .filter(Boolean)
              .join(" · ")}
          </span>
          .{" "}
          <Link href="/book" className="font-medium text-accent hover:underline">
            Change selection
          </Link>
        </p>
      )}
      <InstantQuoteForm
        propertyType={propertyType}
        serviceId={serviceId}
        maintenanceFrequency={frequency}
      />
    </>
  );
}
