"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  Newspaper,
  ChevronLeft,
  Clock,
  Globe,
  Bookmark,
  BookmarkCheck,
  Share2,
  Calendar,
} from "lucide-react";

// ===== ARTICLE DATA =====
interface NewsArticle {
  id: number;
  title: string;
  excerpt: string;
  fullContent: string;
  date: string;
  category: "Update" | "Event" | "Patch Notes" | "Maintenance";
  thumbnail: string;
  readTime: string;
  source?: string;
}

const ARTICLES: NewsArticle[] = [
  {
    id: 1,
    title: "Season 5 chính thức ra mắt — Map mới, Hero mới!",
    excerpt: "Bản cập nhật lớn nhất năm 2026 mang đến bản đồ Season 5 hoàn toàn mới với 6 alliance territory, hero SSR mới Grace, và hệ thống APC tier 9.",
    fullContent: "Season 5 đã chính thức ra mắt! Đây là bản cập nhật lớn nhất năm 2026 với hàng loạt thay đổi đáng chú ý:\n\n## Map Mới — 6 Alliance Territory\n\nBản đồ Season 5 mở rộng với 6 alliance territory zones, tăng 50% diện tích so với Season 4. Điều này cho phép nhiều alliance hơn cùng tham gia chiến trường.\n\n### Điểm mới trên map:\n- 2 fortress mới ở trung tâm\n- Resource zones mở rộng\n- New choke points tạo strategic depth\n- Terrain đa dạng hơn (jungle, mountain, plain)\n\n## Hero SSR Mới — Grace\n\nGrace là hero SSR loại Support mới, mang đến meta thay đổi lớn:\n- **Skill chính**: Buff +25% attack cho toàn đội\n- **Skill phụ**: Heal 10% HP mỗi turn\n- **Best synergy**: Volkov (tank), Murphy (stun)\n\nGrace có thể thu thập qua:\n- Hero Summon Festival (limited time)\n- Season 5 pass rewards\n- Top ranking rewards\n\n## Cấp APC 9\n\nHệ thống Cấp APC 9 mở khóa cho HQ level 28+:\n- Tăng 40% power so với Tier 8\n- New visual design\n- Cần resource: 500K oil + 300K iron + 50K steel\n\n## Thay Đổi Khác\n\n- Level cap tăng lên 175\n- New restricted area levels (9 & 10)\n- Alliance war matching improved\n- Bug fixes và optimization\n\n## Chuẩn Bị Cho Season 5\n\n1. **Stockpile resources ngay!** Season mới tốn rất nhiều\n2. **Upgrade APC scout** — Fog of War quan trọng\n3. **Coordinate territory với alliance**\n4. **Save gems cho Hero Summon Festival**\n\nSeason 5 hứa hẹn sẽ là season hoành tráng nhất. Chuẩn bị kỹ và chiến đấu hết mình!",
    date: "10/07/2026",
    category: "Update",
    thumbnail: "🔥",
    readTime: "5 phút đọc",
    source: "Official Announcement",
  },
  {
    id: 2,
    title: "Ammo Bonanza — Nhân x2 đạn dược 48 giờ!",
    excerpt: "Sự kiện Ammo Bonanza diễn ra từ 13/07 đến 15/07. Tận dụng cơ hội nhận doubled ammo trong mọi hoạt động chiến đấu.",
    fullContent: "Sự kiện Ammo Bonanza đang đến! Đây là cơ hội vàng để tích trữ đạn dược.\n\n## Thời Gian\n- **Bắt đầu**: 13/07/2026 00:00 UTC\n- **Kết thúc**: 15/07/2026 00:00 UTC\n- **Thời lượng**: 48 giờ\n\n## Chi Tiết\n\nTrong suốt sự kiện, TẤT CẢ hoạt động chiến đấu cho x2 ammo:\n- Restricted Area: x2 ammo drops\n- World map battles: x2 ammo rewards\n- Alliance war: x2 ammo from kills\n- Daily quests: x2 ammo rewards\n\n## Chiến Thuật Tối Ưu\n\n### 1. Restricted Area\nChơi hết key daily! Double drops = double value. Ưu tiên level cao nhất có thể đánh.\n\n### 2. World Map\nFarm ammo nodes liên tục. Assign tất cả APC vào gathering.\n\n### 3. Alliance War\nTham gia mọi rally. Ammo x2 + war points = двойной win!\n\n### 4. Speedup Usage\nDùng speedup training TRƯỚC event để có troop sẵn sàng. Trong event, focus战斗 thay vì training.\n\n## Tips Từ Top Players\n\n> 'Save tất cả ammo từ event này. Nó đủ cho 2 tuần chiến đấu liên tục.' — Top R5\n\n> 'Alliance rally cho x4 ammo (x2 event + x2 alliance buff). Insane value!' — Season 4 champion\n\nĐừng bỏ lỡ cơ hội này!",
    date: "09/07/2026",
    category: "Event",
    thumbnail: "💥",
    readTime: "4 phút đọc",
    source: "Event Announcement",
  },
  {
    id: 3,
    title: "Patch Notes 3.5.1 — Sửa lỗi crash Alliance War",
    excerpt: "Bản vá 3.5.1 khắc phục lỗi crash khi tham gia Alliance War, tối ưu hiệu suất server và cải thiện hệ thống chat.",
    fullContent: "Bản vá 3.5.1 đã được triển khai. Dưới đây là chi tiết:\n\n## Bug Fixes\n\n### Critical\n- **Fixed**: Crash khi tham gia Alliance War ( affecting ~15% players)\n- **Fixed**: Memory leak khi mở Restricted Area quá lâu\n- **Fixed**: Desync khi rally lớn (>100 APC)\n\n### Major\n- **Fixed**: Chat không load tin nhắn cũ sau khi reconnect\n- **Fixed**: Hero skill description sai cho Volkov\n- **Fixed**: APC tier hiển thị sai trên world map\n- **Fixed**: Resource production dừng khi tài khoản inactive 7+ ngày\n\n### Minor\n- **Fixed**: Typo trong guide tiếng Việt\n- **Fixed**: UI overlap trên màn hình nhỏ (iPhone SE)\n- **Fixed**: Notification badge không reset\n\n## Performance\n\n- Tối ưu server performance: giảm 30% lag trong war time\n- Cải thiện load time: map tải nhanh hơn 40%\n- Reduce memory usage: -200MB RAM trên device thấp\n\n## Quality of Life\n\n- Chat: thêm search functionality\n- Battle report: chi tiết hơn, thêm replay\n- Hero management: bulk upgrade option\n- Alliance: export member list\n\n## Known Issues\n\n- Một số device Android 14 vẫn crash khi mở chat (đang fix)\n- Push notification delay trên iOS 17 (investigating)\n- Vietnamese translation một số chỗ chưa hoàn thiện\n\nCảm ơn cộng đồng đã report bugs!",
    date: "08/07/2026",
    category: "Patch Notes",
    thumbnail: "🔧",
    readTime: "6 phút đọc",
    source: "Official Patch Notes",
  },
  {
    id: 4,
    title: "Bảo trì server định kỳ tháng 7",
    excerpt: "Server sẽ bảo trì từ 02:00 đến 04:00 UTC ngày 12/07/2026. Vui lòng hoàn thành các hoạt động quan trọng trước thời gian này.",
    fullContent: "Bảo trì server định kỳ tháng 7 sẽ diễn ra vào:\n\n## Thời Gian Bảo Trì\n\n- **Ngày**: 12/07/2026 (Thứ 7)\n- **Giờ**: 02:00 - 04:00 UTC\n- **Thời lượng dự kiến**: 2 giờ\n- **Timezone**: 02:00 UTC = 09:00 VN = 11:00 KR/JP\n\n## Nội Dung Bảo Trì\n\n1. **Server optimization** — improve response time\n2. **Database cleanup** — remove orphaned data\n3. **Security updates** — patch vulnerabilities\n4. **Prepare Season 5 infrastructure**\n5. **Deploy anti-cheat updates**\n\n## Lưu Ý Quan Trọng\n\n### Trước Bảo Trì\n- Hoàn thành tất cả activity đang chạy\n- Rút troop từ world map về base\n- Claim tất cả rewards pending\n- Đóng gói alliance rally\n\n### Trong Khi Bảo Trì\n- Server sẽ offline (không vào được game)\n- Event timers sẽ PAUSE (không mất thời gian)\n- Resource production sẽ PAUSE\n- APC movement sẽ PAUSE\n\n### Sau Bảo Trì\n- Compensation: 500 gems + 24h speedup\n- Event timers resume\n- Có thể có patch update đi kèm\n\n## Compensation\n\nTất cả player active trong 7 ngày qua sẽ nhận:\n- 500 gems\n- 1x 24h Universal Speedup\n- 1x Hero EXP chest (Large)\n\nCompensation sẽ gửi qua mail trong game trong vòng 24h sau bảo trì.\n\nCảm ơn sự kiên nhẫn của mọi người!",
    date: "07/07/2026",
    category: "Maintenance",
    thumbnail: "🛠️",
    readTime: "3 phút đọc",
    source: "Server Team",
  },
  {
    id: 5,
    title: "Desert Treasure Event — Tìm kho báu sa mạc",
    excerpt: "Sự kiện Desert Treasure quay trở lại với phần thưởng hấp dẫn. Thu thập map pieces, giải mã coordinates và tìm kho báu ẩn.",
    fullContent: "Desert Treasure Event quay trở lại! Săn kho báu và nhận phần thưởng hiếm.\n\n## Thời Gian\n- **Bắt đầu**: 15/07/2026\n- **Kết thúc**: 22/07/2026\n- **Thời lượng**: 7 ngày\n\n## Cách Tham Gia\n\n### 1. Thu Thập Map Pieces\n- Drop từ Restricted Area boss\n- Reward từ daily quests\n- Mua từ Event Store bằng event currency\n\n### 2. Giải Mã Coordinates\n- Ghép 5 map pieces = 1 coordinates\n- Mỗi coordinates trỏ đến 1 location trên world map\n- Các coordinates có độ hiếm khác nhau\n\n### 3. Đào Kho Báu\n- Send APC đến coordinates\n- Wait for excavation (30 phút - 2 giờ tùy độ hiếm)\n- Claim reward!\n\n## Phần Thưởng\n\n### Common (White)\n- 10K - 50K resources\n- Speedup items (1-3h)\n- Hero EXP chest (S)\n\n### Rare (Blue)\n- 50K - 200K resources\n- Speedup items (8-24h)\n- Hero EXP chest (L)\n- SR hero shards (random)\n\n### Epic (Purple)\n- 200K - 500K resources\n- SSR hero shards (random)\n- Exclusive desert skins\n- Premium summon tickets\n\n### Legendary (Gold)\n- 500K+ resources\n- SSR hero shards (choice)\n- Exclusive title 'Treasure Hunter'\n- Premium items bundle\n\n## Tips\n\n1. **Save map pieces** đến khi có đủ set Epic/Legendary\n2. **Alliance sharing**: đổi coordinates với alliance members\n3. **APC management**: reserve 2-3 APC cho treasure hunting\n4. **Priority**: Legendary > Epic > Rare > Common\n\nGood luck hunting!",
    date: "05/07/2026",
    category: "Event",
    thumbnail: "🏜️",
    readTime: "5 phút đọc",
    source: "Event Announcement",
  },
];

