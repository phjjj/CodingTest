const filePath = process.platform === "linux" ? "/dev/stdin" : "test.txt";
const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

const [N, K] = input.shift().split(" ").map(Number);

// 물건의 무게와 가치를 저장할 배열
const items = input.map((line) => line.split(" ").map(Number));

// DP 배열 초기화
const dp = Array.from({ length: N + 1 }, () => Array(K + 1).fill(0));

// DP로 최댓값 계산
for (let i = 1; i <= N; i++) {
  const [w, v] = items[i - 1];

  for (let j = 0; j <= K; j++) {
    dp[i][j] = dp[i - 1][j];

    if (j >= w) {
      dp[i][j] = Math.max(dp[i][j], dp[i - 1][j - w] + v);
    }
  }
}

console.log(dp[N][K]);

// n개의 물건, 무게 w 가치 v
// n개의 물건 중, k보다 작거나 같은 무게 w만큼만 넣을 수 있을 때, 가치v의 최댓값

// DP..? 또는 완탐으로 풀거나 dfs도 가능해보인다.

// DP[i][j] i번째 물건을 선택 했을 때 j의 무게
// 물건을 넣을 경우
// DP[k+1][j+물건의 무게]

// 안넣을 경우
// DP[K-1][J]
