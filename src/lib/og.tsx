import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };

/** One look for every preview image: light grey, cobalt mark, big title. */
export function ogImage(title: string, kicker: string) {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 72,
        background: "#f4f5f7",
        color: "#14161a",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: 12,
            background: "#2b45d4",
            color: "#ffffff",
            display: "flex",
            alignItems: "flex-end",
            padding: 8,
            fontSize: 30,
            fontWeight: 700,
          }}
        >
          PS
        </div>
        <div style={{ fontSize: 28, color: "#5b616c" }}>{kicker}</div>
      </div>
      <div
        style={{
          fontSize: title.length > 60 ? 60 : 76,
          fontWeight: 700,
          letterSpacing: -2,
          lineHeight: 1.05,
        }}
      >
        {title}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 26,
          color: "#5b616c",
        }}
      >
        <span>Pyae Sone Shin Thant</span>
        <span style={{ color: "#2b45d4" }}>psstee.me</span>
      </div>
    </div>,
    ogSize,
  );
}
