"use client";

import { type FormEvent, useEffect, useState } from "react";

type Message = {
  id: string;
  name: string;
  email: string;
  message: string;
  timestamp: string;
};
type Stats = {
  totalDownloads: number;
  uniqueIPs: number;
  lastDownload: string | null;
  downloads: { timestamp: string; referer: string; userAgent: string }[];
};

const when = (iso: string) =>
  new Date(iso).toLocaleString("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
  });

export function AdminPanel() {
  const [token, setToken] = useState("");
  const [messages, setMessages] = useState<Message[] | null>(null);
  const [stats, setStats] = useState<Stats | null>(null);
  const [error, setError] = useState("");

  const load = async (t: string) => {
    setError("");
    const auth = { Authorization: `Bearer ${t}` };
    const [m, r] = await Promise.all([
      fetch("/api/contact", { headers: auth }),
      fetch("/api/resume", { method: "POST", headers: auth }),
    ]);
    if (m.status === 401 || r.status === 401) {
      setError("That token is wrong.");
      try {
        sessionStorage.removeItem("admin-token");
      } catch {}
      return;
    }
    setMessages(((await m.json()) as Message[]).reverse());
    setStats((await r.json()) as Stats);
    try {
      sessionStorage.setItem("admin-token", t);
    } catch {}
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: restore a saved token once on mount
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem("admin-token");
      if (saved) {
        setToken(saved);
        load(saved);
      }
    } catch {}
  }, []);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    load(token);
  };

  if (!messages || !stats) {
    return (
      <form
        onSubmit={submit}
        style={{
          display: "flex",
          gap: 12,
          flexWrap: "wrap",
          alignItems: "end",
          maxWidth: 520,
        }}
      >
        <label className="field" style={{ flex: 1, minWidth: 240 }}>
          Admin token
          <input
            className="input"
            type="password"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            required
          />
        </label>
        <button type="submit" className="btn-solid press">
          Open
        </button>
        {error && (
          <p style={{ width: "100%", margin: 0, color: "var(--danger)" }}>
            {error}
          </p>
        )}
      </form>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 56 }}>
      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: 16,
        }}
      >
        {[
          ["Messages", messages.length],
          ["Resume downloads", stats.totalDownloads],
          ["Unique visitors", stats.uniqueIPs],
          [
            "Last download",
            stats.lastDownload ? when(stats.lastDownload) : "None yet",
          ],
        ].map(([label, value]) => (
          <div
            key={label}
            style={{
              padding: 20,
              borderRadius: 14,
              background: "var(--panel)",
            }}
          >
            <div className="muted" style={{ fontSize: 14 }}>
              {label}
            </div>
            <div
              style={{
                fontSize: 28,
                fontWeight: 650,
                letterSpacing: "-0.02em",
                marginTop: 4,
              }}
            >
              {value}
            </div>
          </div>
        ))}
      </section>

      <section>
        <h2 style={{ margin: "0 0 16px", fontSize: 24, fontWeight: 600 }}>
          Messages
        </h2>
        {messages.length === 0 && <p className="muted">No messages yet.</p>}
        {messages.map((m) => (
          <article
            key={m.id}
            style={{ padding: "20px 0", borderTop: "1px solid var(--line)" }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: 16,
                flexWrap: "wrap",
              }}
            >
              <strong>
                {m.name}{" "}
                <a
                  href={`mailto:${m.email}`}
                  className="link muted"
                  style={{ fontWeight: 400 }}
                >
                  {m.email}
                </a>
              </strong>
              <span className="muted" style={{ fontSize: 14 }}>
                {when(m.timestamp)}
              </span>
            </div>
            <p
              style={{
                margin: "8px 0 0",
                whiteSpace: "pre-wrap",
                lineHeight: 1.6,
              }}
            >
              {m.message}
            </p>
          </article>
        ))}
      </section>

      <section>
        <h2 style={{ margin: "0 0 16px", fontSize: 24, fontWeight: 600 }}>
          Recent resume downloads
        </h2>
        {stats.downloads
          .slice(-20)
          .reverse()
          .map((d) => (
            <div
              key={d.timestamp}
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: 16,
                padding: "10px 0",
                borderTop: "1px solid var(--line)",
                fontSize: 15,
              }}
            >
              <span>{when(d.timestamp)}</span>
              <span
                className="muted"
                style={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {d.referer}
              </span>
            </div>
          ))}
      </section>
    </div>
  );
}
