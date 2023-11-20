const filePath = process.platform === "linux" ? "/dev/stdin" : "test.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");

const [N, M] = input.shift().split(" ").map(Number);
const map = input.map((v) => v.split(" ").map(Number));

const dir = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];

let answer = 0;

function bfs(x, y, visited) {
  const queue = [[x, y]];

  visited[x][y] = true;

  while (queue.length) {
    const [curX, curY] = queue.shift();

    for (let k = 0; k < 4; k++) {
      const moveX = curX + dir[k][0];
      const moveY = curY + dir[k][1];

      // 맵 밖으로 나가면 continue
      if (moveX < 0 || moveY < 0 || moveX >= N || moveY >= M) continue;
      // 바다이거나 이미 방문했을경우
      if (map[moveX][moveY] === 0 || visited[moveX][moveY]) continue;

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
    if (map[moveX][moveY] === 0) result += 1;
  }

  return result;
}

while (true) {
  // 빙산의 개수 구하기
  let cnt = 0;
  const visited = Array.from({ length: N }, () => Array(M).fill(false));

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (map[i][j] === 0 || visited[i][j]) continue;
      bfs(i, j, visited);
      cnt += 1;
    }
  }

  if (cnt === 0) return console.log(0); // 다 녹을 때까지 분리되지 않는 경우
  if (cnt >= 2) return console.log(answer);

  // 빙산 녹이기
  // 0이 되는 부분이 기존 배열에 영향을 주지 않기 위해 배열을 복사
  const copy = Array.from({ length: N }, () => Array(M).fill(0));

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (map[i][j] === 0) continue;

      copy[i][j] = map[i][j] - getSeaArea(i, j);

      if (copy[i][j] < 0) copy[i][j] = 0;
    }
  }

  // 빙하 업데이트
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      map[i][j] = copy[i][j];
    }
  }

  answer += 1;
}

// 해설

// 현재의 빙하 수, 빙하 녹이기 이 2개를 따로 처리해줘야한다
// 현재의 빙하 수는 bfs 사이클 1번이 1개다, 만약 2개 일 경우 다시 종료

// 빙하 녹이기, 배열을 복사 한 이유는 빙하를 녹잉는 과정(bfs)에서 0으로 만든 후 옆에 빙하에도 영향을 줘서 바다라고 생각할수도있기때문
// 2중 for문을 이용해 0이 아닐 때 들어가서 검사한다.
