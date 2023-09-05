const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "test.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

// 크기 N
const N = +input.shift();
// 맵
const map = input.map((v) => v.split(""));

// 방문
const visited = Array.from({ length: N }, () => Array(N).fill(false));
// 상하좌우
let dir = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
];
// 정답
let answer = [];

function bfs(i, j) {
  let queue = [[i, j]];
  while (queue.length) {
    const [x, y] = queue.shift();
    for (let i = 0; i < 4; i++) {
      const posX = x + dir[i][0];
      const posY = y + dir[i][1];

      if (posX >= 0 && posY >= 0 && posX < N && posY < N && !visited[posX][posY] && map[x][y] === map[posX][posY]) {
        visited[posX][posY] = true;
        queue.push([posX, posY]);
      }
    }
  }
}

// 정상인
let cnt = 0;

for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    if (!visited[i][j]) {
      visited[i][j] = true;
      bfs(i, j);
      cnt++;
    }
  }
}
// 방문 초기화
for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    visited[i][j] = false;
  }
}
// 색약 맵

for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    if (map[i][j] === "R") map[i][j] = "G";
  }
}

// 색약
let disCnt = 0;

for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    if (!visited[i][j]) {
      visited[i][j] = true;
      bfs(i, j);
      disCnt++;
    }
  }
}
console.log(cnt, disCnt);
