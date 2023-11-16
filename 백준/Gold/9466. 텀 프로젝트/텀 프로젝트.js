const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "test.txt";
const input = fs.readFileSync(filePath, "utf8").trim().split("\n");
const T = +input.shift();

function solution(n, selectArr) {
  const visited = Array.from({ length: n + 1 }, () => false);
  const done = Array.from({ length: n + 1 }, () => false);
  let cnt = 0;

  for (let i = 1; i <= n; i++) {
    if (!visited[i]) {
      dfs(i);
    }
  }
  console.log(n - cnt);

  function dfs(n) {
    visited[n] = true;
    const select = selectArr[n];

    // 아직 방문하지 않은 경우
    if (!visited[select]) {
      dfs(select);
      // 방문했을경우
    } else if (!done[select]) {
      for (let i = select; i !== n; i = selectArr[i]) {
        cnt++;
      }
      cnt++;
    }
    done[n] = true;
  }
}

for (let i = 0; i < T; i++) {
  const N = +input.shift();
  const selectArr = input.shift().split(" ").map(Number);
  selectArr.unshift(0);
  solution(N, selectArr);
}
