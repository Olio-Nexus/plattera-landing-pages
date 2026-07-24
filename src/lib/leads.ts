import { getTracking } from "./tracking";

export type LeadType = "enquiry" | "brochure" | "subscribe";

// Human-friendly names surfaced to GTM / GA4 in the `formName` field.
const FORM_NAMES: Record<LeadType, string> = {
  enquiry: "Enquiry Form",
  brochure: "Brochure Form",
  subscribe: "Subscribe Form",
};

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

/**
 * Notify Google Tag Manager that a lead was captured.
 * Fires ONLY after the API confirms success (see submitLead), never on click.
 */
function pushLeadEvent(type: LeadType, fields: LeadFields, page: string) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: "lead_form_submit",
    formType: type,
    formName: FORM_NAMES[type],
    page,
    ...fields,
  });
}

export type LeadFields = {
  fullName?: string;
  email?: string;
  phone?: string;
  quantity?: string;
  occasion?: string;
  budget?: string;
  address?: string;
  message?: string;
};

/**
 * Send a lead to /api/lead, automatically attaching the page + UTM tracking.
 * Throws on network / server error so the caller can show a message.
 */
export async function submitLead(input: {
  type: LeadType;
  fields: LeadFields;
}): Promise<void> {
  const tracking = getTracking();
  const res = await fetch("/api/lead", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      type: input.type,
      fields: input.fields,
      ...tracking,
    }),
  });
  if (!res.ok) {
    throw new Error(`Lead submit failed (${res.status})`);
  }
  // Success confirmed by the API — now (and only now) tell GTM.
  pushLeadEvent(input.type, input.fields, tracking.page);
}
