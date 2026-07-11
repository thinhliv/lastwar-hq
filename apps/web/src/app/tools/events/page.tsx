"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import {
  CalendarDays,
  ChevronLeft,
  Clock,
  AlarmClock,
  Gift,
  Swords,
  Pickaxe,
  Trophy,
  Zap,
  Skull,
  Star,
  Timer,
} from "lucide-react";

// ===== TYPES =====
type EventStatus = "active" | "upcoming" | "ended";

interface GameEvent {
  id: number;
  name: string;
  description: string;
  category: "combat" | "resource" | "special" | "seasonal";
  startDate: string; // ISO
  endDate: string; // ISO
  icon: typeof Swords;
  tips: string[];
}

// ===== EVENT DATA =====
// Dynamic events — dates relative to now so they're always relevant
function getEventDates() {
  const now = new Date();
  
  function daysFromNow(days: number, hours = 0): string {
    const d = new Date(now);
    d.setDate(d.getDate() + days);
    d.setHours(d.getHours() + hours);
    return d.toISOString();
  }

  return [
    {
      id: 1,
      name: "Ammo Bonanza",
      description: "Nhận x2 đạn dược trong mọi hoạt động chiến đấu. Cơ hội vàng để tích trữ ammo cho war!",
      category: "resource" as const,
      startDate: daysFromNow(-1, -2), // Started 26h ago → ACTIVE
      endDate: daysFromNow(1, 2),     // C�n ~26h
      icon: Zap,
      tips: [
        "Tập trung farm ammo liên tục 48 giờ",
        "Dùng speedup để train troop trước event kết thúc",
        "Alliance rally để tối đa hóa ammo nhận được",
      ],
    },
    {
      id: 2,
      name: "Desert Treasure",
      description: "Sự kiện tìm kho báu sa mạc. Thu thập map pieces, giải mã tọa độ và săn kho báu hiếm.",
      category: "special" as const,
      startDate: daysFromNow(2),     // B?t d?u sau 2 days
      endDate: daysFromNow(5),
      icon: Gift,
      tips: [
        "Giữ map pieces đến khi có đủ set",
        "Đổi coordinates với alliance member",
        "Ưu tiên kho báu SSR hero shards",
      ],
    },
    {
      id: 3,
      name: "Restricted Area Weekend",
      description: "Restricted Area mở cửa toàn bộ cấp độ! Double drops cho mọi boss stage.",
      category: "combat" as const,
      startDate: daysFromNow(-3, -6), // 78h ago → ACTIVE
      endDate: daysFromNow(0, 6),     // 6h left
      icon: Skull,
      tips: [
        "Chơi hết key daily!",
        "Ưu tiên level cao nhất có thể đánh",
        "Team up với alliance để farm nhanh",
      ],
    },
    {
      id: 4,
      name: "Alliance War: Season 6 Qualifier",
      description: "Vòng loại Alliance War Season 6. Top alliances giành quyền tham gia Championship.",
      category: "combat" as const,
      startDate: daysFromNow(3),
      endDate: daysFromNow(7),
      icon: Swords,
      tips: [
        "Chuẩn bị troop đầy đủ trước war",
        "Coordinate rally với R4/R5",
        "Scout target trước khi attack",
      ],
    },
    {
      id: 5,
      name: "Hero Summon Festival",
      description: "Tỉ lệ summon SSR tăng 50%! Limited time hero Grace xuất hiện trong pool.",
      category: "special" as const,
      startDate: daysFromNow(1),
      endDate: daysFromNow(4),
      icon: Star,
      tips: [
        "Save gems cho festival này!",
        "Summon 10x để đảm bảo ít nhất 1 SR+",
        "Grace là hero top tier Season 6",
      ],
    },
    {
      id: 6,
      name: "Mining Rush Week",
      description: "Resource nodes trên world map cho x2 production. Tối đa hóa tài nguyên!",
      category: "resource" as const,
      startDate: daysFromNow(-2),
      endDate: daysFromNow(5),
      icon: Pickaxe,
      tips: [
        "Gather 24/7 — assign all APCs",
        "Ưu tiên oil và iron nodes (high value)",
        "Alliance gathering buff stack được với event",
      ],
    },
    {
      id: 7,
      name: "Season 6: Shadow Jungle Launch",
      description: "Season mới ra mắt! Map mới, hero mới, cơ chế Fog of War.",
      category: "seasonal" as const,
      startDate: daysFromNow(7),
      endDate: daysFromNow(90),
      icon: Trophy,
      tips: [
        "Upgrade APC scout trước season",
        "Stockpile resources ngay!",
        "Coordinate territory với alliance",
      ],
    },
    {
      id: 8,
      name: "Weekly Server vs Server",
      description: "Thi đấu giữa các server. Points tích lũy cho season reward.",
      category: "combat" as const,
      startDate: daysFromNow(5),
      endDate: daysFromNow(6),
      icon: Swords,
      tips: [
        "Target server yếu hơn để farm points",
        "Defense setup quan trọng hơn attack",
        "Check enemy power trước khi engage",
      ],
    },
  ];
}

