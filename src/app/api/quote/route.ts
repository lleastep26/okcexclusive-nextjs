import { NextResponse } from "next/server";
import { serviceOptions } from "@/lib/content";
import {
  buildEmailHtml,
  fieldRow,
  sendNotificationEmail,
} from "@/lib/email";
import { getClientIp, isRateLimited } from "@/lib/rate-limit";

type QuoteBody = {
  name?: string;
  email?: string;
  phone?: string;
  service?: string;
  address?: string;
  bedrooms?: string;
  bathrooms?: string;
  sqft?: string;
  preferredDate?: string;
  notes?: string;
  website?: string;
};

function getServiceLabel(value: string): string {
  return serviceOptions.find((option) => option.value === value)?.label ?? value;
}

export async function POST(request: Request) {
  const ip = getClientIp(request);
  if (isRateLimited(`quote:${ip}`)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again in a minute." },
      { status: 429 },
    );
  }

  let body: QuoteBody;
  try {
    body = (await request.json()) as QuoteBody;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (body.website) {
    return NextResponse.json({ ok: true });
  }

  const name = body.name?.trim();
  const email = body.email?.trim();
  const phone = body.phone?.trim();
  const service = body.service?.trim();
  const address = body.address?.trim();

  if (!name || !email || !phone || !service || !address) {
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

  const rows = [
    fieldRow("Name", name),
    fieldRow("Email", email),
    fieldRow("Phone", phone),
    fieldRow("Service", getServiceLabel(service)),
    fieldRow("Address", address),
    fieldRow("Bedrooms", body.bedrooms?.trim() || "Not provided"),
    fieldRow("Bathrooms", body.bathrooms?.trim() || "Not provided"),
    fieldRow("Square Feet", body.sqft?.trim() || "Not provided"),
    fieldRow("Preferred Date", body.preferredDate?.trim() || "Not provided"),
    fieldRow("Notes", body.notes?.trim() || "None"),
  ].join("");

  const result = await sendNotificationEmail(
    `New Quote Request — ${name}`,
    buildEmailHtml("New Quote Request", rows),
  );

  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
