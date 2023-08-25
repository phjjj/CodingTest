const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "test.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const [N, K] = input.join("").split(" ").map(Number);
const visited = Array.from({ length: K }, () => false);

function bfs(start, end) {
  // 1칸뒤로, 1칸앞으로, 현재위치*2
  let dir = [-1, 1, 2];
  let queue = [[start, 0]];
  let idx = 0;
  while (queue.length) {
    // console.log(queue);

    const [pos, v] = queue.shift();

    if (pos === end) {
      return v;
    }

    for (let i = 0; i < 3; i++) {
      let movePos = 0;

      if (i === 2) {
        movePos = pos * dir[i];
      } else {
        movePos = pos + dir[i];
      }

      if (movePos >= 0 && movePos <= 100000 && !visited[movePos]) {
        visited[movePos] = true;
        queue.push([movePos, v + 1]);
      }
    }
  }
}

console.log(bfs(N, K));
