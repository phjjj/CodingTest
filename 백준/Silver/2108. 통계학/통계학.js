const fs = require("fs");
const input = fs
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "test.txt")
  .toString()
  .trim()
  .split("\n");

let arr = [];

for (let i = 1; i <= input[0]; i++) {
  arr.push(+input[i]);
}

let answer = "";

answer += Math.round(arr.reduce((a, b) => a + b) / arr.length) + "\n";
answer += arr.sort((a, b) => a - b)[Math.floor(arr.length / 2)] + "\n";

const map = new Map();
let max = 1;
for (let num of arr) {
  // 현재의 맵에 arr의 수를 가지고 있을경우
  if (map.has(num)) {
    // map.get()은 num의 value값을 불러온다 그래서 num의 value 값을 +1 해줌
    // Math.max()을 이용해 중복된 값이 +1 되므로 현재 max값이랑 비교해서 max변수에 저장
    max = Math.max(max, map.get(num) + 1);
    map.set(num, map.get(num) + 1);
  } else {
    map.set(num, 1);
  }
}

let maxArr = [];
for (let [key, val] of map) {
  if (val === max) maxArr.push(key);
}

answer += maxArr.length === 1 ? maxArr[0] + "\n" : maxArr[1] + "\n";

answer += arr[arr.length - 1] - arr[0];

console.log(answer);
