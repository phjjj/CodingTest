const filePath = process.platform === "linux" ? "/dev/stdin" : "test.txt";
const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

const [N, M] = input.shift().split(" ").map(Number);
const numArr = input
  .shift()
  .split(" ")
  .map(Number)
  .sort((a, b) => a - b);
const visited = Array.from({ length: M }, () => false);

const arr = [];
let str = "";

dfs(0, 0);
console.log([...new Set(str.split("\n"))].join("\n"));
function dfs(dep, n) {
  // base condition
  if (dep === M) {
    return (str += arr.join(" ") + "\n");
  }

  for (let i = n; i < numArr.length; i++) {
    if (!visited[i]) {
      visited[i] = true;
      arr.push(numArr[i]);
      dfs(dep + 1, i);
      arr.pop();
      visited[i] = false;
    }
  }
}
