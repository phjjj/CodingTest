const fs = require("fs");
const input = fs
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "test.txt")
  .toString()
  .trim()
  .split("\n");

const n = +input[0].split(" ")[0];
const k = +input[0].split(" ")[1];
let arr = [];
for (let i = 1; i <= n; i++) {
  arr.push(i);
}

let answer = [];
let cnt = 1;

while (arr.length) {
  if (cnt === k) {
    answer.push(arr.shift());
    cnt = 1;
  } else {
    arr.push(arr.shift());
    cnt++;
  }
}

console.log("<" + answer.join(", ") + ">");
