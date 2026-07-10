"use client";

import { useState } from "react";
import { User, Settings, LogOut, Trophy, Zap, Target } from "lucide-react";
import AuthModal from "@/components/auth/AuthModal";
import { useAuth } from "@/components/auth/AuthProvider";
import { signOut } from "@/lib/supabase";

export default function ProfilePage() {
  const { user, loading } = useAuth();
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "register">("login");

  function openAuth(mode: "login" | "register") {
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
          { icon: Target, label: "Tools used", value: "12" },
          { icon: Zap, label: "Messages", value: "348" },
          { icon: Trophy, label: "Rank", value: "#127" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="p-3 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 text-center"
          >
            <stat.icon className="w-4 h-4 text-orange-500 mx-auto mb-1" />
            <p className="text-lg font-bold">{stat.value}</p>
            <p className="text-[10px] text-slate-500">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Menu */}
      <div className="mt-4 space-y-2">
        <button className="w-full flex items-center gap-3 p-3 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 transition-all">
          <Settings className="w-4 h-4 text-slate-400" />
          <span className="text-sm text-slate-300">Cài đặt</span>
        </button>
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
