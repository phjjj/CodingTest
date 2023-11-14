const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "test.txt";
const input = fs.readFileSync(filePath, "utf8").trim().split("\n");
const T = +input.shift();

const dir = [
  [1, 0],
  [-1, 0],
  [0, -1],
  [0, 1],
];

function solution(x, y, map) {
  // 불과 상근이의 위치 정보 초기화
  let fireQueue = [];
  let fireMap = Array.from({ length: x }, () => Array.from({ length: y }, () => 0));
  let sangQueue = [];
  let sangMap = Array.from({ length: x }, () => Array.from({ length: y }, () => 0));

  // 불과 상근이의 초기 위치 큐 업데이트
  for (let i = 0; i < x; i++) {
    for (let j = 0; j < y; j++) {
      if (map[i][j] === "*") {
        fireQueue.push([i, j, 0]);
        fireMap[i][j] = 1;
      }
      if (map[i][j] === "@") {
        sangQueue.push([i, j, 0]);
        sangMap[i][j] = 1;
      }
    }
  }

  // 불의 위치 업데이트
  let fireIdx = 0;
  while (fireIdx < fireQueue.length) {
    const [curX, curY, t] = fireQueue[fireIdx];
    for (let i = 0; i < 4; i++) {
      const moveX = curX + dir[i][0];
      const moveY = curY + dir[i][1];

      if (moveX < 0 || moveX >= x || moveY < 0 || moveY >= y) continue;
      if (fireMap[moveX][moveY] >= 1 || map[moveX][moveY] === "#") continue;

      fireQueue.push([moveX, moveY, t + 1]);
      fireMap[moveX][moveY] = t + 1;
    }
    fireIdx++;
  }

  // 상근이의 위치 업데이트
  let sangIdx = 0;
  while (sangIdx < sangQueue.length) {
    const [curX, curY, t] = sangQueue[sangIdx];
    for (let i = 0; i < 4; i++) {
      const moveX = curX + dir[i][0];
      const moveY = curY + dir[i][1];

      if (moveX < 0 || moveX >= x || moveY < 0 || moveY >= y) {
        console.log(t + 1);
        return;
      }


      if (
        sangMap[moveX][moveY] >= 1 ||
        map[moveX][moveY] === "#" ||
        (fireMap[moveX][moveY] !== 0 && fireMap[moveX][moveY] <= t + 1)
      ) {
        continue;
      }

      sangQueue.push([moveX, moveY, t + 1]);
      sangMap[moveX][moveY] = t + 1;
    }
    sangIdx++;
  }

  console.log("IMPOSSIBLE");
}

// 각 테스트 케이스에 대해 solution 함수 호출
for (let i = 0; i < T; i++) {
  const [w, h] = input.shift().split(" ").map(Number);
  let arr = [];
  for (let j = 0; j < h; j++) {
    arr.push(input.shift());
  }

  solution(h, w, arr);
}
