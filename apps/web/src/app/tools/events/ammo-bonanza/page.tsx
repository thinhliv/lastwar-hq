"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  Zap,
  Target,
  Clock,
  TrendingUp,
  Gift,
  Calculator,
} from "lucide-react";

// ===== AMMO BONANZA DATA =====
const AMMO_TIERS = [
  { level: 1, name: "Stage 1", baseAmmo: 500, time: 5 },
  { level: 2, name: "Stage 2", baseAmmo: 1200, time: 10 },
  { level: 3, name: "Stage 3", baseAmmo: 2500, time: 15 },
  { level: 4, name: "Stage 4", baseAmmo: 4500, time: 20 },
  { level: 5, name: "Stage 5", baseAmmo: 7500, time: 30 },
  { level: 6, name: "Stage 6", baseAmmo: 12000, time: 40 },
  { level: 7, name: "Stage 7", baseAmmo: 18000, time: 50 },
  { level: 8, name: "Stage 8", baseAmmo: 26000, time: 60 },
  { level: 9, name: "Stage 9", baseAmmo: 38000, time: 75 },
  { level: 10, name: "Stage 10", baseAmmo: 55000, time: 90 },
];

function formatNum(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(2) + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(1) + "K";
  return Math.round(n).toLocaleString();
}

function formatTime(min: number): string {
  if (min < 60) return `${min}m`;
  const h = Math.floor(min / 60);
  const m = min % 60;
  return `${h}h ${m}m`;
}

