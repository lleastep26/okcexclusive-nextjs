import { Resend } from "resend";
import { CONTACT } from "./constants";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

const notificationEmail =
  process.env.QUOTE_NOTIFICATION_EMAIL ?? CONTACT.email;

const fromEmail =
  process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev";

export type EmailResult =
  | { ok: true; id?: string }
  | { ok: false; error: string };

export async function sendNotificationEmail(
  subject: string,
  html: string,
): Promise<EmailResult> {
  if (!resend) {
    console.warn("RESEND_API_KEY not set — email not sent:", subject);
    return { ok: true, id: "dev-mode" };
  }

  try {
    const { data, error } = await resend.emails.send({
      from: `Exclusive Cleaning <${fromEmail}>`,
      to: notificationEmail,
      subject,
      html,
    });

    if (error) {
      return { ok: false, error: error.message };
    }

    return { ok: true, id: data?.id };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to send email";
    return { ok: false, error: message };
  }
}

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function fieldRow(label: string, value: string): string {
  return `<tr><td style="padding:8px 12px;font-weight:600;color:#64748b;vertical-align:top;">${escapeHtml(label)}</td><td style="padding:8px 12px;color:#0f172a;">${escapeHtml(value)}</td></tr>`;
}

export function buildEmailHtml(title: string, rows: string): string {
  return `
    <div style="font-family:system-ui,sans-serif;max-width:560px;margin:0 auto;">
      <h2 style="color:#0f172a;margin:0 0 16px;">${escapeHtml(title)}</h2>
      <table style="width:100%;border-collapse:collapse;background:#f8fafc;border-radius:8px;">
        ${rows}
      </table>
    </div>
  `;
}
