const fs = require('fs');
const path = require('path');

const baseDir = 'F:\\5. LASTWAR\\apps\\web\\src';

function checkEncoding(dir) {
  const bad = [];
  function walk(d) {
    for (const entry of fs.readdirSync(d, { withFileTypes: true })) {
      if (entry.name === 'node_modules' || entry.name === '.next') continue;
      const full = path.join(d, entry.name);
      if (entry.isDirectory()) { walk(full); continue; }
      if (!entry.name.endsWith('.tsx') && !entry.name.endsWith('.ts')) continue;
      const buf = fs.readFileSync(full);
      for (let i = 0; i < buf.length; i++) {
        if (buf[i] > 127) {
          // Check if valid UTF-8 sequence
          if ((buf[i] & 0xE0) === 0xC0) {
            if (i + 1 >= buf.length || (buf[i+1] & 0xC0) !== 0x80) {
              bad.push({ file: full.replace(baseDir,''), pos: i });
              break;
            }
            i++;
          } else if ((buf[i] & 0xF0) === 0xE0) {
            if (i + 2 >= buf.length || (buf[i+1] & 0xC0) !== 0x80 || (buf[i+2] & 0xC0) !== 0x80) {
              bad.push({ file: full.replace(baseDir,''), pos: i });
              break;
            }
            i += 2;
          } else if ((buf[i] & 0xF8) === 0xF0) {
            if (i + 3 >= buf.length || (buf[i+1] & 0xC0) !== 0x80 || (buf[i+2] & 0xC0) !== 0x80 || (buf[i+3] & 0xC0) !== 0x80) {
              bad.push({ file: full.replace(baseDir,''), pos: i });
              break;
            }
            i += 3;
          } else if ((buf[i] & 0xC0) === 0x80) {
            // Unexpected continuation byte
            bad.push({ file: full.replace(baseDir,''), pos: i, byte: buf[i] });
            break;
          }
        }
      }
    }
  }
  walk(dir);
  return bad;
}

const bad = checkEncoding(baseDir);
if (bad.length === 0) {
  console.log('All files OK - valid UTF-8');
} else {
  console.log(`Found ${bad.length} files with bad encoding:`);
  for (const b of bad) {
    console.log(`  ${b.file} at byte ${b.pos}`);
  }
}
