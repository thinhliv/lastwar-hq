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
      return new NextResponse("Missing image path or url", { status: 400 });
    }

    const imageRes = await fetch(targetUrl);
    if (!imageRes.ok) {
      return new NextResponse("Failed to fetch image from Telegram", {
        status: imageRes.status,
      });
    }

    const contentType = imageRes.headers.get("content-type") || "image/jpeg";
    const buffer = await imageRes.arrayBuffer();

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800",
      },
    });
  } catch (error) {
    console.error("Telegram image proxy error:", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
