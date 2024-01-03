const filePath = process.platform === "linux" ? "/dev/stdin" : "test.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");

const lstack = input.shift().split("");
const rstack = [];
const N = +input.shift();
let answer = "";
for (let i = 0; i < N; i++) {
  const [cmd, alphabet] = input[i].split(" ");
  if (cmd === "L" && lstack.length) {
    rstack.push(lstack.pop());
  }
  if (cmd === "D" && rstack.length) {
    lstack.push(rstack.pop());
  }
  if (cmd === "B") {
    lstack.pop();
  }
  if (cmd === "P") {
    lstack.push(alphabet);
  }
}

answer += lstack.join("");
answer += rstack.reverse().join("");
console.log(answer);

// 스택을 2개 만든다
// lstack cursor rstack 으로 커서의 왼쪽에 위치한 글자들은 lstack 오른쪽에 위치한 글자들은 rstack으로 처리한다
// 오른쪽은 스택이기 때문에 반대로 생각하면 된다. 그래서 reverse를 활용하여 스택을 붙여줌
