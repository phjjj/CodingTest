const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "test.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const map = input.map((v) => v.split(" ").map(Number));
let answer = 0;
let ansX = 0;
let ansY = 0;
// 아래, 오른쪽, 오른쪽 아래 대각선, 오른쪽 위 대각선
const dir = [
  [1, 0],
  [1, 1],
  [0, 1],
  [-1, 1],
];

for (let i = 0; i < map.length; i++) {
  for (let j = 0; j < map.length; j++) {
    if (map[i][j] === 0) continue;
    check(i, j, map[i][j]);
  }
}

function check(x, y, color) {
  for (let i = 0; i < 4; i++) {
    // 갈 방향 정하기
    let dirX = x + dir[i][0];
    let dirY = y + dir[i][1];
    let cnt = 1;

    while (true) {
      if (dirX >= 19 || dirY >= 19 || dirX < 0 || dirY < 0) break;

      if (map[dirX][dirY] !== color) {
        break;
      }
      dirX += dir[i][0];
      dirY += dir[i][1];
      cnt++;
    }

    if (cnt === 5) {
      let prevX = x - dir[i][0];
      let prevY = y - dir[i][1];
      if (prevY >= 0 && prevY < 19 && prevX >= 0 && prevX < 19) {
        if (map[prevX][prevY] === color) {
          continue;
        }
      }
      answer = color;
      ansX = x;
      ansY = y;
      return;
    }
  }
  return;
}

if (answer === 0) console.log(0);
else console.log(`${answer}\n${ansX + 1} ${ansY + 1}`);
