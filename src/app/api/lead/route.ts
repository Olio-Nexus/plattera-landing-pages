// Landing-page lead capture.
//
// Leads are forwarded to the Plattera CRM (`POST /api/store/enquiries`) so they
// land in the CRM's Leads inbox alongside the storefront's — tagged with the
// landing page they came from. The CRM records the lead AND emails the routed
// recipients, so this app sends no email of its own (and no longer logs to a
// Google Sheet).

type LeadType = "enquiry" | "brochure" | "subscribe";

type Body = {
  type: LeadType;
  page?: string;
  link?: string;
  fullUrl?: string;
  fields?: Record<string, string | undefined>;
  utm?: Record<string, string | undefined>;
};

// Landing form → CRM enquiry channel. "enquiry" and "brochure" are real sales
// leads → the CRM "quote" channel (which emails Apurva, Ashwin & contact@). A
// newsletter signup isn't a sales lead → the CRM "newsletter" channel.
const CRM_CHANNEL: Record<LeadType, "quote" | "newsletter"> = {
  enquiry: "quote",
  brochure: "quote",
  subscribe: "newsletter",
};

// Human label for the originating form (shown in the CRM lead + email).
const FORM_LABEL: Record<LeadType, string> = {
  enquiry: "Enquiry form",
  brochure: "Brochure download",
  subscribe: "Newsletter signup",
};

function crmBase(): string {
  return (process.env.CRM_API_URL ?? "").replace(/\/+$/, "");
}

// Forward the lead to the CRM's public enquiries endpoint (server-to-server).
async function forwardToCrm(body: Body): Promise<{ ok: boolean }> {
  const base = crmBase();
  if (!base) {
    console.error("CRM_API_URL is not set — cannot forward lead");
    return { ok: false };
  }

  const f = body.fields ?? {};
  const u = body.utm ?? {};

  // Everything beyond name/email/phone/message goes in `payload` — the CRM shows
  // it in the lead's Details and the notification email. `source` is a machine
  // marker (the CRM hides it from display); `landingPage`/`formType` are shown.
  const payload: Record<string, string> = {
    source: "Landing Page",
    landingPage: body.page || "Landing page",
    formType: FORM_LABEL[body.type],
  };
  const add = (k: string, v?: string) => {
    if (v) payload[k] = v;
  };
  add("quantity", f.quantity);
  add("occasion", f.occasion);
  add("budget", f.budget);
  add("address", f.address);
  for (const [k, v] of Object.entries(u)) add(k, v);

  try {
    const res = await fetch(`${base}/api/store/enquiries`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: CRM_CHANNEL[body.type],
        name: f.fullName,
        email: f.email,
        phone: f.phone,
        message: f.message,
        payload,
      }),
    });
    if (!res.ok) {
      console.error(
        "CRM enquiry rejected:",
        res.status,
        (await res.text()).slice(0, 300)
      );
      return { ok: false };
    }
    return { ok: true };
  } catch (err) {
    console.error("CRM enquiry forward failed:", err);
    return { ok: false };
  }
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

  const { ok } = await forwardToCrm(body);
  if (!ok) {
    return Response.json(
      { ok: false, error: "Could not submit. Please try again." },
      { status: 502 }
    );
  }
  return Response.json({ ok: true });
}
