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
      const videoMatch = block.match(/<video[^>]*src="([^"]+)"/);

      const postDate = timeMatch ? timeMatch[1] : new Date().toISOString();
      const photoUrl = photoMatch ? photoMatch[1] : null;
      const videoUrl = videoMatch ? videoMatch[1] : null;

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

      if (!rawText && !photoUrl && !videoUrl) continue;

      const youtubeId = extractYoutubeId(rawText);
      const { viText, enText } = parseBilingualPost(rawText);

      let versionBadge: string | undefined = undefined;
      const vMatch = (viText || rawText).match(
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

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const lang = searchParams.get("lang") || "vi";
    const forceSync = searchParams.get("sync") === "true";
    const limit = Math.min(parseInt(searchParams.get("limit") || "10", 10), 30);

    let items = filterOnlyOfficialAnnouncements(loadAnnouncements());

    // If store is empty or force sync requested, trigger scrape
    if (items.length === 0 || forceSync) {
      const scraped = await scrapeLatestFromChannel();
      if (scraped.length > 0) {
        // Merge with existing
        const map = new Map<string, AnnouncementItem>();
        for (const it of scraped) map.set(it.id, it);
        for (const it of items) map.set(it.id, it);
        items = Array.from(map.values());
        saveAnnouncements(items);
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
