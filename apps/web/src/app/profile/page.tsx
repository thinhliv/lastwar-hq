import { User } from "lucide-react";

export default function ProfilePage() {
  return (
    <div className="min-h-screen px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">👤 Hồ sơ</h1>

      {/* Profile Card Skeleton */}
      <div className="p-6 rounded-2xl glass flex flex-col items-center gap-3">
        <div className="w-20 h-20 rounded-full bg-slate-700 flex items-center justify-center">
          <User className="w-10 h-10 text-slate-500" />
        </div>
        <div className="text-center">
          <p className="text-slate-400 text-sm">Chưa đăng nhập</p>
          <p className="text-slate-600 text-xs mt-1">
            Đăng nhập để đồng bộ dữ liệu
          </p>
        </div>
        <button
          className="mt-2 px-6 py-2 rounded-xl bg-orange-500/20 text-orange-500 text-sm font-medium opacity-50"
          disabled
        >
          Đăng nhập với Google
        </button>
      </div>

      {/* Stats Skeleton */}
      <div className="grid grid-cols-3 gap-3 mt-4">
        {[
          { label: "Tools", value: "—" },
          { label: "Guides", value: "—" },
          { label: "Rank", value: "—" },
        ].map((stat) => (
          <div key={stat.label} className="p-3 rounded-xl glass text-center">
            <p className="text-lg font-bold text-slate-300">{stat.value}</p>
            <p className="text-xs text-slate-500">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-col items-center gap-2 text-slate-500">
        <p className="text-xs">Đang phát triển...</p>
      </div>
    </div>
  );
}
