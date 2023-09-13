const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "test.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");
const [N, M] = input.shift().split(" ").map(Number);

const arr = new Map();
for (let i = 0; i < N; i++) {
  const [id, pw] = input[i].split(" ");
  arr.set(id, pw);
}

const answer = [];

for (let i = N; i < N + M; i++) {
  const id = String(input[i]);

  answer.push(arr.get(id));
}
console.log(answer.join("\n"));
