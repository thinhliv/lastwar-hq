"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Shield,
  ChevronLeft,
  Users,
  Crown,
  Swords,
  Search,
  Plus,
  Trophy,
  Globe,
  TrendingUp,
  ChevronRight,
  Castle,
} from "lucide-react";
import { useAuth } from "@/components/auth/AuthProvider";

// ===== ALLIANCE DATA =====
interface Alliance {
  id: number;
  name: string;
  tag: string;
  server: number;
  members: number;
  maxMembers: number;
  power: number;
  rank: number;
  language: string;
  flag: string;
  description: string;
  isRecruiting: boolean;
  warWins: number;
}

const ALLIANCES: Alliance[] = [
  { id: 1, name: "Vietnam Warriors", tag: "VNWAR", server: 42, members: 30, maxMembers: 30, power: 45000000, rank: 1, language: "Tiếng Việt", flag: "🇻🇳", description: "Top 1 alliance Server 42. Active war, friendly members. Need R4!", isRecruiting: false, warWins: 47 },
  { id: 2, name: "Rising Sun Empire", tag: "RSE", server: 42, members: 28, maxMembers: 30, power: 38000000, rank: 2, language: "English/日本語", flag: "🇯🇵", description: "International alliance. Focus on coordinated war strategy.", isRecruiting: true, warWins: 39 },
  { id: 3, name: "Dragon Slayers", tag: "DRGN", server: 42, members: 25, maxMembers: 30, power: 32000000, rank: 3, language: "English", flag: "🇺🇸", description: "Competitive PvP alliance. Looking for active T9+ players.", isRecruiting: true, warWins: 35 },
  { id: 4, name: "Kimchi Republic", tag: "KIM", server: 42, members: 30, maxMembers: 30, power: 29000000, rank: 4, language: "한국어", flag: "🇰🇷", description: "Korean community alliance. Coordinated and disciplined.", isRecruiting: false, warWins: 31 },
  { id: 5, name: "Red Phoenix", tag: "RED", server: 42, members: 22, maxMembers: 30, power: 25000000, rank: 5, language: "Tiếng Việt/English", flag: "🇻🇳", description: "Vietnamese international alliance. Recruiting F2P & P2W!", isRecruiting: true, warWins: 28 },
  { id: 6, name: "Wolf Pack", tag: "WOLF", server: 42, members: 18, maxMembers: 30, power: 18000000, rank: 6, language: "English", flag: "🐺", description: "Chill alliance, focus on fun and growth. All levels welcome!", isRecruiting: true, warWins: 15 },
  { id: 7, name: "Iron Fortress", tag: "IRON", server: 42, members: 15, maxMembers: 30, power: 12000000, rank: 7, language: "Deutsch/English", flag: "🇩🇪", description: "European alliance looking for dedicated members.", isRecruiting: true, warWins: 12 },
  { id: 8, name: "Thunder Bolts", tag: "THDR", server: 42, members: 12, maxMembers: 30, power: 8000000, rank: 8, language: "English", flag: "⚡", description: "New alliance, growing fast. Join early for officer roles!", isRecruiting: true, warWins: 5 },
];

function formatPower(p: number): string {
  if (p >= 1_000_000) return (p / 1_000_000).toFixed(1) + "M";
  if (p >= 1_000) return (p / 1_000).toFixed(0) + "K";
  return p.toLocaleString();
}

