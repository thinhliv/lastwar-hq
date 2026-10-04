"use client";

import { useState, useRef } from "react";
import { Play } from "lucide-react";

interface HoverVideoPreviewProps {
  youtubeId: string;
  title: string;
  className?: string;
}

export default function HoverVideoPreview({ youtubeId, title, className = "" }: HoverVideoPreviewProps) {
  const [isHovered, setIsHovered] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    timeoutRef.current = setTimeout(() => {
      setIsHovered(true);
    }, 200); // 200ms delay to avoid flicker
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsHovered(false);
  };

  return (
    <div
      className={`relative w-full aspect-video rounded-2xl overflow-hidden bg-black/80 border border-red-500/20 group cursor-pointer ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Thumbnail - always loaded */}
      {!isHovered && (
        <>
          <img
            src={`https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {/* Play button overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/10 transition-all duration-300">
            <div className="w-16 h-16 rounded-full bg-red-600/90 flex items-center justify-center shadow-lg shadow-red-600/40 group-hover:scale-110 transition-transform duration-300">
              <Play className="w-7 h-7 text-white fill-white ml-1" />
            </div>
          </div>
          {/* Hover hint */}
          <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-lg bg-black/70 text-[10px] text-white/80 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            🎬 Hover để xem trước
          </div>
        </>
      )}

      {/* YouTube embed - only when hovered, autoplay muted, loops 5s segment */}
      {isHovered && (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&mute=1&loop=1&playlist=${youtubeId}&controls=0&modestbranding=1&rel=0&start=0&end=5`}
          title={`${title} preview`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          className="w-full h-full border-0 pointer-events-none"
        />
      )}
    </div>
  );
}
