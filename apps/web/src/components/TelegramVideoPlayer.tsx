"use client";

import { useState, useRef, useEffect } from "react";
import { Play, Volume2, VolumeX, Maximize, Film } from "lucide-react";
import { useI18n } from "@/lib/i18n";

interface TelegramVideoPlayerProps {
  videoUrl: string;
  posterUrl?: string | null;
  title?: string;
  telegramUrl?: string;
}

export default function TelegramVideoPlayer({
  videoUrl,
  posterUrl,
  title,
  telegramUrl,
}: TelegramVideoPlayerProps) {
  const { locale } = useI18n();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isActivated, setIsActivated] = useState(false); // User clicked to watch full
  const [hasError, setHasError] = useState(false);
  const previewTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Hover 5s preview logic (Desktop)
  const handleMouseEnter = () => {
    setIsHovered(true);
    if (isActivated || !videoRef.current) return;

    try {
      videoRef.current.muted = true;
      videoRef.current.currentTime = 0;
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
            // Limit preview to 5 seconds, then loop or pause
            if (previewTimerRef.current) clearTimeout(previewTimerRef.current);
            previewTimerRef.current = setTimeout(() => {
              if (videoRef.current && !isActivated) {
                videoRef.current.currentTime = 0;
                videoRef.current.play().catch(() => {});
              }
            }, 5000);
          })
          .catch(() => {});
      }
    } catch {}
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (previewTimerRef.current) {
      clearTimeout(previewTimerRef.current);
      previewTimerRef.current = null;
    }

    if (!isActivated && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  };

  const handleActivateFull = () => {
    setIsActivated(true);
    if (previewTimerRef.current) {
      clearTimeout(previewTimerRef.current);
      previewTimerRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.muted = false;
      videoRef.current.play().catch(() => {
        // Fallback if browser blocks unmuted autoplay
        if (videoRef.current) {
          videoRef.current.muted = true;
          videoRef.current.play().catch(() => {});
        }
      });
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    return () => {
      if (previewTimerRef.current) {
        clearTimeout(previewTimerRef.current);
      }
    };
  }, []);

  const isVi = locale === "vi";

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative w-full aspect-video rounded-xl overflow-hidden bg-black border border-red-500/30 group shadow-lg"
    >
      <video
        ref={videoRef}
        src={videoUrl}
        poster={posterUrl || undefined}
        controls={isActivated}
        playsInline
        preload="metadata"
        onError={() => setHasError(true)}
        onPlay={() => setIsPlaying(true)}
        onPause={() => {
          if (isActivated) setIsPlaying(false);
        }}
        className="w-full h-full object-contain bg-black"
      />

      {/* Fallback if error */}
      {hasError && (
        <div className="absolute inset-0 bg-black/90 flex flex-col items-center justify-center p-4 text-center">
          <Film className="w-8 h-8 text-red-500 mb-2" />
          <p className="text-xs text-slate-300 mb-2">
            {isVi ? "Video đang tải từ Telegram..." : "Video streaming from Telegram..."}
          </p>
          {telegramUrl && (
            <a
              href={telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-amber-400 underline font-bold"
            >
              {isVi ? "Xem trực tiếp trên Telegram" : "Watch directly on Telegram"}
            </a>
          )}
        </div>
      )}

      {/* Overlay when NOT activated */}
      {!isActivated && !hasError && (
        <div
          onClick={handleActivateFull}
          className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors flex items-center justify-center cursor-pointer"
        >
          {/* Top Badge */}
          <div className="absolute top-2 left-2 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-black/75 backdrop-blur-md border border-red-500/40 text-red-300 text-[10px] font-black uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <Film className="w-3 h-3 text-red-400" />
            <span>{isVi ? "Video Telegram" : "Telegram Video"}</span>
          </div>

          {/* Central Play Button */}
          <button
            aria-label="Play video"
            className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-red-600/90 text-white flex items-center justify-center shadow-xl shadow-red-950/60 transition-transform duration-200 border-2 border-red-400/50 ${
              isHovered && isPlaying
                ? "scale-90 opacity-40 group-hover:opacity-60"
                : "scale-100 group-hover:scale-110"
            }`}
          >
            <Play className="w-5 h-5 sm:w-6 sm:h-6 fill-white ml-0.5" />
          </button>

          {/* Bottom Hint Banner */}
          <div className="absolute bottom-2 inset-x-2 flex items-center justify-between px-2.5 py-1 rounded-lg bg-black/75 backdrop-blur-md border border-white/10 text-[10px] text-slate-300">
            <span className="font-semibold text-amber-300 truncate">
              {isPlaying && isHovered
                ? isVi
                  ? "⚡ Đang xem trước 5s · Bấm để bật tiếng"
                  : "⚡ 5s Preview · Click for sound"
                : isVi
                ? "Rê chuột xem trước 5s · Bấm để xem full"
                : "Hover for 5s preview · Click to play"}
            </span>
            <span className="text-slate-400 shrink-0 ml-2">
              {isVi ? "Âm thanh" : "Sound"}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
