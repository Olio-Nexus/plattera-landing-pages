// Leads are logged to Google Sheets and an email notification is sent.
// Railway allows outbound SMTP (Render did not), so email is enabled.
import { sendMail } from "@/lib/mail";

type LeadType = "enquiry" | "brochure" | "subscribe";

type Body = {
  type: LeadType;
  page?: string;
  link?: string;
  fullUrl?: string;
  fields?: Record<string, string | undefined>;
  utm?: Record<string, string | undefined>;
};

const TYPE_LABELS: Record<LeadType, string> = {
  enquiry: "Enquiry",
  brochure: "Brochure Download",
  subscribe: "Newsletter Subscribe",
};

function esc(v: unknown): string {
  return String(v ?? "").replace(/[<>&]/g, (c) =>
    c === "<" ? "&lt;" : c === ">" ? "&gt;" : "&amp;"
  );
}

// Fire the row off to the Google Apps Script web app (Google Sheets logger).
async function forwardToSheet(payload: Body & { timestamp: string }) {
  const url = process.env.SHEETS_WEBHOOK_URL;
  if (!url) return { ok: false, skipped: true };
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...payload, secret: process.env.SHEETS_SECRET }),
      redirect: "follow", // Apps Script 302-redirects to googleusercontent.com
    });
    // Apps Script always returns HTTP 200 — the real status is in the JSON body.
    const text = await res.text();
    let ok = res.ok;
    try {
      ok = ok && JSON.parse(text).ok === true;
    } catch {
      ok = false; // non-JSON (e.g. an HTML error page) means it didn't record
    }
    if (!ok) console.error("Sheet forward rejected:", text.slice(0, 300));
    return { ok };
  } catch (err) {
    console.error("Sheet forward failed:", err);
    return { ok: false };
  }
}

async function notifyByEmail(body: Body) {
  const f = body.fields ?? {};
  const u = body.utm ?? {};
  const label = TYPE_LABELS[body.type] ?? body.type;

  const rows: [string, string | undefined][] = [
    ["Type", label],
    ["Page", body.page],
    ["Full Name", f.fullName],
    ["Email", f.email],
    ["Phone", f.phone],
    ["Quantity", f.quantity],
    ["Occasion", f.occasion],
    ["Budget", f.budget],
    ["Address", f.address],
    ["Message", f.message],
    ["UTM Source", u.utm_source],
    ["UTM Medium", u.utm_medium],
    ["UTM Campaign", u.utm_campaign],
    ["UTM Campaign Name", u.utm_campaign_name],
    ["UTM Term", u.utm_term],
    ["UTM Content", u.utm_content],
    ["UTM Ad ID", u.utm_ad_id],
    ["UTM Ad Group", u.utm_ad_group],
    ["UTM Ad Group Name", u.utm_ad_group_name],
    ["UTM Sitelink", u.utm_sitelink],
    ["Full URL", body.fullUrl],
  ];

  const tableRows = rows
    .filter(([, v]) => v)
    .map(
      ([k, v]) =>
        `<tr><td style="padding:6px 12px;color:#666;white-space:nowrap">${esc(
          k
        )}</td><td style="padding:6px 12px;font-weight:600">${esc(v)}</td></tr>`
    )
    .join("");

  await sendMail({
    subject: `New ${label} lead${body.page ? ` — ${body.page}` : ""}`,
    replyTo: f.email,
    text: rows
      .filter(([, v]) => v)
      .map(([k, v]) => `${k}: ${v}`)
      .join("\n"),
    html: `<div style="font-family:Arial,sans-serif;font-size:14px;color:#111">
      <h2 style="margin:0 0 12px">New ${esc(label)} lead</h2>
      <table style="border-collapse:collapse;border:1px solid #eee">${tableRows}</table>
    </div>`,
  });
}

export async function POST(request: Request) {
  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return Response.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  if (!body?.type || !["enquiry", "brochure", "subscribe"].includes(body.type)) {
    return Response.json({ ok: false, error: "Invalid type" }, { status: 400 });
  }

  const f = body.fields ?? {};
  if (body.type === "subscribe") {
    if (!f.email) {
      return Response.json({ ok: false, error: "Email required" }, { status: 400 });
    }
  } else if (!f.fullName || !f.email || !f.phone) {
    return Response.json(
      { ok: false, error: "Name, email and phone are required" },
      { status: 400 }
    );
  }

  const payload = { ...body, timestamp: new Date().toISOString() };

  // Log to Google Sheets and send the email notification in parallel.
  // The Sheet is the source of truth (gates the response); email is best-effort.
  const [sheet, email] = await Promise.allSettled([
    forwardToSheet(payload),
    notifyByEmail(body),
  ]);

  const sheetOk = sheet.status === "fulfilled" && sheet.value.ok;
  const emailOk = email.status === "fulfilled";

  if (!sheetOk) {
    return Response.json({ ok: false, error: "All sinks failed" }, { status: 502 });
  }
  return Response.json({ ok: true, sheet: sheetOk, email: emailOk });
}
