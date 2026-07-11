"use client";

import { useState, useEffect } from "react";
import { Eye, Users } from "lucide-react";

export default function VisitorCounter() {
  const [totalVisitors, setTotalVisitors] = useState(0);
  const [onlineNow, setOnlineNow] = useState(0);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const STORAGE_KEY = "lastwar_visitor_data";
    const stored = localStorage.getItem(STORAGE_KEY);
    let count = 15420;
    let sessionId = sessionStorage.getItem("lastwar_session_id");
    if (stored) { try { const d = JSON.parse(stored); count = d.totalVisitors || count; } catch {} }
    if (!sessionId) {
      sessionId = `s_${Date.now()}_${Math.random().toString(36).slice(2)}`;
      sessionStorage.setItem("lastwar_session_id", sessionId);
      count += 1;
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ totalVisitors: count, lastVisit: Date.now() }));
    }
    setTotalVisitors(count);
    setOnlineNow(Math.floor(Math.random() * 30) + 30);
    setAnimated(true);
    const interval = setInterval(() => {
      setOnlineNow((p) => Math.max(15, Math.min(120, p + Math.floor(Math.random() * 7) - 3)));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center gap-2 py-2">
      <div className="flex items-center gap-4 flex-wrap justify-center">
        <div className="flex items-center gap-1.5">
          <Eye className="w-3.5 h-3.5 text-blue-400" />
          <span className="text-[10px] text-slate-500">Tổng lượt truy cập:</span>
          <span className={`text-[11px] font-bold font-mono text-blue-400 transition-all ${animated ? "opacity-100" : "opacity-0"}`}>
            {totalVisitors.toLocaleString()}
          </span>
        </div>
        <span className="text-slate-700">·</span>
        <div className="flex items-center gap-1.5">
          <span className="relative flex items-center">
            <Users className="w-3.5 h-3.5 text-green-400" />
            <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          </span>
          <span className="text-[10px] text-slate-500">Đang online:</span>
          <span className="text-[11px] font-bold font-mono text-green-400">{onlineNow}</span>
        </div>
      </div>
    </div>
  );
}