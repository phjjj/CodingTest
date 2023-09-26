const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "test.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const [N, M] = input.shift().split(" ").map(Number);
const map = input;
const visited = Array.from({ length: N }, () => Array.from({ length: M }, () => false));

const dir = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
];
let cnt = 0;
let idx = 0;
function bfs(x, y) {
  let queue = [];

  queue.push([x, y]);

  while (queue.length != idx) {
    const [x, y] = queue[idx];

    for (let i = 0; i < 4; i++) {
      const movX = x + dir[i][0];
      const movY = y + dir[i][1];

      if (movX >= 0 && movY >= 0 && movX < N && movY < M && !visited[movX][movY]) {
        if (map[movX][movY] === "P") {
          cnt++;
        }
        if (map[movX][movY] === "X") {
          visited[movX][movY] = true;
          continue;
        }
        visited[movX][movY] = true;
        queue.push([movX, movY]);
      }
    }
    idx++;
  }
  return cnt === 0 ? console.log("TT") : console.log(cnt);
}

// 1. 도연 위치 파악 map[x][y]===I
// 2. 도연 위치로 부터 상하좌우 검사
// 3. O 일 경우 이동, X 일 경우 패스, P 일 경우 cnt+1 and 이동
// 반복
for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    if (map[i][j] === "I") return bfs(i, j);
  }
}
