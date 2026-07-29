import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, Database, Server, Skull, Zap, ExternalLink } from "lucide-react";
import serverData from "@/data/servers.json";
import bossData from "@/data/restricted-area.json";
import heroExpData from "@/data/hero-exp.json";

export const metadata: Metadata = {
  title: "Giới thiệu & Nguồn dữ liệu",
  description:
    "LASTWAR HQ là công cụ fan-made cho Last War: Survival, chạy hoàn toàn trên dữ liệu game thật. Xem nguồn dữ liệu và giới hạn.",
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
    <div className="min-h-screen mx-auto max-w-md px-4 py-6">
      <h1 className="text-2xl font-bold mb-1">Giới thiệu</h1>
      <p className="text-slate-400 text-sm mb-6">
        LASTWAR HQ là công cụ do người chơi làm cho Last War: Survival.
      </p>

      {/* Promise */}
      <div className="p-4 rounded-2xl bg-gradient-to-br from-green-500/10 to-emerald-500/5 border border-green-500/20 mb-6">
        <div className="flex items-center gap-2 mb-2">
          <ShieldCheck className="w-5 h-5 text-green-400" />
          <h2 className="font-bold text-sm">Cam kết: chỉ dữ liệu thật</h2>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed">
          Mỗi con số trên trang này đến từ một tập dữ liệu thật, có nguồn rõ
          ràng. Chúng tôi không hiển thị công thức phỏng đoán hay countdown giả.
          Tính năng nào chưa có dữ liệu đáng tin cậy thì chưa xuất hiện — thay vì
          bịa số.
        </p>
      </div>

      {/* Data sources */}
      <div className="flex items-center gap-2 mb-3">
        <Database className="w-5 h-5 text-slate-400" />
        <h2 className="text-sm font-bold uppercase tracking-wide">Nguồn dữ liệu</h2>
      </div>
      <div className="space-y-2 mb-6">
        {sources.map((s) => (
          <div key={s.name} className="p-4 rounded-2xl glass">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0">
                <s.icon className={`w-5 h-5 ${s.color}`} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-sm">{s.name}</h3>
                <p className="text-xs text-slate-400">{s.detail}</p>
              </div>
              <span className="text-[10px] font-mono text-slate-500 flex-shrink-0">
                {s.origin}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Limitations */}
      <div className="p-4 rounded-2xl glass mb-6">
        <h2 className="text-sm font-bold mb-2">Giới hạn cần biết</h2>
        <ul className="space-y-2 text-xs text-slate-400 leading-relaxed">
          <li className="flex gap-2">
            <span className="text-orange-500 flex-shrink-0">▸</span>
            Dữ liệu là <b className="text-slate-300">snapshot</b> cộng đồng, không
            phải dữ liệu trực tiếp trong game — có thể lệch khi game cập nhật.
          </li>
          <li className="flex gap-2">
            <span className="text-orange-500 flex-shrink-0">▸</span>
            Danh bạ server phản ánh thời điểm coordinateslist.com được cập nhật,
            không phải thời gian thực.
          </li>
          <li className="flex gap-2">
            <span className="text-orange-500 flex-shrink-0">▸</span>
            Chưa có power ranking của server/alliance vì chưa có nguồn số liệu tin
            cậy.
          </li>
        </ul>
      </div>

      {/* Disclaimer */}
      <div className="p-4 rounded-2xl border border-white/5">
        <p className="text-[11px] text-slate-500 leading-relaxed">
          LASTWAR HQ là dự án fan-made, không liên kết, tài trợ hay xác nhận bởi
          nhà phát triển Last War: Survival. Mọi nhãn hiệu thuộc về chủ sở hữu.
        </p>
      </div>

      <div className="mt-6 flex justify-center">
        <Link
          href="/tools"
          className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-orange-500 text-white text-sm font-medium hover:bg-orange-600 transition-colors"
        >
          Xem công cụ <ExternalLink className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
