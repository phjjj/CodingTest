const filePath = process.platform === "linux" ? "/dev/stdin" : "test.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");

const [N, M] = input[0].split(" ").map(Number);

const visited = Array.from({ length: 10 }, () => false);
let arr = [];
let answer = "";

function solution(dep) {
  // base condition
  if (dep === M) {
    answer += `${arr.join(" ")}\n`;
    return;
  }

  for (let i = 0; i < N; i++) {
    if (!visited[i]) {
      // visited[i] = true;
      arr.push(i + 1);
      solution(dep + 1);
      arr.pop();
      // visited[i] = false;
    }
  }
}
solution(0, 0);
console.log(answer);
// visited를 빼면 모든 수로 수열을 만들 수 있따.
