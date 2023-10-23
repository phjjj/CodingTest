const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "test.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");
const N = +input.shift();
const arr = input.map((v) => v.split(" "));
const visited = Array.from({ length: N }, () => false);
let numberArr = [];
let answer = 0;
function dfs(dep) {
  if (dep === 3) {
    if (check(numberArr)) {
      answer++;
    }
    return;
  }
  for (let i = 1; i < 10; i++) {
    if (!visited[i]) {
      visited[i] = true;
      numberArr.push(i);
      dfs(dep + 1);
      numberArr.pop();
      visited[i] = false;
    }
  }
}

function check(numberArr) {
  for (let i = 0; i < arr.length; i++) {
    const speakNum = arr[i][0].split("").map(Number);
    const S = +arr[i][1];
    const B = +arr[i][2];

    let curS = 0;
    let curB = 0;

    for (let j = 0; j < speakNum.length; j++) {
      if (speakNum[j] === numberArr[j]) {
        curS++;
      }
      if (numberArr.includes(speakNum[j]) && !(speakNum[j] === numberArr[j])) {
        curB++;
      }
    }
    if (curS !== S || curB !== B) return false;
  }
  return true;
}
dfs(0);
console.log(answer);
// 입력을 받은 수와 S,B를 123 ~ 987까지의 수와 비교한다
// ex) 123 1 1, 324이면 1S 1B가 되기 때문에 다음 입력과 비교 -> 반복
// 만약에 n개의 입력과 S,B 수가 같아지면 answer++ 하면 된다

// dfs(numberArr.length)
// for(9번) numberArr.push(i)

// 탈출조건
// if(numberArr.length===3)
// [3,2,4] [1,2,3]
