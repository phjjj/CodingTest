const fs = require("fs");
const input = fs
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "test.txt")
  .toString()
  .trim()
  .split("\n");

let arr = [];
for (let i = 1; i <= +input[0]; i++) {
  arr.push(input[i].split(" ").map(Number));
}

let ranks = [];

arr.forEach((v, i) => {
  let rank = 0;
  for (let i = 0; i < arr.length; i++) {
    let cnt = 0;

    if (v[0] < arr[i][0]) {
      cnt++;
    }
    if (v[1] < arr[i][1]) {
      cnt++;
    }

    if (cnt === 2) {
      rank++;
    }
  }
  ranks.push(rank + 1);
});

console.log(ranks.join(" "));

// 처음 시작할때 arr[i][j]
// arr[0][0]이랑 나머지 arr[1~4][0] 비교 작을 경우 cnt++
// arr[0][2]이랑 나머지 arr[1~4][1] 비교 작을 경우 cnt++
// cnt === 2 이면 rank++
