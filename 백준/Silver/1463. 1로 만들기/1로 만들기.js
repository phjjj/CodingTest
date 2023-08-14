const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "test.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

let num = Number(input.join(""));

const DP = new Array(num + 1).fill(0);

// 다이나믹 프로그래밍은 작은 문제(값)를 이용해서 큰 문제(값)를 푸는 것.
// 그래서 입력값의 최소값인 1부터 num 까지 반복문을 이용해서 구한다
// DP 배열의 index는 숫자를 뜻하고, DP 배열에 계속 연산한 숫자(index)의 최솟값을 집어넣는 방식

for (let i = 2; i <= num; i++) {
  // 첫 정수는 N-1을 해준다
  DP[i] = DP[i - 1] + 1; // ex) DP[2] = DP[1] +1 , DP[1]의 값은 이미 저장되어있기 때문에 재사용 할 수 있다

  // N-1을 한 N의 값과 N/2 의 값 중 작은 값 , 즉 횟수가 적은 값이 DP[N]이 된다
  if (i % 2 === 0) {
    DP[i] = Math.min(DP[i], DP[i / 2] + 1);
  }

  if (i % 3 === 0) {
    DP[i] = Math.min(DP[i], DP[i / 3] + 1);
  }
}

console.log(DP[num]);
