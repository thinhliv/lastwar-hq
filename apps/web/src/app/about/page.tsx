"use client";

import Link from "next/link";
import { ShieldCheck, Database, Server, Skull, Zap, ExternalLink, Send, Users2, ShieldAlert, Play, Flame } from "lucide-react";
import serverData from "@/data/servers.json";
import bossData from "@/data/restricted-area.json";
import heroExpData from "@/data/hero-exp.json";
import { TELEGRAM_BUY_BOT, TELEGRAM_SUPPORT_GROUP } from "@/lib/telegram";
import { useI18n } from "@/lib/i18n";
import HoverVideoPreview from "@/components/HoverVideoPreview";

export default function AboutPage() {
  const { t } = useI18n();

  const servers = serverData as { server: string; lastUpdate: string }[];
  const boss = bossData as Record<string, unknown[]>;
  const SERVER_COUNT = servers.length;
  const LAST_UPDATE = servers.map((s) => s.lastUpdate).sort().at(-1);
  const RA_STAGES = Object.values(boss).reduce((n, s) => n + s.length, 0);
  const HERO_MAX = heroExpData.length - 1;

  const sources = [
    {
      icon: Skull,
      color: "text-orange-400",
      name: t("tools.bossTitle"),
      detail: `${RA_STAGES} stages`,
      origin: "cpt-hedge.com",
    },
    {
      icon: Zap,
      color: "text-yellow-400",
      name: t("tools.heroTitle"),
      detail: `Lv.${HERO_MAX}`,
      origin: "cpt-hedge.com",
    },
    {
      icon: Server,
      color: "text-pink-400",
      name: t("tools.clanTitle"),
      detail: `${SERVER_COUNT.toLocaleString()} servers${LAST_UPDATE ? ` (${LAST_UPDATE})` : ""}`,
      origin: "coordinateslist.com",
    },
  ];

  return (
    <div className="min-h-screen max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full overflow-x-hidden">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-500/15 border border-red-500/30 text-red-300 text-xs font-bold uppercase tracking-wider mb-3">
          <Flame className="w-3.5 h-3.5 fill-red-400 text-red-400" />
          <span>{t("about.videoBadge")}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-2">
          {t("about.pageTitle")}
        </h1>
        <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto">
          {t("about.pageDesc")}
        </p>
      </div>

      {/* Featured Overview Video (Mục Giới Thiệu Tính Năng) */}
      <div className="mb-10 p-4 sm:p-6 rounded-3xl bg-[#14060a]/95 border-2 border-red-500/40 shadow-2xl shadow-red-950/80">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-red-600 to-rose-600 text-white flex items-center justify-center shadow-lg shadow-red-600/30 shrink-0">
              <Play className="w-5 h-5 fill-white ml-0.5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black text-white uppercase tracking-wide">
                {t("about.videoTitle")}
              </h2>
              <p className="text-xs text-slate-300">
                {t("about.videoDesc")}
              </p>
            </div>
          </div>
          <span className="px-3 py-1 rounded-full bg-red-500/20 text-red-300 text-[11px] font-black uppercase tracking-wider border border-red-500/40">
            🎬 {t("about.videoBadge")}
          </span>
        </div>

        <HoverVideoPreview
          youtubeId="xusYAIiSwxg"
          title={t("about.videoTitle")}
        />
      </div>

      {/* Team Murphy Reseller Profile */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#15080c]/85 border border-red-500/30 mb-8 shadow-xl shadow-red-950/40">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-red-500/20 text-red-400 flex items-center justify-center font-bold border border-red-500/30">
            <Users2 className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">{t("about.profileTitle")}</h2>
            <p className="text-xs text-amber-400">{t("about.profileSubtitle")}</p>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
          {t("about.profileDesc")}
        </p>

        <div className="p-4 rounded-2xl bg-red-950/50 border border-red-500/30 text-xs text-red-200">
          <strong className="text-amber-300">{t("about.importantNoticeTitle")}</strong>{" "}
          {t("about.importantNoticeDesc")}
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={TELEGRAM_BUY_BOT}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-600 via-rose-600 to-red-700 hover:from-red-500 hover:to-rose-500 text-white font-black text-xs uppercase shadow-lg shadow-red-600/30 min-h-[44px]"
          >
            <Send className="w-3.5 h-3.5" />
            <span>{t("about.btnOpenBot")}</span>
          </a>
          <a
            href={TELEGRAM_SUPPORT_GROUP}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#200a12] hover:bg-[#2b0e19] text-amber-300 border border-red-500/30 font-bold text-xs min-h-[44px]"
          >
            <span>{t("about.btnJoinGroup")}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Free Tool Data Sources */}
      <div className="mb-8 p-6 rounded-3xl bg-[#120508]/70 border border-red-500/20">
        <h3 className="text-sm font-black text-white uppercase tracking-wider mb-4 flex items-center gap-2">
          <Database className="w-4 h-4 text-red-400" />
          <span>{t("about.dataSourcesTitle")}</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {sources.map((s, idx) => (
            <div key={idx} className="p-3.5 rounded-xl bg-black/40 border border-red-500/15">
              <div className="flex items-center gap-2 mb-1">
                <s.icon className={`w-4 h-4 ${s.color}`} />
                <span className="text-xs font-bold text-white">{s.name}</span>
              </div>
              <p className="text-[11px] text-slate-400">{s.detail}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Disclaimer */}
      <div className="p-4 rounded-2xl bg-black/30 border border-red-500/15 text-[11px] text-slate-400 leading-relaxed">
        <strong className="text-slate-300">{t("about.disclaimerTitle")}</strong>{" "}
        {t("about.disclaimerDesc")}
      </div>
    </div>
  );
}
