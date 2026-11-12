import Link from "next/link";
import { SITE_NAME } from "@/lib/constants";

export function SmsConsentDisclosure() {
  return (
    <p className="text-xs leading-relaxed text-slate-500">
      By submitting, you agree to receive text messages from {SITE_NAME} about your
      request, appointments and service. Msg &amp; data rates may apply. Msg frequency
      varies. Reply STOP to opt out, HELP for help. See our{" "}
      <Link href="/privacy" className="underline hover:text-slate-700">
        Privacy Policy
      </Link>
      .
    </p>
  );
}
