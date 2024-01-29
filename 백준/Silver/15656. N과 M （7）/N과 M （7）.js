const filePath = process.platform === "linux" ? "/dev/stdin" : "test.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");

const [N, M] = input[0].split(" ").map(Number);
const numArr = input[1]
  .split(" ")
  .map(Number)
  .sort((a, b) => a - b);
const visited = Array.from({ length: N }, () => false);
let seqArr = [];
let str = "";
function dfs(dep, n) {
  // base condition
  if (dep === M) {
    str += `${seqArr.join(" ")}\n`;
    return;
  }

  for (let i = 0; i < numArr.length; i++) {
    seqArr.push(numArr[i]);
    dfs(dep + 1, i);
    seqArr.pop();
  }
}
dfs(0, 0);
console.log(str);
// 그 전 문제에서 중복을 허락 해줘서 visited 제거
// 시간초과로 출력 방식 변경