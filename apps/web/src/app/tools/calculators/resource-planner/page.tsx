"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  Package,
  Clock,
  Zap,
  Wheat,
  Fuel,
  Hammer,
  Coins,
  Download,
  Upload,
  RefreshCw,
} from "lucide-react";

// ===== TYPES =====
type ResourceType = "food" | "oil" | "iron" | "steel";
type CalcMode = "gather" | "spend" | "balance";

// ===== CONFIG =====
const RESOURCES: Record<ResourceType, { label: string; icon: typeof Wheat; color: string; bgColor: string }> = {
  food: { label: "Food", icon: Wheat, color: "text-green-400", bgColor: "bg-green-500/10" },
  oil: { label: "Oil", icon: Fuel, color: "text-yellow-400", bgColor: "bg-yellow-500/10" },
  iron: { label: "Iron", icon: Hammer, color: "text-blue-400", bgColor: "bg-blue-500/10" },
  steel: { label: "Steel", icon: Coins, color: "text-purple-400", bgColor: "bg-purple-500/10" },
};

const GATHER_RATES = {
  // per hour per APC tier
  t1: { food: 5000, oil: 3000, iron: 2000, steel: 500 },
  t5: { food: 25000, oil: 18000, iron: 12000, steel: 3000 },
  t7: { food: 50000, oil: 35000, iron: 25000, steel: 8000 },
  t9: { food: 100000, oil: 75000, iron: 50000, steel: 18000 },
  t10: { food: 150000, oil: 110000, iron: 80000, steel: 30000 },
};

const TROOP_COSTS = {
  t8: { food: 2000, oil: 1500, iron: 1000, steel: 100, time: 0.08 },
  t9: { food: 3500, oil: 2500, iron: 1800, steel: 200, time: 0.15 },
  t10: { food: 6000, oil: 4000, iron: 3000, steel: 400, time: 0.25 },
};

function formatNum(n: number): string {
  if (n >= 1_000_000_000) return (n / 1_000_000_000).toFixed(2) + "B";
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(2) + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(1) + "K";
  return Math.round(n).toLocaleString();
}

function formatHours(h: number): string {
  if (h < 1) return `${Math.round(h * 60)}m`;
  if (h < 24) return `${h.toFixed(1)}h`;
  const d = Math.floor(h / 24);
  return `${d}d ${Math.round(h % 24)}h`;
}

