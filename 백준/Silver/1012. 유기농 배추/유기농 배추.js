const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "test.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const T = +input.shift();

function bfs(y, x, visited, map) {
  let dir = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];

  let queue = [[x, y]];

  while (queue.length) {
    const [x, y] = queue.shift();

    if (!visited[y][x]) {
      visited[y][x] = true;
      for (let i = 0; i < 4; i++) {
        const xPos = x + dir[i][0];
        const yPos = y + dir[i][1];

        if (xPos >= 0 && yPos >= 0 && xPos < map[0].length && yPos < map.length) {
          if (map[yPos][xPos] === 1) {
            queue.push([xPos, yPos]);
          }
        }
      }
    }
  }
}

function solution(map, visited) {
  let cnt = 0;
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[0].length; j++) {
      if (map[i][j] === 1 && visited[i][j] === false) {
        bfs(i, j, visited, map);
        cnt++;
      }
    }
  }
  console.log(cnt);
}

for (let i = 0; i < T; i++) {
  let [Y, X, K] = input.shift().split(" ");

  // map 만들기
  let visited = Array.from({ length: Y }, () => []).map((v) => (v = Array.from({ length: X }).fill(false)));
  let map = Array.from({ length: Y }, () => []).map((v) => (v = Array.from({ length: X }).fill(0)));

  for (let i = 0; i < K; i++) {
    const [y, x] = input.shift().split(" ");
    map[y][x] = 1;
  }

  solution(map, visited);
}
