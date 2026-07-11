const fs = require('fs');
let content = fs.readFileSync('src/app/admin/page.tsx', 'utf8');

content = content.replace(
  'const typeLabels = {',
  'const typeLabels: Record<string, { label: string; icon: string; color: string }> = {'
);

fs.writeFileSync('src/app/admin/page.tsx', content, 'utf8');
console.log('Fixed');
