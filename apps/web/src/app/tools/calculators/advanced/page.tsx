"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  Skull,
  Zap,
  Gauge,
  Swords,
  Clock,
  TrendingUp,
  Package,
  Hammer,
  Shield,
} from "lucide-react";
import bossData from "@/data/restricted-area.json";

// ===== TYPES =====
type CalcTab = "speedup" | "battle" | "build";

// ===== FORMAT HELPERS =====
function formatNumber(n: number): string {
  if (n >= 1_000_000_000) return (n / 1_000_000_000).toFixed(2) + "B";
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(2) + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(1) + "K";
  return n.toLocaleString();
}

function formatHours(h: number): string {
  if (h <= 0) return "0s";
  if (h < 1 / 60) return `${Math.round(h * 3600)}s`;
  if (h < 1) return `${Math.round(h * 60)}m`;
  if (h < 24) return `${h.toFixed(1)}h`;
  const days = Math.floor(h / 24);
  const remH = Math.round(h % 24);
  return `${days}d ${remH}h`;
}

// ===== SPEEDUP TYPES =====
const SPEEDUP_TYPES = [
  { id: "universal", label: "Đa năng", icon: Zap, color: "text-purple-400", desc: "Dùng cho mọi thứ" },
  { id: "building", label: "Xây dựng", icon: Hammer, color: "text-orange-400", desc: "Upgrade building" },
  { id: "research", label: "Nghiên cứu", icon: Gauge, color: "text-blue-400", desc: "Tech research" },
  { id: "training", label: "Train", icon: Shield, color: "text-green-400", desc: "Train troop" },
] as const;

const SPEEDUP_ITEMS = [
  { id: "5m", label: "5 phút", value: 5 / 60 },
  { id: "1h", label: "1 giờ", value: 1 },
  { id: "3h", label: "3 giờ", value: 3 },
  { id: "8h", label: "8 giờ", value: 8 },
  { id: "24h", label: "24 giờ", value: 24 },
  { id: "7d", label: "7 ngày", value: 24 * 7 },
] as const;

// ===== TROOP DATA for Battle Sim =====
const TROOP_TIERS = [
  { id: "t1", label: "T1", power: 80, defense: 40, attack: 50, speed: 100 },
  { id: "t2", label: "T2", power: 150, defense: 80, attack: 90, speed: 95 },
  { id: "t3", label: "T3", power: 250, defense: 140, attack: 150, speed: 90 },
  { id: "t4", label: "T4", power: 400, defense: 220, attack: 240, speed: 85 },
  { id: "t5", label: "T5", power: 600, defense: 350, attack: 360, speed: 80 },
  { id: "t6", label: "T6", power: 850, defense: 500, attack: 520, speed: 75 },
  { id: "t7", label: "T7", power: 1200, defense: 700, attack: 750, speed: 70 },
  { id: "t8", label: "T8", power: 1700, defense: 1000, attack: 1050, speed: 65 },
  { id: "t9", label: "T9", power: 2400, defense: 1500, attack: 1500, speed: 60 },
  { id: "t10", label: "T10", power: 3500, defense: 2200, attack: 2200, speed: 55 },
];

const TROOP_TYPES = [
  { id: "infantry", label: "Bộ binh", icon: Shield, color: "text-blue-400" },
  { id: "cavalry", label: "Kỵ binh", icon: Zap, color: "text-orange-400" },
  { id: "archer", label: "Cung thủ", icon: Swords, color: "text-green-400" },
  { id: "siege", label: "Công thành", icon: Hammer, color: "text-red-400" },
] as const;

// Troop type advantages (rock-paper-scissors)
const TYPE_ADVANTAGE: Record<string, string> = {
  infantry: "cavalry",
  cavalry: "archer",
  archer: "infantry",
  siege: "none",
};

