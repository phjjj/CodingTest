const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "test.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const T = +input.shift();

function solution(n) {
  let dp = [0, 1, 1, 1, 2, 2, 3, 4, 5, 7, 9];

  for (let i = 11; i <= n; i++) {
    dp[i] = dp[i - 3] + dp[i - 2];
  }
  console.log(dp[n]);
}

for (let i = 0; i < T; i++) {
  solution(+input[i]);
}
