const fs = require("fs");
const input = fs.readFileSync("dev/stdin").toString().trim().split("\n");

// 문제 풀이
const n = +input[0];

const dp = Array.from({ length: n + 1 }, () => 0);
dp[0] = 0;
dp[1] = 1;
for (let i = 1; i <= n; i++) {
  // i = 1 + i-1까지 최소갯수
  dp[i] = dp[1] + dp[i - 1];

  for (let j = 2; j * j <= i; j++) {
    // i의 최소갯수 = min(i의 최소 갯수, 완전제곱수 + i-완전제곱수)
    // 완전 제곱수일 때는 1개로 구성됨
    dp[i] = Math.min(dp[i], 1 + dp[i - j * j]);
  }
}
console.log(dp[n]);