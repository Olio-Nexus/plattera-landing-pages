import { getTracking } from "./tracking";

export type LeadType = "enquiry" | "brochure" | "subscribe";

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
}
