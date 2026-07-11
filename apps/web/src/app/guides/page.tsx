"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  BookOpen,
  ChevronLeft,
  Clock,
  User,
  Swords,
  Shield,
  Coins,
  Star,
  Calendar,
  Sparkles,
} from "lucide-react";

// ===== TYPES =====
type GuideCategory =
  | "Beginner"
  | "Combat"
  | "Economy"
  | "Heroes"
  | "Season Strategy";

interface Guide {
  id: number;
  title: string;
  category: GuideCategory;
  excerpt: string;
  content: string;
  readTime: string;
  author: string;
  date: string;
  isNew?: boolean;
}

// ===== GUIDES DATA =====
const GUIDES: Guide[] = [
  {
    id: 1,
    title: "Best Hero Combinations for Season 6",
    category: "Heroes",
    excerpt:
      "Khai phá các combo hero mạnh nhất cho Season 6 — từ đội hình APC tối ưu đến bộ đôi hero SSR phá đảo mọi combat.",
    content:
      "Season 6 mang đến nhiều thay đổi về meta hero. Bài viết này phân tích từng combo hero hàng đầu dựa trên data thực tế từ top players:\n\n1. **Grace + Volkov** — Bộ đôi SSR mạnh nhất hiện tại, Grace tăng damage cho toàn đội trong khi Volkov xử lý tank. Hiệu quả trong cả PvE và PvP.\n\n2. **Murphy + Kim** — Combo điều khiển hoàn hảo. Murphy stun 3s kết hợp với burst damage từ Kim tạo ra one-shot potential.\n\n3. **Freya + Schuyler** — Best sustain combo. Freya heal + Schuyler shield tạo đội hình gần như bất tử trong PvE.\n\n4. **Avery + Duncan** — Budget combo cho F2P players. Vẫn mạnh đủ để đẩy rank cao nếu upgrade đúng cách.\n\nLưu ý: Tier list thay đổi theo meta. Theo dõi update mới nhất để điều chỉnh đội hình.",
    readTime: "8 min",
    author: "Ch? huyPhoenix",
    date: "10/07/2026",
    isNew: true,
  },
  {
    id: 2,
    title: "How to Optimize Your Base Layout",
    category: "Beginner",
    excerpt:
      "Hướng dẫn chi tiết cách sắp xếp base tối ưu — bảo vệ tài nguyên, tối đa hóa defense và tránh các lỗi phổ biến.",
    content:
      "Base layout là yếu tố quyết định giữa thắng và thua trong Last War. Dưới đây là hướng dẫn chi tiết:\n\n**Nguyên tắc cơ bản:**\n- Đặt Headquarters ở trung tâm, được bao quanh bởi defensive buildings\n- Resource buildings ở outer ring — dễ bị cướp nhưng khó tiếp cận HQ\n- Walls tạo thành nhiều lớp phòng thủ, không chỉ một vòng duy nhất\n\n**Lỗi phổ biến cần tránh:**\n- Đặt tất cả resource buildings ở một góc → dễ bị farm\n- Wall quá mỏng → bị breach ngay lần đầu tiên\n- Bỏ trống góc defense → APC enemy có thể trực tiếp tấn công HQ\n\n**Pro Tips:**\n- Sử dụng terrain (núi, sông) làm defense tự nhiên\n- Phân vùng base thành sectors, mỗi sector có defense riêng\n- Upgrade walls trước khi upgrade HQ level",
    readTime: "6 min",
    author: "BaseMaster",
    date: "09/07/2026",
    isNew: true,
  },
  {
    id: 3,
    title: "Restricted Area: Complete Guide",
    category: "Combat",
    excerpt:
      "Tất tần tật về Restricted Area — thời gian mở cửa, chiến thuật farm, cách tối đa hóa reward và tránh pitfalls.",
    content:
      "Restricted Area là một trong những hoạt động quan trọng nhất trong Last War. Dưới đây là mọi thứ bạn cần biết:\n\n**Thời gian mở cửa:**\n- Mở vào thứ 2, 4, 6 hàng tuần\n- Mở cửa 2 tiếng mỗi lần\n- Coin vào: 1 key/lần (hoặc free ticket daily)\n\n**Chiến thuật farm:**\n- Mang troop type có lợi thế against enemy trong area\n- Sử dụng hero có skill AoE để clear nhanh\n- Luôn đi team (5 người) để tối đa reward\n\n**Reward tiers:**\n- Bronze: 1-5 kills — basic resources\n- Silver: 6-15 kills — rare materials + speedups\n- Gold: 16+ kills — SSR hero shards + exclusive items\n\n**Lưu ý quan trọng:**\n- Đừng vào area nếu không đủ troop — lãng phí key\n- Check enemy power trước khi engage\n- Ưu tiên boss để nhận reward cao nhất",
    readTime: "10 min",
    author: "WarStrategist",
    date: "05/07/2026",
  },
  {
    id: 4,
    title: "Alliance War Strategy: Tips from Top Players",
    category: "Combat",
    excerpt:
      "Chiến thuật Alliance War từ những R5 hàng đầu server — rally timing, target selection và defensive setups.",
    content:
      "Alliance War là tính năng cốt lõi của Last War. Bài viết tổng hợp kinh nghiệm từ top 10 alliances:\n\n**Rally Strategy:**\n- Rally 5-10 phút trước khi war bắt đầu để đảm bảo participation\n- Ưu tiên target alliance yếu hơn trước để tích lũy points\n- Sử dụng APC scout để check defense trước khi rally\n\n**Target Selection:**\n- Focus 1-2 servers thay vì tấn công tràn lan\n- Ưu tiên resource-rich zones để cướp tài nguyên\n- Tránh alliance có rank cao hơn trừ khi có chiến thuật specific\n\n**Defense Setup:**\n- R4/R5 online trong war hours để điều phối\n- Phân công members canh các zone entry points\n- Sử dụng shield wisely — không dùng tất cả ngay đầu\n\n**Communication:**\n- Sử dụng alliance chat hoặc Discord để coordinate\n- Gửi reminder trước war 1 tiếng\n- Assign roles: attacker, defender, scout",
    readTime: "12 min",
    author: "GeneralKhao",
    date: "03/07/2026",
  },
  {
    id: 5,
    title: "Resource Management: Zero to Hero",
    category: "Economy",
    excerpt:
      "Tối ưu hóa tài nguyên từ early game đến endgame — khi nào farm, khi nào speedup và khi nào save.",
    content:
      "Resource management là chìa khóa để progress nhanh trong Last War:\n\n**Early Game (HQ 1-15):**\n- Focus upgrade resource buildings lên level cao nhất có thể\n- Không dùng speedup cho building — save cho sau\n- Farm RSS tiles liên tục, ưu tiên food và lumber\n\n**Mid Game (HQ 16-25):**\n- Bắt đầu cân bằng giữa troop training và building\n- Tham gia events để nhận resource bundles\n- Upgrade warehouse để bảo vệ tài nguyên khỏi bị cướp\n\n**End Game (HQ 26+):**\n- Chuyển sang focus oil và steel\n- Sử dụng speedup cho research thay vì building\n- Tham gia alliance war để cướp tài nguyên từ server khác\n\n**Nguyên tắc vàng:**\n- Không bao giờ để tài nguyên full (waste production)\n- Luôn có queue training/building\n- Save gems cho hero pulls, không dùng cho resources",
    readTime: "9 min",
    author: "Economicon",
    date: "01/07/2026",
  },
  {
    id: 6,
    title: "Season 6: Shadow Jungle Overview",
    category: "Season Strategy",
    excerpt:
      "Tổng quan Season 6 — map mới, cơ chế mới, meta shift và những gì bạn cần chuẩn bị cho season mới.",
    content:
      "Season 6 'Shadow Jungle' mang đến nhiều thay đổi lớn:\n\n**Map Changes:**\n- Map rộng hơn 20% so với Season 5\n- Thêm 2 alliance territory zones mới\n- Terrain thay đổi: nhiều jungle hơn, ít plain hơn\n\n**New Mechanics:**\n- Fog of War: không thấy enemy ngoài tầm radar\n- Jungle Buffs: buff tạm thời khi chiến đấu trong jungle zone\n- Shadow Events: events ngẫu nhiên xuất hiện trên map\n\n**Meta Shift:**\n- APC_TYPE scout quan trọng hơn bao giờ hết\n- Hero có skill reveal/stealth được ưu tiên\n- Defense buildings yếu hơn trong jungle zones\n\n**Chuẩn bị:**\n- Upgrade APC scout lên tier cao nhất\n- Train thêm troop type phù hợp với jungle terrain\n- Stockpile resources trước khi season bắt đầu\n- Coordinate với alliance về territory selection",
    readTime: "7 min",
    author: "SeasonAnalyst",
    date: "28/06/2026",
  },
];