// ===== CATEGORY CONFIG =====
const CATEGORY_META = {
  combat: { label: "Chiến đấu", icon: Swords, color: "text-red-400", bgColor: "bg-red-500/10", borderColor: "border-red-500/20" },
  resource: { label: "Tài nguyên", icon: Pickaxe, color: "text-green-400", bgColor: "bg-green-500/10", borderColor: "border-green-500/20" },
  special: { label: "Đặc biệt", icon: Gift, color: "text-purple-400", bgColor: "bg-purple-500/10", borderColor: "border-purple-500/20" },
  seasonal: { label: "Theo mùa", icon: Trophy, color: "text-orange-400", bgColor: "bg-orange-500/10", borderColor: "border-orange-500/20" },
} as const;

type CategoryKey = keyof typeof CATEGORY_META;

// ===== FORMAT HELPERS =====
function formatCountdown(ms: number): { text: string; isUrgent: boolean } {
  if (ms <= 0) return { text: "Kết thúc", isUrgent: false };
  
  const seconds = Math.floor(ms / 1000);
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  
  const isUrgent = ms < 6 * 3600 * 1000; // < 6h = urgent

  if (days > 0) return { text: `${days}d ${hours}h ${minutes}m`, isUrgent };
  if (hours > 0) return { text: `${hours}h ${minutes}m ${secs}s`, isUrgent };
  if (minutes > 0) return { text: `${minutes}m ${secs}s`, isUrgent };
  return { text: `${secs}s`, isUrgent: true };
}

function getEventStatus(event: GameEvent, now: Date): EventStatus {
  const start = new Date(event.startDate);
  const end = new Date(event.endDate);
  if (now < start) return "upcoming";
  if (now > end) return "ended";
  return "active";
}

