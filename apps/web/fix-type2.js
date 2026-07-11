const fs = require('fs');
let content = fs.readFileSync('src/app/admin/page.tsx', 'utf8');

content = content.replace(
  'const [feedbacks, setFeedbacks] = useState([]);',
  'const [feedbacks, setFeedbacks] = useState<any[]>([]);'
);

fs.writeFileSync('src/app/admin/page.tsx', content, 'utf8');
console.log('Fixed');
