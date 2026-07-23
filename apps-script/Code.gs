/**
 * Plattera — Lead capture web app (Google Sheets logger)
 * ------------------------------------------------------
 * Writes every lead to:
 *   • "Master"            → all leads
 *   • <Page name>         → per-page tab (e.g. "Home", "Employee Welcome Kits")
 *   • <Type>              → "Brochure", "Subscribe", "Enquiry"
 *
 * SETUP
 *  1. Create a Google Sheet.
 *  2. Extensions ▸ Apps Script — paste this file.
 *  3. Set SHARED_SECRET below to a random string.
 *  4. Deploy ▸ New deployment ▸ Web app
 *       - Execute as: Me
 *       - Who has access: Anyone
 *  5. Copy the /exec URL → put it in .env.local as SHEETS_WEBHOOK_URL
 *     and set SHEETS_SECRET to the same value as SHARED_SECRET.
 */

const SHARED_SECRET = "CHANGE_ME_SECRET"; // must equal SHEETS_SECRET in .env.local

// Column order — matches the campaign columns requested.
const HEADERS = [
  "Timestamp",
  "Type",
  "Pages",
  "Full Name",
  "Email",
  "Phone",
  "Quantity",
  "Occasion",
  "Budget",
  "Address",
  "Message",
  "Link",
  "UTM Source",
  "UTM Medium",
  "UTM Campaign",
  "UTM Campaign Name",
  "UTM Term",
  "UTM Content",
  "UTM Ad ID",
  "UTM Ad Group",
  "UTM Ad Group Name",
  "UTM Sitelink",
  "Full URL",
];

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);

    if (SHARED_SECRET && data.secret !== SHARED_SECRET) {
      return json({ ok: false, error: "unauthorized" });
    }

    var f = data.fields || {};
    var u = data.utm || {};

    var row = [
      data.timestamp || new Date().toISOString(),
      cap(data.type || ""),
      data.page || "",
      f.fullName || "",
      f.email || "",
      f.phone || "",
      f.quantity || "",
      f.occasion || "",
      f.budget || "",
      f.address || "",
      f.message || "",
      data.link || "",
      u.utm_source || "",
      u.utm_medium || "",
      u.utm_campaign || "",
      u.utm_campaign_name || "",
      u.utm_term || "",
      u.utm_content || "",
      u.utm_ad_id || "",
      u.utm_ad_group || "",
      u.utm_ad_group_name || "",
      u.utm_sitelink || "",
      data.fullUrl || "",
    ];

    // Serialize writes so concurrent form submits don't collide.
    var lock = LockService.getScriptLock();
    lock.waitLock(20000);
    try {
      appendRow("Master", row);
      if (data.page) appendRow(data.page, row);
      if (data.type) appendRow(cap(data.type), row);
    } finally {
      lock.releaseLock();
    }

    return json({ ok: true });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  }
}

// Health check + per-tab summary (open the /exec URL in a browser to view).
function doGet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheets = ss.getSheets();
  var tabs = sheets.map(function (sh) {
    var last = sh.getLastRow();
    var dataRows = Math.max(0, last - 1); // minus header
    var latest = "";
    if (dataRows > 0) {
      var vals = sh.getRange(last, 1, 1, 5).getValues()[0];
      latest = vals[0] + " | " + vals[1] + " | " + vals[3]; // time | type | name
    }
    return { tab: sh.getName(), leads: dataRows, latest: latest };
  });
  return json({
    ok: true,
    status: "Plattera lead endpoint live",
    tabCount: tabs.length,
    tabs: tabs,
  });
}

function appendRow(sheetName, row) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sh = ss.getSheetByName(sheetName);
  if (!sh) sh = ss.insertSheet(sheetName);
  if (sh.getLastRow() === 0) {
    sh.getRange(1, 1, 1, HEADERS.length)
      .setValues([HEADERS])
      .setFontWeight("bold");
    sh.setFrozenRows(1);
  }

  var r = sh.getLastRow() + 1;
  var range = sh.getRange(r, 1, 1, row.length);
  // Force plain-text format so values like "+91 98765..." or a leading "="
  // are stored literally instead of being parsed as a formula (#ERROR!).
  range.setNumberFormat("@");
  range.setValues([
    row.map(function (v) {
      return v == null ? "" : String(v);
    }),
  ]);
}

function cap(s) {
  return s ? s.charAt(0).toUpperCase() + s.slice(1) : s;
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  );
}