// ===== MAIN COMPONENT =====
export default function EventsPage() {
  const events = useMemo(() => getEventDates(), []);
  const [now, setNow] = useState(new Date());
  const [filter, setFilter] = useState<"all" | "active" | "upcoming" | CategoryKey>("all");

  // Tick every second
  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const enrichedEvents = events.map((e) => ({
    ...e,
    status: getEventStatus(e, now),
  }));

  const filtered = enrichedEvents.filter((e) => {
    if (filter === "all") return true;
    if (filter === "active") return e.status === "active";
    if (filter === "upcoming") return e.status === "upcoming";
    return e.category === filter;
  });

  // Sort: active first (by end time ascending), then upcoming (by start time), then ended
  const sorted = [...filtered].sort((a, b) => {
    const order = { active: 0, upcoming: 1, ended: 2 };
    if (order[a.status] !== order[b.status]) return order[a.status] - order[b.status];
    if (a.status === "active") return new Date(a.endDate).getTime() - new Date(b.endDate).getTime();
    return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
  });

  const activeCount = enrichedEvents.filter((e) => e.status === "active").length;
  const upcomingCount = enrichedEvents.filter((e) => e.status === "upcoming").length;

  return (
    <div className="min-h-screen px-4 py-6">
      {/* Back */}
      <Link
        href="/tools"
        className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-orange-500 transition-colors mb-3"
      >
        <ChevronLeft className="w-4 h-4" />
        Công cụ
      </Link>

      <div className="flex items-center gap-2 mb-1">
        <AlarmClock className="w-6 h-6 text-cyan-400" />
        <h1 className="text-2xl font-bold">Sự kiện</h1>
      </div>
      <p className="text-slate-400 text-sm mb-4">
        Lịch sự kiện và countdown timer
      </p>

      {/* Summary */}
      <div className="grid grid-cols-2 gap-3 mb-5">
        <div className="p-3 rounded-2xl glass">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[10px] text-slate-500 uppercase tracking-wide">Đang diễn ra</span>
          </div>
          <p className="text-2xl font-black text-green-400">{activeCount}</p>
        </div>
        <div className="p-3 rounded-2xl glass">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 rounded-full bg-blue-500" />
            <span className="text-[10px] text-slate-500 uppercase tracking-wide">Sắp tới</span>
          </div>
          <p className="text-2xl font-black text-blue-400">{upcomingCount}</p>
        </div>
      </div>

      {/* Filter chips */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2 mb-4">
        {([
          { id: "all", label: "Tất cả" },
          { id: "active", label: "🔴 Đang diễn ra" },
          { id: "upcoming", label: "🔵 Sắp tới" },
          { id: "combat", label: "⚔️ Combat" },
          { id: "resource", label: "⛏️ Resource" },
          { id: "special", label: "🎁 Special" },
          { id: "seasonal", label: "🏆 Seasonal" },
        ] as { id: typeof filter; label: string }[]).map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
              filter === f.id
                ? "bg-orange-500 text-white"
                : "bg-white/5 text-slate-400 border border-white/10 hover:bg-white/10"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Event Cards */}
      <div className="space-y-3">
        {sorted.map((event) => {
          const meta = CATEGORY_META[event.category];
          const isActive = event.status === "active";
          const isUpcoming = event.status === "upcoming";
          
          const relevantTime = isActive
            ? new Date(event.endDate).getTime() - now.getTime()
            : isUpcoming
            ? new Date(event.startDate).getTime() - now.getTime()
            : 0;
          
          const countdown = formatCountdown(relevantTime);
          const Icon = event.icon;

          return (
            <div
              key={event.id}
              className={`rounded-2xl glass overflow-hidden transition-all ${
                isActive
                  ? "border-green-500/20 shadow-lg shadow-green-500/5"
                  : isUpcoming
                  ? "border-blue-500/20"
                  : "opacity-60"
              }`}
            >
              {/* Header */}
              <div className={`p-4 ${meta.bgColor}`}>
                <div className="flex items-start gap-3">
                  <div className={`w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0`}>
                    <Icon className={`w-6 h-6 ${meta.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-sm">{event.name}</h3>
                      <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold uppercase ${meta.bgColor} ${meta.color} border border-white/10`}>
                        {meta.label}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
                      {event.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Countdown / Status */}
              <div className="px-4 py-3 border-t border-white/5">
                {isActive ? (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                      <span className="text-xs font-medium text-green-400">
                        {countdown.isUrgent ? "🔥 Sắp kết thúc!" : "Đang diễn ra"}
                      </span>
                    </div>
                    <div className={`flex items-center gap-1.5 font-mono text-sm font-bold ${countdown.isUrgent ? "text-red-400" : "text-slate-300"}`}>
                      <Timer className="w-3.5 h-3.5" />
                      {countdown.text}
                    </div>
                  </div>
                ) : isUpcoming ? (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-blue-400" />
                      <span className="text-xs text-blue-400">
                        Bắt đầu sau
                      </span>
                    </div>
                    <div className="font-mono text-sm font-bold text-blue-400">
                      {countdown.text}
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-slate-600" />
                    <span className="text-xs text-slate-600">Đã kết thúc</span>
                  </div>
                )}
              </div>

              {/* Tips (expandable on active) */}
              {isActive && (
                <div className="px-4 pb-3">
                  <div className="rounded-xl bg-white/5 p-3">
                    <h4 className="text-[10px] font-bold uppercase tracking-wide text-slate-400 mb-1.5">
                      💡 Mẹo
                    </h4>
                    <ul className="space-y-1">
                      {event.tips.map((tip, i) => (
                        <li key={i} className="text-[11px] text-slate-400 flex items-start gap-1.5">
                          <span className="text-orange-500 flex-shrink-0">▸</span>
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* Date range */}
              <div className="px-4 pb-3 flex items-center gap-2 text-[10px] text-slate-600">
                <CalendarDays className="w-3 h-3" />
                {new Date(event.startDate).toLocaleDateString("vi-VN", { day: "2-digit", month: "short" })}
                <span>—</span>
                {new Date(event.endDate).toLocaleDateString("vi-VN", { day: "2-digit", month: "short" })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Event Calculators Link */}
      <div className="mt-6 grid grid-cols-1 gap-2">
        <Link
          href="/tools/events/ammo-bonanza"
          className="flex items-center justify-between p-4 rounded-2xl glass hover:border-yellow-500/20 transition-all"
        >
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-yellow-400" />
            <div>
              <h3 className="font-semibold text-sm">Máy tính Ammo Bonanza</h3>
              <p className="text-xs text-slate-400">Tính ammo + tối ưu stage</p>
            </div>
          </div>
          <ChevronLeft className="w-4 h-4 text-slate-500 rotate-180" />
        </Link>
        <Link
          href="/tools/events/desert-treasure"
          className="flex items-center justify-between p-4 rounded-2xl glass hover:border-purple-500/20 transition-all"
        >
          <div className="flex items-center gap-2">
            <Gift className="w-5 h-5 text-purple-400" />
            <div>
              <h3 className="font-semibold text-sm">Máy tính Desert Treasure</h3>
              <p className="text-xs text-slate-400">Kế hoạch đào kho báu</p>
            </div>
          </div>
          <ChevronLeft className="w-4 h-4 text-slate-500 rotate-180" />
        </Link>
      </div>

      {sorted.length === 0 && (
        <div className="flex flex-col items-center gap-2 py-12 text-slate-500">
          <CalendarDays className="w-8 h-8 opacity-40" />
          <p className="text-sm">Không có sự kiện nào trong mục này</p>
        </div>
      )}
    </div>
  );
}
