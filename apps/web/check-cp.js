const fs = require('fs');
const c = fs.readFileSync('src/components/CommandPalette.tsx', 'utf8');
const lines = c.split('\n');
lines.forEach((l, i) => {
  const m = l.match(/label:\s*"([^"]+)"/);
  if (m) console.log((i+1) + ': ' + m[1]);
  const cat = l.match(/category:\s*"([^"]+)"/);
  if (cat) console.log((i+1) + ' [cat]: ' + cat[1]);
});
