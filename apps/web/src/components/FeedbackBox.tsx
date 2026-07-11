"use client";

import { useState } from "react";
import { MessageSquare, Send, Star, CheckCircle } from "lucide-react";

export default function FeedbackBox() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(5);
  const [type, setType] = useState<"feedback" | "bug" | "suggestion">("feedback");
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Save to localStorage (frontend-only, no backend yet)
    const feedbacks = JSON.parse(localStorage.getItem("lastwar_feedbacks") || "[]");
    feedbacks.push({
      id: Date.now(),
      name: name || "Ẩn danh",
      email,
      message,
      rating,
      type,
      date: new Date().toISOString(),
      status: "new",
    });
    localStorage.setItem("lastwar_feedbacks", JSON.stringify(feedbacks));
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setOpen(false);
      setName("");
      setEmail("");
      setMessage("");
      setRating(5);
    }, 2000);
  }

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-24 right-4 z-40 w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-red-500 shadow-lg shadow-orange-500/30 flex items-center justify-center hover:scale-110 transition-transform"
        aria-label="Góp ý"
      >
        {sent ? (
          <CheckCircle className="w-5 h-5 text-white" />
        ) : (
          <MessageSquare className="w-5 h-5 text-white" />
        )}
      </button>

      {/* Feedback Panel */}
      {open && (
        <div className="fixed bottom-40 right-4 z-40 w-80 max-w-[calc(100vw-2rem)] rounded-2xl bg-[#0f172a] border border-white/10 shadow-2xl overflow-hidden">
          {sent ? (
            <div className="p-8 text-center">
              <CheckCircle className="w-10 h-10 text-green-400 mx-auto mb-2" />
              <p className="text-sm font-bold text-green-400">Cảm ơn anh/chị!</p>
              <p className="text-xs text-slate-500 mt-1">Góp ý đã được ghi nhận 💕</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="p-4 space-y-3">
              {/* Header */}
              <div className="flex items-center gap-2 pb-2 border-b border-white/5">
                <MessageSquare className="w-4 h-4 text-orange-500" />
                <h3 className="text-sm font-bold">Góp ý & Phản hồi</h3>
              </div>

              {/* Type */}
              <div className="flex gap-1">
                {([
                  { id: "feedback", label: "Góp ý", icon: "💬" },
                  { id: "bug", label: "Lỗi", icon: "🐛" },
                  { id: "suggestion", label: "Đề xuất", icon: "💡" },
                ] as const).map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setType(t.id)}
                    className={`flex-1 py-1.5 rounded-lg text-[10px] font-medium transition-all ${
                      type === t.id ? "bg-orange-500/20 text-orange-400 border border-orange-500/30" : "bg-white/5 text-slate-500 border border-white/5"
                    }`}
                  >
                    {t.icon} {t.label}
                  </button>
                ))}
              </div>

              {/* Name */}
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Tên (tuỳ chọn)"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs outline-none focus:border-orange-500/30"
              />

              {/* Email */}
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email (tuỳ chọn)"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs outline-none focus:border-orange-500/30"
              />

              {/* Rating */}
              <div className="flex items-center gap-1">
                <span className="text-[10px] text-slate-500 mr-1">Đánh giá:</span>
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setRating(n)}
                  >
                    <Star
                      className={`w-4 h-4 transition-all ${n <= rating ? "text-yellow-400 fill-yellow-400" : "text-slate-700"}`}
                    />
                  </button>
                ))}
              </div>

              {/* Message */}
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Nội dung góp ý..."
                rows={3}
                required
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs outline-none focus:border-orange-500/30 resize-none"
              />

              {/* Submit */}
              <button
                type="submit"
                className="w-full py-2 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 text-white text-xs font-bold hover:from-orange-600 hover:to-orange-700 flex items-center justify-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                Gửi góp ý
              </button>
            </form>
          )}
        </div>
      )}
    </>
  );
}
