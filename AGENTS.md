<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Project: Plattera landing pages

Next.js 16 (App Router, Turbopack) marketing/landing site for Plattera corporate gifting. Multiple landing pages under `src/app/*` share `Header`, `Footer`, and section components in `src/components`.

## Lead capture pipeline
All three forms submit through one path — **do not** add per-form backends:
- Forms: `EnquiryForm`, `BrochureModal`, and footer `SubscribeForm` all call `submitLead()` in `src/lib/leads.ts`.
- `submitLead` attaches page + UTM tracking from `src/lib/tracking.ts` (first-touch UTMs persisted in sessionStorage; captured on load by `TrackingInit` in the root layout).
- POSTs to the route handler `src/app/api/lead/route.ts`, which fans out to two sinks (both best-effort, one failing doesn't block the other):
  1. **Email** via `src/lib/mail.ts` — primary Gmail SMTP, automatic fallback to the Plattera SMTP server.
  2. **Google Sheets** via the Apps Script web app (`SHEETS_WEBHOOK_URL`).

## Google Sheets logger
- Script lives at `apps-script/Code.gs`. Deploy it in the Sheet: Extensions ▸ Apps Script ▸ paste ▸ Deploy as Web app (Execute as *Me*, Access *Anyone*).
- After editing the script, updates only take effect via **Manage deployments ▸ Edit ▸ New version** (not just Save).
- Writes each lead to three tabs: `Master`, the page tab, and the type tab (`Brochure`/`Subscribe`/`Enquiry`). Values are written as plain text (`@` format) so `+91…` phone numbers don't become `#ERROR!` formulas.
- `SHEETS_SECRET` (env) must equal `SHARED_SECRET` in the script.

## Environment (`.env.local`, gitignored — never commit)
- SMTP primary: `SMTP_HOST/PORT/SECURE/USER/PASS/FROM`
- SMTP fallback: `SMTP_FALLBACK_HOST/PORT/SECURE/USER/PASS/FROM`
- `CONTACT_TO` — where lead notification emails go
- `SHEETS_WEBHOOK_URL`, `SHEETS_SECRET`
- See `.env.example` for the full template. `EMAIL_PASS` is a Google App Password, not a login password.

## Config & conventions
- Site-wide config (nav, contact, social links) is centralized in `src/lib/site.ts` — edit there, not in components.
- Brand color is `--brand` / `--primary` = `#295a4f`. Use `bg-brand` or `buttonVariants()` for buttons/CTAs so colors stay consistent.
- Reusable typography/section classes (`.h1`, `.h2`, `.description`, `.section`) live in `globals.css`.

## Git workflow
- Branches: `main` (releases) and `develop` (day-to-day). Remote: `Olio-Nexus/plattera-landing-pages`.
- Push with the **personal** SSH alias: remote URL uses `git@github.com-personal:…` (authenticates as `YashChaudhari-WORKING`). The `github.com-work` key (`OlioGlobal`) does **not** have access.
- Author: yash chaudhari `<choudhariyash7890@gmail.com>` (set in local repo config).

## Dev scripts
- `smtp-test.mjs` / `sheet-test.mjs` are throwaway manual test scripts that load `.env.local`. They contain no hardcoded secrets. Safe to delete.
