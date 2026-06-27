import { NextResponse } from "next/server";
import {
  buildEmailHtml,
  fieldRow,
  sendNotificationEmail,
} from "@/lib/email";
import { getClientIp, isRateLimited } from "@/lib/rate-limit";

type ContactBody = {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
  website?: string;
};

export async function POST(request: Request) {
  const ip = getClientIp(request);
  if (isRateLimited(`contact:${ip}`)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again in a minute." },
      { status: 429 },
    );
  }

  let body: ContactBody;
  try {
    body = (await request.json()) as ContactBody;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (body.website) {
    return NextResponse.json({ ok: true });
  }

  const name = body.name?.trim();
  const email = body.email?.trim();
  const message = body.message?.trim();

  if (!name || !email || !message) {
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
    fieldRow("Phone", body.phone?.trim() || "Not provided"),
    fieldRow("Message", message),
  ].join("");

  const result = await sendNotificationEmail(
    `New Contact Message — ${name}`,
    buildEmailHtml("New Contact Inquiry", rows),
  );

  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
