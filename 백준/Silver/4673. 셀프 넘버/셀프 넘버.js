const filePath = process.platform === "linux" ? "/dev/stdin" : "test.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");

// 수열을 만들고 수열에서 제외된 숫자들이 셀프넘버?

const arr = Array(10000 + 1).fill(true);

function d(n) {
  const number =
    String(n)
      .split("")
      .map(Number)
      .reduce((a, b) => a + b) + n;
  return number;
}

for (let i = 1; i <= 10000; i++) {
  arr[d(i)] = false;
}
for (let i = 1; i <= 10000; i++) {
  if (arr[i]) {
    console.log(i);
  }
}
