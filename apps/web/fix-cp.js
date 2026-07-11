const fs = require('fs');

const replacements = [
  ['label: "Calculators"', 'label: "Máy tính"'],
  ['label: "Advanced Tools"', 'label: "Công cụ nâng cao"'],
  ['label: "Hero Tier List"', 'label: "Bảng xếp hạng Hero"'],
  ['label: "Season Maps"', 'label: "Bản đồ mùa giải"'],
  ['label: "Events"', 'label: "Sự kiện"'],
  ['label: "Ammo Bonanza Calc"', 'label: "Máy tính Ammo Bonanza"'],
  ['label: "Desert Treasure Calc"', 'label: "Máy tính Desert Treasure"'],
  ['label: "Resource Planner"', 'label: "Lập kế hoạch tài nguyên"'],
  ['label: "Building Planner"', 'label: "Lập kế hoạch nâng cấp"'],
  ['label: "Server Stats"', 'label: "Thống kê Server"'],
  ['label: "Clan Finder"', 'label: "Tìm Clan"'],
  ['label: "Alliances"', 'label: "Alliance"'],
  ['label: "Strategy Guides"', 'label: "Hướng dẫn chiến thuật"'],
  ['label: "News & Updates"', 'label: "Tin tức & Cập nhật"'],
  ['label: "Profile"', 'label: "Hồ sơ"'],
  ['label: "Settings"', 'label: "Cài đặt"'],
  ['label: "Home"', 'label: "Trang chủ"'],
  ['category: "Tools"', 'category: "Công cụ"'],
  ['category: "Content"', 'category: "Nội dung"'],
  ['category: "Navigate"', 'category: "Điều hướng"'],
  ['Quick Navigation', 'Điều hướng nhanh'],
  ['Search pages...', 'Tìm kiếm trang...'],
];

let content = fs.readFileSync('src/components/CommandPalette.tsx', 'utf8');
let count = 0;
for (const [from, to] of replacements) {
  if (content.includes(from)) {
    content = content.split(from).join(to);
    count++;
  }
}
fs.writeFileSync('src/components/CommandPalette.tsx', content, 'utf8');
console.log(`CommandPalette: ${count} thay đổi`);
