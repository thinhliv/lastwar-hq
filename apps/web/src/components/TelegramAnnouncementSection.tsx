"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  Send,
  ExternalLink,
  Sparkles,
  Calendar,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  X,
  Radio,
  Maximize2,
  Globe,
  Camera,
  Film,
} from "lucide-react";
import { useI18n } from "@/lib/i18n";
import HoverVideoPreview from "@/components/HoverVideoPreview";
import TelegramVideoPlayer from "@/components/TelegramVideoPlayer";

export interface AnnouncementItem {
  id: string;
  postNumber?: string;
  date: string;
  versionBadge?: string;
  content: string;
  originalContent: string;
  translations?: Record<string, string>;
  imageUrl?: string | null;
  videoUrl?: string | null;
  youtubeId?: string | null;
  telegramUrl: string;
  isAutoTranslated?: boolean;
}

export default function TelegramAnnouncementSection() {
  const { t, locale } = useI18n();
  const [announcements, setAnnouncements] = useState<AnnouncementItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({});
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    fetch(`/api/announcements?lang=${encodeURIComponent(locale)}&limit=6`)
      .then((res) => res.json())
      .then((data) => {
        if (isMounted && data?.announcements) {
          setAnnouncements(data.announcements);
        }
      })
      .catch((err) => {
        console.error("Failed to load announcements:", err);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [locale]);

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const formatDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString(locale === "vi" ? "vi-VN" : "en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <section className="py-12 sm:py-16 lg:py-20 relative overflow-hidden bg-gradient-to-b from-[#0a0305] via-[#0f0408] to-[#080204] border-t border-red-500/20">
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[350px] sm:w-[500px] h-[350px] bg-red-600/10 blur-[130px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 right-10 w-[300px] h-[300px] bg-amber-500/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 sm:mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/15 border border-red-500/35 text-red-300 text-xs font-black tracking-wide uppercase mb-3 shadow-md shadow-red-950/40">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
              </span>
              <span>{t("announcements.badge")}</span>
              <span className="text-red-500/60">·</span>
              <span className="text-amber-400 font-extrabold">@tool_lastwar_channel</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight uppercase">
              {t("announcements.title")}
            </h2>
          </div>

          {/* Quick link to Channel */}
          <div className="flex items-center gap-3">
            <a
              href="https://t.me/tool_lastwar_channel"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#1d0a11] hover:bg-[#280e18] text-slate-200 hover:text-white border border-red-500/30 hover:border-red-500/60 font-bold text-xs sm:text-sm transition-all shadow-lg hover:shadow-red-950/50"
            >
              <Send className="w-4 h-4 text-sky-400" />
              <span>{t("announcements.viewAll")}</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
            </a>
          </div>
        </div>

        {/* Loading Skeleton */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="rounded-2xl bg-[#14060b]/80 border border-red-500/20 p-5 animate-pulse min-h-[280px]"
              >
                <div className="h-4 bg-red-500/20 rounded w-1/3 mb-4" />
                <div className="h-40 bg-red-500/10 rounded-xl mb-4" />
                <div className="h-3 bg-red-500/15 rounded w-full mb-2" />
                <div className="h-3 bg-red-500/15 rounded w-2/3" />
              </div>
            ))}
          </div>
        )}

        {/* Announcements Grid */}
        {!loading && announcements.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {announcements.map((item, idx) => {
              const isExpanded = !!expandedIds[item.id];
              const lines = item.content.split("\n").filter(Boolean);
              const shouldTruncate = lines.length > 5 || item.content.length > 280;
              const displayText =
                shouldTruncate && !isExpanded
                  ? lines.slice(0, 4).join("\n") + "..."
                  : item.content;

              return (
                <div
                  key={item.id}
                  className="group relative rounded-2xl sm:rounded-3xl bg-[#13050a]/90 hover:bg-[#18070d]/95 border border-red-500/25 hover:border-red-500/50 transition-all duration-300 shadow-xl shadow-black/60 flex flex-col overflow-hidden"
                >
                  {/* Glowing header accent line */}
                  <div className="h-1 w-full bg-gradient-to-r from-red-600 via-rose-500 to-amber-500" />

                  <div className="p-4 sm:p-5 flex-1 flex flex-col">
                    {/* Top Row: Badges & Date */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {item.versionBadge ? (
                          <span className="px-2.5 py-0.5 rounded-md bg-amber-500/20 border border-amber-500/40 text-amber-300 font-black text-[11px] tracking-wide">
                            {item.versionBadge}
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded-md bg-red-500/15 border border-red-500/30 text-red-300 font-bold text-[10px] tracking-wider uppercase">
                            UPDATE #{item.postNumber || idx + 1}
                          </span>
                        )}

                        {item.isAutoTranslated && (
                          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-blue-500/15 border border-blue-500/30 text-blue-300 text-[10px]">
                            <Globe className="w-2.5 h-2.5" />
                            <span>{t("announcements.autoTranslated")}</span>
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-1 text-[11px] text-slate-400 font-medium shrink-0">
                        <Calendar className="w-3 h-3 text-slate-500" />
                        <span>{formatDate(item.date)}</span>
                      </div>
                    </div>

                    {/* Media: 1. Direct Telegram Video, 2. Direct Telegram Image, 3. YouTube Fallback */}
                    {item.videoUrl ? (
                      <div className="mb-3">
                        <TelegramVideoPlayer
                          videoUrl={item.videoUrl}
                          posterUrl={item.imageUrl || undefined}
                          title={`Monica Bot Update #${item.postNumber || item.id}`}
                          telegramUrl={item.telegramUrl}
                        />
                      </div>
                    ) : item.imageUrl ? (
                      <div
                        onClick={() => setSelectedImage(item.imageUrl || null)}
                        className="relative w-full aspect-video rounded-xl overflow-hidden mb-3 bg-black/40 border border-red-500/20 cursor-zoom-in group/img shadow-md"
                      >
                        <Image
                          src={item.imageUrl}
                          alt="Monica Bot Announcement"
                          fill
                          className="object-cover group-hover/img:scale-105 transition-transform duration-300"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          unoptimized
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover/img:bg-transparent transition-colors" />

                        {/* Photo indicator badge */}
                        <div className="absolute top-2 left-2 flex items-center gap-1 px-2 py-0.5 rounded-md bg-black/75 backdrop-blur-sm border border-red-500/30 text-slate-300 text-[10px] font-bold">
                          <Camera className="w-3 h-3 text-amber-400" />
                          <span>{locale === "vi" ? "Hình ảnh Telegram" : "Telegram Photo"}</span>
                        </div>

                        <div className="absolute bottom-2 right-2 p-1.5 rounded-lg bg-black/70 backdrop-blur-sm text-slate-300 opacity-80 group-hover/img:opacity-100 transition-opacity">
                          <Maximize2 className="w-3.5 h-3.5" />
                        </div>
                      </div>
                    ) : item.youtubeId ? (
                      <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-3 bg-black border border-red-500/20">
                        <HoverVideoPreview
                          youtubeId={item.youtubeId}
                          title={`Monica Bot Update #${item.postNumber}`}
                        />
                      </div>
                    ) : null}

                    {/* Text Body */}
                    <div className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal whitespace-pre-line mb-3 flex-1 break-words">
                      {displayText}
                    </div>

                    {/* Expand/Collapse Button */}
                    {shouldTruncate && (
                      <button
                        onClick={() => toggleExpand(item.id)}
                        className="self-start text-[11px] font-bold text-amber-400 hover:text-amber-300 mb-3 flex items-center gap-1 transition-colors"
                      >
                        {isExpanded ? (
                          <>
                            <span>{t("announcements.collapse")}</span>
                            <ChevronUp className="w-3 h-3" />
                          </>
                        ) : (
                          <>
                            <span>{t("announcements.readMore")}</span>
                            <ChevronDown className="w-3 h-3" />
                          </>
                        )}
                      </button>
                    )}

                    {/* Bottom Action: View on Telegram */}
                    <div className="mt-auto pt-3 border-t border-red-500/15 flex items-center justify-between text-xs">
                      <span className="text-[10px] text-slate-500 font-semibold">
                        ID: {item.id}
                      </span>
                      <a
                        href={item.telegramUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-sky-500/15 hover:bg-sky-500/25 text-sky-300 hover:text-sky-200 font-bold border border-sky-500/30 transition-all text-xs"
                      >
                        <Send className="w-3 h-3" />
                        <span>{t("announcements.viewOnTg")}</span>
                        <ExternalLink className="w-2.5 h-2.5" />
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Bottom Banner */}
        <div className="mt-10 sm:mt-12 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-red-950/40 via-[#18080e] to-red-950/40 border border-red-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-600/20 text-red-400 flex items-center justify-center shrink-0 border border-red-500/30">
              <Radio className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h4 className="text-sm font-black text-white">
                {t("announcements.liveSync")}
              </h4>
              <p className="text-xs text-amber-400/80 font-semibold">
                @tool_lastwar_channel
              </p>
            </div>
          </div>
          <a
            href="https://t.me/tool_lastwar_channel"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-bold text-xs uppercase tracking-wider shrink-0 transition-all shadow-md shadow-red-600/30 flex items-center justify-center gap-1.5"
          >
            <Send className="w-3.5 h-3.5 fill-white" />
            <span>{t("announcements.viewOnTg")}</span>
          </a>
        </div>
      </div>

      {/* Image Lightbox Modal */}
      {selectedImage && (
        <div
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl max-h-[90vh] w-full rounded-2xl overflow-hidden border border-red-500/40 shadow-2xl bg-black"
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-3 right-3 z-10 p-2 rounded-full bg-black/70 hover:bg-black text-white border border-white/20 transition-all"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="relative w-full h-[60vh] sm:h-[75vh]">
              <Image
                src={selectedImage}
                alt="Enlarged Telegram image"
                fill
                className="object-contain"
                unoptimized
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
