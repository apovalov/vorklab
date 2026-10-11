import { ImageResponse } from "next/og";

export const alt = "VorkLab guide: What does one completed AI task actually cost? Count review, rework, operation and setup.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#0B1016", color: "#EDF5F4", padding: "58px 66px", fontFamily: "sans-serif" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 23 }}>
        <span style={{ color: "#5EEAD4", fontWeight: 700 }}>VorkLab</span>
        <span style={{ color: "#B0C0C3", fontSize: 18 }}>PRACTICAL GUIDES</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 26 }}>
        <div style={{ display: "flex", maxWidth: 1000, fontSize: 68, lineHeight: 1.08, fontWeight: 700, letterSpacing: -2 }}>What does one completed AI task actually cost?</div>
        <div style={{ display: "flex", fontSize: 25, color: "#B0C0C3" }}>Review. Rework. Operation. Setup.</div>
      </div>
      <div style={{ display: "flex", borderTop: "2px solid #5EEAD4", paddingTop: 24, fontSize: 23, color: "#5EEAD4" }}>Total workflow cost ÷ accepted results</div>
    </div>, size,
  );
}
