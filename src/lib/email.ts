export type EmailResult =
  | { ok: true; id?: string }
  | { ok: false; error: string };

const accessKey = process.env.WEB3FORMS_ACCESS_KEY;
const TO_EMAIL = "exclusive@okcexclusivecleaning.com";

export async function sendNotificationEmail(
  subject: string,
  html: string,
): Promise<EmailResult> {
  if (!accessKey) {
    console.warn("WEB3FORMS_ACCESS_KEY not set — email not sent:", subject);
    return { ok: true, id: "dev-mode" };
  }

  try {
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: accessKey,
        subject,
        from_name: "Exclusive Cleaning Website",
        message: html,
      }),
    });

    const text = await res.text();
    let data: { success: boolean; message?: string };
    try {
      data = JSON.parse(text) as { success: boolean; message?: string };
    } catch {
      console.error("Web3Forms non-JSON response:", text.slice(0, 200));
      return { ok: false, error: "Unexpected response from email provider." };
    }

    if (!data.success) {
      return { ok: false, error: data.message ?? "Web3Forms submission failed." };
    }

    return { ok: true };
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
