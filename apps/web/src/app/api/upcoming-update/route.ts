import { NextResponse } from "next/server";
import upcomingData from "@/data/upcoming-update.json";
import { extractYouTubeId } from "@/lib/youtube";

export async function GET() {
  const youtubeId = extractYouTubeId(upcomingData.youtubeUrl);

  return NextResponse.json(
    {
      success: true,
      data: {
        ...upcomingData,
        youtubeId,
        embedUrl: `https://www.youtube-nocookie.com/embed/${youtubeId}`,
        watchUrl: upcomingData.youtubeUrl || `https://www.youtube.com/watch?v=${youtubeId}`,
      },
    },
    {
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
      },
    }
  );
}
