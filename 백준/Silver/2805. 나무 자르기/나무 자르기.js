const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "test.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");
const [N, M] = input[0].split(" ").map(Number);
const heightArr = input[1]
  .split(" ")
  .map(Number)
  .sort((a, b) => a - b);

function solution() {
  let start = 0;
  let end = heightArr[heightArr.length - 1];
  let answer = 0;
  while (start <= end) {
    let mid = Math.floor((start + end) / 2);
    let sum = 0;

    for (let v of heightArr) {
      if (v > mid) sum += v - mid;
    }
    if (sum >= M) {
      if (mid > answer) answer = mid;
      // 최댓값 계속 구해주기.
      // 이 부분을 제외하고는 일반적인 이분탐색 코드와 똑같다.
      start = mid + 1;
    } else {
      end = mid - 1;
    }
  }
  return answer;
}

console.log(solution());
