// LASTWAR HQ — i18n setup
// Auto-detect ALL languages from device/browser
// Uses browser Intl API to get localized names for any language

/**
 * Auto-detect the user's preferred language.
 * Priority: localStorage → navigator → browser → default
 */
export function detectLocale(): string {
  // 1. User's saved preference
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem("locale");
    if (saved) return saved;
  }

  // 2. Navigator language (works on web + mobile webview)
  if (typeof navigator !== "undefined") {
    const navLang = navigator.language || (navigator as any).userLanguage;
    if (navLang) return navLang;
  }

  // 3. Default fallback
  return "en";
}

/**
 * Get all available languages from the device/browser.
 * Returns array of language codes the user understands.
 */
export function getDeviceLanguages(): string[] {
  if (typeof navigator !== "undefined") {
    const langs = navigator.languages || [navigator.language];
    return [...langs];
  }
  return ["en"];
}

/**
 * Get a language code suitable for our translation keys.
 * Maps full locale (e.g. "vi-VN", "zh-TW") to base language.
 */
export function getBaseLanguage(locale: string): string {
  return locale.split("-")[0].toLowerCase();
}

/**
 * Get the display name of a language IN that language.
 * Uses Intl.DisplayNames API — supports ALL world languages.
 */
export function getLanguageName(code: string): string {
  try {
    const display = new Intl.DisplayNames([code], { type: "language" });
    return display.of(code) || code;
  } catch {
    return code;
  }
}

/**
 * Get the flag emoji for a language/locale.
 */
export function getLanguageFlag(locale: string): string {
  const flagMap: Record<string, string> = {
    vi: "🇻🇳", en: "🇺🇸", ko: "🇰🇷", ja: "🇯🇵", zh: "🇨🇳",
    fr: "🇫🇷", de: "🇩🇪", es: "🇪🇸", it: "🇮🇹", pt: "🇵🇹",
    ru: "🇷🇺", th: "🇹🇭", id: "🇮🇩", ms: "🇲🇾", tr: "🇹🇷",
    ar: "🇸🇦", hi: "🇮🇳", pl: "🇵🇱", nl: "🇳🇱", uk: "🇺🇦",
    sv: "🇸🇪", no: "🇳🇴", da: "🇩🇰", fi: "🇫🇮", cs: "🇨🇿",
    el: "🇬🇷", he: "🇮🇱", hu: "🇭🇺", ro: "🇷🇴", sk: "🇸🇰",
  };
  const base = getBaseLanguage(locale);
  return flagMap[base] || "🌐";
}

/**
 * Get the 20 most common languages for the switcher dropdown.
 * Users can still use ANY language via auto-detect.
 * These are just the quick-pick options.
 */
export function getPopularLanguages(): { code: string; label: string; flag: string }[] {
  const popular = [
    "vi", "en", "zh", "ko", "ja", "es", "fr", "de", "pt", "ru",
    "th", "id", "ar", "hi", "it", "tr", "pl", "nl", "uk", "ms",
  ];
  return popular.map(code => ({
    code,
    label: getLanguageName(code),
    flag: getLanguageFlag(code),
  }));
}

/**
 * Translate UI strings.
 * Falls back to English, then to the key itself.
 * Real translations will be loaded from translation files in later steps.
 */
const baseTranslations: Record<string, string> = {
  "nav.home": "Home",
  "nav.tools": "Tools",
  "nav.chat": "Chat",
  "nav.news": "News",
  "nav.profile": "Profile",
  "home.comingSoon": "Coming Soon",
  "home.tagline": "Global community for Last War: Survival",
};

import vi from "../translations/vi";
import en from "../translations/en";

const translationCache: Record<string, Record<string, string>> = { vi, en };

/**
 * Get translation for a key in the user's language.
 * Now completely synchronous but kept async signature for compatibility.
 */
export async function t(key: string, locale?: string): Promise<string> {
  const lang = getBaseLanguage(locale || detectLocale());
  return translationCache[lang]?.[key] || baseTranslations[key] || key;
}

export const LOCALE_CHANGE_EVENT = "lastwar_locale_changed";

/**
 * Hook to force re-render when locale changes without full page reload.
 */
import { useState, useEffect } from "react";

export function useI18n() {
  const [locale, setLocale] = useState(typeof window !== "undefined" ? detectLocale() : "en");

  useEffect(() => {
    const handleLocaleChange = () => setLocale(detectLocale());
    window.addEventListener(LOCALE_CHANGE_EVENT, handleLocaleChange);
    return () => window.removeEventListener(LOCALE_CHANGE_EVENT, handleLocaleChange);
  }, []);

  return { locale, t: (key: string) => tSync(key, locale) };
}

/**
 * Synchronous translate — uses cached translations only.
 */
export function tSync(key: string, locale?: string): string {
  const lang = getBaseLanguage(locale || detectLocale());
  return translationCache[lang]?.[key] || baseTranslations[key] || key;
}
