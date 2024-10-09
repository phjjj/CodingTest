const filePath = process.platform === "linux" ? "/dev/stdin" : "test.txt";
const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

const [N, M] = input.shift().split(" ").map(Number);
const map = input.map((v) => v.split("").map(Number));
const dir = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
];
const visited = Array.from({ length: N }, () =>
  Array.from({ length: M }, () => false)
);

function bfs(x, y) {
  let queue = [[x, y, 1]];
  visited[x][y] = true;
  let min = 0;
  while (queue.length) {
    let [curX, curY, v] = queue.shift();
    if (curX === N - 1 && curY === M - 1) {
      console.log(v);
    }
    for (let i = 0; i < 4; i++) {
      const moveX = curX + dir[i][0];
      const moveY = curY + dir[i][1];

      if (moveX >= 0 && moveY >= 0 && moveX < N && moveY < M) {
        if (!visited[moveX][moveY] && map[moveX][moveY] === 1) {
          queue.push([moveX, moveY, v + 1]);
          visited[moveX][moveY] = true;
        }
      }
    }
  }
}

bfs(0, 0);

// NxM크기에서 NxM의 위치까지의 최소 칸
// 큐에서 front값이 먼저 NxM일 경우에 최소 칸으로 도착한거다
