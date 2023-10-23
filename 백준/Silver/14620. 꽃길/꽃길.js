const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "test.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");
const N = +input.shift();
const gardenArr = input.map((v) => v.split(" ").map(Number));
const visited = Array.from({ length: N }, () => Array.from({ length: N }, () => false));

let answer = Infinity;
const dir = [
  [0, 1], // 우
  [0, -1], // 좌
  [1, 0], // 상
  [-1, 0], // 하
];

function dfs(cnt, cost) {
  if (cnt === 3) {
    answer = Math.min(answer, cost);
    return;
  }

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (check(i, j)) {
        updateVisited(i, j, true);
        dfs(cnt + 1, cost + sum(i, j));
        updateVisited(i, j, false);
      }
    }
  }
}
function sum(x, y) {
  let sum = gardenArr[x][y];
  for (let i = 0; i < 4; i++) {
    const curX = x + dir[i][0];
    const curY = y + dir[i][1];
    sum += gardenArr[curX][curY];
  }
  return sum;
}

function check(x, y) {
  if (visited[x][y]) {
    return false;
  }
  for (let i = 0; i < 4; i++) {
    const curX = x + dir[i][0];
    const curY = y + dir[i][1];

    if (curX < 0 || curX >= N || curY < 0 || curY >= N || visited[curX][curY]) {
      return false;
    }
  }

  return true;
}
function updateVisited(x, y, value) {
  visited[x][y] = value;

  for (let i = 0; i < 4; i++) {
    const curX = x + dir[i][0];
    const curY = y + dir[i][1];
    visited[curX][curY] = value;
  }
}

dfs(0, 0);
console.log(answer);
