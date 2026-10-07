import fs from "fs";
import path from "path";
import os from "os";

export const BOT_TOKEN = "8620999064:AAE345N3neM2pesCGFF8-2NL9GbByyl04ps";
export const CHANNEL_USERNAME = "tool_lastwar_channel";

export const SUPPORTED_LANGS = [
  "en", "vi", "zh-CN", "zh-TW", "ko", "ja", "th", "ar", "ru", "tr", "fr", "de", "pt", "es", "id", "ms"
];

export interface AnnouncementItem {
  id: string; // e.g. "tool_lastwar_channel/127" or message_id
  postNumber?: string;
  date: string; // ISO string
  versionBadge?: string;
  content: string; // active localized content
  originalContent: string;
  translations: Record<string, string>;
  imageUrl?: string | null;
  videoUrl?: string | null;
  youtubeId?: string | null;
  telegramUrl: string;
}

const TEMP_FILE = path.join(os.tmpdir(), "monica_announcements_v2.json");

// In-memory cache for warm lambda runs
let inMemoryAnnouncements: AnnouncementItem[] | null = null;

/**
 * Free translation using Google Translate endpoint with MyMemory fallback
 */
export async function translateText(
  text: string,
  sourceLang: string,
  targetLang: string
): Promise<string> {
  if (!text || sourceLang === targetLang) return text;

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 4000);

    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${encodeURIComponent(
      sourceLang
    )}&tl=${encodeURIComponent(targetLang)}&dt=t&q=${encodeURIComponent(text)}`;

    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(timeout);

    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && Array.isArray(data[0])) {
        const translated = data[0].map((item: any) => item[0]).join("");
        if (translated) return translated;
      }
    }
  } catch {}

  // Fallback: MyMemory API
  try {
    const langpair = `${sourceLang}|${targetLang}`;
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
      text.slice(0, 500)
    )}&langpair=${encodeURIComponent(langpair)}`;
    const res = await fetch(url, { signal: AbortSignal.timeout(3000) });
    if (res.ok) {
      const data = await res.json();
      if (data?.responseData?.translatedText) {
        return data.responseData.translatedText;
      }
    }
  } catch {}

  return text;
}

/**
 * Parses bilingual Telegram post (e.g. 🇻🇳 and 🏴󠁧󠁢󠁥󠁮󠁧󠁿 sections)
 */
export function parseBilingualPost(rawText: string): { viText: string; enText: string } {
  let viText = "";
  let enText = "";
  const text = rawText.trim();
  const hasViFlag = /🇻🇳/.test(text);
  const hasEnFlag = /🏴󠁧󠁢󠁥󠁮󠁧󠁿|🇬🇧|🇺🇸/.test(text);

  if (hasViFlag && hasEnFlag) {
    const parts = text.split(/(🇻🇳|🏴󠁧󠁢󠁥󠁮󠁧󠁿|🇬🇧|🇺🇸)/);
    for (let i = 1; i < parts.length; i += 2) {
      const flag = parts[i];
      const content = parts[i + 1] ? parts[i + 1].trim() : "";
      if (/🇻🇳/.test(flag)) {
        viText = content;
      } else if (/🏴󠁧󠁢󠁥󠁮󠁧󠁿|🇬🇧|🇺🇸/.test(flag)) {
        enText = content;
      }
    }
  } else if (hasViFlag) {
    const parts = text.split(/🇻🇳/);
    viText = parts.slice(1).join("\n").trim();
  } else if (hasEnFlag) {
    const parts = text.split(/🏴󠁧󠁢󠁥󠁮󠁧󠁿|🇬🇧|🇺🇸/);
    enText = parts.slice(1).join("\n").trim();
  } else {
    viText = text;
  }

  const clean = (t: string) =>
    t
      .replace(/@tool_lastwar_channel\s*\([^)]*\)/g, "")
      .replace(/Theo dõi kênh thông báo\s*Follow the announcement/g, "")
      .replace(/English in comment of this post/gi, "")
      .trim();

  return { viText: clean(viText || text), enText: clean(enText || "") };
}

