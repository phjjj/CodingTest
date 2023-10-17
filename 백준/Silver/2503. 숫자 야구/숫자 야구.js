const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "test.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");
const N = input.shift();
const arrN = input;

const visited = Array.from({ length: 11 }, () => false);
let answer = [];
let curArr = [];
dfs(0);
function dfs(dep) {
  if (dep === 3) {
    for (let i = 0; i < N; i++) {
      const speakNumArr = arrN[i].split(" ")[0].split("").map(Number);
      const s = +arrN[i].split(" ")[1];
      const b = +arrN[i].split(" ")[2];

      let curS = 0;
      let curB = 0;
      for (let j = 0; j < 3; j++) {
        if (curArr[j] === speakNumArr[j]) {
          curS++;
        }
        if (curArr[j] !== speakNumArr[j] && curArr.includes(speakNumArr[j])) {
          curB++;
        }
      }
      if (!(curS === s && curB === b)) {
        return;
      }
    }
    answer++;
    return;
  }
  for (let i = 1; i < 10; i++) {
    if (!visited[i]) {
      visited[i] = true;
      curArr.push(i);
      dfs(dep + 1);
      visited[i] = false;
      curArr.pop();
    }
  }
}
console.log(answer);
// 123~987까지 모든 숫자들을, 입력받은 수 들과 비교하여 스트라이크와 볼의 수가 같을 경우
// ex) 324 일 경우, 입력으로 받은 숫자의 스트라이크수와 볼의수가 모두 일치한다
// 324에서 123과 비교 1s 1b, 356과 비교 1s 0b .. 이런 식

// 먼저 dfs로 1~9까지 순열을 만든다 백트래킹을 추가하여 중복되지 않게 진행
// number = 123,124...
// 탈출문은 if(dep===3)일 경우, 현재 수를 입력받은 수 들과 비교,
// 입력받은 값 const [n,s,b] 변수 선언
// let curS, curB를 선언하고 현재 값 number와 n을 비교한다(split을 이용하여 number, n을 배열형으로 변경 )
// number[i] = n[i] 같을 경우, curS++
// 볼은 위치가 같지 않고, 포함만 하고 있을경우 ++
// 위 조건을 통과할경우 number를 answer[]에 추가한다
