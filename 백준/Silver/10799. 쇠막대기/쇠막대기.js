const filePath = process.platform === "linux" ? "/dev/stdin" : "test.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");

const bracket = input.shift();
let stack = [];
let answer = 0;
for (let i = 0; i < bracket.length; i++) {
  if (bracket[i] === "(" && bracket[i + 1] === ")") {
    answer += stack.length;
    i += 1;
  } else if (bracket[i] === "(") {
    stack.push("(");
    answer += 1;
  } else if (bracket[i] === ")") {
    if (stack[stack.length - 1] === "(") {
      stack.pop();
    }
  }
}

console.log(answer);
// 스택에 괄호를 넣을 때, 넣고 바로 닫는 괄호가 나온다면 레이저다
// 이걸 어케 구현하냐,

// 닫힌 괄호가 나왔을 때, 스택의 top을 검사하는게 아니고 현재 원소의 앞을 검사하고 같다면 레이저로 둔다
// 막대기 갯수는.. 만약 왼쪽 괄호가 레이저가 나왔을 때,
// 현재 스택의 수 + 스택의 수 하면 된다, 괄호가 곧 막대기의 시작점이기 때문
// 스택의 top과 배열의 닫는괄호가 짝이 맞으면 그 막대기는 끝 그냥 pop
//
