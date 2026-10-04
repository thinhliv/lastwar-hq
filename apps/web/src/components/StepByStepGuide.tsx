"use client";

import { useState } from "react";
import Image from "next/image";
import { Send, CheckCircle2, AlertTriangle, ArrowRight, Flame, Download, ChevronLeft, ChevronRight } from "lucide-react";
import { TELEGRAM_BUY_BOT, TELEGRAM_SUPPORT_GROUP } from "@/lib/telegram";
import { useI18n } from "@/lib/i18n";

export default function StepByStepGuide() {
  const { t } = useI18n();
  const [activeStep, setActiveStep] = useState(1);

  const steps = [
    {
      num: 1,
      title: t("step1.title"),
      desc: t("step1.desc"),
      image: "/images/bot/step-language.png",
      alt: "Telegram bot language selection",
      highlight: t("step1.hl"),
    },
    {
      num: 2,
      title: t("step2.title"),
      desc: t("step2.desc"),
      image: "/images/bot/step-menu.png",
      alt: "Buy key or renew plan options",
      highlight: t("step2.hl"),
    },
    {
      num: 3,
      title: t("step3.title"),
      desc: t("step3.desc"),
      image: "/images/bot/step-team-murphy.png",
      alt: "Select Team Murphy reseller",
      highlight: t("step3.hl"),
      isWarning: true,
    },
    {
      num: 4,
      title: t("step4.title"),
      desc: t("step4.desc"),
      image: "/images/bot/pricing-usd.png",
      alt: "Automatic payment and receive key",
      highlight: t("step4.hl"),
    },
  ];

  const currentMobileStep = steps.find((s) => s.num === activeStep) || steps[0];

  return (
    <section id="guide" className="py-8 sm:py-20 bg-[#0d0508]/80 border-y border-red-500/20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-500/15 border border-red-500/30 text-red-300 text-[11px] sm:text-xs font-bold uppercase tracking-wider mb-2.5">
            <Flame className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-red-400 text-red-400" />
            <span>{t("guide.badge")}</span>
          </div>
          <h2 className="text-xl sm:text-3xl md:text-4xl font-black tracking-tight text-white mb-2 sm:mb-3">
            {t("guide.title")}
          </h2>
          <p className="text-xs sm:text-base text-red-100/70">
            {t("guide.desc")}
          </p>
        </div>

        {/* Direct Download Banner */}
        <div className="mb-10 p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-amber-950/40 via-[#15080c] to-red-950/30 border border-amber-500/30 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-5">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center flex-shrink-0 border border-amber-500/30 shadow-lg shadow-amber-500/10">
              <Download className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black text-white flex items-center gap-2 justify-center sm:justify-start">
                <span>{t("guide.bannerTitle")}</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  v2309
                </span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
                {t("guide.bannerDesc")}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto flex-shrink-0">
            <a
              href="/downloads/Setup_Monica.rar"
              download="Setup_Monica.rar"
              className="w-full sm:w-auto min-h-[44px] flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 hover:from-amber-400 hover:to-amber-600 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg shadow-amber-600/30 transition-all hover:scale-105 active:scale-95"
            >
              <Download className="w-4 h-4" />
              <span>{t("guide.btnDownload")}</span>
            </a>
            <a
              href={TELEGRAM_SUPPORT_GROUP}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:flex items-center justify-center min-h-[44px] px-4 py-2.5 rounded-xl text-xs font-semibold text-amber-300 hover:text-white bg-white/5 hover:bg-white/10 transition-colors border border-amber-500/20"
            >
              {t("guide.supportHelp")}
            </a>
          </div>
        </div>

        {/* Mobile Step Stepper (md:hidden) */}
        <div className="md:hidden mb-6">
          {/* Step Selector Pills */}
          <div className="flex items-center justify-between gap-1.5 mb-3 p-1 rounded-2xl bg-black/60 border border-red-500/25">
            {steps.map((s) => (
              <button
                key={s.num}
                onClick={() => setActiveStep(s.num)}
                className={`flex-1 py-2 px-1 text-center rounded-xl text-xs font-black transition-all ${
                  activeStep === s.num
                    ? "bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-md shadow-red-600/35"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                0{s.num}
              </button>
            ))}
          </div>

          {/* Active Mobile Step Card */}
          <div
            className={`rounded-2xl border p-4 sm:p-6 transition-all shadow-xl ${
              currentMobileStep.isWarning
                ? "bg-[#18080d]/95 border-amber-500/40 shadow-amber-950/30"
                : "bg-[#14060a]/90 border-red-500/20 shadow-red-950/20"
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2.5">
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center font-black text-xs shadow-md ${
                    currentMobileStep.isWarning
                      ? "bg-amber-500 text-slate-950 shadow-amber-500/30"
                      : "bg-gradient-to-tr from-red-600 to-rose-600 text-white shadow-red-600/30"
                  }`}
                >
                  {currentMobileStep.num}
                </div>
                <h3 className="text-sm font-extrabold text-white">
                  {currentMobileStep.title}
                </h3>
              </div>
              {currentMobileStep.isWarning && (
                <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center gap-1">
                  <AlertTriangle className="w-2.5 h-2.5" />
                  {t("guide.importantBadge")}
                </span>
              )}
            </div>

            <p className="text-xs text-slate-300 mb-3 leading-relaxed">
              {currentMobileStep.desc}
            </p>

            {/* Screenshot Frame */}
            <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden border border-red-500/20 bg-black/40 mb-3 shadow-inner">
              <Image
                src={currentMobileStep.image}
                alt={currentMobileStep.alt}
                fill
                className="object-contain p-2"
                sizes="(max-width: 768px) 100vw, 500px"
              />
            </div>

            {/* Highlight callout */}
            <div
              className={`p-2.5 rounded-xl text-xs flex items-start gap-2 mb-3 ${
                currentMobileStep.isWarning
                  ? "bg-amber-500/15 border border-amber-500/30 text-amber-200 font-semibold"
                  : "bg-red-500/10 border border-red-500/20 text-red-200"
              }`}
            >
              <CheckCircle2
                className={`w-3.5 h-3.5 flex-shrink-0 mt-0.5 ${
                  currentMobileStep.isWarning ? "text-amber-400" : "text-red-400"
                }`}
              />
              <span className="text-[11px] sm:text-xs">{currentMobileStep.highlight}</span>
            </div>

            {/* Stepper Prev / Next Buttons */}
            <div className="flex items-center justify-between gap-2 pt-2 border-t border-white/5">
              <button
                onClick={() => setActiveStep((p) => Math.max(1, p - 1))}
                disabled={activeStep === 1}
                className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-bold text-slate-300 disabled:opacity-25 disabled:pointer-events-none flex items-center gap-1"
              >
                <ChevronLeft className="w-3.5 h-3.5" /> Prev
              </button>
              <span className="text-[10px] font-mono font-bold text-slate-400">
                {activeStep} / {steps.length}
              </span>
              <button
                onClick={() => setActiveStep((p) => Math.min(steps.length, p + 1))}
                disabled={activeStep === steps.length}
                className="px-3 py-1.5 rounded-lg bg-red-600/20 border border-red-500/40 text-xs font-bold text-red-300 disabled:opacity-25 disabled:pointer-events-none flex items-center gap-1"
              >
                Next <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Desktop Steps Grid (hidden md:grid) */}
        <div className="hidden md:grid md:grid-cols-2 gap-8 mb-12">
          {steps.map((s) => (
            <div
              key={s.num}
              className={`rounded-3xl border p-6 flex flex-col justify-between transition-all hover:-translate-y-1 shadow-xl ${
                s.isWarning
                  ? "bg-[#18080d]/90 border-amber-500/40 shadow-amber-950/30 ring-1 ring-amber-500/20"
                  : "bg-[#14060a]/80 border-red-500/20 shadow-red-950/20"
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center font-black text-sm shadow-md ${
                        s.isWarning
                          ? "bg-amber-500 text-slate-950 shadow-amber-500/30"
                          : "bg-gradient-to-tr from-red-600 to-rose-600 text-white shadow-red-600/30"
                      }`}
                    >
                      {s.num}
                    </div>
                    <h3 className="text-base font-extrabold text-white">
                      {s.title}
                    </h3>
                  </div>
                  {s.isWarning && (
                    <span className="text-[10px] font-black uppercase px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3" />
                      {t("guide.importantBadge")}
                    </span>
                  )}
                </div>

                <p className="text-xs sm:text-sm text-slate-300 mb-4 leading-relaxed">
                  {s.desc}
                </p>

                {/* Screenshot Frame */}
                <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden border border-red-500/20 bg-black/40 mb-4 shadow-inner">
                  <Image
                    src={s.image}
                    alt={s.alt}
                    fill
                    className="object-contain p-2 hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, 500px"
                  />
                </div>
              </div>

              {/* Highlight callout */}
              <div
                className={`p-3 rounded-xl text-xs flex items-start gap-2 ${
                  s.isWarning
                    ? "bg-amber-500/15 border border-amber-500/30 text-amber-200 font-semibold"
                    : "bg-red-500/10 border border-red-500/20 text-red-200"
                }`}
              >
                <CheckCircle2
                  className={`w-4 h-4 flex-shrink-0 mt-0.5 ${
                    s.isWarning ? "text-amber-400" : "text-red-400"
                  }`}
                />
                <span>{s.highlight}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Big CTA to open bot */}
        <div className="text-center">
          <a
            href={TELEGRAM_BUY_BOT}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-gradient-to-r from-red-600 via-rose-600 to-red-700 hover:from-red-500 hover:to-rose-500 text-white font-black text-sm uppercase tracking-wider shadow-2xl shadow-red-600/40 transition-all hover:scale-105 active:scale-95 border border-red-400/40"
          >
            <Send className="w-4 h-4" />
            <span>{t("guide.btnOpenBot")}</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
