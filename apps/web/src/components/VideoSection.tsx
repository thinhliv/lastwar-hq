"use client";

import { useState } from "react";
import { Play, Tv, ShieldCheck, Download, Sparkles, ExternalLink } from "lucide-react";
import { TELEGRAM_SUPPORT_GROUP } from "@/lib/telegram";

interface VideoTab {
  id: string;
  title: string;
  duration?: string;
  description: string;
  youtubeId?: string; // Sẽ điền khi bạn gửi link chiều nay
}

export default function VideoSection() {
  const [activeTab, setActiveTab] = useState("overview");

  const tabs: VideoTab[] = [
    {
      id: "overview",
      title: "1. Giới Thiệu & Tính Năng",
      description: "Xem cách Monica Bot vận hành thực tế trên Last War: Survival, quản lý tài nguyên, sự kiện và giao diện điều khiển.",
      youtubeId: "", // Placeholder
    },
    {
      id: "install",
      title: "2. Cài Đặt PC & Giả Lập",
      description: "Từng bước cài đặt file bot trên Windows, tối ưu cấu hình nhẹ máy, không xung đột phần mềm.",
      youtubeId: "", // Placeholder
    },
    {
      id: "buy",
      title: "3. Hướng Dẫn Mua & Kích Hoạt",
      description: "Chi tiết quy trình thanh toán VietQR và Crypto trong Telegram Bot và kích hoạt key sử dụng ngay.",
      youtubeId: "", // Placeholder
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
            Trực tiếp quan sát các tính năng tự động và hướng dẫn chi tiết qua video.
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
            </button>
          ))}
        </div>

        {/* Video Player Display Container */}
        <div className="max-w-4xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden border-2 border-amber-500/30 bg-slate-950 shadow-2xl shadow-black/80 aspect-video flex flex-col items-center justify-center text-center p-6 sm:p-12">
            {currentTab.youtubeId ? (
              <iframe
                src={`https://www.youtube.com/embed/${currentTab.youtubeId}`}
                title={currentTab.title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <div className="flex flex-col items-center justify-center max-w-md">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-amber-500 to-orange-500 text-slate-950 flex items-center justify-center shadow-xl shadow-orange-500/30 mb-5 group cursor-pointer hover:scale-110 transition-transform">
                  <Play className="w-7 h-7 sm:w-9 sm:h-9 fill-current ml-1" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-2">
                  {currentTab.title}
                </span>
                <h4 className="text-base sm:text-xl font-bold text-white mb-2">
                  Video Sẽ Được Tải Lên Tại Đây
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed mb-6">
                  {currentTab.description}
                </p>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-slate-300 text-xs">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Sẵn sàng cập nhật khi bạn gửi video chiều nay</span>
                </div>
              </div>
            )}
          </div>

          {/* Video sub-features bar */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
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
