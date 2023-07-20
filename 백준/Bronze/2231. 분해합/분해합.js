const fs = require("fs");
const input = fs
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "test.txt")
  .toString()
  .trim()
  .split("\n");

let num = Number(input.join());
let m = num;
let cnt = 0;

while (m > 0) {
  m = Math.floor(m / 10);
  cnt++;
}
const min = num - cnt * 9;

for (let i = min; i <= num; i++) {
  if (
    num ===
    i +
      String(i)
        .split("")
        .map(Number)
        .reduce((a, b) => a + b)
  ) {
    return console.log(i);
  }
}
console.log(0);
