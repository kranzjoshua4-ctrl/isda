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
          background: "#e2e5e9",
          fontSize: 112,
          lineHeight: 1,
        }}
      >
        {"\u{1F697}"}
      </div>
    ),
    { ...size },
  );
}
