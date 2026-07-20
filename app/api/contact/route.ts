import { NextResponse } from "next/server";
import { contactCategories } from "@/lib/copy";

// Deployment Path A: this server-side handler receives the contact form.
// It validates input, then forwards the message to whatever delivery target is
// configured via env (a webhook — e.g. Formspree/Zapier/an email API).
//
// TODO(contact-email): no real BIQADX inbox / delivery endpoint is supplied yet.
// Until CONTACT_DELIVERY_WEBHOOK is set, this returns "not_configured" (503) and
// the form shows an honest message — it never fakes a successful send (brief §8).
//
// Path B note: a static export drops API routes; repoint the form at a
// third-party form service instead (see next.config.mjs).

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 });
  }

  const enquiryType = str(body.enquiryType);
  const name = str(body.name);
  const email = str(body.email);
  const message = str(body.message);
  const organization = str(body.organization);
  const location = str(body.location);
  const program = str(body.program);
  const nda = body.nda === true;
  const honeypot = str(body.company);

  // Bot honeypot: pretend success without doing anything.
  if (honeypot) return NextResponse.json({ ok: true }, { status: 200 });

  const fields: string[] = [];
  if (!contactCategories.includes(enquiryType as (typeof contactCategories)[number]))
    fields.push("enquiryType");
  if (!name) fields.push("name");
  if (!EMAIL_RE.test(email)) fields.push("email");
  if (!message) fields.push("message");
  if (fields.length) {
    return NextResponse.json({ ok: false, error: "validation", fields }, { status: 400 });
  }

  const webhook = process.env.CONTACT_DELIVERY_WEBHOOK;
  if (!webhook) {
    console.warn(
      "[contact] CONTACT_DELIVERY_WEBHOOK not set — TODO(contact-email). Message NOT delivered.",
    );
    return NextResponse.json({ ok: false, error: "not_configured" }, { status: 503 });
  }

  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        enquiryType,
        name,
        organization,
        email,
        location,
        program,
        message,
        nda,
        source: "biqadx.com/contact",
        receivedAt: new Date().toISOString(),
      }),
    });
    if (!res.ok) throw new Error(`delivery responded ${res.status}`);
  } catch (err) {
    console.error("[contact] delivery failed:", err);
    return NextResponse.json({ ok: false, error: "delivery_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
