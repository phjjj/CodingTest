const filePath = process.platform === "linux" ? "/dev/stdin" : "test.txt";
const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");
const [N, M] = input.shift().split(" ").map(Number);
const map = input.map((v) => v.split(" ").map(Number));
const visited = Array.from({ length: N }, () =>
  Array.from({ length: M }, () => false)
);

// 상하좌우
const dir = [
  [-1, 0],
  [1, 0],
  [0, 1],
  [0, -1],
];

function bfs(x, y) {
  let queue = [[x, y]];
  visited[x][y] = true;
  let cnt = 0;

  while (queue.length) {
    const [curX, curY] = queue.shift();
    for (let i = 0; i < 4; i++) {
      const moveX = curX + dir[i][0];
      const moveY = curY + dir[i][1];

      if (
        moveX >= 0 &&
        moveY >= 0 &&
        moveX < N &&
        moveY < M &&
        !visited[moveX][moveY]
      ) {
        if (!visited[moveX][moveY] && map[moveX][moveY] === 1) {
          visited[moveX][moveY] = true;
          queue.push([moveX, moveY]);
        }
      }
    }
    cnt++;
  }
  return cnt;
}

let maxExtent = 0;
let number = 0;

for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    if (!visited[i][j] && map[i][j] === 1) {
      maxExtent = Math.max(maxExtent, bfs(i, j));
      number++;
    }
  }
}
console.log(number);
console.log(maxExtent);

// 그림의 개수는 그림의 시작할 때 cnt++
// 가장 큰 그림은 방문횟수가 가장 큰 곳
