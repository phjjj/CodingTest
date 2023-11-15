const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "test.txt";
const input = fs.readFileSync(filePath, "utf8").trim().split("\n");
const [N, M] = input.shift().split(" ").map(Number);
const map = input;
const dir = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];
const visited = Array.from({ length: N }, () => Array.from({ length: M }, () => [false, false]));

function bfs(x, y) {
  let queue = [[x, y, 1, 1]];
  let idx = 0;

  while (queue.length !== idx) {
    const [curX, curY, v, power] = queue[idx];

    if (curX === N - 1 && curY === M - 1) {
      return console.log(v);
    }

    for (let i = 0; i < 4; i++) {
      const moveX = curX + dir[i][0];
      const moveY = curY + dir[i][1];

      if (moveX < 0 || moveX >= N || moveY < 0 || moveY >= M || visited[moveX][moveY][power]) continue;

      if (map[moveX][moveY] === "1" && power === 0) continue;

      queue.push([moveX, moveY, v + 1, power - map[moveX][moveY]]);
      visited[moveX][moveY][power] = true;
    }

    idx++;
  }

  return console.log(-1);
}

bfs(0, 0);
