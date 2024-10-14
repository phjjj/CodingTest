const filePath = process.platform === "linux" ? "/dev/stdin" : "test.txt";
const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

const [R, C] = input.shift().split(" ").map(Number);
const map = input;

const dir = [[1, 0], [-1, 0], [0, 1], [0, -1]];

// 불의 이동 경로
let fireQueue = [];
for (let i = 0; i < R; i++) {
  for (let j = 0; j < C; j++) {
    if (map[i][j] === "F") {
      fireQueue.push([i, j, 0]);
    }
  }
}

// 불 위치 구하기
const fireVisited = Array.from({ length: R }, () =>
  Array.from({ length: C }, () => false)
);
// 불의 위치 저장
const fireMap = Array.from({ length: R }, () =>
  Array.from({ length: C }, () => Infinity) // 불이 없는 곳은 최대값으로 설정
);

while (fireQueue.length) {
  let [curX, curY, v] = fireQueue.shift();

  for (let i = 0; i < dir.length; i++) {
    const moveX = curX + dir[i][0];
    const moveY = curY + dir[i][1];

    if (
      moveX >= 0 &&
      moveY >= 0 &&
      moveX < R &&
      moveY < C &&
      map[moveX][moveY] === "."
    ) {
      if (!fireVisited[moveX][moveY]) {
        fireMap[moveX][moveY] = v + 1;
        fireQueue.push([moveX, moveY, v + 1]);
        fireVisited[moveX][moveY] = true;
      }
    }
  }
}

// 지훈이 이동
let JihunQueue = [];
const JihunVisited = Array.from({ length: R }, () =>
  Array.from({ length: C }, () => false)
);

for (let i = 0; i < R; i++) {
  for (let j = 0; j < C; j++) {
    if (map[i][j] === "J") {
      JihunQueue.push([i, j, 0]);
      JihunVisited[i][j] = true; // 시작점도 방문 처리
    }
  }
}

jihunRoute();

function jihunRoute() {
  while (JihunQueue.length) {
    let [curX, curY, v] = JihunQueue.shift();
    
    // 지훈이가 가장자리에 도달했을 때 탈출 성공
    if (curX === 0 || curY === 0 || curX === R - 1 || curY === C - 1) {
      return console.log(v + 1);
    }

    for (let i = 0; i < dir.length; i++) {
      const moveX = curX + dir[i][0];
      const moveY = curY + dir[i][1];

      if (
        moveX >= 0 &&
        moveY >= 0 &&
        moveX < R &&
        moveY < C &&
        map[moveX][moveY] === "."
      ) {
        if (
          !JihunVisited[moveX][moveY] &&
          (fireMap[moveX][moveY] > v + 1 || fireMap[moveX][moveY] === Infinity)
        ) {
          JihunQueue.push([moveX, moveY, v + 1]);
          JihunVisited[moveX][moveY] = true;
        }
      }
    }
  }
  return console.log("IMPOSSIBLE");
}
