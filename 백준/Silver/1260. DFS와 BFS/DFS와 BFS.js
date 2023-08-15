const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "test.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

let [n, m, v] = input[0].split(" ").map(Number);

let graph = new Array(n + 1);
// 간선을 이용해서 인접리스트로 그래프 구현
for (let i = 0; i < graph.length; i++) {
  graph[i] = [];
}
for (let i = 0; i < m; i++) {
  let [from, to] = input[i + 1].split(" ").map(Number);
  graph[from].push(to);
  graph[to].push(from);
}
// 오름차순
graph.forEach((element) => {
  element.sort((a, b) => a - b);
});

function dfs(graph, v, visited) {
  visited[v] = true;
  dfsArr.push(v);
  for (i of graph[v]) {
    if (!visited[i]) {
      dfs(graph, i, visited);
    }
  }
}

function bfs(graph, v, visited) {
  let queue = [];
  visited[v] = true;
  queue.push(v);

  while (queue.length !== 0) {
    const v = queue.shift();
    bfsArr.push(v);
    for (const i of graph[v]) {
      if (!visited[i]) {
        queue.push(i);
        visited[i] = true;
      }
    }
  }
}

let dfsVisited = [false];
let bfsVisited = [false];
let dfsArr = [];
let bfsArr = [];
dfs(graph, v, dfsVisited);
bfs(graph, v, bfsVisited);

console.log(dfsArr.join(" "));
console.log(bfsArr.join(" "));
