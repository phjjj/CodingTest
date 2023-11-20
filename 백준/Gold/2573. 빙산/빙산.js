const filePath = process.platform === "linux" ? "/dev/stdin" : "test.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");

const [N, M] = input[0].split(" ").map(Number);
const board = Array.from({ length: N }, () => Array(M));
for (let i = 1; i <= N; i++) {
  const temp = input[i].split(" ").map(Number);
  for (let j = 0; j < M; j++) {
    board[i - 1][j] = temp[j];
  }
}
const dir = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];
let visited;
let answer = 0;

while (true) {
  // 빙산의 개수 구하기
  let cnt = 0;
  visited = Array.from({ length: N }, () => Array(M).fill(false));

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (!board[i][j] || visited[i][j]) continue;

      cnt += 1;
      bfs(i, j);
    }
  }

  if (cnt === 0) return console.log(0); // 다 녹을 때까지 분리되지 않는 경우
  if (cnt >= 2) return console.log(answer);

  // 빙산 녹이기
  // 0이 되는 부분이 기존 배열에 영향을 주지 않기 위해 배열을 복사
  const copy = Array.from({ length: N }, () => Array(M).fill(0));

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (!board[i][j]) continue;

      copy[i][j] = board[i][j] - getSeaArea(i, j);
      if (copy[i][j] < 0) copy[i][j] = 0;
    }
  }

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      board[i][j] = copy[i][j];
    }
  }

  answer += 1;
}

function bfs(x, y) {
  const queue = [[x, y]];

  visited[x][y] = true;

  while (queue.length) {
    const [curX, curY] = queue.shift();

    for (let k = 0; k < 4; k++) {
      const moveX = curX + dir[k][0];
      const moveY = curY + dir[k][1];

      if (moveX < 0 || moveY < 0 || moveX >= N || moveY >= M) continue;
      if (!board[moveX][moveY] || visited[moveX][moveY]) continue;

      queue.push([moveX, moveY]);
      visited[moveX][moveY] = true;
    }
  }
}

function getSeaArea(x, y) {
  let result = 0;

  for (let k = 0; k < 4; k++) {
    const moveX = x + dir[k][0];
    const moveY = y + dir[k][1];

    if (moveX < 0 || moveY < 0 || moveX >= N || moveY >= M) continue;
    if (board[moveX][moveY] === 0) result += 1;
  }

  return result;
}
