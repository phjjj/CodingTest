const filePath = process.platform === "linux" ? "/dev/stdin" : "test.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");

const [N, M] = input[0].split(" ").map(Number);
const numArr = input[1]
  .split(" ")
  .map(Number)
  .sort((a, b) => a - b);
const visited = Array.from({ length: N }, () => false);

let seqArr = [];

function dfs(dep) {
  // base condition
  if (dep === M) {
    console.log(seqArr.join(" "));
    return;
  }

  for (let i = 0; i < numArr.length; i++) {
    if (!visited[i]) {
      visited[i] = true;
      seqArr.push(numArr[i]);
      dfs(dep + 1);
      visited[i] = false;
      seqArr.pop();
    }
  }
}
dfs(0, 0);
