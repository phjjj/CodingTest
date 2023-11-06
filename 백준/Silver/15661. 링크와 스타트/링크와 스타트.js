const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "test.txt";
const input = fs.readFileSync(filePath, "utf8").trim().split("\n");

let min = 987654321; // 초기 최소값 설정
const check = []; // 팀원이 속한 팀 여부 체크 배열
const n = Number(input.shift()); // 전체 팀원 수
const stats = input.map((v) => v.split(" ").map(Number)); // 팀원들의 능력치 배열

check.fill(false); // check 배열 초기화

for (let i = 1; i <= n / 2; i++) {
  dfs(0, n, i, 0); // 가능한 팀 조합을 찾기 위해 DFS 호출
}

console.log(min); // 최소 능력치 차이 출력

function dfs(cnt, n, m, start) {
  if (cnt === m) {
    let a_sum = 0;
    let b_sum = 0;
    // 가능한 팀 조합에 대한 능력치 계산
    for (let i = 0; i < n - 1; i++) {
      for (let j = i + 1; j < n; j++) {
        if (i !== j) {
          if (check[i] && check[j]) a_sum += stats[i][j] + stats[j][i];
          if (!check[i] && !check[j]) b_sum += stats[i][j] + stats[j][i];
        }
      }
    }
    min = Math.min(min, Math.abs(a_sum - b_sum)); // 최소 능력치 차이 갱신
    return;
  }
  for (let i = start; i < n; i++) {
    if (!check[i]) {
      check[i] = true; // 팀에 포함시킴
      dfs(cnt + 1, n, m, i + 1); // 다음 팀원으로 이동
      check[i] = false; // 팀에서 제외시킴
    }
  }
  return;
}
