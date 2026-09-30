import { ImageResponse } from "next/og";

export const alt = "VorkLab — Automation Planning Guide. One workflow. Clear checks. A practical first trial.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <div style={{ background: "#0C0F15", width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 72, color: "#F2F2F2" }}>
      <div style={{ display: "flex", color: "#5EEAD4", fontSize: 30 }}>VorkLab / Practical guides</div>
      <div style={{ display: "flex", fontSize: 76, lineHeight: 1.08, letterSpacing: -3, maxWidth: 950 }}>A clear plan for your first automation.</div>
      <div style={{ display: "flex", fontSize: 29, color: "#C9D6D5" }}>One workflow. Clear checks. A practical first trial.</div>
    </div>, size,
  );
}
