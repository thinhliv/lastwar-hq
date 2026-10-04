"use client";

import { useEffect, useState } from "react";
import { Eye, Users, Activity } from "lucide-react";

interface Stats {
  total: number;
  today: number;
  online: number;
}

export default function LiveStats() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    // Generate or get session ID
    let sessionId = sessionStorage.getItem("monica_sid");
    if (!sessionId) {
      sessionId = crypto.randomUUID();
      sessionStorage.setItem("monica_sid", sessionId);
    }

    // Record visit
    fetch("/api/stats", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId, page: window.location.pathname }),
    }).catch(() => {});

    // Fetch stats
    const loadStats = () => {
      fetch("/api/stats")
        .then((r) => r.json())
        .then(setStats)
        .catch(() => {});
    };

    loadStats();
    const interval = setInterval(loadStats, 30000); // Refresh every 30s

    return () => clearInterval(interval);
  }, []);

  const s = stats || { total: 0, today: 0, online: 0 };

  return (
    <div className="fixed bottom-[68px] md:bottom-0 inset-x-0 z-40 w-full border-t border-white/5 bg-[#0c0608]/95 backdrop-blur-sm">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-center gap-6 sm:gap-10 text-[11px] sm:text-xs text-slate-400">
        <div className="flex items-center gap-1.5">
          <Eye className="w-3.5 h-3.5 text-emerald-400" />
          <span>Tổng: <strong className="text-white">{s.total.toLocaleString()}</strong></span>
        </div>
        <div className="flex items-center gap-1.5">
          <Activity className="w-3.5 h-3.5 text-amber-400" />
          <span>Hôm nay: <strong className="text-white">{s.today.toLocaleString()}</strong></span>
        </div>
        <div className="flex items-center gap-1.5">
          <Users className="w-3.5 h-3.5 text-sky-400" />
          <span>Online: <strong className="text-white">{s.online}</strong></span>
        </div>
      </div>
    </div>
  );
}
