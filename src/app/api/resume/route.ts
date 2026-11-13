import { clientIp, isAdmin, json, readList, writeList } from "@/lib/store";

type Download = {
  timestamp: string;
  userAgent: string;
  referer: string;
  ip: string;
};

/** Record a resume download. Called by the Resume links before the PDF opens. */
export async function GET(request: Request) {
  try {
    const downloads = await readList<Download>("resume-downloads");
    downloads.push({
      timestamp: new Date().toISOString(),
      userAgent: request.headers.get("user-agent") ?? "unknown",
      referer: request.headers.get("referer") ?? "direct",
      ip: clientIp(request),
    });
    await writeList("resume-downloads", downloads);
    return json({ success: true });
  } catch (err) {
    console.error("Recording download failed:", err);
    return json({ success: false }, 500);
  }
}

export async function POST(request: Request) {
  if (!isAdmin(request)) return json({ error: "Unauthorized" }, 401);
  const downloads = await readList<Download>("resume-downloads");
  return json({
    totalDownloads: downloads.length,
    uniqueIPs: new Set(downloads.map((d) => d.ip)).size,
    lastDownload: downloads.at(-1)?.timestamp ?? null,
    downloads,
  });
}
