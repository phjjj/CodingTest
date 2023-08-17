const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "test.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

// function fibonacci(n) {
//   if (n === 3) {
//     return (arr[n] = [arr[n - 1][0] + arr[n - 2][0], arr[n - 1][1] + arr[n - 2][1]]);
//   }
//   fibonacci(n - 1);
// }

let arr = [
  [1, 0],
  [0, 1],
  [1, 1],
];

for (let i = 1; i <= +input[0]; i++) {
  for (let j = 3; j <= +input[i]; j++) {
    arr[j] = [arr[j - 1][0] + arr[j - 2][0], arr[j - 1][1] + arr[j - 2][1]];
  }
  console.log(arr[input[i]].join(" "));
}
