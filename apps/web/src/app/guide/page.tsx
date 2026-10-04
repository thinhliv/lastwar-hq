"use client";

import StepByStepGuide from "@/components/StepByStepGuide";
import VideoSection from "@/components/VideoSection";
import FAQSection from "@/components/FAQSection";
import { Cpu, HardDrive, Monitor, ShieldCheck } from "lucide-react";
import { TELEGRAM_SUPPORT_GROUP } from "@/lib/telegram";
import { useI18n } from "@/lib/i18n";

export default function GuidePage() {
  const { t } = useI18n();

  return (
    <div className="min-h-screen py-8 text-slate-100 w-full overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-8 text-center">
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-white mb-3">
          {t("guide.pageTitle")}
        </h1>
        <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto">
          {t("guide.pageDesc")}
        </p>
      </div>

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

      {/* Video Section */}
      <VideoSection />

      {/* Visual Step-by-Step */}
      <StepByStepGuide />

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
