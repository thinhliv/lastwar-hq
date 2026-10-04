import type { Metadata } from "next";
import Link from "next/link";
import { Skull, Zap, Server, BarChart3, ArrowRight, Sparkles, Send } from "lucide-react";
import bossData from "@/data/restricted-area.json";
import heroExpData from "@/data/hero-exp.json";
import serverData from "@/data/servers.json";
import { TELEGRAM_BUY_BOT } from "@/lib/telegram";

export const metadata: Metadata = {
  title: "Công cụ Game Last War: Survival",
  description:
    "Boss Restricted Area, Hero EXP, tìm server/alliance và thống kê server cho Last War: Survival.",
};

const boss = bossData as Record<string, { stage: number; power: number }[]>;
const RA_STAGES = Object.values(boss).reduce((sum, s) => sum + s.length, 0);
const HERO_MAX = heroExpData.length - 1;
const SERVER_COUNT = (serverData as unknown[]).length;

const tools = [
  {
    icon: Skull,
    label: "Boss Restricted Area",
    desc: `Sức mạnh boss theo từng level & stage (${RA_STAGES} stage)`,
    href: "/tools/calculators",
    color: "text-orange-400",
    bgColor: "bg-orange-500/10",
  },
  {
    icon: Zap,
    label: "Hero EXP",
    desc: `Tính EXP nâng hero, tới Lv.${HERO_MAX}`,
    href: "/tools/calculators",
    color: "text-yellow-400",
    bgColor: "bg-yellow-500/10",
  },
  {
    icon: Server,
    label: "Tìm Server / Alliance",
    desc: `Danh bạ ${SERVER_COUNT.toLocaleString()} server + mã alliance`,
    href: "/tools/clan-finder",
    color: "text-pink-400",
    bgColor: "bg-pink-500/10",
  },
  {
    icon: BarChart3,
    label: "Thống kê Server",
    desc: "Số liệu tổng hợp từ danh bạ server",
    href: "/tools/server-stats",
    color: "text-purple-400",
    bgColor: "bg-purple-500/10",
  },
];

export default function ToolsPage() {
  return (
    <div className="min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full overflow-x-hidden">
      {/* Promotion Banner for Monica Bot */}
      <div className="mb-8 p-6 rounded-3xl bg-gradient-to-r from-amber-500/20 via-orange-500/15 to-slate-900 border border-amber-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[11px] font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Phần Mềm Hỗ Trợ Chơi Game</span>
          </div>
          <h2 className="text-lg sm:text-xl font-black text-white">
            Trợ Lý Tác Chiến Monica Bot — Team Murphy
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
            Tự động rally, diệt zombie vàng, quản lý nhiều tài khoản (Đa ACC) nhẹ máy trên PC. Kích hoạt tự động sau 15 giây.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/pricing"
            className="min-h-[44px] flex items-center justify-center px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase whitespace-nowrap transition-all shadow-md active:scale-95"
          >
            Bảng Giá
          </Link>
          <a
            href={TELEGRAM_BUY_BOT}
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-[44px] min-w-[44px] flex items-center justify-center p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors active:scale-95"
            title="Mở Telegram Bot"
          >
            <Send className="w-4 h-4" />
          </a>
        </div>
      </div>

      <h1 className="text-2xl sm:text-3xl font-black mb-1 text-white">Công cụ Tra Cứu Miễn Phí</h1>
      <p className="text-slate-400 text-sm sm:text-base mb-6">
        Mọi công cụ đều chạy trên dữ liệu game thật cập nhật từ cộng đồng.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {tools.map((tool) => (
          <Link key={tool.label} href={tool.href} className="block">
            <div className="relative p-5 rounded-2xl bg-slate-900/60 border border-white/5 hover:border-amber-500/30 hover:bg-slate-900/90 transition-all">
              <div className="flex items-center gap-4">
                <div
                  className={`w-12 h-12 rounded-xl ${tool.bgColor} flex items-center justify-center flex-shrink-0`}
                >
                  <tool.icon className={`w-6 h-6 ${tool.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-sm text-white mb-0.5">{tool.label}</h3>
                  <p className="text-xs text-slate-400">{tool.desc}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-600 flex-shrink-0" />
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-8 p-5 rounded-2xl bg-slate-900/40 border border-white/5">
        <p className="text-xs text-slate-400 leading-relaxed">
          Chỉ liệt kê những công cụ có dữ liệu thật. Các tính năng cần dữ liệu
          game bổ sung (calculator research, gear, event…) sẽ được thêm khi có
          nguồn dữ liệu đáng tin cậy.
        </p>
      </div>
    </div>
  );
}
