// LASTWAR HQ / MONICA BOT — Multi-Language (i18n) Engine
// Supports 16 languages with English (en) as primary default.
// Automatic IP country detection via Vercel/Cloudflare headers & fallback.

import { useState, useEffect } from "react";
import { TRANSLATIONS, type TranslationKey } from "../translations/translations";

export interface LanguageOption {
  code: string;
  label: string;
  flag: string;
  direction?: "ltr" | "rtl";
}

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: "en", label: "English", flag: "🇺🇸" },
  { code: "zh-CN", label: "简体中文", flag: "🇨🇳" },
  { code: "zh-TW", label: "繁體中文", flag: "🇹🇼" },
  { code: "ko", label: "한국어", flag: "🇰🇷" },
  { code: "ja", label: "日本語", flag: "🇯🇵" },
  { code: "th", label: "ภาษาไทย", flag: "🇹🇭" },
  { code: "id", label: "Bahasa Indonesia", flag: "🇮🇩" },
  { code: "ms", label: "Bahasa Melayu", flag: "🇲🇾" },
  { code: "ar", label: "العربية", flag: "🇸🇦", direction: "rtl" },
  { code: "ru", label: "Русский", flag: "🇷🇺" },
  { code: "tr", label: "Türkçe", flag: "🇹🇷" },
  { code: "fr", label: "Français", flag: "🇫🇷" },
  { code: "de", label: "Deutsch", flag: "🇩🇪" },
  { code: "pt", label: "Português", flag: "🇧🇷" },
  { code: "es", label: "Español", flag: "🇪🇸" },
  { code: "vi", label: "Tiếng Việt", flag: "🇻🇳" },
];

/**
 * Mapping ISO Country Codes to our 16 supported languages
 */
export const COUNTRY_TO_LANG: Record<string, string> = {
  // Vietnam
  VN: "vi",

  // Indonesia
  ID: "id",

  // Malaysia & Brunei
  MY: "ms",
  BN: "ms",

  // China, Singapore
  CN: "zh-CN",
  SG: "zh-CN",

  // Taiwan, Hong Kong, Macau
  TW: "zh-TW",
  HK: "zh-TW",
  MO: "zh-TW",

  // South Korea
  KR: "ko",

  // Japan
  JP: "ja",

  // Thailand
  TH: "th",

  // Arab countries
  SA: "ar",
  AE: "ar",
  EG: "ar",
  QA: "ar",
  KW: "ar",
  OM: "ar",
  BH: "ar",
  IQ: "ar",
  JO: "ar",
  LB: "ar",
  DZ: "ar",
  MA: "ar",
  TN: "ar",
  YE: "ar",
  LY: "ar",

  // Russia & CIS
  RU: "ru",
  BY: "ru",
  KZ: "ru",
  KG: "ru",
  UZ: "ru",
  TJ: "ru",
  AM: "ru",

  // Turkey, Azerbaijan
  TR: "tr",
  AZ: "tr",

  // France & French-speaking
  FR: "fr",
  BE: "fr",
  CH: "fr",
  MC: "fr",
  SN: "fr",
  CI: "fr",
  CM: "fr",

  // Germany, Austria
  DE: "de",
  AT: "de",
  LI: "de",

  // Brazil, Portugal
  BR: "pt",
  PT: "pt",
  AO: "pt",
  MZ: "pt",

  // Spain, Latin America
  ES: "es",
  MX: "es",
  AR: "es",
  CO: "es",
  CL: "es",
  PE: "es",
  VE: "es",
  EC: "es",
  GT: "es",
  CU: "es",
  DO: "es",
  BO: "es",
  UY: "es",
  PY: "es",
  CR: "es",
  PA: "es",
};

export const LOCALE_CHANGE_EVENT = "monica_locale_changed";
const USER_PREF_KEY = "monica_user_lang_pref";
const DETECTED_LOCALE_KEY = "monica_detected_locale";

/**
 * Match browser language string to our supported languages
 */
export function matchBrowserLocale(langStr: string): string {
  const norm = (langStr || "").toLowerCase();
  if (norm.startsWith("vi")) return "vi";
  if (norm.startsWith("zh-tw") || norm.startsWith("zh-hk") || norm.startsWith("zh-mo") || norm.startsWith("zh-hant")) return "zh-TW";
  if (norm.startsWith("zh")) return "zh-CN";
  if (norm.startsWith("ko")) return "ko";
  if (norm.startsWith("ja")) return "ja";
  if (norm.startsWith("th")) return "th";
  if (norm.startsWith("id")) return "id";
  if (norm.startsWith("ms")) return "ms";
  if (norm.startsWith("ar")) return "ar";
  if (norm.startsWith("ru")) return "ru";
  if (norm.startsWith("tr")) return "tr";
  if (norm.startsWith("fr")) return "fr";
  if (norm.startsWith("de")) return "de";
  if (norm.startsWith("pt")) return "pt";
  if (norm.startsWith("es")) return "es";
  return "en";
}

