const fs = require("fs");
const input = fs
  .readFileSync("dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((v) =>
    v
      .split(" ")
      .map(Number)
      .sort((a, b) => b - a)
  );
const [H, W] = input[0];
const [N] = input[1];
const stickers = input.slice(2).sort((a, b) => b[0] * b[1] - a[0] * a[0]);

let answer = 0;

for (let i = 0; i < stickers.length - 1; i++) {
  for (let j = i + 1; j < stickers.length; j++) {
    if (check(stickers[i], stickers[j])) {
      const S = stickers[i][0] * stickers[i][1] + stickers[j][0] * stickers[j][1];
      if (answer < S) answer = S;
    }
  }
}

console.log(answer);

function check(arr1, arr2) {
  const [ax, ay] = arr1; //큰거 가로
  const [cx, cy] = arr2; // 작은 거 가로
  const [by, bx] = arr1; // 큰거 세로
  const [dy, dx] = arr2; // 작은 거 세로

  //가로로 붙이기
  if (ax + cx <= H && Math.max(ay, cy) <= W) {
    return true;
  }
  if (ax + dx <= H && Math.max(ay, dy) <= W) {
    return true;
  }
  if (bx + cx <= H && Math.max(by, cy) <= W) {
    return true;
  }
  if (bx + dx <= H && Math.max(by, dy) <= W) {
    return true;
  }

  // 세로로 붙이기
  if (ax + cx <= W && Math.max(ay, cy) <= H) {
    return true;
  }
  if (ax + dx <= W && Math.max(ay, dy) <= H) {
    return true;
  }
  if (bx + cx <= W && Math.max(by, cy) <= H) {
    return true;
  }
  if (bx + dx <= W && Math.max(by, dy) <= H) {
    return true;
  }

  return false;
}
