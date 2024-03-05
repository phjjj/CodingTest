const fs = require("fs");

const filePath = process.platform === "linux" ? "/dev/stdin" : "test.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const [N, M, K] = input.shift().split(" ");

const board = Array.from(Array(parseInt(N)), () => Array(parseInt(M)).fill(0));

for (let i = 0; i < K; i++) {
  const [R, C] = input.shift().split(" ").map(Number);
  let sticker = [];
  for (let j = 0; j < R; j++) {
    sticker.push(input.shift().split(" ").map(Number));
  }

  for (let rot = 0; rot < 4; rot++) {
    if (check(sticker)) break;
    sticker = rotate(sticker);
  }
}

let count = 0;
for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    if (board[i][j]) count++;
  }
}
console.log(count);

function check(sticker) {
  const R = sticker.length;
  const C = sticker[0].length;
  for (let i = 0; i <= N - R; i++) {
    for (let j = 0; j <= M - C; j++) {
      if (isFitted(i, j, sticker)) {
        cover(i, j, sticker);
        return true;
      }
    }
  }

  return false;
}

function isFitted(x, y, sticker) {
  const R = sticker.length;
  const C = sticker[0].length;

  for (let i = 0; i < R; i++) {
    for (let j = 0; j < C; j++) {
      if (sticker[i][j] && board[x + i][y + j]) return false;
    }
  }

  return true;
}

function cover(x, y, sticker) {
  const R = sticker.length;
  const C = sticker[0].length;

  for (let i = 0; i < R; i++) {
    for (let j = 0; j < C; j++) {
      board[x + i][y + j] |= sticker[i][j];
    }
  }
}

function rotate(sticker) {
  const R = sticker.length;
  const C = sticker[0].length;
  const rotated = Array.from(Array(C), () => Array(R));

  for (let i = 0; i < C; i++) {
    for (let j = 0; j < R; j++) {
      const ni = R - 1 - j;
      const nj = i;
      rotated[i][j] = sticker[ni][nj];
    }
  }

  return rotated;
}
