const filePath = process.platform === "linux" ? "/dev/stdin" : "test.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");
const N = +input.shift();
const map = input.map((v) => v.split("").map(Number));

let answer = [];
function solution(x, y, n) {
  const number = map[x][y];

  for (let i = x; i < x + n; i++) {
    for (let j = y; j < y + n; j++) {
      // 숫자가 다를 경우 나누기
      if (map[i][j] !== number) {
        answer.push("(");
        solution(x, y, n / 2);
        solution(x, y + n / 2, n / 2);
        solution(x + n / 2, y, n / 2);
        solution(x + n / 2, y + n / 2, n / 2);
        answer.push(")");
        return;
      }
    }
  }
  answer.push(number);
}

solution(0, 0, N);
console.log(answer.join(""));

// 2차원 배열을 검사하고 색이 전부 같지 않으면
// 재귀 호출
// 4개의 영역으로 나누고 색 검사 영역으로 나누기
