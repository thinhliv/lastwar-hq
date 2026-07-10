"use client";

import { Globe } from "lucide-react";
import { useState, useEffect } from "react";
import { detectLocale, getPopularLanguages, getLanguageName, getLanguageFlag, getBaseLanguage } from "../lib/i18n";

export default function LanguageSwitcher() {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState("vi");

  // Auto-detect on mount
  useEffect(() => {
    const detected = detectLocale();
    setCurrent(getBaseLanguage(detected));
  }, []);

  const popular = getPopularLanguages();

  function selectLanguage(code: string) {
    setCurrent(code);
    if (typeof window !== "undefined") {
      localStorage.setItem("locale", code);
      window.dispatchEvent(new Event("lastwar_locale_changed"));
    }
    setOpen(false);
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg glass hover:bg-white/10 transition-colors"
      >
        <Globe className="w-4 h-4 text-orange-500" />
        <span className="text-sm">{getLanguageFlag(current)}</span>
        <span className="text-xs text-slate-400 hidden sm:inline">
          {getLanguageName(current)}
        </span>
      </button>

      {open && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setOpen(false)}
          />
          <div className="absolute right-0 top-full mt-2 z-50 glass rounded-xl py-1 min-w-[180px] shadow-xl max-h-[300px] overflow-y-auto">
            {popular.map((lang) => (
              <button
                key={lang.code}
                onClick={() => selectLanguage(lang.code)}
                className={`w-full flex items-center gap-2 px-4 py-2 text-sm hover:bg-white/10 transition-colors ${
                  current === lang.code ? "text-orange-500" : "text-slate-300"
                }`}
              >
                <span>{lang.flag}</span>
                <span>{lang.label}</span>
              </button>
            ))}
            <div className="border-t border-white/10 mt-1 pt-1 px-4 py-2">
              <p className="text-xs text-slate-500">
                🌐 Auto-detect: {getLanguageName(current)}
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
