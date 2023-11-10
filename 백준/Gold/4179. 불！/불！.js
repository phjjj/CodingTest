const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "test.txt";
const input = fs.readFileSync(filePath, "utf8").trim().split("\n");
const [R, C] = input.shift().split(" ").map(Number);

const map = input.map((v) => v.split(""));
// 불
let fireQueue = [];
let fireMap = input.map((v) => v.split(""));
// 지훈
let jihunQueue = [];
let jihunMap = input.map((v) => v.split(""));

const dir = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];

for (let i = 0; i < input.length; i++) {
  for (let j = 0; j < input[0].length; j++) {
    if (map[i][j] === "F") {
      fireQueue.push([i, j, 0]);
      fireMap[i][j] = 0;
    }
    if (map[i][j] === "J") {
      jihunQueue.push([i, j, 0]);
      jihunMap[i][j] = 0;
    }
  }
}

while (fireQueue.length) {
  const [x, y, t] = fireQueue.shift();
  for (let i = 0; i < 4; i++) {
    const curX = x + dir[i][0];
    const curY = y + dir[i][1];

    if (curX < 0 || curX >= R || curY < 0 || curY >= C) continue;
    if (fireMap[curX][curY] >= 0 || map[curX][curY] === "#") continue;
    fireMap[curX][curY] = t + 1;
    fireQueue.push([curX, curY, t + 1]);
  }
}

while (jihunQueue.length) {
  const [x, y, t] = jihunQueue.shift();
  for (let i = 0; i < 4; i++) {
    const curX = x + dir[i][0];
    const curY = y + dir[i][1];

    if (curX < 0 || curX >= R || curY < 0 || curY >= C) {
      console.log(t + 1);
      return;
    }

    if (jihunMap[curX][curY] >= 0 || map[curX][curY] === "#" || fireMap[curX][curY] <= t + 1) continue;
    jihunMap[curX][curY] = t + 1;
    jihunQueue.push([curX, curY, t + 1]);
  }
}

console.log("IMPOSSIBLE");
