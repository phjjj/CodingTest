const filePath = process.platform === "linux" ? "/dev/stdin" : "test.txt";
const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

const s = input[0].split("")
const stack = []
let answer = 0

for(let i =0; i<s.length; i++){
  if(s[i]==="(" && s[i+1]===")") {
    answer += stack.length
    i++
  } else if(s[i]=="(") stack.push("(")
  else if(s[i]==")" && stack[stack.length-1] ==="(") {
    stack.pop()
    answer++
  }
}
console.log(answer);


  // 배열에서 i, i+1 이 "()"가 되면 현재 스택의 길이 만큼 조각이 있다.
  // ")" 일 때는, pop을 해주고 조각+1
  // 