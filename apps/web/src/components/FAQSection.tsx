"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle, Shield, AlertTriangle, Flame } from "lucide-react";
import { TELEGRAM_SUPPORT_GROUP } from "@/lib/telegram";
import { useI18n } from "@/lib/i18n";

export default function FAQSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const { t } = useI18n();

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
    <section id="faq" className="py-8 sm:py-20 bg-[#0a0406]/70 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-5 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-500/15 border border-red-500/30 text-red-300 text-[11px] sm:text-xs font-bold uppercase tracking-wider mb-2.5">
            <Flame className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-red-400 text-red-400" />
            <span>{t("faq.badge")}</span>
          </div>
          <h2 className="text-xl sm:text-3xl md:text-4xl font-black tracking-tight text-white mb-2 sm:mb-3">
            {t("faq.title")}
          </h2>
          <p className="text-xs sm:text-base text-red-100/70">
            {t("faq.desc")}
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-3.5 mb-10">
          {faqs.map((faq, i) => {
            const isOpen = openIdx === i;
            return (
              <div
                key={i}
                className={`rounded-2xl transition-all border overflow-hidden ${
                  isOpen
                    ? "bg-[#18080d]/90 border-red-500/40 shadow-xl shadow-red-950/40"
                    : "bg-[#120508]/70 border-red-500/20 hover:border-red-500/35"
                }`}
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : i)}
                  className="w-full min-h-[48px] p-5 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-white"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-red-400 font-mono text-xs font-extrabold px-2 py-0.5 rounded bg-red-500/15">
                      0{i + 1}
                    </span>
                    <span>{faq.q}</span>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 flex-shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-red-400" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-red-500/10">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Telegram Support CTA */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-red-950/40 via-[#16080d] to-amber-950/30 border border-red-500/30 text-center flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <h4 className="text-base font-black text-white">
              {t("faq.supportBanner")}
            </h4>
            <p className="text-xs text-slate-400 mt-1">
              {t("faq.supportDesc")}
            </p>
          </div>
          <a
            href={TELEGRAM_SUPPORT_GROUP}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-red-600/30 whitespace-nowrap active:scale-95 transition-all min-h-[44px] flex items-center justify-center"
          >
            {t("faq.btnJoinGroup")}
          </a>
        </div>
      </div>
    </section>
  );
}
