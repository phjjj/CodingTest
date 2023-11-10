const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "test.txt";
const input = fs.readFileSync(filePath, "utf8").trim().split("\n");

const [N, K] = input.shift().split(" ").map(Number);
const visited = Array.from({ length: K }, () => false);
let queue = [];

queue.push([N, 0]);

let dir = [1, -1, 2];

while (queue.length) {
  const [x, move] = queue.shift();
  if (x === K) {
    return console.log(move);
  }
  for (let i = 0; i < 3; i++) {
    let moveX = 0;
    if (i == 2) {
      moveX = x * dir[i];
    } else {
      moveX = x + dir[i];
    }
    if (moveX < 0 || moveX > 100000 || visited[moveX]) continue;
    visited[moveX] = true;
    queue.push([moveX, move + 1]);
  }
}
// 수빈이는 x+1,x-1,2x 로 이동 가능
// 동생 K와 같을 경우 출력
//
