import nodemailer from "nodemailer";
import { readFileSync } from "node:fs";

// Minimal .env.local loader (no external dep)
for (const line of readFileSync(".env.local", "utf8").split("\n")) {
  const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
  if (m && !process.env[m[1]]) process.env[m[1]] = m[2];
}

const provider = process.argv[3] || "gmail"; // "gmail" or "plattera"
const to = process.argv[2] || process.env.EMAIL_USER;

const config =
  provider === "plattera"
    ? {
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        secure: String(process.env.SMTP_SECURE) === "true",
        auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
        from: process.env.SMTP_FROM,
      }
    : {
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
        from: process.env.EMAIL_USER,
      };

const transporter = nodemailer.createTransport({
  host: config.host,
  port: config.port,
  secure: config.secure,
  auth: config.auth,
});

try {
  console.log(`[${provider}] Verifying connection & auth (${config.host}:${config.port})...`);
  await transporter.verify();
  console.log("✅ Connection & auth OK");

  console.log(`Sending test email to ${to} ...`);
  const info = await transporter.sendMail({
    from: config.from,
    to,
    subject: `Plattera SMTP test (${provider})`,
    text: `Test email sent via ${provider} at ${config.host}. If you can read this, delivery works.`,
  });
  console.log("✅ Mail sent. messageId:", info.messageId);
  console.log("accepted:", info.accepted, "rejected:", info.rejected);
  console.log("response:", info.response);
} catch (err) {
  console.error("❌ Error:", err.message);
  if (err.code) console.error("code:", err.code);
  if (err.response) console.error("response:", err.response);
  process.exit(1);
}
