const fs = require('fs');
const path = require('path');

const baseDir = 'F:\\5. LASTWAR\\apps\\web\\src';

// Scan for likely English UI text in JSX
const englishPatterns = [
  // Common English words in UI context (between > and <)
  />[A-Z][a-z]+[^<]{3,}</g,
  // Placeholder attributes
  /placeholder="[^"]*[A-Za-z]{4,}[^"]*"/g,
  // Label text after >
  />\s*(Select|Enter|Choose|Click|Add|Remove|Delete|Edit|Update|Create|Save|Cancel|Close|Back|Next|Submit|Share|Join|Leave|Send|Search|Filter|Sort|Reset|Login|Logout|Register|Welcome|Loading|Error|Success|Warning|Info|Settings|Profile|Dashboard|Home|About|Help)\s*</g,
];

function scan(dir) {
  const results = [];
  function walk(d) {
    for (const entry of fs.readdirSync(d, { withFileTypes: true })) {
      const full = path.join(d, entry.name);
      if (entry.isDirectory()) {
        if (entry.name === 'node_modules' || entry.name === '.next') continue;
        walk(full);
      } else if (entry.name.endsWith('.tsx') || entry.name.endsWith('.ts')) {
        const content = fs.readFileSync(full, 'utf8');
        const lines = content.split('\n');
        lines.forEach((line, i) => {
          // Skip import lines, comments, code
          if (line.match(/^\s*(import|export|\/\/|\/\*|\*|const|let|var|function|type|interface|class|if|else|for|while|return)\s/)) return;
          if (line.match(/^(import|export|from|require)/)) return;
          
          // Find JSX text content
          const jsxText = line.match(/>\s*([A-Z][a-zA-Z\s,.!?:"']+)\s*</);
          if (jsxText) {
            const text = jsxText[1].trim();
            // Skip game terms
            if (text.match(/^(Hero|Alliance|APC|Troop|Boss|Season|Server|Speedup|Food|Oil|Iron|Steel|Stage|Ammo|Level|VIP|Live|LIVE|New|PvP|APC|SSR|SR|S\+|S|A\+|A|B\+|B|C\+|C|T\d+|Common|Rare|Epic|Legendary|UPDATE|EVENT|MAINT)$/)) return;
            if (text.length < 3) return;
            // Skip if mostly Vietnamese
            if (text.match(/[ăâêôơưđàáạảãâầấậẩẫèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹ]/)) return;
            results.push({ file: full.replace(baseDir, ''), line: i + 1, text });
          }
          
          // Find placeholder English
          const ph = line.match(/placeholder="([A-Z][a-zA-Z\s]+)"/);
          if (ph) {
            const text = ph[1].trim();
            if (text.match(/[ăâêôơưđàáạảãâầấậẩẫèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹ]/)) return;
            results.push({ file: full.replace(baseDir, ''), line: i + 1, text: `placeholder: ${text}` });
          }
        });
      }
    }
  }
  walk(dir);
  return results;
}

const found = scan(baseDir);
const unique = {};
for (const f of found) {
  const key = `${f.file}:${f.line}`;
  if (!unique[key]) unique[key] = f;
}

console.log(`Found ${Object.keys(unique).length} English text instances:\n`);
for (const f of Object.values(unique)) {
  console.log(`${f.file}:${f.line} → "${f.text}"`);
}
