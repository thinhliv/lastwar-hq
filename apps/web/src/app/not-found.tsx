import Link from "next/link";
import { Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="flex flex-col items-center gap-4 max-w-sm text-center">
        <div className="text-7xl font-black text-orange-500/20">404</div>
        <h1 className="text-xl font-bold">Không tìm thấy trang</h1>
        <p className="text-sm text-slate-400">
          Trang bạn tìm có thể đã bị xóa hoặc chuyển đi nơi khác.
        </p>
        <div className="flex gap-2">
          <Link
            href="/"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-orange-500 text-white text-sm font-medium hover:bg-orange-600 transition-colors"
          >
            <Home className="w-4 h-4" />
            Trang chủ
          </Link>
          <Link
            href="/tools"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-300 text-sm font-medium hover:bg-white/10 transition-colors"
          >
            <Search className="w-4 h-4" />
            Công cụ
          </Link>
        </div>
      </div>
    </div>
  );
}
