import Link from "next/link";
import {
  Swords,
  Skull,
  Zap,
  Server,
  ArrowRight,
  ShieldCheck,
  Database,
  ChevronRight,
} from "lucide-react";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import bossData from "@/data/restricted-area.json";
import heroExpData from "@/data/hero-exp.json";
import serverData from "@/data/servers.json";

// ===== REAL STATS (computed from bundled datasets, no fake numbers) =====
const boss = bossData as Record<string, { stage: number; power: number }[]>;
const servers = serverData as { server: string; lastUpdate: string; alliances: string[] }[];

const RA_LEVELS = Object.keys(boss).length;
const RA_STAGES = Object.values(boss).reduce((sum, s) => sum + s.length, 0);
const MAX_BOSS_POWER = Math.max(
  ...Object.values(boss).flatMap((stages) => stages.map((s) => s.power))
);
const HERO_MAX_LEVEL = heroExpData.length - 1;
const SERVER_COUNT = servers.length;
const LAST_UPDATE = servers
  .map((s) => s.lastUpdate)
  .sort()
  .at(-1);

function compact(n: number): string {
  if (n >= 1_000_000_000) return (n / 1_000_000_000).toFixed(1) + "B";
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(0) + "K";
  return String(n);
}

const featured = [
  {
    href: "/tools/calculators",
    icon: Skull,
    accent: "text-orange-400",
    ring: "from-orange-500/15 to-red-500/5 border-orange-500/20",
    title: "Boss Restricted Area",
    desc: `Tra cứu sức mạnh boss chính xác — ${RA_LEVELS} level, ${RA_STAGES} stage.`,
    stat: `${compact(MAX_BOSS_POWER)} power tối đa`,
  },
  {
    href: "/tools/calculators",
    icon: Zap,
    accent: "text-yellow-400",
    ring: "from-yellow-500/15 to-orange-500/5 border-yellow-500/20",
    title: "Hero EXP",
    desc: `Tính tổng EXP cần để nâng hero giữa hai cấp bất kỳ, tới Lv.${HERO_MAX_LEVEL}.`,
    stat: `${HERO_MAX_LEVEL} cấp độ`,
  },
  {
    href: "/tools/clan-finder",
    icon: Server,
    accent: "text-pink-400",
    ring: "from-pink-500/15 to-purple-500/5 border-pink-500/20",
    title: "Tìm Server / Alliance",
    desc: "Tra danh bạ server và mã alliance, copy nhanh để tìm đồng đội.",
    stat: `${SERVER_COUNT.toLocaleString()} server`,
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen mx-auto max-w-md">
      {/* ===== HEADER ===== */}
      <header className="sticky top-0 z-30 flex items-center justify-between px-4 py-3 bg-[#0f172a]/80 backdrop-blur-xl border-b border-white/5">
        <span className="text-lg font-black tracking-tight text-orange-500">
          ⚔️ LASTWAR HQ
        </span>
        <LanguageSwitcher />
      </header>

      {/* ===== HERO ===== */}
      <section className="px-4 pt-8 pb-2 text-center">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 mb-4">
          <ShieldCheck className="w-3.5 h-3.5 text-green-400" />
          <span className="text-[11px] font-medium text-green-400">
            100% dữ liệu thật · không phỏng đoán
          </span>
        </div>
        <h1 className="text-3xl font-black leading-tight mb-2">
          Công cụ chính xác cho
          <br />
          <span className="text-orange-500">Last War: Survival</span>
        </h1>
        <p className="text-sm text-slate-400 leading-relaxed px-2">
          Tra cứu Boss power, tính Hero EXP và tìm server/alliance — tất cả dựa
          trên dữ liệu game thật, cập nhật từ cộng đồng.
        </p>
      </section>

      {/* ===== REAL STAT STRIP ===== */}
      <section className="px-4 pt-5">
        <div className="grid grid-cols-3 gap-2">
          {[
            { value: SERVER_COUNT.toLocaleString(), label: "Server" },
            { value: RA_STAGES.toString(), label: "Boss stage" },
            { value: HERO_MAX_LEVEL.toString(), label: "Cấp hero" },
          ].map((s) => (
            <div
              key={s.label}
              className="p-3 rounded-2xl glass text-center"
            >
              <div className="text-xl font-black text-white">{s.value}</div>
              <div className="text-[10px] text-slate-500 mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== FEATURED TOOLS ===== */}
      <section className="px-4 pt-6">
        <div className="flex items-center gap-2 mb-3">
          <Swords className="w-5 h-5 text-orange-500" />
          <h2 className="text-sm font-bold uppercase tracking-wide">Công cụ</h2>
          <Link
            href="/tools"
            className="ml-auto text-xs text-slate-400 hover:text-orange-500 transition-colors flex items-center gap-0.5"
          >
            Tất cả <ChevronRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="space-y-3">
          {featured.map((f) => (
            <Link
              key={f.title}
              href={f.href}
              className={`block p-4 rounded-2xl bg-gradient-to-br ${f.ring} border transition-all hover:scale-[1.01] active:scale-[0.99]`}
            >
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0">
                  <f.icon className={`w-6 h-6 ${f.accent}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-base">{f.title}</h3>
                  <p className="text-xs text-slate-400 leading-snug mt-0.5">
                    {f.desc}
                  </p>
                  <span className={`text-[11px] font-mono ${f.accent} mt-1 inline-block`}>
                    {f.stat}
                  </span>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-600 flex-shrink-0" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ===== HONESTY / DATA SOURCE ===== */}
      <section className="px-4 pt-6 pb-8">
        <Link
          href="/about"
          className="block p-4 rounded-2xl glass hover:border-orange-500/20 transition-all"
        >
          <div className="flex items-start gap-3">
            <Database className="w-5 h-5 text-slate-400 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h3 className="text-sm font-semibold mb-1">Dữ liệu đến từ đâu?</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Boss & Hero EXP lấy từ cpt-hedge.com; danh bạ server từ
                coordinateslist.com. Đây là snapshot cộng đồng
                {LAST_UPDATE ? ` (mới nhất ${LAST_UPDATE})` : ""}, không phải
                dữ liệu trực tiếp trong game.
              </p>
              <span className="text-[11px] text-orange-500 font-medium mt-1.5 inline-flex items-center gap-0.5">
                Tìm hiểu thêm <ChevronRight className="w-3 h-3" />
              </span>
            </div>
          </div>
        </Link>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="text-center py-4 px-4 border-t border-white/5">
        <div className="flex items-center justify-center gap-2">
          <Swords className="w-3 h-3 text-slate-600" />
          <span className="text-[10px] text-slate-600">
            footzone.vn · © 2026 LASTWAR HQ · Fan-made, không liên kết chính thức
          </span>
        </div>
      </footer>
    </div>
  );
}
