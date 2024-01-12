const filePath = process.platform === "linux" ? "/dev/stdin" : "test.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");

const K = +input.shift();
const [W, H] = input.shift().split(" ").map(Number);
const map = input.map((v) => v.split(" "));

const horseDir = [
  [-2, -1],
  [-2, 1],
  [-1, -2],
  [-1, 2],
  [2, -1],
  [2, 1],
  [1, -2],
  [1, 2],
];

const monkeyDIr = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];

const visited = Array.from({ length: H }, () => Array.from({ length: W }, () => [false]));

function bfs() {
  let queue = [[0, 0, 0, K]];
  visited[0][0][0] = true;
  let idx = 0;

  while (queue.length !== idx) {
    // x,y v= 이동거리, k=말로 이동가능한 횟수
    const [x, y, v, k] = queue[idx];

    // 중단문 도착했을 때
    if (x === H - 1 && y === W - 1) {
      console.log(v);
      return;
    }

    // 상하좌우
    for (let i = 0; i < monkeyDIr.length; i++) {
      const moveX = x + monkeyDIr[i][0];
      const moveY = y + monkeyDIr[i][1];

      if (moveX < 0 || moveX >= H || moveY < 0 || moveY >= W) continue;
      if (visited[moveX][moveY][k] || map[moveX][moveY] === "1") continue;

      visited[moveX][moveY][k] = true;
      queue.push([moveX, moveY, v + 1, k]);
    }
    if (k === 0) {
      idx++;
      continue;
    }
    for (let i = 0; i < horseDir.length; i++) {
      const moveX = x + horseDir[i][0];
      const moveY = y + horseDir[i][1];

      if (moveX < 0 || moveX >= H || moveY < 0 || moveY >= W) continue;
      if (visited[moveX][moveY][k - 1] || map[moveX][moveY] === "1") continue;

      visited[moveX][moveY][k - 1] = true;
      queue.push([moveX, moveY, v + 1, k - 1]);
    }
    idx++;
  }

  console.log(-1);
}

bfs();
// 말은 장애물을 뛰어 넘을 수 있다.
// 원숭이는 총 K번만 말처럼 움직일수있다.
// 그 외에는 인접한 칸 상하좌우 대각선 x
// 맨 왼쪽 위 부터 맨 오른쪽 아래까지
// 2가지의 움직임이 있는데 모두 한번의 동작으로친다.

// 원숭이가 움직일때 2가지 경우를 두고 bfs 진행한다.
// k가 있들말든 하나는 k로 진행하고 k-1, k로 진행하지 않고 그냥 원래대로
// 추가로 visited 방문 배열은 k의 사용횟수가 다르면 새로운 방문이라고 판단해야한다
