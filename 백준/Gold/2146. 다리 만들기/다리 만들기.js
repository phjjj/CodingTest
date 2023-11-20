const filePath = process.platform === "linux" ? "/dev/stdin" : "test.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");
const N = +input.shift();
const map = input.map((v) => v.split(" ").map(Number));

const dir = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];

// 섬 번호 붙이기
function isLandBfs(x, y, number) {
  let queue = [[x, y]];
  map[x][y] = number;
  while (queue.length) {
    const [curX, curY] = queue.shift();

    for (let i = 0; i < 4; i++) {
      const moveX = curX + dir[i][0];
      const moveY = curY + dir[i][1];

      // 방문했거나 맵밖일경우
      if (moveX < 0 || moveX >= N || moveY < 0 || moveY >= N || isLandVisited[moveX][moveY]) continue;
      // 0(바다)일 경우
      if (map[moveX][moveY] === 0) continue;
      map[moveX][moveY] = number;
      queue.push([moveX, moveY]);
      isLandVisited[moveX][moveY] = true;
    }
  }
}

// 섬 방문 체크
const isLandVisited = Array.from({ length: N }, () => Array.from({ length: N }, () => false));
// 섬 번호
let number = 0;

for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    if (!isLandVisited[i][j] && map[i][j] === 1) {
      isLandBfs(i, j, (number += 1));
    }
  }
}

// 동서남북에 바다가 있는지 체크
function check(x, y) {
  for (let i = 0; i < 4; i++) {
    const moveX = x + dir[i][0];
    const moveY = y + dir[i][1];
    // 맵밖일경우
    if (moveX < 0 || moveX >= N || moveY < 0 || moveY >= N) continue;
    if (map[moveX][moveY] !== 0) return map[moveX][moveY];
  }
  return false;
}

// 최단 다리
// n번 섬으로 부터 n+1번 섬까지
//
function bfs(islandNumber) {
  const seaVisited = Array.from({ length: N }, () => Array.from({ length: N }, () => false));
  let queue = [];
  let cnt = 0;

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (map[i][j] === islandNumber) {
        queue.push([i, j, 0]);
        seaVisited[i][j] = true;
      }
    }
  }

  while (queue.length) {
    const [x, y, v] = queue.shift();
    for (let i = 0; i < 4; i++) {
      const moveX = x + dir[i][0];
      const moveY = y + dir[i][1];

      if (moveX < 0 || moveX >= N || moveY < 0 || moveY >= N) continue;
      // 다른 섬 1일 경우
      if (map[moveX][moveY] !== 0 && map[moveX][moveY] !== islandNumber) return v;
      // 0(바다)일 경우
      if (map[moveX][moveY] === 0 && !seaVisited[moveX][moveY]) {
        seaVisited[moveX][moveY] = true;
        queue.push([moveX, moveY, v + 1]);
      }
    }
  }
}
let answer = Infinity;
for (let i = 1; i <= number; i++) {
  answer = Math.min(answer, bfs(i));
}
console.log(answer);

// 섬마다 번호 붙이기 bfs이용

// 바다의 기준으로 방문하기
// 2중 for문으로 동서남북에 섬이 있고, 맵 밖으로 안나가고, 방문한적이없으면 큐에 넣고 bfs
// visited 계속해서 초기화 해줘야함

// 동서남북 체크 -> 섬이 있을 경우 그 섬의 번호 저장 , 섬이 없으면 continue
// 섬의 번호를 가진 상태로 새로운 섬이 나올 때 까지 경로 탐색
// 새로운 섬이 나 올경우, 이동 횟수 반환
//
