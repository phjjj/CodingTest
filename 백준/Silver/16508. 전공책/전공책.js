const fs = require("fs");
const { inflate } = require("zlib");
const filePath = process.platform === "linux" ? "/dev/stdin" : "test.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const word = input.shift();
const N = +input.shift();
const bookArr = input.map((v) => v.split(" "));

let cnt = Array.from({ length: 26 }, () => 0);
let bookCnt = Array.from({ length: 26 }, () => 0);

for (let i = 0; i < word.length; i++) {
  cnt[word.charCodeAt(i) - "A".charCodeAt(0)]++;
}

let min = Infinity;

function dfs(dep, sum) {
  if (dep === N) {
    if (check()) {
      min = Math.min(sum, min);
    }
    return;
  }

  for (let i = 0; i < bookArr[dep][1].length; i++) {
    bookCnt[bookArr[dep][1].charCodeAt(i) - "A".charCodeAt(0)]++;
  }
  dfs(dep + 1, sum + +bookArr[dep][0]);

  for (let i = 0; i < bookArr[dep][1].length; i++) {
    bookCnt[bookArr[dep][1].charCodeAt(i) - "A".charCodeAt(0)]--;
  }
  dfs(dep + 1, sum);
}

function check() {
  for (let i = 0; i < 26; i++) {
    if (cnt[i] > bookCnt[i]) {
      return false;
    }
  }
  return true;
}

dfs(0, 0);
console.log(min === Infinity ? -1 : min);
