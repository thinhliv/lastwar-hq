"use client";

import { useState } from "react";
import {
  User,
  Settings,
  LogOut,
  Trophy,
  Zap,
  Target,
  Gamepad2,
  Server,
  Castle,
  Star,
  Award,
  TrendingUp,
  ChevronRight,
} from "lucide-react";
import AuthModal from "@/components/auth/AuthModal";
import { useAuth } from "@/components/auth/AuthProvider";
import { signOut } from "@/lib/supabase";
import Link from "next/link";

export default function ProfilePage() {
  const { user, loading } = useAuth();
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "register">("login");
  const [showGameSettings, setShowGameSettings] = useState(false);
  const [gameName, setGameName] = useState("");
  const [serverId, setServerId] = useState("");
  const [allianceName, setAllianceName] = useState("");

  function openAuth(mode: "login" | "register") {
    setAuthMode(mode);
    setAuthOpen(true);
  }

  const displayName = user
    ? user.user_metadata?.full_name ||
      user.user_metadata?.name ||
      user.email?.split("@")[0] ||
      "Ch? huy"
    : null;

  const avatarUrl = user?.user_metadata?.avatar_url || user?.user_metadata?.picture;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-orange-500/30 border-t-orange-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (!displayName) {
    return (
      <div className="min-h-screen px-4 py-6">
        <h1 className="text-2xl font-bold mb-6">👤 Hồ sơ</h1>

        <div className="p-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 flex flex-col items-center gap-4">
          <div className="w-20 h-20 rounded-full bg-slate-700/50 flex items-center justify-center">
            <User className="w-10 h-10 text-slate-600" />
          </div>
          <div className="text-center">
            <p className="text-slate-300 text-sm font-medium">Chưa đăng nhập</p>
            <p className="text-slate-500 text-xs mt-1">
              Đăng nhập để đồng bộ dữ liệu và tham gia cộng đồng
            </p>
          </div>
          <div className="flex flex-col gap-2 w-full max-w-xs">
            <button
              onClick={() => openAuth("login")}
              className="py-3 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 text-white text-sm font-semibold hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg shadow-orange-500/20"
            >
              Đăng nhập
            </button>
            <button
              onClick={() => openAuth("register")}
              className="py-3 rounded-xl bg-white/5 border border-white/10 text-slate-300 text-sm font-medium hover:bg-white/10 transition-all"
            >
              Tạo tài khoản mới
            </button>
          </div>
        </div>

        <AuthModal
          open={authOpen}
          onClose={() => setAuthOpen(false)}
          mode={authMode}
        />
      </div>
    );
  }

  // Logged in
  return (
    <div className="min-h-screen px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">👤 Hồ sơ</h1>

      {/* Profile Card */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-orange-500/10 to-purple-500/5 bg-white/5 backdrop-blur-xl border border-white/10">
        <div className="flex flex-col items-center gap-3">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt="avatar"
              className="w-20 h-20 rounded-full border-2 border-orange-500/30"
            />
          ) : (
            <div className="w-20 h-20 rounded-full bg-orange-500/20 flex items-center justify-center">
              <span className="text-2xl font-bold text-orange-500">
                {displayName.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
          <div className="text-center">
            <h2 className="font-bold text-lg">{displayName}</h2>
            <p className="text-xs text-slate-400">{user?.email}</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mt-4">
        {[
          { icon: Target, label: "Tools used", value: "12", color: "text-orange-400" },
          { icon: Zap, label: "Messages", value: "348", color: "text-blue-400" },
          { icon: Trophy, label: "Rank", value: "#127", color: "text-yellow-400" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="p-3 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 text-center"
          >
            <stat.icon className={`w-4 h-4 ${stat.color} mx-auto mb-1`} />
            <p className="text-lg font-bold">{stat.value}</p>
            <p className="text-[10px] text-slate-500">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Hồ sơ game Section */}
      <div className="mt-4">
        <button
          onClick={() => setShowGameSettings(!showGameSettings)}
          className="w-full flex items-center gap-3 p-3 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 transition-all"
        >
          <Gamepad2 className="w-4 h-4 text-orange-400" />
          <span className="text-sm text-slate-300 flex-1 text-left">Hồ sơ game</span>
          <span className="text-[10px] text-slate-500">
            {gameName ? `${gameName} · S${serverId}` : "Chưa thiết lập"}
          </span>
          <ChevronRight className={`w-4 h-4 text-slate-500 transition-transform ${showGameSettings ? "rotate-90" : ""}`} />
        </button>

        {showGameSettings && (
          <div className="mt-2 p-4 rounded-2xl glass space-y-3">
            <div>
              <label className="text-[10px] text-slate-400 uppercase tracking-wide mb-1 block flex items-center gap-1">
                <User className="w-3 h-3" /> In-game Name
              </label>
              <input
                type="text"
                value={gameName}
                onChange={(e) => setGameName(e.target.value)}
                placeholder="Tên trong game..."
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 outline-none focus:border-orange-500/30"
              />
            </div>
            <div>
              <label className="text-[10px] text-slate-400 uppercase tracking-wide mb-1 block flex items-center gap-1">
                <Server className="w-3 h-3" /> Server
              </label>
              <input
                type="number"
                value={serverId}
                onChange={(e) => setServerId(e.target.value)}
                placeholder="42"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 outline-none focus:border-orange-500/30"
              />
            </div>
            <div>
              <label className="text-[10px] text-slate-400 uppercase tracking-wide mb-1 block flex items-center gap-1">
                <Castle className="w-3 h-3" /> Alliance
              </label>
              <input
                type="text"
                value={allianceName}
                onChange={(e) => setAllianceName(e.target.value)}
                placeholder="Tên alliance..."
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 outline-none focus:border-orange-500/30"
              />
            </div>
            <button className="w-full py-2 rounded-lg bg-orange-500/20 text-orange-400 text-sm font-medium hover:bg-orange-500/30 transition-colors">
              Lưu Hồ sơ game
            </button>
          </div>
        )}
      </div>

      {/* Achievements */}
      <div className="mt-4">
        <div className="flex items-center gap-2 mb-2">
          <Award className="w-4 h-4 text-yellow-400" />
          <h3 className="text-xs font-bold uppercase tracking-wide text-slate-300">Thành tựu</h3>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {[
            { icon: "🏆", label: "First Win", unlocked: true },
            { icon: "⚔️", label: "Warrior", unlocked: true },
            { icon: "🏰", label: "Alliance", unlocked: true },
            { icon: "💎", label: "Premium", unlocked: false },
            { icon: "🔥", label: "Streak 7", unlocked: true },
            { icon: "🌟", label: "Top 100", unlocked: false },
            { icon: "📅", label: "Daily 30", unlocked: true },
            { icon: "🚀", label: "Speedrun", unlocked: false },
          ].map((badge) => (
            <div
              key={badge.label}
              className={`flex flex-col items-center gap-1 p-2 rounded-xl ${
                badge.unlocked
                  ? "bg-white/5 border border-white/10"
                  : "bg-slate-900/30 border border-white/5 opacity-40"
              }`}
            >
              <span className="text-xl">{badge.icon}</span>
              <span className="text-[8px] text-slate-400 text-center">{badge.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Menu */}
      <div className="mt-4 space-y-2">
        <Link
          href="/settings"
          className="w-full flex items-center gap-3 p-3 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 transition-all"
        >
          <Settings className="w-4 h-4 text-slate-400" />
          <span className="text-sm text-slate-300 flex-1">Cài đặt</span>
          <ChevronRight className="w-4 h-4 text-slate-500" />
        </Link>
        <button
          onClick={() => signOut()}
          className="w-full flex items-center gap-3 p-3 rounded-xl bg-white/5 backdrop-blur-xl border border-red-500/20 hover:bg-red-500/10 transition-all"
        >
          <LogOut className="w-4 h-4 text-red-400" />
          <span className="text-sm text-red-400">Đăng xuất</span>
        </button>
      </div>

      <AuthModal
        open={authOpen}
        onClose={() => setAuthOpen(false)}
        mode={authMode}
      />
    </div>
  );
}
