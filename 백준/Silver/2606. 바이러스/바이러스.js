const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "test.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

let arr = [];

for (let i = 2; i <= +input[1] + 1; i++) {
  arr.push(input[i].split(" ").map(Number));
}
let graph = Array.from(Array(+input[0] + 1), () => []);

for (let i = 0; i < +input[1]; i++) {
  graph[arr[i][0]].push(arr[i][1]);
  graph[arr[i][1]].push(arr[i][0]);
}

graph.forEach((v) => v.sort((a, b) => a - b));
let cnt = 0;

function dfs(graph, v, visited) {
  visited[v] = true; // 방문한 숫자는 true ,
  cnt++;
  // dfs함수 재귀적을 호출
  for (i of graph[v]) {
    if (!visited[i]) {
      // 방문하지 않았을시
      dfs(graph, i, visited);
    }
  }
}
let visited = [false];
dfs(graph, 1, visited);
console.log(cnt - 1);
