"use client";

import { FormEvent, useState } from "react";
import { Button } from "./Button";
import { serviceOptions } from "@/lib/content";
import { submitToWeb3Forms } from "@/lib/web3forms";

type FormState = "idle" | "submitting" | "success" | "error";

const inputClass =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-950 placeholder:text-slate-400 transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-blue-500/20";

const labelClass = "mb-1.5 block text-sm font-medium text-slate-700";

export function QuoteForm() {
  const [state, setState] = useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("submitting");
    setErrorMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    const entries = Object.fromEntries(formData.entries()) as Record<string, string>;
    const serviceLabel = serviceOptions.find((o) => o.value === entries.service)?.label ?? entries.service ?? "";
    const result = await submitToWeb3Forms({
      subject: `New Quote Request — ${entries.name ?? ""}`,
      from_name: entries.name ?? "",
      ...entries,
      service: serviceLabel,
    });

    if (result.ok) {
      setState("success");
      form.reset();
    } else {
      setState("error");
      setErrorMessage(result.error);
    }
  }

  if (state === "success") {
    return (
      <div
        className="rounded-2xl border border-blue-200 bg-blue-50 p-8 text-center"
        role="status"
      >
        <h3 className="font-display text-2xl font-semibold text-slate-950">
          Quote request received!
        </h3>
        <p className="mt-3 text-slate-600">
          Thanks for reaching out. We&apos;ll review your details and get back
          to you shortly to confirm your cleaning.
        </p>
        <Button
          type="button"
          variant="outline"
          className="mt-6"
          onClick={() => setState("idle")}
        >
          Submit another request
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
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
          <label htmlFor="email" className={labelClass}>
            Email *
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
        <div>
          <label htmlFor="phone" className={labelClass}>
            Phone *
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
        <div>
          <label htmlFor="service" className={labelClass}>
            Service type *
          </label>
          <select id="service" name="service" required className={inputClass}>
            <option value="">Select a service</option>
            {serviceOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="address" className={labelClass}>
          Property address *
        </label>
        <input
          id="address"
          name="address"
          type="text"
          required
          autoComplete="street-address"
          className={inputClass}
          placeholder="123 Main St, Oklahoma City, OK"
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-3">
        <div>
          <label htmlFor="bedrooms" className={labelClass}>
            Bedrooms
          </label>
          <input
            id="bedrooms"
            name="bedrooms"
            type="number"
            min="0"
            className={inputClass}
            placeholder="3"
          />
        </div>
        <div>
          <label htmlFor="bathrooms" className={labelClass}>
            Bathrooms
          </label>
          <input
            id="bathrooms"
            name="bathrooms"
            type="number"
            min="0"
            step="0.5"
            className={inputClass}
            placeholder="2"
          />
        </div>
        <div>
          <label htmlFor="sqft" className={labelClass}>
            Approx. sq ft
          </label>
          <input
            id="sqft"
            name="sqft"
            type="number"
            min="0"
            className={inputClass}
            placeholder="1800"
          />
        </div>
      </div>

      <div>
        <label htmlFor="preferredDate" className={labelClass}>
          Preferred date
        </label>
        <input
          id="preferredDate"
          name="preferredDate"
          type="date"
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="notes" className={labelClass}>
          Additional details
        </label>
        <textarea
          id="notes"
          name="notes"
          rows={4}
          className={inputClass}
          placeholder="Tell us about your space, pets, special requests, or preferred times..."
        />
      </div>

      {state === "error" && (
        <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">
          {errorMessage}
        </p>
      )}

      <Button type="submit" size="lg" disabled={state === "submitting"}>
        {state === "submitting" ? "Sending..." : "Request a Quote"}
      </Button>
    </form>
  );
}
