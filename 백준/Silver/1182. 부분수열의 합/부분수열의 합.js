const filePath = process.platform === "linux" ? "/dev/stdin" : "test.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");

const [N, S] = input.shift().split(" ").map(Number);
const arr = input[0].split(" ").map(Number);

let cnt = 0;
function solution(dep, n) {
  // base conditon
  if (dep === N) {
    if (n === S) {
      cnt++;
    }
    return;
  }
  solution(dep + 1, n + arr[dep]);
  solution(dep + 1, n);
}
solution(0, 0);
if (S === 0) cnt--;
console.log(cnt);
