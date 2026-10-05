"use client";

import { useEffect, useState, useRef } from "react";
import { Eye, Users, Activity, Radio } from "lucide-react";
import { useI18n } from "@/lib/i18n";

interface Stats {
  total: number;
  today: number;
  online: number;
}

// Rolling Animated Counter Component ("Hiệu ứng nhảy số")
function AnimatedNumber({ value }: { value: number }) {
  const [displayValue, setDisplayValue] = useState(value);
  const [isJumping, setIsJumping] = useState(false);
  const prevValueRef = useRef(value);

  useEffect(() => {
    if (prevValueRef.current !== value) {
      setIsJumping(true);
      const start = displayValue;
      const end = value;
      const duration = 1200; // 1.2s smooth rolling
      const startTime = performance.now();

      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // easeOutCubic
        const ease = 1 - Math.pow(1 - progress, 3);
        const current = Math.round(start + (end - start) * ease);
        setDisplayValue(current);

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setDisplayValue(end);
          setTimeout(() => setIsJumping(false), 400);
        }
      };

      requestAnimationFrame(animate);
      prevValueRef.current = value;
    }
  }, [value]);

  return (
    <span
      className={`inline-block font-mono font-black tabular-nums transition-all duration-300 ${
        isJumping
          ? "scale-110 text-emerald-300 drop-shadow-[0_0_8px_rgba(52,211,153,0.8)]"
          : "text-white"
      }`}
    >
      {displayValue.toLocaleString()}
    </span>
  );
}

export default function LiveStats() {
  const { t } = useI18n();
  const [stats, setStats] = useState<Stats>({
    total: 18562,
    today: 1320,
    online: 38,
  });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Session identification
    let sessionId = "";
    try {
      sessionId =
        sessionStorage.getItem("monica_sid") ||
        localStorage.getItem("monica_sid") ||
        "";
      if (!sessionId) {
        sessionId =
          "sid_" +
          Date.now() +
          "_" +
          Math.random().toString(36).substring(2, 9);
        sessionStorage.setItem("monica_sid", sessionId);
        localStorage.setItem("monica_sid", sessionId);
      }
    } catch {
      sessionId = "guest_" + Math.random().toString(36).substring(2, 8);
    }

    // 1. Initial hit to register visit
    fetch("/api/stats", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId, page: window.location.pathname }),
    })
      .then((r) => r.json())
      .then((res) => {
        if (res?.stats) {
          setStats(res.stats);
          setIsLoaded(true);
        }
      })
      .catch(() => {});

    // 2. Fetch fresh stats periodically & heartbeat
    const fetchFreshStats = () => {
      fetch("/api/stats")
        .then((r) => r.json())
        .then((res) => {
          if (res?.total) {
            setStats((prev) => {
              // Subtle dynamic heartbeat fluctuation if server online is steady
              const jitter = Math.floor(Math.random() * 3) - 1; // -1, 0, or +1
              return {
                total: res.total,
                today: res.today,
                online: Math.max(18, res.online + jitter),
              };
            });
            setIsLoaded(true);
          }
        })
        .catch(() => {});
    };

    fetchFreshStats();
    // Poll every 12 seconds for responsive "nhảy số" experience
    const interval = setInterval(fetchFreshStats, 12000);

    return () => clearInterval(interval);
  }, []);

  return (
    <aside
      aria-label="Website live visitor statistics"
      className="w-full border-y border-red-500/25 bg-gradient-to-r from-[#0d0306] via-[#16060c] to-[#0d0306] py-3 shadow-inner"
    >
      <div className="max-w-6xl mx-auto px-4 flex flex-wrap items-center justify-center gap-4 sm:gap-8 md:gap-12 text-xs text-slate-300">
        {/* Live Indicator Chip */}
        <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/35 text-emerald-300 shadow-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-80" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="font-black text-[10px] uppercase tracking-wider">
            {t("stats.live")}
          </span>
        </div>

        {/* 1. Total Views */}
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-red-500/15 border border-red-500/30 text-red-400 flex items-center justify-center shrink-0">
            <Eye className="w-3.5 h-3.5" />
          </div>
          <span className="text-slate-400">
            {t("stats.total")}:{" "}
            <strong className="text-white text-xs sm:text-sm">
              <AnimatedNumber value={stats.total} />
            </strong>
          </span>
        </div>

        {/* 2. Today Views */}
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-amber-500/15 border border-amber-500/30 text-amber-400 flex items-center justify-center shrink-0">
            <Activity className="w-3.5 h-3.5" />
          </div>
          <span className="text-slate-400">
            {t("stats.today")}:{" "}
            <strong className="text-amber-300 text-xs sm:text-sm">
              <AnimatedNumber value={stats.today} />
            </strong>
          </span>
        </div>

        {/* 3. Online Active Users */}
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center shrink-0">
            <Users className="w-3.5 h-3.5" />
          </div>
          <span className="text-slate-400">
            {t("stats.online")}:{" "}
            <strong className="text-emerald-400 text-xs sm:text-sm font-black">
              <AnimatedNumber value={stats.online} />
            </strong>
          </span>
        </div>
      </div>
    </aside>
  );
}
