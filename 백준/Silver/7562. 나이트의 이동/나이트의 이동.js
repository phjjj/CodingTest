const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "test.txt";
const input = fs.readFileSync(filePath, "utf8").trim().split("\n");
const T = +input.shift();

// 이동 경로
const dir = [
  [-1, -2],
  [-2, -1],
  [-2, 1],
  [-1, 2],
  [1, -2],
  [2, -1],
  [2, 1],
  [1, 2],
];

function solution(L, pos, end) {
  // 방문체크
  const visited = Array.from({ length: L }, () => Array.from({ length: L }, () => false));
  // 현재 위치
  const [posX, posY] = pos.split(" ").map(Number);
  // 도착 위치
  const [endX, endY] = end.split(" ").map(Number);

  let queue = [[posX, posY, 0]];
  while (queue.length) {
    const [x, y, cnt] = queue.shift();
    // 중단문
    if (x === endX && y === endY) return console.log(cnt);

    // 이동하기
    for (let i = 0; i < dir.length; i++) {
      // 다음 이동할 x,y
      const moveX = x + dir[i][0];
      const moveY = y + dir[i][1];

      if (moveX < 0 || moveY < 0 || moveX >= L || moveY >= L || visited[moveX][moveY]) continue;
      else {
        visited[moveX][moveY] = true;
        queue.push([moveX, moveY, cnt + 1]);
      }
    }
  }
}
// 케이스만큼 ㄱㄱ
for (let i = 0; i < T; i++) {
  const [L, pos, end] = input.slice(i * 3, 3 * (i + 1));
  solution(L, pos, end);
}

// (-1,-2),(-2,-1),(-2,1),(-1,2),(1,-2),(2,-1),(2,1),(1,2)
