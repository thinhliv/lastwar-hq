"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  Gift,
  MapPin,
  Clock,
  Star,
  Package,
  Pickaxe,
  AlertTriangle,
} from "lucide-react";

// ===== TREASURE TIERS =====
const TREASURE_TIERS = [
  {
    id: "common",
    name: "Common",
    color: "text-slate-300",
    bgColor: "bg-slate-500/10",
    borderColor: "border-slate-500/20",
    icon: "📦",
    digTime: 30, // minutes
    rewards: { resources: "10K-50K", speedup: "1-3h", shards: "—", special: "Hero EXP (S)" },
    mapPiecesNeeded: 1,
    rarity: "60%",
  },
  {
    id: "rare",
    name: "Rare",
    color: "text-blue-400",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/20",
    icon: "💎",
    digTime: 60,
    rewards: { resources: "50K-200K", speedup: "8-24h", shards: "SR random", special: "Hero EXP (L)" },
    mapPiecesNeeded: 3,
    rarity: "25%",
  },
  {
    id: "epic",
    name: "Epic",
    color: "text-purple-400",
    bgColor: "bg-purple-500/10",
    borderColor: "border-purple-500/20",
    icon: "🔮",
    digTime: 120,
    rewards: { resources: "200K-500K", speedup: "24h+", shards: "SSR random", special: "Premium summon" },
    mapPiecesNeeded: 5,
    rarity: "12%",
  },
  {
    id: "legendary",
    name: "Legendary",
    color: "text-yellow-400",
    bgColor: "bg-yellow-500/10",
    borderColor: "border-yellow-500/20",
    icon: "👑",
    digTime: 180,
    rewards: { resources: "500K+", speedup: "7d+", shards: "SSR choice", special: "Exclusive title" },
    mapPiecesNeeded: 10,
    rarity: "3%",
  },
];

const MAP_PIECE_SOURCES = [
  { source: "Restricted Area Boss", pieces: "1-2", chance: "30%", icon: "⚔️" },
  { source: "Daily Quests", pieces: "1", chance: "100%", icon: "📋" },
  { source: "Event Store", pieces: "3-5", chance: "—", icon: "🛒" },
  { source: "Alliance Rally", pieces: "1-3", chance: "20%", icon: "🛡️" },
  { source: "World Map Nodes", pieces: "1", chance: "10%", icon: "🗺️" },
];

function formatTime(min: number): string {
  if (min < 60) return `${min}m`;
  const h = Math.floor(min / 60);
  const m = min % 60;
  return `${h}h ${m}m`;
}

