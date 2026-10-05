"use client";

import StepByStepGuide from "@/components/StepByStepGuide";
import VideoSection from "@/components/VideoSection";
import FAQSection from "@/components/FAQSection";
import {
  Cpu,
  HardDrive,
  Monitor,
  ShieldCheck,
  Smartphone,
  Apple,
  Key,
  Download,
  Send,
  ExternalLink,
  Flame,
  CheckCircle2,
} from "lucide-react";
import { TELEGRAM_SUPPORT_GROUP, TELEGRAM_BUY_BOT } from "@/lib/telegram";
import { useI18n } from "@/lib/i18n";

export default function GuidePage() {
  const { t } = useI18n();

  return (
    <div className="min-h-screen py-8 text-slate-100 w-full overflow-x-hidden">
      {/* Page Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-8 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-500/15 border border-red-500/30 text-red-300 text-xs font-bold uppercase tracking-wider mb-3">
          <Flame className="w-3.5 h-3.5 fill-red-400 text-red-400" />
          <span>{t("guide.platformBadge")}</span>
        </div>
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-white mb-3">
          {t("guide.pageTitle")}
        </h1>
        <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto">
          {t("guide.pageDesc")}
        </p>
      </div>

      {/* KEY POLICY CALLOUT (Chính sách 1 Key dùng chung) */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-amber-950/60 via-[#1f0910] to-red-950/50 border-2 border-amber-500/40 shadow-2xl shadow-amber-950/30">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center shrink-0 shadow-lg">
                <Key className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-base sm:text-lg font-black text-amber-300 uppercase tracking-wide">
                    {t("guide.keyPolicyTitle")}
                  </h3>
                  <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    {t("guide.keyPolicyBadge")}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {t("guide.keyPolicyDesc")}
                </p>
              </div>
            </div>

            <a
              href={TELEGRAM_BUY_BOT}
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[44px] px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-red-600/30 shrink-0 self-stretch sm:self-auto"
            >
              <Send className="w-4 h-4 fill-white" />
              <span>{t("guide.btnBuyKey")}</span>
            </a>
          </div>
        </div>
      </section>

      {/* MULTI-PLATFORM DOWNLOAD CARDS */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <h2 className="text-lg sm:text-xl font-black text-white mb-4 flex items-center gap-2">
          <Download className="w-5 h-5 text-red-400" />
          <span>{t("guide.downloadSectionTitle")}</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* 1. PC Windows */}
          <div className="p-5 rounded-3xl bg-[#15070c]/90 border border-red-500/25 hover:border-red-500/50 transition-all flex flex-col justify-between shadow-xl">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-red-600/20 border border-red-500/40 text-red-400 flex items-center justify-center mb-3">
                <Monitor className="w-6 h-6" />
              </div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-base font-black text-white">{t("downloadModal.pcTitle")}</h3>
                <span className="text-[10px] font-black px-2 py-0.5 rounded bg-red-500/20 text-red-300 border border-red-500/30">
                  {t("guide.pcBadge")}
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                {t("guide.pcDesc")}
              </p>
            </div>

            <a
              href="/downloads/Setup_Monica.rar"
              download="Setup_Monica.rar"
              className="min-h-[44px] px-4 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-red-600/30"
            >
              <Download className="w-4 h-4" />
              <span>{t("downloadModal.pcBtn")}</span>
            </a>
          </div>

          {/* 2. Android APK */}
          <div className="p-5 rounded-3xl bg-[#15070c]/90 border border-emerald-500/25 hover:border-emerald-500/50 transition-all flex flex-col justify-between shadow-xl">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-600/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mb-3">
                <Smartphone className="w-6 h-6" />
              </div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-base font-black text-white">{t("downloadModal.androidTitle")}</h3>
                <span className="text-[10px] font-black px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  {t("guide.androidBadge")}
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                {t("guide.androidDesc")}
              </p>
            </div>

            <a
              href="/downloads/Monica_Android_2309.apk"
              download="Monica_Android_2309.apk"
              className="min-h-[44px] px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30"
            >
              <Download className="w-4 h-4" />
              <span>{t("downloadModal.androidBtn")}</span>
            </a>
          </div>

          {/* 3. iOS (Apple) */}
          <div className="p-5 rounded-3xl bg-[#15070c]/90 border border-sky-500/25 hover:border-sky-500/50 transition-all flex flex-col justify-between shadow-xl">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-sky-600/20 border border-sky-500/40 text-sky-400 flex items-center justify-center mb-3">
                <Apple className="w-6 h-6" />
              </div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-base font-black text-white">{t("downloadModal.iosTitle")}</h3>
                <span className="text-[10px] font-black px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 border border-sky-500/30">
                  {t("guide.iosBadge")}
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                {t("guide.iosDesc")}
              </p>
            </div>

            <a
              href={TELEGRAM_SUPPORT_GROUP}
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[44px] px-4 py-2.5 rounded-xl bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-500 hover:to-blue-500 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-sky-600/30"
            >
              <Send className="w-4 h-4" />
              <span>{t("guide.iosBtn")}</span>
            </a>
          </div>
        </div>
      </section>

      {/* System Requirements */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="p-6 sm:p-8 rounded-3xl bg-[#15080c]/85 border border-red-500/25 shadow-xl shadow-red-950/40">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Monitor className="w-5 h-5 text-red-400" />
            <span>{t("guide.sysReqTitle")}</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-black/40 border border-red-500/20">
              <Cpu className="w-5 h-5 text-red-400 mb-2" />
              <span className="text-[11px] text-slate-400 uppercase font-semibold block">
                {t("guide.cpuLabel")}
              </span>
              <span className="text-sm font-bold text-white">
                {t("guide.cpuVal")}
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-black/40 border border-red-500/20">
              <HardDrive className="w-5 h-5 text-amber-400 mb-2" />
              <span className="text-[11px] text-slate-400 uppercase font-semibold block">
                {t("guide.ramLabel")}
              </span>
              <span className="text-sm font-bold text-white">
                {t("guide.ramVal")}
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-black/40 border border-red-500/20">
              <Monitor className="w-5 h-5 text-rose-400 mb-2" />
              <span className="text-[11px] text-slate-400 uppercase font-semibold block">
                {t("guide.osLabel")}
              </span>
              <span className="text-sm font-bold text-white">
                {t("guide.osVal")}
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-black/40 border border-red-500/20">
              <ShieldCheck className="w-5 h-5 text-emerald-400 mb-2" />
              <span className="text-[11px] text-slate-400 uppercase font-semibold block">
                {t("guide.envLabel")}
              </span>
              <span className="text-sm font-bold text-white">
                {t("guide.envVal")}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Step-by-Step for PC */}
      <StepByStepGuide />

      {/* Video Section */}
      <VideoSection />

      {/* FAQ */}
      <FAQSection />

      {/* Support Action */}
      <div className="text-center py-10">
        <a
          href={TELEGRAM_SUPPORT_GROUP}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#18080d] text-amber-400 hover:text-amber-300 border border-red-500/30 text-xs sm:text-sm font-bold shadow-lg"
        >
          <span>{t("guide.techSupportCta")}</span>
        </a>
      </div>
    </div>
  );
}
