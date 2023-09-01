const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "test.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");
const [N, M] = input.shift().split(" ").map(Number);

const arr = input[0].split(" ").map(Number);

let sum = [arr[0], arr[0] + arr[1]];

for (let i = 0; i < arr.length; i++) {
  sum[i + 1] = sum[i] + arr[i];
}
let answer = [];
for (let i = 1; i < M + 1; i++) {
  const [a, b] = input[i].split(" ").map(Number);
  answer.push(sum[b] - sum[a - 1]);
}
console.log(answer.join("\n"));
