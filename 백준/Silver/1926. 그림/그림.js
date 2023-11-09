const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "test.txt";
const input = fs.readFileSync(filePath, "utf8").trim().split("\n");
const [N, M] = input.shift().split(" ").map(Number);
const map = input.map((v) => v.split(" ").map(Number));

const dir = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];
const visited = Array.from({ length: N }, () => Array.from({ length: M }, () => false));
let sum = 0;
let area = 0;

function bfs(i, j) {
  let queue = [[i, j, 1]];
  let cnt = 0;

  while (queue.length) {
    const [x, y, v] = queue.shift();
    for (let i = 0; i < 4; i++) {
      const moveX = x + dir[i][0];
      const moveY = y + dir[i][1];

      if (moveX >= 0 && moveY >= 0 && moveX < N && moveY < M && !visited[moveX][moveY] && map[moveX][moveY] === 1) {
        visited[moveX][moveY] = true;
        queue.push([moveX, moveY, v + 1]);
      }
    }
    cnt++;
  }
  return cnt;
}

for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    if (!visited[i][j] && map[i][j] === 1) {
      let cnt = 0;
      visited[i][j] = true;
      area = Math.max(bfs(i, j), area);
      sum++;
    }
  }
}
console.log(sum + "\n" + area);
// 풀이
// 위 아래 좌 우로 검사하면서 방문을 체크한다
// [0][0] 부터 bfs를 실행하고
// [0][0]에서 위 아래 좌 우 로, 1이면서 방문하지 않았을 경우 이동
// 위의 bfs호출이 끝났을 때, 그림 ++

// 넓이는 shift후에 방문했을때 v+1 하고 큐를 다돌고 v를 반환한다음 Math.min을 해보자
