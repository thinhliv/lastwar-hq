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
        <div className="flex items-center justify-around px-2 py-1.5 rounded-2xl bg-[#0b1120]/90 backdrop-blur-2xl border border-white/10 shadow-2xl">
          {/* Home */}
          <Link
            href="/"
            className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl transition-all ${
              isHome ? "text-amber-400 font-bold" : "text-slate-400 hover:text-white"
            }`}
          >
            <Home className="w-4 h-4" />
            <span className="text-[10px]">Trang chủ</span>
          </Link>

          {/* Pricing */}
          <Link
            href="/pricing"
            className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl transition-all ${
              isPricing ? "text-amber-400 font-bold" : "text-slate-400 hover:text-white"
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
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-amber-500 to-orange-500 text-slate-950 flex items-center justify-center shadow-lg shadow-orange-500/40 group-active:scale-95 transition-transform">
              <Send className="w-5 h-5 ml-0.5" />
            </div>
            <span className="text-[9px] font-black text-amber-400 mt-0.5">
              Mua Key
            </span>
          </a>

          {/* Guide */}
          <Link
            href="/guide"
            className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl transition-all ${
              isGuide ? "text-amber-400 font-bold" : "text-slate-400 hover:text-white"
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span className="text-[10px]">Hướng dẫn</span>
          </Link>

          {/* Tools */}
          <Link
            href="/tools"
            className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl transition-all ${
              isTools ? "text-amber-400 font-bold" : "text-slate-400 hover:text-white"
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
