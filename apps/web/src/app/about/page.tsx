import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, Database, Server, Skull, Zap, ExternalLink, Send, Users2, ShieldAlert } from "lucide-react";
import serverData from "@/data/servers.json";
import bossData from "@/data/restricted-area.json";
import heroExpData from "@/data/hero-exp.json";
import { TELEGRAM_BUY_BOT, TELEGRAM_SUPPORT_GROUP } from "@/lib/telegram";

export const metadata: Metadata = {
  title: "Về Chúng Tôi — Team Murphy & Monica Bot",
  description:
    "Thông tin về Team Murphy: đại lý phân phối ủy quyền Monica Bot cho Last War: Survival, cam kết hỗ trợ người chơi và minh bạch dữ liệu.",
};

const servers = serverData as { server: string; lastUpdate: string }[];
const boss = bossData as Record<string, unknown[]>;
const SERVER_COUNT = servers.length;
const LAST_UPDATE = servers.map((s) => s.lastUpdate).sort().at(-1);
const RA_STAGES = Object.values(boss).reduce((n, s) => n + s.length, 0);
const HERO_MAX = heroExpData.length - 1;

const sources = [
  {
    icon: Skull,
    color: "text-orange-400",
    name: "Boss Restricted Area",
    detail: `${RA_STAGES} stage sức mạnh boss`,
    origin: "cpt-hedge.com",
  },
  {
    icon: Zap,
    color: "text-yellow-400",
    name: "Hero EXP",
    detail: `Bảng EXP tích luỹ tới Lv.${HERO_MAX}`,
    origin: "cpt-hedge.com",
  },
  {
    icon: Server,
    color: "text-pink-400",
    name: "Danh bạ Server / Alliance",
    detail: `${SERVER_COUNT.toLocaleString()} server${LAST_UPDATE ? `, mới nhất ${LAST_UPDATE}` : ""}`,
    origin: "coordinateslist.com",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen max-w-4xl mx-auto px-4 sm:px-6 py-10">
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-black text-white mb-2">
          Về Chúng Tôi — Team Murphy
        </h1>
        <p className="text-sm text-slate-400 max-w-xl mx-auto">
          Đại lý phân phối hỗ trợ Monica Bot cho cộng đồng game thủ Last War: Survival.
        </p>
      </div>

      {/* Team Murphy Reseller Profile */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#15080c]/85 border border-red-500/30 mb-8 shadow-xl shadow-red-950/40">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-red-500/20 text-red-400 flex items-center justify-center font-bold border border-red-500/30">
            <Users2 className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">Đại Lý Team Murphy</h2>
            <p className="text-xs text-amber-400">Kênh hỗ trợ độc quyền của Monica Bot</p>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
          Team Murphy là đại lý được phân quyền cung cấp key bản quyền phần mềm hỗ trợ Monica Bot. Chúng tôi phụ trách tư vấn kỹ thuật, hướng dẫn cài đặt trên PC & giả lập, cung cấp profile tối ưu máy và hỗ trợ xử lý sự cố trong suốt quá trình sử dụng.
        </p>

        <div className="p-4 rounded-2xl bg-red-950/50 border border-red-500/30 text-xs text-red-200">
          <strong className="text-amber-300">Lưu ý quan trọng khi mua key:</strong> Khi mở Bot thanh toán Telegram (@tool_lastwar_buysell_bot), ở bước chọn nguồn giới thiệu xin vui lòng nhấp chọn <strong className="text-white underline">Team Murphy</strong> để kích hoạt gói hỗ trợ VIP từ đội ngũ chúng tôi.
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={TELEGRAM_BUY_BOT}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-600 via-rose-600 to-red-700 hover:from-red-500 hover:to-rose-500 text-white font-black text-xs uppercase shadow-lg shadow-red-600/30"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Mở Bot Thanh Toán</span>
          </a>
          <a
            href={TELEGRAM_SUPPORT_GROUP}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#200a12] hover:bg-[#2b0e19] text-amber-300 border border-red-500/30 font-bold text-xs"
          >
            <span>Nhóm Hỗ Trợ Telegram</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Free Tool Data Sources */}
      <div className="mb-8">
        <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Database className="w-5 h-5 text-cyan-400" />
          <span>Nguồn Dữ Liệu Công Cụ Miễn Phí</span>
        </h2>
        <div className="space-y-3">
          {sources.map((s) => (
            <div
              key={s.name}
              className="p-4 rounded-2xl bg-slate-900/60 border border-white/5 flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <s.icon className={`w-5 h-5 ${s.color}`} />
                <div>
                  <h3 className="text-sm font-bold text-white">{s.name}</h3>
                  <p className="text-xs text-slate-400">{s.detail}</p>
                </div>
              </div>
              <span className="text-xs text-slate-500 font-mono">{s.origin}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Disclaimer */}
      <div className="p-5 rounded-2xl bg-slate-950 border border-white/10 text-xs text-slate-400 leading-relaxed flex items-start gap-3">
        <ShieldAlert className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
        <div>
          <strong className="text-slate-300 block mb-1">Disclaimer (Miễn trừ trách nhiệm):</strong>
          Trang web và phần mềm Monica Bot được phát triển và vận hành độc lập bởi cộng đồng game thủ và đại lý Team Murphy, không có liên kết chính thức hay tài trợ từ Century Games hoặc FirstFun.
        </div>
      </div>
    </div>
  );
}
