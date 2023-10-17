const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "test.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");
const [N, K] = input.shift().split(" ").map(Number);
const arrK = input.map((v) => v.split(" ").map(Number));

let chikenNum = [];

let max = 0;
const visited = Array.from({ length: K }, () => false);

dfs(0);

function dfs(dep) {
  if (dep === 3) {
    const [a, b, c] = chikenNum;
    let temp = 0;
    for (let i = 0; i < N; i++) {
      temp += Math.max(arrK[i][a], arrK[i][b], arrK[i][c]);
    }
    max = Math.max(temp, max);
    return;
  }
  for (let i = 0; i < K; i++) {
    if (!visited[i]) {
      visited[i] = true;
      chikenNum.push(i);
      dfs(dep + 1);
      chikenNum.pop(i);
      visited[i] = false;
    }
  }
}
console.log(max);
