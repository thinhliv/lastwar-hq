const fs = require('fs');
const path = require('path');

const baseDir = 'F:\\5. LASTWAR\\apps\\web\\src';

const targetReplacements = [
  // Admin page
  ['>Views<', '>Lượt xem<'],
  ['>Status<', '>Trạng thái<'],
  ['>Action<', '>Thao tác<'],
  ['>Active<', '>Đang hoạt động<'],
  ['>Banned<', '>Đã khóa<'],
  ['>User<', '>Người dùng<'],
  ['>Role<', '>Vai trò<'],
  ['>Joined<', '>Tham gia<'],
  ['>Domain<', '>Tên miền<'],
  ['Admin Panel', 'Bảng quản trị'],
  
  // Advanced calculators
  ['Attacker Power', 'Sức mạnh tấn công'],
  ['Defender Power', 'Sức mạnh phòng thủ'],
  ['Estimated losses:', 'Thiệt hại ước tính:'],
  ['>Count<', '>Số lượng<'],
  
  // Building planner
  ['Target level', 'Cấp độ mục tiêu'],
  ['Research Lab', 'Phòng nghiên cứu'],
  ['>Warehouse<', '>Nhà kho<'],
  ['>Hospital<', '>Bệnh viện<'],
  
  // Resource planner
  ['APC Tier', 'Cấp APC'],
  ['Train Tier', 'Cấp đào tạo'],
  
  // Ammo bonanza
  ['>Stages<', '>Số màn<'],
  ['Desert Treasure Calculator', 'Máy tính Desert Treasure'],
  ['Ammo Bonanza Calculator', 'Máy tính Ammo Bonanza'],
  
  // Desert treasure
  ['>Tier<', '>Hạng<'],
  ['>Resources<', '>Tài nguyên<'],
  ['>Shards<', '>Mảnh ghép<'],
  
  // Hero tier
  ['Synergy:', 'Kết hợp:'],
  
  // Events page
  ['>Events<', '>Sự kiện<'],
  
  // Profile
  ['H? so game', 'Hồ sơ game'],
  ['H? so', 'Hồ sơ'],
  
  // Settings  
  ['>Discord<', '>Discord<'], // keep brand
  
  // Alliances
  ['>Alliances<', '>Alliance<'],
  
  // Auth
  ['placeholder="Email"', 'placeholder="Email quản trị"'],
];

let totalChanges = 0;

function processFile(relPath) {
  const fullPath = path.join(baseDir, relPath);
  if (!fs.existsSync(fullPath)) return;
  
  let content = fs.readFileSync(fullPath, 'utf8');
  let changes = 0;
  
  for (const [from, to] of targetReplacements) {
    if (content.includes(from)) {
      content = content.split(from).join(to);
      changes++;
    }
  }
  
  if (changes > 0) {
    fs.writeFileSync(fullPath, content, 'utf8');
    totalChanges += changes;
    console.log(`✅ ${relPath} (${changes} thay đổi)`);
  }
}

// Process all tsx files
function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === 'node_modules' || entry.name === '.next') continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full);
    } else if (entry.name.endsWith('.tsx')) {
      processFile(full.replace(baseDir, ''));
    }
  }
}

walk(baseDir);
console.log(`\nTổng: ${totalChanges} thay đổi`);
