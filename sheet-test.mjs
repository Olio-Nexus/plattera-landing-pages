import { readFileSync } from "node:fs";

// Load .env.local
const env = {};
for (const line of readFileSync(".env.local", "utf8").split("\n")) {
  const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
  if (m) env[m[1]] = m[2];
}
const URL = env.SHEETS_WEBHOOK_URL;
const SECRET = env.SHEETS_SECRET;

const utm = {
  utm_source: "google",
  utm_medium: "cpc",
  utm_campaign: "diwali_2026",
  utm_campaign_name: "Diwali Corporate",
  utm_term: "corporate gifts",
  utm_content: "hero_cta",
  utm_ad_id: "AD-12345",
  utm_ad_group: "AG-777",
  utm_ad_group_name: "Gifting - Exact",
  utm_sitelink: "brochure",
};

// One lead per (type, page) to exercise every tab.
const leads = [
  { type: "enquiry", page: "Home", link: "https://plattera.in/" },
  { type: "brochure", page: "Home", link: "https://plattera.in/" },
  { type: "subscribe", page: "Home", link: "https://plattera.in/" },
  { type: "enquiry", page: "Employee Welcome Kits", link: "https://plattera.in/employee-welcome-kits" },
  { type: "brochure", page: "Women's Day Corporate", link: "https://plattera.in/womens-day-corporate" },
  { type: "subscribe", page: "Corporate Diwali Gifts", link: "https://plattera.in/corporate-diwali-gifts" },
];

function fieldsFor(type, i) {
  const base = {
    fullName: `Test ${type} ${i}`,
    email: `test${i}@example.com`,
    phone: "+91 9876543210",
  };
  if (type === "subscribe") return { email: base.email };
  if (type === "enquiry")
    return {
      ...base,
      quantity: "26 - 50",
      occasion: "Festive / Diwali",
      budget: "₹1,000 - ₹2,500",
      address: "123 Test Street, Mumbai, 400001",
      message: "Automated coverage test.",
    };
  return base; // brochure
}

let i = 0;
for (const lead of leads) {
  i++;
  const payload = {
    secret: SECRET,
    type: lead.type,
    page: lead.page,
    link: lead.link,
    fullUrl: `${lead.link}?utm_source=google&utm_medium=cpc&utm_campaign=diwali_2026`,
    timestamp: new Date().toISOString(),
    fields: fieldsFor(lead.type, i),
    utm,
  };
  const res = await fetch(URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    redirect: "follow",
  });
  const text = await res.text();
  console.log(`${lead.type.padEnd(9)} @ ${lead.page.padEnd(24)} → ${res.status} ${text.slice(0, 80)}`);
}

console.log("\n=== Tab summary ===");
const sum = await fetch(URL, { redirect: "follow" });
console.log(await sum.text());
