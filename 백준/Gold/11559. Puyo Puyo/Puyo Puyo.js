const filePath = process.platform === "linux" ? "/dev/stdin" : "test.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");
let map = input.map((line) => line.split(""));

// 상하좌우
const dir = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];

function bfs(x, y) {
  let queue = [[x, y]];

  const visited = Array.from({ length: 12 }, () => Array.from({ length: 6 }, () => false));
  visited[x][y] = true;
  let cnt = 1;
  const bomb = [];
  bomb.push([x, y]);

  while (queue.length) {
    const [curX, curY] = queue.shift();

    for (let i = 0; i < 4; i++) {
      const moveX = curX + dir[i][0];
      const moveY = curY + dir[i][1];

      if (moveX < 0 || moveY < 0 || moveX >= map.length || moveY >= map[0].length || visited[moveX][moveY]) continue;
      if (map[moveX][moveY] != map[x][y]) continue;

      queue.push([moveX, moveY]);
      bomb.push([moveX, moveY]);
      visited[moveX][moveY] = true;
      cnt++;
    }
  }
  // cnt 4이상 일 경우, . 으로 바꾸기
  if (cnt >= 4) {
    for (let i = 0; i < bomb.length; i++) {
      const x = bomb[i][0];
      const y = bomb[i][1];
      map[x][y] = ".";
    }
    return true;
  }
  return false;
}

function start() {
  let flag = true;
  let cnt = 0;
  while (flag) {
    flag = false; // 터짐 여부를 확인하기 위한 플래그
    for (let i = 11; i >= 0; i--) {
      for (let j = 5; j >= 0; j--) {
        if (map[i][j] == ".") continue;
        if (bfs(i, j)) {
          flag = true; // 터짐이 일어났음을 표시
        }
      }
    }
    // 터진 뿌요들을 바닥으로 내리기
    for (let i = 0; i < 6; i++) {
      const arr = [];

      for (let j = 11; j >= 0; j--) {
        if (map[j][i] == ".") continue;
        arr.push(map[j][i]);
        map[j][i] = ".";
      }

      if (arr.length > 0) {
        let j = 11;
        for (let k = 0; k < arr.length; k++) {
          map[j][i] = arr[k];
          j--;
        }
      }
    }
    // 터짐이 없다면 종료
    if (!flag) break;
    cnt++; // 연쇄 터짐이 일어난 횟수 증가
  }
  console.log(cnt); // 최종 연쇄 횟수 출력
}

start();

// 같은 색 뿌요가 4개이상 상하좌우로 연결되어 있으면 없어짐 -> 1연쇄

// 1. 상하좌우로 4개 이상 이어져있으면 터짐, 터진자리 .으로 표시
// - 뿌요 하나에 bfs가 4개 이상 돌아질 경우 연쇄+1, 탐색한 곳의 위치를 저장 후 .으로 바꾸기
// 2. 각 열에서 바닥으로 내리기
// - 현재 인덱스와 그 전 인덱스와 비교해서 전 인덱스가 비어있다면 전 인덱스로 옮기고 현재 인덱스는 . 처리
// 3. 반복

// 함수 실행 순서
// 1. 현재 맵에서 뿌요를 터트리는 함수
// 2. 뿌요를 내리는 함수

// 알게 된 사실
// [....]에서 split 하기전에는 map[x][y] = "."; 이게 불가능하다 당연한거였음
