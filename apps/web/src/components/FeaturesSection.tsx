"use client";

import {
  Layers,
  Shield,
  Swords,
  Flame,
  Crosshair,
  Crown,
  Globe2,
} from "lucide-react";
import { useI18n } from "@/lib/i18n";

export default function FeaturesSection() {
  const { t } = useI18n();

  const features = [
    {
      icon: Crosshair,
      title: t("f1.title"),
      desc: t("f1.desc"),
      accent: "text-red-400 bg-red-500/10 border-red-500/30",
    },
    {
      icon: Swords,
      title: t("f2.title"),
      desc: t("f2.desc"),
      accent: "text-amber-400 bg-amber-500/10 border-amber-500/30",
    },
    {
      icon: Shield,
      title: t("f3.title"),
      desc: t("f3.desc"),
      accent: "text-rose-400 bg-rose-500/10 border-rose-500/30",
    },
    {
      icon: Layers,
      title: t("f4.title"),
      desc: t("f4.desc"),
      accent: "text-orange-400 bg-orange-500/10 border-orange-500/30",
    },
    {
      icon: Crown,
      title: t("f5.title"),
      desc: t("f5.desc"),
      accent: "text-amber-300 bg-amber-500/15 border-amber-500/40",
    },
    {
      icon: Globe2,
      title: t("f6.title"),
      desc: t("f6.desc"),
      accent: "text-red-300 bg-red-500/10 border-red-500/25",
    },
  ];

  return (
    <section id="features" className="py-14 sm:py-20 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-red-600/10 blur-[130px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-500/15 border border-red-500/30 text-red-300 text-xs font-bold uppercase tracking-wider mb-3">
            <Flame className="w-3.5 h-3.5 fill-red-400 text-red-400" />
            <span>{t("features.badge")}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-white mb-3">
            {t("features.title")}
          </h2>
          <p className="text-sm sm:text-base text-red-100/70">
            {t("features.desc")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <div
              key={i}
              className="p-7 rounded-3xl bg-[#16080c]/80 hover:bg-[#1f0a10]/95 border border-red-500/20 hover:border-red-500/50 transition-all hover:-translate-y-1 duration-300 shadow-xl shadow-black/40 hover:shadow-red-950/40"
            >
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center border mb-5 shadow-inner ${f.accent}`}
              >
                <f.icon className="w-6 h-6" />
              </div>
              <h3 className="text-base font-extrabold text-white mb-2">{f.title}</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
