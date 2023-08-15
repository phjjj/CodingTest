const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "test.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");
const [N, M] = input.shift().split(" ").map(Number);

const map = input.map((v) => v.split("").map((x) => +x));
const queue = [[0, 0, 1]];
// 상, 하, 좌, 우
const dir = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];

while (queue.length) {
  const [x, y, v] = queue.shift();

  for (let i = 0; i < 4; i++) {
    //i=0 일때 상 ,1일때 하, ...
    const xPos = x + dir[i][0];
    const yPos = y + dir[i][1];

    if (0 <= xPos && yPos >=0 && xPos < M && yPos < N) {
      if (map[yPos][xPos] === 1) {
        map[yPos][xPos] = v + 1;
        queue.push([xPos, yPos, v + 1]);
      }
    }
  }
}
console.log(map[N - 1][M - 1]);
