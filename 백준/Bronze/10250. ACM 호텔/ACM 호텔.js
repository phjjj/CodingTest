const input = require("fs")
  .readFileSync("dev/stdin")
  .toString()
  .trim()
  .split("\n");

function Checkin(Height, Number) {
  const H = parseInt(Height); // 정수 변환
  let N = parseInt(Number);
  let W = 0;
  // N=12
  // H=6
  while (N > 0) {
    N -= H;
    W++;
    // w = 2
  }
  // N = -2
  // H = 6
  N += H;

  console.log(N + "" + (W < 10 ? "0" + W : W));
}

for (i = 1; i <= input[0]; i++) {
  const Case = input[i].split(" ").map((ele) => parseInt(ele)); // 테스트 케이스
  Checkin(Case[0], Case[2]); // H,N 넘기기
}
