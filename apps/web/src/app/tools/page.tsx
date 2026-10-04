"use client";

import Link from "next/link";
import { Skull, Zap, Server, BarChart3, ArrowRight, Sparkles, Send } from "lucide-react";
import bossData from "@/data/restricted-area.json";
import heroExpData from "@/data/hero-exp.json";
import serverData from "@/data/servers.json";
import { TELEGRAM_BUY_BOT } from "@/lib/telegram";
import { useI18n } from "@/lib/i18n";

export default function ToolsPage() {
  const { t } = useI18n();

  const boss = bossData as Record<string, { stage: number; power: number }[]>;
  const RA_STAGES = Object.values(boss).reduce((sum, s) => sum + s.length, 0);
  const HERO_MAX = heroExpData.length - 1;
  const SERVER_COUNT = (serverData as unknown[]).length;

  const tools = [
    {
      icon: Skull,
      label: t("tools.bossTitle"),
      desc: `${t("tools.bossDescFull")} (${RA_STAGES} stages)`,
      href: "/tools/calculators",
      color: "text-orange-400",
      bgColor: "bg-orange-500/10",
    },
    {
      icon: Zap,
      label: t("tools.heroTitle"),
      desc: `${t("tools.heroDescFull")} (Lv.${HERO_MAX})`,
      href: "/tools/calculators",
      color: "text-yellow-400",
      bgColor: "bg-yellow-500/10",
    },
    {
      icon: Server,
      label: t("tools.clanTitle"),
      desc: `${t("tools.clanDescFull")} (${SERVER_COUNT.toLocaleString()})`,
      href: "/tools/clan-finder",
      color: "text-pink-400",
      bgColor: "bg-pink-500/10",
    },
    {
      icon: BarChart3,
      label: t("tools.clanTitle"),
      desc: t("tools.statsDescFull"),
      href: "/tools/server-stats",
      color: "text-purple-400",
      bgColor: "bg-purple-500/10",
    },
  ];

  return (
    <div className="min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full overflow-x-hidden">
      {/* Promotion Banner for Monica Bot */}
      <div className="mb-8 p-6 rounded-3xl bg-gradient-to-r from-amber-500/20 via-orange-500/15 to-slate-900 border border-amber-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[11px] font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t("tools.bannerBadge")}</span>
          </div>
          <h2 className="text-lg sm:text-xl font-black text-white">
            {t("tools.bannerTitle")}
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
            {t("tools.bannerDesc")}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/pricing"
            className="min-h-[44px] flex items-center justify-center px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase whitespace-nowrap transition-all shadow-md active:scale-95"
          >
            {t("tools.bannerBtnPricing")}
          </Link>
          <a
            href={TELEGRAM_BUY_BOT}
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-[44px] min-w-[44px] flex items-center justify-center p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors active:scale-95"
            title="Telegram Bot"
          >
            <Send className="w-4 h-4" />
          </a>
        </div>
      </div>

      <h1 className="text-2xl sm:text-3xl font-black mb-1 text-white">
        {t("tools.freeToolsTitle")}
      </h1>
      <p className="text-slate-400 text-sm sm:text-base mb-6">
        {t("tools.freeToolsDesc")}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {tools.map((tool, idx) => (
          <Link key={idx} href={tool.href} className="block">
            <div className="relative p-5 rounded-2xl bg-slate-900/60 border border-white/5 hover:border-amber-500/30 hover:bg-slate-900/90 transition-all">
              <div className="flex items-center gap-4">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center ${tool.bgColor}`}
                >
                  <tool.icon className={`w-6 h-6 ${tool.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-base font-bold text-white group-hover:text-amber-400">
                    {tool.label}
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5 line-clamp-2">
                    {tool.desc}
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-500 flex-shrink-0" />
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-8 text-center text-xs text-slate-500">
        {t("tools.disclaimer")}
      </div>
    </div>
  );
}
