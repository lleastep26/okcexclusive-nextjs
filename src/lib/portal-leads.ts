import { submitToWeb3Forms, type SubmitResult } from "./web3forms";

/**
 * Sends each form submission to the Sitewyre client portal as a lead, so
 * it shows up there and starts the instant reply, follow-ups and owner
 * alert. The site key is the public one every Sitewyre site carries; it
 * only identifies which business the lead belongs to.
 */
const PORTAL_LEADS_URL =
  process.env.NEXT_PUBLIC_SITEWYRE_LEADS_URL ??
  "https://sitewyre-client-portal.vercel.app/api/leads";
const SITE_KEY =
  process.env.NEXT_PUBLIC_SITEWYRE_SITE_KEY ?? "af6e62ad7807180fcf897894";

const PORTAL_TIMEOUT_MS = 8000;

export type PortalLead = {
  name: string;
  phone: string;
  email?: string;
  message: string;
  service?: string;
  /** The hidden spam-trap field; a filled one means a bot. */
  honeypot?: string;
};

export type PortalResult = { ok: boolean; reason?: string };

/** Never throws: a portal problem must not get in the visitor's way. */
export async function sendLeadToPortal(lead: PortalLead): Promise<PortalResult> {
  if (lead.honeypot) return { ok: false, reason: "honeypot" };

  const name = lead.name.trim();
  const phone = lead.phone.trim();
  const message = lead.message.trim();
  // The portal needs a name, a phone number and a message to store a lead.
  if (!name || !message || phone.replace(/\D/g, "").length < 7) {
    return { ok: false, reason: "missing_fields" };
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), PORTAL_TIMEOUT_MS);
  try {
    const email = lead.email?.trim();
    const res = await fetch(PORTAL_LEADS_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        site_key: SITE_KEY,
        name,
        phone,
        ...(email ? { email } : {}),
        message,
        ...(lead.service ? { service: lead.service } : {}),
        source: "website_form",
        sms_opt_in: true,
      }),
      signal: controller.signal,
    });
    if (!res.ok) {
      console.error("Portal lead not saved:", res.status);
      return { ok: false, reason: `http_${res.status}` };
    }
    return { ok: true };
  } catch (error) {
    console.error("Portal lead not saved:", error);
    return { ok: false, reason: "network" };
  } finally {
    clearTimeout(timer);
  }
}

/**
 * Sends a submission both ways at once: the notification email (the
 * backup) and the portal lead. The visitor sees success as long as one
 * of them went through, so a failure on either side never loses a lead
 * or shows an error for something that was in fact received.
 */
export async function submitLead(
  emailFields: Record<string, string>,
  lead: PortalLead,
): Promise<SubmitResult> {
  const [email, portal] = await Promise.all([
    submitToWeb3Forms(emailFields),
    sendLeadToPortal(lead),
  ]);
  if (email.ok || portal.ok) return { ok: true };
  return email;
}