// ===== MAIN COMPONENT =====
export default function AlliancePage() {
  const { user } = useAuth();
  const [query, setQuery] = useState("");
  const [filterRecruiting, setFilterRecruiting] = useState(false);
  const [sortBy, setSortBy] = useState<"rank" | "power" | "members">("rank");

  const filtered = useMemo(() => {
    let result = ALLIANCES.filter((a) => {
      if (filterRecruiting && !a.isRecruiting) return false;
      if (query) {
        const q = query.toLowerCase();
        return a.name.toLowerCase().includes(q) || a.tag.toLowerCase().includes(q) || a.flag.includes(query);
      }
      return true;
    });

    result.sort((a, b) => {
      if (sortBy === "rank") return a.rank - b.rank;
      if (sortBy === "power") return b.power - a.power;
      return b.members - a.members;
    });

    return result;
  }, [query, filterRecruiting, sortBy]);

  return (
    <div className="min-h-screen px-4 py-6">
      <Link
        href="/tools"
        className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-orange-500 transition-colors mb-3"
      >
        <ChevronLeft className="w-4 h-4" />
        Tools
      </Link>

      <div className="flex items-center gap-2 mb-1">
        <Castle className="w-6 h-6 text-orange-400" />
        <h1 className="text-2xl font-bold">Alliances</h1>
      </div>
      <p className="text-slate-400 text-sm mb-4">
        Tìm và tham gia alliance trên Server của bạn
      </p>

      {/* Your Alliance Banner (if logged in) */}
      {user && (
        <div className="p-4 rounded-2xl bg-gradient-to-br from-orange-500/10 to-yellow-500/5 border border-orange-500/20 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-orange-500/20 flex items-center justify-center text-2xl">
              🏰
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-sm">Vietnam Warriors</h3>
              <p className="text-xs text-slate-400">Rank #1 · Server 42 · 30/30 members</p>
            </div>
            <Link
              href="/chat"
              className="px-3 py-1.5 rounded-lg bg-orange-500/20 text-orange-500 text-xs font-medium hover:bg-orange-500/30 transition-colors"
            >
              Chat
            </Link>
          </div>
        </div>
      )}

      {/* Create Alliance Button */}
      {user && (
        <button className="w-full mb-4 flex items-center justify-center gap-2 py-3 rounded-2xl glass border border-orange-500/20 hover:bg-white/10 transition-all">
          <Plus className="w-4 h-4 text-orange-500" />
          <span className="text-sm font-medium text-orange-500">Tạo Alliance mới</span>
        </button>
      )}

      {/* Search */}
      <div className="relative mb-3">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Tên alliance, tag, hoặc cờ..."
          className="w-full pl-10 pr-4 py-2.5 rounded-xl glass text-sm text-white placeholder-slate-500 outline-none focus:border-orange-500/30"
        />
      </div>

      {/* Filters */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2 mb-4">
        <button
          onClick={() => setFilterRecruiting(!filterRecruiting)}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
            filterRecruiting
              ? "bg-green-500 text-white"
              : "bg-white/5 text-slate-400 border border-white/10 hover:bg-white/10"
          }`}
        >
          🔓 Đang tuyển
        </button>
        {([
          { id: "rank", label: "By Rank" },
          { id: "power", label: "By Power" },
          { id: "members", label: "By Members" },
        ] as const).map((s) => (
          <button
            key={s.id}
            onClick={() => setSortBy(s.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
              sortBy === s.id
                ? "bg-orange-500 text-white"
                : "bg-white/5 text-slate-400 border border-white/10 hover:bg-white/10"
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* Alliance Ranking */}
      <div className="space-y-2.5">
        {filtered.map((alliance) => (
          <AllianceCard key={alliance.id} alliance={alliance} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="flex flex-col items-center gap-2 py-12 text-slate-500">
          <Search className="w-8 h-8 opacity-40" />
          <p className="text-sm">Không tìm thấy alliance nào</p>
        </div>
      )}

      {/* Info */}
      <div className="mt-6 p-4 rounded-2xl glass">
        <h3 className="text-xs font-bold uppercase tracking-wide text-slate-300 mb-2">
          💡 Thông tin Alliance
        </h3>
        <ul className="space-y-1.5 text-xs text-slate-400">
          <li className="flex items-start gap-1.5"><span className="text-orange-500">▸</span> Max 30 members per alliance</li>
          <li className="flex items-start gap-1.5"><span className="text-orange-500">▸</span> Roles: R5 (Leader), R4 (Officer), Member</li>
          <li className="flex items-start gap-1.5"><span className="text-orange-500">▸</span> R4+ có thể duyệt thành viên mới và quản lý chat</li>
          <li className="flex items-start gap-1.5"><span className="text-orange-500">▸</span> Tham gia alliance để nhận buff và tham gia Alliance War</li>
        </ul>
      </div>
    </div>
  );
}

// ===== ALLIANCE CARD =====
function AllianceCard({ alliance }: { alliance: Alliance }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="p-4 rounded-2xl glass hover:border-orange-500/20 transition-all">
      <div className="flex items-start gap-3">
        {/* Rank Badge */}
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold flex-shrink-0 ${
          alliance.rank === 1 ? "bg-yellow-500/20 text-yellow-400" :
          alliance.rank === 2 ? "bg-slate-400/20 text-slate-300" :
          alliance.rank === 3 ? "bg-orange-700/20 text-orange-600" :
          "bg-white/5 text-slate-500"
        }`}>
          #{alliance.rank}
        </div>

        {/* Alliance Info */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex-1 min-w-0 text-left"
        >
          <div className="flex items-center gap-2 mb-0.5">
            <span className="text-lg">{alliance.flag}</span>
            <h3 className="font-bold text-sm truncate">{alliance.name}</h3>
            <span className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-white/5 text-slate-400">
              [{alliance.tag}]
            </span>
          </div>
          <div className="flex items-center gap-3 text-[10px] text-slate-500">
            <span className="flex items-center gap-1">
              <TrendingUp className="w-3 h-3 text-orange-400" />
              {formatPower(alliance.power)}
            </span>
            <span className="flex items-center gap-1">
              <Users className="w-3 h-3 text-blue-400" />
              {alliance.members}/{alliance.maxMembers}
            </span>
            <span className="flex items-center gap-1">
              <Swords className="w-3 h-3 text-red-400" />
              {alliance.warWins}W
            </span>
          </div>
        </button>

        {/* Recruiting Badge */}
        {alliance.isRecruiting && (
          <span className="px-2 py-1 rounded-lg bg-green-500/15 text-green-400 text-[9px] font-bold uppercase">
            🔓 Open
          </span>
        )}
      </div>

      {/* Expanded Content */}
      {expanded && (
        <div className="mt-3 pt-3 border-t border-white/5 space-y-2">
          <p className="text-xs text-slate-400 leading-relaxed">
            {alliance.description}
          </p>
          <div className="flex items-center gap-3 text-[10px] text-slate-500">
            <span className="flex items-center gap-1">
              <Globe className="w-3 h-3" />
              {alliance.language}
            </span>
            <span>Server {alliance.server}</span>
          </div>
          {alliance.isRecruiting && (
            <button className="w-full mt-2 py-2 rounded-xl bg-orange-500/20 text-orange-400 text-xs font-bold hover:bg-orange-500/30 transition-colors">
              Yêu cầu tham gia
            </button>
          )}
        </div>
      )}
    </div>
  );
}
