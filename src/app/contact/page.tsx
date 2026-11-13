import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { links } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact | Pyae Sone Shin Thant",
  description: "Send me a message about platform, DevOps or SRE work.",
};

export default function ContactPage() {
  return (
    <div className="wrap">
      <SiteHeader />
      <main className="grid12" style={{ alignItems: "start" }}>
        <header
          className="page-head"
          style={{ gridColumn: "span 5", paddingBottom: 0 }}
        >
          <h1 className="page-title">Contact</h1>
          <p
            className="muted"
            style={{ margin: 0, fontSize: 19, lineHeight: 1.55 }}
          >
            Hiring, a project, or a question about something I wrote. Use the
            form, or email{" "}
            <a
              href={`mailto:${links.email}`}
              className="link"
              style={{ color: "var(--accent)" }}
            >
              {links.email}
            </a>
            .
          </p>
        </header>
        <div style={{ gridColumn: "span 7", paddingTop: 72 }}>
          <ContactForm />
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
