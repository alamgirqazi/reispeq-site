import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#2f318c",
        }}
      >
        <svg width="122" height="122" viewBox="0 0 40 40" fill="none">
            <rect x="10.1" y="4.2" width="4.2" height="4.2" rx="1.4" fill="#ffffff" />
            <rect x="17.9" y="4.2" width="4.2" height="4.2" rx="1.4" fill="#ffffff" />
            <rect x="25.7" y="4.2" width="4.2" height="4.2" rx="1.4" fill="#ffffff" />
            <path d="M30.4 18.2A6.6 6.6 0 0 0 23.8 11.6L16.2 11.6A6.6 6.6 0 0 0 9.6 18.2L9.6 25.8A6.6 6.6 0 0 0 16.2 32.4L23.8 32.4A6.6 6.6 0 0 0 30.4 25.8" fill="none" stroke="#ffffff" strokeWidth="3.2" strokeLinecap="round" />
            <path d="M30.4 17.4L30.4 26.6" fill="none" stroke="#ffffff" strokeWidth="3.2" strokeLinecap="round" />
            <path d="M25.8 22L35 22" fill="none" stroke="#ffffff" strokeWidth="3.2" strokeLinecap="round" />
        </svg>
      </div>
    ),
    size,
  );
}
