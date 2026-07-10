import { Newspaper } from "lucide-react";

export default function NewsPage() {
  return (
    <div className="min-h-screen px-4 py-6">
      <h1 className="text-2xl font-bold mb-2">📰 Tin tức</h1>
      <p className="text-slate-400 text-sm mb-6">
        Tin mới nhất từ Last War: Survival
      </p>

      <div className="space-y-3">
        {["Season 5 ra mắt!", "Event: Ammo Bonanza", "Maintenance 12/07"].map(
          (title) => (
            <div key={title} className="p-4 rounded-xl glass opacity-50">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-orange-500/20 flex items-center justify-center flex-shrink-0">
                  <Newspaper className="w-5 h-5 text-orange-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">{title}</h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Auto-crawl + dịch — coming soon
                  </p>
                </div>
              </div>
            </div>
          )
        )}
      </div>

      <div className="mt-8 flex flex-col items-center gap-2 text-slate-500">
        <Newspaper className="w-8 h-8 opacity-40" />
        <p className="text-xs">Đang phát triển...</p>
      </div>
    </div>
  );
}
