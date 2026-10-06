"use client";

import { useState } from "react";
import { Play, Tv, ShieldCheck, Download, ExternalLink, Flame } from "lucide-react";
import HoverVideoPreview from "./HoverVideoPreview";
import { TELEGRAM_SUPPORT_GROUP } from "@/lib/telegram";
import { useI18n } from "@/lib/i18n";

interface VideoTab {
  id: string;
  title: string;
  description: string;
  youtubeId?: string;
}

export default function VideoSection() {
  const [activeTab, setActiveTab] = useState("overview");
  const { t } = useI18n();

  const tabs: VideoTab[] = [
    {
      id: "overview",
      title: t("v1.title"),
      description: t("v1.desc"),
      youtubeId: "xusYAIiSwxg",
    },
    {
      id: "nvbm",
      title: t("v2.title"),
      description: t("v2.desc"),
      youtubeId: "Uvxba0yriJo",
    },
    {
      id: "xe_tai",
      title: t("v3.title"),
      description: t("v3.desc"),
      youtubeId: "0KRAdDZI5Mk",
    },
    {
      id: "guide",
      title: t("v4.title"),
      description: t("v4.desc"),
      youtubeId: "bkm5aYR6aMk",
    },
  ];

  const currentTab = tabs.find((t) => t.id === activeTab) || tabs[0];

  return (
    <section id="video" className="py-8 sm:py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-5 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-500/15 border border-red-500/30 text-red-300 text-[11px] sm:text-xs font-bold uppercase tracking-wider mb-2.5">
            <Flame className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-red-400 text-red-400" />
            <span>{t("video.badge")}</span>
          </div>
          <h2 className="text-xl sm:text-3xl md:text-4xl font-black tracking-tight text-white mb-2 sm:mb-3">
            {t("video.title")}
          </h2>
          <p className="text-xs sm:text-base text-red-100/70">
            {t("video.desc")}
          </p>
        </div>

        {/* Video Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-5 sm:mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`min-h-[44px] px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center ${
                activeTab === tab.id
                  ? "bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-lg shadow-red-600/35 border border-red-400/40"
                  : "bg-[#16080c]/80 hover:bg-[#200b12] text-slate-300 border border-red-500/20"
              }`}
            >
              <span>{tab.title}</span>
            </button>
          ))}
        </div>

        {/* Video Player Box */}
        <div className="max-w-4xl mx-auto rounded-3xl overflow-hidden border-2 border-red-500/30 bg-[#120508] p-3 sm:p-5 shadow-2xl shadow-red-950/60">
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black/80 border border-red-500/20">
            {currentTab.youtubeId ? (
              <HoverVideoPreview youtubeId={currentTab.youtubeId} title={currentTab.title} />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-center p-6 bg-gradient-to-b from-[#18080d] to-[#0c0406]">
                <div className="w-16 h-16 rounded-3xl bg-amber-500/15 border border-amber-500/30 text-amber-400 flex items-center justify-center mb-4 shadow-lg shadow-amber-500/10">
                  <Tv className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-black text-white mb-2">
                  {t("video.updatingTitle")}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 max-w-md mb-6">
                  {t("video.updatingDesc")}
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <a
                    href="/downloads/Setup_Monica.rar"
                    download="Setup_Monica.rar"
                    className="min-h-[44px] flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs uppercase shadow-lg shadow-amber-500/20"
                  >
                    <Download className="w-4 h-4" />
                    <span>{t("video.btnDownloadTool")}</span>
                  </a>
                  <a
                    href={TELEGRAM_SUPPORT_GROUP}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="min-h-[44px] flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#200b12] hover:bg-[#2c0e18] text-amber-300 font-bold text-xs border border-amber-500/30"
                  >
                    <span>{t("video.contactSupport")}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            )}
          </div>

          <div className="mt-4 px-2 py-1 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <h4 className="text-base font-black text-white">{currentTab.title}</h4>
              <p className="text-xs text-slate-300 mt-1">{currentTab.description}</p>
            </div>
            {currentTab.youtubeId && (
              <a
                href={`https://www.youtube.com/watch?v=${currentTab.youtubeId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs text-red-400 hover:text-red-300 font-bold whitespace-nowrap"
              >
                <span>{t("video.watchOnYT")}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