const CATEGORY_COLORS: Record<string, string> = {
  Update: "bg-orange-500/20 text-orange-400 border-orange-500/20",
  Event: "bg-blue-500/20 text-blue-400 border-blue-500/20",
  "Patch Notes": "bg-green-500/20 text-green-400 border-green-500/20",
  Maintenance: "bg-purple-500/20 text-purple-400 border-purple-500/20",
};

// Simple markdown renderer
function renderContent(content: string) {
  const blocks = content.split("\n\n");
  return blocks.map((block, i) => {
    const trimmed = block.trim();
    if (!trimmed) return null;

    if (trimmed.startsWith("## ")) {
      return (
        <h2 key={i} className="text-base font-bold text-white mt-5 mb-2">{trimmed.slice(3)}</h2>
      );
    }
    if (trimmed.startsWith("### ")) {
      return (
        <h3 key={i} className="text-sm font-bold text-slate-200 mt-3 mb-1">{trimmed.slice(4)}</h3>
      );
    }
    if (trimmed.startsWith("> ")) {
      return (
        <blockquote key={i} className="border-l-2 border-orange-500/40 pl-3 my-2 text-sm text-slate-400 italic">
          {trimmed.split("\n").map((line, li) => <p key={li}>{line.replace(/^> /, "")}</p>)}
        </blockquote>
      );
    }
    if (trimmed.match(/^[-\d]/m)) {
      const items = trimmed.split("\n").filter(Boolean);
      const isNumbered = trimmed.match(/^\d/);
      return (
        <ul key={i} className={`space-y-1 my-2 ${isNumbered ? "list-decimal" : "list-disc"} list-inside`}>
          {items.map((item, ii) => {
            const parts = item.replace(/^[-\d.\s]+/, "").split(/(\*\*[^*]+\*\*)/);
            return (
              <li key={ii} className="text-sm text-slate-300">
                {parts.map((part, pi) => {
                  if (part.startsWith("**") && part.endsWith("**")) {
                    return <span key={pi} className="font-bold text-white">{part.slice(2, -2)}</span>;
                  }
                  return <span key={pi}>{part}</span>;
                })}
              </li>
            );
          })}
        </ul>
      );
    }
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
export default function NewsArticlePage() {
  const params = useParams();
  const articleId = Number(params.id);
  const article = ARTICLES.find((a) => a.id === articleId);
  const [bookmarked, setBookmarked] = useState(false);

  if (!article) {
    return (
      <div className="min-h-screen px-4 py-6 flex flex-col items-center justify-center gap-4">
        <Newspaper className="w-12 h-12 text-slate-600" />
        <p className="text-sm text-slate-400">Không tìm thấy bài viết</p>
        <Link href="/news" className="text-sm text-orange-500 hover:underline">← Quay lại News</Link>
      </div>
    );
  }

  const related = ARTICLES.filter((a) => a.category === article.category && a.id !== article.id).slice(0, 2);

  return (
    <div className="min-h-screen px-4 py-6 max-w-2xl mx-auto">
      <Link href="/news" className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-orange-500 transition-colors mb-4">
        <ChevronLeft className="w-4 h-4" />
        News
      </Link>

      {/* Header */}
      <div className="rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 p-5 mb-4 flex items-center justify-center text-6xl h-32">
        {article.thumbnail}
      </div>

      <div className="flex items-center gap-2 mb-2">
        <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wide border ${CATEGORY_COLORS[article.category]}`}>
          {article.category}
        </span>
        <span className="flex items-center gap-1 text-[10px] text-slate-500">
          <Calendar className="w-3 h-3" />
          {article.date}
        </span>
        <span className="flex items-center gap-1 text-[10px] text-slate-500">
          <Clock className="w-3 h-3" />
          {article.readTime}
        </span>
      </div>

      <h1 className="text-xl font-bold leading-tight mb-3">{article.title}</h1>
      <p className="text-sm text-slate-400 leading-relaxed mb-4">{article.excerpt}</p>

      {/* Content */}
      <article className="px-1">
        {renderContent(article.fullContent)}
      </article>

      {/* Source */}
      {article.source && (
        <div className="mt-4 text-[10px] text-slate-600">
          Nguồn: {article.source}
        </div>
      )}

      {/* Tự động dịch notice */}
      <div className="mt-4 flex items-center gap-2 p-2.5 rounded-xl bg-blue-500/5 border border-blue-500/10">
        <Globe className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />
        <p className="text-[10px] text-slate-400">
          Nội dung tự động dịch theo ngôn ngữ của bạn
        </p>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-around mt-6 pt-4 border-t border-white/10">
        <button
          onClick={() => setBookmarked(!bookmarked)}
          className={`flex flex-col items-center gap-1 ${bookmarked ? "text-orange-500" : "text-slate-500"} hover:text-orange-400 transition-colors`}
        >
          {bookmarked ? <BookmarkCheck className="w-5 h-5" /> : <Bookmark className="w-5 h-5" />}
          <span className="text-[10px]">{bookmarked ? "Đã lưu" : "Lưu"}</span>
        </button>
        <button
          onClick={() => navigator.share ? navigator.share({ title: article.title }) : navigator.clipboard.writeText(window.location.href)}
          className="flex flex-col items-center gap-1 text-slate-500 hover:text-orange-400 transition-colors"
        >
          <Share2 className="w-5 h-5" />
          <span className="text-[10px]">Chia sẻ</span>
        </button>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <div className="mt-8">
          <h2 className="text-sm font-bold uppercase tracking-wide text-slate-300 mb-3">Bài viết liên quan</h2>
          <div className="space-y-2">
            {related.map((r) => (
              <Link key={r.id} href={`/news/${r.id}`} className="flex items-center gap-3 p-3 rounded-xl glass hover:border-orange-500/20 transition-all">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-xl">{r.thumbnail}</div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm truncate">{r.title}</h3>
                  <p className="text-[10px] text-slate-500">{r.date} · {r.readTime}</p>
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
