"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Send,
  Play,
  Flame,
  Swords,
  Skull,
  Zap,
  Server,
  Crown,
  Download,
  ChevronRight,
  ExternalLink,
  Key,
} from "lucide-react";
import PricingSection from "@/components/PricingSection";
import FeaturesSection from "@/components/FeaturesSection";
import StepByStepGuide from "@/components/StepByStepGuide";
import VideoSection from "@/components/VideoSection";
import TelegramAnnouncementSection from "@/components/TelegramAnnouncementSection";
import FAQSection from "@/components/FAQSection";
import DownloadModal from "@/components/DownloadModal";
import { TELEGRAM_BUY_BOT, TELEGRAM_SUPPORT_GROUP } from "@/lib/telegram";
import { useI18n } from "@/lib/i18n";

export default function HomePage() {
  const { t } = useI18n();
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);

  return (
    <div className="min-h-screen text-slate-100 selection:bg-red-600 selection:text-white w-full overflow-x-hidden">
      {/* ===== HERO SECTION (UNIFIED RESPONSIVE) ===== */}
      <section className="relative pt-8 pb-12 sm:pt-12 sm:pb-16 lg:pt-16 lg:pb-24 overflow-hidden border-b border-red-500/20 bg-gradient-to-b from-[#13060a] via-[#0d0407] to-[#080204]">
        {/* Burning Ember Glow Gradients */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[200px] sm:w-[500px] sm:h-[300px] lg:w-[720px] lg:h-[400px] bg-gradient-to-tr from-red-600/20 via-rose-600/15 to-amber-500/10 blur-[100px] sm:blur-[120px] lg:blur-[140px] pointer-events-none rounded-full" />
        <div className="absolute top-10 right-10 w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] bg-red-600/10 blur-[80px] sm:blur-[110px] pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-center">
            {/* Left Column: Headline & CTA */}
            <div className="lg:col-span-7 text-center lg:text-left">
              {/* War Campaign Badge */}
              <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-red-500/15 border border-red-500/35 text-red-300 text-[11px] sm:text-xs font-bold tracking-wide uppercase mb-4 sm:mb-6 shadow-md shadow-red-950/40">
                <Flame className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-red-400 text-red-400 animate-pulse" />
                <span>{t("hero.badge")}</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black tracking-tight leading-[1.08] mb-3 sm:mb-4 lg:mb-5 uppercase">
                {t("hero.title")}{" "}
                <span className="bg-gradient-to-r from-red-400 via-rose-300 to-amber-400 bg-clip-text text-transparent drop-shadow-sm">
                  {t("hero.titleHighlight")}
                </span>
              </h1>

              {/* Description */}
              <p className="text-sm sm:text-base lg:text-lg text-slate-300 leading-relaxed max-w-xl mx-auto lg:mx-0 mb-5 sm:mb-6 lg:mb-8 font-medium">
                {t("hero.desc")}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 mb-5 sm:mb-6 lg:mb-8">
                <a
                  href={TELEGRAM_BUY_BOT}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto min-h-[44px] sm:min-h-[48px] flex items-center justify-center gap-2 px-5 sm:px-6 lg:px-7 py-3 sm:py-3.5 rounded-xl sm:rounded-2xl bg-gradient-to-r from-red-600 via-rose-600 to-red-700 hover:from-red-500 hover:to-rose-500 text-white font-black text-xs sm:text-sm uppercase tracking-wider shadow-xl shadow-red-600/35 transition-all hover:scale-105 active:scale-95 border border-red-400/40"
                >
                  <Send className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-white" />
                  <span>{t("hero.btnBuy")}</span>
                </a>

                <button
                  onClick={() => setIsDownloadModalOpen(true)}
                  className="w-full sm:w-auto min-h-[44px] sm:min-h-[48px] flex items-center justify-center gap-2 px-4 sm:px-5 lg:px-6 py-3 sm:py-3.5 rounded-xl sm:rounded-2xl bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 hover:text-amber-200 font-bold text-xs sm:text-sm border border-amber-500/40 transition-all shadow-lg shadow-amber-950/30 group"
                >
                  <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400 group-hover:scale-110 transition-transform" />
                  <span>{t("hero.btnDownload")} (PC / Android / iOS)</span>
                </button>

                <a
                  href="#video"
                  className="w-full sm:w-auto min-h-[44px] sm:min-h-[48px] flex items-center justify-center gap-2 px-4 sm:px-5 py-3 sm:py-3.5 rounded-xl sm:rounded-2xl bg-white/5 hover:bg-white/10 text-slate-200 font-bold text-xs sm:text-sm border border-white/10 transition-colors"
                >
                  <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current text-red-400" />
                  <span>{t("hero.btnVideos")}</span>
                </a>
              </div>

              {/* Trust & Guarantee Callout */}
              <div className="pt-3 sm:pt-4 border-t border-red-500/15 flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 lg:gap-5 text-[11px] sm:text-xs text-slate-400">
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-slate-300">{t("hero.trust1")}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Key className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-400" />
                  <span className="text-amber-300 font-bold">1 Key Dùng Chung PC & Android</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Crown className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-400" />
                  <span className="text-amber-300 font-bold">{t("hero.trust3")}</span>
                </div>
              </div>
            </div>

            {/* Right Column: App Showcase Preview */}
            <div className="lg:col-span-5 mt-4 lg:mt-0">
              <div className="relative mx-auto max-w-[320px] sm:max-w-md lg:max-w-none">
                <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-red-500/50 bg-[#120508] p-2.5 sm:p-3.5 shadow-2xl shadow-red-950/70">
                  {/* Top Bar simulation */}
                  <div className="flex items-center justify-between px-2.5 sm:px-3 py-1.5 sm:py-2 bg-[#1a080d] rounded-xl sm:rounded-2xl border border-red-500/20 mb-2 sm:mb-2.5">
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-emerald-400" />
                      <span className="text-[10px] sm:text-[11px] font-extrabold text-emerald-400">
                        {t("hero.previewStatus")}
                      </span>
                    </div>
                    <span className="text-[9px] sm:text-[10px] font-black px-1.5 sm:px-2 py-0.5 rounded bg-red-500/20 text-red-300 border border-red-500/40">
                      {t("hero.previewVersion")}
                    </span>
                  </div>

                  {/* App Screen Image */}
                  <div className="relative w-full aspect-[4/3] rounded-xl sm:rounded-2xl overflow-hidden border border-red-500/20">
                    <Image
                      src="/images/bot/monica-app-preview.png"
                      alt="Monica Bot Last War"
                      fill
                      priority
                      className="object-cover"
                      sizes="(max-width: 640px) 320px, (max-width: 1024px) 448px, 500px"
                    />
                  </div>

                  {/* Bottom App Bar snippet */}
                  <div className="mt-2 sm:mt-2.5 p-2.5 sm:p-3 rounded-lg sm:rounded-xl bg-[#1a080d] border border-red-500/20 flex items-center justify-between text-[10px] sm:text-[11px]">
                    <span className="text-slate-300">
                      {t("hero.previewReseller")}{" "}
                      <strong className="text-amber-400 font-black">Team Murphy</strong>
                    </span>
                    <a
                      href={TELEGRAM_BUY_BOT}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-red-400 font-extrabold hover:underline flex items-center gap-1"
                    >
                      {t("hero.previewActivate")} <ExternalLink className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== TELEGRAM OFFICIAL ANNOUNCEMENTS (LIVE SYNC) ===== */}
      <TelegramAnnouncementSection />

      {/* ===== FEATURES SECTION ===== */}
      <FeaturesSection />

      {/* ===== STEP BY STEP GUIDE ===== */}
      <StepByStepGuide />

      {/* ===== VIDEO TUTORIAL & DEMO SECTION ===== */}
      <VideoSection />

      {/* ===== PRICING SECTION ===== */}
      <PricingSection />

      {/* ===== FREE COMMUNITY TOOLS SECTION ===== */}
      <section className="py-12 sm:py-16 lg:py-20 bg-[#090305] border-t border-red-500/20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-3 mb-6 sm:mb-8">
            <div>
              <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 rounded-full bg-red-500/15 border border-red-500/30 text-red-300 text-[11px] sm:text-xs font-bold mb-1.5 sm:mb-2">
                <Swords className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-red-400" />
                <span>{t("tools.badge")}</span>
              </div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-white">
                {t("tools.title")}
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                {t("tools.desc")}
              </p>
            </div>
            <Link
              href="/tools"
              className="text-xs sm:text-sm text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1 whitespace-nowrap min-h-[40px] sm:min-h-[44px]"
            >
              {t("tools.viewAll")} <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            <Link
              href="/tools/calculators"
              className="p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-[#15080c]/80 border border-red-500/20 hover:border-red-500/50 transition-all hover:-translate-y-0.5 block shadow-lg flex flex-col items-start"
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-red-500/15 text-red-400 flex items-center justify-center mb-2.5 sm:mb-3 border border-red-500/30 shrink-0">
                <Skull className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm sm:text-base font-bold text-white mb-1">
                  {t("tools.bossTitle")}
                </h3>
                <p className="text-[11px] sm:text-xs text-slate-400">
                  {t("tools.bossDesc")}
                </p>
              </div>
            </Link>

            <Link
              href="/tools/calculators"
              className="p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-[#15080c]/80 border border-amber-500/20 hover:border-amber-500/50 transition-all hover:-translate-y-0.5 block shadow-lg flex flex-col items-start"
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center mb-2.5 sm:mb-3 border border-amber-500/30 shrink-0">
                <Zap className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm sm:text-base font-bold text-white mb-1">
                  {t("tools.heroTitle")}
                </h3>
                <p className="text-[11px] sm:text-xs text-slate-400">
                  {t("tools.heroDesc")}
                </p>
              </div>
            </Link>

            <Link
              href="/tools/clan-finder"
              className="p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-[#15080c]/80 border border-rose-500/20 hover:border-rose-500/50 transition-all hover:-translate-y-0.5 block shadow-lg flex flex-col items-start"
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-rose-500/15 text-rose-400 flex items-center justify-center mb-2.5 sm:mb-3 border border-rose-500/30 shrink-0">
                <Server className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm sm:text-base font-bold text-white mb-1">
                  {t("tools.clanTitle")}
                </h3>
                <p className="text-[11px] sm:text-xs text-slate-400">
                  {t("tools.clanDesc")}
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ===== FAQ SECTION ===== */}
      <FAQSection />

      {/* ===== GLOBAL FOOTER ===== */}
      <footer className="py-8 sm:py-10 lg:py-12 border-t border-red-500/20 bg-[#060203] text-slate-400 text-[11px] sm:text-xs overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
            <div className="flex items-center gap-2 sm:gap-2.5">
              <div className="relative w-6 h-6 rounded-lg overflow-hidden border border-red-500/40 shadow-sm shadow-red-600/20 shrink-0 bg-[#16060c]">
                <Image
                  src="/images/bot/monica-logo.png"
                  alt="Monica Bot"
                  fill
                  className="object-cover"
                />
              </div>
              <span className="font-black text-white tracking-wide text-xs sm:text-sm">MONICA BOT</span>
              <span className="text-red-500">·</span>
              <span className="text-slate-300">
                {t("footer.brandDesc")} <strong className="text-amber-400">Team Murphy</strong>
              </span>
            </div>
            <div className="flex items-center gap-3 sm:gap-4 text-[11px] sm:text-xs font-semibold">
              <Link href="/pricing" className="hover:text-red-400 transition-colors">
                {t("nav.pricing")}
              </Link>
              <Link href="/guide" className="hover:text-red-400 transition-colors">
                {t("nav.guide")}
              </Link>
              <Link href="/about" className="hover:text-red-400 transition-colors">
                {t("nav.about")}
              </Link>
              <a
                href={TELEGRAM_SUPPORT_GROUP}
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-400 hover:underline flex items-center gap-1"
              >
                {t("nav.support")} Telegram <ExternalLink className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
              </a>
            </div>
          </div>
          <div className="mt-3 sm:mt-4 text-center sm:text-left text-[10px] sm:text-[11px] text-slate-500">
            {t("footer.copyright")}
          </div>
        </div>
      </footer>

      <DownloadModal
        isOpen={isDownloadModalOpen}
        onClose={() => setIsDownloadModalOpen(false)}
      />
    </div>
  );
}
