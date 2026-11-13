"use client";

import { useId, useState } from "react";
import type { Story } from "@/lib/content";
import { tilt, untilt } from "./tilt";

export function StoryHand({ stories }: { stories: Story[] }) {
  const [open, setOpen] = useState(0);
  const uid = useId();
  const mid = (stories.length - 1) / 2;
  const sel = stories[open];

  return (
    <>
      <div className="hand" role="tablist" aria-label="Stories">
        {stories.map((s, i) => {
          const k = i - mid;
          const style = {
            "--r": `${k * 6}deg`,
            "--y": `${k * k * 9}px`,
            "--z": stories.length - i,
          } as React.CSSProperties;
          return (
            <div
              key={s.title}
              className="slot"
              data-sel={open === i}
              style={style}
            >
              <div className="lift">
                <button
                  type="button"
                  role="tab"
                  id={`${uid}-tab-${i}`}
                  aria-selected={open === i}
                  aria-controls={`${uid}-panel`}
                  className="tcard"
                  onClick={() => setOpen(i)}
                  onMouseMove={tilt}
                  onMouseLeave={untilt}
                >
                  <span className="muted" style={{ fontSize: 14 }}>
                    {s.where}
                  </span>
                  <span
                    style={{
                      fontSize: 21,
                      lineHeight: 1.15,
                      letterSpacing: "-0.02em",
                      fontWeight: 600,
                    }}
                  >
                    {s.title}
                  </span>
                  <span
                    style={{ display: "flex", flexDirection: "column", gap: 2 }}
                  >
                    <span
                      style={{
                        fontSize: 40,
                        lineHeight: 1,
                        letterSpacing: "-0.04em",
                        fontWeight: 650,
                        color: "var(--accent)",
                      }}
                    >
                      {s.stat}
                    </span>
                    <span className="muted" style={{ fontSize: 13 }}>
                      {s.unit}
                    </span>
                  </span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div
        key={open}
        id={`${uid}-panel`}
        role="tabpanel"
        aria-labelledby={`${uid}-tab-${open}`}
        className="detail grid12"
        style={{
          paddingTop: 40,
          borderTop: "1px solid var(--line)",
          marginTop: 8,
        }}
      >
        <h3
          style={{
            gridColumn: "span 4",
            margin: 0,
            fontSize: 24,
            lineHeight: 1.2,
            letterSpacing: "-0.02em",
            fontWeight: 600,
          }}
        >
          {sel.title}
        </h3>
        <div
          style={{
            gridColumn: "span 8",
            display: "flex",
            flexDirection: "column",
            gap: 14,
            maxWidth: "40em",
          }}
        >
          <p style={{ margin: 0, fontSize: 18, lineHeight: 1.65 }}>
            {sel.story}
          </p>
          <p
            className="muted"
            style={{ margin: 0, fontSize: 15, lineHeight: 1.5 }}
          >
            {sel.status}
          </p>
        </div>
      </div>
    </>
  );
}
