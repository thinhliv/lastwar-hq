const fs = require('fs');
let content = fs.readFileSync('src/app/admin/page.tsx', 'utf8');

// 1. Add "feedback" to AdminTab type
content = content.replace(
  'type AdminTab = "dashboard" | "analytics" | "content" | "users" | "events" | "settings";',
  'type AdminTab = "dashboard" | "analytics" | "content" | "users" | "events" | "feedback" | "settings";'
);

// 2. Add nav item after events
content = content.replace(
  '{ id: "events", label: "Sự kiện", icon: Calendar },',
  '{ id: "events", label: "Sự kiện", icon: Calendar },\n    { id: "feedback", label: "Góp ý", icon: MessageSquare },'
);

// 3. Add feedback tab render
content = content.replace(
  '{tab === "events" && <EventsTab />}',
  '{tab === "events" && <EventsTab />}\n          {tab === "feedback" && <FeedbackTab />}'
);

// 4. Add FeedbackTab component before Settings
content = content.replace(
  '// ===== SETTINGS TAB =====',
  `// ===== FEEDBACK TAB =====
function FeedbackTab() {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    try {
      const data = JSON.parse(localStorage.getItem("lastwar_feedbacks") || "[]");
      setFeedbacks(data.reverse());
    } catch {}
  }, []);

  function deleteFeedback(id) {
    const filtered = feedbacks.filter((f) => f.id !== id);
    setFeedbacks(filtered);
    localStorage.setItem("lastwar_feedbacks", JSON.stringify(filtered));
  }

  function clearAll() {
    setFeedbacks([]);
    localStorage.removeItem("lastwar_feedbacks");
  }

  const typeLabels = {
    feedback: { label: "Góp ý", icon: "💬", color: "bg-blue-500/20 text-blue-400" },
    bug: { label: "Lỗi", icon: "🐛", color: "bg-red-500/20 text-red-400" },
    suggestion: { label: "Đề xuất", icon: "💡", color: "bg-yellow-500/20 text-yellow-400" },
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="grid grid-cols-3 gap-3 flex-1">
          <div className="p-3 rounded-xl bg-blue-500/10">
            <p className="text-xl font-black">{feedbacks.length}</p>
            <p className="text-[10px] text-slate-500 uppercase">Tổng góp ý</p>
          </div>
          <div className="p-3 rounded-xl bg-red-500/10">
            <p className="text-xl font-black">{feedbacks.filter((f) => f.type === "bug").length}</p>
            <p className="text-[10px] text-slate-500 uppercase">Báo lỗi</p>
          </div>
          <div className="p-3 rounded-xl bg-yellow-500/10">
            <p className="text-xl font-black">{feedbacks.filter((f) => f.type === "suggestion").length}</p>
            <p className="text-[10px] text-slate-500 uppercase">Đề xuất</p>
          </div>
        </div>
      </div>

      {feedbacks.length > 0 && (
        <button onClick={clearAll} className="text-[10px] text-red-400 hover:text-red-300">
          🗑️ Xóa tất cả
        </button>
      )}

      {feedbacks.length === 0 ? (
        <div className="p-8 rounded-2xl bg-white/5 border border-white/5 text-center">
          <MessageSquare className="w-8 h-8 text-slate-600 mx-auto mb-2" />
          <p className="text-sm text-slate-500">Chưa có góp ý nào</p>
        </div>
      ) : (
        <div className="space-y-2">
          {feedbacks.map((f) => {
            const tl = typeLabels[f.type] || typeLabels.feedback;
            return (
              <div key={f.id} className="p-3 rounded-xl bg-white/5 border border-white/5">
                <div className="flex items-start justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span className={\`px-2 py-0.5 rounded text-[9px] font-bold \${tl.color}\`}>
                      {tl.icon} {tl.label}
                    </span>
                    <span className="text-xs font-medium text-slate-300">{f.name}</span>
                    {f.email && <span className="text-[10px] text-slate-500">{f.email}</span>}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-yellow-400">{"⭐".repeat(f.rating)}</span>
                    <span className="text-[9px] text-slate-600">{new Date(f.date).toLocaleDateString("vi-VN")}</span>
                    <button onClick={() => deleteFeedback(f.id)} className="text-slate-600 hover:text-red-400">
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>
                <p className="text-xs text-slate-400 mt-1">{f.message}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ===== SETTINGS TAB =====`
);

// 5. Make sure MessageSquare is imported
if (!content.includes('MessageSquare,')) {
  content = content.replace(
    'Activity,',
    'Activity,\n  MessageSquare,'
  );
}

fs.writeFileSync('src/app/admin/page.tsx', content, 'utf8');
console.log('Admin page updated with FeedbackTab');