/**
 * Detect user's locale.
 * Priority:
 * 1. User's explicit manual selection in localStorage
 * 2. Previously detected IP country cached
 * 3. Browser navigator.language match
 * 4. English ("en") fallback
 */
export function detectLocale(): string {
  if (typeof window === "undefined") return "en";

  // 1. Explicit user preference
  const userPref = localStorage.getItem(USER_PREF_KEY);
  if (userPref && TRANSLATIONS[userPref]) {
    return userPref;
  }

  // 2. Cached auto-detected locale
  const cached = localStorage.getItem(DETECTED_LOCALE_KEY) || localStorage.getItem("locale");
  if (cached && TRANSLATIONS[cached]) {
    return cached;
  }

  // 3. Browser locale
  if (typeof navigator !== "undefined") {
    const navLang = navigator.language || (navigator as any).userLanguage || "";
    return matchBrowserLocale(navLang);
  }

  return "en";
}

/**
 * Fetch visitor's country from `/api/geo` and set language automatically if user hasn't chosen manually
 */
export async function autoDetectAndApplyCountryLanguage(): Promise<string> {
  if (typeof window === "undefined") return "en";

  // If user already chose manually, do NOT override
  const userPref = localStorage.getItem(USER_PREF_KEY);
  if (userPref && TRANSLATIONS[userPref]) {
    return userPref;
  }

  try {
    const res = await fetch("/api/geo", { cache: "no-store" });
    if (res.ok) {
      const data = await res.json();
      const country = data.country;
      if (country && COUNTRY_TO_LANG[country]) {
        const lang = COUNTRY_TO_LANG[country];
        localStorage.setItem(DETECTED_LOCALE_KEY, lang);
        localStorage.setItem("locale", lang);
        window.dispatchEvent(new Event(LOCALE_CHANGE_EVENT));
        return lang;
      }
    }
  } catch {
    // ignore network errors
  }

  // Fallback to browser locale
  const browserLang = matchBrowserLocale(navigator.language);
  localStorage.setItem(DETECTED_LOCALE_KEY, browserLang);
  localStorage.setItem("locale", browserLang);
  window.dispatchEvent(new Event(LOCALE_CHANGE_EVENT));
  return browserLang;
}

export function getLanguageName(code: string): string {
  const match = SUPPORTED_LANGUAGES.find((l) => l.code === code);
  return match ? match.label : code;
}

export function getLanguageFlag(code: string): string {
  const match = SUPPORTED_LANGUAGES.find((l) => l.code === code);
  return match ? match.flag : "🌐";
}

export function getPopularLanguages(): LanguageOption[] {
  return SUPPORTED_LANGUAGES;
}

/**
 * Synchronous translate key for a given locale (defaults to detectLocale())
 */
export function tSync(key: TranslationKey, locale?: string): string {
  const lang = locale || detectLocale();
  const dict = TRANSLATIONS[lang] || TRANSLATIONS["en"];
  if (dict && dict[key]) {
    return dict[key];
  }
  // Fallback to English
  if (TRANSLATIONS["en"] && TRANSLATIONS["en"][key]) {
    return TRANSLATIONS["en"][key];
  }
  return key;
}

/**
 * Async signature for compatibility
 */
export async function t(key: TranslationKey, locale?: string): Promise<string> {
  return tSync(key, locale);
}

/**
 * React hook for components to subscribe to locale changes
 */
export function useI18n() {
  const [locale, setLocaleState] = useState<string>("en");

  useEffect(() => {
    // Initial sync
    setLocaleState(detectLocale());

    // Auto-detect country via IP if user hasn't set manual preference yet
    autoDetectAndApplyCountryLanguage();

    const handleLocaleChange = () => {
      setLocaleState(detectLocale());
    };

    window.addEventListener(LOCALE_CHANGE_EVENT, handleLocaleChange);
    return () => {
      window.removeEventListener(LOCALE_CHANGE_EVENT, handleLocaleChange);
    };
  }, []);

  const changeLanguage = (newLang: string) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(USER_PREF_KEY, newLang);
      localStorage.setItem("locale", newLang);
      setLocaleState(newLang);
      window.dispatchEvent(new Event(LOCALE_CHANGE_EVENT));
    }
  };

  const isRTL = locale === "ar";

  return {
    locale,
    setLocale: changeLanguage,
    t: (key: TranslationKey) => tSync(key, locale),
    isRTL,
    supportedLanguages: SUPPORTED_LANGUAGES,
    currentLanguage: SUPPORTED_LANGUAGES.find((l) => l.code === locale) || SUPPORTED_LANGUAGES[0],
  };
}
