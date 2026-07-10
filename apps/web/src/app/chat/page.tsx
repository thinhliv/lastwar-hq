import { MessageSquare } from "lucide-react";

export default function ChatPage() {
  return (
    <div className="min-h-screen px-4 py-6">
      <h1 className="text-2xl font-bold mb-2">💬 Chat</h1>
      <p className="text-slate-400 text-sm mb-6">
        Server Chat · Alliance Chat · Custom Channels
      </p>

      <div className="space-y-3">
        <div className="p-4 rounded-xl glass opacity-50">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-lg">🌍</span>
            <h3 className="font-semibold text-sm">#global-server123</h3>
          </div>
          <p className="text-xs text-slate-500">Server chat —coming soon</p>
        </div>
        <div className="p-4 rounded-xl glass opacity-50">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-lg">🏰</span>
            <h3 className="font-semibold text-sm">#war-room</h3>
          </div>
          <p className="text-xs text-slate-500">Alliance chat —coming soon</p>
        </div>
      </div>

      <div className="mt-8 flex flex-col items-center gap-2 text-slate-500">
        <MessageSquare className="w-8 h-8 opacity-40" />
        <p className="text-xs">Đang phát triển...</p>
      </div>
    </div>
  );
}
