"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  Star,
  TrendingUp,
  TrendingDown,
  Minus,
  Filter,
  Search,
} from "lucide-react";

// ===== HERO DATA =====
interface Hero {
  id: number;
  name: string;
  title: string;
  rarity: "SSR" | "SR" | "R";
  role: "Attack" | "Defense" | "Support" | "Hybrid";
  tier: "S+" | "S" | "A" | "B" | "C";
  bestAt: "PvE" | "PvP" | "Both";
  synergy: string[];
  trend: "up" | "down" | "stable";
  notes: string;
  icon: string;
}

const HEROES: Hero[] = [
  // SSR
  { id: 1, name: "Grace", title: "The War Goddess", rarity: "SSR", role: "Support", tier: "S+", bestAt: "Both", synergy: ["Volkov", "Murphy"], trend: "up", notes: "Best buffer trong game. Buff +25% attack toàn đội. Must-have cho mọi đội hình.", icon: "⚔️" },
  { id: 2, name: "Volkov", title: "Iron Wall", rarity: "SSR", role: "Defense", tier: "S+", bestAt: "Both", synergy: ["Grace", "Freya"], trend: "stable", notes: "Tank #1. Taunt + damage reflect. Sống cực lâu với Grace buff.", icon: "🛡️" },
  { id: 3, name: "Murphy", title: "The Stunner", rarity: "SSR", role: "Attack", tier: "S", bestAt: "PvP", synergy: ["Kim", "Grace"], trend: "up", notes: "AoE stun 3s, range rộng. PvP monster. Kết hợp với burst damage = one-shot.", icon: "💥" },
  { id: 4, name: "Kim", title: "Silent Death", rarity: "SSR", role: "Attack", tier: "S", bestAt: "PvP", synergy: ["Murphy", "Grace"], trend: "stable", notes: "Single-target burst cao nhất. Cần setup từ stun/slow để tối ưu.", icon: "🗡️" },
  { id: 5, name: "Freya", title: "The Healer", rarity: "SSR", role: "Support", tier: "S", bestAt: "PvE", synergy: ["Schuyler", "Volkov"], trend: "stable", notes: "Best sustain hero. Heal 15%/turn. PvE king cho Restricted Area.", icon: "💚" },
  { id: 6, name: "Schuyler", title: "Guardian Shield", rarity: "SSR", role: "Defense", tier: "S", bestAt: "PvE", synergy: ["Freya", "Grace"], trend: "up", notes: "Shield 5000 damage, 100% uptime. Freya + Schuyler = bất tử PvE.", icon: "🛡️" },
  { id: 7, name: "Stallion", title: "Cavalry Ch? huy", rarity: "SSR", role: "Attack", tier: "A", bestAt: "PvP", synergy: ["Grace"], trend: "up", notes: "Cavalry specialist. Season 6 jungle buff làm anh ta mạnh hơn.", icon: "🐎" },
  // SR
  { id: 8, name: "Avery", title: "Rising Star", rarity: "SR", role: "Attack", tier: "A", bestAt: "Both", synergy: ["Duncan"], trend: "stable", notes: "Best F2P attacker. Dễ lấy qua events. Upgrade skill 8+ để max potential.", icon: "⭐" },
  { id: 9, name: "Duncan", title: "The Tactician", rarity: "SR", role: "Support", tier: "A", bestAt: "Both", synergy: ["Avery"], trend: "stable", notes: "Buff +15% damage cho team. Shards có sẵn trong shop. Budget Grace.", icon: "📋" },
  { id: 10, name: "Marie", title: "Siege Expert", rarity: "SR", role: "Attack", tier: "B", bestAt: "PvP", synergy: ["Duncan"], trend: "down", notes: "Tốt cho siege nhưng bị power creep. Vẫn dùng được nếu không có SSR.", icon: "🎯" },
  { id: 11, name: "Cole", title: "The Survivor", rarity: "SR", role: "Defense", tier: "B", bestAt: "PvE", synergy: ["Freya"], trend: "down", notes: "Self-heal decent nhưng bị outclass bởi Volkov/Schuyler.", icon: "🛡️" },
  // R
  { id: 12, name: "Recruit", title: "Fresh Soldier", rarity: "R", role: "Attack", tier: "C", bestAt: "PvE", synergy: [], trend: "stable", notes: "Early game filler. Thay thế ngay khi có hero tốt hơn.", icon: "👤" },
];