// ===== CATEGORY CONFIG =====
const CATEGORY_META: Record<
  GuideCategory,
  { icon: typeof BookOpen; color: string; bgColor: string }
> = {
  Beginner: { icon: BookOpen, color: "text-green-400", bgColor: "bg-green-500/10" },
  Combat: { icon: Swords, color: "text-red-400", bgColor: "bg-red-500/10" },
  Economy: { icon: Coins, color: "text-yellow-400", bgColor: "bg-yellow-500/10" },
  Heroes: { icon: Star, color: "text-purple-400", bgColor: "bg-purple-500/10" },
  "Season Strategy": { icon: Calendar, color: "text-blue-400", bgColor: "bg-blue-500/10" },
};

const ALL_CATEGORIES: ("All" | GuideCategory)[] = [
  "All",
  "Beginner",
  "Combat",
  "Economy",
  "Heroes",
  "Season Strategy",
];

// ===== COMPONENT =====
export default function GuidesPage() {
  const [activeCategory, setActiveCategory] = useState<"All" | GuideCategory>("All");

  const filteredGuides = useMemo(() => {
    if (activeCategory === "All") return GUIDES;
    return GUIDES.filter(g => g.category === activeCategory);
  }, [activeCategory]);

  return (
    <div className="min-h-screen px-4 py-6">
      {/* Back */}
      <Link
        href="/tools"
        className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-orange-500 transition-colors mb-3"
      >
        <ChevronLeft className="w-4 h-4" />
        Tools
      </Link>

      <div className="flex items-center gap-2 mb-1">
        <BookOpen className="w-6 h-6 text-green-400" />
        <h1 className="text-2xl font-bold">Hu?ng d?n chi?n thu?t</h1>
      </div>
      <p className="text-slate-400 text-sm mb-6">
        Hướng dẫn chi tiết từ cộng đồng Last War
      </p>

      {/* Category filter chips */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2 mb-4">
        {ALL_CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
              activeCategory === cat
                ? "bg-orange-500 text-white"
                : "bg-white/5 text-slate-400 border border-white/10 hover:bg-white/10"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Guides list */}
      <div className="space-y-3">
        {filteredGuides.map((guide) => {
          const meta = CATEGORY_META[guide.category];
          return (
            <Link
              key={guide.id}
              href={`/guides/${guide.id}`}
              className="block rounded-2xl glass overflow-hidden hover:border-orange-500/20 transition-all"
            >
              {/* Thumbnail */}
              <div
                className={`h-32 ${meta.bgColor} flex items-center justify-center relative`}
              >
                <meta.icon className={`w-12 h-12 ${meta.color} opacity-80`} />
                {guide.isNew && (
                  <span className="absolute top-3 right-3 px-2 py-0.5 rounded-md bg-orange-500 text-white text-[9px] font-bold uppercase tracking-wide">
                    New
                  </span>
                )}
                <span
                  className={`absolute top-3 left-3 px-2 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-wide ${meta.bgColor} ${meta.color} border border-white/10`}
                >
                  {guide.category}
                </span>
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="font-bold text-sm mb-1.5 leading-snug">
                  {guide.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed line-clamp-2 mb-3">
                  {guide.excerpt}
                </p>

                {/* Meta */}
                <div className="flex items-center gap-3 text-[10px] text-slate-500">
                  <span className="flex items-center gap-1">
                    <User className="w-3 h-3" />
                    {guide.author}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {guide.readTime}
                  </span>
                  <span className="flex items-center gap-1 ml-auto">
                    <Calendar className="w-3 h-3" />
                    {guide.date}
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Footer */}
      <div className="mt-8 text-center">
        <div className="inline-flex items-center gap-1.5 text-xs text-slate-600">
          <Sparkles className="w-3 h-3" />
          Thêm guides đang được viết bởi cộng đồng
        </div>
      </div>
    </div>
  );
}
