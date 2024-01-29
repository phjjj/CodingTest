const filePath = process.platform === "linux" ? "/dev/stdin" : "test.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");

function solution(n, arr) {
  const visited = Array.from({ length: n }, () => false);
  let str = "";
  let seqArr = [];

  function dfs(dep, idx) {
    // base condition
    if (dep == 6) {
      str += `${seqArr.join(" ")}\n`;
      return;
    }
    for (let i = idx; i < n; i++) {
      if (!visited[i]) {
        visited[i] = true;
        seqArr.push(arr[i]);
        dfs(dep + 1, i);
        seqArr.pop();
        visited[i] = false;
      }
    }
  }

  dfs(0, 0);
  console.log(str);
}

for (let i = 0; i < input.length; i++) {
  if (input[i] == "0") break;

  const [N, ...numArr] = input[i].split(" ").map(Number);

  solution(N, numArr);
}
