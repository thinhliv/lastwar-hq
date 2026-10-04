"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Send, Menu, X, Flame, ExternalLink, Download } from "lucide-react";
import { useState } from "react";
import LanguageSwitcher from "./LanguageSwitcher";
import { TELEGRAM_BUY_BOT, TELEGRAM_SUPPORT_GROUP } from "@/lib/telegram";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: "/", label: "Trang Chủ" },
    { href: "/pricing", label: "Bảng Giá" },
    { href: "/guide", label: "Hướng Dẫn" },
    { href: "/tools", label: "Công Cụ" },
    { href: "/about", label: "Về Chúng Tôi" },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#0c0608]/95 backdrop-blur-xl border-b border-red-500/20 shadow-xl shadow-red-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2.5 group flex-shrink-0">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-red-600 via-rose-600 to-amber-500 flex items-center justify-center shadow-lg shadow-red-600/30 group-hover:scale-105 transition-transform flex-shrink-0">
            <Flame className="w-5 h-5 text-white fill-white" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-base font-black tracking-wider text-white group-hover:text-red-400 transition-colors whitespace-nowrap">
              MONICA BOT
            </span>
            <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-red-500/20 text-red-300 border border-red-500/40 whitespace-nowrap hidden sm:inline-block">
              TEAM MURPHY
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links (Single line, spacious, no wrapping) */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-1.5 rounded-xl text-xs xl:text-sm font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? "text-red-400 bg-red-500/15 border border-red-500/30 shadow-sm shadow-red-950/40"
                    : "text-slate-300 hover:text-white hover:bg-white/5 border border-transparent"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <a
            href={TELEGRAM_SUPPORT_GROUP}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 rounded-xl text-xs xl:text-sm font-semibold text-amber-400 hover:text-amber-300 hover:bg-amber-500/10 transition-all flex items-center gap-1.5 whitespace-nowrap border border-transparent hover:border-amber-500/20"
          >
            <span>Hỗ Trợ</span>
            <ExternalLink className="w-3.5 h-3.5 text-amber-400/80" />
          </a>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-2.5 flex-shrink-0">
          {/* Direct Download Button */}
          <a
            href="/downloads/Setup_Monica.rar"
            download="Setup_Monica.rar"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 font-bold text-xs border border-amber-500/30 transition-all hover:scale-102 active:scale-98 whitespace-nowrap min-h-[40px]"
            title="Tải bộ cài đặt Monica Bot (Setup_Monica.rar - 46.3 MB)"
          >
            <Download className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
            <span className="hidden xl:inline">Tải Tool (46MB)</span>
            <span className="xl:hidden">Tải Tool</span>
          </a>

          {/* Language Switcher */}
          <LanguageSwitcher />

          {/* Buy Key CTA Button */}
          <a
            href={TELEGRAM_BUY_BOT}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-xl bg-gradient-to-r from-red-600 via-rose-600 to-red-700 hover:from-red-500 hover:to-rose-500 text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-red-600/35 transition-all hover:scale-102 active:scale-95 border border-red-400/30 whitespace-nowrap min-h-[40px]"
          >
            <Send className="w-3.5 h-3.5 flex-shrink-0" />
            <span>Mua Key</span>
          </a>

          {/* Mobile & Tablet Hamburger Button (< 1024px) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-red-950/40 hover:bg-red-900/40 border border-red-500/25 text-slate-300 min-w-[40px] min-h-[40px] flex items-center justify-center active:bg-red-500/20 transition-colors ml-0.5"
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-red-400" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile & Tablet Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden px-4 pt-3 pb-6 bg-[#120508]/98 backdrop-blur-2xl border-b border-red-500/25 shadow-2xl space-y-1.5">
          <div className="text-[11px] font-bold text-red-400/70 uppercase tracking-wider px-3 py-1">
            Danh mục điều hướng
          </div>
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between min-h-[44px] px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  isActive
                    ? "text-red-400 bg-red-500/15 border border-red-500/30"
                    : "text-slate-200 hover:text-white hover:bg-red-500/10"
                }`}
              >
                <span>{link.label}</span>
              </Link>
            );
          })}
          <a
            href={TELEGRAM_SUPPORT_GROUP}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between min-h-[44px] px-3.5 py-2.5 rounded-xl text-sm font-semibold text-amber-300 hover:bg-amber-500/10 transition-colors border border-transparent hover:border-amber-500/20"
          >
            <span className="flex items-center gap-2">💬 Nhóm Hỗ Trợ Telegram</span>
            <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
          </a>
          <div className="pt-2 sm:hidden">
            <a
              href="/downloads/Setup_Monica.rar"
              download="Setup_Monica.rar"
              className="flex items-center justify-center gap-2 min-h-[44px] px-4 py-2.5 rounded-xl text-sm font-bold text-amber-300 bg-amber-500/10 border border-amber-500/30 hover:bg-amber-500/20"
            >
              <Download className="w-4 h-4 text-amber-400" />
              <span>Tải Bộ Cài Đặt (Setup_Monica.rar - 46MB)</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
