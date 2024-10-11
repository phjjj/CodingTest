const filePath = process.platform === "linux" ? "/dev/stdin" : "test.txt";
const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

const [M, N] = input.shift().split(" ").map(Number);
const map = input.map((v) => v.split(" ").map(Number));

const dir = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
];

const queue = [];
let cnt = 0;

function bfs() {
  let idx = 0;
  while (queue.length != idx) {
    let [curX, curY, v] = queue[idx];

    for (let i = 0; i < 4; i++) {
      const moveX = curX + dir[i][0];
      const moveY = curY + dir[i][1];

      // 만약 빈 상자 0일 경우
      if (moveX >= 0 && moveY >= 0 && moveX < N && moveY < M) {
        if (map[moveX][moveY] === 0) {
          queue.push([moveX, moveY, v + 1]);
          map[moveX][moveY] = 1;
        }
      }
    }
    idx++;
    cnt = v;
  }
}

for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    if (map[i][j] === 1) queue.push([i, j, 0]);
  }
}
bfs();

let no = "";
map.forEach((tomato) => {
  for (let i = 0; i < tomato.length; i++) {
    if (tomato[i] === 0) return (no = true);
  }
});

if (no) {
  console.log(-1);
} else console.log(cnt);
// 토마토는 하루마다 상하좌우 익게한다
// 최소 일수 구하기

// 토마토가 들어있지 않는 박스는 -1

// 저장될 때부터 모든 토마토가 익어있는 상태이면 0
// 토마토가 익지 못 할 경우 -1 출력

// 먼저, 토마토의 위치가 있는 상자부터 찾는다
// 좌표를 찾으면 큐에 넣고 bfs를 돌린다. 이 때, 상하좌우로 1로 만들어준다.
// while문이 돌아 간 만큼 cnt++
// while문이 끝나고 map 검사 할 때, 0이 있으면 -1 출력
