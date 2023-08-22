const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "test.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const T = input.shift();
let answer = "";
function solution(N, arr) {
  console.log(Math.min(...arr) + " " + Math.max(...arr));
}
for (let i = 0; i < T; i++) {
  const N = +input.shift();
  const arr = input.shift().split(" ").map(Number);
  solution(N, arr);
}