/**
 * Extracts YouTube video ID from URL
 */
export function extractYoutubeId(url: string): string | null {
  if (!url) return null;
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{11})/
  );
  return match ? match[1] : null;
}

/**
 * Strictly filters out any community chat messages (e.g. tool_lastwar_chat)
 * and only keeps posts from the official announcement channel (tool_lastwar_channel)
 */
export function filterOnlyOfficialAnnouncements(items: any[]): AnnouncementItem[] {
  if (!Array.isArray(items)) return [];
  return items.filter(
    (item) =>
      item &&
      typeof item.id === "string" &&
      item.id.startsWith("tool_lastwar_channel/") &&
      !item.id.includes("chat")
  );
}

/**
 * Reads announcements from cache, /tmp, or static seed file
 */
export function loadAnnouncements(): AnnouncementItem[] {
  if (inMemoryAnnouncements && inMemoryAnnouncements.length > 0) {
    return filterOnlyOfficialAnnouncements(inMemoryAnnouncements);
  }

  // 1. Try reading from /tmp
  try {
    if (fs.existsSync(TEMP_FILE)) {
      const data = JSON.parse(fs.readFileSync(TEMP_FILE, "utf-8"));
      const filtered = filterOnlyOfficialAnnouncements(data);
      if (filtered.length > 0) {
        inMemoryAnnouncements = filtered;
        return inMemoryAnnouncements;
      }
    }
  } catch {}

  // 2. Try reading from static seed
  try {
    const seedPath = path.join(process.cwd(), "src", "data", "announcements.json");
    if (fs.existsSync(seedPath)) {
      const data = JSON.parse(fs.readFileSync(seedPath, "utf-8"));
      const filtered = filterOnlyOfficialAnnouncements(data);
      if (filtered.length > 0) {
        inMemoryAnnouncements = filtered;
        return inMemoryAnnouncements;
      }
    }
  } catch {}

  // 3. Alternate path for mono-repo root / apps/web
  try {
    const altSeedPath = path.join(
      process.cwd(),
      "apps",
      "web",
      "src",
      "data",
      "announcements.json"
    );
    if (fs.existsSync(altSeedPath)) {
      const data = JSON.parse(fs.readFileSync(altSeedPath, "utf-8"));
      const filtered = filterOnlyOfficialAnnouncements(data);
      if (filtered.length > 0) {
        inMemoryAnnouncements = filtered;
        return inMemoryAnnouncements;
      }
    }
  } catch {}

  return [];
}

/**
 * Saves announcements to in-memory store and /tmp
 */
export function saveAnnouncements(items: AnnouncementItem[]) {
  // Strictly filter only official announcements
  const cleanItems = filterOnlyOfficialAnnouncements(items);

  // Sort descending by date
  cleanItems.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  inMemoryAnnouncements = cleanItems;

  try {
    fs.writeFileSync(TEMP_FILE, JSON.stringify(cleanItems, null, 2), "utf-8");
  } catch {}
}

/**
 * Generates translations for an announcement across all supported languages
 */
export async function buildTranslationsForAnnouncement(
  viText: string,
  enText: string
): Promise<Record<string, string>> {
  const translations: Record<string, string> = {};
  translations["vi"] = viText;
  translations["en"] = enText || (await translateText(viText, "vi", "en"));

  const baseForTranslation = enText || translations["en"] || viText;
  const baseLang = enText ? "en" : "vi";

  // Translate in parallel chunks to keep latency reasonable
  const remainingLangs = SUPPORTED_LANGS.filter((l) => l !== "vi" && l !== "en");
  await Promise.all(
    remainingLangs.map(async (lang) => {
      try {
        translations[lang] = await translateText(baseForTranslation, baseLang, lang);
      } catch {
        translations[lang] = baseForTranslation;
      }
    })
  );

  return translations;
}
