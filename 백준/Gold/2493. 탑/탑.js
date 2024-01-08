const filePath = process.platform === "linux" ? "/dev/stdin" : "test.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");

const N = +input.shift();
const laserArr = input.join(" ").split(" ").map(Number);
let answer = [];
const stack = [];

for (let i = 0; i < N; i++) {
  // 현재 탑
  let cur = laserArr[i];

  while (stack.length && laserArr[stack[stack.length - 1]] < cur) {
    stack.pop();
  }
  if (stack.length === 0) {
    answer.push(0);
  } else {
    answer.push(stack[stack.length - 1] + 1);
  }
  stack.push(i);
}
console.log(answer.join(" "));
