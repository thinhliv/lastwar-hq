"use client";

import { Globe } from "lucide-react";
import { useState } from "react";

const locales = [
  { code: "vi", label: "Tiếng Việt", flag: "🇻🇳" },
  { code: "en", label: "English", flag: "🇺🇸" },
  { code: "ko", label: "한국어", flag: "🇰🇷" },
  { code: "ja", label: "日本語", flag: "🇯🇵" },
  { code: "zh", label: "中文", flag: "🇨🇳" },
];

export default function LanguageSwitcher() {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(locales[0]);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg glass hover:bg-white/10 transition-colors"
      >
        <Globe className="w-4 h-4 text-orange-500" />
        <span className="text-sm">{current.flag}</span>
      </button>

      {open && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setOpen(false)}
          />
          <div className="absolute right-0 top-full mt-2 z-50 glass rounded-xl py-1 min-w-[160px] shadow-xl">
            {locales.map((locale) => (
              <button
                key={locale.code}
                onClick={() => {
                  setCurrent(locale);
                  setOpen(false);
                }}
                className={`w-full flex items-center gap-2 px-4 py-2 text-sm hover:bg-white/10 transition-colors ${
                  current.code === locale.code
                    ? "text-orange-500"
                    : "text-slate-300"
                }`}
              >
                <span>{locale.flag}</span>
                <span>{locale.label}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
