const fs = require('fs');
let content = fs.readFileSync('src/app/admin/page.tsx', 'utf8');

content = content.replace(
  'function deleteFeedback(id) {',
  'function deleteFeedback(id: number) {'
);

fs.writeFileSync('src/app/admin/page.tsx', content, 'utf8');
console.log('Fixed type');
