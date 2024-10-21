const filePath = process.platform === "linux" ? "/dev/stdin" : "test.txt";
const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

const [N, M] = input.shift().split(" ").map(Number);
const numberArr = input
  .shift()
  .split(" ")
  .map(Number)
  .sort((a, b) => a - b);
const visited = Array.from({ length: N }, () => false);
let arr = [];
let answer = "";

dfs(0);

function dfs(dep) {
  // base condtion
  if (dep === M) {
    return (answer += arr.join(" ") + "\n");
  }

  for (let i = 0; i < N; i++) {
    // if (!visited[i]) {
    // visited[i] = true;
    arr.push(numberArr[i]);
    dfs(dep + 1);
    // visited[i] = false;
    arr.pop();
    // }
  }
}
console.log(answer);
