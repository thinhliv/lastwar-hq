"use client";

import { useState, useRef, useEffect } from "react";
import { Play, Volume2, VolumeX, Maximize, Film, ExternalLink, RefreshCw } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import Image from "next/image";

interface TelegramVideoPlayerProps {
  videoUrl?: string | null;
  posterUrl?: string | null;
  title?: string;
  telegramUrl?: string;
  duration?: string | null;
  postId?: string;
}

export default function TelegramVideoPlayer({
  videoUrl,
  posterUrl,
  title,
  telegramUrl,
  duration,
  postId,
}: TelegramVideoPlayerProps) {
  const { locale } = useI18n();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isActivated, setIsActivated] = useState(false); // User clicked to watch full
  const [showEmbedIframe, setShowEmbedIframe] = useState(false);
  const [hasError, setHasError] = useState(false);
  const previewTimerRef = useRef<NodeJS.Timeout | null>(null);

  const isVi = locale === "vi";

  // Hover 5s preview logic (Desktop) for direct video streams
  const handleMouseEnter = () => {
    setIsHovered(true);
    if (!videoUrl || isActivated || !videoRef.current) return;

    try {
      videoRef.current.muted = true;
      videoRef.current.currentTime = 0;
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
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
    if (videoUrl && !hasError) {
      setIsActivated(true);
      if (previewTimerRef.current) {
        clearTimeout(previewTimerRef.current);
        previewTimerRef.current = null;
      }
      if (videoRef.current) {
        videoRef.current.muted = false;
        videoRef.current.play().catch(() => {
          if (videoRef.current) {
            videoRef.current.muted = true;
            videoRef.current.play().catch(() => {});
          }
        });
        setIsPlaying(true);
      }
    } else {
      // If direct MP4 is not available or too large for bot API, open embedded Telegram player
      setShowEmbedIframe(true);
    }
  };

  useEffect(() => {
    return () => {
      if (previewTimerRef.current) {
        clearTimeout(previewTimerRef.current);
      }
    };
  }, []);

  const embedUrl = postId ? `https://t.me/${postId}?embed=1` : telegramUrl ? `${telegramUrl}?embed=1` : null;

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative w-full aspect-video rounded-xl overflow-hidden bg-black border border-red-500/30 group shadow-lg"
    >
      {/* 1. Direct HTML5 Video Player */}
      {videoUrl && !hasError && !showEmbedIframe ? (
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
      ) : showEmbedIframe && embedUrl ? (
        /* 2. Embedded Telegram Player Iframe */
        <div className="relative w-full h-full bg-black flex flex-col">
          <iframe
            src={embedUrl}
            title={title || "Telegram Video Post"}
            className="w-full h-full border-0"
            allowFullScreen
          />
          <button
            onClick={() => setShowEmbedIframe(false)}
            className="absolute top-2 right-2 z-20 px-2 py-1 rounded bg-black/80 hover:bg-black text-[10px] text-slate-300 hover:text-white border border-white/20 transition-all flex items-center gap-1"
          >
            <RefreshCw className="w-3 h-3" />
            <span>{isVi ? "Đóng" : "Close"}</span>
          </button>
        </div>
      ) : (
        /* 3. Poster Image with Play Overlay */
        posterUrl && (
          <div className="relative w-full h-full">
            <Image
              src={posterUrl}
              alt={title || "Telegram Video"}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              unoptimized
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
          </div>
        )
      )}

      {/* Overlay when NOT activated / preview state */}
      {!isActivated && !showEmbedIframe && (
        <div
          onClick={handleActivateFull}
          className="absolute inset-0 transition-colors flex items-center justify-center cursor-pointer"
        >
          {/* Top Badge: Video & Duration */}
          <div className="absolute top-2 left-2 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-black/80 backdrop-blur-md border border-red-500/40 text-red-300 text-[10px] font-black uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <Film className="w-3 h-3 text-red-400" />
            <span>{isVi ? "Video Telegram" : "Telegram Video"}</span>
            {duration && (
              <>
                <span className="text-red-500/60">·</span>
                <span className="text-amber-400 font-extrabold">{duration}</span>
              </>
            )}
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
          <div className="absolute bottom-2 inset-x-2 flex items-center justify-between px-2.5 py-1 rounded-lg bg-black/80 backdrop-blur-md border border-white/10 text-[10px] text-slate-300">
            <span className="font-semibold text-amber-300 truncate">
              {videoUrl && isPlaying && isHovered
                ? isVi
                  ? "⚡ Đang xem trước 5s · Bấm để bật tiếng"
                  : "⚡ 5s Preview · Click for sound"
                : isVi
                ? `▶ Bấm để phát video ${duration ? `(${duration})` : ""}`
                : `▶ Click to play video ${duration ? `(${duration})` : ""}`}
            </span>
            {telegramUrl && (
              <a
                href={telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-sky-300 hover:text-white shrink-0 ml-2 flex items-center gap-1 font-bold underline"
              >
                <span>Telegram</span>
                <ExternalLink className="w-2.5 h-2.5" />
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
