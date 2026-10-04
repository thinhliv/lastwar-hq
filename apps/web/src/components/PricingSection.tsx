"use client";

import { useState, useEffect } from "react";
import { Check, Flame, Send, Sparkles, ShieldAlert, Clock, QrCode, Coins, Crown } from "lucide-react";
import { VND_PLANS, USD_PLANS } from "@/data/plans";
import { TELEGRAM_BUY_BOT } from "@/lib/telegram";
import { useI18n } from "@/lib/i18n";

export default function PricingSection({ compact = false }: { compact?: boolean }) {
  const { t, locale } = useI18n();
  const [currency, setCurrency] = useState<"VND" | "USD">("USD");

  // Automatically select VND for Vietnam visitors, USD for international
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

  return (
    <section id="pricing" className="py-8 sm:py-20 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-red-600/10 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-500/15 border border-red-500/30 text-red-300 text-[11px] sm:text-xs font-bold uppercase tracking-wider mb-2.5">
            <Flame className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-red-400 text-red-400" />
            <span>{t("pricing.badge")}</span>
          </div>
          <h2 className="text-xl sm:text-3xl md:text-4xl font-black tracking-tight text-white mb-2 sm:mb-3">
            {t("pricing.title")}
          </h2>
          <p className="text-xs sm:text-base text-red-100/70">
            {t("pricing.desc")}
          </p>

          {/* Currency Toggle */}
          <div className="mt-4 sm:mt-6 inline-flex p-1 rounded-2xl bg-[#14080c] border border-red-500/30 shadow-inner gap-1">
            <button
              onClick={() => setCurrency("USD")}
              className={`flex items-center justify-center gap-1.5 px-4 sm:px-5 py-2 sm:py-2.5 min-h-[40px] sm:min-h-[44px] rounded-xl text-xs sm:text-sm font-bold transition-all ${
                currency === "USD"
                  ? "bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-md shadow-red-600/30"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <span>🌍 International (USD)</span>
            </button>
            <button
              onClick={() => setCurrency("VND")}
              className={`flex items-center justify-center gap-1.5 px-4 sm:px-5 py-2 sm:py-2.5 min-h-[40px] sm:min-h-[44px] rounded-xl text-xs sm:text-sm font-bold transition-all ${
                currency === "VND"
                  ? "bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-md shadow-red-600/30"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <span>🇻🇳 Việt Nam (VND)</span>
            </button>
          </div>
        </div>

        {/* IMPORTANT TEAM MURPHY NOTICE */}
        <div className="mb-6 sm:mb-10 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-red-950/60 via-[#1e0a10] to-red-950/60 border border-red-500/40 backdrop-blur-md shadow-xl shadow-red-950/30">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
            <div className="flex items-start gap-3 sm:gap-3.5">
              <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-red-600/25 border border-red-500/50 flex items-center justify-center flex-shrink-0 text-amber-400 font-black shadow-inner">
                <Crown className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400" />
              </div>
              <div>
                <h4 className="text-xs sm:text-base font-black text-amber-300 uppercase tracking-wide">
                  {t("pricing.selectResellerNote")}
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 mt-0.5 sm:mt-1 leading-relaxed">
                  {t("pricing.resellerAlertBody")}
                </p>
              </div>
            </div>
            <a
              href="#guide"
              className="px-3.5 py-2 sm:px-4 sm:py-2.5 min-h-[36px] sm:min-h-[40px] flex items-center justify-center rounded-xl bg-red-500/20 hover:bg-red-500/30 border border-red-500/40 text-xs font-bold text-red-200 whitespace-nowrap transition-colors self-end sm:self-auto"
            >
              {t("nav.guide")}
            </a>
          </div>
        </div>

        {/* Payment info bar */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 mb-8">
          {currency === "VND" ? (
            <>
              <div className="p-4 rounded-xl bg-[#16080c]/80 border border-red-500/20 flex items-center gap-3">
                <QrCode className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                <div className="text-xs sm:text-sm">
                  <span className="font-bold text-white">{t("pricing.vndPayTitle")}</span>
                  <span className="text-slate-300 ml-1">{t("pricing.vndPayDesc")}</span>
                </div>
              </div>
              <div className="p-4 rounded-xl bg-[#16080c]/80 border border-amber-500/30 flex items-center gap-3">
                <ShieldAlert className="w-5 h-5 text-amber-400 flex-shrink-0" />
                <div className="text-xs sm:text-sm">
                  <span className="font-bold text-amber-300">{t("pricing.vndRegionTitle")}</span>
                  <span className="text-slate-300 ml-1">{t("pricing.vndRegionDesc")}</span>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="p-4 rounded-xl bg-[#16080c]/80 border border-red-500/20 flex items-center gap-3">
                <Coins className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                <div className="text-xs sm:text-sm">
                  <span className="font-bold text-white">{t("pricing.cryptoTitle")}</span>
                  <span className="text-slate-300 ml-1">{t("pricing.cryptoDesc")}</span>
                </div>
              </div>
              <div className="p-4 rounded-xl bg-[#16080c]/80 border border-amber-500/30 flex items-center gap-3">
                <Clock className="w-5 h-5 text-amber-400 flex-shrink-0" />
                <div className="text-xs sm:text-sm">
                  <span className="font-bold text-white">{t("pricing.exactNoticeTitle")}</span>
                  <span className="text-slate-300 ml-1">{t("pricing.exactNoticeDesc")}</span>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Mobile Swipe Hint */}
        <div className="sm:hidden flex items-center justify-center gap-1.5 text-[11px] text-amber-400 font-bold mb-3">
          <span>👈 Vuốt ngang để chọn gói cước / Swipe for plans 👉</span>
        </div>

        {/* Pricing Cards Track (Horizontal swipe on mobile, grid on sm+) */}
        <div className="flex overflow-x-auto snap-x snap-mandatory scrollbar-none gap-3.5 pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-6">
          {plans.map((p) => {
            const loc = getLocalizedPlan(p);
            const formattedPrice =
              currency === "VND"
                ? `${p.price.toLocaleString("vi-VN")}đ`
                : `$${p.price}`;
            const formattedOrigPrice = p.originalPrice
              ? currency === "VND"
                ? `${p.originalPrice.toLocaleString("vi-VN")}đ`
                : `$${p.originalPrice}`
              : null;

            return (
              <div
                key={p.id}
                className={`w-[82vw] max-w-[310px] shrink-0 snap-center sm:w-auto relative rounded-3xl p-5 sm:p-7 flex flex-col justify-between transition-all duration-300 ${
                  p.isPopular
                    ? "bg-gradient-to-b from-red-950/50 via-[#18080d] to-[#120508] border-2 border-red-500 shadow-2xl shadow-red-950/60 scale-[1.01]"
                    : p.isSale
                    ? "bg-gradient-to-b from-amber-950/40 via-[#18080d] to-[#120508] border-2 border-amber-500/60 shadow-xl shadow-amber-950/40"
                    : "bg-[#15080c]/85 hover:bg-[#1c0a10] border border-red-500/20 hover:border-red-500/40 shadow-lg"
                }`}
              >
                {/* Badges */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
                    {loc.duration}
                  </span>
                  {p.isPopular && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-red-600 to-rose-600 text-white text-[11px] font-black uppercase shadow-md shadow-red-600/30">
                      <Flame className="w-3 h-3 fill-current" /> {t("pricing.popular")}
                    </span>
                  )}
                  {p.badge && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-[11px] font-black">
                      {p.badge}
                    </span>
                  )}
                </div>

                {/* Title & Price */}
                <div className="mb-5 sm:mb-6">
                  <h3 className="text-base sm:text-lg font-black text-white mb-1.5 sm:mb-2">{loc.name}</h3>
                  <div className="flex items-baseline gap-2">
                    <span className={`text-2xl sm:text-3xl font-black ${p.isSale ? "text-amber-400" : "text-white"}`}>
                      {formattedPrice}
                    </span>
                    {formattedOrigPrice && (
                      <span className="text-xs sm:text-sm text-slate-500 line-through">
                        {formattedOrigPrice}
                      </span>
                    )}
                  </div>
                </div>

                {/* Features List */}
                <div className="mb-5 sm:mb-6 pt-4 sm:pt-5 border-t border-red-500/15">
                  <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
                    {loc.features.map((f, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-red-400 flex-shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Button */}
                <a
                  href={TELEGRAM_BUY_BOT}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full min-h-[44px] flex items-center justify-center gap-2 py-3 px-4 rounded-2xl font-black text-xs uppercase tracking-wider transition-all hover:scale-102 active:scale-98 ${
                    p.isPopular
                      ? "bg-gradient-to-r from-red-600 via-rose-600 to-red-700 text-white shadow-xl shadow-red-600/35 border border-red-400/40"
                      : p.isSale
                      ? "bg-gradient-to-r from-amber-500 to-orange-600 text-slate-950 shadow-xl shadow-amber-500/25 border border-amber-400/40"
                      : "bg-red-950/40 hover:bg-red-900/50 text-white border border-red-500/30"
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
    </section>
  );
}
