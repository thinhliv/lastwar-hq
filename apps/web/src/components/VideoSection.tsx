"use client";

import { useState } from "react";
import { Play, Tv, ShieldCheck, Download, Sparkles, ExternalLink, Flame } from "lucide-react";
import { TELEGRAM_SUPPORT_GROUP } from "@/lib/telegram";

interface VideoTab {
  id: string;
  title: string;
  description: string;
  youtubeId?: string;
}

export default function VideoSection() {
  const [activeTab, setActiveTab] = useState("overview");

  const tabs: VideoTab[] = [
    {
      id: "overview",
      title: "1. Tổng Hợp Tính Năng",
      description: "Video tổng hợp toàn bộ tính năng của Monica Bot trên game Last War: Survival — quản lý tài nguyên, sự kiện và bảng điều khiển.",
      youtubeId: "bkm5aYR6aMk",
    },
    {
      id: "nvbm",
      title: "2. Hỗ Trợ & Cướp NVBM",
      description: "Video hướng dẫn tính năng tự động hỗ trợ liên minh và săn cướp Nhiệm Vụ Bí Mật (NVBM) chuẩn xác.",
      youtubeId: "Uvxba0yriJo",
    },
    {
      id: "xe_tai",
      title: "3. Quét Tìm Xe Tải",
      description: "Video hướng dẫn thiết lập tính năng tự động quét radar tìm kiếm xe tải giàu tài nguyên trên bản đồ.",
      youtubeId: "0KRAdDZI5Mk",
    },
    {
      id: "guide",
      title: "4. Cài Đặt & Nhận Key",
      description: "Video hướng dẫn tải file, cài đặt trên PC & giả lập và kích hoạt key tự động (đang chuẩn bị).",
      youtubeId: "",
    },
  ];

  const currentTab = tabs.find((t) => t.id === activeTab) || tabs[0];

  return (
    <section id="video" className="py-14 sm:py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-500/15 border border-red-500/30 text-red-300 text-xs font-bold uppercase tracking-wider mb-3">
            <Flame className="w-3.5 h-3.5 fill-red-400 text-red-400" />
            <span>VIDEO THỰC CHIẾN TÁC TỬ</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-white mb-3">
            Xem Monica Bot Hoạt Động Thực Tế
          </h2>
          <p className="text-sm sm:text-base text-red-100/70">
            Trực tiếp quan sát các tính năng tự động hỗ trợ tác chiến và cày cuốc trong game Last War.
          </p>
        </div>

        {/* Video Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`min-h-[44px] px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center ${
                activeTab === tab.id
                  ? "bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-lg shadow-red-600/35 border border-red-400/40"
                  : "bg-[#16080c]/80 hover:bg-[#200a12] text-slate-300 border border-red-500/20 active:bg-white/5"
              }`}
            >
              <span>{tab.title}</span>
              {tab.youtubeId && (
                <span className="ml-2 w-2 h-2 rounded-full bg-amber-400 inline-block align-middle" />
              )}
            </button>
          ))}
        </div>

        {/* Video Player Display Container */}
        <div className="max-w-4xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden border-2 border-red-500/50 bg-black shadow-2xl shadow-red-950/70 aspect-video">
            {currentTab.youtubeId ? (
              <iframe
                key={currentTab.youtubeId}
                src={`https://www.youtube.com/embed/${currentTab.youtubeId}?rel=0&modestbranding=1`}
                title={currentTab.title}
                loading="lazy"
                className="w-full h-full border-0 absolute inset-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-center p-6 sm:p-12 bg-gradient-to-b from-[#18080d] to-black">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-red-600 to-amber-500 text-white flex items-center justify-center shadow-xl shadow-red-600/30 mb-5 group cursor-pointer hover:scale-110 transition-transform">
                  <Play className="w-7 h-7 sm:w-9 sm:h-9 fill-current ml-1" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-2">
                  {currentTab.title}
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
                  Video Hướng Dẫn Chi Tiết
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 max-w-md mb-5">
                  Đang trong quá trình hoàn thiện phụ đề và cập nhật phiên bản mới nhất cho bạn.
                </p>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-red-950/60 border border-red-500/30 text-xs text-red-200">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>Sẽ cập nhật ngay trong bản kế tiếp</span>
                </div>
              </div>
            )}
          </div>

          {/* Video Description Card below video */}
          <div className="mt-4 p-4 sm:p-5 rounded-2xl bg-[#16080c]/80 border border-red-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-black text-red-400 uppercase tracking-wide">
                  Đang phát:
                </span>
                <span className="text-sm font-bold text-white">
                  {currentTab.title}
                </span>
              </div>
              <p className="text-xs text-slate-300">
                {currentTab.description}
              </p>
            </div>
            <a
              href={TELEGRAM_SUPPORT_GROUP}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-xl bg-red-500/20 hover:bg-red-500/30 border border-red-500/40 text-xs font-bold text-red-200 transition-colors"
            >
              <span>Trao đổi trong nhóm</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
