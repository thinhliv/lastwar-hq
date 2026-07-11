const fs = require('fs');
const path = require('path');

const baseDir = 'F:\\5. LASTWAR\\apps\\web\\src';

// File-specific replacements (Unicode-safe)
const replacements = [
  // Tools page
  ['label: "Maps"', 'label: "Bản đồ"'],
  ['label: "Calculators"', 'label: "Máy tính"'],
  ['label: "Guides"', 'label: "Hướng dẫn"'],
  ['label: "Server Stats"', 'label: "Thống kê Server"'],
  ['label: "Events"', 'label: "Sự kiện"'],
  ['label: "Clan Finder"', 'label: "Tìm Clan"'],
  ['label: "Advanced Tools"', 'label: "Công cụ nâng cao"'],
  ['label: "Hero Tier List"', 'label: "Bảng xếp hạng Hero"'],
  ['label: "Alliances"', 'label: "Alliance"'],
  ['>Soon<', '>Sắp ra mắt<'],
  ['Calculators, Maps, Guides and more', 'Máy tính, Bản đồ, Hướng dẫn và nhiều hơn nữa'],
  ['More tools coming', 'Đang phát triển thêm công cụ mới'],
  
  // Calculators page
  ['label: "Food"', 'label: "Thực phẩm"'],
  ['label: "Oil"', 'label: "Dầu mỏ"'],
  
  // Maps page  
  ['alliance: "Alliance Territory"', 'alliance: "Lãnh thổ Alliance"'],
  ['neutral: "Neutral Zone"', 'neutral: "Khu trung lập"'],
  ['fortress: "Fortress"', 'fortress: "Pháo đài"'],
  ['capital: "Capital"', 'capital: "Thủ đô"'],
  ['resource: "Resource Zone"', 'resource: "Khu tài nguyên"'],
  
  // CommandPalette
  ['Tools', 'Công cụ'],
  ['keywords: "boss', 'keywords: "boss'],
];

// Process specific files with specific replacements
const fileReplacements = {
  'app/tools/page.tsx': [
    ['label: "Maps"', 'label: "Bản đồ"'],
    ['label: "Calculators"', 'label: "Máy tính"'],
    ['label: "Guides"', 'label: "Hướng dẫn"'],
    ['label: "Server Stats"', 'label: "Thống kê Server"'],
    ['label: "Events"', 'label: "Sự kiện"'],
    ['label: "Clan Finder"', 'label: "Tìm Clan"'],
    ['label: "Advanced Tools"', 'label: "Công cụ nâng cao"'],
    ['label: "Hero Tier List"', 'label: "Bảng xếp hạng Hero"'],
    ['label: "Alliances"', 'label: "Alliance"'],
    ['>Soon<', '>Sắp ra mắt<'],
    ['Calculators, Maps, Guides and more', 'Máy tính, Bản đồ, Hướng dẫn và nhiều hơn nữa'],
    ['More tools coming', 'Đang phát triển thêm công cụ mới'],
  ],
  'app/tools/calculators/page.tsx': [
    ['label: "Food"', 'label: "Thực phẩm"'],
    ['label: "Oil"', 'label: "Dầu mỏ"'],
  ],
  'app/tools/maps/page.tsx': [
    ['Alliance Territory', 'Lãnh thổ Alliance'],
    ['Neutral Zone', 'Khu trung lập'],
    ['Fortress', 'Pháo đài'],
    ['Capital', 'Thủ đô'],
    ['Resource Zone', 'Khu tài nguyên'],
    ['Season Map', 'Bản đồ mùa giải'],
    ['Zoom In', 'Phóng to'],
    ['Zoom Out', 'Thu nhỏ'],
    ['Reset View', 'Đặt lại'],
    ['Legend', 'Chú thích'],
    ['Zone Info', 'Thông tin khu vực'],
    ['Select Zone', 'Chọn khu vực'],
  ],
  'components/CommandPalette.tsx': [
    ['>Tools<', '>Công cụ<'],
    ['>Guides<', '>Hướng dẫn<'],
    ['>News<', '>Tin tức<'],
    ['>Profile<', '>Hồ sơ<'],
    ['>Settings<', '>Cài đặt<'],
    ['>Chat<', '>Chat<'],
    ['Quick Navigation', 'Điều hướng nhanh'],
    ['Search pages...', 'Tìm kiếm trang...'],
    ['No results found', 'Không tìm thấy kết quả'],
  ],
};

let totalChanges = 0;

for (const [relPath, pairs] of Object.entries(fileReplacements)) {
  const fullPath = path.join(baseDir, relPath);
  if (!fs.existsSync(fullPath)) {
    console.log(`SKIP (not found): ${relPath}`);
    continue;
  }
  
  let content = fs.readFileSync(fullPath, 'utf8');
  let changes = 0;
  
  for (const [from, to] of pairs) {
    if (content.includes(from)) {
      content = content.split(from).join(to);
      changes++;
    }
  }
  
  if (changes > 0) {
    fs.writeFileSync(fullPath, content, 'utf8');
    totalChanges += changes;
    console.log(`✅ ${relPath} (${changes} thay đổi)`);
  } else {
    console.log(`⏭️ ${relPath} (không có thay đổi)`);
  }
}

console.log(`\nTổng: ${totalChanges} thay đổi`);
