const fs = require("fs");
const input = fs
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "test.txt")
  .toString()
  .trim()
  .split("\n");

let arr = [];
for (let i = 0; i < input.join().split(" ").map(Number).length; i++) {
  arr.push(Math.pow(input.join().split(" ").map(Number)[i], 2));
}
console.log(arr.reduce((a, b) => a + b) % 10);
