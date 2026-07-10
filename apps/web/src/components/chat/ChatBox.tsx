"use client";

import { useState, useEffect, useRef } from "react";
import { Send, User as UserIcon } from "lucide-react";
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

export default function ChatBox({ channelId }: { channelId: string }) {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Fetch initial messages
  useEffect(() => {
    const fetchMessages = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("messages")
        .select("*")
        .eq("channel_id", channelId)
        .order("created_at", { ascending: false })
        .limit(50);

      if (!error && data) {
        setMessages(data.reverse());
      }
      setLoading(false);
    };

    fetchMessages();

    // Subscribe to new messages
    const channel = supabase
      .channel(`chat_${channelId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `channel_id=eq.${channelId}`,
        },
        (payload) => {
          setMessages((prev) => [...prev, payload.new as Message]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [channelId]);

  // Scroll to bottom on new message
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
        channel_id: channelId,
        user_id: user.id,
        user_name: userName,
        avatar_url: user.user_metadata?.avatar_url || null,
        content: content,
      },
    ]);

    if (error) {
      console.error("Error sending message:", error);
      // Optional: Add a toast notification here
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-220px)] bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <div className="w-6 h-6 border-2 border-orange-500/30 border-t-orange-500 rounded-full animate-spin" />
          </div>
        ) : messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-slate-500 space-y-2">
            <MessageCircle className="w-8 h-8 opacity-20" />
            <p className="text-sm">Chưa có tin nhắn nào. Hãy là người đầu tiên!</p>
          </div>
        ) : (
          messages.map((msg) => {
            const isMe = user?.id === msg.user_id;
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
                  <div className="flex items-baseline gap-2 mb-1">
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
                    {msg.content}
                  </div>
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
              placeholder="Nhập tin nhắn..."
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

// Ensure MessageCircle is imported since it's used in empty state
import { MessageCircle } from "lucide-react";
