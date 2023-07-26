const fs = require("fs");
const input = fs
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "test.txt")
  .toString()
  .trim()
  .split("\n");

const num = Number(input[0]);

let numArr = [];

for (let i = 1; i <= num; i++) {
  numArr.push(Number(input[i]));
}

let newArr = [];

numArr.forEach((v) => {
  if (v === 0) newArr.pop();
  else {
    newArr.push(v);
  }
});

newArr.length === 0
  ? console.log(0)
  : console.log(newArr.reduce((a, b) => a + b));
