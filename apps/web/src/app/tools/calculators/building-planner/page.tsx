"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  Home,
  Clock,
  Zap,
  Wheat,
  Fuel,
  Hammer,
  Coins,
  TrendingUp,
  AlertCircle,
} from "lucide-react";

type BuildingType = "hq" | "barracks" | "factory" | "warehouse" | "hospital" | "lab" | "wall" | "radar";

const BUILDINGS: Record<BuildingType, { name: string; icon: string; desc: string; color: string }> = {
  hq: { name: "Headquarters", icon: "🏛️", desc: "Nhà chính — mở khóa mọi thứ", color: "text-orange-400" },
  barracks: { name: "Barracks", icon: "⚔️", desc: "Train bộ binh", color: "text-red-400" },
  factory: { name: "Factory", icon: "🏭", desc: "Train xe cơ giới", color: "text-blue-400" },
  warehouse: { name: "Warehouse", icon: "📦", desc: "Bảo vệ tài nguyên", color: "text-green-400" },
  hospital: { name: "Hospital", icon: "🏥", desc: "Chữa thương troop", color: "text-pink-400" },
  lab: { name: "Research Lab", icon: "🔬", desc: "Nghiên cứu công nghệ", color: "text-purple-400" },
  wall: { name: "City Wall", icon: "🧱", desc: "Phòng thủ thành phố", color: "text-yellow-400" },
  radar: { name: "Radar Station", icon: "📡", desc: "Phát hiện enemy", color: "text-cyan-400" },
};

// Base upgrade cost multipliers per level
const LEVEL_DATA: Record<number, { resource: number; time: number; speed: number }> = {
  1: { resource: 1000, time: 0.5, speed: 0 },
  5: { resource: 5000, time: 2, speed: 0 },
  10: { resource: 20000, time: 8, speed: 0 },
  15: { resource: 60000, time: 24, speed: 0 },
  20: { resource: 150000, time: 72, speed: 0 },
  25: { resource: 400000, time: 168, speed: 0 },
  30: { resource: 1000000, time: 360, speed: 0 },
  35: { resource: 2500000, time: 720, speed: 0 },
  40: { resource: 6000000, time: 1440, speed: 0 },
};

function interpolateLevel(level: number) {
  const keys = Object.keys(LEVEL_DATA).map(Number).sort((a, b) => a - b);
  let lower = keys[0];
  let upper = keys[keys.length - 1];
  for (let i = 0; i < keys.length - 1; i++) {
    if (level >= keys[i] && level <= keys[i + 1]) {
      lower = keys[i];
      upper = keys[i + 1];
      break;
    }
  }
  const l = LEVEL_DATA[lower];
  const u = LEVEL_DATA[upper];
  const t = (level - lower) / (upper - lower || 1);
  return {
    resource: Math.round(l.resource + (u.resource - l.resource) * t),
    time: l.time + (u.time - l.time) * t,
  };
}

function formatNum(n: number): string {
  if (n >= 1_000_000_000) return (n / 1_000_000_000).toFixed(2) + "B";
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(2) + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(1) + "K";
  return Math.round(n).toLocaleString();
}

function formatTime(h: number): string {
  if (h < 1) return `${Math.round(h * 60)}m`;
  if (h < 24) return `${h.toFixed(1)}h`;
  const d = Math.floor(h / 24);
  return `${d}d ${Math.round(h % 24)}h`;
}

