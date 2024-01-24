const filePath = process.platform === "linux" ? "/dev/stdin" : "test.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");

const [N, M] = input[0].split(" ").map(Number);

const visited = Array.from({ length: 10 }, () => false);
let arr = [];

function solution(dep, n) {
  // base condition
  if (dep === M) {
    console.log(arr.join(" "));
    return;
  }

  for (let i = n; i < N; i++) {
    if (!visited[i]) {
      visited[i] = true;
      arr.push(i + 1);
      solution(dep + 1, i);
      arr.pop();
      visited[i] = false;
    }
  }
}
solution(0, 0);

// 전에 검사했던 인덱스가 중복되지 않게
// dep == 재귀 호출 수
// n = 현재 인덱스