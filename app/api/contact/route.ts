import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/contact";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const WINDOW_MS = 60 * 60 * 1000;
const MAX_REQUESTS = 5;
const hits = new Map<string, number[]>();

function isRateLimited(ip: string) {
  const now = Date.now();
  const list = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  if (list.length >= MAX_REQUESTS) {
    hits.set(ip, list);
    return true;
  }
  list.push(now);
  hits.set(ip, list);
  return false;
}

function escapeHtml(value: string) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

async function sendWithResend(to: string, from: string, subject: string, html: string, replyTo: string) {
  const key = process.env.RESEND_API_KEY;
  if (!key) return false;
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from, to: [to], reply_to: replyTo, subject, html })
  });
  return res.ok;
}

export async function POST(request: Request) {
  try {
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    if (isRateLimited(ip)) {
      return NextResponse.json({ error: "Too many messages from this address. Please try again later." }, { status: 429 });
    }
    const body = await request.json().catch(() => null);
    const parsed = contactSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Please check your details and try again.", details: parsed.error.flatten().fieldErrors }, { status: 400 });
    }
    const data = parsed.data;
    if (data.website) {
      return NextResponse.json({ ok: true });
    }
    const to = process.env.CONTACT_TO_EMAIL;
    const from = process.env.CONTACT_FROM_EMAIL;
    if (!to || !from || !process.env.RESEND_API_KEY || to.includes("I_WILL_PROVIDE") || from.includes("I_WILL_PROVIDE")) {
      return NextResponse.json({ error: "Email is not configured yet. Please email ibrahimkhalilullah534@gmail.com directly." }, { status: 503 });
    }
    const mainHtml = `
      <h2>New portfolio enquiry</h2>
      <p><strong>Name:</strong> ${escapeHtml(data.name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
      <p><strong>Subject:</strong> ${escapeHtml(data.subject)}</p>
      <p><strong>Service:</strong> ${escapeHtml(data.service || "Not specified")}</p>
      <p><strong>Budget:</strong> ${escapeHtml(data.budget || "Not specified")}</p>
      <p><strong>Message:</strong></p>
      <p>${escapeHtml(data.message).replace(/\n/g, "<br />")}</p>
    `;
    const sent = await sendWithResend(to, from, `Portfolio: ${data.subject}`, mainHtml, data.email);
    if (!sent) {
      return NextResponse.json({ error: "Email could not be sent. Please try again." }, { status: 502 });
    }
    await sendWithResend(
      data.email,
      from,
      "Thanks for your message",
      `<p>Hi ${escapeHtml(data.name)},</p><p>Thanks for your message about “${escapeHtml(data.subject)}”. I will reply with a clear next step.</p><p>Ibrahim Khalil Ullah</p>`,
      to
    );
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
