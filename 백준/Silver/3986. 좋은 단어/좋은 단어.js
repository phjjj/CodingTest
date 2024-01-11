const filePath = process.platform === "linux" ? "/dev/stdin" : "test.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");

const N = +input.shift();
const strArr = input;
let answer = 0;
for (let i = 0; i < N; i++) {
  let stack = [];
  for (let j = 0; j < strArr[i].length; j++) {
    if (strArr[i][j] === "A") {
      if (stack[stack.length - 1] === "A") stack.pop();
      else {
        stack.push("A");
      }
    }
    if (strArr[i][j] === "B")
      if (stack[stack.length - 1] === "B") stack.pop();
      else {
        stack.push("B");
      }
  }
  if (!stack.length) {
    answer++;
  }
}
console.log(answer);
// 좋은단어를 찾기
// 현재 검사하는 알파벳과 스택의 top을 비교해서 똑같을 경우 pop
// 다를 경우 넣기
// 마지막에 스택이 다 비었을 경우 좋은단어
