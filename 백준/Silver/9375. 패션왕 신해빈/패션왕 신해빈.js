const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "test.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const T = +input.shift();

for (let i = 0; i < T; i++) {
  console.log(solution() - 1);
}

function solution() {
  let answer = 1;
  const N = +input.shift();
  const arr = new Map();

  for (let i = 0; i < N; i++) {
    const [clothes, type] = input.shift().split(" ");
    if (arr.has(type)) arr.set(type, arr.get(type) + 1);
    else {
      arr.set(type, 1);
    }
  }
  for (let num of arr.values()) {
    answer *= num + 1;
  }
  return answer;
}
