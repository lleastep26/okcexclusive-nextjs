import { ImageResponse } from "next/og";
import { SITE_NAME } from "@/lib/constants";

export const alt = `${SITE_NAME} — professional cleaning in Oklahoma City`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 64,
          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)",
          color: "white",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginBottom: 32,
          }}
        >
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: 16,
            background: "rgba(16, 185, 129, 0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 24,
            fontWeight: 700,
            color: "#34d399",
          }}
        >
          ECS
        </div>
          <span style={{ fontSize: 28, opacity: 0.8 }}>Oklahoma City</span>
        </div>
        <div
          style={{
            fontSize: 64,
            fontWeight: 700,
            lineHeight: 1.1,
            maxWidth: 900,
          }}
        >
          {SITE_NAME}
        </div>
        <div
          style={{
            marginTop: 24,
            fontSize: 28,
            color: "#34d399",
            maxWidth: 800,
            lineHeight: 1.4,
          }}
        >
          Premium residential &amp; commercial cleaning. Book your clean today.
        </div>
      </div>
    ),
    { ...size },
  );
}
