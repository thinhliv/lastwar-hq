import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  // 1. Check Vercel Geo Header
  let country = req.headers.get("x-vercel-ip-country");

  // 2. Check Cloudflare Geo Header
  if (!country) {
    country = req.headers.get("cf-ipcountry");
  }

  // 3. Check generic country headers
  if (!country) {
    country = req.headers.get("x-country-code");
  }

  return NextResponse.json({
    country: (country || "").toUpperCase(),
  });
}
