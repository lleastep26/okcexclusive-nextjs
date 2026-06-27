import { NextResponse } from "next/server";
import { buildEmailHtml, fieldRow, sendNotificationEmail } from "@/lib/email";
import { getClientIp, isRateLimited } from "@/lib/rate-limit";

const RATE_PER_SQFT = 0.35;
const MINIMUM_PRICE = 300;

function calcPrice(sqft: number): number {
  return Math.max(sqft * RATE_PER_SQFT, MINIMUM_PRICE);
}

type Body = {
  name?: string;
  email?: string;
  phone?: string;
  sqft?: string;
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

  const price = calcPrice(sqft);
  const priceFormatted = `$${price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  const minimumApplied = sqft * RATE_PER_SQFT < MINIMUM_PRICE;

  const rows = [
    fieldRow("Name", name),
    fieldRow("Email", email),
    fieldRow("Phone", phone),
    fieldRow("Square Footage", `${sqft.toLocaleString()} sq ft`),
    fieldRow("Rate", "$0.35 per sq ft"),
    fieldRow("Quoted Price", `${priceFormatted}${minimumApplied ? " (minimum applied)" : ""}`),
  ].join("");

  const result = await sendNotificationEmail(
    `New Instant Deep Clean Quote — ${name} — ${priceFormatted}`,
    buildEmailHtml("New Instant Deep Clean Quote", rows),
  );

  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
