import Link from "next/link";
import {
  Map as MapIcon,
  Calculator,
  BookOpen,
  Server,
  CalendarDays,
  Search,
  ArrowRight,
} from "lucide-react";

const tools = [
  {
    icon: MapIcon,
    label: "Maps",
    desc: "Bản đồ tương tác từng mùa",
    href: "/tools/maps",
    color: "text-blue-400",
    bgColor: "bg-blue-500/10",
    available: true,
  },
  {
    icon: Calculator,
    label: "Calculators",
    desc: "Boss, Resource, Troop, Speedup",
    href: "#",
    color: "text-orange-400",
    bgColor: "bg-orange-500/10",
    available: false,
  },
  {
    icon: BookOpen,
    label: "Guides",
    desc: "Wiki cộng đồng, video, đánh giá",
    href: "#",
    color: "text-green-400",
    bgColor: "bg-green-500/10",
    available: false,
  },
  {
    icon: Server,
    label: "Server Stats",
    desc: "Power ranking, alliance ranking",
    href: "#",
    color: "text-purple-400",
    bgColor: "bg-purple-500/10",
    available: false,
  },
  {
    icon: CalendarDays,
    label: "Events",
    desc: "Countdown timer, lịch sự kiện",
    href: "#",
    color: "text-cyan-400",
    bgColor: "bg-cyan-500/10",
    available: false,
  },
  {
    icon: Search,
    label: "Clan Finder",
    desc: "Tìm server/clan phù hợp",
    href: "#",
    color: "text-pink-400",
    bgColor: "bg-pink-500/10",
    available: false,
  },
];

export default function ToolsPage() {
  return (
    <div className="min-h-screen px-4 py-6">
      <h1 className="text-2xl font-bold mb-1">🧮 Công cụ</h1>
      <p className="text-slate-400 text-sm mb-6">
        Calculators, Maps, Guides và nhiều hơn nữa
      </p>

      <div className="grid grid-cols-2 gap-3">
        {tools.map((tool) => {
          const content = (
            <div
              className={`relative p-4 rounded-2xl ${tool.bgColor} backdrop-blur-xl border border-white/10 transition-all ${
                tool.available
                  ? "hover:border-orange-500/30 hover:bg-white/10 active:scale-95 cursor-pointer"
                  : "opacity-70 hover:opacity-90"
              }`}
            >
              <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-3">
                <tool.icon className={`w-6 h-6 ${tool.color}`} />
              </div>
              <h3 className="font-semibold text-sm mb-0.5">{tool.label}</h3>
              <p className="text-xs text-slate-400">{tool.desc}</p>

              {tool.available ? (
                <div className="mt-3 flex items-center gap-1 text-xs text-orange-500 font-medium">
                  Mở <ArrowRight className="w-3 h-3" />
                </div>
              ) : (
                <div className="absolute top-3 right-3">
                  <span className="px-2 py-0.5 rounded-md bg-slate-700/50 text-slate-400 text-[9px] font-bold uppercase tracking-wide border border-white/5">
                    Soon
                  </span>
                </div>
              )}
            </div>
          );

          return tool.available ? (
            <Link key={tool.label} href={tool.href}>
              {content}
            </Link>
          ) : (
            <div key={tool.label}>{content}</div>
          );
        })}
      </div>

      <div className="mt-8 text-center">
        <p className="text-xs text-slate-600">
          Thêm công cụ đang được phát triển 🚧
        </p>
      </div>
    </div>
  );
}
