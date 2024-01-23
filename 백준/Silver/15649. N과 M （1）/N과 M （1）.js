const filePath = process.platform === "linux" ? "/dev/stdin" : "test.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");
const [N, M] = input.shift().split(" ").map(Number);

const visited = Array.from({ length: N }, () => false);
let arr = [];
let result = [];
solution(0);
function solution(dep) {
  // base condtion
  if (dep === M) {
    console.log(arr.join(" "));
    return;
  }

  for (let i = 0; i < N; i++) {
    if (!visited[i]) {
      visited[i] = true;
      arr.push(i + 1);
      solution(dep + 1);
      arr.pop();
      visited[i] = false;
    }
  }
}
