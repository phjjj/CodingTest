const filePath = process.platform === "linux" ? "/dev/stdin" : "test.txt";
const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

const [N, M] = input.shift();
// 한 번의 루프에서 필요한 형태로 배열을 처리
const formatArr = input.slice(0, 2).flatMap((line) => line.split(" "));
console.log(formatArr.sort((a, b) => a - b).join(" "));
