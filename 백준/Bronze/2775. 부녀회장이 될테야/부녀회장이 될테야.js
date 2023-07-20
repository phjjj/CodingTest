const fs = require("fs");
const input = fs
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "text.txt")
  .toString()
  .trim()
  .split("\n")
  .map(Number);
const t = input.shift();

for (let i = 0; i < t; i++) {
  const k = input.shift();
  const n = input.shift();

  //2차원 배열로 아파트를 만들어준다
  const house = Array.from(Array(k + 1), () => Array(n + 1).fill(0));

  // 0층에는 i호만큼 산다고 해서 0층의 1호부터 n호까지 사람 넣기
  for (let i = 1; i <= n; i++) {
    house[0][i] = i;
  }
  for (let i = 1; i <= k; i++) {
    for (let j = 1; j <= n; j++) {
      house[i][j] = house[i - 1][j] + house[i][j - 1];
      //house[1][1] = house[0][1] + house[1][0] ... 반복
    }
  }
  console.log(house[k][n]);
}
