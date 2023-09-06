const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "test.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const [M, N, H] = input.shift().split(" ").map(Number);
// 3차원 배열 선언
const boxes = Array.from(Array(H), () => Array.from(Array(N), () => Array.from(Array(M).fill(0))));
const visited = Array.from(Array(H), () => Array.from(Array(N), () => Array.from(Array(M).fill(false))));

for (let i = 0; i < H; i++) {
  for (let j = 0; j < N; j++) {
    boxes[i][j] = input.shift().split(" ").map(Number);
  }
}

// 상하좌우앞뒤
let dir = [
  [1, 0, 0],
  [-1, 0, 0],
  [0, 1, 0],
  [0, -1, 0],
  [0, 0, 1],
  [0, 0, -1],
];
let queue = [];
for (let i = 0; i < H; i++) {
  for (let j = 0; j < N; j++) {
    for (let k = 0; k < M; k++) {
      if (boxes[i][j][k] === 1) {
        queue.push([i, j, k, 0]);
      } else if (boxes[i][j][k] === -1) {
        visited[i][j][k] = true;
      }
    }
  }
}

//console.log(visited);
let idx = 0;
let day = 0;
while (queue.length != idx) {
  const [z, x, y, cnt] = queue[idx];
  if (!visited[z][x][y]) {
    for (let i = 0; i < 6; i++) {
      const posZ = z + dir[i][0];
      const posX = x + dir[i][1];
      const posY = y + dir[i][2];

      if (posX >= 0 && posY >= 0 && posZ >= 0 && posZ < H && posY < M && posX < N) {
        if (boxes[posZ][posX][posY] === 0) {
          boxes[posZ][posX][posY] = 1;
          queue.push([posZ, posX, posY, cnt + 1]);
        }
      }
    }
  }
  idx++;
  day = cnt;
}

let no = "";
boxes.forEach((v) => {
  v.forEach((tomato) => {
    for (let i = 0; i < tomato.length; i++) {
      if (tomato[i] === 0) return (no = true);
    }
  });
});

if (no) {
  console.log(-1);
} else console.log(day);
