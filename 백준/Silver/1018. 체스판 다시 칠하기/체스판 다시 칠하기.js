const fs = require("fs");
const input = fs
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "test.txt")
  .toString()
  .trim()
  .split("\n");

let white = [
  "WBWBWBWB",
  "BWBWBWBW",
  "WBWBWBWB",
  "BWBWBWBW",
  "WBWBWBWB",
  "BWBWBWBW",
  "WBWBWBWB",
  "BWBWBWBW",
];
let black = [
  "BWBWBWBW",
  "WBWBWBWB",
  "BWBWBWBW",
  "WBWBWBWB",
  "BWBWBWBW",
  "WBWBWBWB",
  "BWBWBWBW",
  "WBWBWBWB",
];

const height = +input[0].split(" ")[0];
const width = +input[0].split(" ")[1];
let chess = [];

for (let i = 1; i <= height; i++) {
  chess.push(input[i]);
}

let arr = [];

function check(x, y) {
  let whiteCnt = 0;
  let blackCnt = 0;

  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      if (white[i][j] !== chess[x + i][y + j]) {
        whiteCnt++;
      }
      if (black[i][j] !== chess[x + i][y + j]) {
        blackCnt++;
      }
    }
  }
  arr.push(whiteCnt > blackCnt ? blackCnt : whiteCnt);
}

for (let i = 0; i <= height - 8; i++) {
  for (let j = 0; j <= width - 8; j++) {
    check(i, j);
  }
}

console.log(Math.min(...arr));