// ===== MAIN COMPONENT =====
export default function AmmoBonanzaPage() {
  const [stagesCompleted, setStagesCompleted] = useState<number[]>([1, 2, 3, 4, 5]);
  const [hasAllianceBuff, setHasAllianceBuff] = useState(true);
  const [hasVIP, setHasVIP] = useState(false);

  const eventMultiplier = (hasAllianceBuff ? 2 : 1) * (hasVIP ? 1.2 : 1) * 2; // x2 base event

  const { totalAmmo, totalTime } = useMemo(() => {
    let ammo = 0;
    let time = 0;
    stagesCompleted.forEach((stage) => {
      const data = AMMO_TIERS.find((t) => t.level === stage);
      if (data) {
        ammo += data.baseAmmo * eventMultiplier;
        time += data.time;
      }
    });
    return { totalAmmo: ammo, totalTime: time };
  }, [stagesCompleted, eventMultiplier]);

  // Optimal stages (best ammo/time ratio)
  const efficiency = AMMO_TIERS.map((t) => ({
    ...t,
    ratio: t.baseAmmo / t.time,
  })).sort((a, b) => b.ratio - a.ratio);

  function toggleStage(level: number) {
    setStagesCompleted((prev) =>
      prev.includes(level) ? prev.filter((s) => s !== level) : [...prev, level]
    );
  }

  return (
    <div className="min-h-screen px-4 py-6">
      <Link href="/tools/events" className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-orange-500 transition-colors mb-3">
        <ChevronLeft className="w-4 h-4" />
        Sự kiện
      </Link>

      <div className="flex items-center gap-2 mb-1">
        <Zap className="w-6 h-6 text-yellow-400" />
        <h1 className="text-2xl font-bold">Ammo Bonanza</h1>
      </div>
      <p className="text-slate-400 text-sm mb-5">
        Tính ammo nhận được và tối ưu chiến lược
      </p>

      {/* Buff Toggles */}
      <div className="p-4 rounded-2xl glass mb-4 space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wide text-slate-300">Buff đang bật</h3>
        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={() => setHasAllianceBuff(!hasAllianceBuff)}
            className={`flex flex-col items-center gap-1 py-2.5 rounded-xl transition-all ${
              hasAllianceBuff ? "bg-green-500/20 border border-green-500/40" : "bg-white/5 border border-white/10"
            }`}
          >
            <span className="text-lg">🛡️</span>
            <span className={`text-[9px] font-medium ${hasAllianceBuff ? "text-green-400" : "text-slate-500"}`}>
              Alliance x2
            </span>
          </button>
          <button
            onClick={() => setHasVIP(!hasVIP)}
            className={`flex flex-col items-center gap-1 py-2.5 rounded-xl transition-all ${
              hasVIP ? "bg-yellow-500/20 border border-yellow-500/40" : "bg-white/5 border border-white/10"
            }`}
          >
            <span className="text-lg">👑</span>
            <span className={`text-[9px] font-medium ${hasVIP ? "text-yellow-400" : "text-slate-500"}`}>
              VIP +20%
            </span>
          </button>
          <div className="flex flex-col items-center gap-1 py-2.5 rounded-xl bg-blue-500/10 border border-blue-500/20">
            <span className="text-lg">🎉</span>
            <span className="text-[9px] font-medium text-blue-400">Event x2</span>
          </div>
        </div>
        <div className="text-center text-[10px] text-slate-500">
          Tổng multiplier: <span className="font-bold text-orange-400">x{eventMultiplier.toFixed(1)}</span>
        </div>
      </div>

      {/* Stage Selector */}
      <div className="p-4 rounded-2xl glass mb-4">
        <h3 className="text-xs font-bold uppercase tracking-wide text-slate-300 mb-3">
          Chọn stage đã hoàn thành
        </h3>
        <div className="grid grid-cols-5 gap-2">
          {AMMO_TIERS.map((stage) => {
            const isSelected = stagesCompleted.includes(stage.level);
            return (
              <button
                key={stage.level}
                onClick={() => toggleStage(stage.level)}
                className={`flex flex-col items-center gap-0.5 py-2 rounded-lg transition-all ${
                  isSelected
                    ? "bg-yellow-500/20 border border-yellow-500/40 text-yellow-400"
                    : "bg-white/5 border border-white/10 text-slate-500"
                }`}
              >
                <span className="text-sm font-bold">{stage.level}</span>
                <span className="text-[8px]">{formatNum(stage.baseAmmo)}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Result */}
      <div className="p-5 rounded-2xl bg-gradient-to-br from-yellow-500/10 to-orange-500/5 border border-yellow-500/20 mb-4">
        <div className="flex items-center gap-2 mb-3">
          <Target className="w-4 h-4 text-yellow-400" />
          <span className="text-xs font-medium uppercase tracking-wide text-yellow-400">
            Tổng ammo nhận được
          </span>
        </div>
        <div className="text-4xl font-black text-yellow-400 mb-3">{formatNum(totalAmmo)}</div>
        <div className="grid grid-cols-2 gap-3">
          <div className="p-2.5 rounded-xl bg-white/5">
            <p className="text-[10px] text-slate-500 uppercase">Số màn</p>
            <p className="text-lg font-bold">{stagesCompleted.length}/10</p>
          </div>
          <div className="p-2.5 rounded-xl bg-white/5">
            <p className="text-[10px] text-slate-500 uppercase flex items-center gap-1"><Clock className="w-3 h-3" /> Thời gian</p>
            <p className="text-lg font-bold">{formatTime(totalTime)}</p>
          </div>
        </div>
      </div>

      {/* Efficiency Ranking */}
      <div className="p-4 rounded-2xl glass mb-4">
        <div className="flex items-center gap-2 mb-3">
          <TrendingUp className="w-4 h-4 text-green-400" />
          <h3 className="text-xs font-bold uppercase tracking-wide text-slate-300">
            Hiệu suất Stage (Ammo/Phút)
          </h3>
        </div>
        <div className="space-y-1.5">
          {efficiency.map((s, i) => (
            <div key={s.level} className="flex items-center gap-2">
              <span className="text-[10px] text-slate-500 w-4">#{i + 1}</span>
              <span className="text-xs text-slate-300 w-16">Stage {s.level}</span>
              <div className="flex-1 h-4 rounded-full bg-white/5 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    width: `${(s.ratio / efficiency[0].ratio) * 100}%`,
                    background: i === 0 ? "linear-gradient(90deg, #22c55e, #16a34a)" : i < 3 ? "linear-gradient(90deg, #3b82f6, #2563eb)" : "rgba(148,163,184,0.3)",
                  }}
                />
              </div>
              <span className="text-[10px] font-mono text-slate-400 w-16 text-right">
                {formatNum(s.ratio)}/min
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Tips */}
      <div className="p-4 rounded-2xl glass">
        <h3 className="text-xs font-bold uppercase tracking-wide text-slate-300 mb-2">💡 Mẹo Ammo Bonanza</h3>
        <ul className="space-y-1.5 text-xs text-slate-400">
          <li className="flex items-start gap-1.5"><span className="text-yellow-400">⚡</span> Stage cao cho nhiều ammo hơn nhưng tốn thời gian hơn</li>
          <li className="flex items-start gap-1.5"><span className="text-yellow-400">⚡</span> Stage 5-7 có hiệu suất tốt nhất (ammo/time ratio)</li>
          <li className="flex items-start gap-1.5"><span className="text-yellow-400">⚡</span> Event x2 + Alliance buff = x4 ammo. Insane value!</li>
          <li className="flex items-start gap-1.5"><span className="text-yellow-400">⚡</span> Dùng ammo ngay cho Restricted Area để tối ưu</li>
          <li className="flex items-start gap-1.5"><span className="text-yellow-400">⚡</span> VIP buff stack với event — nếu có VIP, đây là lúc dùng</li>
        </ul>
      </div>

      {/* Link to Desert Treasure */}
      <Link
        href="/tools/events/desert-treasure"
        className="mt-4 flex items-center justify-between p-4 rounded-2xl glass hover:border-orange-500/20 transition-all"
      >
        <div className="flex items-center gap-2">
          <Gift className="w-5 h-5 text-purple-400" />
          <div>
            <h3 className="font-semibold text-sm">Máy tính Desert Treasure</h3>
            <p className="text-xs text-slate-400">Tính phần thưởng kho báu sa mạc</p>
          </div>
        </div>
        <ChevronLeft className="w-4 h-4 text-slate-500 rotate-180" />
      </Link>
    </div>
  );
}
