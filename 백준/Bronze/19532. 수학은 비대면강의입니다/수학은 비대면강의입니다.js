const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "test.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");
const numArr = input.join().split(" ").map(Number);

// ax + by = c 만족하고
// dx + ey = f 만족
// ax by dx ey 값이 곱했을때 -999보다 커야하고 999보다 작아야함
// c, f 인 답도 -999 보다 크고 999보다 작아야함

// i = x
for (let i = -999; i <= 999; i++) {
  const x = i;
  for (let j = -999; j <= 999; j++) {
    const y = j;
    if (numArr[0] * x + numArr[1] * y === numArr[2] && numArr[3] * x + numArr[4] * y === numArr[5]) {
      console.log(x, y);
    }
  }
}
// x=1 일 때, b*y and e*y 가 -999보다 크고 999보다 작고, 답 f and g 가 -999 보다 크고 999보다 작으면 답이다
