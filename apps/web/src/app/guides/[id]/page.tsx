"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  BookOpen,
  ChevronLeft,
  Clock,
  User,
  Calendar,
  ThumbsUp,
  Share2,
  Bookmark,
  BookmarkCheck,
} from "lucide-react";

// ===== GUIDES DATA (same as guides listing page) =====
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

const GUIDES: Guide[] = [
  {
    id: 1,
    title: "Best Hero Combinations for Season 6",
    category: "Heroes",
    excerpt:
      "Khai phá các combo hero mạnh nhất cho Season 6 — từ đội hình APC tối ưu đến bộ đôi hero SSR phá đảo mọi combat.",
    content:
      "Season 6 mang đến nhiều thay đổi về meta hero. Bài viết này phân tích từng combo hero hàng đầu dựa trên data thực tế từ top players:\n\n## 1. Grace + Volkov — Bộ đôi SSR mạnh nhất\nGrace tăng damage cho toàn đội trong khi Volkov xử lý tank. Hiệu quả trong cả PvE và PvP.\n- **Grace**: Skill chính là buffs toàn đội +25% attack\n- **Volkov**: Tank chính với taunt và damage reflect\n- **Synergy**: Grace buff → Volkov sống lâu hơn → damage multiply\n\n## 2. Murphy + Kim — Combo điều khiển\nMurphy stun 3s kết hợp với burst damage từ Kim tạo ra one-shot potential.\n- **Murphy**: AoE stun 3s, range rộng\n- **Kim**: Single-target burst, tối đa khi enemy bị stun\n- **Best for**: PvP, Alliance War\n\n## 3. Freya + Schuyler — Best sustain combo\nFreya heal + Schuyler shield tạo đội hình gần như bất tử trong PvE.\n- **Freya**: Hoàn máu 15% mỗi turn\n- **Schuyler**: Shield hấp thụ 5000 damage\n- **Best for**: Restricted Area, boss farming\n\n## 4. Avery + Duncan — Budget F2P combo\nVẫn mạnh đủ để đẩy rank cao nếu upgrade đúng cách.\n- **Avery**: SR hero, dễ lấy qua events\n- **Duncan**: SR hero, shards có sẵn trong shop\n- **Tip**: Cần upgrade skill lvl 8+ để hiệu quả tối đa\n\n## Lưu ý quan trọng\n- Tier list thay đổi theo meta, theo dõi update mới nhất\n- Hero combo phải phù hợp với troop type bạn đang dùng\n- Đầu tư vào 1-2 combo thay vì dàn trải",
    readTime: "8 min",
    author: "CommanderPhoenix",
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
      "Base layout là yếu tố quyết định giữa thắng và thua trong Last War.\n\n## Nguyên tắc cơ bản\n\n### 1. Headquarters ở trung tâm\n- Đặt HQ ở giữa base, được bao quanh bởi defensive buildings\n- HQ là mục tiêu chính của enemy — bảo vệ nó bằng mọi giá\n\n### 2. Resource buildings ở outer ring\n- Dễ bị cướp nhưng khó tiếp cận HQ\n- Placement strategic để slow down enemy advance\n\n### 3. Walls tạo nhiều lớp\n- Không chỉ một vòng duy nhất!\n- Multi-layer wall tạo choke points\n- Enemy phải break nhiều lần → mất thời gian\n\n## Lỗi phổ biến cần tránh\n\n- **Đặt tất cả resource ở một góc** → dễ bị farm toàn bộ\n- **Wall quá mỏng** → bị breach ngay lần đầu\n- **Bỏ trống góc defense** → APC enemy tiếp cận HQ trực tiếp\n- **Quên upgrade wall** → wall cấp thấp vô dụng ở tier cao\n\n## Pro Tips\n\n- Sử dụng terrain (núi, sông) làm defense tự nhiên\n- Phân vùng base thành sectors, mỗi sector có defense riêng\n- Upgrade walls TRƯỚC khi upgrade HQ level\n- Đặt trap ở vị trí enemy hay attack nhất\n- Watch tower placement để maximize coverage",
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
      "Restricted Area là một trong những hoạt động quan trọng nhất trong Last War.\n\n## Thời gian mở cửa\n- Mở vào thứ 2, 4, 6 hàng tuần\n- Mở cửa 2 tiếng mỗi lần\n- Key vào: 1 key/lần (hoặc free ticket daily)\n\n## Chiến thuật farm\n\n### Chọn troop type\n- Mang troop type có lợi thế against enemy trong area\n- Check enemy type trước khi vào\n- Mang đa dạng troop type để linh hoạt\n\n### Hero selection\n- Sử dụng hero có skill AoE để clear nhanh\n- Hero heal/shield cho sustain\n- Avoid single-target hero — không hiệu quả khi fight boss\n\n### Team play\n- Luôn đi team (5 người) để tối đa reward\n- Coordinate target focus\n- Assign roles: tank, DPS, support\n\n## Reward tiers\n\n| Tier | Kills | Rewards |\n|------|-------|---------|\n| Bronze | 1-5 | Basic resources |\n| Silver | 6-15 | Rare materials + speedups |\n| Gold | 16+ | SSR hero shards + exclusive items |\n\n## Lưu ý quan trọng\n\n- Đừng vào area nếu không đủ troop — lãng phí key\n- Check enemy power trước khi engage\n- Ưu tiên boss để nhận reward cao nhất\n- Time management: 2 giờ ngắn hơn bạn nghĩ!\n- Save free daily ticket — không accumulate",
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
      "Alliance War là tính năng cốt lõi của Last War. Bài viết tổng hợp kinh nghiệm từ top 10 alliances.\n\n## Rally Strategy\n\n### Timing\n- Rally 5-10 phút trước khi war bắt đầu\n- Đảm bảo participation tối đa\n- Assign rally leader mạnh nhất\n\n### Target Selection\n- Ưu tiên target alliance yếu hơn trước\n- Focus 1-2 servers thay vì tấn công tràn lan\n- Ưu tiên resource-rich zones\n- Tránh alliance rank cao hơn (trừ khi có chiến thuật specific)\n\n## Defense Setup\n\n### Role Assignment\n- R4/R5 online trong war hours để điều phối\n- Phân công members canh zone entry points\n- Scout report liên tục\n\n### Shield Management\n- Sử dụng shield wisely\n- KHÔNG dùng tất cả ngay đầu\n- Save shield cho final push\n- Peace shield khi không thể defend\n\n## Communication\n\n- Sử dụng alliance chat hoặc Discord để coordinate\n- Gửi reminder trước war 1 tiếng\n- Assign roles: attacker, defender, scout\n- Post-war review: ghi lại lesson learned\n\n## Pro Tips from Top R5\n\n> 'Winning isn't about power — it's about coordination. A well-coordinated alliance can beat one 2x their size.' — R5 from #1 server\n\n> 'Scout everything. Every attack should be informed.' — Top strategist\n\n> 'Don't chase kills. Chase objectives.' — Season 5 champion",
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
      "Resource management là chìa khóa để progress nhanh trong Last War.\n\n## Early Game (HQ 1-15)\n\n### Focus\n- Upgrade resource buildings lên level cao nhất\n- Farm RSS tiles liên tục\n- Ưu tiên food và lumber\n\n### Don'ts\n- KHÔNG dùng speedup cho building — save cho sau\n- KHÔNG mua resource bằng gems\n- KHÔNG bỏ qua daily quests\n\n## Mid Game (HQ 16-25)\n\n### Balance\n- Cân bằng troop training và building upgrade\n- Tham gia events để nhận resource bundles\n- Upgrade warehouse để bảo vệ tài nguyên\n\n### Tips\n- Bắt đầu tích trữ oil và iron cho endgame\n- Alliance resource sharing qua Trading Post\n- Event resource packs rất đáng giá\n\n## End Game (HQ 26+)\n\n### Shift\n- Focus oil và steel\n- Research > Building cho speedup\n- Alliance War để cướp tài nguyên\n\n## Nguyên tắc vàng\n\n1. **Không bao giờ để tài nguyên full** — waste production\n2. **Luôn có queue** — training hoặc building\n3. **Save gems cho hero pulls**, không dùng cho resources\n4. **Speedup chỉ dùng khi cần thiết** — event deadline, war prep\n5. **Trade excess** — nếu thừa food, đổi lấy oil/iron\n6. **Farm schedule** — farm trước khi ngủ, dùng khi thức dậy",
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
      "Season 6 'Shadow Jungle' mang đến nhiều thay đổi lớn.\n\n## Map Changes\n\n- Map rộng hơn 20% so với Season 5\n- Thêm 2 alliance territory zones mới\n- Terrain thay đổi: nhiều jungle hơn, ít plain hơn\n- New choke points tạo strategic depth\n\n## New Mechanics\n\n### Fog of War\n- Không thấy enemy ngoài tầm radar\n- Scout APC quan trọng hơn bao giờ hết\n- Stealth strategy trở nên viable\n\n### Jungle Buffs\n- Buff tạm thời khi chiến đấu trong jungle zone\n- Different buffs per jungle type\n- Stack với hero skills\n\n### Shadow Events\n- Events ngẫu nhiên xuất hiện trên map\n- First-come-first-serve rewards\n- Bonus cho alliance控制的 zone\n\n## Meta Shift\n\n- APC scout tier cao = must-have\n- Hero có skill reveal/stealth được ưu tiên\n- Defense buildings yếu hơn trong jungle zones\n- Cavalry mạnh hơn (jungle mobility)\n\n## Chuẩn bị\n\n### Trước Season\n1. Upgrade APC scout lên tier cao nhất\n2. Train thêm troop type phù hợp jungle\n3. Stockpile resources\n4. Coordinate territory selection với alliance\n\n### Đầu Season\n1. Scout territory ngay khi mở\n2. Đảm bảo placement ở zone có jungle strategic\n3. Establish foothold nhanh — grab resource nodes\n4. Defense setup trước khi enemy arrive",
    readTime: "7 min",
    author: "SeasonAnalyst",
    date: "28/06/2026",
  },
];

