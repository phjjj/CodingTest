const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "test.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const [X, Y] = input.shift().split(" ");

// map
const map = input.map((v) => v.split(" ").map(Number));
// 방문체크
const visited = Array.from({ length: Y }, () => []).map((v) => (v = Array.from({ length: X }, () => false)));

let queue = [];
let day = 0;
// 익은 토마토를 큐에 넣고 시작
for (let i = 0; i < map.length; i++) {
  for (let j = 0; j < map[0].length; j++) {
    if (map[i][j] === 1) {
      queue.push([i, j, 0]);
    } else if (map[i][j] === -1) {
      visited[i][j] = true;
    }
  }
}

// 위치검사
let dir = [
  [-1, 0],
  [1, 0],
  [0, 1],
  [0, -1],
];
let idx = 0;
while (queue.length != idx) {
  const [x, y, v] = queue[idx];

  if (!visited[x][y]) {
    for (let i = 0; i < 4; i++) {
      const xPos = x + dir[i][0];
      const yPos = y + dir[i][1];

      if (xPos >= 0 && yPos >= 0 && xPos < map.length && yPos < map[0].length) {
        if (map[xPos][yPos] === 0) {
          map[xPos][yPos] = 1;
          queue.push([xPos, yPos, v + 1]);
        }
      }
    }
  }
  idx++;
  day = v;
}

let no = "";
map.forEach((tomato) => {
  for (let i = 0; i < tomato.length; i++) {
    if (tomato[i] === 0) return (no = true);
  }
});

if (no) {
  console.log(-1);
} else console.log(day);
