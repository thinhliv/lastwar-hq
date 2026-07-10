"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Swords,
  Pickaxe,
  Shield,
  ChevronLeft,
  Skull,
  Clock,
  Zap,
  Coins,
  Wheat,
  Fuel,
  Hammer,
} from "lucide-react";
import bossData from "@/data/restricted-area.json";

// ===== TYPES =====
type CalcTab = "boss" | "resource" | "troop";

// ===== BOSS DATA =====
// Keys are "0".."9" representing levels 1-10
const RESTRICTED_LEVELS = Object.keys(bossData)
  .sort((a, b) => Number(a) - Number(b))
  .map((k) => ({
    levelKey: k,
    displayLevel: Number(k) + 1,
    stages: (bossData as Record<string, { stage: number; power: number }[]>)[k],
  }));

// ===== RESOURCE CALCULATOR =====
const RESOURCE_TYPES = [
  { id: "food", label: "Food", icon: Wheat, color: "text-green-400", rate: 1000 },
  { id: "oil", label: "Oil", icon: Fuel, color: "text-purple-400", rate: 1000 },
  { id: "iron", label: "Iron", icon: Hammer, color: "text-blue-400", rate: 1000 },
  { id: "gold", label: "Gold", icon: Coins, color: "text-yellow-400", rate: 1000 },
] as const;

const RESOURCE_TIPS: Record<string, string[]> = {
  food: [
    "Nâng cấp Farm buildings để tăng sản lượng",
    "Farm resource tiles ở zone lvl 3+",
    "Dùng Food Production buff item trước war",
    "Alliance Gathering Rally cho boost x2",
  ],
  oil: [
    "Nâng cấp Oil Well ở HQ level 15+",
    "Chiếm Oil Rig trên world map",
    "Trade với alliance member qua Alliance Store",
    "Event Ammo Bonanza cho x2 oil",
  ],
  iron: [
    "Nâng cấp Iron Mine liên tục",
    "Farm Iron node ở zone cao",
    "Mua từ Alliance Store bằng alliance points",
    "Event Desert Treasure có nhiều iron",
  ],
  gold: [
    "Hoàn thành daily quests + weekly missions",
    "Sell excess resource ở Trading Post",
    "Rank reward cuối mùa",
    "Alliance War victory chest",
  ],
};

function calcResourceTime(amount: number, productionRate: number, level: number): number {
  if (amount <= 0 || level <= 0) return 0;
  return amount / (productionRate * level);
}

// ===== TROOP CALCULATOR =====
const TROOP_TYPES = [
  { id: "infantry", label: "Infantry", icon: Shield, color: "text-blue-400", basePower: 120, baseCost: 80 },
  { id: "cavalry", label: "Cavalry", icon: Zap, color: "text-orange-400", basePower: 180, baseCost: 120 },
  { id: "archer", label: "Archer", icon: Swords, color: "text-green-400", basePower: 150, baseCost: 100 },
  { id: "siege", label: "Siege", icon: Pickaxe, color: "text-red-400", basePower: 300, baseCost: 200 },
] as const;

function calcTroopPower(basePower: number, level: number, count: number): number {
  return Math.round(count * basePower * (1 + level * 0.2));
}

function calcTroopCost(baseCost: number, level: number, count: number): number {
  return Math.round(count * baseCost * level);
}

// ===== FORMAT HELPERS =====
function formatNumber(n: number): string {
  if (n >= 1_000_000_000) return (n / 1_000_000_000).toFixed(2) + "B";
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(2) + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(1) + "K";
  return n.toLocaleString();
}

function formatHours(h: number): string {
  if (h <= 0) return "0h";
  if (h < 1) return `${Math.round(h * 60)}m`;
  if (h < 24) return `${h.toFixed(1)}h`;
  const days = Math.floor(h / 24);
  const remH = Math.round(h % 24);
  return `${days}d ${remH}h`;
}