// ===== BUILD PLANNER =====
const BUILDINGS = [
  { id: "hq", label: "Headquarters", baseTime: 1, maxLevel: 30, icon: "🏰", priority: "critical" },
  { id: "barracks", label: "Barracks", baseTime: 0.5, maxLevel: 30, icon: "⚔️", priority: "high" },
  { id: "wall", label: "Tường thành", baseTime: 0.8, maxLevel: 30, icon: "🧱", priority: "high" },
  { id: "farm", label: "Nông trại", baseTime: 0.3, maxLevel: 30, icon: "🌾", priority: "medium" },
  { id: "oilwell", label: "Giếng dầu", baseTime: 0.3, maxLevel: 30, icon: "🛢️", priority: "medium" },
  { id: "ironmine", label: "Mỏ sắt", baseTime: 0.3, maxLevel: 30, icon: "⛏️", priority: "medium" },
  { id: "warehouse", label: "Kho", baseTime: 0.4, maxLevel: 30, icon: "📦", priority: "low" },
  { id: "research", label: "Phòng nghiên cứu", baseTime: 0.6, maxLevel: 30, icon: "🔬", priority: "high" },
];

// ===== MAIN COMPONENT =====
export default function AdvancedCalcPage() {
  const [tab, setTab] = useState<CalcTab>("speedup");

  return (
    <div className="min-h-screen px-4 py-6">
      <Link
        href="/tools/calculators"
        className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-orange-500 transition-colors mb-3"
      >
        <ChevronLeft className="w-4 h-4" />
        Calculators
      </Link>

      <div className="flex items-center gap-2 mb-1">
        <Gauge className="w-6 h-6 text-cyan-400" />
        <h1 className="text-2xl font-bold">Công cụ nâng cao</h1>
      </div>
      <p className="text-slate-400 text-sm mb-5">
        Speedup, Mô phỏng chiến đấu, L�n k? ho?ch x�y d?ng
      </p>

      {/* Tab Bar */}
      <div className="flex gap-1 p-1 rounded-2xl glass mb-6">
        {([
          { id: "speedup", label: "Speedup", icon: Zap },
          { id: "battle", label: "Mô phỏng", icon: Swords },
          { id: "build", label: "Build", icon: Hammer },
        ] as { id: CalcTab; label: string; icon: typeof Zap }[]).map((t) => (
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

      {tab === "speedup" && <SpeedupCalculator />}
      {tab === "battle" && <BattleSimulator />}
      {tab === "build" && <BuildPlanner />}

      {/* Links to more calculators */}
      <div className="mt-6 space-y-2">
        <Link href="/tools/calculators/resource-planner" className="flex items-center justify-between p-3 rounded-2xl glass hover:border-green-500/20 transition-all">
          <div className="flex items-center gap-2">
            <Package className="w-5 h-5 text-green-400" />
            <h3 className="font-semibold text-sm">L?p k? ho?ch t�i nguy�n</h3>
          </div>
          <ChevronLeft className="w-4 h-4 text-slate-500 rotate-180" />
        </Link>
        <Link href="/tools/calculators/building-planner" className="flex items-center justify-between p-3 rounded-2xl glass hover:border-orange-500/20 transition-all">
          <div className="flex items-center gap-2">
            <Hammer className="w-5 h-5 text-orange-400" />
            <h3 className="font-semibold text-sm">L?p k? ho?ch n�ng c?p</h3>
          </div>
          <ChevronLeft className="w-4 h-4 text-slate-500 rotate-180" />
        </Link>
      </div>
    </div>
  );
}

// ===== SPEEDUP CALCULATOR =====
function SpeedupCalculator() {
  const [targetHours, setTargetHours] = useState(48);
  const [inventory, setInventory] = useState<Record<string, number>>({
    "5m": 50, "1h": 20, "3h": 10, "8h": 5, "24h": 3, "7d": 1,
  });

  const totalAvailableHours = useMemo(() => {
    return SPEEDUP_ITEMS.reduce((sum, item) => {
      return sum + item.value * (inventory[item.id] || 0);
    }, 0);
  }, [inventory]);

  const deficit = targetHours - totalAvailableHours;
  const isEnough = deficit <= 0;

  // Suggest optimal combination
  const suggestion = useMemo(() => {
    let remaining = targetHours;
    const used: { id: string; label: string; count: number; coversHours: number }[] = [];

    // Use largest first
    for (let i = SPEEDUP_ITEMS.length - 1; i >= 0; i--) {
      const item = SPEEDUP_ITEMS[i];
      const have = inventory[item.id] || 0;
      if (have <= 0 || remaining <= 0) continue;
      
      const maxUsable = Math.min(have, Math.floor(remaining / item.value));
      if (maxUsable > 0) {
        used.push({
          id: item.id,
          label: item.label,
          count: maxUsable,
          coversHours: maxUsable * item.value,
        });
        remaining -= maxUsable * item.value;
      }
      // Try using one more to cover the remainder
      if (remaining > 0 && have > maxUsable) {
        used.push({
          id: item.id,
          label: item.label,
          count: maxUsable + 1,
          coversHours: (maxUsable + 1) * item.value,
        });
        remaining = 0;
      }
    }

    return { used, remaining };
  }, [targetHours, inventory]);

  return (
    <div className="space-y-5">
      {/* Target Input */}
      <div className="p-4 rounded-2xl glass">
        <label className="text-xs text-slate-400 font-medium uppercase tracking-wide mb-2 block">
          Thời gian cần thiết: <span className="text-orange-400 font-bold">{formatHours(targetHours)}</span>
        </label>
        <input
          type="range"
          min={1}
          max={720}
          value={targetHours}
          onChange={(e) => setTargetHours(Number(e.target.value))}
          className="w-full accent-orange-500"
        />
        <div className="flex justify-between text-[10px] text-slate-600 mt-1">
          <span>1h</span>
          <span>30 ngày</span>
        </div>
        {/* Quick presets */}
        <div className="flex gap-2 mt-3">
          {[1, 8, 24, 72, 168].map((h) => (
            <button
              key={h}
              onClick={() => setTargetHours(h)}
              className="px-2.5 py-1 rounded-lg bg-white/5 text-[10px] text-slate-400 hover:bg-white/10 transition-colors"
            >
              {formatHours(h)}
            </button>
          ))}
        </div>
      </div>

      {/* Inventory */}
      <div className="p-4 rounded-2xl glass">
        <h3 className="text-xs font-bold uppercase tracking-wide text-slate-300 mb-3">
          📦 Kho speedup của bạn
        </h3>
        <div className="grid grid-cols-3 gap-2">
          {SPEEDUP_ITEMS.map((item) => (
            <div key={item.id} className="flex flex-col items-center p-2 rounded-xl bg-white/5">
              <span className="text-[10px] text-slate-400 mb-1">{item.label}</span>
              <input
                type="number"
                value={inventory[item.id] || 0}
                onChange={(e) =>
                  setInventory((prev) => ({ ...prev, [item.id]: Math.max(0, Number(e.target.value)) }))
                }
                className="w-full text-center bg-transparent text-lg font-bold text-white outline-none"
                min={0}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Result */}
      <div className={`p-5 rounded-2xl border ${
        isEnough
          ? "bg-gradient-to-br from-green-500/10 to-emerald-500/5 border-green-500/20"
          : "bg-gradient-to-br from-red-500/10 to-orange-500/5 border-red-500/20"
      }`}>
        <div className="flex items-center gap-2 mb-2">
          {isEnough ? (
            <Package className="w-4 h-4 text-green-400" />
          ) : (
            <Clock className="w-4 h-4 text-red-400" />
          )}
          <span className={`text-xs font-medium uppercase tracking-wide ${
            isEnough ? "text-green-400" : "text-red-400"
          }`}>
            {isEnough ? "Đủ speedup! ✅" : `Thiếu ${formatHours(deficit)}`}
          </span>
        </div>
        <div className="grid grid-cols-2 gap-3 mt-3">
          <div>
            <p className="text-[10px] text-slate-500 uppercase">Cần</p>
            <p className="text-xl font-bold text-white">{formatHours(targetHours)}</p>
          </div>
          <div>
            <p className="text-[10px] text-slate-500 uppercase">Có sẵn</p>
            <p className="text-xl font-bold text-white">{formatHours(totalAvailableHours)}</p>
          </div>
        </div>
      </div>

      {/* Suggestion */}
      {suggestion.used.length > 0 && (
        <div className="p-4 rounded-2xl glass">
          <h3 className="text-xs font-bold uppercase tracking-wide text-slate-300 mb-3">
            💡 Cách dùng tối ưu
          </h3>
          <div className="space-y-2">
            {suggestion.used.map((u) => (
              <div key={u.id} className="flex items-center justify-between text-sm">
                <span className="text-slate-300">
                  Dùng <span className="font-bold text-orange-400">{u.count}x</span> {u.label}
                </span>
                <span className="text-[10px] text-slate-500 font-mono">
                  {formatHours(u.coversHours)}
                </span>
              </div>
            ))}
          </div>
          {suggestion.remaining > 0 && (
            <div className="mt-3 p-2 rounded-lg bg-red-500/10 text-xs text-red-400">
              ⚠️ Vẫn thiếu {formatHours(suggestion.remaining)} — cần thêm speedup hoặc chờ
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ===== BATTLE SIMULATOR =====
function BattleSimulator() {
  const [attackerTier, setAttackerTier] = useState(7);
  const [attackerType, setAttackerType] = useState<string>("infantry");
  const [attackerCount, setAttackerCount] = useState(10000);

  const [defenderTier, setDefenderTier] = useState(6);
  const [defenderType, setDefenderType] = useState<string>("cavalry");
  const [defenderCount, setDefenderCount] = useState(12000);

  // Calculate battle
  const result = useMemo(() => {
    const atk = TROOP_TIERS[attackerTier - 1];
    const def = TROOP_TIERS[defenderTier - 1];
    
    const atkTotalPower = atk.power * attackerCount;
    const defTotalPower = def.power * defenderCount;

    // Type advantage bonus (20%)
    const atkHasAdvantage = TYPE_ADVANTAGE[attackerType] === defenderType;
    const defHasAdvantage = TYPE_ADVANTAGE[defenderType] === attackerType;

    const atkEffectivePower = atkTotalPower * (atkHasAdvantage ? 1.2 : 1) * (defHasAdvantage ? 0.85 : 1);
    const defEffectivePower = defTotalPower * (defHasAdvantage ? 1.2 : 1) * (atkHasAdvantage ? 0.85 : 1);

    // Simulate casualties (simplified)
    const totalPower = atkEffectivePower + defEffectivePower;
    const atkWinRate = atkEffectivePower / totalPower;
    
    // Estimated losses (15-35% of force depending on margin)
    const atkLossRate = 0.35 - atkWinRate * 0.25;
    const defLossRate = 0.35 - (1 - atkWinRate) * 0.25;
    
    const atkLosses = Math.round(attackerCount * Math.max(0.05, atkLossRate));
    const defLosses = Math.round(defenderCount * Math.max(0.05, defLossRate));

    const winner = atkWinRate > 0.55 ? "attacker" : atkWinRate < 0.45 ? "defender" : "close";

    return {
      atkTotalPower: Math.round(atkTotalPower),
      defTotalPower: Math.round(defTotalPower),
      atkEffectivePower: Math.round(atkEffectivePower),
      defEffectivePower: Math.round(defEffectivePower),
      atkWinRate: Math.round(atkWinRate * 100),
      atkLosses,
      defLosses,
      winner,
      atkHasAdvantage,
      defHasAdvantage,
    };
  }, [attackerTier, attackerType, attackerCount, defenderTier, defenderType, defenderCount]);

  return (
    <div className="space-y-5">
      {/* Attacker Setup */}
      <div className="p-4 rounded-2xl bg-gradient-to-br from-red-500/10 to-orange-500/5 border border-red-500/20">
        <div className="flex items-center gap-2 mb-3">
          <Swords className="w-4 h-4 text-red-400" />
          <h3 className="text-xs font-bold uppercase tracking-wide text-red-400">⚔️ Attacker</h3>
        </div>
        <div className="space-y-3">
          {/* Troop Type */}
          <div className="grid grid-cols-4 gap-2">
            {TROOP_TYPES.map((t) => (
              <button
                key={t.id}
                onClick={() => setAttackerType(t.id)}
                className={`flex flex-col items-center gap-1 py-2 rounded-lg transition-all ${
                  attackerType === t.id
                    ? "bg-red-500/20 border border-red-500/40"
                    : "bg-white/5 border border-white/10"
                }`}
              >
                <t.icon className={`w-4 h-4 ${t.color}`} />
                <span className="text-[9px] text-slate-300">{t.label}</span>
              </button>
            ))}
          </div>
          {/* Tier */}
          <div>
            <label className="text-[10px] text-slate-400 uppercase">Tier: <span className="text-red-400 font-bold">{attackerTier}</span></label>
            <input type="range" min={1} max={10} value={attackerTier} onChange={(e) => setAttackerTier(Number(e.target.value))} className="w-full accent-red-500" />
          </div>
          {/* Count */}
          <div>
            <label className="text-[10px] text-slate-400 uppercase">Số lượng</label>
            <input type="number" value={attackerCount} onChange={(e) => setAttackerCount(Math.max(0, Number(e.target.value)))} className="w-full bg-white/5 rounded-lg px-3 py-2 text-lg font-bold text-white outline-none mt-1" min={0} />
          </div>
        </div>
      </div>

      {/* VS */}
      <div className="text-center -my-2">
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-slate-800 border border-white/10 text-xs font-black text-slate-400">VS</span>
      </div>

      {/* Defender Setup */}
      <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-500/10 to-cyan-500/5 border border-blue-500/20">
        <div className="flex items-center gap-2 mb-3">
          <Shield className="w-4 h-4 text-blue-400" />
          <h3 className="text-xs font-bold uppercase tracking-wide text-blue-400">🛡️ Defender</h3>
        </div>
        <div className="space-y-3">
          <div className="grid grid-cols-4 gap-2">
            {TROOP_TYPES.map((t) => (
              <button
                key={t.id}
                onClick={() => setDefenderType(t.id)}
                className={`flex flex-col items-center gap-1 py-2 rounded-lg transition-all ${
                  defenderType === t.id
                    ? "bg-blue-500/20 border border-blue-500/40"
                    : "bg-white/5 border border-white/10"
                }`}
              >
                <t.icon className={`w-4 h-4 ${t.color}`} />
                <span className="text-[9px] text-slate-300">{t.label}</span>
              </button>
            ))}
          </div>
          <div>
            <label className="text-[10px] text-slate-400 uppercase">Tier: <span className="text-blue-400 font-bold">{defenderTier}</span></label>
            <input type="range" min={1} max={10} value={defenderTier} onChange={(e) => setDefenderTier(Number(e.target.value))} className="w-full accent-blue-500" />
          </div>
          <div>
            <label className="text-[10px] text-slate-400 uppercase">Số lượng</label>
            <input type="number" value={defenderCount} onChange={(e) => setDefenderCount(Math.max(0, Number(e.target.value)))} className="w-full bg-white/5 rounded-lg px-3 py-2 text-lg font-bold text-white outline-none mt-1" min={0} />
          </div>
        </div>
      </div>

      {/* Type Advantage Indicator */}
      {(result.atkHasAdvantage || result.defHasAdvantage) && (
        <div className="p-3 rounded-xl bg-yellow-500/10 border border-yellow-500/20 text-center">
          <p className="text-xs text-yellow-400">
            {result.atkHasAdvantage && "⚔️ Attacker có type advantage (+20% power)!"}
            {result.defHasAdvantage && "🛡️ Defender có type advantage (+20% power)!"}
          </p>
        </div>
      )}

      {/* Battle Result */}
      <div className="p-5 rounded-2xl glass">
        <h3 className="text-xs font-bold uppercase tracking-wide text-slate-300 mb-4">
          📊 Kết quả mô phỏng
        </h3>
        
        {/* Win Rate Bar */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-red-400">Attacker {result.atkWinRate}%</span>
            <span className="text-xs text-blue-400">{100 - result.atkWinRate}% Defender</span>
          </div>
          <div className="h-3 rounded-full bg-blue-500/20 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-red-500 to-orange-500 rounded-full transition-all"
              style={{ width: `${result.atkWinRate}%` }}
            />
          </div>
        </div>

        {/* Verdict */}
        <div className={`p-3 rounded-xl text-center mb-4 ${
          result.winner === "attacker"
            ? "bg-green-500/10 text-green-400"
            : result.winner === "defender"
            ? "bg-red-500/10 text-red-400"
            : "bg-yellow-500/10 text-yellow-400"
        }`}>
          <p className="text-sm font-bold">
            {result.winner === "attacker" ? "🏆 Attacker có lợi thế!" : result.winner === "defender" ? "🏆 Defender có lợi thế!" : "⚖️ Trận đấu quá cân!"}
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 rounded-xl bg-red-500/5">
            <p className="text-[10px] text-slate-500 uppercase mb-1">Sức mạnh tấn công</p>
            <p className="text-lg font-bold text-red-400">{formatNumber(result.atkEffectivePower)}</p>
            <p className="text-[10px] text-slate-500 mt-1">Thiệt hại ước tính: <span className="text-red-400">{formatNumber(result.atkLosses)}</span></p>
          </div>
          <div className="p-3 rounded-xl bg-blue-500/5">
            <p className="text-[10px] text-slate-500 uppercase mb-1">Sức mạnh phòng thủ</p>
            <p className="text-lg font-bold text-blue-400">{formatNumber(result.defEffectivePower)}</p>
            <p className="text-[10px] text-slate-500 mt-1">Thiệt hại ước tính: <span className="text-blue-400">{formatNumber(result.defLosses)}</span></p>
          </div>
        </div>

        <p className="text-[10px] text-slate-600 mt-3 text-center">
          * Mô phỏng mang tính tham khảo. Nhiều yếu tố khác ảnh hưởng kết quả thực tế (hero, buff, terrain).
        </p>
      </div>
    </div>
  );
}

// ===== BUILD PLANNER =====
function BuildPlanner() {
  const [targetHQ, setTargetHQ] = useState(25);
  const [currentHQ, setCurrentHQ] = useState(15);

  const plan = useMemo(() => {
    return BUILDINGS.map((b) => {
      // HQ can only go to targetHQ, other buildings max = currentHQ or targetHQ
      const fromLevel = b.id === "hq" ? currentHQ : Math.min(currentHQ, b.maxLevel);
      const toLevel = b.id === "hq" ? targetHQ : Math.min(targetHQ, b.maxLevel);
      
      // Time increases exponentially with level
      // baseTime * level^1.5
      let totalTime = 0;
      for (let lv = fromLevel + 1; lv <= toLevel; lv++) {
        totalTime += b.baseTime * Math.pow(lv, 1.5);
      }

      return {
        ...b,
        fromLevel,
        toLevel,
        totalTime,
      };
    }).filter((b) => b.toLevel > b.fromLevel);
  }, [currentHQ, targetHQ]);

  const totalTime = plan.reduce((sum, b) => sum + b.totalTime, 0);
  const sortedPlan = [...plan].sort((a, b) => {
    const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
    return priorityOrder[a.priority as keyof typeof priorityOrder] - priorityOrder[b.priority as keyof typeof priorityOrder];
  });

  return (
    <div className="space-y-5">
      {/* HQ Level Input */}
      <div className="p-4 rounded-2xl glass space-y-4">
        <div>
          <label className="text-xs text-slate-400 font-medium uppercase tracking-wide mb-2 block">
            HQ hiện tại: <span className="text-orange-400 font-bold">Lv.{currentHQ}</span>
          </label>
          <input type="range" min={1} max={29} value={currentHQ} onChange={(e) => setCurrentHQ(Number(e.target.value))} className="w-full accent-orange-500" />
        </div>
        <div>
          <label className="text-xs text-slate-400 font-medium uppercase tracking-wide mb-2 block">
            Mục tiêu HQ: <span className="text-orange-400 font-bold">Lv.{targetHQ}</span>
          </label>
          <input type="range" min={2} max={30} value={targetHQ} onChange={(e) => setTargetHQ(Number(e.target.value))} className="w-full accent-orange-500" />
        </div>
      </div>

      {/* Total Time */}
      <div className="p-5 rounded-2xl bg-gradient-to-br from-orange-500/10 to-red-500/5 border border-orange-500/20">
        <div className="flex items-center gap-2 mb-2">
          <Clock className="w-4 h-4 text-orange-400" />
          <span className="text-xs font-medium uppercase tracking-wide text-orange-400">
            Tổng thời gian build
          </span>
        </div>
        <div className="text-4xl font-black text-white">
          {formatHours(totalTime)}
        </div>
        <div className="text-sm text-slate-400 mt-1">
          Từ HQ Lv.{currentHQ} → Lv.{targetHQ}
        </div>
      </div>

      {/* Build Order */}
      <div className="p-4 rounded-2xl glass">
        <h3 className="text-xs font-bold uppercase tracking-wide text-slate-300 mb-3">
          📋 Thứ tự ưu tiên
        </h3>
        <div className="space-y-2">
          {sortedPlan.map((b, i) => (
            <div key={b.id} className="flex items-center gap-3 p-3 rounded-xl bg-white/5">
              <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-base">
                {b.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="font-medium text-sm">{b.label}</h4>
                  <span className={`px-1.5 py-0.5 rounded text-[8px] font-bold uppercase ${
                    b.priority === "critical" ? "bg-red-500/20 text-red-400" :
                    b.priority === "high" ? "bg-orange-500/20 text-orange-400" :
                    b.priority === "medium" ? "bg-blue-500/20 text-blue-400" :
                    "bg-slate-500/20 text-slate-400"
                  }`}>
                    {b.priority}
                  </span>
                </div>
                <p className="text-[10px] text-slate-500">
                  Lv.{b.fromLevel} → Lv.{b.toLevel} · {formatHours(b.totalTime)}
                </p>
              </div>
              <span className="text-xs font-bold text-slate-600">#{i + 1}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Tips */}
      <div className="p-4 rounded-2xl glass">
        <h3 className="text-xs font-bold uppercase tracking-wide text-slate-300 mb-2">
          💡 Mẹo build
        </h3>
        <ul className="space-y-1.5 text-xs text-slate-400">
          <li>• Luôn upgrade HQ trước — nó mở khóa level tối đa cho building khác</li>
          <li>• Wall và Barracks ưu tiên sau HQ để boost defense</li>
          <li>• Phòng nghiên cứu upgrade sớm để unlock tech mạnh</li>
          <li>• Resource buildings upgrade song song khi có builder rảnh</li>
          <li>• Dùng speedup building cho HQ, để builder tự chạy cho building thấp</li>
        </ul>
      </div>
    </div>
  );
}
