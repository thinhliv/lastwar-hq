export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="relative w-12 h-12">
          <div className="absolute inset-0 rounded-full border-2 border-orange-500/20" />
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-orange-500 animate-spin" />
        </div>
        <p className="text-xs text-slate-500 font-medium">Đang tải...</p>
      </div>
    </div>
  );
}
