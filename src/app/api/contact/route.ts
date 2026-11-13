import { Resend } from "resend";
import { getAdminNotificationEmail } from "@/lib/email-templates";
import { clientIp, isAdmin, json, readList, writeList } from "@/lib/store";

type ContactMessage = {
  id: string;
  name: string;
  email: string;
  message: string;
  timestamp: string;
  read: boolean;
};

const escapeHtml = (t: string) =>
  t
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");

async function verifyTurnstile(token: string, ip: string): Promise<boolean> {
  const secret = process.env.CLOUDFLARE_TURNSTILE_SECRET_KEY;
  if (!secret) return true;
  const res = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ secret, response: token, remoteip: ip }),
    },
  );
  const data = (await res.json()) as { success?: boolean };
  return data.success === true;
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return json({ error: "Send the form as JSON." }, 400);
  }

  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "")
    .trim()
    .toLowerCase();
  const message = String(body.message ?? "").trim();
  const token = String(body.turnstileToken ?? "");

  if (!name || !email || !message)
    return json({ error: "Fill in your name, email and message." }, 400);
  if (name.length > 100)
    return json({ error: "Keep your name under 100 characters." }, 400);
  if (message.length > 5000)
    return json({ error: "Keep your message under 5,000 characters." }, 400);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return json({ error: "That email address doesn't look right." }, 400);

  try {
    if (process.env.CLOUDFLARE_TURNSTILE_SECRET_KEY && !token) {
      return json({ error: "Complete the verification check first." }, 400);
    }
    if (!(await verifyTurnstile(token, clientIp(request)))) {
      return json(
        { error: "Verification failed. Reload the page and try again." },
        400,
      );
    }
  } catch (err) {
    console.error("Turnstile check failed:", err);
    return json(
      {
        error:
          "Verification is unavailable right now. Email me directly instead.",
      },
      502,
    );
  }

  try {
    const messages = await readList<ContactMessage>("contact-messages");
    messages.push({
      id: Date.now().toString(),
      name,
      email,
      message,
      timestamp: new Date().toISOString(),
      read: false,
    });
    await writeList("contact-messages", messages);
  } catch (err) {
    console.error("Saving message failed:", err);
    return json(
      { error: "Your message wasn't saved. Email me directly instead." },
      500,
    );
  }

  const { RESEND_API_KEY, CONTACT_EMAIL, RESEND_FROM_EMAIL } = process.env;
  if (RESEND_API_KEY && CONTACT_EMAIL && RESEND_FROM_EMAIL) {
    try {
      await new Resend(RESEND_API_KEY).emails.send({
        from: RESEND_FROM_EMAIL,
        to: CONTACT_EMAIL,
        replyTo: email,
        subject: `New message from ${escapeHtml(name)}`,
        html: getAdminNotificationEmail({
          name: escapeHtml(name),
          email,
          message: escapeHtml(message).replace(/\n/g, "<br>"),
        }),
      });
    } catch (err) {
      console.error("Admin notification failed:", err);
    }
  }

  return json({ success: true });
}

export async function GET(request: Request) {
  if (!isAdmin(request)) return json({ error: "Unauthorized" }, 401);
  return json(await readList<ContactMessage>("contact-messages"));
}
