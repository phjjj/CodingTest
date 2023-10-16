const filePath = process.platform === "linux" ? "/dev/stdin" : "test.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");
const N = +input[0];
const K = +input[1];
let arr = [];
let newArr = [];

let answer = new Set();

for (let i = 2; i < input.length; i++) {
  arr.push(+input[i]);
}
let visited = Array.from({ length: N }, () => false);

function dfs(dep, n) {
  if (dep === K) {
    answer.add(n);
    return;
  }

  for (let i = 0; i < arr.length; i++) {
    if (!visited[i]) {
      visited[i] = true;

      dfs(dep + 1, n + arr[i]);
      visited[i] = false;
    }
  }
}
dfs(0, "");
console.log(answer.size);
