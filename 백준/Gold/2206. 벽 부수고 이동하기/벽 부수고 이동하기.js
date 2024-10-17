const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "test.txt";
const input = fs.readFileSync(filePath, "utf8").trim().split("\n");
const [N, M] = input.shift().split(" ").map(Number);
const map = input;
const dir = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];

// 3차원 배열로 선언
const visited = Array.from({ length: N }, () => Array.from({ length: M }, () => [false, false]));

function bfs(x, y) {
  let queue = [[x, y, 1, 1]];
  let idx = 0;

  while (queue.length !== idx) {
    const [curX, curY, v, wall] = queue[idx];

    if (curX === N - 1 && curY === M - 1) {
      return console.log(v);
    }

    for (let i = 0; i < 4; i++) {
      const moveX = curX + dir[i][0];
      const moveY = curY + dir[i][1];
      // 이동할 곳이 맵 밖으로 벗어나거나, 방문했을경우
      // -> 여기서 wall 0 과 1 구분해 부섰을 경우의 visited 부시지 않았을경우의 visited 2개 구분

      // wall이 0(이미 부순적이 있는경우) 일때 다음 방문 하는 곳이 visited[moveX][moveY][0] 이미 부쉈던 애들끼리 방문 체크
      if (moveX < 0 || moveX >= N || moveY < 0 || moveY >= M || visited[moveX][moveY][wall]) continue;
      // 벽이 나오고 이미 부쉈던 적이 있을 경우 경우
      if (map[moveX][moveY] === "1" && wall === 0) continue;

      queue.push([moveX, moveY, v + 1, wall - map[moveX][moveY]]);
      visited[moveX][moveY][wall] = true;
      // console.log(queue);
    }

    idx++;
  }

  return console.log(-1);
}

bfs(0, 0);

// 문제점
// 1칸 부수고 들어간곳도 방문했다고해서 안들어가네
// 3차원 배열로 따로 방문을 선언해서 부수고 방문한거와 부수지 않고 방문하고 다니는거 구분해서

// 3차원 배열을 추가해 wall에 벽을 뿌순경우 1, 뿌수지 않은 경우 0을 추가

// 풀이
// NxM
// 큐에 x,y,v,break 를 넣는다 v는 현재 거리 power는 부술수 있는 횟수 1이다
// 이동하려고 하는 곳이 1일 경우 wall-1을 한다, 만약 power가 0일 경우 해당 경로로 가지 못한다
// N-1 x M-1 에 도착 했을 경우 return

// 문제
// N×M의 행렬로 표현되는 맵이 있다. 맵에서 0은 이동할 수 있는 곳을 나타내고, 1은 이동할 수 없는 벽이 있는 곳을 나타낸다. 당신은 (1, 1)에서 (N, M)의 위치까지 이동하려 하는데, 이때 최단 경로로 이동하려 한다.
// 최단경로는 맵에서 가장 적은 개수의 칸을 지나는 경로를 말하는데, 이때 시작하는 칸과 끝나는 칸도 포함해서 센다.

// 만약에 이동하는 도중에 한 개의 벽을 부수고 이동하는 것이 좀 더 경로가 짧아진다면,
//벽을 한 개 까지 부수고 이동하여도 된다.

// 한 칸에서 이동할 수 있는 칸은 상하좌우로 인접한 칸이다.

// 맵이 주어졌을 때, 최단 경로를 구해 내는 프로그램을 작성하시오.
