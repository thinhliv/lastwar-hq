"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Send,
  Play,
  Flame,
  Crown,
  Download,
  Check,
  ChevronDown,
  ChevronRight,
  ExternalLink,
  Shield,
  Zap,
  Sparkles,
  Layers,
  Crosshair,
  Globe2,
  FileText,
  HelpCircle,
  Tag,
  ShieldCheck,
  Cpu,
  Swords,
  Key,
  Monitor,
  Smartphone,
  Apple,
} from "lucide-react";
import { VND_PLANS, USD_PLANS } from "@/data/plans";
import { TELEGRAM_BUY_BOT, TELEGRAM_SUPPORT_GROUP } from "@/lib/telegram";
import { useI18n } from "@/lib/i18n";
import DownloadModal from "@/components/DownloadModal";
import HoverVideoPreview from "@/components/HoverVideoPreview";
import TelegramAnnouncementSection from "@/components/TelegramAnnouncementSection";

type AppTab = "pricing" | "features" | "guide" | "faq";

export default function MobileHomeView() {
  const { t, locale } = useI18n();
  const [activeTab, setActiveTab] = useState<AppTab>("pricing");
  const [currency, setCurrency] = useState<"VND" | "USD">("USD");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);

  // Auto-switch currency based on IP locale
  useEffect(() => {
    if (locale === "vi") {
      setCurrency("VND");
    } else {
      setCurrency("USD");
    }
  }, [locale]);

  const plans = currency === "VND" ? VND_PLANS : USD_PLANS;

  const getLocalizedPlan = (p: (typeof plans)[0]) => {
    const is7d = p.id.includes("7d");
    const is30d = p.id.includes("30d") || p.id.includes("1m");
    const is90d = p.id.includes("90d") || p.id.includes("3m");
    const is180d = p.id.includes("180d") || p.id.includes("6m");
    const is365d = p.id.includes("365d") || p.id.includes("1y");

    const name = is7d
      ? t("pricing.planTrial")
      : is30d
      ? t("pricing.plan1M")
      : is90d
      ? t("pricing.plan3M")
      : is180d
      ? t("pricing.plan6M")
      : is365d
      ? t("pricing.plan1Y")
      : t("pricing.planLife");

    const duration = is7d
      ? t("pricing.dur7D")
      : is30d
      ? t("pricing.dur30D")
      : is90d
      ? t("pricing.dur90D")
      : is180d
      ? t("pricing.dur180D")
      : is365d
      ? t("pricing.dur365D")
      : t("pricing.durLife");

    const features = is7d
      ? [t("pricing.fFullSuite"), t("pricing.fPcClient"), t("pricing.fVipSupport")]
      : is30d
      ? [t("pricing.fAutoEvents"), t("pricing.fMultiAcc"), t("pricing.fInstantKey")]
      : is90d
      ? [t("pricing.fSeasonReady"), t("pricing.fLowResource"), t("pricing.fPriorityPatch")]
      : is180d
      ? [t("pricing.fAllianceDom"), t("pricing.fLowResource"), t("pricing.fPriorityPatch")]
      : is365d
      ? [t("pricing.fAllYear"), t("pricing.fVipSupport"), t("pricing.fInstantKey")]
      : [t("pricing.fPermanent"), t("pricing.fAllYear"), t("pricing.fDirectAdmin")];

    return { name, duration, features };
  };

  const featureList = [
    {
      icon: Crosshair,
      title: t("f1.title"),
      desc: t("f1.desc"),
      accent: "text-red-400 bg-red-500/15 border-red-500/30",
    },
    {
      icon: Swords,
      title: t("f2.title"),
      desc: t("f2.desc"),
      accent: "text-amber-400 bg-amber-500/15 border-amber-500/30",
    },
    {
      icon: Shield,
      title: t("f3.title"),
      desc: t("f3.desc"),
      accent: "text-rose-400 bg-rose-500/15 border-rose-500/30",
    },
    {
      icon: Layers,
      title: t("f4.title"),
      desc: t("f4.desc"),
      accent: "text-orange-400 bg-orange-500/15 border-orange-500/30",
    },
    {
      icon: Crown,
      title: t("f5.title"),
      desc: t("f5.desc"),
      accent: "text-amber-300 bg-amber-500/20 border-amber-500/40",
    },
    {
      icon: Globe2,
      title: t("f6.title"),
      desc: t("f6.desc"),
      accent: "text-red-300 bg-red-500/15 border-red-500/25",
    },
  ];

  const faqs = [
    {
      q: t("faq1.q"),
      a: t("faq1.a"),
    },
    {
      q: t("faq2.q"),
      a: t("faq2.a"),
    },
    {
      q: t("faq3.q"),
      a: t("faq3.a"),
    },
    {
      q: t("faq4.q"),
      a: t("faq4.a"),
    },
    {
      q: t("faq5.q"),
      a: t("faq5.a"),
    },
  ];

  return (
    <div className="w-full pb-24 text-slate-100">
      {/* ===== MOBILE HERO BANNER ===== */}
      <section className="px-4 pt-4 pb-6 bg-gradient-to-b from-[#18060d] via-[#100408] to-[#0a0205] border-b border-red-500/20 relative overflow-hidden">
        {/* Glow backdrop */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[340px] h-[200px] bg-red-600/15 blur-[80px] pointer-events-none rounded-full" />

        <div className="relative z-10 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/15 border border-red-500/40 text-red-300 text-[11px] font-black uppercase tracking-wider mb-3 shadow-md shadow-red-950/40">
            <Flame className="w-3.5 h-3.5 fill-red-400 text-red-400 animate-pulse" />
            <span>{t("hero.badge")}</span>
          </div>

          {/* Headline */}
          <h1 className="text-2xl font-black tracking-tight leading-tight uppercase mb-2">
            {t("hero.title")}{" "}
            <span className="bg-gradient-to-r from-red-400 via-rose-300 to-amber-400 bg-clip-text text-transparent">
              {t("hero.titleHighlight")}
            </span>
          </h1>

          {/* Punchy Subtitle */}
          <p className="text-xs text-slate-300 mb-4 px-2 leading-relaxed">
            {t("hero.desc")}
          </p>

          {/* Primary Action Buttons (Stacked, High-impact Gaming Buttons) */}
          <div className="flex flex-col gap-2.5 mb-4">
            <a
              href={TELEGRAM_BUY_BOT}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full min-h-[48px] flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-red-600 via-rose-600 to-red-700 active:scale-98 text-white font-black text-sm uppercase tracking-wider shadow-lg shadow-red-600/40 border border-red-400/40 transition-transform"
            >
              <Send className="w-4 h-4 fill-white" />
              <span>{t("hero.btnBuy")}</span>
            </a>

            <button
              onClick={() => setIsDownloadModalOpen(true)}
              className="w-full min-h-[46px] flex items-center justify-center gap-2 px-5 py-2.5 rounded-2xl bg-amber-500/15 hover:bg-amber-500/25 active:scale-98 text-amber-300 font-extrabold text-xs uppercase tracking-wide border border-amber-500/40 shadow-md shadow-amber-950/30 transition-transform"
            >
              <Download className="w-4 h-4 text-amber-400" />
              <span>{t("hero.btnDownload")} (PC / Android / iOS)</span>
            </button>
          </div>

          {/* Trust Guarantee Chips */}
          <div className="flex flex-wrap items-center justify-center gap-3 text-[11px] text-slate-400 border-t border-red-500/15 pt-3">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-slate-300 font-semibold">{t("hero.trust1")}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Key className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-amber-300 font-bold">1 Key Dùng Chung PC & Android</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Crown className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-amber-300 font-bold">{t("hero.trust3")}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ===== TELEGRAM LIVE ANNOUNCEMENTS ===== */}
      <TelegramAnnouncementSection />

      {/* ===== STICKY APP TABS BAR (TELEGRAM WEBAPP STYLE) ===== */}
      <div className="sticky top-[56px] z-30 px-3 py-2 bg-[#0c0508]/95 backdrop-blur-xl border-y border-red-500/25 shadow-xl">
        <div className="grid grid-cols-4 gap-1 p-1 rounded-2xl bg-black/60 border border-red-500/20">
          <button
            onClick={() => setActiveTab("pricing")}
            className={`py-2 px-1 text-center rounded-xl text-xs font-black transition-all flex flex-col items-center justify-center gap-0.5 ${
              activeTab === "pricing"
                ? "bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-md shadow-red-600/40"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Tag className="w-3.5 h-3.5" />
            <span className="truncate">{t("nav.pricing")}</span>
          </button>

          <button
            onClick={() => setActiveTab("features")}
            className={`py-2 px-1 text-center rounded-xl text-xs font-black transition-all flex flex-col items-center justify-center gap-0.5 ${
              activeTab === "features"
                ? "bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-md shadow-red-600/40"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span className="truncate">{t("features.badge")}</span>
          </button>

          <button
            onClick={() => setActiveTab("guide")}
            className={`py-2 px-1 text-center rounded-xl text-xs font-black transition-all flex flex-col items-center justify-center gap-0.5 ${
              activeTab === "guide"
                ? "bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-md shadow-red-600/40"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span className="truncate">{t("nav.guide")}</span>
          </button>

          <button
            onClick={() => setActiveTab("faq")}
            className={`py-2 px-1 text-center rounded-xl text-xs font-black transition-all flex flex-col items-center justify-center gap-0.5 ${
              activeTab === "faq"
                ? "bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-md shadow-red-600/40"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span className="truncate">FAQ</span>
          </button>
        </div>
      </div>

      {/* ===== TAB CONTENT AREA ===== */}
      <div className="px-4 pt-5">
        {/* --- TAB 1: PRICING (FULL-WIDTH GAMING CARDS) --- */}
        {activeTab === "pricing" && (
          <div className="space-y-4">
            {/* Team Murphy Official Reseller Alert */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-red-950/70 via-[#1f0a10] to-amber-950/50 border border-amber-500/40 shadow-lg shadow-red-950/30">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center shrink-0 text-amber-400">
                  <Crown className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <h4 className="text-xs font-black text-amber-300 uppercase tracking-wide">
                    {t("pricing.selectResellerNote")}
                  </h4>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    {t("pricing.resellerAlertBody")}
                  </p>
                </div>
              </div>
            </div>

            {/* KEY POLICY CALLOUT */}
            <div className="p-3.5 rounded-2xl bg-gradient-to-r from-amber-950/40 via-[#18080d] to-red-950/40 border border-amber-500/35 flex items-start gap-3 text-xs shadow-md">
              <div className="w-7 h-7 rounded-lg bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                <Key className="w-3.5 h-3.5 text-amber-400" />
              </div>
              <div className="text-slate-300 leading-relaxed">
                <strong className="text-amber-300 font-extrabold uppercase">1 Key dùng chung PC & Android:</strong> Kích hoạt được cho cả <strong className="text-white">PC và Android</strong>. Tại cùng 1 thời điểm chỉ chạy trên <strong className="text-amber-300">1 thiết bị duy nhất</strong>.
              </div>
            </div>

            {/* Currency Switcher */}
            <div className="flex items-center justify-between bg-[#15070c] p-2 rounded-2xl border border-red-500/20">
              <span className="text-xs font-bold text-slate-300 ml-2">Đơn vị tiền tệ:</span>
              <div className="inline-flex p-1 rounded-xl bg-black/50 border border-red-500/30 gap-1">
                <button
                  onClick={() => setCurrency("USD")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    currency === "USD"
                      ? "bg-gradient-to-r from-red-600 to-rose-600 text-white shadow"
                      : "text-slate-400"
                  }`}
                >
                  USD ($)
                </button>
                <button
                  onClick={() => setCurrency("VND")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    currency === "VND"
                      ? "bg-gradient-to-r from-red-600 to-rose-600 text-white shadow"
                      : "text-slate-400"
                  }`}
                >
                  VND (₫)
                </button>
              </div>
            </div>

            {/* Full-width Pricing Cards List */}
            <div className="space-y-3.5">
              {plans.map((p) => {
                const loc = getLocalizedPlan(p);
                const formattedPrice =
                  currency === "VND"
                    ? `${p.price.toLocaleString("vi-VN")}₫`
                    : `$${p.price}`;

                return (
                  <div
                    key={p.id}
                    className={`rounded-2xl p-4 sm:p-5 flex flex-col justify-between transition-all border ${
                      p.isPopular
                        ? "bg-gradient-to-b from-red-950/60 via-[#18080d] to-[#120508] border-2 border-red-500 shadow-xl shadow-red-950/60"
                        : p.isSale
                        ? "bg-gradient-to-b from-amber-950/50 via-[#18080d] to-[#120508] border-2 border-amber-500/60 shadow-lg shadow-amber-950/40"
                        : "bg-[#14060a]/90 border-red-500/25 shadow-md"
                    }`}
                  >
                    {/* Badge */}
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-black uppercase text-slate-400 tracking-wider">
                        {loc.duration}
                      </span>
                      {p.isPopular && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-gradient-to-r from-red-600 to-rose-600 text-white shadow">
                          <Flame className="w-2.5 h-2.5" /> {t("pricing.popular")}
                        </span>
                      )}
                      {p.isSale && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black shadow">
                          <Sparkles className="w-2.5 h-2.5" /> {t("pricing.bestValue")}
                        </span>
                      )}
                      {p.badge && !p.isPopular && !p.isSale && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-red-500/20 text-red-300 border border-red-500/30">
                          {p.badge}
                        </span>
                      )}
                    </div>

                    {/* Plan Name & Price */}
                    <div className="flex items-baseline justify-between mb-3">
                      <h3 className="text-base font-black text-white">{loc.name}</h3>
                      <div className="text-right">
                        <span className={`text-2xl font-black ${p.isSale ? "text-amber-400" : "text-white"}`}>
                          {formattedPrice}
                        </span>
                      </div>
                    </div>

                    {/* Features list */}
                    <ul className="space-y-1.5 text-xs text-slate-300 py-3 border-t border-red-500/15 mb-3">
                      {loc.features.map((f, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-red-400 shrink-0" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Buy Button */}
                    <a
                      href={TELEGRAM_BUY_BOT}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-full min-h-[44px] flex items-center justify-center gap-2 py-2.5 rounded-xl font-black text-xs uppercase tracking-wider transition-all shadow-md ${
                        p.isPopular
                          ? "bg-gradient-to-r from-red-600 via-rose-600 to-red-700 text-white shadow-red-600/40"
                          : p.isSale
                          ? "bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 shadow-amber-500/30"
                          : "bg-red-500/20 hover:bg-red-500/30 text-white border border-red-500/40"
                      }`}
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>{t("pricing.btnBuyNow")}</span>
                    </a>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* --- TAB 2: FEATURES (FULL-WIDTH GAME CARDS) --- */}
        {activeTab === "features" && (
          <div className="space-y-3">
            <div className="text-center mb-4">
              <h2 className="text-lg font-black text-white uppercase tracking-wide">
                {t("features.title")}
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                {t("features.desc")}
              </p>
            </div>

            {/* Featured Long Overview Video (Clip dài giới thiệu tính năng) */}
            <div className="p-3 rounded-2xl bg-[#14060a]/95 border-2 border-red-500/35 shadow-xl shadow-red-950/60 mb-3">
              <div className="flex items-center justify-between mb-2 px-1">
                <span className="text-xs font-black text-white uppercase flex items-center gap-1.5">
                  <Play className="w-3.5 h-3.5 fill-red-400 text-red-400" />
                  {t("about.videoTitle")}
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-red-500/20 text-red-300 font-bold border border-red-500/30">
                  {t("about.videoBadge")}
                </span>
              </div>
              <HoverVideoPreview
                youtubeId="xusYAIiSwxg"
                title={t("about.videoTitle")}
              />
            </div>

            {featureList.map((f, i) => (
              <div
                key={i}
                className="p-4 rounded-2xl bg-[#14060a]/90 border border-red-500/25 shadow-lg flex items-start gap-3.5"
              >
                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center border shrink-0 shadow-inner ${f.accent}`}
                >
                  <f.icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-black text-white mb-1 leading-snug">
                    {f.title}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {f.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* --- TAB 3: GUIDE (COMPACT SUMMARY + LINK TO /guide) --- */}
        {activeTab === "guide" && (
          <div className="space-y-4">
            {/* Multi-Platform Download Box */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-950/50 via-[#16070c] to-red-950/40 border border-amber-500/40 shadow-xl space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-black text-white flex items-center gap-1.5">
                    <span>Tải Monica Bot v2309</span>
                    <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      Mới Nhất
                    </span>
                  </h3>
                  <p className="text-[11px] text-slate-300 mt-0.5">Chọn phiên bản phù hợp với thiết bị của bạn:</p>
                </div>
              </div>

              {/* Download Buttons Stack */}
              <div className="space-y-2">
                {/* PC */}
                <a
                  href="/downloads/Setup_Monica.rar"
                  download="Setup_Monica.rar"
                  className="w-full min-h-[42px] flex items-center justify-between px-3.5 py-2 rounded-xl bg-red-600/25 hover:bg-red-600/35 border border-red-500/40 text-white font-bold text-xs shadow"
                >
                  <div className="flex items-center gap-2">
                    <Monitor className="w-4 h-4 text-red-400" />
                    <span>Bản PC Windows</span>
                  </div>
                  <span className="text-[11px] text-red-300 flex items-center gap-1">
                    <Download className="w-3.5 h-3.5" /> 48MB
                  </span>
                </a>

                {/* Android */}
                <a
                  href="/downloads/Monica_Android_2309.apk"
                  download="Monica_Android_2309.apk"
                  className="w-full min-h-[42px] flex items-center justify-between px-3.5 py-2 rounded-xl bg-emerald-600/25 hover:bg-emerald-600/35 border border-emerald-500/40 text-white font-bold text-xs shadow"
                >
                  <div className="flex items-center gap-2">
                    <Smartphone className="w-4 h-4 text-emerald-400" />
                    <span>Bản Mobile Android</span>
                  </div>
                  <span className="text-[11px] text-emerald-300 flex items-center gap-1">
                    <Download className="w-3.5 h-3.5" /> APK
                  </span>
                </a>

                {/* iOS */}
                <a
                  href={TELEGRAM_SUPPORT_GROUP}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full min-h-[42px] flex items-center justify-between px-3.5 py-2 rounded-xl bg-sky-600/20 hover:bg-sky-600/30 border border-sky-500/40 text-white font-bold text-xs shadow"
                >
                  <div className="flex items-center gap-2">
                    <Apple className="w-4 h-4 text-sky-400" />
                    <span>Bản Mobile iOS</span>
                  </div>
                  <span className="text-[11px] text-sky-300 flex items-center gap-1">
                    <Send className="w-3.5 h-3.5" /> Hỗ trợ
                  </span>
                </a>
              </div>

              {/* Key Policy Banner */}
              <div className="p-2.5 rounded-xl bg-black/40 border border-amber-500/30 text-[11px] text-amber-200/90 flex items-center gap-2">
                <Key className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>1 Key dùng chung PC & Android.</span>
              </div>
            </div>

            {/* Quick 4-Step Checklist */}
            <div className="p-4 rounded-2xl bg-[#14060a]/90 border border-red-500/25 shadow-lg">
              <h4 className="text-xs font-black uppercase text-red-300 tracking-wider mb-3 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Quy trình 4 bước cài đặt nhanh:</span>
              </h4>

              <div className="space-y-2.5 text-xs text-slate-300">
                <div className="flex items-start gap-2.5 p-2 rounded-xl bg-black/40 border border-red-500/15">
                  <span className="w-5 h-5 rounded-md bg-red-600 text-white font-black text-[11px] flex items-center justify-center shrink-0">
                    1
                  </span>
                  <div>
                    <strong className="text-white block font-bold">{t("step1.title")}</strong>
                    <span className="text-[11px] text-slate-400">{t("step1.desc")}</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-2 rounded-xl bg-black/40 border border-red-500/15">
                  <span className="w-5 h-5 rounded-md bg-amber-500 text-slate-950 font-black text-[11px] flex items-center justify-center shrink-0">
                    2
                  </span>
                  <div>
                    <strong className="text-white block font-bold">{t("step2.title")}</strong>
                    <span className="text-[11px] text-amber-300/90 font-medium">{t("step2.hl")}</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-2 rounded-xl bg-black/40 border border-red-500/15">
                  <span className="w-5 h-5 rounded-md bg-red-600 text-white font-black text-[11px] flex items-center justify-center shrink-0">
                    3
                  </span>
                  <div>
                    <strong className="text-white block font-bold">{t("step3.title")}</strong>
                    <span className="text-[11px] text-slate-400">{t("step3.desc")}</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-2 rounded-xl bg-black/40 border border-red-500/15">
                  <span className="w-5 h-5 rounded-md bg-emerald-500 text-slate-950 font-black text-[11px] flex items-center justify-center shrink-0">
                    4
                  </span>
                  <div>
                    <strong className="text-white block font-bold">{t("step4.title")}</strong>
                    <span className="text-[11px] text-amber-300 font-bold">{t("step4.hl")}</span>
                  </div>
                </div>
              </div>

              {/* Big CTA to full /guide page */}
              <div className="mt-4 pt-3 border-t border-red-500/15 flex flex-col gap-2">
                <Link
                  href="/guide"
                  className="w-full min-h-[44px] flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 text-white font-black text-xs uppercase tracking-wider shadow-md shadow-red-600/30"
                >
                  <span>Xem hướng dẫn chi tiết có ảnh ➔</span>
                </Link>

                <a
                  href={TELEGRAM_SUPPORT_GROUP}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full min-h-[40px] flex items-center justify-center gap-1.5 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-bold text-slate-300 hover:text-white"
                >
                  <Send className="w-3.5 h-3.5 text-amber-400" />
                  <span>{t("guide.supportHelp")}</span>
                </a>
              </div>
            </div>
          </div>
        )}

        {/* --- TAB 4: FAQ (CLEAN ACCORDION) --- */}
        {activeTab === "faq" && (
          <div className="space-y-2.5">
            <div className="text-center mb-3">
              <h2 className="text-lg font-black text-white uppercase tracking-wide">
                {t("faq.title")}
              </h2>
              <p className="text-xs text-slate-400">
                {t("faq.desc")}
              </p>
            </div>

            {faqs.map((f, i) => {
              const isOpen = openFaq === i;
              return (
                <div
                  key={i}
                  className="rounded-2xl border border-red-500/25 bg-[#14060a]/90 overflow-hidden shadow-md"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    className="w-full p-3.5 text-left flex items-center justify-between gap-3 text-xs sm:text-sm font-bold text-white hover:text-red-300 transition-colors"
                  >
                    <span>{f.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-red-400 shrink-0 transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-3.5 pb-3.5 text-xs text-slate-300 border-t border-red-500/15 pt-2.5 leading-relaxed bg-black/20">
                      {f.a}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Need more help */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-red-950/40 via-[#18070d] to-amber-950/30 border border-red-500/30 text-center mt-4">
              <p className="text-xs text-slate-300 mb-2.5">
                Vẫn còn câu hỏi thắc mắc chưa được giải đáp?
              </p>
              <a
                href={TELEGRAM_SUPPORT_GROUP}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-red-600 text-white font-bold text-xs uppercase tracking-wider shadow"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Chat ngay với Admin Team Murphy</span>
              </a>
            </div>
          </div>
        )}
      </div>

      <DownloadModal
        isOpen={isDownloadModalOpen}
        onClose={() => setIsDownloadModalOpen(false)}
      />
    </div>
  );
}
