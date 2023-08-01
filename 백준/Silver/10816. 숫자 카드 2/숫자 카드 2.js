const fs = require("fs");
const input = fs
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "test.txt")
  .toString()
  .trim()
  .split("\n");

const N = input[1].split(" ").map(Number);
const M = input[3].split(" ").map(Number);

let map = new Map();

N.forEach((el) => {
  if (map.has(el)) map.set(el, map.get(el) + 1); // 이미 key를 가지고있다면 즉 중복되는 수가 있다면 key , value+1 해줌
  else map.set(el, 1);
});

let answer = [];
M.forEach((el) => answer.push(map.get(el) || 0));
console.log(answer.join(" "));
