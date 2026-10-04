"use client";

import { useState } from "react";
import { Play, Tv, ShieldCheck, Download, Sparkles, ExternalLink } from "lucide-react";
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
      title: "1. Giới Thiệu & Tính Năng",
      description: "Xem video thực tế vận hành Monica Bot trên game Last War: Survival, quản lý tài nguyên, sự kiện và giao diện điều khiển.",
      youtubeId: "bkm5aYR6aMk", // Video do bạn vừa tải lên
    },
    {
      id: "nvbm",
      title: "2. Tự Động Nhiệm Vụ Bí Mật",
      description: "Tự động quét và hoàn thành chuỗi Nhiệm Vụ Bí Mật (NVBM) tối ưu điểm thưởng.",
      youtubeId: "", // Chờ link tiếp theo
    },
    {
      id: "cuop_xe",
      title: "3. Tự Động Cướp Xe Tải",
      description: "Chiến thuật đoạt xe tải tài nguyên chuẩn xác, tự động tìm xe mục tiêu giàu tài nguyên.",
      youtubeId: "", // Chờ link tiếp theo
    },
    {
      id: "guide",
      title: "4. Cài Đặt & Nhận Key",
      description: "Từng bước cài đặt file bot trên PC, quét mã VietQR và kích hoạt key tự động trong 15 giây.",
      youtubeId: "", // Chờ video làm sau
    },
  ];

  const currentTab = tabs.find((t) => t.id === activeTab) || tabs[0];

  return (
    <section id="video" className="py-12 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-semibold mb-3">
            <Tv className="w-3.5 h-3.5" />
            <span>Video Trực Quan Thực Tế</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-white mb-3">
            Xem Monica Bot Hoạt Động
          </h2>
          <p className="text-sm text-slate-400">
            Trực tiếp quan sát các tính năng tự động và hướng dẫn chi tiết qua video thực tế.
          </p>
        </div>

        {/* Video Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === tab.id
                  ? "bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20"
                  : "bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-white/5"
              }`}
            >
              {tab.title}
              {tab.youtubeId && (
                <span className="ml-1.5 w-2 h-2 rounded-full bg-red-500 inline-block align-middle" />
              )}
            </button>
          ))}
        </div>

        {/* Video Player Display Container */}
        <div className="max-w-4xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden border-2 border-amber-500/40 bg-slate-950 shadow-2xl shadow-black/80 aspect-video">
            {currentTab.youtubeId ? (
              <iframe
                src={`https://www.youtube.com/embed/${currentTab.youtubeId}?rel=0&modestbranding=1`}
                title={currentTab.title}
                className="w-full h-full border-0 absolute inset-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-center p-6 sm:p-12">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-amber-500 to-orange-500 text-slate-950 flex items-center justify-center shadow-xl shadow-orange-500/30 mb-5 group cursor-pointer hover:scale-110 transition-transform">
                  <Play className="w-7 h-7 sm:w-9 sm:h-9 fill-current ml-1" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-2">
                  {currentTab.title}
                </span>
                <h4 className="text-base sm:text-xl font-bold text-white mb-2">
                  Video Đang Được Cập Nhật
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed mb-6 max-w-md">
                  {currentTab.description}
                </p>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-slate-300 text-xs">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Sẽ cập nhật ngay khi bạn tải lên link tiếp theo</span>
                </div>
              </div>
            )}
          </div>

          {/* Description line below player */}
          <div className="mt-4 p-4 rounded-2xl bg-slate-900/60 border border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
            <div>
              <strong className="text-white text-sm block">{currentTab.title}</strong>
              <span className="text-slate-400">{currentTab.description}</span>
            </div>
            {currentTab.youtubeId && (
              <a
                href={`https://youtu.be/${currentTab.youtubeId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 hover:text-red-300 whitespace-nowrap transition-colors flex items-center gap-1 font-semibold"
              >
                <span>Xem trên YouTube</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>

          {/* Video sub-features bar */}
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-white/5 flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-green-400 flex-shrink-0" />
              <div className="text-xs text-slate-300">
                <strong className="text-white block">Nhẹ máy & Ổn định:</strong>
                Chạy nền êm ái trên Windows 10/11.
              </div>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-white/5 flex items-center gap-3">
              <Download className="w-5 h-5 text-cyan-400 flex-shrink-0" />
              <div className="text-xs text-slate-300">
                <strong className="text-white block">Hỗ trợ đa ACC:</strong>
                Quản lý nhiều cửa sổ đồng thời.
              </div>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-white/5 flex items-center gap-3">
              <ExternalLink className="w-5 h-5 text-amber-400 flex-shrink-0" />
              <div className="text-xs text-slate-300">
                <strong className="text-white block">Group trao đổi:</strong>
                <a
                  href={TELEGRAM_SUPPORT_GROUP}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-400 hover:underline"
                >
                  Tham gia cộng đồng Telegram
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
