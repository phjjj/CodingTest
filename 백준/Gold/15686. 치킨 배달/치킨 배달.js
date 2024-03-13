const filePath = process.platform === "linux" ? "/dev/stdin" : "test.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");
const [N, M] = input.shift().split(" ").map(Number);

// 오리지날맵
const map = input.map((v) => v.split(" ").map(Number));
// 맵복사 & 초기화
const initMap = [];
map.forEach((v) => initMap.push([...v]));

for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    if (initMap[i][j] === 2) {
      initMap[i][j] = 0;
    }
  }
}
// 맵 복사
function copy(map) {
  const copyMap = [];
  map.forEach((v) => copyMap.push([...v]));

  return copyMap;
}

function chickenPos(map) {
  const pos = [];
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (map[i][j] === 2) {
        pos.push([i, j]);
      }
    }
  }
  //   console.log(pos);
  return pos;
}

function distance(x, y, pos) {
  let min = Infinity;

  for (let i = 0; i < pos.length; i++) {
    const chiR = pos[i][0];
    const chiC = pos[i][1];
    // console.log("chir - x ", chiR + 1, x + 1);
    // console.log("chic - y ", chiC + 1, y + 1);

    min = Math.min(Math.abs(chiR + 1 - (x + 1)) + Math.abs(chiC + 1 - (y + 1)), min);
  }
  //   console.log(min);
  return min;
}

let answer = Infinity;

function dfs(dep, x, y, curMap) {
  // base condition
  if (dep === M) {
    // 치킨집 좌표
    const pos = chickenPos(curMap);
    let sum = 0;

    for (let i = 0; i < N; i++) {
      for (let j = 0; j < N; j++) {
        if (map[i][j] === 1) {
          // 거리구하기
          sum += distance(i, j, pos);
        }
      }
    }
    answer = Math.min(sum, answer);
    return;
  }

  // 맵 초기화 및 복사
  let copyMap = copy(curMap);

  for (let i = x; i < N; i++) {
    for (let j = i === x ? y : 0; j < N; j++) {
      // 오리지날 맵에서 2라면
      if (map[i][j] === 2) {
        copyMap[i][j] = 2;
        if (j + 1 < N) {
          dfs(dep + 1, i, j + 1, copyMap); // y값을 1 증가시킴
        } else {
          dfs(dep + 1, i + 1, 0, copyMap); // 다음 행으로 이동
        }
        copyMap = copy(curMap);
      }
    }
  }
}

dfs(0, 0, 0, initMap);
console.log(answer);
// 1x1 안에 빈 칸 , 치킨집, 집 3개 중하나
// 도시의 칸은 (r,c)
// r행 c열 또는 위에서 r번째 칸, 왼쪽에서 c번째 칸

// 치킨거리 = |r1-r2| + |c1-c2|
// 치킨집 M개를 임의의 위치에 심고
// 1(집)과 2(치킨집의) 치킨거리를 구하고 최소합
