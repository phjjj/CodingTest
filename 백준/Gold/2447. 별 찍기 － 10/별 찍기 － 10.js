const filePath = process.platform === "linux" ? "/dev/stdin" : "test.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");

const N = +input.shift();

let str = "";
for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    solution(i, j, N);
  }
  str += "\n";
}
function solution(x, y, n) {
  // base condtion
  // 1일 경우 공백

  if (x % 3 === 1 && y % 3 === 1) {
    str += " ";
  } else {
    if (n === 1) {
      str += "*";
    } else {
      solution(parseInt(x / 3), parseInt(y / 3), parseInt(n / 3));
    }
  }
}

console.log(str);

// N=3일떼 별의 공백은 (1,1)(1,4)(1,7)...
// base condition을 x % 3 === 1 && y % 3 === 1 로 하면 공백 출력
// 재귀로 3을 나눠서 호출했을 때, base condition에 해당될 경우 공배을 출력한다.
// ex (17,17, 27) => (5,5,9) => (1, 1, 3)
