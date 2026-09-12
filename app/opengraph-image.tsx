import { ImageResponse } from "next/og";
import { PRODUCT_NAME } from "./lib/site";

export const alt = "Sakhiya AI Business OS — a 4.9-star clinic with a scheduling problem";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "64px 72px",
        background: "#FAF8F3",
        color: "#17201B",
        fontFamily: "Georgia, serif",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontSize: 26, letterSpacing: 4, color: "#2F6B4F", fontFamily: "monospace" }}>
          {PRODUCT_NAME.toUpperCase()}
        </div>
        <div
          style={{
            fontSize: 20,
            color: "#8E4A25",
            background: "#F6E9DD",
            padding: "8px 18px",
            borderRadius: 999,
            fontFamily: "sans-serif",
          }}
        >
          Student capstone · not the clinic
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ fontSize: 84, lineHeight: 1.02, letterSpacing: -2, maxWidth: 1000 }}>
          A 4.9-star clinic with a scheduling problem.
        </div>
        <div
          style={{
            marginTop: 28,
            fontSize: 30,
            lineHeight: 1.35,
            color: "#3F4A44",
            maxWidth: 960,
            fontFamily: "sans-serif",
          }}
        >
          Captures enquiries in the patient&rsquo;s own language, holds a real slot, and tells the
          team who to call first.
        </div>
      </div>

      <div style={{ display: "flex", gap: 14, fontFamily: "sans-serif", fontSize: 22 }}>
        {[
          "Gujarati · Hinglish · English",
          "n8n + Gemini + ElevenLabs",
          "Holds slots, never confirms",
        ].map((t) => (
          <div
            key={t}
            style={{
              border: "1.5px solid #C9C2B3",
              borderRadius: 999,
              padding: "10px 20px",
              background: "#FFFFFF",
              color: "#3F4A44",
            }}
          >
            {t}
          </div>
        ))}
      </div>
    </div>,
    { ...size },
  );
}
