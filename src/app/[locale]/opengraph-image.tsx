import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Reispeq Technologies LLC — software, auditing and inspection services";

/**
 * Social card. Deliberately English-only: `next/og` would need an embedded
 * Arabic face to shape Arabic text, and the card is chrome rather than content.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#111235",
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.045) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
          <svg width="72" height="72" viewBox="0 0 40 40" fill="none">
              <rect x="10.1" y="4.2" width="4.2" height="4.2" rx="1.4" fill="#ffffff" />
              <rect x="17.9" y="4.2" width="4.2" height="4.2" rx="1.4" fill="#ffffff" />
              <rect x="25.7" y="4.2" width="4.2" height="4.2" rx="1.4" fill="#ffffff" />
              <path d="M30.4 18.2A6.6 6.6 0 0 0 23.8 11.6L16.2 11.6A6.6 6.6 0 0 0 9.6 18.2L9.6 25.8A6.6 6.6 0 0 0 16.2 32.4L23.8 32.4A6.6 6.6 0 0 0 30.4 25.8" fill="none" stroke="#ffffff" strokeWidth="3.2" strokeLinecap="round" />
              <path d="M30.4 17.4L30.4 26.6" fill="none" stroke="#ffffff" strokeWidth="3.2" strokeLinecap="round" />
              <path d="M25.8 22L35 22" fill="none" stroke="#ffffff" strokeWidth="3.2" strokeLinecap="round" />
          </svg>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ color: "#ffffff", fontSize: 30, fontWeight: 700, letterSpacing: 2 }}>REISPEQ</span>
            <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 14, letterSpacing: 6, marginTop: 4 }}>
              TECHNOLOGIES
            </span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ color: "#6fb6f1", fontSize: 20, letterSpacing: 3, textTransform: "uppercase" }}>
            Software · Auditing · Inspection
          </span>
          <span
            style={{
              color: "#ffffff",
              fontSize: 62,
              fontWeight: 600,
              lineHeight: 1.1,
              marginTop: 24,
              maxWidth: 900,
            }}
          >
            Operational assurance, built into software.
          </span>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(255,255,255,0.14)",
            paddingTop: 28,
          }}
        >
          <span style={{ color: "rgba(255,255,255,0.55)", fontSize: 22 }}>
            Oman · UAE · Saudi Arabia · Qatar · Kuwait · Bahrain
          </span>
          <span style={{ color: "rgba(255,255,255,0.55)", fontSize: 22 }}>{site.domain}</span>
        </div>
      </div>
    ),
    size,
  );
}
