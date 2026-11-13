import { ogImage, ogSize } from "@/lib/og";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Pyae Sone Shin Thant, platform and DevOps engineer";

export default function Image() {
  return ogImage(
    "I fix the things that look slightly wrong.",
    "Platform and DevOps engineer",
  );
}
