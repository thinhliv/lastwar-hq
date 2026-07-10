"use client";

import { useState } from "react";
import { MessageSquare, Globe, Shield, Search } from "lucide-react";
import ChatBox from "@/components/chat/ChatBox";

type ChannelType = "global" | "alliance";

export default function ChatPage() {
  const [activeChannel, setActiveChannel] = useState<ChannelType>("global");

  return (
    <div className="min-h-screen px-4 py-6 flex flex-col">
      <h1 className="text-2xl font-bold mb-2">💬 Chat</h1>
      <p className="text-slate-400 text-sm mb-6">
        Kết nối với cộng đồng LASTWAR HQ
      </p>

      {/* Channel Selector */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setActiveChannel("global")}
          className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all ${
            activeChannel === "global"
              ? "bg-blue-500/20 text-blue-400 border border-blue-500/40"
              : "bg-white/5 text-slate-400 border border-white/10 hover:bg-white/10"
          }`}
        >
          <Globe className="w-4 h-4" />
          Global
        </button>
        <button
          onClick={() => setActiveChannel("alliance")}
          className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all ${
            activeChannel === "alliance"
              ? "bg-orange-500/20 text-orange-400 border border-orange-500/40"
              : "bg-white/5 text-slate-400 border border-white/10 hover:bg-white/10"
          }`}
        >
          <Shield className="w-4 h-4" />
          Alliance
        </button>
      </div>

      {/* Chat Area */}
      <div className="flex-1 min-h-[400px]">
        {/* We key the ChatBox so it completely resets when switching channels */}
        <ChatBox key={activeChannel} channelId={activeChannel} />
      </div>
    </div>
  );
}
