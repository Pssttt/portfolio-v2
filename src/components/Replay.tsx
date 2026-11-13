"use client";

import { type MouseEvent, useEffect, useRef, useState } from "react";

type Mode = "bug" | "fix";

const BASE = [
  { n: 1, phase: "Start" },
  { n: 2, phase: "Load rises" },
  { n: 4, phase: "Ceiling" },
  { n: 2, phase: "Load drops" },
  { n: 1, phase: "Idle" },
];

const CAPTION: Record<Mode, string> = {
  bug: "Nothing is writing to the stream, yet it scales from 1 to 2 shards. The alarm was still reading a peak from minutes earlier.",
  fix: "With the freshness check, the stream stays at 1 shard once traffic stops.",
};

function track(e: MouseEvent<HTMLDivElement>) {
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  el.style.setProperty("--px", `${e.clientX - r.left}px`);
  el.style.setProperty("--py", `${e.clientY - r.top}px`);
}

export function Replay() {
  const [mode, setMode] = useState<Mode>("bug");
  const [shown, setShown] = useState(6);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const stop = () => {
    if (timer.current) clearInterval(timer.current);
    timer.current = null;
  };

  useEffect(
    () => () => {
      if (timer.current) clearInterval(timer.current);
    },
    [],
  );

  const play = () => {
    stop();
    setShown(0);
    let n = 0;
    timer.current = setInterval(() => {
      n += 1;
      setShown(n);
      if (n >= 6) stop();
    }, 520);
  };

  const pick = (m: Mode) => {
    setMode(m);
    play();
  };

  const last =
    mode === "bug"
      ? { n: 2, phase: "No traffic", phantom: true }
      : { n: 1, phase: "Still idle" };
  const seq: { n: number; phase: string; phantom?: boolean }[] = [
    ...BASE,
    last,
  ];
  const playing = shown < 6;

  const tabStyle = (active: boolean) => ({
    height: 36,
    padding: "0 14px",
    borderRadius: 7,
    border: "none",
    cursor: "pointer",
    font: "500 15px var(--font-sans), sans-serif",
    background: active ? "var(--fg)" : "transparent",
    color: active ? "var(--bg)" : "var(--muted)",
  });

  return (
    // biome-ignore lint/a11y/noStaticElementInteractions: mousemove only drives a decorative glow
    <div
      className="spot"
      onMouseMove={track}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 22,
        padding: 32,
        borderRadius: 14,
        background: "var(--panel)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 12,
          flexWrap: "wrap",
        }}
      >
        <div
          role="tablist"
          aria-label="Which build"
          style={{
            display: "flex",
            gap: 4,
            padding: 4,
            borderRadius: 10,
            background: "var(--bg)",
          }}
        >
          <button
            type="button"
            role="tab"
            aria-selected={mode === "bug"}
            className="press"
            onClick={() => pick("bug")}
            style={tabStyle(mode === "bug")}
          >
            Before the fix
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={mode === "fix"}
            className="press"
            onClick={() => pick("fix")}
            style={tabStyle(mode === "fix")}
          >
            After the fix
          </button>
        </div>
        <button
          type="button"
          className="press"
          onClick={play}
          style={{
            height: 40,
            padding: "0 16px",
            borderRadius: 8,
            border: "none",
            background: "var(--fg)",
            color: "var(--bg)",
            font: "600 15px var(--font-sans), sans-serif",
            cursor: "pointer",
          }}
        >
          {playing ? "Playing" : "Replay"}
        </button>
      </div>

      <div
        role="img"
        aria-label={`Shard count: ${seq.map((s) => `${s.phase} ${s.n}`).join(", ")}`}
        style={{
          display: "flex",
          alignItems: "flex-end",
          gap: 14,
          height: 220,
        }}
      >
        {seq.map((s, i) => {
          const visible = i < shown;
          const color = s.phantom ? "var(--danger)" : "var(--accent)";
          return (
            <div
              key={s.phase}
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "flex-end",
                gap: 10,
                height: "100%",
              }}
            >
              <span
                style={{
                  fontSize: 18,
                  fontWeight: 600,
                  color: s.phantom ? "var(--danger)" : "var(--fg)",
                  opacity: visible ? 1 : 0,
                  transition: "opacity 200ms ease",
                }}
              >
                {s.n}
              </span>
              <div
                className="bar"
                style={{
                  width: "100%",
                  height: 170,
                  borderRadius: 6,
                  background: visible ? color : "var(--line)",
                  transform: `scaleY(${visible ? s.n / 4 : 0.03})`,
                }}
              />
            </div>
          );
        })}
      </div>
      <div
        aria-hidden="true"
        style={{ display: "flex", gap: 14, marginTop: -8 }}
      >
        {seq.map((s) => (
          <span
            key={s.phase}
            className="muted"
            style={{
              flex: 1,
              fontSize: 13,
              lineHeight: 1.35,
              textAlign: "center",
            }}
          >
            {s.phase}
          </span>
        ))}
      </div>
      <p
        aria-live="polite"
        style={{
          margin: 0,
          paddingTop: 18,
          borderTop: "1px solid var(--line)",
          fontSize: 16,
          lineHeight: 1.6,
        }}
      >
        {CAPTION[mode]}
      </p>
    </div>
  );
}
