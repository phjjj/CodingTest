const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "test.txt";
const input = fs.readFileSync(filePath, "utf8").trim().split("\n");

const N = +input.shift();
const strArr = input;
let answer = 0;

for (let i = 0; i < N; i++) {
  let stack = [];
  let str = strArr[i];

  for (let j = 0; j < str.length; j++) {
    const top = stack.length - 1;
    if (stack[top] == str[j]) {
      stack.pop();
    } else {
      stack.push(str[j]);
    }
  }
  if (stack.length === 0) {
    answer++;
  }
}
console.log(answer);
// 스택에 A,B를 쌓는다.
// AA or BB 가 되는 경우, 스택은 pop 하고 단어는 shift
// 스택이 비었을 경우 answer++
