const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "test.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");
const N = +input.shift();
const K = +input.shift();
const arr = input;
const visited = Array.from(({ length: N }, () => false));
let str = "";
let set = new Set();
function dfs(dep, str) {
  if (dep == K) {
    set.add(str);
    return;
  }
  for (let i = 0; i < arr.length; i++) {
    if (!visited[i]) {
      visited[i] = true;

      dfs(dep + 1, str + arr[i]);
      visited[i] = false;
    }
  }
}

dfs(0, "");
console.log(set.size);
