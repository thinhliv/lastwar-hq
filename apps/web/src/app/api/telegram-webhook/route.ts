import { NextRequest, NextResponse } from "next/server";
import {
  BOT_TOKEN,
  loadAnnouncements,
  saveAnnouncements,
  parseBilingualPost,
  extractYoutubeId,
  buildTranslationsForAnnouncement,
  type AnnouncementItem,
} from "@/lib/telegramAnnouncements";

export const dynamic = "force-dynamic";

/**
 * Fetch photo file path from Telegram API using bot token
 */
async function getTelegramFilePath(fileId: string): Promise<string | null> {
  try {
    const res = await fetch(
      `https://api.telegram.org/bot${BOT_TOKEN}/getFile?file_id=${fileId}`
    );
    if (!res.ok) return null;
    const data = await res.json();
    if (data?.ok && data?.result?.file_path) {
      return data.result.file_path;
    }
  } catch {}
  return null;
}

export async function POST(req: NextRequest) {
  try {
    const update = await req.json();

    // Support channel_post, message, edited_channel_post, edited_message
    const msg =
      update.channel_post ||
      update.message ||
      update.edited_channel_post ||
      update.edited_message;

    if (!msg) {
      return NextResponse.json({ ok: true, ignored: "no message payload" });
    }

    const messageId = msg.message_id;
    const chatUsername = msg.chat?.username || "tool_lastwar_channel";
    const postId = `${chatUsername}/${messageId}`;
    const dateStr = msg.date
      ? new Date(msg.date * 1000).toISOString()
      : new Date().toISOString();

    const rawText = (msg.text || msg.caption || "").trim();

    // Extract photo if present
    let imageUrl: string | null = null;
    if (Array.isArray(msg.photo) && msg.photo.length > 0) {
      // Pick highest resolution photo
      const largestPhoto = msg.photo[msg.photo.length - 1];
      const filePath = await getTelegramFilePath(largestPhoto.file_id);
      if (filePath) {
        imageUrl = `/api/telegram-image?path=${encodeURIComponent(filePath)}`;
      }
    }

    // Extract video if present
    let videoUrl: string | null = null;
    if (msg.video) {
      const filePath = await getTelegramFilePath(msg.video.file_id);
      if (filePath) {
        videoUrl = `/api/telegram-image?path=${encodeURIComponent(filePath)}`;
      }
    }

    // Check for YouTube link
    const youtubeId = extractYoutubeId(rawText);

    // If there is no text and no media, ignore
    if (!rawText && !imageUrl && !videoUrl && !youtubeId) {
      return NextResponse.json({ ok: true, ignored: "empty content" });
    }

    // Parse bilingual contents
    const { viText, enText } = parseBilingualPost(rawText);

    // Extract version badge if mentioned
    let versionBadge: string | undefined = undefined;
    const vMatch = (viText || rawText).match(
      /(?:Phiên bản|Version|Ver|Update)\s*([0-9a-zA-Z_\-]+)/i
    );
    if (vMatch) {
      versionBadge = `Ver ${vMatch[1]}`;
    }

    // Build translations across all 16 languages
    const translations = await buildTranslationsForAnnouncement(viText, enText);

    const announcement: AnnouncementItem = {
      id: postId,
      postNumber: String(messageId),
      date: dateStr,
      versionBadge,
      content: translations["vi"] || viText || rawText,
      originalContent: rawText,
      translations,
      imageUrl,
      videoUrl,
      youtubeId,
      telegramUrl: `https://t.me/${postId}`,
    };

    // Load existing items & update/insert
    const existing = loadAnnouncements();
    const existingIndex = existing.findIndex((item) => item.id === postId);

    if (existingIndex >= 0) {
      existing[existingIndex] = {
        ...existing[existingIndex],
        ...announcement,
      };
    } else {
      existing.unshift(announcement);
    }

    // Keep top 30 announcements
    const trimmed = existing.slice(0, 30);
    saveAnnouncements(trimmed);

    return NextResponse.json({
      ok: true,
      action: existingIndex >= 0 ? "updated" : "created",
      postId,
    });
  } catch (error: any) {
    console.error("Telegram webhook error:", error);
    // Still return 200 OK so Telegram doesn't keep hammering retries on syntax errors
    return NextResponse.json(
      { ok: false, error: error?.message || "Internal error" },
      { status: 200 }
    );
  }
}

export async function GET() {
  const announcements = loadAnnouncements();
  return NextResponse.json({
    ok: true,
    service: "Monica Bot Telegram Webhook",
    webhookUrl: "https://monicabot.lol/api/telegram-webhook",
    totalCachedAnnouncements: announcements.length,
    latestPost: announcements[0]?.id || "none",
  });
}
