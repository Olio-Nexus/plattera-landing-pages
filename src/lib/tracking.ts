// Client-side UTM / ad campaign tracking.
// Captures campaign params from the landing URL (first-touch) and keeps them
// for the session, so a lead submitted on any page still carries the source.

export const UTM_FIELDS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_campaign_name",
  "utm_term",
  "utm_content",
  "utm_ad_id",
  "utm_ad_group",
  "utm_ad_group_name",
  "utm_sitelink",
] as const;

export type Utm = Partial<Record<(typeof UTM_FIELDS)[number], string>>;

// Accept a few common aliases so Google Ads ValueTrack params still map cleanly.
const ALIASES: Record<string, (typeof UTM_FIELDS)[number]> = {
  utm_campaignname: "utm_campaign_name",
  utm_adid: "utm_ad_id",
  utm_adgroup: "utm_ad_group",
  utm_adgroupname: "utm_ad_group_name",
};

const STORAGE_KEY = "plattera_utm";

// Friendly page names for the "Pages" column / per-page sheet tabs.
const PAGE_NAMES: Record<string, string> = {
  "/": "Home",
  "/employee-welcome-kits": "Employee Welcome Kits",
  "/womens-day-corporate": "Women's Day Corporate",
};

function pageNameFrom(pathname: string): string {
  if (PAGE_NAMES[pathname]) return PAGE_NAMES[pathname];
  const slug = pathname.replace(/^\/+|\/+$/g, "");
  if (!slug) return "Home";
  return slug
    .split("/")[0]
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function readUtmsFromSearch(search: string): Utm {
  const params = new URLSearchParams(search);
  const out: Utm = {};
  params.forEach((value, rawKey) => {
    const key = rawKey.toLowerCase();
    if ((UTM_FIELDS as readonly string[]).includes(key)) {
      out[key as keyof Utm] = value;
    } else if (ALIASES[key]) {
      out[ALIASES[key]] = value;
    }
  });
  return out;
}

/** Call once on every page load — persists first-touch campaign params. */
export function captureFirstTouch(): void {
  if (typeof window === "undefined") return;
  try {
    const current = readUtmsFromSearch(window.location.search);
    if (Object.keys(current).length === 0) return; // nothing to capture
    const existing = sessionStorage.getItem(STORAGE_KEY);
    if (!existing) {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(current));
    }
  } catch {
    /* storage blocked — ignore */
  }
}

function storedUtms(): Utm {
  if (typeof window === "undefined") return {};
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Utm) : {};
  } catch {
    return {};
  }
}

export type Tracking = {
  page: string;
  link: string;
  fullUrl: string;
  utm: Utm;
};

/** Build the tracking payload to attach to a lead at submit time. */
export function getTracking(): Tracking {
  if (typeof window === "undefined") {
    return { page: "", link: "", fullUrl: "", utm: {} };
  }
  const { origin, pathname, search, href } = window.location;
  // First-touch (persisted) wins; fall back to current URL params.
  const utm = { ...readUtmsFromSearch(search), ...storedUtms() };
  return {
    page: pageNameFrom(pathname),
    link: origin + pathname,
    fullUrl: href,
    utm,
  };
}
