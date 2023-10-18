const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "test.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const N = +input.shift();
const arrN = input.map((v) => v.split(" ").map(Number));

let answer = 0;

function dfs(day, money) {
  if (day > N) {
    return;
  }
  if (day === N) {
    answer = Math.max(answer, money);
    return;
  }

  dfs(day + arrN[day][0], money + arrN[day][1]);
  dfs(day + 1, money);
}

dfs(0, 0);
console.log(answer);