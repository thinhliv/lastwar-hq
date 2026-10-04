"use client";

import { Home, Tag, Send, BookOpen, Swords } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { TELEGRAM_BUY_BOT } from "@/lib/telegram";

export default function BottomNav() {
  const pathname = usePathname();

  const isHome = pathname === "/";
  const isPricing = pathname === "/pricing";
  const isGuide = pathname === "/guide";
  const isTools = pathname.startsWith("/tools");

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden safe-bottom">
      <div className="mx-auto max-w-lg px-3 pb-2 pt-1">
        <div className="flex items-center justify-around px-2 py-1.5 rounded-2xl bg-[#0e0508]/95 backdrop-blur-2xl border border-red-500/25 shadow-2xl shadow-black">
          {/* Home */}
          <Link
            href="/"
            className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl transition-all ${
              isHome ? "text-red-400 font-bold" : "text-slate-400 hover:text-white"
            }`}
          >
            <Home className="w-4 h-4" />
            <span className="text-[10px]">Trang chủ</span>
          </Link>

          {/* Pricing */}
          <Link
            href="/pricing"
            className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl transition-all ${
              isPricing ? "text-red-400 font-bold" : "text-slate-400 hover:text-white"
            }`}
          >
            <Tag className="w-4 h-4" />
            <span className="text-[10px]">Bảng giá</span>
          </Link>

          {/* Center Telegram CTA */}
          <a
            href={TELEGRAM_BUY_BOT}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center -mt-4 group"
          >
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-red-600 via-rose-600 to-amber-500 text-white flex items-center justify-center shadow-lg shadow-red-600/40 group-active:scale-95 transition-transform border border-red-400/30">
              <Send className="w-5 h-5 ml-0.5" />
            </div>
            <span className="text-[9px] font-black text-red-400 mt-0.5">
              Mua Key
            </span>
          </a>

          {/* Guide */}
          <Link
            href="/guide"
            className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl transition-all ${
              isGuide ? "text-red-400 font-bold" : "text-slate-400 hover:text-white"
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span className="text-[10px]">Hướng dẫn</span>
          </Link>

          {/* Tools */}
          <Link
            href="/tools"
            className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl transition-all ${
              isTools ? "text-red-400 font-bold" : "text-slate-400 hover:text-white"
            }`}
          >
            <Swords className="w-4 h-4" />
            <span className="text-[10px]">Công cụ</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
