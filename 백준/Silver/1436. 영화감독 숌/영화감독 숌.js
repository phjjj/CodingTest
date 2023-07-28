const fs = require("fs");
const input = fs
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "test.txt")
  .toString()
  .trim()
  .split("\n");

const n = +input.join("");

let num = 666;
let count = 1;
while (count < n) {
  num++;
  if (String(num).includes("666")) count++;

}

console.log(num);
