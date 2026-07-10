// LASTWAR HQ — i18n setup
// 5 languages: Vietnamese, English, Korean, Japanese, Chinese

export const locales = ["vi", "en", "ko", "ja", "zh"] as const;
export type Locale = (typeof locales)[number];

export const localeNames: Record<Locale, { label: string; flag: string }> = {
  vi: { label: "Tiếng Việt", flag: "🇻🇳" },
  en: { label: "English", flag: "🇺🇸" },
  ko: { label: "한국어", flag: "🇰🇷" },
  ja: { label: "日本語", flag: "🇯🇵" },
  zh: { label: "中文", flag: "🇨🇳" },
};

// Placeholder translations — will be expanded in later steps
export const messages: Record<Locale, Record<string, string>> = {
  vi: {
    "nav.home": "Trang chủ",
    "nav.tools": "Công cụ",
    "nav.chat": "Chat",
    "nav.news": "Tin tức",
    "nav.profile": "Hồ sơ",
    "home.comingSoon": "Sắp ra mắt",
    "home.tagline": "Cộng đồng toàn cầu cho game Last War: Survival",
  },
  en: {
    "nav.home": "Home",
    "nav.tools": "Tools",
    "nav.chat": "Chat",
    "nav.news": "News",
    "nav.profile": "Profile",
    "home.comingSoon": "Coming Soon",
    "home.tagline": "Global community for Last War: Survival",
  },
  ko: {
    "nav.home": "홈",
    "nav.tools": "도구",
    "nav.chat": "채팅",
    "nav.news": "뉴스",
    "nav.profile": "프로필",
    "home.comingSoon": "곧 출시",
    "home.tagline": "Last War: Survival 글로벌 커뮤니티",
  },
  ja: {
    "nav.home": "ホーム",
    "nav.tools": "ツール",
    "nav.chat": "チャット",
    "nav.news": "ニュース",
    "nav.profile": "プロフィール",
    "home.comingSoon": "近日公開",
    "home.tagline": "Last War: Survival グローバルコミュニティ",
  },
  zh: {
    "nav.home": "首页",
    "nav.tools": "工具",
    "nav.chat": "聊天",
    "nav.news": "新闻",
    "nav.profile": "个人资料",
    "home.comingSoon": "即将推出",
    "home.tagline": "Last War: Survival 全球社区",
  },
};
