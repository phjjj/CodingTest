const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "test.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const N = +input.shift();
const arrN = input.map((v) => v.split(" ").map(Number));
const visited = Array.from({ length: N }, () => false);
let foodArr = [];
let answer = 1000000000;

function calculateTasteDifference(arr) {
  let S = 1;
  let B = 0;

  for (let i = 0; i < arr.length; i++) {
    S *= arr[i][0];
    B += arr[i][1];
  }

  return Math.abs(S - B);
}

function dfs(dep) {
  if (dep === N) {
    if (foodArr.length >= 1) {
      const tasteDifference = calculateTasteDifference(foodArr);
      answer = Math.min(answer, tasteDifference);
    }
    return;
  }

  // 현재 재료를 선택하는 경우
  visited[dep] = true;
  foodArr.push(arrN[dep]);
  dfs(dep + 1);
  foodArr.pop();
  visited[dep] = false;

  // 현재 재료를 선택하지 않는 경우
  dfs(dep + 1);
}

dfs(0);
console.log(answer);
