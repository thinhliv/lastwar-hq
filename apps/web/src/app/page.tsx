"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Send,
  Play,
  Flame,
  Coins,
  Swords,
  Skull,
  Zap,
  Server,
  Crown,
  Download,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import PricingSection from "@/components/PricingSection";
import FeaturesSection from "@/components/FeaturesSection";
import StepByStepGuide from "@/components/StepByStepGuide";
import VideoSection from "@/components/VideoSection";
import UpcomingUpdateSection from "@/components/UpcomingUpdateSection";
import FAQSection from "@/components/FAQSection";
import { TELEGRAM_BUY_BOT, TELEGRAM_SUPPORT_GROUP } from "@/lib/telegram";
import { useI18n } from "@/lib/i18n";

export default function HomePage() {
  const { t } = useI18n();

  return (
    <div className="min-h-screen text-slate-100 selection:bg-red-600 selection:text-white w-full overflow-x-hidden">
      {/* ===== HERO SECTION (STYLE 8: CRIMSON DUEL WAR ROOM) ===== */}
      <section className="relative pt-8 pb-16 sm:pt-14 sm:pb-24 overflow-hidden border-b border-red-500/20 bg-gradient-to-b from-[#13060a] via-[#0d0407] to-[#080204]">
        {/* Burning Ember Glow Gradients */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[680px] h-[380px] bg-gradient-to-tr from-red-600/20 via-rose-600/15 to-amber-500/10 blur-[130px] pointer-events-none rounded-full" />
        <div className="absolute top-10 right-10 w-[300px] h-[300px] bg-red-600/10 blur-[100px] pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Column: Headline & CTA */}
            <div className="lg:col-span-7 text-center lg:text-left">
              {/* War Campaign Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-500/15 border border-red-500/35 text-red-300 text-xs font-bold tracking-wide uppercase mb-6 shadow-md shadow-red-950/40">
                <Flame className="w-3.5 h-3.5 fill-red-400 text-red-400 animate-pulse" />
                <span>{t("hero.badge")}</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.08] mb-5 uppercase">
                {t("hero.title")}{" "}
                <span className="bg-gradient-to-r from-red-400 via-rose-300 to-amber-400 bg-clip-text text-transparent drop-shadow-sm">
                  {t("hero.titleHighlight")}
                </span>
              </h1>

              {/* Description */}
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl mx-auto lg:mx-0 mb-8 font-medium">
                {t("hero.desc")}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 mb-8">
                <a
                  href={TELEGRAM_BUY_BOT}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto min-h-[48px] flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-2xl bg-gradient-to-r from-red-600 via-rose-600 to-red-700 hover:from-red-500 hover:to-rose-500 text-white font-black text-sm uppercase tracking-wider shadow-xl shadow-red-600/35 transition-all hover:scale-105 active:scale-95 border border-red-400/40"
                >
                  <Send className="w-4 h-4 fill-white" />
                  <span>{t("hero.btnBuy")}</span>
                </a>

                <a
                  href="/downloads/Setup_Monica.rar"
                  download="Setup_Monica.rar"
                  className="w-full sm:w-auto min-h-[48px] flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 hover:text-amber-200 font-bold text-sm border border-amber-500/40 transition-all shadow-lg shadow-amber-950/30 group"
                >
                  <Download className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
                  <span>{t("hero.btnDownload")}</span>
                </a>

                <a
                  href="#video"
                  className="w-full sm:w-auto min-h-[48px] flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl bg-[#1a080d]/90 hover:bg-[#250b13] text-white font-bold text-sm border border-red-500/30 transition-colors shadow-lg"
                >
                  <Play className="w-4 h-4 fill-white text-white" />
                  <span>{t("hero.btnVideos")}</span>
                </a>

                <Link
                  href="/pricing"
                  className="w-full sm:w-auto min-h-[48px] flex items-center justify-center gap-1.5 px-4 py-3.5 rounded-2xl text-amber-300 hover:text-amber-200 font-bold text-sm transition-colors"
                >
                  <span>{t("hero.btnPricing")}</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Trust & Guarantee Callout */}
              <div className="pt-4 border-t border-red-500/15 flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 text-xs text-slate-400">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-slate-300">{t("hero.trust1")}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Coins className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="text-slate-300">{t("hero.trust2")}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Crown className="w-3.5 h-3.5 text-amber-400" />
                  <span className="text-amber-300 font-bold">{t("hero.trust3")}</span>
                </div>
              </div>
            </div>

            {/* Right Column: App Showcase Preview */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div className="relative rounded-3xl overflow-hidden border-2 border-red-500/50 bg-[#120508] p-2.5 sm:p-3.5 shadow-2xl shadow-red-950/70">
                  {/* Top Bar simulation */}
                  <div className="flex items-center justify-between px-3 py-2 bg-[#1a080d] rounded-2xl border border-red-500/20 mb-2.5">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                      <span className="text-[11px] font-extrabold text-emerald-400">
                        {t("hero.previewStatus")}
                      </span>
                    </div>
                    <span className="text-[10px] font-black px-2 py-0.5 rounded bg-red-500/20 text-red-300 border border-red-500/40">
                      {t("hero.previewVersion")}
                    </span>
                  </div>

                  {/* App Screen Image */}
                  <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-red-500/20">
                    <Image
                      src="/images/bot/monica-app-preview.png"
                      alt="Monica Bot Last War"
                      fill
                      priority
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 500px"
                    />
                  </div>

                  {/* Bottom App Bar snippet */}
                  <div className="mt-2.5 p-3 rounded-xl bg-[#1a080d] border border-red-500/20 flex items-center justify-between text-[11px]">
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
                      {t("hero.previewActivate")} <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== UPCOMING UPDATE SNEAK PEEK (WITH DYNAMIC YOUTUBE EMBED) ===== */}
      <UpcomingUpdateSection />

      {/* ===== FEATURES SECTION ===== */}
      <FeaturesSection />

      {/* ===== STEP BY STEP GUIDE (WITH ACTUAL SCREENSHOTS) ===== */}
      <StepByStepGuide />

      {/* ===== VIDEO TUTORIAL & DEMO SECTION ===== */}
      <VideoSection />

      {/* ===== PRICING SECTION ===== */}
      <PricingSection />

      {/* ===== FREE COMMUNITY TOOLS SECTION ===== */}
      <section className="py-14 sm:py-20 bg-[#090305] border-t border-red-500/20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/15 border border-red-500/30 text-red-300 text-xs font-bold mb-2">
                <Swords className="w-3.5 h-3.5 text-red-400" />
                <span>{t("tools.badge")}</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-white">
                {t("tools.title")}
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                {t("tools.desc")}
              </p>
            </div>
            <Link
              href="/tools"
              className="text-xs sm:text-sm text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1 whitespace-nowrap min-h-[44px]"
            >
              {t("tools.viewAll")} <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              href="/tools/calculators"
              className="p-5 rounded-2xl bg-[#15080c]/80 border border-red-500/20 hover:border-red-500/50 transition-all hover:-translate-y-0.5 block shadow-lg min-h-[48px]"
            >
              <div className="w-10 h-10 rounded-xl bg-red-500/15 text-red-400 flex items-center justify-center mb-3 border border-red-500/30">
                <Skull className="w-5 h-5" />
              </div>
              <h3 className="text-sm sm:text-base font-bold text-white mb-1">
                {t("tools.bossTitle")}
              </h3>
              <p className="text-xs sm:text-sm text-slate-400">
                {t("tools.bossDesc")}
              </p>
            </Link>

            <Link
              href="/tools/calculators"
              className="p-5 rounded-2xl bg-[#15080c]/80 border border-amber-500/20 hover:border-amber-500/50 transition-all hover:-translate-y-0.5 block shadow-lg min-h-[48px]"
            >
              <div className="w-10 h-10 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center mb-3 border border-amber-500/30">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="text-sm sm:text-base font-bold text-white mb-1">
                {t("tools.heroTitle")}
              </h3>
              <p className="text-xs sm:text-sm text-slate-400">
                {t("tools.heroDesc")}
              </p>
            </Link>

            <Link
              href="/tools/clan-finder"
              className="p-5 rounded-2xl bg-[#15080c]/80 border border-rose-500/20 hover:border-rose-500/50 transition-all hover:-translate-y-0.5 block shadow-lg min-h-[48px]"
            >
              <div className="w-10 h-10 rounded-xl bg-rose-500/15 text-rose-400 flex items-center justify-center mb-3 border border-rose-500/30">
                <Server className="w-5 h-5" />
              </div>
              <h3 className="text-sm sm:text-base font-bold text-white mb-1">
                {t("tools.clanTitle")}
              </h3>
              <p className="text-xs sm:text-sm text-slate-400">
                {t("tools.clanDesc")}
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* ===== FAQ SECTION ===== */}
      <FAQSection />

      {/* ===== GLOBAL FOOTER ===== */}
      <footer className="py-12 border-t border-red-500/20 bg-[#060203] text-slate-400 text-xs overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="font-black text-white tracking-wide">MONICA BOT</span>
              <span className="text-red-500">·</span>
              <span className="text-slate-300">
                {t("footer.brandDesc")} <strong className="text-amber-400">Team Murphy</strong>
              </span>
            </div>
            <div className="flex items-center gap-4 text-xs font-semibold">
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
                {t("nav.support")} Telegram <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
          <div className="mt-4 text-center sm:text-left text-[11px] text-slate-500">
            {t("footer.copyright")}
          </div>
        </div>
      </footer>
    </div>
  );
}
