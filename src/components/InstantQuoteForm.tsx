"use client";

import Link from "next/link";
import { FormEvent, useState, useRef } from "react";
import { Button } from "./Button";
import {
  calcQuotePrice,
  formatPrice,
  formatQuoteEmailDetails,
  formatQuoteSummary,
  formatRate,
  formatRatePerVisit,
  type QuoteResult,
} from "@/lib/quote-pricing";
import {
  formatPropertyLabel,
  getMaintenanceFrequencyLabel,
  getServiceLabel,
  type MaintenanceFrequency,
  type PropertyType,
} from "@/lib/quote-selection";
import { submitToWeb3Forms } from "@/lib/web3forms";

type FormState = "idle" | "submitting" | "success" | "error";

type InstantQuoteFormProps = {
  propertyType?: PropertyType | null;
  serviceId?: string | null;
  maintenanceFrequency?: MaintenanceFrequency | null;
};

type ConfirmedQuote = QuoteResult & {
  sqft: number;
};

const inputClass =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-950 placeholder:text-slate-400 transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-blue-500/20";

const labelClass = "mb-1.5 block text-sm font-medium text-slate-700";

export function InstantQuoteForm({
  propertyType = null,
  serviceId = null,
  maintenanceFrequency = null,
}: InstantQuoteFormProps) {
  const [sqft, setSqft] = useState("");
  const [state, setState] = useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [confirmedQuote, setConfirmedQuote] = useState<ConfirmedQuote | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const propertyLabel = propertyType ? formatPropertyLabel(propertyType) : null;
  const serviceLabel = getServiceLabel(serviceId ?? undefined);
  const frequencyLabel = getMaintenanceFrequencyLabel(maintenanceFrequency);
  const hasSelection = propertyLabel !== null;

  function selectionSummary() {
    return [propertyLabel, serviceLabel, frequencyLabel].filter(Boolean).join(" · ");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("submitting");
    setErrorMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const entries = Object.fromEntries(formData.entries()) as Record<string, string>;

    const sqftNum = parseFloat(sqft);
    const quote = calcQuotePrice(
      sqftNum,
      propertyType,
      serviceId,
      maintenanceFrequency,
    );
    const priceFormatted = formatPrice(quote.price);
    const rateFormatted = quote.isMaintenanceMonthly
      ? formatRatePerVisit(quote.rate)
      : formatRate(quote.rate);
    const quoteDetails = [
      propertyLabel ? `Property: ${propertyLabel}` : null,
      serviceLabel ? `Service: ${serviceLabel}` : null,
      frequencyLabel ? `Frequency: ${frequencyLabel}` : null,
    ]
      .filter(Boolean)
      .join(" · ");

    const result = await submitToWeb3Forms({
      subject: `New Instant Quote — ${entries.name ?? ""} — ${priceFormatted}${quote.isMaintenanceMonthly ? "/mo" : ""}`,
      from_name: entries.name ?? "",
      name: entries.name ?? "",
      email: entries.email ?? "",
      phone: entries.phone ?? "",
      "Property Type": propertyLabel ?? "Not specified",
      Service: serviceLabel ?? "Not specified",
      Frequency: frequencyLabel ?? "Not specified",
      "Square Footage": `${sqftNum.toLocaleString()} sq ft`,
      Rate: rateFormatted,
      "Visits Per Month": quote.visitsPerMonth?.toString() ?? "N/A",
      "Per Visit Price": quote.perVisitPrice ? formatPrice(quote.perVisitPrice) : "N/A",
      "Quoted Price": quote.isMaintenanceMonthly
        ? `${priceFormatted} per month`
        : `${priceFormatted}${quote.minimumApplied && quote.minimum ? ` (minimum $${quote.minimum} applied)` : ""}`,
      message: [quoteDetails, formatQuoteEmailDetails(quote, sqftNum)]
        .filter(Boolean)
        .join("\n"),
    });

    if (result.ok) {
      setConfirmedQuote({ ...quote, sqft: sqftNum });
      setState("success");
    } else {
      setState("error");
      setErrorMessage(result.error);
    }
  }

  if (state === "success" && confirmedQuote !== null) {
    return (
      <div
        className="rounded-2xl border border-blue-200 bg-blue-50 p-8 text-center"
        role="status"
      >
        <p className="text-sm font-semibold uppercase tracking-widest text-accent">
          Your Instant Quote
        </p>
        {(propertyLabel || serviceLabel || frequencyLabel) && (
          <p className="mt-2 text-sm text-slate-600">{selectionSummary()}</p>
        )}
        {confirmedQuote.isMaintenanceMonthly && (
          <p className="mt-3 text-sm font-medium text-slate-600">Estimated monthly total</p>
        )}
        <p className="mt-3 font-display text-5xl font-bold text-slate-950">
          {formatPrice(confirmedQuote.price)}
          {confirmedQuote.isMaintenanceMonthly && (
            <span className="ml-1 text-2xl font-semibold text-slate-500">/mo</span>
          )}
        </p>
        <p className="mt-2 text-sm text-slate-500">
          {formatQuoteSummary(confirmedQuote, confirmedQuote.sqft)}
        </p>
        <p className="mt-5 text-slate-600">
          We&apos;ve received your info and will reach out shortly to confirm your
          appointment.
        </p>
        <Button
          type="button"
          variant="outline"
          className="mt-6"
          onClick={() => {
            setState("idle");
            setSqft("");
            setConfirmedQuote(null);
            formRef.current?.reset();
          }}
        >
          Get another quote
        </Button>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-6" noValidate>
      {hasSelection && (
        <div className="rounded-xl border border-blue-100 bg-blue-50 px-4 py-3 text-sm text-slate-700">
          <p>
            <span className="font-medium text-slate-950">{propertyLabel}</span>
            {serviceLabel ? (
              <>
                {" "}
                · <span className="font-medium text-slate-950">{serviceLabel}</span>
              </>
            ) : null}
            {frequencyLabel ? (
              <>
                {" "}
                · <span className="font-medium text-slate-950">{frequencyLabel}</span>
              </>
            ) : null}
          </p>
          <Link
            href="/book"
            className="mt-1 inline-block text-sm font-medium text-accent hover:underline"
          >
            Change selection
          </Link>
        </div>
      )}

      {/* honeypot */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div>
        <label htmlFor="sqft" className={labelClass}>
          Square footage of your home / space *
        </label>
        <input
          id="sqft"
          name="sqft"
          type="number"
          min="1"
          required
          className={inputClass}
          placeholder="e.g. 1800"
          value={sqft}
          onChange={(e) => setSqft(e.target.value)}
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClass}>
            Full name *
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            className={inputClass}
            placeholder="Jane Smith"
          />
        </div>
        <div>
          <label htmlFor="phone" className={labelClass}>
            Phone number *
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            className={inputClass}
            placeholder="(405) 555-0123"
          />
        </div>
      </div>

      <div>
        <label htmlFor="email" className={labelClass}>
          Email address *
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className={inputClass}
          placeholder="jane@example.com"
        />
      </div>

      {state === "error" && (
        <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">
          {errorMessage}
        </p>
      )}

      <Button type="submit" size="lg" disabled={state === "submitting"}>
        {state === "submitting" ? "Getting your quote…" : "Get My Instant Quote"}
      </Button>
    </form>
  );
}
