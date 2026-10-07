import { NextRequest, NextResponse } from "next/server";
import {
  loadAnnouncements,
  saveAnnouncements,
  filterOnlyOfficialAnnouncements,
  parseBilingualPost,
  extractYoutubeId,
  buildTranslationsForAnnouncement,
  translateText,
  type AnnouncementItem,
} from "@/lib/telegramAnnouncements";

export const dynamic = "force-dynamic";

/**
 * Scrapes latest public posts from https://t.me/s/tool_lastwar_channel
 */
async function scrapeLatestFromChannel(): Promise<AnnouncementItem[]> {
  try {
    const res = await fetch("https://t.me/s/tool_lastwar_channel", {
      headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" },
      next: { revalidate: 60 },
    });
    if (!res.ok) return [];

    const html = await res.text();
    const postBlocks = html.split('class="tgme_widget_message_wrap');
    if (postBlocks.length <= 1) return [];

    const announcements: AnnouncementItem[] = [];
    const recentBlocks = postBlocks.slice(-8).reverse();

    for (const block of recentBlocks) {
      const postMatch = block.match(/data-post="([^"]+)"/);
      if (!postMatch) continue;
      const postId = postMatch[1];
      const timeMatch = block.match(/<time[^>]*datetime="([^"]+)"/);
      const textMatch = block.match(
        /<div class="tgme_widget_message_text[^"]*"[^>]*>([\s\S]*?)<\/div>/
      );
      const photoMatch = block.match(/background-image:url\('([^']+)'\)/);
      const videoMatch = block.match(/<video[^>]*src="([^"]+)"/i);
      const isVideoPlayer = /tgme_widget_message_video_player|message_video_play|message_video_duration/i.test(block);
      const durationMatch = block.match(/class="[^"]*message_video_duration[^"]*"[^>]*>([^<]+)<\/time>/i);

      const postDate = timeMatch ? timeMatch[1] : new Date().toISOString();
      const photoUrl = photoMatch ? photoMatch[1] : null;
      const videoUrl = videoMatch ? videoMatch[1] : null;
      const isVideo = isVideoPlayer || Boolean(videoUrl);
      const videoDuration = durationMatch ? durationMatch[1].trim() : null;

      let rawText = "";
      if (textMatch) {
        rawText = textMatch[1]
          .replace(/<br\s*\/?>/gi, "\n")
          .replace(/<a[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi, "$2")
          .replace(/<[^>]+>/g, "")
          .replace(/&quot;/g, '"')
          .replace(/&#39;/g, "'")
          .replace(/&amp;/g, "&")
          .replace(/&lt;/g, "<")
          .replace(/&gt;/g, ">")
          .trim();
      }

      if (!rawText && !photoUrl && !videoUrl && !isVideo) continue;

      const youtubeId = extractYoutubeId(rawText);
      const { viText, enText } = parseBilingualPost(rawText);

      let versionBadge: string | undefined = undefined;
      const normalizedVersionText = (viText || rawText)
        .replace(/0️⃣/g, "0")
        .replace(/1️⃣/g, "1")
        .replace(/2️⃣/g, "2")
        .replace(/3️⃣/g, "3")
        .replace(/4️⃣/g, "4")
        .replace(/5️⃣/g, "5")
        .replace(/6️⃣/g, "6")
        .replace(/7️⃣/g, "7")
        .replace(/8️⃣/g, "8")
        .replace(/9️⃣/g, "9");

      const vMatch = normalizedVersionText.match(
        /(?:Phiên bản|Version|Ver|Update)\s*([0-9a-zA-Z_\-]+)/i
      );
      if (vMatch) {
        versionBadge = `Ver ${vMatch[1]}`;
      }

      const translations = await buildTranslationsForAnnouncement(viText, enText);

      announcements.push({
        id: postId,
        postNumber: postId.split("/")[1] || postId,
        date: postDate,
        versionBadge,
        content: translations["vi"] || viText || rawText,
        originalContent: rawText,
        translations,
        imageUrl: photoUrl,
        videoUrl,
        isVideo,
        videoDuration,
        youtubeId,
        telegramUrl: `https://t.me/${postId}`,
      });
    }

    return announcements;
  } catch (e) {
    console.error("Channel scraper error:", e);
    return [];
  }
}

// In-memory scrape throttler: check Telegram channel at most every 45 seconds
let lastScrapeTimestamp = 0;
const CHANNEL_SCRAPE_TTL_MS = 45 * 1000;

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const lang = searchParams.get("lang") || "vi";
    const forceSync = searchParams.get("sync") === "true";
    const limit = Math.min(parseInt(searchParams.get("limit") || "10", 10), 30);

    let items = filterOnlyOfficialAnnouncements(loadAnnouncements());
    const shouldScrape =
      forceSync ||
      items.length === 0 ||
      Date.now() - lastScrapeTimestamp > CHANNEL_SCRAPE_TTL_MS;

    // Automatically scrape and sync latest posts from Telegram channel
    if (shouldScrape) {
      lastScrapeTimestamp = Date.now();
      try {
        const scraped = await scrapeLatestFromChannel();
        if (scraped.length > 0) {
          // Merge with existing, placing new scraped items at the top
          const map = new Map<string, AnnouncementItem>();
          for (const it of scraped) map.set(it.id, it);
          for (const it of items) {
            if (!map.has(it.id)) {
              map.set(it.id, it);
            }
          }
          items = Array.from(map.values());
          saveAnnouncements(items);
        }
      } catch (scrapeErr) {
        console.error("Auto channel sync failed:", scrapeErr);
      }
    }

    // Localize announcements for requested language
    const localized = await Promise.all(
      items.slice(0, limit).map(async (item) => {
        let content = item.translations?.[lang];

        // If translation is missing for this lang, translate dynamically
        if (!content) {
          const baseText =
            item.translations?.["en"] ||
            item.translations?.["vi"] ||
            item.originalContent;
          const sourceLang = item.translations?.["en"] ? "en" : "vi";
          content = await translateText(baseText, sourceLang, lang);
          if (item.translations) {
            item.translations[lang] = content;
          }
        }

        return {
          ...item,
          content: content || item.originalContent,
          isAutoTranslated: lang !== "vi" && lang !== "en",
        };
      })
    );

    return NextResponse.json({
      ok: true,
      currentLang: lang,
      total: localized.length,
      announcements: localized,
    });
  } catch (error: any) {
    console.error("Announcements API error:", error);
    return NextResponse.json(
      { ok: false, error: error?.message || "Failed to load announcements" },
      { status: 500 }
    );
  }
}
