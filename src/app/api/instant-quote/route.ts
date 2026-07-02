import { NextResponse } from "next/server";
import { buildEmailHtml, fieldRow, sendNotificationEmail } from "@/lib/email";
import { calcQuotePrice, formatPrice, formatRate, formatRatePerVisit } from "@/lib/quote-pricing";
import { parseMaintenanceFrequency, parsePropertyType } from "@/lib/quote-selection";
import { getClientIp, isRateLimited } from "@/lib/rate-limit";

type Body = {
  name?: string;
  email?: string;
  phone?: string;
  sqft?: string;
  property?: string;
  service?: string;
  frequency?: string;
  website?: string;
};

export async function POST(request: Request) {
  const ip = getClientIp(request);
  if (isRateLimited(`instant-quote:${ip}`)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again in a minute." },
      { status: 429 },
    );
  }

  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (body.website) {
    return NextResponse.json({ ok: true });
  }

  const name = body.name?.trim();
  const email = body.email?.trim();
  const phone = body.phone?.trim();
  const sqftRaw = body.sqft?.trim();

  if (!name || !email || !phone || !sqftRaw) {
    return NextResponse.json(
      { error: "Please fill in all required fields." },
      { status: 400 },
    );
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 },
    );
  }

  const sqft = parseFloat(sqftRaw);
  if (isNaN(sqft) || sqft <= 0) {
    return NextResponse.json(
      { error: "Please enter a valid square footage." },
      { status: 400 },
    );
  }

  const quote = calcQuotePrice(
    sqft,
    parsePropertyType(body.property),
    body.service ?? null,
    parseMaintenanceFrequency(body.frequency),
  );
  const priceFormatted = formatPrice(quote.price);
  const rateFormatted = quote.isMaintenanceMonthly
    ? formatRatePerVisit(quote.rate)
    : formatRate(quote.rate);

  const rows = [
    fieldRow("Name", name),
    fieldRow("Email", email),
    fieldRow("Phone", phone),
    fieldRow("Square Footage", `${sqft.toLocaleString()} sq ft`),
    fieldRow("Rate", rateFormatted),
    ...(quote.visitsPerMonth
      ? [
          fieldRow("Visits Per Month", String(quote.visitsPerMonth)),
          fieldRow(
            "Per Visit Price",
            quote.perVisitPrice ? formatPrice(quote.perVisitPrice) : "N/A",
          ),
        ]
      : []),
    fieldRow(
      "Quoted Price",
      quote.isMaintenanceMonthly
        ? `${priceFormatted} per month`
        : `${priceFormatted}${quote.minimumApplied && quote.minimum ? ` (minimum $${quote.minimum} applied)` : ""}`,
    ),
  ].join("");

  const result = await sendNotificationEmail(
    `New Instant Quote — ${name} — ${priceFormatted}`,
    buildEmailHtml("New Instant Quote", rows),
  );

  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
