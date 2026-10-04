"use client";

import { Globe, Check } from "lucide-react";
import { useState } from "react";
import { useI18n } from "../lib/i18n";

export default function LanguageSwitcher() {
  const [open, setOpen] = useState(false);
  const { locale, setLocale, supportedLanguages, currentLanguage } = useI18n();

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-center gap-1.5 px-2.5 sm:px-3 py-2 rounded-xl bg-[#18090e]/90 hover:bg-[#250d15] border border-red-500/25 hover:border-red-500/50 transition-colors min-h-[40px] shadow-sm"
        aria-label="Select language"
        title="Select Language / Chọn ngôn ngữ"
      >
        <Globe className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
        <span className="text-sm leading-none">{currentLanguage.flag}</span>
        <span className="text-xs font-semibold text-slate-200 hidden md:inline whitespace-nowrap">
          {currentLanguage.label}
        </span>
      </button>

      {open && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setOpen(false)}
          />
          <div className="absolute right-0 top-full mt-2 z-50 rounded-2xl py-2 min-w-[220px] max-w-[260px] shadow-2xl shadow-black/80 max-h-[380px] overflow-y-auto border border-red-500/30 bg-[#120508]/98 backdrop-blur-2xl">
            <div className="px-3.5 py-1.5 border-b border-red-500/15 mb-1 flex items-center justify-between">
              <span className="text-[11px] font-bold text-red-300/80 uppercase tracking-wider">
                Language / Ngôn ngữ
              </span>
              <span className="text-[10px] text-slate-400">
                16 Quốc gia
              </span>
            </div>

            <div className="py-1">
              {supportedLanguages.map((lang) => {
                const isSelected = locale === lang.code;
                return (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setLocale(lang.code);
                      setOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3.5 py-2 min-h-[40px] text-xs transition-colors ${
                      isSelected
                        ? "text-amber-400 font-bold bg-red-500/15 border-l-2 border-red-500"
                        : "text-slate-300 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-base leading-none">{lang.flag}</span>
                      <span>{lang.label}</span>
                    </div>
                    {isSelected && <Check className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />}
                  </button>
                );
              })}
            </div>

            <div className="border-t border-red-500/15 mt-1 pt-1.5 px-3.5 pb-1">
              <p className="text-[10px] text-slate-400 flex items-center gap-1">
                <span>🌐 Tự động theo IP vị trí quốc gia</span>
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
