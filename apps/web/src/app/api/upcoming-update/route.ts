import { NextResponse } from "next/server";
import upcomingData from "@/data/upcoming-update.json";
import { extractYouTubeId } from "@/lib/youtube";

export async function GET() {
  const youtubeId = extractYouTubeId(upcomingData.youtubeUrl);
  const mobileYoutubeId = extractYouTubeId(
    (upcomingData as { mobileYoutubeUrl?: string }).mobileYoutubeUrl || "QBol43tCzl8"
  );

  return NextResponse.json(
    {
      success: true,
      data: {
        ...upcomingData,
        youtubeId,
        mobileYoutubeId,
        embedUrl: `https://www.youtube-nocookie.com/embed/${youtubeId}`,
        watchUrl: upcomingData.youtubeUrl || `https://www.youtube.com/watch?v=${youtubeId}`,
        mobileEmbedUrl: `https://www.youtube-nocookie.com/embed/${mobileYoutubeId}`,
        mobileWatchUrl:
          (upcomingData as { mobileYoutubeUrl?: string }).mobileYoutubeUrl ||
          `https://www.youtube.com/shorts/${mobileYoutubeId}`,
      },
    },
    {
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
      },
    }
  );
}