const CATEGORY_META: Record<
  GuideCategory,
  { color: string; bgColor: string }
> = {
  Beginner: { color: "text-green-400", bgColor: "bg-green-500/10" },
  Combat: { color: "text-red-400", bgColor: "bg-red-500/10" },
  Economy: { color: "text-yellow-400", bgColor: "bg-yellow-500/10" },
  Heroes: { color: "text-purple-400", bgColor: "bg-purple-500/10" },
  "Season Strategy": { color: "text-blue-400", bgColor: "bg-blue-500/10" },
};

// Simple markdown-like renderer
function renderContent(content: string) {
  const blocks = content.split("\n\n");
  
  return blocks.map((block, i) => {
    const trimmed = block.trim();
    if (!trimmed) return null;
    
    // Heading
    if (trimmed.startsWith("## ")) {
      return (
        <h2 key={i} className="text-base font-bold text-white mt-5 mb-2">
          {trimmed.slice(3)}
        </h2>
      );
    }
    
    // Table
    if (trimmed.startsWith("|")) {
      const lines = trimmed.split("\n");
      const rows = lines.filter((l) => !l.includes("---"));
      return (
        <div key={i} className="my-3 overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-white/10">
                {rows[0].split("|").filter(Boolean).map((h, j) => (
                  <th key={j} className="px-3 py-2 text-left font-bold text-slate-300">{h.trim()}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.slice(1).map((row, ri) => (
                <tr key={ri} className="border-b border-white/5">
                  {row.split("|").filter(Boolean).map((cell, ci) => (
                    <td key={ci} className="px-3 py-2 text-slate-400">{cell.trim()}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
    
    // Blockquote
    if (trimmed.startsWith("> ")) {
      return (
        <blockquote key={i} className="border-l-2 border-orange-500/40 pl-3 my-3 text-sm text-slate-400 italic">
          {trimmed.split("\n").map((line, li) => (
            <p key={li}>{line.replace(/^> /, "")}</p>
          ))}
        </blockquote>
      );
    }
    
    // List
    if (trimmed.match(/^[-\d]/m)) {
      const items = trimmed.split("\n").filter(Boolean);
      const isNumbered = trimmed.match(/^\d/);
      return (
        <ul key={i} className={`space-y-1.5 my-2 ${isNumbered ? "list-decimal" : "list-disc"} list-inside`}>
          {items.map((item, ii) => {
            const clean = item.replace(/^[-\d.\s]+/, "").replace(/^\*\*([^*]+)\*\*/, "$1");
            const parts = item.split(/(\*\*[^*]+\*\*)/);
            return (
              <li key={ii} className="text-sm text-slate-300">
                {parts.map((part, pi) => {
                  if (part.startsWith("**") && part.endsWith("**")) {
                    return <span key={pi} className="font-bold text-white">{part.slice(2, -2)}</span>;
                  }
                  return <span key={pi}>{part.replace(/^[-\d.\s]+/, "")}</span>;
                })}
              </li>
            );
          })}
        </ul>
      );
    }
    
    // Regular paragraph
    const parts = trimmed.split(/(\*\*[^*]+\*\*)/);
    return (
      <p key={i} className="text-sm text-slate-300 leading-relaxed my-2">
        {parts.map((part, pi) => {
          if (part.startsWith("**") && part.endsWith("**")) {
            return <span key={pi} className="font-bold text-white">{part.slice(2, -2)}</span>;
          }
          return <span key={pi}>{part}</span>;
        })}
      </p>
    );
  });
}

// ===== COMPONENT =====
export default function GuideDetailPage() {
  const params = useParams();
  const guideId = Number(params.id);
  const guide = GUIDES.find((g) => g.id === guideId);
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  if (!guide) {
    return (
      <div className="min-h-screen px-4 py-6 flex flex-col items-center justify-center gap-4">
        <BookOpen className="w-12 h-12 text-slate-600" />
        <p className="text-sm text-slate-400">Không tìm thấy guide</p>
        <Link href="/guides" className="text-sm text-orange-500 hover:underline">
          ← Quay lại Guides
        </Link>
      </div>
    );
  }

  const meta = CATEGORY_META[guide.category];
  const related = GUIDES.filter((g) => g.category === guide.category && g.id !== guide.id).slice(0, 2);

  return (
    <div className="min-h-screen px-4 py-6 max-w-2xl mx-auto">
      <Link
        href="/guides"
        className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-orange-500 transition-colors mb-4"
      >
        <ChevronLeft className="w-4 h-4" />
        Guides
      </Link>

      {/* Header */}
      <div className={`rounded-2xl ${meta.bgColor} p-5 mb-4`}>
        <span className={`inline-block px-2 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-wide ${meta.bgColor} ${meta.color} border border-white/10 mb-2`}>
          {guide.category}
        </span>
        <h1 className="text-xl font-bold leading-tight mb-3">{guide.title}</h1>
        <div className="flex items-center gap-3 text-[10px] text-slate-500">
          <span className="flex items-center gap-1">
            <User className="w-3 h-3" />
            {guide.author}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {guide.readTime}
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {guide.date}
          </span>
        </div>
      </div>

      {/* Content */}
      <article className="px-1">
        {renderContent(guide.content)}
      </article>

      {/* Actions */}
      <div className="flex items-center justify-around mt-6 pt-4 border-t border-white/10">
        <button
          onClick={() => setLiked(!liked)}
          className={`flex flex-col items-center gap-1 ${liked ? "text-orange-500" : "text-slate-500"} hover:text-orange-400 transition-colors`}
        >
          <ThumbsUp className={`w-5 h-5 ${liked ? "fill-current" : ""}`} />
          <span className="text-[10px]">{liked ? "Đã thích" : "Thích"}</span>
        </button>
        <button
          onClick={() => setBookmarked(!bookmarked)}
          className={`flex flex-col items-center gap-1 ${bookmarked ? "text-orange-500" : "text-slate-500"} hover:text-orange-400 transition-colors`}
        >
          {bookmarked ? <BookmarkCheck className="w-5 h-5" /> : <Bookmark className="w-5 h-5" />}
          <span className="text-[10px]">{bookmarked ? "Đã lưu" : "Lưu"}</span>
        </button>
        <button
          onClick={() => {
            if (navigator.share) {
              navigator.share({ title: guide.title, text: guide.excerpt });
            } else {
              navigator.clipboard.writeText(window.location.href);
            }
          }}
          className="flex flex-col items-center gap-1 text-slate-500 hover:text-orange-400 transition-colors"
        >
          <Share2 className="w-5 h-5" />
          <span className="text-[10px]">Chia sẻ</span>
        </button>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <div className="mt-8">
          <h2 className="text-sm font-bold uppercase tracking-wide text-slate-300 mb-3">
            Bài viết liên quan
          </h2>
          <div className="space-y-2">
            {related.map((r) => (
              <Link
                key={r.id}
                href={`/guides/${r.id}`}
                className="flex items-center gap-3 p-3 rounded-xl glass hover:border-orange-500/20 transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                  <BookOpen className={`w-5 h-5 ${meta.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm truncate">{r.title}</h3>
                  <p className="text-[10px] text-slate-500">{r.readTime} · {r.date}</p>
                </div>
                <ChevronLeft className="w-4 h-4 text-slate-600 rotate-180" />
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
