"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Send, Menu, X, Flame, ExternalLink, Shield, Download } from "lucide-react";
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
    { href: "/tools", label: "Công Cụ Game" },
    { href: "/about", label: "Về Chúng Tôi" },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#0c0608]/90 backdrop-blur-xl border-b border-red-500/20 shadow-xl shadow-red-950/40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-red-600 via-rose-600 to-amber-500 flex items-center justify-center shadow-lg shadow-red-600/30 group-hover:scale-105 transition-transform">
            <Flame className="w-5 h-5 text-white fill-white" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-base font-black tracking-tight text-white group-hover:text-red-400 transition-colors">
                MONICA BOT
              </span>
              <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded bg-red-500/20 text-red-300 border border-red-500/40">
                TEAM MURPHY
              </span>
            </div>
            <span className="text-[10px] text-red-200/60 font-medium">
              Đại lý ủy quyền Last War: Survival
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-semibold transition-colors ${
                  isActive
                    ? "text-red-400"
                    : "text-slate-300 hover:text-white"
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
            className="text-sm font-semibold text-amber-400/90 hover:text-amber-300 transition-colors flex items-center gap-1"
          >
            Nhóm Hỗ Trợ <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </nav>

        {/* Action Buttons */}
        <div className="hidden sm:flex items-center gap-2.5">
          <a
            href="/downloads/Setup_Monica.rar"
            download="Setup_Monica.rar"
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 font-bold text-xs border border-amber-500/30 transition-all hover:scale-105"
            title="Tải bộ cài đặt Monica Bot (46.3 MB)"
          >
            <Download className="w-3.5 h-3.5 text-amber-400" />
            <span>Tải Tool (46MB)</span>
          </a>
          <LanguageSwitcher />
          <a
            href={TELEGRAM_BUY_BOT}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-red-600 via-rose-600 to-red-700 hover:from-red-500 hover:to-rose-500 text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-red-600/35 transition-all hover:scale-105 active:scale-95 border border-red-400/30"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Mua Key Telegram</span>
          </a>
        </div>

        {/* Mobile menu button */}
        <div className="flex items-center gap-2 md:hidden">
          <LanguageSwitcher />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-red-950/40 border border-red-500/20 text-slate-300"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 pt-2 pb-5 bg-[#14080c] border-b border-red-500/20 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-200 hover:bg-red-500/10"
            >
              {link.label}
            </Link>
          ))}
          <a
            href="/downloads/Setup_Monica.rar"
            download="Setup_Monica.rar"
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-bold text-amber-300 hover:bg-amber-500/10"
          >
            <Download className="w-4 h-4 text-amber-400" />
            <span>Tải Bộ Cài Đặt (Setup_Monica.rar - 46MB)</span>
          </a>
          <a
            href={TELEGRAM_SUPPORT_GROUP}
            target="_blank"
            rel="noopener noreferrer"
            className="block px-3 py-2 rounded-lg text-sm font-medium text-amber-400 hover:bg-red-500/10"
          >
            💬 Nhóm Hỗ Trợ Telegram (Group)
          </a>
          <div className="pt-2">
            <a
              href={TELEGRAM_BUY_BOT}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-red-600 via-rose-600 to-red-700 text-white font-black text-sm shadow-lg shadow-red-600/30"
            >
              <Send className="w-4 h-4" />
              <span>Mở Bot Mua Key (@tool_lastwar_buysell_bot)</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
