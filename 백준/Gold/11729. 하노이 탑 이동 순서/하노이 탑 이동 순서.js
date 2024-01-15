const filePath = process.platform === "linux" ? "/dev/stdin" : "test.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");
const k = +input[0];

let stack = [];
let count = 0;

function hanoi(n, from, other, to) {
  if (!n) {
    return;
  }

  // n-1의 원판들을 a에서 c로
  hanoi(n - 1, from, to, other);
  stack.push([from, to]);
  count += 1;

  // n-1의 원판들을 b에서 a로 n-1의 원판들을 다시 c로 옮긴다.
  hanoi(n - 1, other, from, to);
}

hanoi(k, 1, 2, 3);
console.log(count);
console.log(stack.map((v) => v.join(" ")).join("\n"));
// https://nyang-in.tistory.com/210

// 머리가 아픈 문제다
// 원판이 5개일 경우 to인 목표 기둥으로 옮기고
// 그 위에 n-1개의 other을 거쳐 to로 가는데

// 결국 위는 n-1을 하면서 재귀호출을 하면된다.

// 어렵게 생각하지말고 하노이의 원판이 3개 일 때의 상황을 반복하면 된다.
