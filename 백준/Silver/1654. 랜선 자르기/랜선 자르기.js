const fs = require("fs");
const input = fs
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "test.txt")
  .toString()
  .trim()
  .split("\n");

const n = input.shift().split(" ")[1];
let lines = input.sort((a, b) => a - b); // 이분탐색은 오름차순으로 정렬해야한다
let min = 1; // min은 1부터 ex) 1~802 (최소 길이)
let max = +lines[lines.length - 1]; // 랜선중 가장 큰값 (최대 길이)

while (min <= max) {
  let mid = parseInt((min + max) / 2); // 중간값, 즉 중간값이 자르려고 하는 길이이다
  // console.log(min, mid, max);
  // (현재의 랜선들 / 자르려고 하는 길이 ) 해서 다 더한 값은 pices개

  let pices = lines.map((line) => parseInt(line / mid)).reduce((a, b) => a + b, 0);

  // 이분탐색과 똑같이 진행
  // 만들려고하는 랜선의 개수(n) 보다 클 경우 max(최대길이)를 mid-1 값을 설정 후 이분탐색 진행
  // 만들려고하는 랜선의 개수(n) 보다 작을 경우 min(최소길이)를 max-1 값을 설정 후 이분탐색 진행
  if (pices >= n) {
    min = mid + 1;
  } else {
    max = mid - 1;
  }
}

console.log(max);
