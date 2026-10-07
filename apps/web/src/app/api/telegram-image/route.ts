import { NextRequest, NextResponse } from "next/server";
import { BOT_TOKEN } from "@/lib/telegramAnnouncements";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const filePath = searchParams.get("path");
    const externalUrl = searchParams.get("url");

    let targetUrl: string | null = null;

    if (filePath) {
      // Prevent path traversal
      if (filePath.includes("..") || filePath.startsWith("/")) {
        return new NextResponse("Invalid file path", { status: 400 });
      }
      targetUrl = `https://api.telegram.org/file/bot${BOT_TOKEN}/${filePath}`;
    } else if (externalUrl) {
      // Validate that externalUrl is a trusted telegram / telesco CDN
      if (
        !externalUrl.startsWith("https://cdn5.telesco.pe/") &&
        !externalUrl.startsWith("https://telesco.pe/") &&
        !externalUrl.startsWith("https://t.me/")
      ) {
        return new NextResponse("Forbidden domain", { status: 403 });
      }
      targetUrl = externalUrl;
    }

    if (!targetUrl) {
      return new NextResponse("Missing file path or url", { status: 400 });
    }

    // Forward Range header if requested by video player
    const fetchHeaders: Record<string, string> = {};
    const clientRange = req.headers.get("range");
    if (clientRange) {
      fetchHeaders["range"] = clientRange;
    }

    const upstreamRes = await fetch(targetUrl, { headers: fetchHeaders });
    if (!upstreamRes.ok && upstreamRes.status !== 206) {
      return new NextResponse("Failed to fetch file from Telegram", {
        status: upstreamRes.status,
      });
    }

    const contentType =
      upstreamRes.headers.get("content-type") ||
      (targetUrl.endsWith(".mp4") ? "video/mp4" : "image/jpeg");

    const resHeaders = new Headers();
    resHeaders.set("Content-Type", contentType);
    resHeaders.set("Accept-Ranges", "bytes");

    if (upstreamRes.headers.get("content-range")) {
      resHeaders.set("Content-Range", upstreamRes.headers.get("content-range")!);
    }
    if (upstreamRes.headers.get("content-length")) {
      resHeaders.set("Content-Length", upstreamRes.headers.get("content-length")!);
    }

    resHeaders.set(
      "Cache-Control",
      "public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800"
    );

    return new NextResponse(upstreamRes.body, {
      status: upstreamRes.status,
      headers: resHeaders,
    });
  } catch (error) {
    console.error("Telegram media proxy error:", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
