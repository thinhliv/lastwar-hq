"use client";

import { useState, useEffect, useRef } from "react";
import {
  Send,
  User as UserIcon,
  Globe,
  Search,
  Hash,
  Shield,
  Pin,
  Users,
  Sparkles,
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/components/auth/AuthProvider";

interface Message {
  id: string;
  channel_id: string;
  user_id: string;
  user_name: string;
  avatar_url: string | null;
  content: string;
  created_at: string;
}

interface Channel {
  id: string;
  name: string;
  icon: typeof Hash;
  type: "global" | "alliance" | "country";
  memberCount: number;
}

// ===== CHANNELS =====
const GLOBAL_CHANNELS: Channel[] = [
  { id: "global", name: "Global", icon: Globe, type: "global", memberCount: 12480 },
  { id: "find-alliance", name: "Find Alliance", icon: Search, type: "global", memberCount: 3201 },
  { id: "qa", name: "Q&A", icon: Hash, type: "global", memberCount: 8920 },
  { id: "trading", name: "Trading", icon: Hash, type: "global", memberCount: 1540 },
];

const ALLIANCE_CHANNELS: Channel[] = [
  { id: "alliance", name: "General", icon: Shield, type: "alliance", memberCount: 30 },
  { id: "war-room", name: "War Room", icon: Pin, type: "alliance", memberCount: 30 },
  { id: "officer", name: "Officer Only", icon: Users, type: "alliance", memberCount: 5 },
];

export default function ChatBox({ channelId: initialChannel }: { channelId: string }) {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [showChannelList, setShowChannelList] = useState(false);
  const [activeChannel, setActiveChannel] = useState(initialChannel);
  const [translatedMsgs, setTranslatedMsgs] = useState<Set<string>>(new Set());
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const allChannels = activeChannel.startsWith("alliance")
    ? ALLIANCE_CHANNELS
    : GLOBAL_CHANNELS;

  const currentChannel = allChannels.find((c) => c.id === activeChannel) || allChannels[0];

  // Fetch initial messages
  useEffect(() => {
    const fetchMessages = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("messages")
        .select("*")
        .eq("channel_id", activeChannel)
        .order("created_at", { ascending: false })
        .limit(50);

      if (!error && data) {
        setMessages(data.reverse());
      } else {
        // Demo messages when DB not available
        setMessages(getDemoMessages(activeChannel));
      }
      setLoading(false);
    };

    fetchMessages();

    const channel = supabase
      .channel(`chat_${activeChannel}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `channel_id=eq.${activeChannel}`,
        },
        (payload) => {
          setMessages((prev) => [...prev, payload.new as Message]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [activeChannel]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !user) return;

    const content = input.trim();
    setInput("");

    const userName =
      user.user_metadata?.full_name ||
      user.user_metadata?.name ||
      user.email?.split("@")[0] ||
      "Commander";

    const { error } = await supabase.from("messages").insert([
      {
        channel_id: activeChannel,
        user_id: user.id,
        user_name: userName,
        avatar_url: user.user_metadata?.avatar_url || null,
        content: content,
      },
    ]);

    if (error) {
      // Fallback: add locally
      const localMsg: Message = {
        id: `local-${Date.now()}`,
        channel_id: activeChannel,
        user_id: user.id,
        user_name: userName,
        avatar_url: user.user_metadata?.avatar_url || null,
        content: content,
        created_at: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, localMsg]);
    }
  };

  function toggleTranslate(msgId: string) {
    setTranslatedMsgs((prev) => {
      const next = new Set(prev);
      if (next.has(msgId)) next.delete(msgId);
      else next.add(msgId);
      return next;
    });
  }

  return (
    <div className="flex flex-col h-[calc(100vh-220px)] bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">
      {/* Channel Header */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/5 bg-black/10">
        <button
          onClick={() => setShowChannelList(!showChannelList)}
          className="flex items-center gap-2 text-sm font-bold hover:text-orange-400 transition-colors"
        >
          <currentChannel.icon className="w-4 h-4 text-slate-400" />
          {currentChannel.name}
          <span className="text-[10px] text-slate-500">
            {currentChannel.memberCount.toLocaleString()}
          </span>
        </button>
        <Globe className="w-3.5 h-3.5 text-slate-500" />
      </div>

      {/* Channel List Dropdown */}
      {showChannelList && (
        <div className="border-b border-white/5 bg-black/20 py-2">
          {allChannels.map((ch) => (
            <button
              key={ch.id}
              onClick={() => {
                setActiveChannel(ch.id);
                setShowChannelList(false);
              }}
              className={`w-full flex items-center gap-2 px-4 py-2 text-sm transition-colors ${
                activeChannel === ch.id
                  ? "bg-orange-500/10 text-orange-400"
                  : "text-slate-400 hover:bg-white/5"
              }`}
            >
              <ch.icon className="w-4 h-4" />
              <span className="flex-1 text-left">{ch.name}</span>
              <span className="text-[10px] text-slate-600">{ch.memberCount.toLocaleString()}</span>
            </button>
          ))}
        </div>
      )}

      {/* Alliance Quick Actions (only in alliance channels) */}
      {activeChannel.startsWith("alliance") && (
        <div className="flex gap-1 px-3 py-2 border-b border-white/5 bg-black/10 overflow-x-auto no-scrollbar">
          {[
            { icon: "⛏️", label: "Kho báu", color: "bg-yellow-500/15 text-yellow-400" },
            { icon: "✈️", label: "APC", color: "bg-blue-500/15 text-blue-400" },
            { icon: "🔔", label: "Rally", color: "bg-orange-500/15 text-orange-400" },
            { icon: "📋", label: "Guide", color: "bg-green-500/15 text-green-400" },
          ].map((action) => (
            <button
              key={action.label}
              className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[10px] font-medium whitespace-nowrap ${action.color} hover:scale-105 transition-transform active:scale-95`}
            >
              <span>{action.icon}</span>
              {action.label}
            </button>
          ))}
        </div>
      )}

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 no-scrollbar">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <div className="w-6 h-6 border-2 border-orange-500/30 border-t-orange-500 rounded-full animate-spin" />
          </div>
        ) : messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-slate-500 space-y-2">
            <Globe className="w-8 h-8 opacity-20" />
            <p className="text-sm">Chưa có tin nhắn. Hãy là người đầu tiên!</p>
          </div>
        ) : (
          messages.map((msg) => {
            const isMe = user?.id === msg.user_id;
            const isTranslated = translatedMsgs.has(msg.id);
            return (
              <div
                key={msg.id}
                className={`flex items-start gap-2.5 ${isMe ? "flex-row-reverse" : ""}`}
              >
                {/* Avatar */}
                <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center overflow-hidden flex-shrink-0 border border-white/10">
                  {msg.avatar_url ? (
                    <img src={msg.avatar_url} alt={msg.user_name} className="w-full h-full object-cover" />
                  ) : (
                    <UserIcon className="w-4 h-4 text-slate-400" />
                  )}
                </div>

                {/* Message Bubble */}
                <div className={`flex flex-col ${isMe ? "items-end" : "items-start"} max-w-[75%]`}>
                  <div className="flex items-baseline gap-2 mb-0.5">
                    <span className="text-[10px] font-bold text-slate-300">
                      {msg.user_name}
                    </span>
                    <span className="text-[9px] text-slate-500">
                      {new Date(msg.created_at).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                  <div
                    className={`px-3 py-2 text-sm rounded-2xl ${
                      isMe
                        ? "bg-orange-500 text-white rounded-tr-none"
                        : "bg-white/10 text-slate-200 rounded-tl-none"
                    }`}
                  >
                    {isTranslated ? (
                      <span className="italic opacity-80">
                        🌐 {translateDemo(msg.content)}
                      </span>
                    ) : (
                      msg.content
                    )}
                  </div>
                  {/* Translate button */}
                  {!isMe && (
                    <button
                      onClick={() => toggleTranslate(msg.id)}
                      className={`flex items-center gap-0.5 mt-0.5 text-[9px] transition-colors ${
                        isTranslated ? "text-blue-400" : "text-slate-600 hover:text-blue-400"
                      }`}
                    >
                      <Globe className="w-2.5 h-2.5" />
                      {isTranslated ? "Gốc" : "Dịch"}
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-3 bg-black/20 border-t border-white/5">
        {!user ? (
          <div className="text-center p-2 text-sm text-slate-400">
            Bạn cần đăng nhập để chat.
          </div>
        ) : (
          <form onSubmit={sendMessage} className="flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={`Nhắn vào #${currentChannel.name.toLowerCase()}...`}
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none focus:border-orange-500/50 transition-colors"
              maxLength={500}
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="p-2.5 rounded-xl bg-orange-500 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-orange-600 transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

// ===== DEMO MESSAGES (when Supabase not configured) =====
function getDemoMessages(channelId: string): Message[] {
  const now = Date.now();
  const baseMsgs: Omit<Message, "channel_id">[] = [
    {
      id: "demo-1",
      user_id: "demo-user-1",
      user_name: "DragonSlayer",
      avatar_url: null,
      content: "Anyone looking for alliance on Server 42? We're recruiting! 🏰",
      created_at: new Date(now - 3600000).toISOString(),
    },
    {
      id: "demo-2",
      user_id: "demo-user-2",
      user_name: "KimchiWarrior",
      avatar_url: null,
      content: "Season 6 khi ra vậy mấy anh em? Nghe nói map mới to lắm",
      created_at: new Date(now - 1800000).toISOString(),
    },
    {
      id: "demo-3",
      user_id: "demo-user-3",
      user_name: "GeneralTso",
      avatar_url: null,
      content: "Restricted Area weekend double drops! Đừng quên nhé 🎯",
      created_at: new Date(now - 900000).toISOString(),
    },
    {
      id: "demo-4",
      user_id: "demo-user-4",
      user_name: "VodkaQueen",
      avatar_url: null,
      content: "Grace + Volkov vẫn OP nhất Season 6 đúng không mọi người?",
      created_at: new Date(now - 300000).toISOString(),
    },
  ];

  return baseMsgs.map((m) => ({ ...m, channel_id: channelId }));
}

// ===== SIMPLE TRANSLATE DEMO =====
function translateDemo(text: string): string {
  // This is a placeholder — real translation will use Google Cloud Translation API
  // For now, just prefix with indicator
  const translations: Record<string, string> = {
    "anh em": "everyone",
    "khi": "when",
    "ra": "release",
    "đừng": "don't",
    "quên": "forget",
    "mọi người": "everyone",
    "đúng không": "right",
    "vẫn": "still",
    "nhất": "best",
  };

  let result = text;
  for (const [vi, en] of Object.entries(translations)) {
    result = result.replace(new RegExp(vi, "gi"), en);
  }
  
  // If no translation applied, add generic indicator
  if (result === text && /[\u00C0-\u024F\u1E00-\u1EFF]/.test(text)) {
    return `[Translated] ${text}`;
  }
  
  return result;
}

// Import needed for unused import error
import { MessageCircle } from "lucide-react";
