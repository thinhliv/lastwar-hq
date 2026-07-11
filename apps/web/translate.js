const fs = require('fs');
const path = require('path');

const baseDir = 'F:\\5. LASTWAR\\apps\\web\\src';

const files = [
  'app/admin/page.tsx',
  'app/admin/login/page.tsx',
  'app/chat/page.tsx',
  'app/guides/page.tsx',
  'app/guides/[id]/page.tsx',
  'app/news/page.tsx',
  'app/news/[id]/page.tsx',
  'app/profile/page.tsx',
  'app/settings/page.tsx',
  'app/tools/alliance/page.tsx',
  'app/tools/calculators/advanced/page.tsx',
  'app/tools/calculators/building-planner/page.tsx',
  'app/tools/calculators/page.tsx',
  'app/tools/calculators/resource-planner/page.tsx',
  'app/tools/clan-finder/page.tsx',
  'app/tools/events/ammo-bonanza/page.tsx',
  'app/tools/events/desert-treasure/page.tsx',
  'app/tools/events/page.tsx',
  'app/tools/hero-tier/page.tsx',
  'app/tools/maps/page.tsx',
  'app/tools/server-stats/page.tsx',
  'app/tools/page.tsx',
  'app/page.tsx',
  'components/CommandPalette.tsx',
  'components/SearchTrigger.tsx',
  'components/VisitorCounter.tsx',
];

const replacements = [
  // Common
  ['Coming Soon', 'Sắp ra mắt'],
  ['View All', 'Xem tất cả'],
  ['View Site', 'Xem trang'],
  ['Sign in to join the conversation', 'Đăng nhập để tham gia chat'],
  ['Commander', 'Chỉ huy'],
  
  // Tools
  ['Season Maps', 'Bản đồ mùa giải'],
  ['Server Stats', 'Thống kê Server'],
  ['Clan Finder', 'Tìm Clan'],
  ['Hero Tier List', 'Bảng xếp hạng Hero'],
  ['Advanced Tools', 'Công cụ nâng cao'],
  ['Speedup, Battle Sim, Build Planner', 'Speedup, Chiến đấu, Xây dựng'],
  ['Boss, Resource, Troop, Speedup', 'Boss, Tài nguyên, Troop, Speedup'],
  ['Power ranking, alliance ranking', 'Xếp hạng sức mạnh, alliance'],
  ['Countdown timer', 'Đếm ngược sự kiện'],
  
  // Admin
  ['Admin Control Panel', 'Bảng điều khiển Admin'],
  ['Total Visitors', 'Tổng khách'],
  ['Online Now', 'Đang online'],
  ['Page Views', 'Lượt xem trang'],
  ['Today Visitors', 'Khách hôm nay'],
  ['Top Pages', 'Trang xem nhiều'],
  ['Total Users', 'Tổng người dùng'],
  ['Bounce Rate', 'Tỉ lệ thoát'],
  ['Admin Email', 'Email quản trị'],
  
  // Auth
  ['Sign In', 'Đăng nhập'],
  ['Sign Up', 'Đăng ký'],
  
  // News/Guides
  ['Read More', 'Đọc thêm'],
  ['Related Articles', 'Bài viết liên quan'],
  ['Strategy Guides', 'Hướng dẫn chiến thuật'],
  ['Ready to dominate?', 'Sẵn sàng thống trị?'],
  ['Featured Guides', 'Hướng dẫn nổi bật'],
  ['Latest News', 'Tin tức mới nhất'],
  ['All News', 'Tất cả tin tức'],
  ['All Guides', 'Tất cả hướng dẫn'],
  ['min read', 'phút đọc'],
  
  // Calculators
  ['Boss Calculator', 'Máy tính Boss'],
  ['Resource Calculator', 'Máy tính tài nguyên'],
  ['Troop Calculator', 'Máy tính Troop'],
  ['Hero Calculator', 'Máy tính Hero'],
  ['Speedup Calculator', 'Máy tính Speedup'],
  ['Battle Simulator', 'Mô phỏng chiến đấu'],
  ['Build Planner', 'Lên kế hoạch xây dựng'],
  ['Resource Planner', 'Lập kế hoạch tài nguyên'],
  ['Building Planner', 'Lập kế hoạch nâng cấp'],
  
  // Rankings
  ['Power Ranking', 'Xếp hạng sức mạnh'],
  ['Alliance Ranking', 'Xếp hạng Alliance'],
  ['Server Status', 'Trạng thái Server'],
  
  // Maps
  ['Zoom In', 'Phóng to'],
  ['Zoom Out', 'Thu nhỏ'],
  ['Reset View', 'Đặt lại'],
  ['Zone Info', 'Thông tin khu vực'],
  ['Select Zone', 'Chọn khu vực'],
  
  // Chat
  ['Type a message...', 'Nhập tin nhắn...'],
  ['Type your message...', 'Nhập tin nhắn...'],
  ['Send Message', 'Gửi tin nhắn'],
  ['Auto-translate', 'Tự động dịch'],
  
  // Profile/Settings
  ['Dark Mode', 'Chế độ tối'],
  ['Edit Profile', 'Sửa hồ sơ'],
  ['Game Profile', 'Hồ sơ game'],
  ['Save Changes', 'Lưu thay đổi'],
  
  // Misc
  ['Ends in', 'Còn'],
  ['Starts in', 'Bắt đầu sau'],
  ['hour left', 'giờ nữa'],
  ['hours left', 'giờ nữa'],
  ['days left', 'ngày nữa'],
];

let totalChanges = 0;
let updatedFiles = 0;

for (const relPath of files) {
  const fullPath = path.join(baseDir, relPath);
  if (!fs.existsSync(fullPath)) continue;
  
  let content = fs.readFileSync(fullPath, 'utf8');
  let changes = 0;
  
  for (const [from, to] of replacements) {
    if (content.includes(from)) {
      content = content.split(from).join(to);
      changes++;
    }
  }
  
  if (changes > 0) {
    fs.writeFileSync(fullPath, content, 'utf8');
    updatedFiles++;
    totalChanges += changes;
    console.log(`✅ ${relPath} (${changes} thay đổi)`);
  }
}

console.log(`\n总计: ${updatedFiles} file, ${totalChanges} thay đổi`);
