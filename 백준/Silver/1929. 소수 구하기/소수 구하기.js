const fs = require("fs");
const input = fs
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "test.txt")
  .toString()
  .trim()
  .split("\n");

const startNum = Number(input.join().split(" ")[0]);
const endNum = Number(input.join().split(" ")[1]);
const arr = [];

function test(n) {
  if (n === 1) return;

  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) {
      return;
    }
  }
  return console.log(n);
}

for (let i = startNum; i <= endNum; i++) {
  test(i);
}
