const filePath = process.platform === "linux" ? "/dev/stdin" : "test.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");
const [N, M] = input.shift().split(" ").map(Number);

const originalMap = input.map((v) => v.split(" ").map(Number));
const visited = Array.from({ length: N }, () => Array.from({ length: M }, () => false));
let cctvSum = 0;
let answer = Infinity;

let cctvArr = [];

// cctv 수 구기
for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    if (
      originalMap[i][j] == 1 ||
      originalMap[i][j] == 2 ||
      originalMap[i][j] == 3 ||
      originalMap[i][j] == 4 ||
      originalMap[i][j] == 5
    ) {
      cctvSum++;
      cctvArr.push([i, j, originalMap[i][j]]);
    }
  }
}

function fill(x, y, map, dir) {
  // 상하좌우
  const direction = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];
  // dir 방향으로 끝까지 # 채우기

  while (true) {
    x += direction[dir][0];
    y += direction[dir][1];
    if (x < 0 || x >= N || y < 0 || y >= M || map[x][y] === 6) {
      break; // 벽에 부딪히거나 맵 밖으로 나가면 종료
    }
    if (map[x][y] === 0) {
      map[x][y] = "#";
    }
  }
}

// 맵 초기화
function resetMap(map) {
  // 새로운 맵이 아니라 이전의 맵으로
  const newMap = [];
  map.forEach((v) => newMap.push([...v]));
  return newMap;
}

function dfs(dep, cctvArr, map) {
  // base condtion
  // 모든 cctv를 다 구했다면 종료
  if (dep == cctvSum) {
    let cnt = 0;
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < M; j++) {
        if (map[i][j] === 0) {
          cnt++;
        }
      }
    }

    answer = Math.min(answer, cnt);
    return;
  }

  // 현재 진행중인 맵

  const [x, y, n] = cctvArr[dep];

  const curMap = resetMap(map);
  // 상 하 좌 우

  if (n === 1) {
    // console.log("cctv 1번");
    fill(x, y, map, 0);
    dfs(dep + 1, cctvArr, map);
    map = resetMap(curMap);

    fill(x, y, map, 1);
    dfs(dep + 1, cctvArr, map);
    map = resetMap(curMap);
    fill(x, y, map, 2);
    dfs(dep + 1, cctvArr, map);
    map = resetMap(curMap);
    fill(x, y, map, 3);
    dfs(dep + 1, cctvArr, map);
    map = resetMap(curMap);
  }
  if (n === 2) {
    // console.log("cctv 2번");
    // 상하
    // 좌우

    fill(x, y, map, 0);
    fill(x, y, map, 1);
    dfs(dep + 1, cctvArr, map);
    map = resetMap(curMap);

    fill(x, y, map, 2);
    fill(x, y, map, 3);
    dfs(dep + 1, cctvArr, map);
    map = resetMap(curMap);
  }
  if (n === 3) {
    // console.log("cctv 3번");
    // 상우
    fill(x, y, map, 0);
    fill(x, y, map, 3);
    dfs(dep + 1, cctvArr, map);
    map = resetMap(curMap);
    // 우하 13
    fill(x, y, map, 3);
    fill(x, y, map, 1);
    dfs(dep + 1, cctvArr, map);
    map = resetMap(curMap);
    // 좌하 12
    fill(x, y, map, 1);
    fill(x, y, map, 2);
    dfs(dep + 1, cctvArr, map);
    map = resetMap(curMap);
    // 좌상 20
    fill(x, y, map, 2);
    fill(x, y, map, 0);
    dfs(dep + 1, cctvArr, map);
    map = resetMap(curMap);
  }
  if (n === 4) {
    // console.log("cctv 4번");
    // 좌상우 203
    fill(x, y, map, 2);
    fill(x, y, map, 0);
    fill(x, y, map, 3);
    dfs(dep + 1, cctvArr, map);
    map = resetMap(curMap);
    // 상우하 031
    fill(x, y, map, 0);
    fill(x, y, map, 3);
    fill(x, y, map, 1);
    dfs(dep + 1, cctvArr, map);
    map = resetMap(curMap);
    // 좌우하 231
    fill(x, y, map, 2);
    fill(x, y, map, 3);
    fill(x, y, map, 1);
    dfs(dep + 1, cctvArr, map);
    map = resetMap(curMap);
    // 상좌하 021
    fill(x, y, map, 0);
    fill(x, y, map, 2);
    fill(x, y, map, 1);
    dfs(dep + 1, cctvArr, map);
    map = resetMap(curMap);
  }
  if (n === 5) {
    // console.log("cctv 5번");
    // 상하좌우
    fill(x, y, map, 0);
    fill(x, y, map, 1);
    fill(x, y, map, 2);
    fill(x, y, map, 3);
    dfs(dep + 1, cctvArr, map);
    map = resetMap(curMap);
  }
}

dfs(0, cctvArr, originalMap);
console.log(answer);
// cctv 별로 방문 할 수 있는 모든 경우의 수를 구한다
// 각 지대의 최소 크기를 구하는 프로그램을 작성하시오.

// 만약 cctv는 한번 정 할 때 고정이다
// cctv1 상하좌우 중 한쪽으로만 고정 4개
// cctv2 상하, 좌우 중 한쪽으로마고정 2개
// cctv3 상우, 우하, 좌우, 좌상 4개
// cctv4 좌상우, 상우하, 좌우하, 상좌하 4개
// cctv5 상하좌우 1개

// 각각의 씨시티비를 고정한 경우의 수에서 0의 개수중 최소를 구한다
// 완탐이다

// cctv 만 있는 배열을 넣어서 담는다
// x,y,n 좌표, cctv 번호
// dfs dep = cctv dep개

// ㅅ발 마지막에 틀린이유 3번 씨씨티비를 좌우로 검색하고있엇다
