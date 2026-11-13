"use client";

import { type FormEvent, useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    turnstile?: {
      render: (
        el: HTMLElement,
        opts: {
          sitekey: string;
          callback: (t: string) => void;
          theme?: string;
        },
      ) => string;
      reset: (id?: string) => void;
    };
  }
}

const SITE_KEY = process.env.NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY;

type Status = "idle" | "sending" | "sent" | "error";

export function ContactForm() {
  const box = useRef<HTMLDivElement>(null);
  const widget = useRef<string | null>(null);
  const [token, setToken] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [note, setNote] = useState("");

  useEffect(() => {
    if (!SITE_KEY) return;
    const render = () => {
      if (box.current && window.turnstile && !widget.current) {
        widget.current = window.turnstile.render(box.current, {
          sitekey: SITE_KEY,
          callback: setToken,
          theme:
            document.documentElement.dataset.theme === "dark"
              ? "dark"
              : "light",
        });
      }
    };
    if (window.turnstile) return render();
    const s = document.createElement("script");
    s.src =
      "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
    s.async = true;
    s.onload = render;
    document.head.appendChild(s);
  }, []);

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    setStatus("sending");
    setNote("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, turnstileToken: token }),
      });
      const out = (await res.json()) as { error?: string };
      if (!res.ok) throw new Error(out.error ?? "Your message wasn't sent.");
      setStatus("sent");
      setNote("Sent. I'll reply to the email you gave.");
      form.reset();
    } catch (err) {
      setStatus("error");
      setNote(err instanceof Error ? err.message : "Your message wasn't sent.");
    } finally {
      setToken("");
      if (widget.current) window.turnstile?.reset(widget.current);
    }
  };

  const needsToken = Boolean(SITE_KEY) && !token;

  return (
    <form
      onSubmit={submit}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 20,
        maxWidth: 560,
      }}
    >
      <label className="field">
        Name
        <input
          className="input"
          name="name"
          required
          maxLength={100}
          autoComplete="name"
        />
      </label>
      <label className="field">
        Email
        <input
          className="input"
          name="email"
          type="email"
          required
          autoComplete="email"
        />
      </label>
      <label className="field">
        Message
        <textarea
          className="input"
          name="message"
          required
          maxLength={5000}
          rows={6}
          style={{ resize: "vertical" }}
        />
      </label>
      {SITE_KEY && <div ref={box} />}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          flexWrap: "wrap",
        }}
      >
        <button
          type="submit"
          className="btn-solid press"
          disabled={status === "sending" || needsToken}
        >
          {status === "sending" ? "Sending" : "Send message"}
        </button>
        <output
          aria-live="polite"
          style={{
            margin: 0,
            fontSize: 15,
            color: status === "error" ? "var(--danger)" : "var(--muted)",
          }}
        >
          {note}
        </output>
      </div>
    </form>
  );
}