export default function BuildingPlannerPage() {
  const [building, setBuilding] = useState<BuildingType>("hq");
  const [currentLevel, setCurrentLevel] = useState(20);
  const [targetLevel, setTargetLevel] = useState(25);
  const [allianceHelp, setAllianceHelp] = useState(true);
  const [hasSpeedBuff, setHasSpeedBuff] = useState(false);

  const result = useMemo(() => {
    let totalFood = 0, totalOil = 0, totalIron = 0, totalSteel = 0, totalTime = 0;
    const breakdown: { level: number; resource: number; time: number }[] = [];

    for (let lv = currentLevel + 1; lv <= targetLevel; lv++) {
      const data = interpolateLevel(lv);
      const buildingMult = building === "hq" ? 1.5 : building === "wall" ? 0.8 : 1;
      const res = data.resource * buildingMult;
      const time = data.time * buildingMult * (allianceHelp ? 0.9 : 1) * (hasSpeedBuff ? 0.7 : 1);

      totalFood += res * 0.35;
      totalOil += res * 0.25;
      totalIron += res * 0.25;
      totalSteel += res * 0.15;
      totalTime += time;
      breakdown.push({ level: lv, resource: res, time });
    }

    return { totalFood, totalOil, totalIron, totalSteel, totalTime, breakdown };
  }, [building, currentLevel, targetLevel, allianceHelp, hasSpeedBuff]);

  const buildingInfo = BUILDINGS[building];

  return (
    <div className="min-h-screen px-4 py-6">
      <Link href="/tools/calculators/advanced" className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-orange-500 transition-colors mb-3">
        <ChevronLeft className="w-4 h-4" />
        Advanced Tools
      </Link>

      <div className="flex items-center gap-2 mb-1">
        <Home className="w-6 h-6 text-orange-400" />
        <h1 className="text-2xl font-bold">Building Planner</h1>
      </div>
      <p className="text-slate-400 text-sm mb-5">
        Tính chi phí và thời gian nâng cấp nhà
      </p>

      {/* Building Selector */}
      <div className="p-4 rounded-2xl glass mb-4">
        <label className="text-xs text-slate-400 font-medium uppercase tracking-wide mb-3 block">
          Chọn loại nhà
        </label>
        <div className="grid grid-cols-4 gap-2">
          {(Object.keys(BUILDINGS) as BuildingType[]).map((key) => {
            const b = BUILDINGS[key];
            return (
              <button
                key={key}
                onClick={() => setBuilding(key)}
                className={`flex flex-col items-center gap-1 py-2.5 rounded-xl transition-all ${
                  building === key
                    ? "bg-orange-500/20 border border-orange-500/40"
                    : "bg-white/5 border border-white/10"
                }`}
              >
                <span className="text-xl">{b.icon}</span>
                <span className={`text-[9px] font-medium ${building === key ? b.color : "text-slate-500"}`}>
                  {b.name.split(" ")[0]}
                </span>
              </button>
            );
          })}
        </div>
        <p className="text-[10px] text-slate-500 mt-2 text-center">{buildingInfo.desc}</p>
      </div>

      {/* Level Inputs */}
      <div className="p-4 rounded-2xl glass mb-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-[10px] text-slate-400 uppercase">Level hiện tại</label>
            <input
              type="number"
              value={currentLevel}
              onChange={(e) => setCurrentLevel(Math.min(39, Math.max(1, Number(e.target.value))))}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-lg font-bold text-white outline-none mt-1"
              min={1}
              max={39}
            />
          </div>
          <div>
            <label className="text-[10px] text-slate-400 uppercase">Target level</label>
            <input
              type="number"
              value={targetLevel}
              onChange={(e) => setTargetLevel(Math.min(40, Math.max(2, Number(e.target.value))))}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-lg font-bold text-white outline-none mt-1"
              min={2}
              max={40}
            />
          </div>
        </div>

        {/* Quick Level Presets */}
        <div className="flex gap-1.5 mt-3">
          {[
            { label: "10→15", from: 10, to: 15 },
            { label: "15→20", from: 15, to: 20 },
            { label: "20→25", from: 20, to: 25 },
            { label: "25→30", from: 25, to: 30 },
            { label: "30→35", from: 30, to: 35 },
          ].map((preset) => (
            <button
              key={preset.label}
              onClick={() => { setCurrentLevel(preset.from); setTargetLevel(preset.to); }}
              className="px-2 py-1 rounded-lg bg-white/5 text-[10px] text-slate-400 hover:bg-white/10"
            >
              {preset.label}
            </button>
          ))}
        </div>

        {/* Buff Toggles */}
        <div className="grid grid-cols-2 gap-2 mt-3">
          <button
            onClick={() => setAllianceHelp(!allianceHelp)}
            className={`flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs transition-all ${
              allianceHelp ? "bg-green-500/20 text-green-400 border border-green-500/30" : "bg-white/5 text-slate-500 border border-white/10"
            }`}
          >
            🛡️ Alliance Help -10%
          </button>
          <button
            onClick={() => setHasSpeedBuff(!hasSpeedBuff)}
            className={`flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs transition-all ${
              hasSpeedBuff ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30" : "bg-white/5 text-slate-500 border border-white/10"
            }`}
          >
            ⚡ Speed Buff -30%
          </button>
        </div>
      </div>

      {/* Result */}
      {targetLevel <= currentLevel ? (
        <div className="p-6 rounded-2xl bg-red-500/5 border border-red-500/10 text-center">
          <AlertCircle className="w-6 h-6 text-red-400 mx-auto mb-2" />
          <p className="text-sm text-red-400">Target level phải cao hơn level hiện tại!</p>
        </div>
      ) : (
        <>
          <div className="p-5 rounded-2xl bg-gradient-to-br from-orange-500/10 to-red-500/5 border border-orange-500/20 mb-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">{buildingInfo.icon}</span>
              <span className="text-xs font-medium uppercase tracking-wide text-orange-400">
                {buildingInfo.name}: Lv {currentLevel} → {targetLevel}
              </span>
            </div>

            {/* Resource Costs */}
            <div className="grid grid-cols-2 gap-2 mb-3">
              <div className="p-2.5 rounded-xl bg-green-500/10">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <Wheat className="w-3.5 h-3.5 text-green-400" />
                  <span className="text-[10px] text-slate-500 uppercase">Food</span>
                </div>
                <p className="text-lg font-bold text-green-400">{formatNum(result.totalFood)}</p>
              </div>
              <div className="p-2.5 rounded-xl bg-yellow-500/10">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <Fuel className="w-3.5 h-3.5 text-yellow-400" />
                  <span className="text-[10px] text-slate-500 uppercase">Oil</span>
                </div>
                <p className="text-lg font-bold text-yellow-400">{formatNum(result.totalOil)}</p>
              </div>
              <div className="p-2.5 rounded-xl bg-blue-500/10">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <Hammer className="w-3.5 h-3.5 text-blue-400" />
                  <span className="text-[10px] text-slate-500 uppercase">Iron</span>
                </div>
                <p className="text-lg font-bold text-blue-400">{formatNum(result.totalIron)}</p>
              </div>
              <div className="p-2.5 rounded-xl bg-purple-500/10">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <Coins className="w-3.5 h-3.5 text-purple-400" />
                  <span className="text-[10px] text-slate-500 uppercase">Steel</span>
                </div>
                <p className="text-lg font-bold text-purple-400">{formatNum(result.totalSteel)}</p>
              </div>
            </div>

            {/* Total Time */}
            <div className="p-3 rounded-xl bg-white/5 flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-400" />
              <span className="text-xs text-slate-400">Tổng thời gian:</span>
              <span className="text-sm font-bold text-blue-400 font-mono">{formatTime(result.totalTime)}</span>
            </div>
          </div>

          {/* Breakdown Chart */}
          <div className="p-4 rounded-2xl glass mb-4">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="w-4 h-4 text-cyan-400" />
              <h3 className="text-xs font-bold uppercase tracking-wide text-slate-300">
                Chi tiết từng level
              </h3>
            </div>
            <div className="space-y-1.5 max-h-64 overflow-y-auto">
              {result.breakdown.map((b) => (
                <div key={b.level} className="flex items-center gap-2 text-xs">
                  <span className="text-slate-500 w-8">Lv {b.level}</span>
                  <div className="flex-1 h-5 rounded bg-white/5 overflow-hidden">
                    <div
                      className="h-full rounded bg-gradient-to-r from-orange-500/40 to-red-500/40"
                      style={{ width: `${(b.resource / result.breakdown[result.breakdown.length - 1].resource) * 100}%` }}
                    />
                  </div>
                  <span className="text-[10px] font-mono text-slate-400 w-14 text-right">{formatNum(b.resource)}</span>
                  <span className="text-[10px] font-mono text-blue-400 w-12 text-right">{formatTime(b.time)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Priority Tips */}
          <div className="p-4 rounded-2xl glass">
            <h3 className="text-xs font-bold uppercase tracking-wide text-slate-300 mb-2">💡 Thứ tự ưu tiên upgrade</h3>
            <div className="space-y-1.5 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <span className="text-orange-400 font-bold">1.</span>
                <span><b className="text-slate-300">HQ</b> — Mở khóa level khác. Luôn max đầu tiên!</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-orange-400 font-bold">2.</span>
                <span><b className="text-slate-300">Barracks/Factory</b> — Train troop mạnh hơn</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-orange-400 font-bold">3.</span>
                <span><b className="text-slate-300">Research Lab</b> — Tech boost dài hạn</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-orange-400 font-bold">4.</span>
                <span><b className="text-slate-300">Warehouse</b> — Bảo vệ tài nguyên khi bị attack</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-orange-400 font-bold">5.</span>
                <span><b className="text-slate-300">Hospital</b> — Giảm loss troop khi chiến đấu</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-orange-400 font-bold">6.</span>
                <span><b className="text-slate-300">Wall/Radar</b> — Phòng thủ + info, upgrade sau</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
