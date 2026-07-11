"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Search, X, ArrowRight } from "lucide-react";

interface SearchItem {
  label: string;
  href: string;
  category: string;
  icon: string;
  keywords?: string;
}

const SEARCH_INDEX: SearchItem[] = [
  // Tools
  { label: "Máy tính", href: "/tools/calculators", category: "Công cụ", icon: "🧮", keywords: "boss hero resource troop calc" },
  { label: "Công cụ nâng cao", href: "/tools/calculators/advanced", category: "Công cụ", icon: "⚙️", keywords: "speedup battle build planner sim" },
  { label: "Bảng xếp hạng Hero", href: "/tools/hero-tier", category: "Công cụ", icon: "⭐", keywords: "hero tier ssr sr rank meta" },
  { label: "Bản đồ mùa giải", href: "/tools/maps", category: "Công cụ", icon: "🗺️", keywords: "map territory zone" },
  { label: "Sự kiện", href: "/tools/events", category: "Công cụ", icon: "📅", keywords: "event countdown timer calendar" },
  { label: "Máy tính Ammo Bonanza", href: "/tools/events/ammo-bonanza", category: "Công cụ", icon: "⚡", keywords: "ammo bonanza calculator event" },
  { label: "Máy tính Desert Treasure", href: "/tools/events/desert-treasure", category: "Công cụ", icon: "🏜️", keywords: "desert treasure calculator event" },
  { label: "Lập kế hoạch tài nguyên", href: "/tools/calculators/resource-planner", category: "Công cụ", icon: "📦", keywords: "resource planner gather train balance" },
  { label: "Lập kế hoạch nâng cấp", href: "/tools/calculators/building-planner", category: "Công cụ", icon: "🏗️", keywords: "building upgrade planner cost time" },
  { label: "Thống kê Server", href: "/tools/server-stats", category: "Công cụ", icon: "📊", keywords: "server stats population" },
  { label: "Tìm Clan", href: "/tools/clan-finder", category: "Công cụ", icon: "🔍", keywords: "clan server find search" },
  { label: "Alliance", href: "/tools/alliance", category: "Công cụ", icon: "🏰", keywords: "alliance guild join create" },
  // Content
  { label: "Hướng dẫn chiến thuật", href: "/guides", category: "Nội dung", icon: "📖", keywords: "guide strategy tips tutorial" },
  { label: "Tin tức & Cập nhật", href: "/news", category: "Nội dung", icon: "📰", keywords: "news update patch announcement" },
  // Nav
  { label: "Chat", href: "/chat", category: "Điều hướng", icon: "💬", keywords: "chat message global alliance" },
  { label: "Hồ sơ", href: "/profile", category: "Điều hướng", icon: "👤", keywords: "profile account settings" },
  { label: "Cài đặt", href: "/settings", category: "Điều hướng", icon: "⚙️", keywords: "settings language notification" },
  { label: "Trang chủ", href: "/", category: "Điều hướng", icon: "🏠", keywords: "home main dashboard" },
];

export default function CommandPalette({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery("");
      setSelectedIndex(0);
    }
  }, [open]);

  const filtered = useMemo(() => {
    if (!query.trim()) return SEARCH_INDEX;
    const q = query.toLowerCase();
    return SEARCH_INDEX.filter((item) => {
      return (
        item.label.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.keywords?.toLowerCase().includes(q)
      );
    });
  }, [query]);

  // Group results
  const grouped = useMemo(() => {
    const groups: Record<string, SearchItem[]> = {};
    filtered.forEach((item) => {
      if (!groups[item.category]) groups[item.category] = [];
      groups[item.category].push(item);
    });
    return Object.entries(groups);
  }, [filtered]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!open) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => Math.min(prev + 1, filtered.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => Math.max(prev - 1, 0));
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (filtered[selectedIndex]) {
          router.push(filtered[selectedIndex].href);
          onClose();
        }
      } else if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, filtered, selectedIndex, router, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg rounded-2xl bg-[#1a1a2e] border border-white/10 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10">
          <Search className="w-4 h-4 text-slate-500" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Tìm công cụ, trang, hoặc hướng dẫn..."
            className="flex-1 bg-transparent text-sm text-white placeholder-slate-500 outline-none"
          />
          <kbd className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-white/5 text-slate-500 border border-white/10">
            ESC
          </kbd>
        </div>

        {/* Results */}
        <div className="max-h-[50vh] overflow-y-auto p-2">
          {grouped.length === 0 ? (
            <div className="py-8 text-center text-slate-500">
              <Search className="w-6 h-6 mx-auto mb-2 opacity-30" />
              <p className="text-xs">Không tìm thấy kết quả cho "{query}"</p>
            </div>
          ) : (
            grouped.map(([category, items]) => (
              <div key={category} className="mb-2">
                <h3 className="px-2 py-1 text-[9px] font-bold uppercase tracking-wide text-slate-600">
                  {category}
                </h3>
                {items.map((item) => {
                  const globalIndex = filtered.indexOf(item);
                  const isSelected = globalIndex === selectedIndex;
                  return (
                    <button
                      key={item.href}
                      onClick={() => {
                        router.push(item.href);
                        onClose();
                      }}
                      onMouseEnter={() => setSelectedIndex(globalIndex)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors ${
                        isSelected
                          ? "bg-orange-500/15 text-orange-400"
                          : "text-slate-300 hover:bg-white/5"
                      }`}
                    >
                      <span className="text-base">{item.icon}</span>
                      <span className="flex-1 text-left">{item.label}</span>
                      {isSelected && <ArrowRight className="w-3.5 h-3.5" />}
                    </button>
                  );
                })}
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-2 border-t border-white/10 flex items-center justify-between text-[9px] text-slate-600">
          <div className="flex items-center gap-2">
            <kbd className="px-1 py-0.5 rounded bg-white/5 border border-white/10">↑↓</kbd>
            <span>Điều hướng</span>
            <kbd className="px-1 py-0.5 rounded bg-white/5 border border-white/10">↵</kbd>
            <span>Chọn</span>
          </div>
          <span>{filtered.length} kết quả</span>
        </div>
      </div>
    </div>
  );
}
