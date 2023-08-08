const fs = require("fs");
const input = fs
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "test.txt")
  .toString()
  .trim()
  .split("\n");

let i = 0;
let answer = [];
while (input[i] != "0") {
  input[i].split("").reverse().join("") === input[i].split("").join("") ? answer.push("yes") : answer.push("no");
  i++;
}
console.log(answer.join("\n"));
