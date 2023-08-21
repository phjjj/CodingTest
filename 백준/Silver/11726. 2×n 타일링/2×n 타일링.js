const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "test.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const n = +input.join("");

const dp = [0, 1, 2, 3];

for (let i = 4; i <= n; i++) {
  dp[i] = (dp[i - 1] + dp[i - 2]) % 10007;
}

console.log(dp[n]);
