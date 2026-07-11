"use client";

import { useState, useEffect } from "react";
import { Eye, Users } from "lucide-react";

export default function VisitorCounter() {
  const [totalVisitors, setTotalVisitors] = useState(0);
  const [onlineNow, setOnlineNow] = useState(0);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    // Load or initialize visitor count from localStorage
    const STORAGE_KEY = "lastwar_visitor_data";
    const stored = localStorage.getItem(STORAGE_KEY);

    let count = 15420; // Base count
    let sessionId = sessionStorage.getItem("lastwar_session_id");

    if (stored) {
      try {
        const data = JSON.parse(stored);
        count = data.totalVisitors || count;
      } catch {
        // ignore
      }
    }

    // New session = new visitor
    if (!sessionId) {
      sessionId = `s_${Date.now()}_${Math.random().toString(36).slice(2)}`;
      sessionStorage.setItem("lastwar_session_id", sessionId);
      count += 1;

      const data = { totalVisitors: count, lastVisit: Date.now() };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }

    setTotalVisitors(count);

    // Simulate online users (random 30-80)
    const base = Math.floor(Math.random() * 30) + 30;
    setOnlineNow(base);
    setAnimated(true);

    // Fluctuate online count
    const interval = setInterval(() => {
      setOnlineNow((prev) => {
        const delta = Math.floor(Math.random() * 7) - 3;
        return Math.max(15, Math.min(120, prev + delta));
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center gap-2 py-2">
      <div className="flex items-center gap-4 flex-wrap justify-center">
        {/* Total Visitors */}
        <div className="flex items-center gap-1.5">
          <Eye className="w-3.5 h-3.5 text-blue-400" />
          <span className="text-[10px] text-slate-500">Tổng lượt truy cập:</span>
          <span className={`text-[11px] font-bold font-mono text-blue-400 transition-all ${animated ? "opacity-100" : "opacity-0"}`}>
            {totalVisitors.toLocaleString()}
          </span>
        </div>

        {/* Divider */}
        <span className="text-slate-700">·</span>

        {/* Online Now */}
        <div className="flex items-center gap-1.5">
          <span className="relative flex items-center">
            <Users className="w-3.5 h-3.5 text-green-400" />
            <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          </span>
          <span className="text-[10px] text-slate-500">Đang online:</span>
          <span className="text-[11px] font-bold font-mono text-green-400">
            {onlineNow}
          </span>
        </div>
      </div>
    </div>
  );
}
