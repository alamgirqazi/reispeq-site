import { NextResponse } from "next/server";
import { site } from "@/lib/site";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Payload = Record<string, unknown>;

const MAX_LENGTH = 4000;

function asString(value: unknown, max = 300): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

/**
 * Receives contact enquiries.
 *
 * Delivery is intentionally pluggable so the site can go live before mail is
 * wired up:
 *   • Set CONTACT_WEBHOOK_URL to forward the enquiry as JSON (Zapier, Make,
 *     Power Automate, a Slack/Teams incoming webhook, or your own endpoint).
 *   • Otherwise the enquiry is written to the server log and the sender still
 *     gets a confirmation, so no lead is silently dropped in the browser.
 */
export async function POST(request: Request) {
  let body: Payload;
  try {
    body = (await request.json()) as Payload;
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  // Honeypot: a real person never fills this in.
  if (asString(body.company_website)) {
    return NextResponse.json({ ok: true });
  }

  const enquiry = {
    name: asString(body.name, 120),
    company: asString(body.company, 160),
    email: asString(body.email, 160),
    phone: asString(body.phone, 40),
    country: asString(body.country, 80),
    interest: asString(body.interest, 120),
    message: asString(body.message, MAX_LENGTH),
    locale: asString(body.locale, 5) || "en",
    receivedAt: new Date().toISOString(),
    source: site.domain,
  };

  if (!enquiry.name || !enquiry.email || !enquiry.message) {
    return NextResponse.json({ ok: false, error: "missing_fields" }, { status: 422 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(enquiry.email)) {
    return NextResponse.json({ ok: false, error: "invalid_email" }, { status: 422 });
  }

  const webhook = process.env.CONTACT_WEBHOOK_URL;
  if (webhook) {
    try {
      const forwarded = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(enquiry),
      });
      if (!forwarded.ok) throw new Error(`webhook responded ${forwarded.status}`);
    } catch (error) {
      console.error("[contact] webhook delivery failed", error, enquiry);
      return NextResponse.json({ ok: false, error: "delivery_failed" }, { status: 502 });
    }
  } else {
    console.info("[contact] enquiry received (no CONTACT_WEBHOOK_URL configured)", enquiry);
  }

  return NextResponse.json({ ok: true });
}
