import LanguageSwitcher from "@/components/LanguageSwitcher";
import { Swords, Bell } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3">
        <button className="p-2 rounded-lg glass hover:bg-white/10 transition-colors">
          <Bell className="w-5 h-5 text-slate-400" />
        </button>
        <LanguageSwitcher />
      </header>

      {/* Hero */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 -mt-10">
        {/* Logo */}
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-orange-500/30 blur-3xl rounded-full" />
          <div className="relative w-28 h-28 rounded-3xl bg-gradient-to-br from-orange-500 to-orange-700 flex items-center justify-center shadow-2xl shadow-orange-500/30 animate-float">
            <Swords className="w-14 h-14 text-white" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-4xl font-black tracking-tight text-center mb-2">
          <span className="text-orange-500">⚔️ LASTWAR</span>{" "}
          <span className="text-slate-100">HQ</span>
        </h1>
        <p className="text-slate-400 text-sm text-center max-w-xs mb-8">
          Cộng đồng toàn cầu cho game Last War: Survival
        </p>

        {/* Coming Soon Badge */}
        <div className="flex items-center gap-2 px-4 py-2 rounded-full glass">
          <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse-glow" />
          <span className="text-sm text-slate-300">Coming Soon</span>
        </div>

        {/* Feature Preview */}
        <div className="grid grid-cols-3 gap-3 mt-12 w-full max-w-sm">
          {[
            { icon: "🧮", label: "Tools" },
            { icon: "💬", label: "Chat" },
            { icon: "📰", label: "News" },
            { icon: "🗺️", label: "Maps" },
            { icon: "🏆", label: "Ranking" },
            { icon: "🌍", label: "Global" },
          ].map((f) => (
            <div
              key={f.label}
              className="flex flex-col items-center gap-1.5 p-3 rounded-xl glass opacity-60"
            >
              <span className="text-2xl">{f.icon}</span>
              <span className="text-xs text-slate-400">{f.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center py-6">
        <p className="text-xs text-slate-600">
          footzone.vn · © 2026 LASTWAR HQ
        </p>
      </footer>
    </div>
  );
}
