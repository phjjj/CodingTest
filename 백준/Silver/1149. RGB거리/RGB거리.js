const filePath = process.platform === "linux" ? "/dev/stdin" : "test.txt";
const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

const N = +input.shift();

const houseArr = input.map((v) => v.split(" ").map(Number));

const dp = Array.from({ length: N }, () => Array.from({ length: 3 }, () => 0));
dp[0][0] = houseArr[0][0];
dp[0][1] = houseArr[0][1];
dp[0][2] = houseArr[0][2];

for (let i = 1; i < N; i++) {
  dp[i][0] = Math.min(dp[i - 1][1], dp[i - 1][2]) + houseArr[i][0]; // 빨강으로 칠할 때
  dp[i][1] = Math.min(dp[i - 1][0], dp[i - 1][2]) + houseArr[i][1]; // 초록으로 칠할 때
  dp[i][2] = Math.min(dp[i - 1][0], dp[i - 1][1]) + houseArr[i][2]; // 파랑으로 칠할 때
}
console.log(dp[N - 1].sort((a, b) => a - b)[0]);

// 각각의 집을 빨초파로 칠하는 비용이 있을 때 아래 조건 만족하면서 최솟값 구하기
// n번, n-1번의 집 색이 ㅇ같으면 안된다. => 2번 연속 같은색 x
// i번 집의 색은 i-1, i+1과 같지 않아야한다. => ex i=2 이면 1,3이 같으면 안된다.

// dp[n][0] n번째집을 빨강으로 칠했을 때의 최솟값
// dp[n][1] n번째집을 초록으로 칠했을 때의 최솟값
// dp[n][2] n번째집을 파랑으로 칠했을 때의 최솟값
