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
    <nav className="fixed bottom-0 inset-x-0 z-50 md:hidden safe-bottom pointer-events-none [transform:translateZ(0)]">
      <div className="w-full max-w-md mx-auto px-2 pb-2 pt-1 pointer-events-auto">
        <div className="grid grid-cols-5 items-center px-1 py-1 rounded-2xl bg-[#0e0508]/95 backdrop-blur-2xl border border-red-500/25 shadow-2xl shadow-black">
          {/* Home */}
          <Link
            href="/"
            className={`flex flex-col items-center justify-center min-h-[48px] w-full py-1 rounded-xl transition-all ${
              isHome ? "text-red-400 font-bold" : "text-slate-400 hover:text-white"
            }`}
          >
            <Home className="w-4 h-4 flex-shrink-0" />
            <span className="text-[10px] mt-0.5 truncate max-w-full font-medium">Trang chủ</span>
          </Link>

          {/* Pricing */}
          <Link
            href="/pricing"
            className={`flex flex-col items-center justify-center min-h-[48px] w-full py-1 rounded-xl transition-all ${
              isPricing ? "text-red-400 font-bold" : "text-slate-400 hover:text-white"
            }`}
          >
            <Tag className="w-4 h-4 flex-shrink-0" />
            <span className="text-[10px] mt-0.5 truncate max-w-full font-medium">Bảng giá</span>
          </Link>

          {/* Center Telegram CTA */}
          <a
            href={TELEGRAM_BUY_BOT}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center min-h-[48px] w-full -mt-5 group"
            title="Mua Key qua Telegram Bot"
          >
            <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-red-600 via-rose-600 to-amber-500 text-white flex items-center justify-center shadow-lg shadow-red-600/40 group-active:scale-95 transition-transform border border-red-400/30 flex-shrink-0">
              <Send className="w-4.5 h-4.5 ml-0.5" />
            </div>
            <span className="text-[9px] font-black text-red-400 mt-0.5 truncate max-w-full">
              Mua Key
            </span>
          </a>

          {/* Guide */}
          <Link
            href="/guide"
            className={`flex flex-col items-center justify-center min-h-[48px] w-full py-1 rounded-xl transition-all ${
              isGuide ? "text-red-400 font-bold" : "text-slate-400 hover:text-white"
            }`}
          >
            <BookOpen className="w-4 h-4 flex-shrink-0" />
            <span className="text-[10px] mt-0.5 truncate max-w-full font-medium">Hướng dẫn</span>
          </Link>

          {/* Tools */}
          <Link
            href="/tools"
            className={`flex flex-col items-center justify-center min-h-[48px] w-full py-1 rounded-xl transition-all ${
              isTools ? "text-red-400 font-bold" : "text-slate-400 hover:text-white"
            }`}
          >
            <Swords className="w-4 h-4 flex-shrink-0" />
            <span className="text-[10px] mt-0.5 truncate max-w-full font-medium">Công cụ</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
