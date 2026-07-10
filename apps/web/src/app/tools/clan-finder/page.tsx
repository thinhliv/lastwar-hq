"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  ChevronLeft,
  Users,
  Globe,
  Plus,
  X,
  Crown,
  Server,
  Flag,
  ExternalLink,
  Zap,
} from "lucide-react";

// ===== TYPES =====
interface GameServer {
  id: number;
  name: string;
  region: "NA" | "EU" | "Asia" | "SEA";
  players: number;
  topAlliance: string;
  language: string;
  flag: string;
  power: number;
  status: "active" | "new" | "merging";
}

// ===== FAKE DATA: 10 SERVERS =====
const SERVERS: GameServer[] = [
  {
    id: 1,
    name: "Server 1234 — Thunder",
    region: "NA",
    players: 4820,
    topAlliance: "VK Thunder",
    language: "English",
    flag: "🇺🇸",
    power: 845_000_000,
    status: "active",
  },
  {
    id: 2,
    name: "Server 1567 — Rising Sun",
    region: "Asia",
    players: 6210,
    topAlliance: "Rising Sun",
    language: "日本語",
    flag: "🇯🇵",
    power: 1_120_000_000,
    status: "active",
  },
  {
    id: 3,
    name: "Server 2048 — Wolf Pack",
    region: "EU",
    players: 3950,
    topAlliance: "Wolf Pack",
    language: "Deutsch",
    flag: "🇩🇪",
    power: 678_000_000,
    status: "active",
  },
  {
    id: 4,
    name: "Server 892 — Dragon Empire",
    region: "Asia",
    players: 5400,
    topAlliance: "Red Dragon",
    language: "中文",
    flag: "🇨🇳",
    power: 920_000_000,
    status: "active",
  },
  {
    id: 5,
    name: "Server 3105 — Saigon Warriors",
    region: "SEA",
    players: 4100,
    topAlliance: "Vietnam Warriors",
    language: "Tiếng Việt",
    flag: "🇻🇳",
    power: 720_000_000,
    status: "active",
  },
  {
    id: 6,
    name: "Server 4501 — Iron Fist",
    region: "NA",
    players: 3200,
    topAlliance: "Iron Fist",
    language: "English",
    flag: "🇨🇦",
    power: 510_000_000,
    status: "merging",
  },
  {
    id: 7,
    name: "Server 2890 — K-Patrol",
    region: "Asia",
    players: 5800,
    topAlliance: "K-Patrol",
    language: "한국어",
    flag: "🇰🇷",
    power: 890_000_000,
    status: "active",
  },
  {
    id: 8,
    name: "Server 167 — Legion Espana",
    region: "EU",
    players: 2800,
    topAlliance: "Legion Espana",
    language: "Español",
    flag: "🇪🇸",
    power: 430_000_000,
    status: "active",
  },
  {
    id: 9,
    name: "Server 5023 — Bangkok Raiders",
    region: "SEA",
    players: 3650,
    topAlliance: "Bangkok Raiders",
    language: "ภาษาไทย",
    flag: "🇹🇭",
    power: 615_000_000,
    status: "active",
  },
  {
    id: 10,
    name: "Server 6700 — New Frontier",
    region: "NA",
    players: 1200,
    topAlliance: "Pioneers",
    language: "English",
    flag: "🇺🇸",
    power: 85_000_000,
    status: "new",
  },
];

const REGIONS = ["All", "NA", "EU", "Asia", "SEA"] as const;
type Region = (typeof REGIONS)[number];

const STATUS_CONFIG: Record<
  GameServer["status"],
  { label: string; color: string; bgColor: string }
> = {
  active: { label: "Active", color: "text-green-400", bgColor: "bg-green-500/15" },
  new: { label: "New", color: "text-cyan-400", bgColor: "bg-cyan-500/15" },
  merging: { label: "Merging", color: "text-yellow-400", bgColor: "bg-yellow-500/15" },
};

// ===== FORMAT HELPER =====
function formatPower(p: number): string {
  if (p >= 1_000_000_000) return (p / 1_000_000_000).toFixed(2) + "B";
  if (p >= 1_000_000) return (p / 1_000_000).toFixed(1) + "M";
  return formatNumber(p);
}

function formatNumber(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(1) + "K";
  return n.toLocaleString();
}

