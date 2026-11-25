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
          color: "#1c1b18",
          background: "#f5f2ea",
        }}
      >
        <div style={{ fontSize: 72, fontWeight: 700, lineHeight: 1.1 }}>{profile.name}</div>
        <div style={{ fontSize: 44, marginTop: 28, color: "#1f5e46" }}>{profile.title}</div>
        <div style={{ fontSize: 30, marginTop: 16, color: "#5c584f" }}>{profile.subtitle}</div>
      </div>
    ),
    size,
  );
}
