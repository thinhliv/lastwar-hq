"use client";

import { useState } from "react";
import {
  Newspaper,
  Bookmark,
  BookmarkCheck,
  Globe,
  Clock,
} from "lucide-react";

// ===== TYPES =====
type Category = "All" | "Update" | "Event" | "Patch Notes" | "Maintenance";

interface NewsArticle {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  category: Exclude<Category, "All">;
  thumbnail: string;
  translated: boolean;
}

// ===== FAKE DATA =====
const ARTICLES: NewsArticle[] = [
  {
    id: 1,
    title: "Season 5 chính thức ra mắt — Map mới, Hero mới!",
    excerpt:
      "Bản cập nhật lớn nhất năm 2026 mang đến bản đồ Season 5 hoàn toàn mới với 6 alliance territory, hero SSR mới Grace, và hệ thống APC tier 9.",
    date: "10/07/2026",
    category: "Update",
    thumbnail: "🔥",
    translated: true,
  },
  {
    id: 2,
    title: "Ammo Bonanza — Nhân x2 đạn dược 48 giờ!",
    excerpt:
      "Sự kiện Ammo Bonanza diễn ra từ 13/07 đến 15/07. Tận dụng cơ hội nhận doubled ammo trong mọi hoạt động chiến đấu.",
    date: "09/07/2026",
    category: "Event",
    thumbnail: "💥",
    translated: true,
  },
  {
    id: 3,
    title: "Patch Notes 3.5.1 — Sửa lỗi crash Alliance War",
    excerpt:
      "Bản vá 3.5.1 khắc phục lỗi crash khi tham gia Alliance War, tối ưu hiệu suất server và cải thiện hệ thống chat.",
    date: "08/07/2026",
    category: "Patch Notes",
    thumbnail: "🔧",
    translated: true,
  },
  {
    id: 4,
    title: "Bảo trì server định kỳ tháng 7",
    excerpt:
      "Server sẽ bảo trì từ 02:00 đến 04:00 UTC ngày 12/07/2026. Vui lòng hoàn thành các hoạt động quan trọng trước thời gian này.",
    date: "07/07/2026",
    category: "Maintenance",
    thumbnail: "🛠️",
    translated: false,
  },
  {
    id: 5,
    title: "Desert Treasure Event — Tìm kho báu sa mạc",
    excerpt:
      "Sự kiện Desert Treasure quay trở lại với phần thưởng hấp dẫn. Thu thập map pieces, giải mã coordinates và tìm kho báu ẩn.",
    date: "05/07/2026",
    category: "Event",
    thumbnail: "🏜️",
    translated: true,
  },
];

const CATEGORIES: Category[] = ["All", "Update", "Event", "Patch Notes", "Maintenance"];

const CATEGORY_COLORS: Record<string, string> = {
  Update: "bg-orange-500/20 text-orange-400 border-orange-500/20",
  Event: "bg-blue-500/20 text-blue-400 border-blue-500/20",
  "Patch Notes": "bg-green-500/20 text-green-400 border-green-500/20",
  Maintenance: "bg-purple-500/20 text-purple-400 border-purple-500/20",
};

// ===== COMPONENT =====
export default function NewsPage() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [bookmarks, setBookmarks] = useState<Set<number>>(new Set());

  function toggleBookmark(id: number) {
    setBookmarks((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  const filteredArticles =
    activeCategory === "All"
      ? ARTICLES
      : ARTICLES.filter((a) => a.category === activeCategory);

  return (
    <div className="min-h-screen px-4 py-6">
      {/* Header */}
      <div className="flex items-center gap-2 mb-1">
        <Newspaper className="w-6 h-6 text-orange-500" />
        <h1 className="text-2xl font-bold">Tin tức</h1>
      </div>
      <p className="text-slate-400 text-sm mb-4">
        Tin mới nhất từ Last War: Survival
      </p>

      {/* Category Filter */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2 mb-4">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
              activeCategory === cat
                ? "bg-orange-500 text-white"
                : "bg-white/5 text-slate-400 border border-white/10 hover:bg-white/10"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Auto-translate banner */}
      <div className="mb-4 flex items-center gap-2 p-2.5 rounded-xl bg-blue-500/5 border border-blue-500/10">
        <Globe className="w-4 h-4 text-blue-400 flex-shrink-0" />
        <p className="text-xs text-slate-400">
          Tin tức tự động dịch theo ngôn ngữ của bạn
        </p>
      </div>

      {/* Articles List */}
      <div className="space-y-3">
        {filteredArticles.map((article) => (
          <article
            key={article.id}
            className="rounded-2xl glass overflow-hidden hover:border-orange-500/20 transition-all"
          >
            {/* Thumbnail */}
            <div className="h-28 bg-gradient-to-br from-slate-800/50 to-slate-900/50 flex items-center justify-center text-5xl">
              {article.thumbnail}
            </div>

            {/* Content */}
            <div className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <span
                  className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wide border ${CATEGORY_COLORS[article.category]}`}
                >
                  {article.category}
                </span>
                <span className="flex items-center gap-1 text-[10px] text-slate-500">
                  <Clock className="w-3 h-3" />
                  {article.date}
                </span>
                {article.translated && (
                  <span className="flex items-center gap-0.5 text-[10px] text-blue-400 ml-auto" title="Đã dịch theo ngôn ngữ của bạn">
                    <Globe className="w-3 h-3" />
                  </span>
                )}
              </div>

              <h3 className="font-bold text-sm mb-1.5 leading-snug">
                {article.title}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
                {article.excerpt}
              </p>

              {/* Actions */}
              <div className="flex items-center justify-between mt-3">
                <button className="text-xs text-orange-500 font-medium hover:underline">
                  Đọc thêm →
                </button>
                <button
                  onClick={() => toggleBookmark(article.id)}
                  className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
                  aria-label="Bookmark"
                >
                  {bookmarks.has(article.id) ? (
                    <BookmarkCheck className="w-4 h-4 text-orange-500" />
                  ) : (
                    <Bookmark className="w-4 h-4 text-slate-500" />
                  )}
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      {filteredArticles.length === 0 && (
        <div className="flex flex-col items-center gap-2 py-12 text-slate-500">
          <Newspaper className="w-8 h-8 opacity-40" />
          <p className="text-sm">Chưa có bài viết trong mục này</p>
        </div>
      )}
    </div>
  );
}