const TIER_ORDER: Record<string, number> = { "S+": 0, S: 1, A: 2, B: 3, C: 4 };

const TIER_COLORS: Record<string, string> = {
  "S+": "from-yellow-500/20 to-orange-500/10 border-yellow-500/30 text-yellow-400",
  S: "from-orange-500/20 to-red-500/10 border-orange-500/30 text-orange-400",
  A: "from-blue-500/20 to-cyan-500/10 border-blue-500/30 text-blue-400",
  B: "from-green-500/20 to-emerald-500/10 border-green-500/30 text-green-400",
  C: "from-slate-500/20 to-slate-600/10 border-slate-500/30 text-slate-400",
};

const RARITY_COLORS: Record<string, string> = {
  SSR: "text-yellow-400",
  SR: "text-purple-400",
  R: "text-blue-400",
};

const ROLE_ICONS: Record<string, string> = {
  Attack: "⚔️",
  Defense: "🛡️",
  Support: "💚",
  Hybrid: "🔄",
};

// ===== COMPONENT =====
export default function HeroTierListPage() {
  const [filterRarity, setFilterRarity] = useState<"Tất cả" | "SSR" | "SR" | "R">("Tất cả");
  const [filterRole, setFilterRole] = useState<"Tất cả" | "Attack" | "Defense" | "Support" | "Hybrid">("Tất cả");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return HEROES
      .filter((h) => filterRarity === "Tất cả" || h.rarity === filterRarity)
      .filter((h) => filterRole === "Tất cả" || h.role === filterRole)
      .filter((h) => !query || h.name.toLowerCase().includes(query.toLowerCase()) || h.title.toLowerCase().includes(query.toLowerCase()))
      .sort((a, b) => TIER_ORDER[a.tier] - TIER_ORDER[b.tier]);
  }, [filterRarity, filterRole, query]);

  // Group by tier
  const tierGroups = useMemo(() => {
    const groups: Record<string, Hero[]> = {};
    filtered.forEach((h) => {
      if (!groups[h.tier]) groups[h.tier] = [];
      groups[h.tier].push(h);
    });
    return Object.entries(groups).sort(([a], [b]) => TIER_ORDER[a] - TIER_ORDER[b]);
  }, [filtered]);

  return (
    <div className="min-h-screen px-4 py-6">
      <Link
        href="/tools"
        className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-orange-500 transition-colors mb-3"
      >
        <ChevronLeft className="w-4 h-4" />
        Công cụ
      </Link>

      <div className="flex items-center gap-2 mb-1">
        <Star className="w-6 h-6 text-yellow-400" />
        <h1 className="text-2xl font-bold">Bảng xếp hạng Hero</h1>
      </div>
      <p className="text-slate-400 text-sm mb-4">
        Bảng xếp hạng hero — Season 6 meta
      </p>

      {/* Search */}
      <div className="relative mb-3">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Tìm hero..."
          className="w-full pl-10 pr-4 py-2.5 rounded-xl glass text-sm text-white placeholder-slate-500 outline-none focus:border-orange-500/30"
        />
      </div>

      {/* Rarity Filter */}
      <div className="flex gap-2 mb-2">
        {(["Tất cả", "SSR", "SR", "R"] as const).map((r) => (
          <button
            key={r}
            onClick={() => setFilterRarity(r)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              filterRarity === r
                ? "bg-orange-500 text-white"
                : "bg-white/5 text-slate-400 border border-white/10 hover:bg-white/10"
            }`}
          >
            {r}
          </button>
        ))}
      </div>

      {/* Role Filter */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2 mb-4">
        {(["Tất cả", "Attack", "Defense", "Support", "Hybrid"] as const).map((r) => (
          <button
            key={r}
            onClick={() => setFilterRole(r)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
              filterRole === r
                ? "bg-blue-500 text-white"
                : "bg-white/5 text-slate-400 border border-white/10 hover:bg-white/10"
            }`}
          >
            {ROLE_ICONS[r] || "🔍"} {r}
          </button>
        ))}
      </div>

      {/* Tier Groups */}
      <div className="space-y-4">
        {tierGroups.map(([tier, heroes]) => (
          <div key={tier}>
            {/* Tier Header */}
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-gradient-to-r ${TIER_COLORS[tier]} border mb-2`}>
              <span className="font-black text-lg">{tier}</span>
              <span className="text-[10px] uppercase tracking-wide opacity-70">
                {heroes.length} hero
              </span>
            </div>

            {/* Hero Cards */}
            <div className="space-y-2">
              {heroes.map((hero) => (
                <div
                  key={hero.id}
                  className="p-3 rounded-2xl glass hover:border-orange-500/20 transition-all"
                >
                  <div className="flex items-start gap-3">
                    {/* Icon */}
                    <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-2xl flex-shrink-0">
                      {hero.icon}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <h3 className="font-bold text-sm">{hero.name}</h3>
                        <span className={`text-[10px] font-bold ${RARITY_COLORS[hero.rarity]}`}>
                          {hero.rarity}
                        </span>
                        <span className="text-[10px] text-slate-500">{ROLE_ICONS[hero.role]}</span>
                        {/* Trend */}
                        {hero.trend === "up" ? (
                          <TrendingUp className="w-3 h-3 text-green-400" />
                        ) : hero.trend === "down" ? (
                          <TrendingDown className="w-3 h-3 text-red-400" />
                        ) : (
                          <Minus className="w-3 h-3 text-slate-600" />
                        )}
                      </div>
                      <p className="text-[10px] text-slate-500 mb-1">{hero.title}</p>
                      <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
                        {hero.notes}
                      </p>

                      {/* Synergy */}
                      {hero.synergy.length > 0 && (
                        <div className="flex items-center gap-1 mt-1.5 flex-wrap">
                          <span className="text-[9px] text-slate-600 uppercase">Kết hợp:</span>
                          {hero.synergy.map((s) => (
                            <span key={s} className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-blue-500/10 text-blue-400">
                              {s}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Best At Badge */}
                    <div className="flex-shrink-0">
                      <span className={`px-2 py-1 rounded-lg text-[9px] font-bold uppercase ${
                        hero.bestAt === "Both"
                          ? "bg-orange-500/20 text-orange-400"
                          : hero.bestAt === "PvP"
                          ? "bg-red-500/20 text-red-400"
                          : "bg-green-500/20 text-green-400"
                      }`}>
                        {hero.bestAt}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="flex flex-col items-center gap-2 py-12 text-slate-500">
          <Filter className="w-8 h-8 opacity-40" />
          <p className="text-sm">Không tìm thấy hero nào</p>
        </div>
      )}

      {/* Meta Info */}
      <div className="mt-6 p-4 rounded-2xl glass">
        <h3 className="text-xs font-bold uppercase tracking-wide text-slate-300 mb-2">
          📊 Meta Notes — Season 6
        </h3>
        <ul className="space-y-1.5 text-xs text-slate-400">
          <li className="flex items-start gap-1.5"><span className="text-green-400">▲</span> Stallion tăng rank nhờ jungle buff Season 6</li>
          <li className="flex items-start gap-1.5"><span className="text-red-400">▼</span> Marie & Cole giảm do power creep từ hero SSR mới</li>
          <li className="flex items-start gap-1.5"><span className="text-orange-400">●</span> Grace vẫn là #1 pick ở mọi rank từ Season 4</li>
          <li className="flex items-start gap-1.5"><span className="text-blue-400">★</span> Tier list cập nhật theo meta — theo dõi regularly</li>
        </ul>
      </div>
    </div>
  );
}
