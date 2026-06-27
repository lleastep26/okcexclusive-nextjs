const ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ?? "";

export type SubmitResult =
  | { ok: true }
  | { ok: false; error: string };

export async function submitToWeb3Forms(
  fields: Record<string, string>,
): Promise<SubmitResult> {
  if (!ACCESS_KEY) {
    console.warn("NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY not set");
    return { ok: false, error: "Email service not configured." };
  }

  try {
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ access_key: ACCESS_KEY, ...fields }),
    });

    const data = (await res.json()) as { success: boolean; message?: string };

    if (!data.success) {
      return { ok: false, error: data.message ?? "Submission failed. Please try again." };
    }

    return { ok: true };
  } catch {
    return { ok: false, error: "Network error. Please try again." };
  }
}
