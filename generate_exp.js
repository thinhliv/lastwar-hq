const fs = require('fs');
const exp = [0];
let current = 0;
for (let i = 1; i <= 175; i++) {
  if (i <= 5) {
    current += 2000000;
  } else if (i <= 100) {
    current += 5000000;
  } else {
    current += 15000000;
  }
  exp.push(current);
}
fs.writeFileSync('apps/web/src/data/hero-exp.json', JSON.stringify(exp, null, 2));
console.log('Done!');
