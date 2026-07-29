import type { Metadata } from "next";
import Link from "next/link";
import { Skull, Zap, Server, BarChart3, ArrowRight } from "lucide-react";
import bossData from "@/data/restricted-area.json";
import heroExpData from "@/data/hero-exp.json";
import serverData from "@/data/servers.json";

export const metadata: Metadata = {
  title: "Công cụ",
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
    <div className="min-h-screen mx-auto max-w-md px-4 py-6">
      <h1 className="text-2xl font-bold mb-1">Công cụ</h1>
      <p className="text-slate-400 text-sm mb-6">
        Mọi công cụ đều chạy trên dữ liệu game thật.
      </p>

      <div className="grid grid-cols-1 gap-3">
        {tools.map((tool) => (
          <Link key={tool.label} href={tool.href}>
            <div className="relative p-4 rounded-2xl glass hover:border-orange-500/30 hover:bg-white/10 active:scale-[0.99] transition-all">
              <div className="flex items-center gap-3">
                <div
                  className={`w-12 h-12 rounded-xl ${tool.bgColor} flex items-center justify-center flex-shrink-0`}
                >
                  <tool.icon className={`w-6 h-6 ${tool.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm mb-0.5">{tool.label}</h3>
                  <p className="text-xs text-slate-400">{tool.desc}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-600 flex-shrink-0" />
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-8 p-4 rounded-2xl glass">
        <p className="text-xs text-slate-400 leading-relaxed">
          Chỉ liệt kê những công cụ có dữ liệu thật. Các tính năng cần dữ liệu
          game bổ sung (calculator research, gear, event…) sẽ được thêm khi có
          nguồn dữ liệu đáng tin cậy — thay vì hiển thị số liệu phỏng đoán.
        </p>
      </div>
    </div>
  );
}
