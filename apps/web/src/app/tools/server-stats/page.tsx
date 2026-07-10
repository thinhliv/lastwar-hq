"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Server,
  ChevronLeft,
  Search,
  Calendar,
  Users,
  TrendingUp,
  Activity,
  Award,
} from "lucide-react";
import serverData from "@/data/servers.json";

// ===== TYPES =====
interface RawServer {
  server: string;
  lastUpdate: string;
  alliances: string[];
}

const SERVERS = serverData as RawServer[];

// ===== HELPERS =====
function daysSince(dateStr: string): number {
  const date = new Date(dateStr);
  const now = new Date();
  return Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
}

// ===== PRE-COMPUTE STATS =====
const totalServers = SERVERS.length;

const highestServer = SERVERS.reduce((max, s) => {
  const num = parseInt(s.server);
  return num > parseInt(max.server) ? s : max;
}, SERVERS[0]);

const updated7d = SERVERS.filter((s) => daysSince(s.lastUpdate) <= 7).length;
const updated30d = SERVERS.filter((s) => daysSince(s.lastUpdate) <= 30).length;

const topAllianceServers = [...SERVERS]
  .sort((a, b) => b.alliances.length - a.alliances.length)
  .slice(0, 10);

// ===== MAIN =====
export default function ServerStatsPage() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return SERVERS.filter(
      (s) =>
        s.server.includes(q) ||
        s.alliances.some((a) => a.toLowerCase().includes(q))
    )
      .sort((a, b) => parseInt(a.server) - parseInt(b.server))
      .slice(0, 30);
  }, [query]);

  return (
    <div className="min-h-screen px-4 py-6">
      {/* Back */}
      <Link
        href="/tools"
        className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-orange-500 transition-colors mb-3"
      >
        <ChevronLeft className="w-4 h-4" />
        Tools
      </Link>

      <div className="flex items-center gap-2 mb-1">
        <Server className="w-6 h-6 text-purple-400" />
        <h1 className="text-2xl font-bold">Server Statistics</h1>
      </div>
      <p className="text-slate-400 text-sm mb-4">
        Thống kê từ {totalServers.toLocaleString()} servers
      </p>

      {/* Data source */}
      <div className="flex items-center gap-1.5 text-[10px] text-slate-500 mb-6">
        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
        Live data from coordinateslist.com
      </div>

      {/* ===== STAT CARDS ===== */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        {/* Total Servers */}
        <div className="p-4 rounded-2xl glass">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-orange-500/15 flex items-center justify-center">
              <Server className="w-4 h-4 text-orange-400" />
            </div>
            <span className="text-[10px] text-slate-500 uppercase tracking-wide">Total</span>
          </div>
          <p className="text-2xl font-black text-white">
            {totalServers.toLocaleString()}
          </p>
          <p className="text-[10px] text-slate-500 mt-0.5">Servers tracked</p>
        </div>

        {/* Newest Server */}
        <div className="p-4 rounded-2xl glass">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-green-500/15 flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-green-400" />
            </div>
            <span className="text-[10px] text-slate-500 uppercase tracking-wide">Newest</span>
          </div>
          <p className="text-2xl font-black text-white">S{highestServer.server}</p>
          <p className="text-[10px] text-slate-500 mt-0.5">
            Updated {highestServer.lastUpdate}
          </p>
        </div>

        {/* Updated 7 days */}
        <div className="p-4 rounded-2xl glass">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-blue-500/15 flex items-center justify-center">
              <Activity className="w-4 h-4 text-blue-400" />
            </div>
            <span className="text-[10px] text-slate-500 uppercase tracking-wide">7 days</span>
          </div>
          <p className="text-2xl font-black text-white">
            {updated7d.toLocaleString()}
          </p>
          <p className="text-[10px] text-slate-500 mt-0.5">
            Recently updated
          </p>
        </div>

        {/* Updated 30 days */}
        <div className="p-4 rounded-2xl glass">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-purple-500/15 flex items-center justify-center">
              <Calendar className="w-4 h-4 text-purple-400" />
            </div>
            <span className="text-[10px] text-slate-500 uppercase tracking-wide">30 days</span>
          </div>
          <p className="text-2xl font-black text-white">
            {updated30d.toLocaleString()}
          </p>
          <p className="text-[10px] text-slate-500 mt-0.5">
            Active servers
          </p>
        </div>
      </div>

      {/* ===== TOP 10 ALLIANCE SERVERS ===== */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Award className="w-5 h-5 text-yellow-400" />
          <h2 className="text-sm font-bold uppercase tracking-wide">
            Top 10 — Most Alliances
          </h2>
        </div>
        <div className="space-y-2">
          {topAllianceServers.map((srv, i) => (
            <div
              key={srv.server}
              className="flex items-center gap-3 p-3 rounded-xl glass hover:border-orange-500/20 transition-all"
            >
              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                  i === 0
                    ? "bg-yellow-500/20 text-yellow-400"
                    : i === 1
                    ? "bg-slate-400/20 text-slate-300"
                    : i === 2
                    ? "bg-orange-700/20 text-orange-600"
                    : "bg-white/5 text-slate-500"
                }`}
              >
                {i + 1}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-sm">Server {srv.server}</h3>
                <p className="text-[10px] text-slate-500">{srv.lastUpdate}</p>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5">
                <Users className="w-3 h-3 text-orange-400" />
                <span className="text-xs font-bold text-orange-400">
                  {srv.alliances.length}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ===== SEARCH ===== */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-3">
          <Search className="w-5 h-5 text-blue-400" />
          <h2 className="text-sm font-bold uppercase tracking-wide">
            Search Server
          </h2>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Server number hoặc alliance code..."
            className="w-full pl-10 pr-4 py-3 rounded-2xl glass text-sm text-white placeholder-slate-500 outline-none focus:border-orange-500/30"
          />
        </div>

        {query && (
          <div className="mt-3 space-y-2">
            {filtered.length === 0 ? (
              <p className="text-xs text-slate-500 text-center py-4">
                Không tìm thấy server nào.
              </p>
            ) : (
              <>
                <p className="text-xs text-slate-500 mb-2">
                  {filtered.length} result{filtered.length !== 1 ? "s" : ""}
                </p>
                {filtered.map((srv) => (
                  <div
                    key={srv.server}
                    className="flex items-center gap-3 p-3 rounded-xl glass"
                  >
                    <div className="w-9 h-9 rounded-lg bg-orange-500/15 flex items-center justify-center flex-shrink-0">
                      <Server className="w-4 h-4 text-orange-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-sm">Server {srv.server}</h3>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[10px] text-slate-500">
                          {srv.lastUpdate}
                        </span>
                        <span className="text-[10px] text-slate-600">·</span>
                        <span className="text-[10px] text-slate-500">
                          {srv.alliances.length} alliances
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1 max-w-[40%] justify-end">
                      {srv.alliances.slice(0, 3).map((a) => (
                        <span
                          key={a}
                          className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-white/5 text-slate-400"
                        >
                          {a}
                        </span>
                      ))}
                      {srv.alliances.length > 3 && (
                        <span className="text-[10px] text-slate-600">
                          +{srv.alliances.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
