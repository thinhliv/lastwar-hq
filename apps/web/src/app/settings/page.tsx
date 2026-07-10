"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  Globe,
  Bell,
  Moon,
  Volume2,
  Shield,
  Download,
  Trash2,
  HelpCircle,
  Mail,
  MessageCircle,
} from "lucide-react";
import { useI18n, getPopularLanguages, detectLocale } from "@/lib/i18n";

const LOCALE_EVENT = "lastwar_locale_changed";

export default function SettingsPage() {
  const { locale, t } = useI18n();
  const [notifEnabled, setNotifEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const popularLangs = getPopularLanguages();

  function changeLocale(code: string) {
    if (typeof window !== "undefined") {
      localStorage.setItem("locale", code);
      window.dispatchEvent(new Event(LOCALE_EVENT));
    }
  }

  return (
    <div className="min-h-screen px-4 py-6">
      <Link
        href="/profile"
        className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-orange-500 transition-colors mb-3"
      >
        <ChevronLeft className="w-4 h-4" />
        Profile
      </Link>

      <h1 className="text-2xl font-bold mb-6">⚙️ Cài đặt</h1>

      {/* Language */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <Globe className="w-4 h-4 text-blue-400" />
          <h2 className="text-xs font-bold uppercase tracking-wide text-slate-300">
            Ngôn ngữ
          </h2>
        </div>
        <div className="p-4 rounded-2xl glass">
          <p className="text-xs text-slate-400 mb-3">
            Hiện tại: <span className="text-orange-400 font-medium">{locale}</span>
          </p>
          <div className="grid grid-cols-5 gap-2">
            {popularLangs.slice(0, 20).map((lang) => (
              <button
                key={lang.code}
                onClick={() => changeLocale(lang.code)}
                className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all ${
                  locale.startsWith(lang.code)
                    ? "bg-orange-500/20 border border-orange-500/30"
                    : "bg-white/5 border border-white/10 hover:bg-white/10"
                }`}
              >
                <span className="text-lg">{lang.flag}</span>
                <span className="text-[9px] text-slate-400 truncate max-w-full">{lang.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <Bell className="w-4 h-4 text-yellow-400" />
          <h2 className="text-xs font-bold uppercase tracking-wide text-slate-300">
            Thông báo
          </h2>
        </div>
        <div className="p-4 rounded-2xl glass space-y-3">
          <ToggleRow
            icon={Bell}
            label="Push notifications"
            desc="Nhận thông báo về events, tin nhắn"
            value={notifEnabled}
            onChange={setNotifEnabled}
          />
          <ToggleRow
            icon={Volume2}
            label="Âm thanh"
            desc="Phát âm khi có tin nhắn mới"
            value={soundEnabled}
            onChange={setSoundEnabled}
          />
        </div>
      </div>

      {/* Appearance */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <Moon className="w-4 h-4 text-purple-400" />
          <h2 className="text-xs font-bold uppercase tracking-wide text-slate-300">
            Giao diện
          </h2>
        </div>
        <div className="p-4 rounded-2xl glass">
          <ToggleRow
            icon={Moon}
            label="Dark Mode"
            desc="Giao diện tối"
            value={darkMode}
            onChange={setDarkMode}
          />
        </div>
      </div>

      {/* Privacy */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <Shield className="w-4 h-4 text-green-400" />
          <h2 className="text-xs font-bold uppercase tracking-wide text-slate-300">
            Quyền riêng tư
          </h2>
        </div>
        <div className="p-4 rounded-2xl glass space-y-3">
          <button className="w-full flex items-center gap-3 text-left">
            <Download className="w-4 h-4 text-slate-400" />
            <div className="flex-1">
              <p className="text-sm text-slate-300">Tải dữ liệu</p>
              <p className="text-[10px] text-slate-500">Xuất dữ liệu tài khoản của bạn</p>
            </div>
          </button>
          <button className="w-full flex items-center gap-3 text-left">
            <Trash2 className="w-4 h-4 text-red-400" />
            <div className="flex-1">
              <p className="text-sm text-red-400">Xóa tài khoản</p>
              <p className="text-[10px] text-slate-500">Xóa vĩnh viễn tài khoản và dữ liệu</p>
            </div>
          </button>
        </div>
      </div>

      {/* Support */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <HelpCircle className="w-4 h-4 text-orange-400" />
          <h2 className="text-xs font-bold uppercase tracking-wide text-slate-300">
            Hỗ trợ
          </h2>
        </div>
        <div className="p-4 rounded-2xl glass space-y-3">
          <button className="w-full flex items-center gap-3 text-left">
            <Mail className="w-4 h-4 text-slate-400" />
            <span className="text-sm text-slate-300 flex-1">Email hỗ trợ</span>
            <span className="text-[10px] text-slate-500">support@footzone.vn</span>
          </button>
          <button className="w-full flex items-center gap-3 text-left">
            <MessageCircle className="w-4 h-4 text-slate-400" />
            <span className="text-sm text-slate-300 flex-1">Discord</span>
            <span className="text-[10px] text-slate-500">coming soon</span>
          </button>
        </div>
      </div>

      <div className="text-center py-4">
        <p className="text-[10px] text-slate-600">
          LASTWAR HQ v1.0.0 · footzone.vn · © 2026
        </p>
      </div>
    </div>
  );
}

// ===== TOGGLE ROW =====
function ToggleRow({
  icon: Icon,
  label,
  desc,
  value,
  onChange,
}: {
  icon: typeof Bell;
  label: string;
  desc: string;
  value: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center gap-3">
      <Icon className="w-4 h-4 text-slate-400" />
      <div className="flex-1">
        <p className="text-sm text-slate-300">{label}</p>
        <p className="text-[10px] text-slate-500">{desc}</p>
      </div>
      <button
        onClick={() => onChange(!value)}
        className={`relative w-11 h-6 rounded-full transition-colors ${
          value ? "bg-orange-500" : "bg-slate-600"
        }`}
      >
        <div
          className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-md transition-transform ${
            value ? "translate-x-5" : "translate-x-0.5"
          }`}
        />
      </button>
    </div>
  );
}
