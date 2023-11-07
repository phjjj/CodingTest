const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "test.txt";
const input = fs.readFileSync(filePath, "utf8").trim().split("\n");

function solution() {
  const [S, T] = input;
  let answer = 0;
  dfs(T);

  function dfs(t) {
    if (t === S) {
      answer = 1;
      return;
    }
    if (t[t.length - 1] === "A") {
      dfs(t.slice(0, t.length - 1));
    }
    if (t[0] === "B") {
      dfs(t.slice(1, t.length).split("").reverse().join(""));
    }
  }

  console.log(answer === 0 ? 0 : 1);
}
solution();

// 반대로 T가 S가 되는 경우를 생각한다
// T의 문자열을 받아서
// 끝자리 A일 경우 문자열의 뒤에서 A를 빼고 dfs
// 원래는 끝자리 B에서 뒤집는 경우이니까, 반대로 생각하면 앞자리가 B이면 B를 빼고 뒤집으면 된다
