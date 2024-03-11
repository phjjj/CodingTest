const filePath = process.platform === "linux" ? "/dev/stdin" : "test.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");
const N = +input.shift();
const map = input.map((v) => v.split(" ").map(Number));

// 항상 깊은복사를 이용하자
function copy(map) {
  const copyMap = [];
  map.forEach((v) => copyMap.push([...v]));

  return copyMap;
}

function plus(arr) {
  const newArr = [];
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] === 0) continue;
    if (arr[i] === arr[i + 1]) {
      newArr.push(arr[i] * 2);
      arr[i + 1] = 0;
    } else {
      newArr.push(arr[i]);
    }
  }
  if (arr[arr.length - 1] !== 0) newArr.push(arr[arr.length - 1]);

  return newArr;
}

function up(map) {
  for (let i = 0; i < map.length; i++) {
    const column = [];

    for (let j = 0; j < map.length; j++) {
      if (map[j][i] === 0) continue;
      column.push(map[j][i]);
      map[j][i] = 0;
    }
    if (column.length > 0) {
      const arr = plus(column);

      for (let k = 0; k < arr.length; k++) {
        map[k][i] = arr[k];
      }
    }
  }

  return map;
}
function down(map) {
  for (let i = 0; i < map.length; i++) {
    const column = [];
    for (let j = map.length - 1; j >= 0; j--) {
      if (map[j][i] === 0) continue;
      column.push(map[j][i]);
      map[j][i] = 0;
    }
    if (column.length > 0) {
      const arr = plus(column);

      for (let k = 0; k < arr.length; k++) {
        map[map.length - 1 - k][i] = arr[k];
      }
    }
  }

  return map;
}
function left(map) {
  for (let i = 0; i < map.length; i++) {
    const row = [];
    for (let j = 0; j < map.length; j++) {
      if (map[i][j] === 0) continue;
      row.push(map[i][j]);
      map[i][j] = 0;
    }
    if (row.length > 0) {
      const arr = plus(row);

      for (let k = 0; k < arr.length; k++) {
        map[i][k] = arr[k];
      }
    }
  }
  return map;
}
function right(map) {
  for (let i = 0; i < map.length; i++) {
    const row = [];
    for (let j = map.length - 1; j >= 0; j--) {
      if (map[i][j] == 0) continue;
      row.push(map[i][j]);
      map[i][j] = 0;
    }
    if (row.length > 0) {
      const arr = plus(row);

      for (let k = 0; k < arr.length; k++) {
        map[i][map.length - 1 - k] = arr[k];
      }
    }
  }
  return map;
}

let answer = 0;
function dfs(dep, map) {
  // base condition
  if (dep === 5) {
    map.forEach((v) => {
      answer = Math.max(answer, ...v);
    });
    return;
  }

  let copyMap = copy(map);
  copyMap = up(copyMap);
  dfs(dep + 1, copyMap);
  copyMap = copy(map);
  copyMap = left(copyMap);
  dfs(dep + 1, copyMap);
  copyMap = copy(map);
  copyMap = down(copyMap);
  dfs(dep + 1, copyMap);
  copyMap = copy(map);
  copyMap = right(copyMap);
  dfs(dep + 1, copyMap);
}

dfs(0, map);
console.log(answer);
// 상하좌우로 움직이기
//
