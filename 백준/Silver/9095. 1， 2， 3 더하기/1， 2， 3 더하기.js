const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "test.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");
input.shift();

let arr = input.map(Number);
let dp = [0, 1, 2, 4];
for (let i = 0; i < arr.length; i++) {
  for (let j = 4; j <= arr[i]; j++) {
    dp[j] = dp[j - 3] + dp[j - 2] + dp[j - 1];
  }
  console.log(dp[arr[i]]);
}
