const fs = require("fs");
const input = fs
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "test.txt")
  .toString()
  .trim()
  .split("\n");

function solution(arr) {
  let cnt = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === "(") {
      cnt++;
    } else {
      cnt--;
    }

    if (cnt < 0) return console.log("NO");
  }
  return cnt === 0 ? console.log("YES") : console.log("NO");
}

for (let i = 1; i <= input[0]; i++) {
  solution(input[i].split(""));
}
