const filePath = process.platform === "linux" ? "/dev/stdin" : "test.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");

const [N, K] = input.shift().split(" ").map(Number);

let arr = Array.from({ length: N }, (v, i) => i + 1);
let answer = [];

let cnt = 1;
while (arr.length) {
  if (cnt === K) {
    answer.push(arr.shift());
    cnt = 1;
  } else {
    arr.push(arr.shift());
    cnt++;
  }
}
// 1234567


console.log("<" + answer.join(", ") + ">");
