const filePath = process.platform === "linux" ? "/dev/stdin" : "test.txt";
const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

const s = +input.shift();
const stair = input.map(Number);

const dp = Array.from({ length: s + 1 }, () => 0);

dp[1] = stair[0];
dp[2] = dp[1] + stair[1];
dp[3] = Math.max(stair[0], stair[1]) + stair[2];

for (let i = 4; i <= stair.length; i++) {
  dp[i] = Math.max(
    dp[i - 2] + stair[i - 1],
    dp[i - 3] + stair[i - 2] + stair[i - 1]
  );
}

console.log(dp[s]);
// 테이블정의
// dp[k]= k계단 까지 왔을 때의 최댓값
// 점화식
// dp[n] = Math.max(dp[n-1] + dp[n], dp[n-2] + dp[n])
