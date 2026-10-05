"use client";

import { useState, useMemo } from "react";
import {
  Flame,
  Play,
  ExternalLink,
  Send,
  Zap,
  ShieldCheck,
  Cpu,
  Sparkles,
  Monitor,
  Smartphone,
} from "lucide-react";
import { TELEGRAM_BUY_BOT, TELEGRAM_SUPPORT_GROUP } from "@/lib/telegram";
import { useI18n } from "@/lib/i18n";
import { extractYouTubeId } from "@/lib/youtube";
import upcomingData from "@/data/upcoming-update.json";
import HoverVideoPreview from "@/components/HoverVideoPreview";

export default function UpcomingUpdateSection() {
  const { t } = useI18n();
  const [videoPlatform, setVideoPlatform] = useState<"pc" | "mobile">("pc");

  const pcYoutubeId = useMemo(() => {
    return extractYouTubeId(upcomingData.youtubeUrl);
  }, []);

  const mobileYoutubeId = useMemo(() => {
    return extractYouTubeId(
      (upcomingData as { mobileYoutubeUrl?: string }).mobileYoutubeUrl ||
        "https://youtube.com/shorts/QBol43tCzl8?feature=share"
    );
  }, []);

  const activeId = videoPlatform === "pc" ? pcYoutubeId : mobileYoutubeId;
  const activeUrl =
    videoPlatform === "pc"
      ? upcomingData.youtubeUrl
      : (upcomingData as { mobileYoutubeUrl?: string }).mobileYoutubeUrl ||
        `https://www.youtube.com/shorts/${mobileYoutubeId}`;

  return (
    <section
      id="upcoming"
      className="relative py-8 sm:py-16 overflow-hidden bg-gradient-to-b from-[#0a0305] via-[#120508] to-[#080204] border-b border-red-500/25"
    >
      {/* Ambient Cyber-Glows */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[350px] bg-red-600/15 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute top-1/3 right-10 w-[400px] h-[300px] bg-amber-500/10 blur-[110px] pointer-events-none rounded-full" />

      {/* Grid Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(239, 68, 68, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(239, 68, 68, 0.1) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Tactical Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gradient-to-r from-red-500/20 via-rose-500/15 to-amber-500/15 border border-red-500/40 text-red-200 text-[11px] sm:text-xs font-black uppercase tracking-wider mb-2.5 shadow-lg shadow-red-950/50">
            <Flame className="w-3.5 h-3.5 fill-red-400 text-red-400 animate-pulse" />
            <span>{t("upcoming.badge")}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-white mb-2 sm:mb-3 uppercase">
            {t("upcoming.title")}{" "}
            <span className="bg-gradient-to-r from-red-400 via-rose-300 to-amber-400 bg-clip-text text-transparent">
              {t("upcoming.titleHighlight")}
            </span>
          </h2>
          <p className="text-xs sm:text-base text-red-100/70 leading-relaxed max-w-2xl mx-auto">
            {t("upcoming.desc")}
          </p>
        </div>

        {/* Main Content: Player (Col 7) + Sneak Peek Features (Col 5) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* Left Column: Tactical Video Player Box */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="relative rounded-3xl overflow-hidden border-2 border-red-500/40 bg-[#14060a]/95 p-3 sm:p-4 shadow-2xl shadow-red-950/80 flex flex-col h-full group hover:border-red-500/60 transition-all">
              {/* Tactical Top Bar */}
              <div className="flex flex-wrap items-center justify-between gap-2 px-3 sm:px-4 py-2 bg-[#1f0910] rounded-2xl border border-red-500/20 mb-3 text-xs">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                  </span>
                  <span className="font-extrabold text-emerald-400 uppercase tracking-wide text-[11px] sm:text-xs">
                    {t("upcoming.status")}
                  </span>
                </div>

                {/* Platform Video Switcher (PC / Mobile) */}
                <div className="inline-flex p-1 rounded-xl bg-black/60 border border-red-500/25 gap-1">
                  <button
                    onClick={() => setVideoPlatform("pc")}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-[11px] font-black transition-all ${
                      videoPlatform === "pc"
                        ? "bg-gradient-to-r from-red-600 to-rose-600 text-white shadow"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    <Monitor className="w-3 h-3" />
                    <span>Bản PC</span>
                  </button>
                  <button
                    onClick={() => setVideoPlatform("mobile")}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-[11px] font-black transition-all ${
                      videoPlatform === "mobile"
                        ? "bg-gradient-to-r from-red-600 to-rose-600 text-white shadow"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    <Smartphone className="w-3 h-3" />
                    <span>Bản Mobile</span>
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] sm:text-[11px] font-black px-2.5 py-1 rounded-lg bg-red-500/20 text-red-300 border border-red-500/40 tracking-wider">
                    {videoPlatform === "pc" ? upcomingData.version : "v2309 ANDROID"}
                  </span>
                </div>
              </div>

              {/* YouTube Video Embed Frame with 5s Hover Preview */}
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black/90 border border-red-500/25 shadow-inner">
                {activeId ? (
                  <HoverVideoPreview
                    youtubeId={activeId}
                    title={videoPlatform === "pc" ? "Monica Bot PC Update" : "Monica Bot Android Mobile"}
                    isShort={videoPlatform === "mobile"}
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-b from-[#1b070f] to-[#0d0306]">
                    <Play className="w-12 h-12 text-red-500/50 mb-3" />
                    <p className="text-sm text-slate-300">
                      Video link currently updating...
                    </p>
                  </div>
                )}
              </div>

              {/* Bottom Quick-Action Links */}
              <div className="mt-3.5 pt-3 border-t border-red-500/15 flex flex-wrap items-center justify-between gap-3 text-xs">
                <a
                  href={activeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[40px] px-4 py-2 rounded-xl bg-red-600/20 hover:bg-red-600/30 text-red-200 hover:text-white font-bold flex items-center gap-1.5 border border-red-500/30 transition-all shadow"
                >
                  <Play className="w-3.5 h-3.5 fill-red-400 text-red-400" />
                  <span>{t("upcoming.watchOnYT")}</span>
                  <ExternalLink className="w-3 h-3 text-red-400 ml-0.5" />
                </a>

                <a
                  href={TELEGRAM_SUPPORT_GROUP}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[40px] px-4 py-2 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 hover:text-amber-200 font-bold flex items-center gap-1.5 border border-amber-500/35 transition-all shadow"
                >
                  <Send className="w-3.5 h-3.5 text-amber-400" />
                  <span>{t("upcoming.joinTelegram")}</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Upcoming Feature Highlights */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-3">
            <div className="flex overflow-x-auto snap-x scrollbar-none gap-3 pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-3 lg:grid-cols-1">
              {/* Feature Card 1 */}
              <div className="w-[78vw] max-w-[280px] shrink-0 snap-center sm:w-auto p-4 sm:p-5 rounded-2xl bg-[#14060a]/90 border border-red-500/25 hover:border-red-500/50 transition-all shadow-lg hover:-translate-y-0.5 group">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-red-500/20 border border-red-500/40 text-red-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <Zap className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <div className="inline-block px-2 py-0.5 rounded bg-red-500/15 text-red-300 border border-red-500/30 text-[10px] font-black uppercase tracking-wider mb-1">
                      {t("upcoming.tagCombat")}
                    </div>
                    <h3 className="text-sm sm:text-base font-black text-white mb-1 group-hover:text-red-300 transition-colors">
                      {t("upcoming.f1Title")}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {t("upcoming.f1Desc")}
                    </p>
                  </div>
                </div>
              </div>

              {/* Feature Card 2 */}
              <div className="w-[78vw] max-w-[280px] shrink-0 snap-center sm:w-auto p-4 sm:p-5 rounded-2xl bg-[#14060a]/90 border border-amber-500/25 hover:border-amber-500/50 transition-all shadow-lg hover:-translate-y-0.5 group">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <div className="inline-block px-2 py-0.5 rounded bg-amber-500/15 text-amber-300 border border-amber-500/30 text-[10px] font-black uppercase tracking-wider mb-1">
                      {t("upcoming.tagDefense")}
                    </div>
                    <h3 className="text-sm sm:text-base font-black text-white mb-1 group-hover:text-amber-300 transition-colors">
                      {t("upcoming.f2Title")}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {t("upcoming.f2Desc")}
                    </p>
                  </div>
                </div>
              </div>

              {/* Feature Card 3 */}
              <div className="w-[78vw] max-w-[280px] shrink-0 snap-center sm:w-auto p-4 sm:p-5 rounded-2xl bg-[#14060a]/90 border border-rose-500/25 hover:border-rose-500/50 transition-all shadow-lg hover:-translate-y-0.5 group">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <Cpu className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <div className="inline-block px-2 py-0.5 rounded bg-rose-500/15 text-rose-300 border border-rose-500/30 text-[10px] font-black uppercase tracking-wider mb-1">
                      {t("upcoming.tagPerf")}
                    </div>
                    <h3 className="text-sm sm:text-base font-black text-white mb-1 group-hover:text-rose-300 transition-colors">
                      {t("upcoming.f3Title")}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {t("upcoming.f3Desc")}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* VIP Beta Callout Banner */}
            <div className="p-3.5 rounded-2xl bg-gradient-to-r from-red-950/60 via-[#1e070e] to-amber-950/40 border border-red-500/30 flex items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="text-slate-300 text-[11px] sm:text-xs">
                  {t("hero.previewReseller")}{" "}
                  <strong className="text-amber-300 font-extrabold">Team Murphy</strong>
                </span>
              </div>
              <a
                href={TELEGRAM_BUY_BOT}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-1.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-extrabold text-xs shadow-md transition-colors"
              >
                {t("hero.previewActivate")}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
