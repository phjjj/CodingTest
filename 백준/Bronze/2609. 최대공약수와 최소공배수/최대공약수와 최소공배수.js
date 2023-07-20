const fs = require("fs");
const input = fs
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "test.txt")
  .toString()
  .trim()
  .split("\n");

let min = Number(
  input
    .join("")
    .split(" ")
    .sort((a, b) => a - b)[0]
);
let max = Number(
  input
    .join("")
    .split(" ")
    .sort((a, b) => a - b)[1]
);

const num = max * min;
let n = 0;
while (min !== 0) {
  n = max % min;
  max = min;
  min = n;
}
console.log(max);
console.log(num / max);
