const filePath = process.platform === "linux" ? "/dev/stdin" : "test.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");
const num = input[0].split(" ").map(BigInt);

const [A, B, C] = num;

function solution(b) {
  if (b === 1n) {
    return A % C;
  }
  const half = solution(b / 2n) % C;

  if (b % 2n) return (half * half * (A % C)) % C;
  // 홀수 일 때

  return (half * half) % C;
}
console.log(solution(B).toString());
// 짝수 일 때

// https://velog.io/@049494/실버-1-1629번-곱셈
// 위 사이트 참고.. 모듈러 연산을 사용해서 품

// 모듈러 연산의 성질
// A * B % C = ((A % C) * (B % C)) % C

// B가 짝수일 경우
// A^B % C
// = A^(B / 2) * A^(B / 2) % C
// = ((A^(B / 2) % C) * (A^(B / 2) % C)) % C

// B가 홀수일 경우
// A^B = A^(B / 2) * A^(B / 2) * A
// A^B % C
// = A^(B / 2) * A^(B / 2) * A % C
// = ((A^(B / 2) % C) * (A^(B / 2) % C) * (A % C)) % C