// ===== MAIN =====
export default function ResourcePlannerPage() {
  const [mode, setMode] = useState<CalcMode>("gather");
  const [apcTier, setApcTier] = useState("t7");
  const [apcCount, setApcCount] = useState(3);
  const [gatherHours, setGatherHours] = useState(8);
  const [troopTier, setTroopTier] = useState("t9");
  const [troopCount, setTroopCount] = useState(1000);

  // Calculate gathering
  const gatherResult = useMemo(() => {
    const rates = GATHER_RATES[apcTier as keyof typeof GATHER_RATES] || GATHER_RATES.t7;
    const multiplier = apcCount * gatherHours;
    return {
      food: rates.food * multiplier,
      oil: rates.oil * multiplier,
      iron: rates.iron * multiplier,
      steel: rates.steel * multiplier,
    };
  }, [apcTier, apcCount, gatherHours]);

  // Calculate troop costs
  const troopResult = useMemo(() => {
    const cost = TROOP_COSTS[troopTier as keyof typeof TROOP_COSTS] || TROOP_COSTS.t9;
    return {
      food: cost.food * troopCount,
      oil: cost.oil * troopCount,
      iron: cost.iron * troopCount,
      steel: cost.steel * troopCount,
      time: cost.time * troopCount,
    };
  }, [troopTier, troopCount]);

  // Balance: how many troops can I train with gathered resources?
  const balanceResult = useMemo(() => {
    const cost = TROOP_COSTS[troopTier as keyof typeof TROOP_COSTS] || TROOP_COSTS.t9;
    const limiting = Math.min(
      Math.floor(gatherResult.food / cost.food),
      Math.floor(gatherResult.oil / cost.oil),
      Math.floor(gatherResult.iron / cost.iron),
      Math.floor(gatherResult.steel / cost.steel),
    );
    const limitingResource = (() => {
      if (limiting === Math.floor(gatherResult.food / cost.food)) return "food";
      if (limiting === Math.floor(gatherResult.oil / cost.oil)) return "oil";
      if (limiting === Math.floor(gatherResult.iron / cost.iron)) return "iron";
      return "steel";
    })();
    return {
      maxTroops: Math.max(0, limiting),
      limitingResource: limitingResource as ResourceType,
      totalTime: limiting * cost.time,
    };
  }, [gatherResult, troopTier]);

  return (
    <div className="min-h-screen px-4 py-6">
      <Link href="/tools/calculators/advanced" className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-orange-500 transition-colors mb-3">
        <ChevronLeft className="w-4 h-4" />
        C�ng c? n�ng cao
      </Link>

      <div className="flex items-center gap-2 mb-1">
        <Package className="w-6 h-6 text-green-400" />
        <h1 className="text-2xl font-bold">L?p k? ho?ch t�i nguy�n</h1>
      </div>
      <p className="text-slate-400 text-sm mb-5">
        Kế hoạch tài nguyên và troop training
      </p>

      {/* Mode Tabs */}
      <div className="flex gap-1 p-1 rounded-2xl glass mb-6">
        {([
          { id: "gather", label: "Gather", icon: Upload },
          { id: "spend", label: "Train", icon: Download },
          { id: "balance", label: "Balance", icon: RefreshCw },
        ] as { id: CalcMode; label: string; icon: typeof Upload }[]).map((t) => (
          <button
            key={t.id}
            onClick={() => setMode(t.id)}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
              mode === t.id ? "bg-green-500 text-white shadow-lg shadow-green-500/20" : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
            }`}
          >
            <t.icon className="w-4 h-4" />
            {t.label}
          </button>
        ))}
      </div>

      {mode === "gather" && (
        <div className="space-y-5">
          {/* APC Setup */}
          <div className="p-4 rounded-2xl glass space-y-4">
            <div>
              <label className="text-xs text-slate-400 font-medium uppercase tracking-wide mb-2 block">
                Cấp APC: <span className="text-green-400 font-bold">T{apcTier.slice(1)}</span>
              </label>
              <div className="flex gap-2">
                {[1, 5, 7, 9, 10].map((t) => (
                  <button
                    key={t}
                    onClick={() => setApcTier(`t${t}`)}
                    className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                      apcTier === `t${t}` ? "bg-green-500 text-white" : "bg-white/5 text-slate-400 border border-white/10"
                    }`}
                  >
                    T{t}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[10px] text-slate-400 uppercase">Số APC</label>
                <input
                  type="number"
                  value={apcCount}
                  onChange={(e) => setApcCount(Math.max(1, Number(e.target.value)))}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-lg font-bold text-white outline-none mt-1"
                  min={1}
                  max={5}
                />
              </div>
              <div>
                <label className="text-[10px] text-slate-400 uppercase">Giờ gather</label>
                <input
                  type="number"
                  value={gatherHours}
                  onChange={(e) => setGatherHours(Math.max(1, Number(e.target.value)))}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-lg font-bold text-white outline-none mt-1"
                  min={1}
                  max={48}
                />
              </div>
            </div>
          </div>

          {/* Result */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-green-500/10 to-emerald-500/5 border border-green-500/20">
            <div className="flex items-center gap-2 mb-3">
              <Package className="w-4 h-4 text-green-400" />
              <span className="text-xs font-medium uppercase tracking-wide text-green-400">
                Tổng tài nguyên thu được
              </span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {(Object.keys(gatherResult) as ResourceType[]).map((key) => {
                const res = RESOURCES[key];
                const Icon = res.icon;
                return (
                  <div key={key} className={`p-3 rounded-xl ${res.bgColor}`}>
                    <div className="flex items-center gap-2 mb-1">
                      <Icon className={`w-4 h-4 ${res.color}`} />
                      <span className="text-[10px] text-slate-400 uppercase">{res.label}</span>
                    </div>
                    <p className={`text-xl font-bold ${res.color}`}>{formatNum(gatherResult[key])}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {mode === "spend" && (
        <div className="space-y-5">
          {/* Troop Setup */}
          <div className="p-4 rounded-2xl glass space-y-4">
            <div>
              <label className="text-xs text-slate-400 font-medium uppercase tracking-wide mb-2 block">
                Troop Tier
              </label>
              <div className="flex gap-2">
                {[8, 9, 10].map((t) => (
                  <button
                    key={t}
                    onClick={() => setTroopTier(`t${t}`)}
                    className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                      troopTier === `t${t}` ? "bg-orange-500 text-white" : "bg-white/5 text-slate-400 border border-white/10"
                    }`}
                  >
                    T{t}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-[10px] text-slate-400 uppercase">Số lượng troop</label>
              <input
                type="number"
                value={troopCount}
                onChange={(e) => setTroopCount(Math.max(0, Number(e.target.value)))}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-lg font-bold text-white outline-none mt-1"
                min={0}
              />
              <div className="flex gap-2 mt-2">
                {[100, 500, 1000, 5000].map((n) => (
                  <button key={n} onClick={() => setTroopCount(n)} className="px-2.5 py-1 rounded-lg bg-white/5 text-[10px] text-slate-400 hover:bg-white/10">
                    {n}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Result */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-orange-500/10 to-red-500/5 border border-orange-500/20">
            <div className="flex items-center gap-2 mb-3">
              <Zap className="w-4 h-4 text-orange-400" />
              <span className="text-xs font-medium uppercase tracking-wide text-orange-400">
                Chi phí train {formatNum(troopCount)} T{troopTier.slice(1)}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-3 mb-3">
              {(Object.keys(TROOP_COSTS.t9) as (keyof typeof TROOP_COSTS.t9)[]).filter(k => k !== "time").map((key) => {
                const res = RESOURCES[key as ResourceType];
                const Icon = res.icon;
                return (
                  <div key={key} className={`p-3 rounded-xl ${res.bgColor}`}>
                    <div className="flex items-center gap-2 mb-1">
                      <Icon className={`w-4 h-4 ${res.color}`} />
                      <span className="text-[10px] text-slate-400 uppercase">{res.label}</span>
                    </div>
                    <p className={`text-xl font-bold ${res.color}`}>{formatNum(troopResult[key as ResourceType])}</p>
                  </div>
                );
              })}
            </div>
            {/* Time */}
            <div className="p-3 rounded-xl bg-white/5 flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-400" />
              <span className="text-xs text-slate-400">Thời gian train:</span>
              <span className="text-sm font-bold text-blue-400 font-mono">{formatHours(troopResult.time)}</span>
            </div>
          </div>
        </div>
      )}

      {mode === "balance" && (
        <div className="space-y-5">
          <div className="p-4 rounded-2xl glass">
            <div className="flex items-center gap-2 mb-3">
              <RefreshCw className="w-4 h-4 text-cyan-400" />
              <h3 className="text-xs font-bold uppercase tracking-wide text-slate-300">
                Cân bằng Gather ↔ Train
              </h3>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              Với <span className="text-green-400 font-bold">{apcCount} APC T{apcTier.slice(1)}</span> gather trong{" "}
              <span className="text-green-400 font-bold">{gatherHours}h</span>, bạn có thể train:
            </p>

            {/* Big Result */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-cyan-500/15 to-blue-500/5 border border-cyan-500/20 text-center">
              <p className="text-5xl font-black text-cyan-400 mb-1">{formatNum(balanceResult.maxTroops)}</p>
              <p className="text-sm text-slate-400">T{troopTier.slice(1)} troops</p>
              <p className="text-[10px] text-slate-500 mt-2">
                ⏱ {formatHours(balanceResult.totalTime)} train time
              </p>
            </div>

            {/* Limiting Resource */}
            {balanceResult.maxTroops > 0 && (
              <div className="mt-3 p-3 rounded-xl bg-yellow-500/10 border border-yellow-500/20">
                <p className="text-xs text-yellow-400 text-center">
                  ⚠️ Tài nguyên giới hạn:{" "}
                  <span className="font-bold">{RESOURCES[balanceResult.limitingResource].label}</span>
                </p>
              </div>
            )}

            {/* Quick Adjust */}
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div>
                <label className="text-[10px] text-slate-400 uppercase">Cấp APC</label>
                <div className="flex gap-1 mt-1">
                  {[1, 5, 7, 9, 10].map((t) => (
                    <button
                      key={t}
                      onClick={() => setApcTier(`t${t}`)}
                      className={`flex-1 py-1.5 rounded text-xs font-medium ${apcTier === `t${t}` ? "bg-green-500 text-white" : "bg-white/5 text-slate-400"}`}
                    >
                      T{t}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-[10px] text-slate-400 uppercase">Cấp đào tạo</label>
                <div className="flex gap-1 mt-1">
                  {[8, 9, 10].map((t) => (
                    <button
                      key={t}
                      onClick={() => setTroopTier(`t${t}`)}
                      className={`flex-1 py-1.5 rounded text-xs font-medium ${troopTier === `t${t}` ? "bg-orange-500 text-white" : "bg-white/5 text-slate-400"}`}
                    >
                      T{t}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Tips */}
          <div className="p-4 rounded-2xl glass">
            <h3 className="text-xs font-bold uppercase tracking-wide text-slate-300 mb-2">💡 Mẹo tối ưu</h3>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li className="flex items-start gap-1.5"><span className="text-green-400">▲</span> Upgrade APC tier để gather nhanh hơn đáng kể</li>
              <li className="flex items-start gap-1.5"><span className="text-green-400">▲</span> Gather steel là khó nhất — tập trung vào steel nodes</li>
              <li className="flex items-start gap-1.5"><span className="text-green-400">▲</span> Alliance gathering buff stack với event x2</li>
              <li className="flex items-start gap-1.5"><span className="text-orange-400">▸</span> Đừng train troop nếu không đủ defense</li>
              <li className="flex items-start gap-1.5"><span className="text-orange-400">▸</span> Balance giữa train troop và upgrade building</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
