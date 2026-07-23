import nodemailer, { type Transporter } from "nodemailer";

type Account = {
  host?: string;
  port: number;
  secure: boolean;
  user?: string;
  pass?: string;
  from?: string;
};

function primaryAccount(): Account {
  return {
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT ?? 465),
    secure: String(process.env.SMTP_SECURE ?? "true") === "true",
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
    from: process.env.SMTP_FROM || process.env.SMTP_USER,
  };
}

function fallbackAccount(): Account | null {
  if (!process.env.SMTP_FALLBACK_HOST || !process.env.SMTP_FALLBACK_USER) {
    return null;
  }
  return {
    host: process.env.SMTP_FALLBACK_HOST,
    port: Number(process.env.SMTP_FALLBACK_PORT ?? 465),
    secure: String(process.env.SMTP_FALLBACK_SECURE ?? "true") === "true",
    user: process.env.SMTP_FALLBACK_USER,
    pass: process.env.SMTP_FALLBACK_PASS,
    from: process.env.SMTP_FALLBACK_FROM || process.env.SMTP_FALLBACK_USER,
  };
}

const transporters = new Map<string, Transporter>();

function transporterFor(acc: Account): Transporter {
  const key = `${acc.host}:${acc.port}:${acc.user}`;
  let t = transporters.get(key);
  if (!t) {
    t = nodemailer.createTransport({
      host: acc.host,
      port: acc.port,
      secure: acc.secure,
      auth: { user: acc.user, pass: acc.pass },
    });
    transporters.set(key, t);
  }
  return t;
}

export async function sendMail(opts: {
  subject: string;
  html: string;
  text?: string;
  replyTo?: string;
}): Promise<{ via: string }> {
  const to = process.env.CONTACT_TO || process.env.SMTP_USER;

  const accounts = [primaryAccount(), fallbackAccount()].filter(
    Boolean
  ) as Account[];

  let lastErr: unknown;
  for (const acc of accounts) {
    try {
      await transporterFor(acc).sendMail({
        from: acc.from,
        to,
        subject: opts.subject,
        text: opts.text,
        html: opts.html,
        replyTo: opts.replyTo,
      });
      return { via: acc.host ?? "unknown" };
    } catch (err) {
      lastErr = err;
      console.error(`Mail send failed via ${acc.host}:`, err);
    }
  }
  throw lastErr ?? new Error("No SMTP account configured");
}
