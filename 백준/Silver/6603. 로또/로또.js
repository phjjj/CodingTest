const filePath = process.platform === "linux" ? "/dev/stdin" : "test.txt";
const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

for (let i = 0; i < input.length - 1; i++) {
  const testCase = input[i].split(" ").map(Number);
  const [K, ...numberArr] = testCase;
  solution(K, numberArr);
}

function solution(k, numberArr) {
  let arr = [];
  let answer = "";
  const visited = Array.from({ length: k }, () => false);
  dfs(0, 0);

  function dfs(dep, n) {
    // base condition
    if (dep === 6) {
      answer += arr.join(" ") + "\n";
      return;
    }

    for (let i = n; i < k; i++) {
      if (!visited[i]) {
        visited[i] = true;
        arr.push(numberArr[i]);
        dfs(dep + 1, i);
        arr.pop();
        visited[i] = false;
      }
    }
  }
  console.log(answer);
}
// shift로 0이 나오면 break
// K개의 수에서 각 수를 순열로 만든다.
