const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "test.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");
const [N, M] = input.shift().split(" ").map(Number);

let graph = Array.from({ length: N + 1 }, () => []);
let visited = Array.from({ length: N + 1 }, () => false);

for (let i = 0; i < M; i++) {
  const [u, v] = input[i].split(" ").map(Number);
  graph[u].push(v);
  graph[v].push(u);
}
let answer = 0;

// function bfs(graph, i, visited) {
//   let queue = graph[i];
//   visited[i] = true;
//   let idx = 0;

//   while (queue.length !== idx) {
//     const v = queue[idx];

//     for (const cur of graph[v]) {
//       if (!visited[cur]) {
//         visited[cur] = true;
//         queue.push(cur);
//       }
//     }
//     idx++;
//   }
// }

const dfs = (graph, v, visited) => {
  //1. 탐색 시작 노드 방문 처리
  visited[v] = true;

  //2. 탐색 노드의 인접 노드 확인

  for (const cur of graph[v]) {
    if (!visited[cur]) {
      dfs(graph, cur, visited);
    }
  }
};

for (let i = 1; i < graph.length; i++) {
  if (!visited[i]) {
    dfs(graph, i, visited);
    answer++;
  }
}
console.log(answer);
