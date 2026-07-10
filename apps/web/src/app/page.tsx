"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Swords,
  Bell,
  Flame,
  Calculator,
  BookOpen,
  Server,
  CalendarDays,
  Search,
  MessageCircle,
  Trophy,
  ChevronRight,
  Map as MapIcon,
  Newspaper,
  Sparkles,
} from "lucide-react";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import AuthModal from "@/components/auth/AuthModal";
import { useAuth } from "@/components/auth/AuthProvider";

// ============ FAKE DATA ============
const hotNews = [
  {
    id: 1,
    title: "Season 5 chính thức ra mắt!",
    desc: "Bản cập nhật lớn nhất năm — map mới, hero mới, tính năng mới",
    tag: "UPDATE",
    color: "from-orange-500/20 to-red-500/10",
    time: "2 giờ trước",
  },
  {
    id: 2,
    title: "Event: Ammo Bonanza diễn ra cuối tuần",
    desc: "Nhận x2 đạn dược trong 48 giờ. Chuẩn bị kho ngay!",
    tag: "EVENT",
    color: "from-blue-500/20 to-cyan-500/10",
    time: "5 giờ trước",
  },
  {
    id: 3,
    title: "Bảo trì server 12/07 — 02:00-04:00 UTC",
    desc: "Sửa lỗi crash khi vào alliance war, tối ưu hiệu suất",
    tag: "MAINT",
    color: "from-purple-500/20 to-pink-500/10",
    time: "1 ngày trước",
  },
];

const quickTools = [
  { icon: MapIcon, label: "Maps", href: "/tools/maps", color: "text-blue-400" },
  { icon: Calculator, label: "Calc", href: "/tools", color: "text-orange-400" },
  { icon: BookOpen, label: "Guides", href: "/guides", color: "text-green-400" },
  { icon: Server, label: "Server", href: "/tools/server-stats", color: "text-purple-400" },
  { icon: CalendarDays, label: "Events", href: "/tools", color: "text-cyan-400" },
  { icon: Search, label: "Clan", href: "/tools", color: "text-pink-400" },
];

const latestGuides = [
  {
    id: 1,
    title: "Best Hero Combinations for Season 6",
    category: "Heroes",
    readTime: "8 min",
    date: "10/07/2026",
    isNew: true,
  },
  {
    id: 2,
    title: "How to Optimize Your Base Layout",
    category: "Beginner",
    readTime: "6 min",
    date: "09/07/2026",
    isNew: true,
  },
  {
    id: 3,
    title: "Restricted Area: Complete Guide",
    category: "Combat",
    readTime: "10 min",
    date: "05/07/2026",
  },
];

const countries = [
  { flag: "🇻🇳", name: "Việt Nam", code: "VN" },
  { flag: "🇰🇷", name: "한국", code: "KR" },
  { flag: "🇯🇵", name: "日本", code: "JP" },
  { flag: "🇺🇸", name: "USA", code: "US" },
  { flag: "🇨🇳", name: "中国", code: "CN" },
  { flag: "🇩🇪", name: "Deutschland", code: "DE" },
];

