"use client";

import { useState, useMemo, useCallback } from "react";
import Link from "next/link";
import {
  Search,
  ChevronLeft,
  Users,
  Server,
  Copy,
  Check,
  Calendar,
  Shield,
} from "lucide-react";
import serverData from "@/data/servers.json";

// ===== TYPES =====
interface RawServer {
  server: string;
  lastUpdate: string;
  alliances: string[];
}

const SERVERS = serverData as RawServer[];

// ===== RANGE FILTERS =====
const RANGE_FILTERS = [
  { id: "all", label: "All", min: 0, max: Infinity },
  { id: "1-50", label: "1-50", min: 1, max: 50 },
  { id: "51-100", label: "51-100", min: 51, max: 100 },
  { id: "101-150", label: "101-150", min: 101, max: 150 },
  { id: "151+", label: "151+", min: 151, max: Infinity },
] as const;

type RangeId = (typeof RANGE_FILTERS)[number]["id"];

// ===== FORMAT HELPER =====
function formatDate(d: string): string {
  // Already YYYY-MM-DD format
  return d;
}

function daysSince(d: string): number {
  const date = new Date(d);
  const now = new Date();
  return Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
}

// ===== MAIN COMPONENT =====
export default function ClanFinderPage() {
  const [query, setQuery] = useState("");
  const [rangeFilter, setRangeFilter] = useState<RangeId>("all");
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopy = useCallback((code: string) => {
    navigator.clipboard.writeText(code).then(() => {
      setCopiedCode(code);
      setTimeout(() => setCopiedCode(null), 1500);
    });
  }, []);

  const filtered = useMemo(() => {
    const range = RANGE_FILTERS.find((r) => r.id === rangeFilter)!;
    const q = query.trim().toLowerCase();

    return SERVERS.filter((s) => {
      const srvNum = parseInt(s.server);
      const inRange = srvNum >= range.min && srvNum <= range.max;

      if (!inRange) return false;

      if (!q) return true;

      // Search by server number
      if (s.server.includes(q)) return true;

      // Search by alliance code
      if (s.alliances.some((a) => a.toLowerCase().includes(q))) return true;

      return false;
    }).sort((a, b) => parseInt(a.server) - parseInt(b.server));
  }, [query, rangeFilter]);

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
        <h1 className="text-2xl font-bold">Server / Clan Finder</h1>
      </div>
      <p className="text-slate-400 text-sm mb-3">
        Tìm server và alliance từ {SERVERS.length.toLocaleString()} servers
      </p>

      {/* Data source badge */}
      <div className="flex items-center gap-1.5 text-[10px] text-slate-500 mb-4">
        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
        Live data from coordinateslist.com
      </div>

      {/* Search Bar */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Server number hoặc alliance code..."
          className="w-full pl-10 pr-10 py-3 rounded-2xl glass text-sm text-white placeholder-slate-500 outline-none focus:border-orange-500/30"
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 rounded-lg hover:bg-white/10 transition-colors"
          >
            <Search className="w-4 h-4 text-slate-400 rotate-45" />
          </button>
        )}
      </div>

      {/* Range Filters */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2 mb-4">
        {RANGE_FILTERS.map((r) => (
          <button
            key={r.id}
            onClick={() => setRangeFilter(r.id)}
            className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
              rangeFilter === r.id
                ? "bg-orange-500 text-white shadow-lg shadow-orange-500/20"
                : "bg-white/5 text-slate-400 border border-white/10 hover:bg-white/10"
            }`}
          >
            {r.label}
          </button>
        ))}
      </div>

      {/* Result count */}
      <div className="text-xs text-slate-500 mb-3">
        {filtered.length.toLocaleString()} server{filtered.length !== 1 ? "s" : ""} found
      </div>

      {/* Results - virtualized-ish (limit to first 50 for perf) */}
      <div className="space-y-2.5">
        {filtered.length === 0 ? (
          <div className="p-8 text-center">
            <Server className="w-10 h-10 text-slate-600 mx-auto mb-2" />
            <p className="text-sm text-slate-400">
              Không tìm thấy server nào.
            </p>
          </div>
        ) : (
          filtered.slice(0, 50).map((srv) => (
            <ServerCard
              key={srv.server}
              server={srv}
              copiedCode={copiedCode}
              onCopy={handleCopy}
            />
          ))
        )}
      </div>

      {filtered.length > 50 && (
        <div className="mt-4 text-center text-xs text-slate-600">
          Hiển thị 50/{filtered.length.toLocaleString()} servers. Thu hẹp tìm kiếm để xem thêm.
        </div>
      )}
    </div>
  );
}

// ===== SERVER CARD =====
function ServerCard({
  server,
  copiedCode,
  onCopy,
}: {
  server: RawServer;
  copiedCode: string | null;
  onCopy: (code: string) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const daysOld = daysSince(server.lastUpdate);
  const freshnessColor =
    daysOld <= 7 ? "text-green-400" : daysOld <= 30 ? "text-yellow-400" : "text-slate-500";

  return (
    <div className="p-4 rounded-2xl glass hover:border-orange-500/20 transition-all">
      {/* Top row */}
      <div className="flex items-start justify-between gap-2 mb-3">
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-2 min-w-0 flex-1 text-left"
        >
          <div className="w-10 h-10 rounded-xl bg-orange-500/15 flex items-center justify-center flex-shrink-0">
            <Server className="w-5 h-5 text-orange-400" />
          </div>
          <div className="min-w-0">
            <h3 className="font-bold text-sm text-white">
              Server {server.server}
            </h3>
            <div className="flex items-center gap-1.5 mt-0.5">
              <Calendar className={`w-3 h-3 ${freshnessColor}`} />
              <span className={`text-[10px] ${freshnessColor}`}>
                {formatDate(server.lastUpdate)}
              </span>
              <span className="text-[10px] text-slate-600">·</span>
              <span className="text-[10px] text-slate-500">
                {server.alliances.length} alliances
              </span>
            </div>
          </div>
        </button>

        {/* Expand chevron */}
        <button
          onClick={() => setExpanded(!expanded)}
          className={`flex-shrink-0 w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center text-slate-400 hover:bg-white/10 transition-all ${
            expanded ? "rotate-180" : ""
          }`}
        >
          <ChevronLeft className="w-4 h-4 rotate-90" />
        </button>
      </div>

      {/* Alliance codes */}
      <div className="flex flex-wrap gap-1.5">
        {(expanded ? server.alliances : server.alliances.slice(0, 6)).map((code) => (
          <button
            key={code}
            onClick={() => onCopy(code)}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-mono font-medium transition-all active:scale-95 ${
              copiedCode === code
                ? "bg-green-500/20 text-green-400 border border-green-500/30"
                : "bg-white/5 text-slate-300 border border-white/10 hover:bg-white/10 hover:border-orange-500/20"
            }`}
            title={`Copy "${code}"`}
          >
            {copiedCode === code ? (
              <span className="flex items-center gap-1">
                <Check className="w-3 h-3" />
                {code}
              </span>
            ) : (
              <span className="flex items-center gap-1">
                <Copy className="w-2.5 h-2.5 opacity-40" />
                {code}
              </span>
            )}
          </button>
        ))}
        {!expanded && server.alliances.length > 6 && (
          <button
            onClick={() => setExpanded(true)}
            className="px-2.5 py-1.5 rounded-lg text-xs text-slate-500 bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
          >
            +{server.alliances.length - 6} more
          </button>
        )}
      </div>
    </div>
  );
}
