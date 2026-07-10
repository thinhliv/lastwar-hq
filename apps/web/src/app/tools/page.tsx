import { Wrench } from "lucide-react";

export default function ToolsPage() {
  return (
    <div className="min-h-screen px-4 py-6">
      <h1 className="text-2xl font-bold mb-2">🧮 Công cụ</h1>
      <p className="text-slate-400 text-sm mb-6">
        Calculators, Maps, Guides và nhiều hơn nữa
      </p>

      <div className="grid grid-cols-2 gap-3">
        {[
          { icon: "🗺️", label: "Season Maps", desc: "Bản đồ tương tác" },
          { icon: "🧮", label: "Calculators", desc: "Boss, Resource, Troop" },
          { icon: "📖", label: "Guides", desc: "Wiki cộng đồng" },
          { icon: "🖥️", label: "Server Stats", desc: "Power ranking" },
          { icon: "📅", label: "Events", desc: "Countdown timer" },
          { icon: "🔍", label: "Clan Finder", desc: "Tìm server/clan" },
        ].map((tool) => (
          <div
            key={tool.label}
            className="p-4 rounded-xl glass opacity-50 hover:opacity-100 transition-opacity cursor-pointer"
          >
            <div className="text-3xl mb-2">{tool.icon}</div>
            <h3 className="font-semibold text-sm">{tool.label}</h3>
            <p className="text-xs text-slate-500">{tool.desc}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-col items-center gap-2 text-slate-500">
        <Wrench className="w-8 h-8 opacity-40" />
        <p className="text-xs">Đang phát triển...</p>
      </div>
    </div>
  );
}
