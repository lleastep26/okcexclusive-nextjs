"use client";

import { FormEvent, useState, useRef } from "react";
import { Button } from "./Button";
import { submitToWeb3Forms } from "@/lib/web3forms";

type FormState = "idle" | "submitting" | "success" | "error";

const RATE_PER_SQFT = 0.35;
const MINIMUM_PRICE = 300;

function calcPrice(sqft: number): number {
  return Math.max(sqft * RATE_PER_SQFT, MINIMUM_PRICE);
}

const inputClass =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-950 placeholder:text-slate-400 transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-blue-500/20";

const labelClass = "mb-1.5 block text-sm font-medium text-slate-700";

export function InstantQuoteForm() {
  const [sqft, setSqft] = useState("");
  const [quote, setQuote] = useState<number | null>(null);
  const [state, setState] = useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [confirmedQuote, setConfirmedQuote] = useState<{ price: number; sqft: number } | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  function handleSqftChange(value: string) {
    setSqft(value);
    const num = parseFloat(value);
    if (!isNaN(num) && num > 0) {
      setQuote(calcPrice(num));
    } else {
      setQuote(null);
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("submitting");
    setErrorMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const entries = Object.fromEntries(formData.entries()) as Record<string, string>;

    const sqftNum = parseFloat(sqft);
    const price = calcPrice(sqftNum);
    const priceFormatted = `$${price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    const minimumApplied = sqftNum * RATE_PER_SQFT < MINIMUM_PRICE;

    const result = await submitToWeb3Forms({
      subject: `New Instant Deep Clean Quote — ${entries.name ?? ""} — ${priceFormatted}`,
      from_name: entries.name ?? "",
      name: entries.name ?? "",
      email: entries.email ?? "",
      phone: entries.phone ?? "",
      "Square Footage": `${sqftNum.toLocaleString()} sq ft`,
      "Rate": "$0.35 per sq ft",
      "Quoted Price": `${priceFormatted}${minimumApplied ? " (minimum applied)" : ""}`,
      message: `Deep clean quote for ${sqftNum.toLocaleString()} sq ft: ${priceFormatted}${minimumApplied ? " (minimum applied)" : ""}`,
    });

    if (result.ok) {
      setConfirmedQuote({ price, sqft: sqftNum });
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
          Your Deep Clean Quote
        </p>
        <p className="mt-3 font-display text-5xl font-bold text-slate-950">
          ${confirmedQuote.price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </p>
        <p className="mt-2 text-sm text-slate-500">
          Based on {confirmedQuote.sqft.toLocaleString()} sq ft @ $0.35/sq ft
          {confirmedQuote.sqft * RATE_PER_SQFT < MINIMUM_PRICE
            ? ` (minimum $${MINIMUM_PRICE} applies)`
            : ""}
        </p>
        <p className="mt-5 text-slate-600">
          We&apos;ve received your info and will reach out shortly to confirm your appointment.
        </p>
        <Button
          type="button"
          variant="outline"
          className="mt-6"
          onClick={() => {
            setState("idle");
            setSqft("");
            setQuote(null);
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
      {/* honeypot */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {/* Live price display */}
      <div className="rounded-2xl border-2 border-dashed border-blue-200 bg-blue-50 px-6 py-5 text-center">
        {quote !== null ? (
          <>
            <p className="text-xs font-semibold uppercase tracking-widest text-accent">
              Estimated Deep Clean Price
            </p>
            <p className="mt-1 font-display text-4xl font-bold text-slate-950">
              ${quote.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
            {parseFloat(sqft) * RATE_PER_SQFT < MINIMUM_PRICE && (
              <p className="mt-1 text-xs text-slate-500">Minimum $300 applies</p>
            )}
          </>
        ) : (
          <p className="text-sm text-slate-400">Enter your square footage below to see your instant price</p>
        )}
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
          onChange={(e) => handleSqftChange(e.target.value)}
        />
        <p className="mt-1.5 text-xs text-slate-400">$0.35 per sq ft · $300 minimum</p>
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

      <Button type="submit" size="lg" disabled={state === "submitting" || quote === null}>
        {state === "submitting" ? "Getting your quote…" : "Get My Instant Quote"}
      </Button>
    </form>
  );
}