// ===== MAIN =====
export default function DesertTreasurePage() {
  const [mapPieces, setMapPieces] = useState(15);
  const [apcAvailable, setApcAvailable] = useState(2);

  const plan = useMemo(() => {
    // Greedy: best value per piece
    const tiers = [...TREASURE_TIERS].reverse(); // legendary first
    let remaining = mapPieces;
    let apcBusy = 0;
    const digs: { tier: typeof TREASURE_TIERS[0]; count: number }[] = [];

    for (const tier of tiers) {
      const maxByPieces = Math.floor(remaining / tier.mapPiecesNeeded);
      const maxByApc = Math.max(0, apcAvailable - apcBusy);
      const count = Math.min(maxByPieces, maxByApc);
      if (count > 0) {
        digs.push({ tier, count });
        remaining -= count * tier.mapPiecesNeeded;
        apcBusy += count;
      }
    }

    // If still APC available, do lower tiers
    if (apcBusy < apcAvailable && remaining > 0) {
      for (const tier of [...TREASURE_TIERS]) {
        while (remaining >= tier.mapPiecesNeeded && apcBusy < apcAvailable) {
          const existing = digs.find((d) => d.tier.id === tier.id);
          if (existing) existing.count++;
          else digs.push({ tier, count: 1 });
          remaining -= tier.mapPiecesNeeded;
          apcBusy++;
        }
      }
    }

    const totalTime = digs.reduce((sum, d) => sum + d.tier.digTime * d.count, 0);
    return { digs, remaining, totalTime };
  }, [mapPieces, apcAvailable]);

  return (
    <div className="min-h-screen px-4 py-6">
      <Link href="/tools/events" className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-orange-500 transition-colors mb-3">
        <ChevronLeft className="w-4 h-4" />
        Events
      </Link>

      <div className="flex items-center gap-2 mb-1">
        <Gift className="w-6 h-6 text-purple-400" />
        <h1 className="text-2xl font-bold">Desert Treasure</h1>
      </div>
      <p className="text-slate-400 text-sm mb-5">
        Tối ưu hóa săn kho báu sa mạc
      </p>

      {/* Input */}
      <div className="p-4 rounded-2xl glass mb-4 space-y-3">
        <div>
          <label className="text-xs text-slate-400 font-medium uppercase tracking-wide mb-2 block">
            Map Pieces: <span className="text-purple-400 font-bold">{mapPieces}</span>
          </label>
          <input
            type="range"
            min={0}
            max={50}
            value={mapPieces}
            onChange={(e) => setMapPieces(Number(e.target.value))}
            className="w-full accent-purple-500"
          />
        </div>
        <div>
          <label className="text-xs text-slate-400 font-medium uppercase tracking-wide mb-2 block">
            APC Available: <span className="text-purple-400 font-bold">{apcAvailable}</span>
          </label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                onClick={() => setApcAvailable(n)}
                className={`flex-1 py-2 rounded-lg text-sm font-medium ${
                  apcAvailable === n ? "bg-purple-500 text-white" : "bg-white/5 text-slate-400"
                }`}
              >
                {n}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Optimal Plan */}
      <div className="p-5 rounded-2xl bg-gradient-to-br from-purple-500/10 to-pink-500/5 border border-purple-500/20 mb-4">
        <div className="flex items-center gap-2 mb-3">
          <MapPin className="w-4 h-4 text-purple-400" />
          <span className="text-xs font-medium uppercase tracking-wide text-purple-400">
            Kế hoạch đào tối ưu
          </span>
        </div>
        {plan.digs.length === 0 ? (
          <p className="text-sm text-slate-400 text-center py-4">
            Không đủ map pieces hoặc APC. Thu thập thêm!
          </p>
        ) : (
          <>
            <div className="space-y-2 mb-3">
              {plan.digs.map(({ tier, count }) => (
                <div key={tier.id} className={`flex items-center gap-3 p-3 rounded-xl ${tier.bgColor} ${tier.borderColor} border`}>
                  <span className="text-2xl">{tier.icon}</span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className={`font-bold text-sm ${tier.color}`}>{tier.name}</h4>
                      <span className="text-[10px] text-slate-500">x{count}</span>
                    </div>
                    <p className="text-[10px] text-slate-500">
                      {tier.mapPiecesNeeded * count} pieces · {formatTime(tier.digTime * count)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-slate-500">{tier.rewards.resources}</p>
                    <p className="text-[10px] text-slate-500">{tier.rewards.shards}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-white/5">
              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <Clock className="w-3.5 h-3.5" />
                Total: <span className="font-bold text-purple-400">{formatTime(plan.totalTime)}</span>
              </div>
              {plan.remaining > 0 && (
                <span className="text-[10px] text-yellow-500">
                  Còn dư {plan.remaining} pieces
                </span>
              )}
            </div>
          </>
        )}
      </div>

      {/* Reward Tiers Reference */}
      <div className="p-4 rounded-2xl glass mb-4">
        <h3 className="text-xs font-bold uppercase tracking-wide text-slate-300 mb-3">
          Bảng phần thưởng theo tier
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-white/10">
                <th className="px-2 py-2 text-left font-bold text-slate-300">Tier</th>
                <th className="px-2 py-2 text-left font-bold text-slate-300">Resources</th>
                <th className="px-2 py-2 text-left font-bold text-slate-300">Speedup</th>
                <th className="px-2 py-2 text-left font-bold text-slate-300">Shards</th>
                <th className="px-2 py-2 text-right font-bold text-slate-300">Tỉ lệ</th>
              </tr>
            </thead>
            <tbody>
              {TREASURE_TIERS.map((tier) => (
                <tr key={tier.id} className="border-b border-white/5">
                  <td className="px-2 py-2">
                    <span className={`${tier.color} font-medium`}>{tier.icon} {tier.name}</span>
                  </td>
                  <td className="px-2 py-2 text-slate-400">{tier.rewards.resources}</td>
                  <td className="px-2 py-2 text-slate-400">{tier.rewards.speedup}</td>
                  <td className="px-2 py-2 text-slate-400">{tier.rewards.shards}</td>
                  <td className="px-2 py-2 text-right text-slate-500">{tier.rarity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Map Piece Sources */}
      <div className="p-4 rounded-2xl glass mb-4">
        <div className="flex items-center gap-2 mb-3">
          <Pickaxe className="w-4 h-4 text-orange-400" />
          <h3 className="text-xs font-bold uppercase tracking-wide text-slate-300">
            Nguồn thu Map Pieces
          </h3>
        </div>
        <div className="space-y-2">
          {MAP_PIECE_SOURCES.map((src) => (
            <div key={src.source} className="flex items-center gap-3 p-2 rounded-lg bg-white/5">
              <span className="text-base">{src.icon}</span>
              <span className="text-xs text-slate-300 flex-1">{src.source}</span>
              <span className="text-[10px] text-orange-400 font-mono">{src.pieces} pcs</span>
              <span className="text-[10px] text-slate-500">{src.chance}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Warning */}
      <div className="p-3 rounded-xl bg-yellow-500/5 border border-yellow-500/10">
        <div className="flex items-start gap-2">
          <AlertTriangle className="w-3.5 h-3.5 text-yellow-400 flex-shrink-0 mt-0.5" />
          <p className="text-[10px] text-slate-400 leading-relaxed">
            Tier hiếm hơn có phần thưởng tốt hơn nhưng cần nhiều map pieces hơn.
            Nếu ít pieces, ưu tiên Common/Rare. Nếu nhiều pieces, save cho Epic/Legendary.
          </p>
        </div>
      </div>
    </div>
  );
}
