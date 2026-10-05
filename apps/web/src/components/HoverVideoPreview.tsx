"use client";

import { useState, useRef, useEffect } from "react";
import { Play, Volume2, Sparkles, RotateCcw } from "lucide-react";
import { useI18n } from "@/lib/i18n";

interface HoverVideoPreviewProps {
  youtubeId: string;
  title: string;
  className?: string;
  isShort?: boolean;
}

export default function HoverVideoPreview({
  youtubeId,
  title,
  className = "",
  isShort = false,
}: HoverVideoPreviewProps) {
  const { t } = useI18n();
  const [isHovered, setIsHovered] = useState(false);
  const [isPlayingFull, setIsPlayingFull] = useState(false);
  const [previewProgress, setPreviewProgress] = useState(0);
  const hoverTimerRef = useRef<NodeJS.Timeout | null>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // When hover state changes
  useEffect(() => {
    if (isHovered && !isPlayingFull) {
      setPreviewProgress(0);
      const startTime = Date.now();
      const duration = 5000; // 5 seconds preview

      progressIntervalRef.current = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(100, (elapsed / duration) * 100);
        setPreviewProgress(progress);
        if (progress >= 100) {
          if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
        }
      }, 50);

      // Reset hover preview after 5s or loop
      hoverTimerRef.current = setTimeout(() => {
        // Continue looping or keep preview
      }, 5000);
    } else {
      setPreviewProgress(0);
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
      if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    }

    return () => {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
      if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    };
  }, [isHovered, isPlayingFull]);

  const handleMouseEnter = () => {
    if (!isPlayingFull) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isPlayingFull) {
      setIsHovered(false);
    }
  };

  const handleClickToPlayFull = () => {
    setIsPlayingFull(true);
    setIsHovered(false);
  };

  return (
    <div
      className={`relative w-full aspect-video rounded-2xl overflow-hidden bg-black/90 border border-red-500/25 group cursor-pointer transition-all duration-300 shadow-2xl ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={!isPlayingFull ? handleClickToPlayFull : undefined}
    >
      {/* 1. FULL PLAYER MODE (Khi người dùng click để xem toàn bộ video) */}
      {isPlayingFull ? (
        <div className="relative w-full h-full">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full border-0"
          />
          {/* Nút thoát chế độ full về preview */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsPlayingFull(false);
              setIsHovered(false);
            }}
            className="absolute top-2 right-2 z-20 px-2 py-1 rounded-lg bg-black/80 hover:bg-red-600 text-[10px] text-white font-bold transition-all border border-white/20 shadow"
            title={t("video.minimize")}
          >
            {t("video.minimize")}
          </button>
        </div>
      ) : (
        <>
          {/* 2. HOVER PREVIEW IFRAME (Tự chạy 5 giây khi rê chuột) */}
          {isHovered ? (
            <div className="relative w-full h-full">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&mute=1&loop=1&playlist=${youtubeId}&controls=0&modestbranding=1&rel=0&start=0&end=5`}
                title={`${title} 5s preview`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                className="w-full h-full border-0 pointer-events-none scale-105"
              />

              {/* 5-Second Preview Progress Bar */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-white/20 z-20">
                <div
                  className="h-full bg-gradient-to-r from-red-500 via-rose-500 to-amber-400 transition-all duration-75 ease-linear shadow-sm"
                  style={{ width: `${previewProgress}%` }}
                />
              </div>

              {/* Preview Badge Indicator */}
              <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-600/90 text-white text-[10px] font-black uppercase tracking-wider shadow-lg shadow-red-950/80 border border-red-400/30 animate-pulse">
                <span className="w-2 h-2 rounded-full bg-white" />
                <span>{t("video.preview5s")}</span>
              </div>

              {/* Click to play full banner overlay on bottom */}
              <div className="absolute inset-x-0 bottom-0 p-2.5 bg-gradient-to-t from-black/90 via-black/50 to-transparent z-20 flex items-center justify-between text-xs text-white">
                <span className="text-[11px] font-bold text-amber-300 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-400" /> {t("video.clickFull")}
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-white/20 font-mono font-bold">
                  {Math.ceil(5 - (previewProgress / 100) * 5)}s
                </span>
              </div>
            </div>
          ) : (
            /* 3. STATIC THUMBNAIL STATE (Chưa rê chuột) */
            <div className="relative w-full h-full">
              <img
                src={`https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`}
                alt={title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />

              {/* Dark vignette backdrop */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/30 group-hover:bg-black/10 transition-all duration-300" />

              {/* Big Red Glowing Play Button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-gradient-to-tr from-red-600 via-rose-600 to-amber-500 flex items-center justify-center shadow-xl shadow-red-600/50 group-hover:scale-110 transition-transform duration-300 border-2 border-white/20">
                  <Play className="w-7 h-7 sm:w-8 sm:h-8 text-white fill-white ml-1" />
                </div>
              </div>

              {/* Cyber War Room Video Badge */}
              <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-black/75 border border-red-500/30 text-[10px] font-black uppercase tracking-wider text-red-300 shadow">
                {isShort ? "📱 YOUTUBE SHORT" : "🎬 MONICA BOT VIDEO"}
              </div>

              {/* Hover Animation Hint Callout */}
              <div className="absolute bottom-3 inset-x-3 flex items-center justify-between text-[11px] text-slate-300 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-xl border border-red-500/20">
                <span className="font-semibold truncate max-w-[75%]">{title}</span>
                <span className="text-amber-400 font-bold text-[10px] uppercase flex items-center gap-1 shrink-0">
                  <Sparkles className="w-3 h-3" /> {t("video.hover5s")}
                </span>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
