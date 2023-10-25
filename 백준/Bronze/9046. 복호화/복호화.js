const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "test.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const N = +input.shift();

for (let i = 0; i < N; i++) {
  const word = input[i].split("");

  const map = new Map();

  for (const v of word) {
    if (v === " ") continue;
    if (map.has(v)) {
      map.set(v, map.get(v) + 1);
    } else {
      map.set(v, 1);
    }
  }

  let maxChar = "?"; // Initialize with a question mark.
  let maxCount = 0;

  for (const [char, count] of map) {
    if (count > maxCount) {
      maxChar = char;
      maxCount = count;
    } else if (count === maxCount) {
      maxChar = "?"; // Multiple characters with the same highest frequency.
    }
  }

  console.log(maxChar);
}
