const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "test.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

console.log(
  input[1]
    .split("")
    .map(Number)
    .reduce((a, b) => a + b)
);