// ===== MAIN COMPONENT =====
export default function CalculatorsPage() {
  const [tab, setTab] = useState<CalcTab>("boss");

  return (
    <div className="min-h-screen px-4 py-6">
      {/* Back link */}
      <Link
        href="/tools"
        className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-orange-500 transition-colors mb-3"
      >
        <ChevronLeft className="w-4 h-4" />
        Tools
      </Link>

      <div className="flex items-center gap-2 mb-1">
        <Skull className="w-6 h-6 text-orange-400" />
        <h1 className="text-2xl font-bold">Calculators</h1>
      </div>
      <p className="text-slate-400 text-sm mb-5">
        Tính toán sức mạnh, tài nguyên và quân đội
      </p>

      {/* Tab Bar */}
      <div className="flex gap-1 p-1 rounded-2xl glass mb-6">
        {([
          { id: "boss", label: "Boss", icon: Skull },
          { id: "resource", label: "Resource", icon: Pickaxe },
          { id: "troop", label: "Troop", icon: Shield },
        ] as { id: CalcTab; label: string; icon: typeof Skull }[]).map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
              tab === t.id
                ? "bg-orange-500 text-white shadow-lg shadow-orange-500/20"
                : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
            }`}
          >
            <t.icon className="w-4 h-4" />
            {t.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {tab === "boss" && <BossCalculator />}
      {tab === "resource" && <ResourceCalculator />}
      {tab === "troop" && <TroopCalculator />}
    </div>
  );
}

// ===== BOSS CALCULATOR (REAL DATA) =====
function BossCalculator() {
  const [levelIdx, setLevelIdx] = useState(0); // 0-9 → levels 1-10
  const [stage, setStage] = useState(1);

  const currentLevel = RESTRICTED_LEVELS[levelIdx];
  const maxStage = currentLevel.stages.length;
  const stageData = currentLevel.stages.find((s) => s.stage === stage);
  const power = stageData?.power ?? 0;

  // Nearby stages for comparison (5 before, 5 after)
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
      {/* Data source badge */}
      <div className="flex items-center gap-1.5 text-[10px] text-slate-500">
        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
        Live data from cpt-hedge.com
      </div>

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
          {maxStage} stages · Level {currentLevel.displayLevel}
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
        <div className="flex justify-between text-[10px] text-slate-600 mt-1">
          <span>1</span>
          <span>{maxStage}</span>
        </div>
        {/* Quick stage jump */}
        <div className="flex flex-wrap gap-1.5 mt-3">
          {[1, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100].filter((s) => s <= maxStage).map((s) => (
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

      {/* Nearby Stages Comparison */}
      <div className="p-4 rounded-2xl glass">
        <h3 className="text-xs font-bold uppercase tracking-wide text-slate-300 mb-3">
          📊 Stages lân cận
        </h3>
        <div className="space-y-1">
          {nearby.map((s) => {
            const isCurrent = s.stage === stage;
            const diff = s.power - power;
            const diffStr = diff === 0 ? "" : diff > 0 ? `+${formatNumber(diff)}` : formatNumber(diff);
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
                  <span className={`font-mono text-xs w-8 ${isCurrent ? "text-orange-400 font-bold" : "text-slate-500"}`}>
                    {s.stage}
                  </span>
                  <span className={`font-medium ${isCurrent ? "text-white" : "text-slate-300"}`}>
                    {formatNumber(s.power)}
                  </span>
                </button>
                {!isCurrent && diffStr && (
                  <span className={`text-[10px] font-mono ${diff > 0 ? "text-red-400" : "text-green-400"}`}>
                    {diffStr}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Tips */}
      <div className="p-4 rounded-2xl glass">
        <h3 className="text-xs font-bold uppercase tracking-wide text-slate-300 mb-2">
          💡 Mẹo đánh Restricted Area
        </h3>
        <ul className="space-y-1.5 text-xs text-slate-400">
          <li>• Cần power cao hơn 20-30% boss để thắng an toàn</li>
          <li>• Stage càng cao, reward càng xịn nhưng khó hơn</li>
          <li>• Levels 1-4 có 50 stages, levels 5-10 có 100 stages</li>
          <li>• Rally cùng alliance để đánh boss level cao</li>
        </ul>
      </div>
    </div>
  );
}

// ===== RESOURCE CALCULATOR =====
function ResourceCalculator() {
  const [resType, setResType] = useState<string>("food");
  const [amount, setAmount] = useState(100000);
  const [level, setLevel] = useState(10);

  const selectedRes = RESOURCE_TYPES.find((r) => r.id === resType)!;
  const hours = useMemo(
    () => calcResourceTime(amount, selectedRes.rate, level),
    [amount, selectedRes.rate, level]
  );

  const tips = RESOURCE_TIPS[resType] || [];

  return (
    <div className="space-y-5">
      {/* Resource Type */}
      <div className="p-4 rounded-2xl glass">
        <label className="text-xs text-slate-400 font-medium uppercase tracking-wide mb-2 block">
          Loại tài nguyên
        </label>
        <div className="grid grid-cols-4 gap-2">
          {RESOURCE_TYPES.map((r) => (
            <button
              key={r.id}
              onClick={() => setResType(r.id)}
              className={`flex flex-col items-center gap-1 py-3 rounded-xl transition-all ${
                resType === r.id
                  ? "bg-white/10 border border-orange-500/30"
                  : "bg-white/5 border border-white/10 hover:bg-white/10"
              }`}
            >
              <r.icon className={`w-5 h-5 ${r.color}`} />
              <span className="text-[10px] text-slate-300">{r.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Amount Input */}
      <div className="p-4 rounded-2xl glass">
        <label className="text-xs text-slate-400 font-medium uppercase tracking-wide mb-2 block">
          Số lượng cần
        </label>
        <div className="flex items-center gap-2">
          <selectedRes.icon className={`w-5 h-5 ${selectedRes.color}`} />
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Math.max(0, Number(e.target.value)))}
            className="flex-1 bg-transparent text-2xl font-bold text-white outline-none placeholder-slate-600"
            placeholder="0"
            min={0}
          />
        </div>
        <div className="flex gap-2 mt-2">
          {[10000, 100000, 500000, 1000000].map((v) => (
            <button
              key={v}
              onClick={() => setAmount(v)}
              className="px-2.5 py-1 rounded-lg bg-white/5 text-[10px] text-slate-400 hover:bg-white/10 hover:text-slate-200 transition-colors"
            >
              {formatNumber(v)}
            </button>
          ))}
        </div>
      </div>

      {/* Production Level */}
      <div className="p-4 rounded-2xl glass">
        <label className="text-xs text-slate-400 font-medium uppercase tracking-wide mb-2 block">
          Production Level: <span className="text-orange-400 font-bold">{level}</span>
        </label>
        <input
          type="range"
          min={1}
          max={30}
          value={level}
          onChange={(e) => setLevel(Number(e.target.value))}
          className="w-full accent-orange-500"
        />
        <div className="flex justify-between text-[10px] text-slate-600 mt-1">
          <span>Lv.1</span>
          <span>Rate: {formatNumber(selectedRes.rate * level)}/h</span>
          <span>Lv.30</span>
        </div>
      </div>

      {/* Result */}
      <div className="p-5 rounded-2xl bg-gradient-to-br from-blue-500/10 to-cyan-500/5 border border-blue-500/20">
        <div className="flex items-center gap-2 mb-2">
          <Clock className="w-4 h-4 text-blue-400" />
          <span className="text-xs font-medium uppercase tracking-wide text-blue-400">
            Thời gian farm ước tính
          </span>
        </div>
        <div className="text-4xl font-black text-white">
          {formatHours(hours)}
        </div>
        <div className="text-sm text-slate-400 mt-1">
          {formatNumber(selectedRes.rate * level)}/h × Lv.{level}
        </div>
      </div>

      {/* Tips */}
      <div className="p-4 rounded-2xl glass">
        <h3 className="text-xs font-bold uppercase tracking-wide text-slate-300 mb-2">
          💡 Cách thu thập {selectedRes.label}
        </h3>
        <ul className="space-y-1.5">
          {tips.map((tip, i) => (
            <li key={i} className="text-xs text-slate-400 flex items-start gap-1.5">
              <span className="text-orange-500 flex-shrink-0">▸</span>
              {tip}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// ===== TROOP CALCULATOR =====
function TroopCalculator() {
  const [troopType, setTroopType] = useState<string>("infantry");
  const [level, setLevel] = useState(5);
  const [count, setCount] = useState(1000);

  const selected = TROOP_TYPES.find((t) => t.id === troopType)!;
  const power = useMemo(
    () => calcTroopPower(selected.basePower, level, count),
    [selected.basePower, level, count]
  );
  const cost = useMemo(
    () => calcTroopCost(selected.baseCost, level, count),
    [selected.baseCost, level, count]
  );

  return (
    <div className="space-y-5">
      {/* Troop Type */}
      <div className="p-4 rounded-2xl glass">
        <label className="text-xs text-slate-400 font-medium uppercase tracking-wide mb-2 block">
          Loại quân
        </label>
        <div className="grid grid-cols-4 gap-2">
          {TROOP_TYPES.map((t) => (
            <button
              key={t.id}
              onClick={() => setTroopType(t.id)}
              className={`flex flex-col items-center gap-1 py-3 rounded-xl transition-all ${
                troopType === t.id
                  ? "bg-white/10 border border-orange-500/30"
                  : "bg-white/5 border border-white/10 hover:bg-white/10"
              }`}
            >
              <t.icon className={`w-5 h-5 ${t.color}`} />
              <span className="text-[10px] text-slate-300">{t.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Level */}
      <div className="p-4 rounded-2xl glass">
        <label className="text-xs text-slate-400 font-medium uppercase tracking-wide mb-2 block">
          Cấp độ: <span className="text-orange-400 font-bold">Lv.{level}</span>
        </label>
        <input
          type="range"
          min={1}
          max={10}
          value={level}
          onChange={(e) => setLevel(Number(e.target.value))}
          className="w-full accent-orange-500"
        />
        <div className="flex justify-between text-[10px] text-slate-600 mt-1">
          <span>1</span>
          <span>Power bonus: +{level * 20}%</span>
          <span>10</span>
        </div>
      </div>

      {/* Count */}
      <div className="p-4 rounded-2xl glass">
        <label className="text-xs text-slate-400 font-medium uppercase tracking-wide mb-2 block">
          Số lượng
        </label>
        <div className="flex items-center gap-2">
          <selected.icon className={`w-5 h-5 ${selected.color}`} />
          <input
            type="number"
            value={count}
            onChange={(e) => setCount(Math.max(0, Number(e.target.value)))}
            className="flex-1 bg-transparent text-2xl font-bold text-white outline-none"
            placeholder="0"
            min={0}
          />
        </div>
        <div className="flex gap-2 mt-2">
          {[100, 500, 1000, 5000, 10000].map((v) => (
            <button
              key={v}
              onClick={() => setCount(v)}
              className="px-2.5 py-1 rounded-lg bg-white/5 text-[10px] text-slate-400 hover:bg-white/10 hover:text-slate-200 transition-colors"
            >
              {formatNumber(v)}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      <div className="grid grid-cols-2 gap-3">
        {/* Power */}
        <div className="p-4 rounded-2xl bg-gradient-to-br from-orange-500/10 to-red-500/5 border border-orange-500/20">
          <div className="flex items-center gap-1.5 mb-1">
            <Zap className="w-3.5 h-3.5 text-orange-400" />
            <span className="text-[10px] font-medium uppercase tracking-wide text-orange-400">
              Total Power
            </span>
          </div>
          <div className="text-2xl font-black text-white">
            {formatNumber(power)}
          </div>
        </div>

        {/* Cost */}
        <div className="p-4 rounded-2xl bg-gradient-to-br from-yellow-500/10 to-orange-500/5 border border-yellow-500/20">
          <div className="flex items-center gap-1.5 mb-1">
            <Coins className="w-3.5 h-3.5 text-yellow-400" />
            <span className="text-[10px] font-medium uppercase tracking-wide text-yellow-400">
              Train Cost
            </span>
          </div>
          <div className="text-2xl font-black text-white">
            {formatNumber(cost)}
          </div>
        </div>
      </div>

      {/* Per-unit stats */}
      <div className="p-4 rounded-2xl glass">
        <h3 className="text-xs font-bold uppercase tracking-wide text-slate-300 mb-3">
          Chi tiết per-unit
        </h3>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-slate-500">Power/unit</span>
            <span className="font-mono text-orange-400">
              {Math.round(selected.basePower * (1 + level * 0.2))}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-500">Cost/unit</span>
            <span className="font-mono text-yellow-400">
              {Math.round(selected.baseCost * level)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
