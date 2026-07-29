"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Swords,
  ChevronLeft,
  Skull,
  Zap,
  Database,
} from "lucide-react";
import bossData from "@/data/restricted-area.json";
import heroExpData from "@/data/hero-exp.json";

// ===== TYPES =====
type CalcTab = "boss" | "hero";

// ===== BOSS DATA (real, from restricted-area.json) =====
const RESTRICTED_LEVELS = Object.keys(bossData)
  .sort((a, b) => Number(a) - Number(b))
  .map((k) => ({
    levelKey: k,
    displayLevel: Number(k) + 1,
    stages: (bossData as Record<string, { stage: number; power: number }[]>)[k],
  }));

// ===== FORMAT HELPERS =====
function formatNumber(n: number): string {
  if (n >= 1_000_000_000) return (n / 1_000_000_000).toFixed(2) + "B";
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(2) + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(1) + "K";
  return n.toLocaleString();
}

// ===== DATA SOURCE NOTE (honest) =====
function SourceNote({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-1.5 text-[10px] text-slate-500">
      <Database className="w-3 h-3 flex-shrink-0 mt-0.5" />
      <span>{children}</span>
    </div>
  );
}

// ===== MAIN COMPONENT =====
export default function CalculatorsPage() {
  const [tab, setTab] = useState<CalcTab>("boss");

  return (
    <div className="min-h-screen mx-auto max-w-md px-4 py-6">
      <Link
        href="/tools"
        className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-orange-500 transition-colors mb-3"
      >
        <ChevronLeft className="w-4 h-4" />
        Công cụ
      </Link>

      <div className="flex items-center gap-2 mb-1">
        <Skull className="w-6 h-6 text-orange-400" />
        <h1 className="text-2xl font-bold">Calculators</h1>
      </div>
      <p className="text-slate-400 text-sm mb-5">
        Tra cứu sức mạnh Boss và tính Hero EXP — dữ liệu thật.
      </p>

      {/* Tab Bar */}
      <div className="flex gap-1 p-1 rounded-2xl glass mb-6">
        {(
          [
            { id: "boss", label: "Boss", icon: Skull },
            { id: "hero", label: "Hero EXP", icon: Zap },
          ] as { id: CalcTab; label: string; icon: typeof Skull }[]
        ).map((tItem) => (
          <button
            key={tItem.id}
            onClick={() => setTab(tItem.id)}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
              tab === tItem.id
                ? "bg-orange-500 text-white shadow-lg shadow-orange-500/20"
                : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
            }`}
          >
            <tItem.icon className="w-4 h-4" />
            {tItem.label}
          </button>
        ))}
      </div>

      {tab === "boss" && <BossCalculator />}
      {tab === "hero" && <HeroCalculator />}
    </div>
  );
}

// ===== HERO CALCULATOR (real, from hero-exp.json) =====
function HeroCalculator() {
  const [fromLevel, setFromLevel] = useState(1);
  const [toLevel, setToLevel] = useState(175);

  const maxLevel = heroExpData.length - 1; // 175

  const safeFrom = Math.max(1, Math.min(fromLevel, maxLevel));
  const safeTo = Math.max(safeFrom, Math.min(toLevel, maxLevel));

  // heroExpData[L] = cumulative EXP to reach level L → cost = exp[to] - exp[from]
  const totalExp = heroExpData[safeTo] - heroExpData[safeFrom];

  return (
    <div className="space-y-5">
      <SourceNote>
        Nguồn: bảng Hero EXP tích luỹ từ cpt-hedge.com ({maxLevel} cấp).
      </SourceNote>

      <div className="p-4 rounded-2xl glass space-y-4">
        <div>
          <label className="text-xs text-slate-400 font-medium uppercase tracking-wide mb-2 block">
            Từ cấp: <span className="text-orange-400 font-bold">{safeFrom}</span>
          </label>
          <input
            type="range"
            min={1}
            max={maxLevel - 1}
            value={safeFrom}
            onChange={(e) => setFromLevel(Number(e.target.value))}
            className="w-full accent-orange-500"
          />
        </div>
        <div>
          <label className="text-xs text-slate-400 font-medium uppercase tracking-wide mb-2 block">
            Đến cấp: <span className="text-orange-400 font-bold">{safeTo}</span>
          </label>
          <input
            type="range"
            min={2}
            max={maxLevel}
            value={safeTo}
            onChange={(e) => setToLevel(Number(e.target.value))}
            className="w-full accent-orange-500"
          />
        </div>
      </div>

      <div className="p-5 rounded-2xl bg-gradient-to-br from-orange-500/10 to-red-500/5 border border-orange-500/20">
        <div className="flex items-center gap-2 mb-2">
          <Zap className="w-4 h-4 text-orange-400" />
          <span className="text-xs font-medium uppercase tracking-wide text-orange-400">
            Tổng Hero EXP cần thiết
          </span>
        </div>
        <div className="text-4xl font-black text-white">
          {formatNumber(totalExp)}
        </div>
        <div className="text-sm text-slate-400 mt-1">
          {totalExp.toLocaleString()} EXP · Lv.{safeFrom} → Lv.{safeTo}
        </div>
      </div>
    </div>
  );
}

// ===== BOSS CALCULATOR (real, from restricted-area.json) =====
function BossCalculator() {
  const [levelIdx, setLevelIdx] = useState(0); // 0-9 → levels 1-10
  const [stage, setStage] = useState(1);

  const currentLevel = RESTRICTED_LEVELS[levelIdx];
  const maxStage = currentLevel.stages.length;
  const stageData = currentLevel.stages.find((s) => s.stage === stage);
  const power = stageData?.power ?? 0;

  const stageIdx = currentLevel.stages.findIndex((s) => s.stage === stage);
  const nearby = currentLevel.stages.slice(
    Math.max(0, stageIdx - 5),
    Math.min(currentLevel.stages.length, stageIdx + 6)
  );

  function selectLevel(newIdx: number) {
    setLevelIdx(newIdx);
    const newMax = RESTRICTED_LEVELS[newIdx].stages.length;
    if (stage > newMax) setStage(1);
  }

  return (
    <div className="space-y-5">
      <SourceNote>
        Nguồn: dữ liệu sức mạnh boss Restricted Area từ cpt-hedge.com.
      </SourceNote>

      {/* Level Selector */}
      <div className="p-4 rounded-2xl glass">
        <label className="text-xs text-slate-400 font-medium uppercase tracking-wide mb-2 block">
          Restricted Area Level
        </label>
        <div className="grid grid-cols-5 gap-2">
          {RESTRICTED_LEVELS.map((lv, i) => (
            <button
              key={lv.levelKey}
              onClick={() => selectLevel(i)}
              className={`py-2.5 rounded-xl text-sm font-bold transition-all ${
                levelIdx === i
                  ? "bg-orange-500/20 text-orange-400 border border-orange-500/40"
                  : "bg-white/5 text-slate-400 border border-white/10 hover:bg-white/10"
              }`}
            >
              {lv.displayLevel}
            </button>
          ))}
        </div>
        <div className="mt-2 text-[10px] text-slate-600 text-center">
          {maxStage} stage · Level {currentLevel.displayLevel}
        </div>
      </div>

      {/* Stage Selector */}
      <div className="p-4 rounded-2xl glass">
        <label className="text-xs text-slate-400 font-medium uppercase tracking-wide mb-2 block">
          Stage: <span className="text-orange-400 font-bold">{stage}</span>
          <span className="text-slate-600"> / {maxStage}</span>
        </label>
        <input
          type="range"
          min={1}
          max={maxStage}
          value={stage}
          onChange={(e) => setStage(Number(e.target.value))}
          className="w-full accent-orange-500"
        />
        <div className="flex flex-wrap gap-1.5 mt-3">
          {[1, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
            .filter((s) => s <= maxStage)
            .map((s) => (
              <button
                key={s}
                onClick={() => setStage(s)}
                className={`px-2 py-1 rounded-lg text-[10px] font-medium transition-all ${
                  stage === s
                    ? "bg-orange-500/20 text-orange-400"
                    : "bg-white/5 text-slate-500 hover:bg-white/10"
                }`}
              >
                {s}
              </button>
            ))}
        </div>
      </div>

      {/* Result */}
      <div className="p-5 rounded-2xl bg-gradient-to-br from-orange-500/10 to-red-500/5 border border-orange-500/20">
        <div className="flex items-center gap-2 mb-2">
          <Swords className="w-4 h-4 text-orange-400" />
          <span className="text-xs font-medium uppercase tracking-wide text-orange-400">
            Boss Power — Lv.{currentLevel.displayLevel} Stage {stage}
          </span>
        </div>
        <div className="text-4xl font-black text-white">
          {formatNumber(power)}
        </div>
        <div className="text-sm text-slate-400 mt-1">
          {power.toLocaleString()} power
        </div>
      </div>

      {/* Nearby Stages */}
      <div className="p-4 rounded-2xl glass">
        <h3 className="text-xs font-bold uppercase tracking-wide text-slate-300 mb-3">
          Stage lân cận
        </h3>
        <div className="space-y-1">
          {nearby.map((s) => {
            const isCurrent = s.stage === stage;
            const diff = s.power - power;
            const diffStr =
              diff === 0
                ? ""
                : diff > 0
                ? `+${formatNumber(diff)}`
                : formatNumber(diff);
            return (
              <div
                key={s.stage}
                className={`flex items-center justify-between py-2 px-3 rounded-lg text-sm transition-all ${
                  isCurrent
                    ? "bg-orange-500/15 border border-orange-500/30"
                    : "hover:bg-white/5"
                }`}
              >
                <button
                  onClick={() => setStage(s.stage)}
                  className="flex items-center gap-2 flex-1 text-left"
                >
                  <span
                    className={`font-mono text-xs w-8 ${
                      isCurrent ? "text-orange-400 font-bold" : "text-slate-500"
                    }`}
                  >
                    {s.stage}
                  </span>
                  <span
                    className={`font-medium ${
                      isCurrent ? "text-white" : "text-slate-300"
                    }`}
                  >
                    {formatNumber(s.power)}
                  </span>
                </button>
                {!isCurrent && diffStr && (
                  <span
                    className={`text-[10px] font-mono ${
                      diff > 0 ? "text-red-400" : "text-green-400"
                    }`}
                  >
                    {diffStr}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
