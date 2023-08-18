const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "test.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

let map = [];

for (let i = 1; i <= input[0]; i++) {
  map[i - 1] = input[i].split("").map(Number);
}

// 상 하 좌 우
let dir = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];

const visited = Array.from(Array(map.length), () => Array(map.length).fill(false));
let groups = 0;
function bfs(y, x) {
  let cnt = 0;
  let queue = [[x, y]];

  while (queue.length) {
    const [x, y] = queue.shift();
    if (!visited[y][x]) {
      cnt += 1;
      visited[y][x] = true;
      for (let i = 0; i < 4; i++) {
        const xPos = x + dir[i][0];
        const yPos = y + dir[i][1];

        if (xPos >= 0 && yPos >= 0 && xPos < +input[0] && yPos < +input[0]) {
          if (map[yPos][xPos] === 1) {
            queue.push([xPos, yPos]);
          }
        }
      }
    }
  }
  return cnt;
}
let answer = [];
for (let i = 0; i < map.length; i++) {
  for (let j = 0; j < map.length; j++) {
    if (map[i][j] === 1 && visited[i][j] === false) {
      answer.push(bfs(i, j));
      groups++;
    }
  }
}
console.log(groups);
console.log(answer.sort((a, b) => a - b).join("\n"));
