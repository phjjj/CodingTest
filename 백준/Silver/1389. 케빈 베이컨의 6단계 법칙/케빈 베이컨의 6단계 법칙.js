const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "test.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");
const [N, M] = input.shift().split(" ").map(Number);

const graph = Array.from({ length: N + 1 }, () => []);

for (let i = 0; i < M; i++) {
  const A = input[i].split(" ").map(Number)[0];
  const B = input[i].split(" ").map(Number)[1];
  graph[A].push(B);
  graph[B].push(A);
}

function bfs(n, visited) {
  let queue = [];
  let cnt = 0;
  let sum = 0;
  visited[n] = true;
  queue.push([n, cnt]);
  while (queue.length) {
    const [n, v] = queue.shift();
    sum += v;
    for (const i of graph[n]) {
      if (!visited[i]) {
        // 방문하지 않았을시
        queue.push([i, v + 1]); // 큐에 집어넣는다
        visited[i] = true; // 방문했다고 true
      }
    }
  }
  return sum;
}

let answer = [];
for (let i = 1; i < graph.length; i++) {
  let visited = Array.from({ length: N + 1 }, () => false);
  answer.push(bfs(i, visited));
}

console.log(answer.indexOf(Math.min(...answer)) + 1);
