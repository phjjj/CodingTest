const filePath = process.platform === "linux" ? "/dev/stdin" : "test.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");
const [N, r, c] = input[0].split(" ").map(Number);

function solution(n, row, column) {
  if (n === 0) return 0;

  const half = Math.pow(2, n - 1);

  // 1사분면
  if (row < half && column < half) {
    return solution(n - 1, row, column);
  }

  // 2사분면
  if (row < half && column >= half) {
    return half * half + solution(n - 1, row, column - half);
  }

  // 3사분면
  if (row >= half && column < half) {
    return 2 * half * half + solution(n - 1, row - half, column);
  }

  // 4사분면
  return 3 * half * half + solution(n - 1, row - half, column - half);
}

const result = solution(N, r, c);
console.log(result);
