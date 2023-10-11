const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "test.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const T = +input.shift();

function solution(n, m) {
  let cnt = 0;
  for (let i = 1; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      let a = i;
      let b = j;
      if (((a * a + b * b + m) / (a * b)) % 1 === 0) {
        cnt++;
      }
    }
  }
  return console.log(cnt);
}
for (let i = 0; i < T; i++) {
  const [n, m] = input[i].split(" ").map(Number);
  solution(n, m);
}
