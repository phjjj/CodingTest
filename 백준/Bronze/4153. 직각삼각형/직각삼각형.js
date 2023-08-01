const fs = require("fs");
const input = fs
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "test.txt")
  .toString()
  .trim()
  .split("\n");

input.pop();

const sortArr = input.map((v) =>
  v
    .split(" ")
    .map(Number)
    .sort((a, b) => b - a)
);

sortArr.forEach((v) => {
  for (let i = 0; i < sortArr[0].length; i++) {
    v[i] = v[i] * v[i];
  }
});

for (let i = 0; i < sortArr.length; i++) {
  sortArr[i][0] === sortArr[i][1] + sortArr[i][2] ? console.log("right") : console.log("wrong");
}
