import { ImageResponse } from "next/og";
import { profile } from "@/lib/data";

export const alt = `${profile.name} — ${profile.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          color: "#e8ecf4",
          background: "linear-gradient(135deg, #07090f 0%, #121a35 55%, #2a1a5e 100%)",
        }}
      >
        <div style={{ fontSize: 72, fontWeight: 700, lineHeight: 1.1 }}>{profile.name}</div>
        <div style={{ fontSize: 44, marginTop: 28, color: "#8bb4ff" }}>{profile.title}</div>
        <div style={{ fontSize: 30, marginTop: 16, color: "#8b94a8" }}>{profile.subtitle}</div>
      </div>
    ),
    size,
  );
}