// ===== MAIN COMPONENT =====
export default function ClanFinderPage() {
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState<Region>("All");
  const [showAddForm, setShowAddForm] = useState(false);
  const [customServers, setCustomServers] = useState<GameServer[]>([]);

  const allServers = [...customServers, ...SERVERS];

  const filtered = useMemo(() => {
    return allServers.filter((s) => {
      const matchesQuery =
        !query ||
        s.name.toLowerCase().includes(query.toLowerCase()) ||
        s.topAlliance.toLowerCase().includes(query.toLowerCase()) ||
        s.language.toLowerCase().includes(query.toLowerCase());
      const matchesRegion = region === "All" || s.region === region;
      return matchesQuery && matchesRegion;
    });
  }, [query, region, allServers]);

  function handleAddServer(data: Partial<GameServer>) {
    const newServer: GameServer = {
      id: Date.now(),
      name: data.name || "Unknown Server",
      region: (data.region as GameServer["region"]) || "NA",
      players: data.players || 0,
      topAlliance: data.topAlliance || "—",
      language: data.language || "English",
      flag: data.flag || "🌍",
      power: data.power || 0,
      status: "new",
    };
    setCustomServers((prev) => [newServer, ...prev]);
    setShowAddForm(false);
  }

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
        <Search className="w-6 h-6 text-pink-400" />
        <h1 className="text-2xl font-bold">Clan / Server Finder</h1>
      </div>
      <p className="text-slate-400 text-sm mb-5">
        Tìm server hoặc clan phù hợp với bạn
      </p>

      {/* Search Bar */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Tìm server, clan, ngôn ngữ..."
          className="w-full pl-10 pr-10 py-3 rounded-2xl glass text-sm text-white placeholder-slate-500 outline-none focus:border-orange-500/30"
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-4 h-4 text-slate-400" />
          </button>
        )}
      </div>

      {/* Region Filters */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2 mb-4">
        {REGIONS.map((r) => (
          <button
            key={r}
            onClick={() => setRegion(r)}
            className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
              region === r
                ? "bg-orange-500 text-white shadow-lg shadow-orange-500/20"
                : "bg-white/5 text-slate-400 border border-white/10 hover:bg-white/10"
            }`}
          >
            {r === "All" ? "🌍 All" : r}
          </button>
        ))}
      </div>

      {/* Add Server Button */}
      <button
        onClick={() => setShowAddForm(true)}
        className="w-full mb-4 flex items-center justify-center gap-2 py-3 rounded-2xl border border-dashed border-white/15 text-sm text-slate-400 hover:text-orange-400 hover:border-orange-500/30 transition-all"
      >
        <Plus className="w-4 h-4" />
        Add Server
      </button>

      {/* Results */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="p-8 text-center">
            <Server className="w-10 h-10 text-slate-600 mx-auto mb-2" />
            <p className="text-sm text-slate-400">
              Không tìm thấy server nào. Thử tìm khác hoặc thêm mới!
            </p>
          </div>
        ) : (
          filtered.map((srv) => (
            <ServerCard key={srv.id} server={srv} />
          ))
        )}
      </div>

      {/* Result count */}
      <div className="mt-4 text-center text-xs text-slate-600">
        {filtered.length} server{filtered.length !== 1 ? "s" : ""} found
      </div>

      {/* Add Server Modal */}
      {showAddForm && (
        <AddServerForm
          onClose={() => setShowAddForm(false)}
          onSubmit={handleAddServer}
        />
      )}
    </div>
  );
}

// ===== SERVER CARD =====
function ServerCard({ server }: { server: GameServer }) {
  const statusCfg = STATUS_CONFIG[server.status];

  return (
    <div className="p-4 rounded-2xl glass hover:border-orange-500/20 transition-all">
      {/* Top row */}
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex items-center gap-2 min-w-0 flex-1">
          <span className="text-2xl flex-shrink-0">{server.flag}</span>
          <div className="min-w-0">
            <h3 className="font-bold text-sm truncate">{server.name}</h3>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${statusCfg.bgColor} ${statusCfg.color}`}>
                {statusCfg.label}
              </span>
              <span className="text-[10px] text-slate-500">{server.region}</span>
              <span className="text-[10px] text-slate-500">·</span>
              <span className="text-[10px] text-slate-500">{server.language}</span>
            </div>
          </div>
        </div>
        {/* Join Button (deep link placeholder) */}
        <button
          className="flex-shrink-0 w-9 h-9 rounded-xl bg-orange-500/20 flex items-center justify-center hover:bg-orange-500/30 transition-colors active:scale-90"
          title="Open in game (placeholder)"
          onClick={(e) => e.preventDefault()}
        >
          <ExternalLink className="w-4 h-4 text-orange-400" />
        </button>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-2 mt-3">
        <div className="flex items-center gap-1.5">
          <Users className="w-3.5 h-3.5 text-slate-500" />
          <div>
            <div className="text-xs font-bold text-slate-200">
              {formatNumber(server.players)}
            </div>
            <div className="text-[9px] text-slate-600">players</div>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <Crown className="w-3.5 h-3.5 text-yellow-500" />
          <div className="min-w-0">
            <div className="text-xs font-bold text-slate-200 truncate">
              {server.topAlliance}
            </div>
            <div className="text-[9px] text-slate-600">top alliance</div>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <Zap className="w-3.5 h-3.5 text-orange-500" />
          <div>
            <div className="text-xs font-bold text-slate-200">
              {formatPower(server.power)}
            </div>
            <div className="text-[9px] text-slate-600">total power</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ===== ADD SERVER FORM =====
function AddServerForm({
  onClose,
  onSubmit,
}: {
  onClose: () => void;
  onSubmit: (data: Partial<GameServer>) => void;
}) {
  const [name, setName] = useState("");
  const [region, setRegion] = useState<GameServer["region"]>("NA");
  const [players, setPlayers] = useState(0);
  const [topAlliance, setTopAlliance] = useState("");
  const [language, setLanguage] = useState("English");
  const [flag, setFlag] = useState("🌍");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    onSubmit({ name, region, players, topAlliance, language, flag });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="w-full sm:max-w-md bg-slate-900/95 rounded-t-3xl sm:rounded-3xl border border-white/10 p-5 max-h-[85vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <Plus className="w-5 h-5 text-orange-400" />
            Add Server
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5 text-slate-400" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Server Name */}
          <div>
            <label className="text-xs text-slate-400 font-medium uppercase tracking-wide mb-1.5 block">
              Server Name *
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="VD: Server 999 — Avengers"
              className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder-slate-600 outline-none focus:border-orange-500/30"
              required
            />
          </div>

          {/* Region */}
          <div>
            <label className="text-xs text-slate-400 font-medium uppercase tracking-wide mb-1.5 block">
              Region
            </label>
            <div className="flex gap-2">
              {(["NA", "EU", "Asia", "SEA"] as const).map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRegion(r)}
                  className={`flex-1 py-2 rounded-xl text-xs font-medium transition-all ${
                    region === r
                      ? "bg-orange-500/20 text-orange-400 border border-orange-500/30"
                      : "bg-white/5 text-slate-400 border border-white/10"
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          {/* Top Alliance */}
          <div>
            <label className="text-xs text-slate-400 font-medium uppercase tracking-wide mb-1.5 block">
              Top Alliance Name
            </label>
            <input
              type="text"
              value={topAlliance}
              onChange={(e) => setTopAlliance(e.target.value)}
              placeholder="VD: Avengers"
              className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder-slate-600 outline-none focus:border-orange-500/30"
            />
          </div>

          {/* Language + Flag */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-slate-400 font-medium uppercase tracking-wide mb-1.5 block">
                Language
              </label>
              <input
                type="text"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                placeholder="English"
                className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder-slate-600 outline-none focus:border-orange-500/30"
              />
            </div>
            <div>
              <label className="text-xs text-slate-400 font-medium uppercase tracking-wide mb-1.5 block">
                Flag Emoji
              </label>
              <input
                type="text"
                value={flag}
                onChange={(e) => setFlag(e.target.value)}
                placeholder="🌍"
                className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder-slate-600 outline-none focus:border-orange-500/30 text-center"
              />
            </div>
          </div>

          {/* Players */}
          <div>
            <label className="text-xs text-slate-400 font-medium uppercase tracking-wide mb-1.5 block">
              Player Count
            </label>
            <input
              type="number"
              value={players}
              onChange={(e) => setPlayers(Math.max(0, Number(e.target.value)))}
              placeholder="0"
              min={0}
              className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder-slate-600 outline-none focus:border-orange-500/30"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 text-white text-sm font-medium hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg shadow-orange-500/20"
          >
            Thêm Server
          </button>
        </form>
      </div>
    </div>
  );
}


