const fs = require("fs");
const input = fs
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "test.txt")
  .toString()
  .trim()
  .split("\n");

const score = input[1].split(" ");
const Max = Math.max(...score);

// console.log(Max);
// console.log(score);

for (let i = 0; i < score.length; i++) {
  score[i] = (score[i] / Max) * 100;
}

console.log(score.reduce((a, b) => a + b) / score.length);