export default function HomePage() {
  const { user, loading } = useAuth();
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "register">("login");
  const [newsIndex, setNewsIndex] = useState(0);

  function openAuth(mode: "login" | "register" = "login") {
    setAuthMode(mode);
    setAuthOpen(true);
  }

  const displayName = user
    ? user.user_metadata?.full_name ||
      user.user_metadata?.name ||
      user.email?.split("@")[0] ||
      "Commander"
    : null;

  const avatarUrl = user?.user_metadata?.avatar_url || user?.user_metadata?.picture;

  return (
    <div className="min-h-screen">
      {/* ===== HEADER ===== */}
      <header className="sticky top-0 z-30 flex items-center justify-between px-4 py-3 bg-[#0f172a]/80 backdrop-blur-xl border-b border-white/5">
        <button className="p-2 rounded-lg hover:bg-white/10 transition-colors relative">
          <Bell className="w-5 h-5 text-slate-400" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-orange-500" />
        </button>

        <div className="flex items-center gap-2">
          <span className="text-lg font-black tracking-tight">
            <span className="text-orange-500">⚔️ LASTWAR</span>
          </span>
        </div>

        <LanguageSwitcher />
      </header>

      {/* ===== SECTION 1: HOT NEWS CAROUSEL ===== */}
      <section className="px-4 pt-4">
        <div className="flex items-center gap-2 mb-3">
          <Flame className="w-5 h-5 text-orange-500" />
          <h2 className="text-sm font-bold uppercase tracking-wide">Tin nóng</h2>
          <Link
            href="/news"
            className="ml-auto text-xs text-slate-400 hover:text-orange-500 transition-colors flex items-center gap-0.5"
          >
            Tất cả <ChevronRight className="w-3 h-3" />
          </Link>
        </div>

        {/* Carousel */}
        <div className="relative overflow-hidden rounded-2xl">
          <div
            className="flex transition-transform duration-300 ease-out"
            style={{ transform: `translateX(-${newsIndex * 100}%)` }}
          >
            {hotNews.map((news) => (
              <div key={news.id} className="min-w-full pr-1">
                <div
                  className={`bg-gradient-to-br ${news.color} bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-0.5 rounded-md bg-orange-500/20 text-orange-500 text-[10px] font-bold tracking-wide">
                      {news.tag}
                    </span>
                    <span className="text-[10px] text-slate-500">
                      {news.time}
                    </span>
                  </div>
                  <h3 className="font-bold text-base mb-1">{news.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {news.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Dots */}
          <div className="flex items-center justify-center gap-1.5 mt-2">
            {hotNews.map((_, i) => (
              <button
                key={i}
                onClick={() => setNewsIndex(i)}
                className={`h-1.5 rounded-full transition-all ${
                  i === newsIndex
                    ? "w-6 bg-orange-500"
                    : "w-1.5 bg-slate-600 hover:bg-slate-500"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ===== SECTION 2: QUICK TOOLS GRID ===== */}
      <section className="px-4 pt-6">
        <div className="flex items-center gap-2 mb-3">
          <Calculator className="w-5 h-5 text-blue-400" />
          <h2 className="text-sm font-bold uppercase tracking-wide">
            Công cụ nhanh
          </h2>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {quickTools.map((tool) => (
            <Link
              key={tool.label}
              href={tool.href}
              className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-orange-500/30 hover:bg-white/10 transition-all active:scale-95"
            >
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                <tool.icon className={`w-5 h-5 ${tool.color}`} />
              </div>
              <span className="text-xs text-slate-300">{tool.label}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ===== SECTION 3: LATEST GUIDES ===== */}
      <section className="px-4 pt-6">
        <div className="flex items-center gap-2 mb-3">
          <BookOpen className="w-5 h-5 text-green-400" />
          <h2 className="text-sm font-bold uppercase tracking-wide">
            Guides mới
          </h2>
          <Link
            href="/guides"
            className="ml-auto text-xs text-slate-400 hover:text-orange-500 transition-colors flex items-center gap-0.5"
          >
            Tất cả <ChevronRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="space-y-2">
          {latestGuides.map((guide) => (
            <Link
              key={guide.id}
              href="/guides"
              className="flex items-center gap-3 p-3 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 transition-all"
            >
              <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-green-400" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-sm truncate">{guide.title}</h3>
                  {guide.isNew && (
                    <span className="px-1.5 py-0.5 rounded bg-orange-500 text-white text-[8px] font-bold uppercase">
                      New
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-[10px] text-slate-500">{guide.category}</span>
                  <span className="text-[10px] text-slate-600">·</span>
                  <span className="text-[10px] text-slate-500">{guide.readTime}</span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-600" />
            </Link>
          ))}
        </div>
      </section>

      {/* ===== SECTION 3.5: CHAT PREVIEW ===== */}
      <section className="px-4 pt-6">
        <div className="flex items-center gap-2 mb-3">
          <MessageCircle className="w-5 h-5 text-green-400" />
          <h2 className="text-sm font-bold uppercase tracking-wide">
            Chat gần đây
          </h2>
          <Link
            href="/chat"
            className="ml-auto text-xs text-slate-400 hover:text-orange-500 transition-colors flex items-center gap-0.5"
          >
            Tất cả <ChevronRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 flex flex-col items-center gap-3">
          <MessageCircle className="w-8 h-8 text-slate-600" />
          <p className="text-sm text-slate-400 text-center">
            Sign in to join the conversation
          </p>
          <button
            onClick={() => openAuth("login")}
            className="px-6 py-2 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 text-white text-sm font-medium hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg shadow-orange-500/20"
          >
            Đăng nhập
          </button>
        </div>
      </section>

      {/* ===== SECTION 4: YOUR ALLIANCE ===== */}
      <section className="px-4 pt-6">
        <div className="flex items-center gap-2 mb-3">
          <Trophy className="w-5 h-5 text-yellow-400" />
          <h2 className="text-sm font-bold uppercase tracking-wide">
            Alliance của bạn
          </h2>
        </div>

        {loading ? (
          <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 flex items-center justify-center">
            <div className="w-5 h-5 border-2 border-orange-500/30 border-t-orange-500 rounded-full animate-spin" />
          </div>
        ) : displayName ? (
          <div className="p-4 rounded-2xl bg-gradient-to-br from-orange-500/10 to-yellow-500/5 bg-white/5 backdrop-blur-xl border border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-orange-500/20 flex items-center justify-center">
                <span className="text-xl">🏰</span>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-sm">Vietnam Warriors</h3>
                <p className="text-xs text-slate-400">Rank #12 · 30/30 members</p>
              </div>
              <Link
                href="/chat"
                className="px-3 py-1.5 rounded-lg bg-orange-500/20 text-orange-500 text-xs font-medium hover:bg-orange-500/30 transition-colors"
              >
                Chat
              </Link>
            </div>
          </div>
        ) : (
          <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 flex flex-col items-center gap-3">
            <Trophy className="w-8 h-8 text-slate-600" />
            <p className="text-sm text-slate-400 text-center">
              Đăng nhập để xem thông tin Alliance của bạn
            </p>
            <button
              onClick={() => openAuth("login")}
              className="px-6 py-2 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 text-white text-sm font-medium hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg shadow-orange-500/20"
            >
              Đăng nhập
            </button>
          </div>
        )}
      </section>

      {/* ===== SECTION 5: COUNTRY COMMUNITIES ===== */}
      <section className="px-4 pt-6 pb-6">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-5 h-5 text-purple-400" />
          <h2 className="text-sm font-bold uppercase tracking-wide">
            Cộng đồng quốc gia
          </h2>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {countries.map((c) => (
            <button
              key={c.code}
              className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 transition-all active:scale-95"
            >
              <span className="text-3xl">{c.flag}</span>
              <span className="text-xs text-slate-300">{c.name}</span>
            </button>
          ))}
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="text-center py-4 px-4">
        <div className="flex items-center justify-center gap-2 mb-1">
          <Swords className="w-3 h-3 text-slate-600" />
          <span className="text-[10px] text-slate-600">
            footzone.vn · © 2026 LASTWAR HQ
          </span>
        </div>
      </footer>

      {/* ===== AUTH MODAL ===== */}
      <AuthModal
        open={authOpen}
        onClose={() => setAuthOpen(false)}
        mode={authMode}
      />
    </div>
  );
}
