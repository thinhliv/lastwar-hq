"use client";

import { useState } from "react";
import {
  Download,
  Monitor,
  Smartphone,
  Apple,
  X,
  Key,
  ShieldAlert,
  Send,
  ExternalLink,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { TELEGRAM_SUPPORT_GROUP } from "@/lib/telegram";
import { useI18n } from "@/lib/i18n";

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DownloadModal({ isOpen, onClose }: DownloadModalProps) {
  const { t } = useI18n();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      {/* Backdrop overlay click */}
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative w-full max-w-2xl rounded-3xl bg-gradient-to-b from-[#18070d] via-[#120509] to-[#0c0306] border-2 border-red-500/40 p-4 sm:p-6 shadow-2xl shadow-red-950/80 z-10 max-h-[92vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-red-500/20 mb-4 sm:mb-5">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-red-600 to-rose-600 text-white flex items-center justify-center shadow-lg shadow-red-600/30">
              <Download className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black text-white uppercase tracking-wide">
                {t("downloadModal.title")}
              </h3>
              <p className="text-[11px] sm:text-xs text-slate-400">
                {t("downloadModal.subtitle")}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white flex items-center justify-center transition-colors border border-white/10"
            aria-label={t("downloadModal.close")}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* KEY POLICY ALERT (Chính sách 1 Key dùng chung) */}
        <div className="mb-4 sm:mb-5 p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-amber-950/60 via-[#1f0a10] to-red-950/50 border border-amber-500/40 shadow-lg">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
              <Key className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-xs">
              <div className="font-black text-amber-300 uppercase tracking-wide flex items-center gap-1.5">
                <span>{t("downloadModal.keyPolicyTitle")}</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  {t("downloadModal.keyPolicyBadge")}
                </span>
              </div>
              <p className="text-slate-300 mt-1 leading-relaxed">
                {t("downloadModal.keyPolicyDesc")}
              </p>
            </div>
          </div>
        </div>

        {/* 3 Platform Download Cards */}
        <div className="space-y-3 sm:space-y-3.5 mb-4 sm:mb-5">
          {/* 1. PC Windows */}
          <div className="p-3.5 sm:p-4 rounded-2xl bg-[#15060b]/90 border border-red-500/25 hover:border-red-500/50 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-md">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-red-600/20 border border-red-500/40 text-red-400 flex items-center justify-center shrink-0">
                <Monitor className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-0.5">
                  <h4 className="text-sm sm:text-base font-black text-white">{t("downloadModal.pcTitle")}</h4>
                  <span className="text-[10px] font-black px-2 py-0.5 rounded bg-red-500/20 text-red-300 border border-red-500/30">
                    {t("downloadModal.pcBadge")}
                  </span>
                </div>
                <p className="text-xs text-slate-400">
                  {t("downloadModal.pcDesc")}
                </p>
              </div>
            </div>

            <a
              href="/downloads/Setup_Monica.rar"
              download="Setup_Monica.rar"
              className="min-h-[42px] px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-600 via-rose-600 to-red-700 hover:from-red-500 hover:to-rose-500 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-red-600/30 shrink-0"
            >
              <Download className="w-4 h-4" />
              <span>{t("downloadModal.pcBtn")}</span>
            </a>
          </div>

          {/* 2. Android APK */}
          <div className="p-3.5 sm:p-4 rounded-2xl bg-[#15060b]/90 border border-emerald-500/25 hover:border-emerald-500/50 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-md">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-600/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center shrink-0">
                <Smartphone className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-0.5">
                  <h4 className="text-sm sm:text-base font-black text-white">{t("downloadModal.androidTitle")}</h4>
                  <span className="text-[10px] font-black px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    {t("downloadModal.androidBadge")}
                  </span>
                </div>
                <p className="text-xs text-slate-400">
                  {t("downloadModal.androidDesc")}
                </p>
              </div>
            </div>

            <a
              href="/downloads/Monica_Android_2309.apk"
              download="Monica_Android_2309.apk"
              className="min-h-[42px] px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 shrink-0"
            >
              <Download className="w-4 h-4" />
              <span>{t("downloadModal.androidBtn")}</span>
            </a>
          </div>

          {/* 3. iOS (Apple) */}
          <div className="p-3.5 sm:p-4 rounded-2xl bg-[#15060b]/90 border border-sky-500/25 hover:border-sky-500/50 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-md">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-sky-600/20 border border-sky-500/40 text-sky-400 flex items-center justify-center shrink-0">
                <Apple className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-0.5">
                  <h4 className="text-sm sm:text-base font-black text-white">{t("downloadModal.iosTitle")}</h4>
                  <span className="text-[10px] font-black px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 border border-sky-500/30">
                    {t("downloadModal.iosBadge")}
                  </span>
                </div>
                <p className="text-xs text-slate-400">
                  {t("downloadModal.iosDesc")}
                </p>
              </div>
            </div>

            <a
              href={TELEGRAM_SUPPORT_GROUP}
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[42px] px-5 py-2.5 rounded-xl bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-500 hover:to-blue-500 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-sky-600/30 shrink-0"
            >
              <Send className="w-4 h-4" />
              <span>{t("downloadModal.iosBtn")}</span>
            </a>
          </div>
        </div>

        {/* Bottom Helper */}
        <div className="pt-3 border-t border-red-500/15 flex items-center justify-between text-xs text-slate-400">
          <span>{t("downloadModal.helpQuestion")}</span>
          <a
            href={TELEGRAM_SUPPORT_GROUP}
            target="_blank"
            rel="noopener noreferrer"
            className="text-amber-400 hover:underline font-bold flex items-center gap-1"
          >
            {t("downloadModal.helpTelegram")} <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}
